/* 위젯 모음 1: 공용 도우미 + 1부 (극한 · 0/0 · 기울기와 미분) */
var W={},DUELS={};
(function(){
'use strict';
var NS='http://www.w3.org/2000/svg';
function E(tag,at,par){var e=document.createElementNS(NS,tag);for(var k in at)e.setAttribute(k,at[k]);if(par)par.appendChild(e);return e;}
function H(tag,cls,html,par){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;if(par)par.appendChild(e);return e;}
function svg(el,w,h,label){var s=E('svg',{viewBox:'0 0 '+w+' '+h,width:'100%',role:'img','aria-label':label||'설명 그림'});s.style.maxWidth=w+'px';el.appendChild(s);return s;}
function ctrl(el){return H('div','ctrl',null,el);}
function btn(par,label,on,pressed){var b=H('button','bt',label,par);b.type='button';if(pressed!=null)b.setAttribute('aria-pressed',pressed?'true':'false');b.onclick=function(){on(b);};return b;}
function radio(par,label,opts,cur,on){if(label)H('span','glabel',label,par);var bs=opts.map(function(o){return btn(par,o[1],function(b){bs.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});on(o[0]);},o[0]===cur);});return bs;}
function slider(par,label,min,max,step,val,on){H('span','glabel',label,par);var r=H('input',null,null,par);r.type='range';r.min=min;r.max=max;r.step=step;r.value=val;r.setAttribute('aria-label',label);var v=H('span','val','',par);function u(){v.textContent=on(+r.value)||'';}r.oninput=u;Promise.resolve().then(u);return r;}
function out(el){var o=H('div','insight',null,el);o.setAttribute('aria-live','polite');return o;}
function tx(s,x,y,t,at){var e=E('text',Object.assign({x:x,y:y,'font-size':13,fill:'#16212b','font-family':'inherit'},at||{}),s);e.textContent=t;return e;}
var C={g:'#13733a',m:'#9b3fb5',r:'#c9302c',a:'#a35c00',b:'#1e55c8',k:'#16212b',mu:'#5b6874',rule:'#d5dbe2',acc:'#2f6f8f'};
window.WC=C;

/* 숫자 보기 좋게 */
function nf(v,d){if(v===Infinity)return '∞';if(v===-Infinity)return '−∞';if(v!==v)return 'NaN (숫자 아님)';d=d==null?5:d;var a=Math.abs(v);
  if(a!==0&&(a<1e-4||a>=1e7))return v.toExponential(2).replace('e','×10^').replace('+','');return (+v.toFixed(d)).toString().replace('-','−');}
window.NF=nf;

/* 좌표평면 그리기: cfg={w,h,xr,yr,fns:[{f,col,w,dash}],label} → {s,X,Y,inX,inY} */
function plot(el,cfg){
  var w=cfg.w||620,h=cfg.h||300,p=36,s=svg(el,w,h,cfg.label||'그래프');
  var xr=cfg.xr,yr=cfg.yr;function X(x){return p+(x-xr[0])/(xr[1]-xr[0])*(w-2*p);}function Y(y){return h-p+(-(y-yr[0])/(yr[1]-yr[0]))*(h-2*p);}
  E('rect',{x:p,y:p,width:w-2*p,height:h-2*p,fill:'#fff',stroke:C.rule},s);
  if(yr[0]<0&&yr[1]>0)E('line',{x1:p,y1:Y(0),x2:w-p,y2:Y(0),stroke:C.mu,'stroke-width':1.2},s);
  if(xr[0]<0&&xr[1]>0)E('line',{x1:X(0),y1:p,x2:X(0),y2:h-p,stroke:C.mu,'stroke-width':1.2},s);
  tx(s,w-p-4,h-p+18,cfg.xl||'x',{'text-anchor':'end',fill:C.mu,'font-size':12});tx(s,p-30,p+4,cfg.yl||'y',{fill:C.mu,'font-size':12});
  tx(s,p,h-p+18,nf(xr[0],3),{fill:C.mu,'font-size':11});tx(s,X(xr[1])-2,h-p+30,nf(xr[1],3),{fill:C.mu,'font-size':11,'text-anchor':'end'});
  tx(s,p-4,Y(yr[1])+4,nf(yr[1],3),{fill:C.mu,'font-size':11,'text-anchor':'end'});tx(s,p-4,Y(yr[0]),nf(yr[0],3),{fill:C.mu,'font-size':11,'text-anchor':'end'});
  (cfg.fns||[]).forEach(function(F){curve(s,F,xr,yr,X,Y,F.n||360);});
  return {s:s,X:X,Y:Y,w:w,h:h,p:p};
}
function curve(s,F,xr,yr,X,Y,n){var d='',pen=false,span=yr[1]-yr[0];
  for(var i=0;i<=n;i++){var x=xr[0]+(xr[1]-xr[0])*i/n,y=F.f(x);
    if(!isFinite(y)||y<yr[0]-span*2||y>yr[1]+span*2){pen=false;continue;}
    var yy=Math.max(yr[0]-span*0.2,Math.min(yr[1]+span*0.2,y));d+=(pen?'L':'M')+X(x).toFixed(1)+','+Y(yy).toFixed(1);pen=true;}
  return E('path',{d:d,fill:'none',stroke:F.col||C.b,'stroke-width':F.w||2.5,'stroke-dasharray':F.dash||'','clip-path':''},s);}
window.WU={E:E,H:H,svg:svg,ctrl:ctrl,btn:btn,radio:radio,slider:slider,out:out,tx:tx,plot:plot,curve:curve,nf:nf};

/* 함수 모음 (식 이름 → 계산). 문자열 식을 실행하지 않는다 */
var FN={
  q4:{t:'(x² − 4) / (x − 2)',a:2,f:function(x){return (x*x-4)/(x-2);},lim:4,yr:[2,6],xr:[0,4]},
  sign:{t:'|x| / x',a:0,f:function(x){return Math.abs(x)/x;},lim:null,yr:[-1.6,1.6],xr:[-2,2],L:-1,R:1},
  cos2:{t:'(1 − cos x) / x²',a:0,f:function(x){return (1-Math.cos(x))/(x*x);},lim:0.5,yr:[0,0.7],xr:[-3,3]},
  ex1:{t:'(eˣ − 1) / x',a:0,f:function(x){return (Math.exp(x)-1)/x;},lim:1,yr:[0,2.2],xr:[-2,2]},
  ex2:{t:'(eˣ − 1 − x) / x²',a:0,f:function(x){return (Math.exp(x)-1-x)/(x*x);},lim:0.5,yr:[0,1.2],xr:[-2,2]},
  exq:{t:'(eˣ − 1) / (x² + x)',a:0,f:function(x){return (Math.exp(x)-1)/(x*x+x);},lim:1,yr:[0,2],xr:[-0.8,1.5]},
  sinc:{t:'sin x / x',a:0,f:function(x){return Math.sin(x)/x;},lim:1,yr:[-0.3,1.2],xr:[-10,10]},
  sub:{t:'1/x − 1/sin x',a:0,f:function(x){return 1/x-1/Math.sin(x);},lim:0,yr:[-0.5,0.5],xr:[-2.5,2.5]},
  xlnx:{t:'x · ln x',a:0,f:function(x){return x>0?x*Math.log(x):NaN;},lim:0,yr:[-0.5,0.5],xr:[0,1.2],side:'right'},
  notf:{t:'(x² + 1) / (x + 1)',a:1,f:function(x){return (x*x+1)/(x+1);},lim:1,yr:[0,2],xr:[0,2]}
};
window.FN=FN;

/* ① 1/n 수열: 0에 가까워지지만 0이 되지 않음 */
W.seq=function(el,o){
  var s=svg(el,640,130,'수직선 위 1/n 점들'),ou=out(el),N=o.N||5;
  var c=ctrl(el);slider(c,'n (몇 번째까지)',1,6,0.25,Math.log10(N),function(v){N=Math.round(Math.pow(10,v));draw();return N.toLocaleString('ko-KR');});
  function X(v){return 40+v*560;}
  function draw(){s.innerHTML='';E('line',{x1:30,y1:70,x2:620,y2:70,stroke:C.mu,'stroke-width':2},s);
    [0,0.5,1].forEach(function(v){E('line',{x1:X(v),y1:62,x2:X(v),y2:78,stroke:C.mu},s);tx(s,X(v)-6,100,String(v));});
    var shown=Math.min(N,60);for(var k=1;k<=shown;k++)E('circle',{cx:X(1/k),cy:70,r:k===shown?6:3.5,fill:k===shown?C.r:C.b,opacity:k===shown?1:.55},s);
    if(N>60)E('circle',{cx:X(1/N),cy:70,r:6,fill:C.r},s);
    E('circle',{cx:X(0),cy:70,r:7,fill:'#fff',stroke:C.g,'stroke-width':3},s);tx(s,X(0)-8,48,'0 (도착 예정지)',{fill:C.g,'font-size':12,'font-weight':700});
    ou.innerHTML='<p>n = <b>'+N.toLocaleString('ko-KR')+'</b>일 때 1/n = <b>'+nf(1/N,8)+'</b>. 0과의 거리는 '+nf(1/N,8)+'이에요.</p><p class="'+(N>=1000?'g':'a')+'">'+(N>=1000?'0에 아주 가까워졌지만, 여전히 0은 아니에요. 「가까워진다」와 「같아진다」는 달라요.':'n을 더 키워 보세요. 빨간 점이 0 쪽으로 다가가요.')+'</p>';}
  draw();
};
DUELS.seq=function(){var n=1000000,v=1/n;return {fly:true,robo:false,report:'n = 1,000,000일 때 1/n = 0.000001. 0보다 크니 「0이 됐다」는 틀렸어요. 하지만 극한값(도착 예정지)은 0이에요.'};};

/* ② 다가가기 표: x를 a 쪽으로 10배씩 가깝게 */
W.table=function(el,o){
  var keys=o.keys||[o.fn||'q4'],key=keys[0],K=o.K||3,side=o.side||'both';
  if(keys.length>1){var c0=ctrl(el);radio(c0,'식:',keys.map(function(k){return [k,FN[k].t];}),key,function(v){key=v;draw();});}
  var g=H('div',null,null,el),tb=H('div','tw',null,el),ou=out(el);
  var c=ctrl(el);slider(c,'얼마나 가까이 (자릿수)',1,o.Kmax||6,1,K,function(v){K=v;draw();return '10의 −'+v+'제곱까지';});
  function draw(){var F=FN[key],a=F.a;g.innerHTML='';
    var P=plot(g,{w:620,h:260,xr:F.xr,yr:F.yr,fns:[{f:F.f,col:C.b}],label:F.t+'의 그래프'});
    if(F.lim!=null)E('circle',{cx:P.X(a),cy:P.Y(F.lim),r:6,fill:'#fff',stroke:C.r,'stroke-width':2.5},P.s);
    tx(P.s,P.p+8,P.p+18,'y = '+F.t+(F.lim!=null?'   (빈 동그라미 = x = '+a+'에서 비어 있는 자리)':''),{'font-size':12,fill:C.b});
    var rows='',sd=F.side||side;
    for(var k=1;k<=K;k++){var h=Math.pow(10,-k),L=sd!=='right'?F.f(a-h):null,R=sd!=='left'?F.f(a+h):null;
      rows+='<tr><td>10^−'+k+' = '+nf(h,8)+'</td><td>'+(L==null?'—':nf(L,7))+'</td><td>'+(R==null?'—':nf(R,7))+'</td></tr>';}
    tb.innerHTML='<table class="tb"><thead><tr><th>a에서 떨어진 거리</th><th>왼쪽에서 (x = '+a+' − 거리)</th><th>오른쪽에서 (x = '+a+' + 거리)</th></tr></thead><tbody>'+rows+'</tbody></table>';
    var at=F.f(a);ou.innerHTML='<p>x = '+a+'을 바로 넣으면: <b>'+(at!==at?'계산 불가 (0/0)':nf(at))+'</b></p>'+
      (F.lim!=null?'<p class="g">표의 값이 <b>'+nf(F.lim)+'</b> 쪽으로 모여요. 그래서 극한값은 '+nf(F.lim)+'.</p>':'<p class="a">왼쪽에서는 '+F.L+', 오른쪽에서는 '+F.R+'로 가요. 두 길의 도착지가 달라서 극한은 「없음」.</p>');}
  draw();
};

/* ③ 대입해 보기: 분자·분모에 넣고 꼴 판정 */
var SUBS={
  a:{t:'(x² − 4) / (x − 2), x → 2',n:function(){return 0;},d:function(){return 0;},sn:'2² − 4 = 0',sd:'2 − 2 = 0'},
  b:{t:'(x² + 1) / (x + 1), x → 1',n:function(){return 2;},d:function(){return 2;},sn:'1 + 1 = 2',sd:'1 + 1 = 2'},
  c:{t:'sin x / x, x → 0',n:function(){return 0;},d:function(){return 0;},sn:'sin 0 = 0',sd:'0'},
  d:{t:'(x + 3) / x, x → 0',n:function(){return 3;},d:function(){return 0;},sn:'0 + 3 = 3',sd:'0'},
  e:{t:'(1 − cos x) / x², x → 0',n:function(){return 0;},d:function(){return 0;},sn:'1 − cos 0 = 1 − 1 = 0',sd:'0² = 0'},
  f:{t:'ln x / x, x → ∞',inf:true,sn:'ln x → ∞',sd:'x → ∞'}
};
W.subst=function(el,o){
  var ks=o.keys||['a','b','c','d','e'],k=ks[0],c=ctrl(el);radio(c,'식:',ks.map(function(x){return [x,SUBS[x].t];}),k,function(v){k=v;draw();});
  var bx=H('div',null,null,el),ou=out(el);
  function draw(){var S=SUBS[k],kind,cls;
    if(S.inf){kind='∞/∞ — 부정형 (정해지지 않은 꼴)';cls='a';}
    else{var n=S.n(),d=S.d();if(d!==0){kind='보통 수 '+nf(n/d)+' — 확정! 이게 극한값이에요';cls='g';}else if(n===0){kind='0/0 — 부정형 (정해지지 않은 꼴)';cls='a';}else{kind=n+'/0 — 0이 아닌 수 ÷ 0에 가까운 수 → 한없이 커짐 (극한 없음 또는 ±∞)';cls='r';}}
    bx.innerHTML='<div class="tw"><table class="tb"><tbody><tr><th>분자(위)에 넣기</th><td>'+S.sn+'</td></tr><tr><th>분모(아래)에 넣기</th><td>'+S.sd+'</td></tr></tbody></table></div>';
    ou.innerHTML='<p class="'+cls+'"><b>판정:</b> '+kind+'</p>'+(cls==='a'?'<p>부정형은 「답이 없다」는 뜻이 아니라 「대입만으로는 모른다」는 뜻이에요. 다른 방법(약분, 로피탈…)이 필요해요.</p>':cls==='g'?'<p>대입이 되면 거기서 끝. 로피탈을 쓸 이유가 없어요.</p>':'');}
  draw();
};

/* ④ 동시 도착 경주: f(x), g(x)가 함께 0으로 갈 때 비 */
var PAIRS={
  xx:{t:'x / x',f:function(x){return x;},g:function(x){return x;},lim:'1'},
  sq:{t:'x² / x',f:function(x){return x*x;},g:function(x){return x;},lim:'0'},
  inv:{t:'x / x²',f:function(x){return x;},g:function(x){return x*x;},lim:'∞'},
  k3:{t:'3x / x',f:function(x){return 3*x;},g:function(x){return x;},lim:'3'},
  sin:{t:'sin x / x',f:function(x){return Math.sin(x);},g:function(x){return x;},lim:'1'}
};
W.race=function(el,o){
  var ks=o.keys||['xx','sq','inv','k3'],k=o.pick||ks[0],x=o.x||1;
  var c=ctrl(el);radio(c,'경주:',ks.map(function(q){return [q,PAIRS[q].t];}),k,function(v){k=v;draw();});
  var s=svg(el,620,190,'두 선수의 남은 거리 막대'),ou=out(el);
  var c2=ctrl(el);slider(c2,'x (결승선 0까지 남은 정도)',-3,0,0.05,Math.log10(x),function(v){x=Math.pow(10,v);draw();return nf(x,4);});
  function draw(){var P=PAIRS[k],fv=P.f(x),gv=P.g(x),M=Math.max(Math.abs(fv),Math.abs(gv),1e-12);s.innerHTML='';
    [['위 선수 (분자) '+P.t.split(' / ')[0],fv,C.b,40],['아래 선수 (분모) '+P.t.split(' / ')[1],gv,C.m,110]].forEach(function(r){
      tx(s,10,r[3]-6,r[0]+' = '+nf(r[1],6),{'font-size':12,fill:r[2],'font-weight':700});
      E('rect',{x:10,y:r[3],width:Math.max(1.5,560*Math.abs(r[1])/M),height:22,rx:4,fill:r[2],opacity:.8},s);});
    E('line',{x1:10,y1:30,x2:10,y2:150,stroke:C.g,'stroke-width':3},s);tx(s,14,172,'← 결승선(0). 막대가 짧을수록 결승선에 가까움. 막대 길이는 둘 중 긴 쪽에 맞춰 늘려 그림',{'font-size':11,fill:C.mu});
    ou.innerHTML='<p>지금 비(위 ÷ 아래) = <b>'+nf(fv/gv,6)+'</b></p><p class="g">둘 다 0으로 가지만, 비는 <b>'+P.lim+'</b>(으)로 가요. 0/0의 답은 「누가 얼마나 빨리 0에 다가가나」로 정해져요.</p>';}
  draw();
};
DUELS.race=function(){var x=1e-3;return {fly:true,robo:false,report:'x = 0.001일 때 x²/x = '+nf(x*x/x,6)+', x/x² = '+nf(x/(x*x),2)+', 3x/x = 3. 같은 0/0인데 답이 0, ∞, 3으로 달라요. 그래서 「0/0 = 1」은 틀렸어요.'};};

/* 카드 묶음 (눌러서 펼치기) */
W.cards=function(el,o){var g=H('div','cardgrid',null,el);(o.cards||[]).forEach(function(cd){var d=H('details','card',null,g);H('summary',null,'<b>'+cd[0]+'</b>',d);H('div',null,cd[1],d);});};

/* ⑤ 평균 기울기 → 순간 기울기 (할선이 접선으로) */
var CURV={sq:{t:'y = x²',f:function(x){return x*x;},d:function(x){return 2*x;},xr:[-0.5,3],yr:[-0.5,6]},
  hill:{t:'언덕 y = 2 + sin x',f:function(x){return 2+Math.sin(x);},d:function(x){return Math.cos(x);},xr:[-0.5,4],yr:[0,4]},
  ex:{t:'y = eˣ',f:function(x){return Math.exp(x);},d:function(x){return Math.exp(x);},xr:[-1.5,2],yr:[-0.5,6]}};
W.secant=function(el,o){
  var k=o.curve||'sq',a=o.a!=null?o.a:1,h=o.h||1.5;
  var c0=ctrl(el);radio(c0,'곡선:',Object.keys(CURV).map(function(q){return [q,CURV[q].t];}),k,function(v){k=v;draw();});
  var g=H('div',null,null,el),ou=out(el);
  var c=ctrl(el);slider(c,'두 점 사이 거리 h',-3,0.3,0.05,Math.log10(h),function(v){h=Math.pow(10,v);draw();return nf(h,4);});
  function draw(){var F=CURV[k];g.innerHTML='';var P=plot(g,{w:620,h:300,xr:F.xr,yr:F.yr,fns:[{f:F.f,col:C.b}],label:F.t+'와 두 점을 잇는 직선'});
    var y1=F.f(a),y2=F.f(a+h),m=(y2-y1)/h;
    E('line',{x1:P.X(F.xr[0]),y1:P.Y(y1+m*(F.xr[0]-a)),x2:P.X(F.xr[1]),y2:P.Y(y1+m*(F.xr[1]-a)),stroke:C.r,'stroke-width':2,'stroke-dasharray':'6 4'},P.s);
    E('circle',{cx:P.X(a),cy:P.Y(y1),r:6,fill:C.k},P.s);E('circle',{cx:P.X(a+h),cy:P.Y(y2),r:6,fill:C.r},P.s);
    tx(P.s,P.X(a)-10,P.Y(y1)+22,'A',{'font-weight':700});tx(P.s,P.X(a+h)+8,P.Y(y2)-6,'B',{'font-weight':700,fill:C.r});
    ou.innerHTML='<p>평균 기울기 = (높이 차) ÷ (가로 거리) = ('+nf(y2,4)+' − '+nf(y1,4)+') ÷ '+nf(h,4)+' = <b>'+nf(m,5)+'</b></p><p class="'+(h<0.01?'g':'a')+'">'+(h<0.01?'h가 아주 작아지니 기울기가 <b>'+nf(F.d(a),4)+'</b> 근처에서 멈춰요. 이것이 A 자리의 <b>순간 기울기</b> f′('+a+')예요.':'h를 줄여 B를 A 쪽으로 데려와 보세요. 빨간 점선이 어떻게 변하나요?')+'</p>';}
  draw();
};
DUELS.slope=function(){var a=1,h=1e-4,m=((a+h)*(a+h)-a*a)/h;return {fly:true,robo:false,report:'y = x²에서 x = 1, h = 0.0001이면 기울기 = '+nf(m,6)+'. h를 0으로 보내면 2예요. 「h = 0을 넣으면 된다」면 0 ÷ 0이 돼서 계산이 안 돼요. 그래서 넣는 게 아니라 「다가가야」 해요.'};};

/* ⑥ 확대경: 확대할수록 곡선이 직선처럼 */
W.zoom=function(el,o){
  var k=o.curve||'hill',a=o.a!=null?o.a:1,z=1;
  var c0=ctrl(el);radio(c0,'곡선:',Object.keys(CURV).map(function(q){return [q,CURV[q].t];}),k,function(v){k=v;draw();});
  var g=H('div',null,null,el),ou=out(el);
  var c=ctrl(el);slider(c,'확대 배율',0,3,0.1,0,function(v){z=Math.pow(10,v);draw();return '×'+nf(z,1);});
  function draw(){var F=CURV[k],w=1.5/z,y0=F.f(a),m=F.d(a);g.innerHTML='';
    var hy=Math.max(Math.abs(m)*w*1.3,w*0.6);
    var P=plot(g,{w:620,h:300,xr:[a-w,a+w],yr:[y0-hy,y0+hy],fns:[{f:F.f,col:C.b,w:3}],label:'확대경으로 본 곡선'});
    if(o.tan!==false)E('line',{x1:P.X(a-w),y1:P.Y(y0-m*w),x2:P.X(a+w),y2:P.Y(y0+m*w),stroke:C.a,'stroke-width':1.6,'stroke-dasharray':'5 4'},P.s);
    E('circle',{cx:P.X(a),cy:P.Y(y0),r:5,fill:C.k},P.s);
    var dev=Math.max(Math.abs(F.f(a+w)-y0-m*w),Math.abs(F.f(a-w)-y0+m*w))/(2*hy);
    ou.innerHTML='<p>배율 ×'+nf(z,1)+': 파란 곡선과 주황 점선(직선)의 최대 차이는 화면 높이의 <b>'+nf(100*dev,2)+'%</b></p><p class="'+(dev<0.01?'g':'a')+'">'+(dev<0.01?'곡선이 거의 직선이에요. 이 직선의 기울기 '+nf(m,4)+'가 그 자리의 순간 기울기예요.':'더 크게 확대해 보세요. 곡선이 점점 곧게 보여요.')+'</p>';}
  draw();
};

/* ⑦ 미분 공식 카드 + 숫자로 확인 */
var DF=[['xn','x³','3x²',function(x){return x*x*x;},function(x){return 3*x*x;}],['c','5 (상수)','0',function(){return 5;},function(){return 0;}],
  ['sin','sin x','cos x',Math.sin,Math.cos],['cos','cos x','−sin x',Math.cos,function(x){return -Math.sin(x);}],
  ['exp','eˣ','eˣ',Math.exp,Math.exp],['ln','ln x','1/x',Math.log,function(x){return 1/x;}],['lin','3x + 1','3',function(x){return 3*x+1;},function(){return 3;}]];
W.dcards=function(el,o){
  var k=0,x0=o.x0||0.5;var c=ctrl(el);radio(c,'함수:',DF.map(function(d,i){return [i,d[1]];}),0,function(v){k=v;draw();});
  var c2=ctrl(el);slider(c2,'확인할 자리 x',0.1,2,0.1,x0,function(v){x0=v;draw();return nf(v,2);});var ou=out(el);
  function draw(){var d=DF[k],h=1e-5,num=(d[3](x0+h)-d[3](x0-h))/(2*h),fm=d[4](x0);
    ou.innerHTML='<div class="tw"><table class="tb"><tbody><tr><th>함수 f(x)</th><td><b>'+d[1]+'</b></td></tr><tr><th>공식으로 구한 도함수 f′(x)</th><td><b>'+d[2]+'</b> → x = '+nf(x0,2)+'에서 '+nf(fm,5)+'</td></tr><tr><th>숫자로 잰 기울기 (h = 0.00001)</th><td>'+nf(num,5)+'</td></tr></tbody></table></div><p class="g">공식과 숫자로 잰 기울기가 같아요. 공식은 「매번 h를 줄여 재는 일」을 미리 해 둔 결과표예요.</p>';}
  draw();
};
DUELS.dcards=function(){var x=0,h=1e-6,s=(Math.sin(x+h)-Math.sin(x-h))/(2*h);return {fly:true,robo:false,report:'sin x의 x = 0 기울기를 숫자로 재면 '+nf(s,6)+', 공식 cos 0 = 1. 「sin x를 미분하면 sin x」라는 주판봇 답은 틀렸어요(그건 eˣ의 성질).'};};
})();
