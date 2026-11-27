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
  meme:{t:'(1 − x¹⁰⁰) / (1 − x²)',a:1,f:function(x){return (1-Math.pow(x,100))/(1-x*x);},lim:50,yr:[0,60],xr:[0.6,1.03]},
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

/* 위젯 모음 2: 2~4부 (접선 근사 · 로피탈 걸음 · ∞/∞ · 변신 · 오용 · 컴퓨터와 AI · 종합) */
(function(){
'use strict';
var U=window.WU,C=window.WC,E=U.E,H=U.H,svg=U.svg,ctrl=U.ctrl,btn=U.btn,radio=U.radio,slider=U.slider,out=U.out,tx=U.tx,plot=U.plot,nf=U.nf;

/* ① 접선 근사: f(x) ≈ f(a) + f′(a)(x − a) */
W.tangent=function(el,o){
  var F={f:Math.sin,d:Math.cos,t:'sin x'},a=0,x=0.5;
  var g=H('div',null,null,el),ou=out(el);
  var c=ctrl(el);slider(c,'x (a = 0에서 얼마나 떨어졌나)',0.01,1.5,0.01,x,function(v){x=v;draw();return nf(v,2);});
  function draw(){g.innerHTML='';var P=plot(g,{w:620,h:280,xr:[-0.5,1.6],yr:[-0.5,1.6],fns:[{f:F.f,col:C.b,w:3},{f:function(t){return F.f(a)+F.d(a)*(t-a);},col:C.a,dash:'6 4'}],label:'sin x와 접선 y = x'});
    var y=F.f(x),l=F.f(a)+F.d(a)*(x-a);E('line',{x1:P.X(x),y1:P.Y(y),x2:P.X(x),y2:P.Y(l),stroke:C.r,'stroke-width':3},P.s);
    tx(P.s,P.p+8,P.p+18,'파랑: y = sin x     주황 점선: 접선 y = x (0에서의 기울기 cos 0 = 1)',{'font-size':12});
    ou.innerHTML='<p>x = '+nf(x,2)+': 진짜 값 sin x = <b>'+nf(y,5)+'</b>, 직선 근사 = <b>'+nf(l,5)+'</b>, 차이(빨간 선) = '+nf(l-y,5)+' (x의 '+nf(100*(l-y)/x,2)+'%)</p><p class="'+(x<0.2?'g':'a')+'">'+(x<0.2?'a에 가까울수록 직선 근사가 진짜 값과 거의 같아요. 이것이 접선 근사(일차 근사)예요.':'x를 0 쪽으로 줄여 보세요. 차이가 x보다 훨씬 빨리 줄어들어요.')+'</p>';}
  draw();
};

/* ② 두 함수가 같은 점에서 0일 때: 값의 비 ≈ 기울기의 비 (원자료 그림의 확대경) */
var TW={
  ex:{t:'f = sin x,  g = eˣ − 1',f:Math.sin,g:function(x){return Math.exp(x)-1;},fd:Math.cos,gd:Math.exp,a:0},
  q:{t:'f = x² − 4,  g = x − 2',f:function(x){return x*x-4;},g:function(x){return x-2;},fd:function(x){return 2*x;},gd:function(){return 1;},a:2},
  run:{t:'f = 위 선수 3t + t²,  g = 아래 선수 2t',f:function(t){return 3*t+t*t;},g:function(t){return 2*t;},fd:function(t){return 3+2*t;},gd:function(){return 2;},a:0}
};
W.twoline=function(el,o){
  var k=o.pick||'ex',z=1;var c0=ctrl(el);radio(c0,'두 함수:',(o.keys||['ex','q']).map(function(q){return [q,TW[q].t];}),k,function(v){k=v;draw();});
  var g=H('div',null,null,el),ou=out(el);var c=ctrl(el);slider(c,'확대 배율',0,3,0.1,0,function(v){z=Math.pow(10,v);draw();return '×'+nf(z,1);});
  function draw(){var T=TW[k],a=T.a,w=1.2/z,h=w*Math.max(T.fd(a),T.gd(a))*1.3;g.innerHTML='';
    var P=plot(g,{w:620,h:300,xr:[a-w,a+w],yr:[-h,h],fns:[{f:T.f,col:C.g,w:3},{f:T.g,col:C.r,w:3}],label:'두 함수와 확대'});
    var x=a+w*0.6,fv=T.f(x),gv=T.g(x);E('line',{x1:P.X(x),y1:P.Y(0),x2:P.X(x),y2:P.Y(fv),stroke:C.g,'stroke-width':5,opacity:.5},P.s);E('line',{x1:P.X(x)+6,y1:P.Y(0),x2:P.X(x)+6,y2:P.Y(gv),stroke:C.r,'stroke-width':5,opacity:.5},P.s);
    E('circle',{cx:P.X(a),cy:P.Y(0),r:5,fill:C.k},P.s);tx(P.s,P.p+8,P.p+18,'초록 = f, 빨강 = g. 세로 막대 = 오른쪽 점에서의 f 값과 g 값',{'font-size':12});
    ou.innerHTML='<p>오른쪽 점 x = '+nf(x,5)+'에서 f ÷ g = '+nf(fv,5)+' ÷ '+nf(gv,5)+' = <b>'+nf(fv/gv,5)+'</b></p><p>a = '+a+'에서의 기울기 비 f′(a) ÷ g′(a) = '+nf(T.fd(a),4)+' ÷ '+nf(T.gd(a),4)+' = <b>'+nf(T.fd(a)/T.gd(a),5)+'</b></p><p class="'+(z>20?'g':'a')+'">'+(z>20?'크게 확대하니 두 곡선이 모두 직선처럼 보이고, 값의 비가 기울기의 비와 거의 같아졌어요.':'배율을 올려 보세요. 두 곡선이 직선처럼 펴지면서 두 비가 가까워져요.')+'</p>';}
  draw();
};
DUELS.twoline=function(){var x=1e-3,r=Math.sin(x)/(Math.exp(x)-1);return {fly:true,robo:false,report:'x = 0.001에서 sin x ÷ (eˣ − 1) = '+nf(r,5)+'. 기울기 비 cos 0 ÷ e⁰ = 1과 거의 같아요. 「0 ÷ 0이니 0」이라는 답은 틀렸어요.'};};

/* ③ 로피탈 걸음 엔진: 매 걸음마다 「대입」 → 0/0(∞/∞)이면 「위아래 따로 미분」, 아니면 「멈추고 답」 */
var LH={
  q4:{t:'(x² − 4)/(x − 2), x → 2',s:[{e:'(x² − 4) / (x − 2)',v:'0 / 0',d:1,dn:'(x² − 4)′ = 2x',dd:'(x − 2)′ = 1'},{e:'2x / 1',v:'4 / 1 = 4',ans:'4'}],qbad:'몫의 미분으로 하면 ((2x)(x − 2) − (x² − 4)·1)/(x − 2)²이 되어 다시 0/0, 식만 복잡해져요.'},
  ex1:{t:'(eˣ − 1)/x, x → 0',s:[{e:'(eˣ − 1) / x',v:'0 / 0',d:1,dn:'(eˣ − 1)′ = eˣ',dd:'(x)′ = 1'},{e:'eˣ / 1',v:'1 / 1 = 1',ans:'1'}]},
  sinc:{t:'sin x / x, x → 0 (계산 연습용)',s:[{e:'sin x / x',v:'0 / 0',d:1,dn:'(sin x)′ = cos x',dd:'(x)′ = 1'},{e:'cos x / 1',v:'1 / 1 = 1',ans:'1'}],note:'계산은 맞아요. 다만 「sin x의 도함수가 cos x」라는 사실을 증명할 때 이 극한을 이미 써요. 증명 문제라면 10장의 순환 논리를 보세요.'},
  cos2:{t:'(1 − cos x)/x², x → 0',s:[{e:'(1 − cos x) / x²',v:'0 / 0',d:1,dn:'(1 − cos x)′ = 0 − (−sin x) = sin x',dd:'(x²)′ = 2x'},{e:'sin x / (2x)',v:'0 / 0',d:1,dn:'(sin x)′ = cos x',dd:'(2x)′ = 2'},{e:'cos x / 2',v:'1 / 2',ans:'1/2'}]},
  ex2:{t:'(eˣ − 1 − x)/x², x → 0',s:[{e:'(eˣ − 1 − x) / x²',v:'0 / 0',d:1,dn:'(eˣ − 1 − x)′ = eˣ − 1',dd:'(x²)′ = 2x'},{e:'(eˣ − 1) / (2x)',v:'0 / 0',d:1,dn:'(eˣ − 1)′ = eˣ',dd:'(2x)′ = 2'},{e:'eˣ / 2',v:'1 / 2',ans:'1/2'}]},
  exq:{t:'(eˣ − 1)/(x² + x), x → 0',s:[{e:'(eˣ − 1) / (x² + x)',v:'0 / 0',d:1,dn:'(eˣ − 1)′ = eˣ',dd:'(x² + x)′ = 2x + 1'},{e:'eˣ / (2x + 1)',v:'1 / 1 = 1',ans:'1',bad:'eˣ / 2 → 1/2 (오답). 0/0이 아닌데 또 미분했어요.'}]},
  meme:{t:'(1 − x¹⁰⁰)/(1 − x²), x → 1',s:[{e:'(1 − x¹⁰⁰) / (1 − x²)',v:'0 / 0',d:1,dn:'(1 − x¹⁰⁰)′ = −100x⁹⁹',dd:'(1 − x²)′ = −2x'},{e:'(−100x⁹⁹) / (−2x)',v:'−100 / −2 = 50',ans:'50'}],note:'로피탈 없이도 1 − x¹⁰⁰ = (1 − x²)(1 + x² + x⁴ + … + x⁹⁸)로 약분하면 1이 50개 → 50. 같은 답이에요.'},
  notf:{t:'(x² + 1)/(x + 1), x → 1',s:[{e:'(x² + 1) / (x + 1)',v:'2 / 2 = 1',ans:'1',bad:'2x / 1 → 2 (오답). 처음부터 0/0이 아니었어요.'}]},
  lnx:{t:'ln x / x, x → ∞',s:[{e:'ln x / x',v:'∞ / ∞',d:1,dn:'(ln x)′ = 1/x',dd:'(x)′ = 1'},{e:'(1/x) / 1',v:'0 / 1 = 0',ans:'0'}]},
  x2e:{t:'x² / eˣ, x → ∞',s:[{e:'x² / eˣ',v:'∞ / ∞',d:1,dn:'(x²)′ = 2x',dd:'(eˣ)′ = eˣ'},{e:'2x / eˣ',v:'∞ / ∞',d:1,dn:'(2x)′ = 2',dd:'(eˣ)′ = eˣ'},{e:'2 / eˣ',v:'2 / ∞ → 0',ans:'0'}]},
  loop:{t:'x / √(x² + 1), x → ∞',s:[{e:'x / √(x² + 1)',v:'∞ / ∞',d:1,dn:'(x)′ = 1',dd:'(√(x² + 1))′ = x/√(x² + 1) → 정리하면 √(x² + 1)/x'},{e:'√(x² + 1) / x',v:'∞ / ∞',d:1,dn:'(√(x² + 1))′ = x/√(x² + 1)',dd:'(x)′ = 1 → 정리하면 x/√(x² + 1)'},{e:'x / √(x² + 1)',v:'∞ / ∞ (처음과 같은 식!)',d:1,loop:1}]}
};
W.lh=function(el,o){
  var ks=o.keys||['q4'],k=ks[0],i,log,done,c0;
  if(ks.length>1){c0=ctrl(el);radio(c0,'문제:',ks.map(function(q){return [q,LH[q].t];}),k,function(v){k=v;reset();});}
  var box=H('div','lhbox',null,el),c=ctrl(el),ou=out(el);
  var bS=btn(c,'① 대입해 보기',function(){act('s');}),bD=btn(c,'② 위아래 따로 미분',function(){act('d');}),bA=btn(c,'③ 멈추고 답 쓰기',function(){act('a');}),bR=btn(c,'처음부터',function(){reset();});
  var subbed;
  function reset(){i=0;log=[];done=false;subbed=false;render('대입부터 해 보세요. 로피탈은 0/0이나 ∞/∞일 때만 쓰는 도구예요.','');}
  function render(msg,cls){var P=LH[k],h='<ol class="lhsteps">';
    for(var j=0;j<=Math.min(i,P.s.length-1);j++){var st=P.s[j],last=j===i;h+='<li'+(last?' class="now"':'')+'><b>'+st.e+'</b>'+((j<i||(last&&subbed))?' <span class="note">→ 대입: '+st.v+'</span>':'')+'</li>';}
    h+='</ol>'+log.map(function(l){return '<p class="'+l[1]+'">'+l[0]+'</p>';}).join('');box.innerHTML=h;ou.innerHTML='<p class="'+(cls||'')+'">'+msg+'</p>';}
  function act(a){if(done){render('끝났어요. 다른 문제를 고르거나 「처음부터」를 누르세요.','');return;}var P=LH[k],st=P.s[i];
    if(a==='s'){subbed=true;render(st.d?'대입 결과 '+st.v+' — 정해지지 않은 꼴이에요. 이제 무엇을 할까요?':'대입 결과 '+st.v+' — 보통 수가 나왔어요. 이제 무엇을 할까요?',st.d?'a':'g');return;}
    if(!subbed){render('먼저 ① 대입해 보기! 꼴을 확인하지 않고 미분하는 게 가장 흔한 실수예요.','r');return;}
    if(a==='d'){if(st.d){if(st.loop){log.push(['식이 처음과 똑같아졌어요. 무한 루프! 로피탈로는 답이 안 나와요. 분자·분모를 x로 나누면 x/√(x² + 1) = 1/√(1 + 1/x²) → <b>1</b>.','a']);done=true;render('로피탈이 틀린 게 아니라 「이 길로는 도착 못 함」이라는 신호예요.','a');return;}
        i++;subbed=false;log.push([(i)+'번째 미분 — 위(분자): <b>'+(st.dn||'')+'</b> · 아래(분모): <b>'+(st.dd||'')+'</b> <span class="note">(03장 공식 카드)</span>','']);render('새 식이 나왔어요. 다시 ① 대입부터!','');}
      else{log.push(['🚫 '+(st.bad||'0/0이 아닌데 미분하면 틀린 답이 나와요.'),'r']);render('대입 결과가 이미 보통 수예요. 여기서는 미분하면 안 돼요. ③을 눌러 보세요.','r');}return;}
    if(a==='a'){if(st.d){render('아직 '+st.v+' 꼴이라 답을 쓸 수 없어요.','r');return;}done=true;log.push(['답: <b>'+st.ans+'</b>'+(P.note?' — '+P.note:''),'g']);render('정답이에요. 「대입 → 꼴 확인 → 필요할 때만 미분」 순서를 지켰어요.'+(P.qbad?' 참고: '+P.qbad:''),'g');}}
  reset();
};
window.LHDATA=LH;
DUELS.lh5=function(){var x=1e-4;return {fly:true,robo:false,report:'x = 1.9999에서 (x² − 4)/(x − 2) = '+nf(((2-x)*(2-x)-4)/(-x),5)+'. 로피탈 답 2x/1 → 4와 맞아요. 몫의 미분((f/g)′)으로 구하면 0/0이 또 나와 답을 못 내요. 둘은 다른 규칙이에요.'};};
DUELS.rep=function(){var x=1e-3,v=(1-Math.cos(x))/(x*x);return {fly:true,robo:false,report:'x = 0.001에서 (1 − cos x)/x² = '+nf(v,6)+'. 두 번 미분한 답 1/2과 맞아요. 한 번만 하고 「sin x/(2x)에 0을 넣으면 0」이라고 하면 틀려요 — 그건 아직 0/0이에요.'};};
DUELS.notform=function(){var v=(1*1+1)/(1+1);return {fly:true,robo:false,report:'x = 1을 그냥 넣으면 (1 + 1)/(1 + 1) = '+v+'. 미분해서 얻은 2는 틀린 답이에요. 처음부터 0/0이 아니었으니까요.'};};

/* ④ 자라는 속도 경주: 분자·분모가 함께 ∞ */
var GR={ln:['ln x',Math.log],x:['x',function(x){return x;}],x2:['x²',function(x){return x*x;}],x5:['x⁵',function(x){return Math.pow(x,5);}],ex:['eˣ',Math.exp]};
W.growth=function(el,o){
  var a=o.a||'x2',b=o.b||'ex',X=o.X||10;
  var c=ctrl(el);radio(c,'위(분자):',Object.keys(GR).map(function(q){return [q,GR[q][0]];}),a,function(v){a=v;draw();});
  var c2=ctrl(el);radio(c2,'아래(분모):',Object.keys(GR).map(function(q){return [q,GR[q][0]];}),b,function(v){b=v;draw();});
  var tb=H('div','tw',null,el),ou=out(el);var c3=ctrl(el);slider(c3,'x 크기',1,3,0.05,Math.log10(X),function(v){X=Math.pow(10,v);draw();return nf(X,0);});
  function draw(){var A=GR[a],B=GR[b],rows='';[10,50,100,X].forEach(function(x,i){var va=A[1](x),vb=B[1](x);rows+='<tr'+(i===3?' style="font-weight:700"':'')+'><td>'+nf(x,0)+'</td><td>'+nf(va,3)+'</td><td>'+nf(vb,3)+'</td><td>'+nf(va/vb,6)+'</td></tr>';});
    tb.innerHTML='<table class="tb"><thead><tr><th>x</th><th>'+A[0]+'</th><th>'+B[0]+'</th><th>비 '+A[0]+' ÷ '+B[0]+'</th></tr></thead><tbody>'+rows+'</tbody></table>';
    var rank={ln:0,x:1,x2:2,x5:3,ex:4},ra=rank[a],rb=rank[b];
    ou.innerHTML='<p class="g">'+(ra<rb?'아래가 훨씬 빨리 자라요 → 비는 <b>0</b>으로':ra>rb?'위가 훨씬 빨리 자라요 → 비는 <b>∞</b>로':'같은 식이라 비는 1')+'. 자라는 빠르기 순서: ln x &lt; x &lt; x² &lt; x⁵ &lt; eˣ</p>'+(a==='x5'&&b==='ex'?'<p class="a">x가 작을 때는 x⁵가 이기는 것처럼 보여요. x를 끝까지 키워 보세요. 결국 eˣ가 이겨요.</p>':'');}
  draw();
};
DUELS.growth=function(){var x=50,v=Math.pow(x,5)/Math.exp(x);return {fly:true,robo:false,report:'x = 10에서 x⁵/eˣ = '+nf(Math.pow(10,5)/Math.exp(10),2)+'로 크지만, x = 50이면 '+nf(v,3)+', x = 100이면 '+nf(Math.pow(100,5)/Math.exp(100),2)+'. 로피탈을 다섯 번 쓰면 120/eˣ → 0. 결국 지수가 이겨요.'};};

/* ⑤ 줄다리기 0 · ∞ : x ln x */
W.tug=function(el,o){
  var x=0.1,g=H('div',null,null,el),ou=out(el);var c=ctrl(el);slider(c,'x (0에 얼마나 가까운가)',-6,0,0.1,-1,function(v){x=Math.pow(10,v);draw();return nf(x,6);});
  function draw(){g.innerHTML='';var P=plot(g,{w:620,h:260,xr:[0,1.1],yr:[-0.45,0.15],fns:[{f:function(t){return t>0?t*Math.log(t):NaN;},col:C.b,w:3}],label:'x ln x 그래프'});
    var xs=Math.max(x,0.002);E('circle',{cx:P.X(xs),cy:P.Y(xs*Math.log(xs)),r:6,fill:C.r},P.s);E('circle',{cx:P.X(0),cy:P.Y(0),r:6,fill:'#fff',stroke:C.g,'stroke-width':3},P.s);
    ou.innerHTML='<div class="tw"><table class="tb"><tbody><tr><th>x (0으로 끌어당김)</th><td>'+nf(x,7)+'</td></tr><tr><th>ln x (−∞로 끌어당김)</th><td>'+nf(Math.log(x),4)+'</td></tr><tr><th>곱 x · ln x</th><td><b>'+nf(x*Math.log(x),7)+'</b></td></tr></tbody></table></div><p class="g">줄다리기는 x가 이겨요. 곱은 0으로 가요. 로피탈로 보려면 ln x ÷ (1/x) (∞/∞)로 바꿔 쓰면 (1/x) ÷ (−1/x²) = −x → 0.</p>';}
  draw();
};

/* ⑥ 복리: (1 + 1/n)ⁿ → e */
W.compound=function(el,o){
  var n=o.n||12,s=svg(el,620,180,'복리 횟수에 따른 1년 뒤 금액 막대'),ou=out(el);
  var c=ctrl(el);slider(c,'1년에 이자를 나눠 붙이는 횟수 n',0,6,0.05,Math.log10(n),function(v){n=Math.round(Math.pow(10,v));draw();return n.toLocaleString('ko-KR')+'번';});
  function draw(){s.innerHTML='';var v=Math.pow(1+1/n,n),M=2.9,cases=[[1,'1번'],[12,'매달'],[365,'매일'],[n,'지금 n']];
    cases.forEach(function(cs,i){var val=Math.pow(1+1/cs[0],cs[0]),y=14+i*38;tx(s,6,y+16,cs[1],{'font-size':12});E('rect',{x:70,y:y,width:500*val/M,height:24,rx:4,fill:i===3?C.b:C.mu,opacity:i===3?.85:.45},s);tx(s,76+500*val/M,y+16,nf(val,6)+'배',{'font-size':12,fill:i===3?C.b:C.k});});
    E('line',{x1:70+500*Math.E/M,y1:6,x2:70+500*Math.E/M,y2:166,stroke:C.g,'stroke-width':2,'stroke-dasharray':'5 4'},s);tx(s,70+500*Math.E/M-80,176,'e = 2.71828… (넘지 못하는 벽)',{'font-size':11,fill:C.g});
    ou.innerHTML='<p>연 이자율 100%, n번 나눠 붙이면 1년 뒤 원금의 (1 + 1/n)ⁿ = <b>'+nf(v,7)+'배</b>. e와의 차이 '+nf(Math.E-v,7)+'</p><p class="'+(n>=1000?'g':'a')+'">n을 아무리 늘려도 e를 넘지 못해요. 1에 가까운 수(1 + 1/n)를 끝없이 거듭제곱하는 「1^∞」 꼴의 답이 e예요.</p>';}
  draw();
};
DUELS.comp=function(){var v=Math.pow(1+1/1e6,1e6);return {fly:true,robo:false,report:'n = 1,000,000이면 (1 + 1/n)ⁿ = '+nf(v,6)+'. 「1을 몇 번 곱해도 1」은 틀렸어요. 1보다 아주 조금 큰 수를 아주 많이 곱하는 경주라서, 답은 e = 2.71828…이에요.'};};

/* ⑦ 미분한 비가 흔들릴 때: (x + sin x)/x 와 1 + cos x */
W.osc=function(el,o){
  var R=o.R||60,g=H('div',null,null,el),ou=out(el);var c=ctrl(el);slider(c,'x 범위 끝',20,200,5,R,function(v){R=v;draw();return nf(v,0);});
  function draw(){g.innerHTML='';plot(g,{w:620,h:280,xr:[1,R],yr:[-0.2,2.2],n:900,fns:[{f:function(x){return 1+Math.cos(x);},col:C.r,w:1.6},{f:function(x){return (x+Math.sin(x))/x;},col:C.b,w:3}],label:'원래 비와 미분한 비'});
    ou.innerHTML='<p><span style="color:var(--info)">파랑</span>: 원래 비 (x + sin x)/x → x = '+R+'에서 '+nf((R+Math.sin(R))/R,5)+' (1로 모임)</p><p><span style="color:#c9302c">빨강</span>: 미분한 비 (1 + cos x)/1 → 0과 2 사이를 끝없이 왔다 갔다</p><p class="a">미분한 비의 극한이 없으면 로피탈은 아무 말도 해 주지 않아요. 「원래 극한도 없다」가 아니에요 — 이 예에서는 원래 극한이 1로 멀쩡히 있어요.</p>';}
  draw();
};
DUELS.osc=function(){var x=1000;return {fly:true,robo:false,report:'x = 1000에서 원래 비 = '+nf((x+Math.sin(x))/x,5)+'. x를 키울수록 1로 모여요. 미분한 비 1 + cos x는 진동하지만, 그것으로 「원래 극한도 없다」고 결론 내리면 틀려요.'};};

/* ⑧ 슈톨츠 반례: g′가 끝없이 0이 되는 함정 */
W.stolz=function(el,o){
  var R=o.R||40,g=H('div',null,null,el),ou=out(el);var c=ctrl(el);slider(c,'x 범위 끝',15,120,5,R,function(v){R=v;draw();return nf(v,0);});
  function f(x){return x+Math.sin(x)*Math.cos(x);}function gg(x){return Math.exp(Math.sin(x))*f(x);}
  function fd(x){return 2*Math.cos(x)*Math.cos(x);}function gd(x){return Math.exp(Math.sin(x))*Math.cos(x)*(f(x)+2*Math.cos(x));}
  function draw(){g.innerHTML='';plot(g,{w:620,h:280,xr:[1,R],yr:[-0.6,3],n:1200,fns:[{f:function(x){return f(x)/gg(x);},col:C.b,w:3},{f:function(x){var d=gd(x);return Math.abs(d)<1e-9?NaN:fd(x)/d;},col:C.r,w:1.6}],label:'슈톨츠 반례'});
    ou.innerHTML='<p><span style="color:var(--info)">파랑</span>: 원래 비 f/g = e^(−sin x) → 0.37과 2.72 사이를 계속 왔다 갔다 (극한 없음)</p><p><span style="color:#c9302c">빨강</span>: 미분한 비 f′/g′ → 점점 0에 붙음</p><p class="a">미분한 비는 0으로 가는데 원래 비는 극한이 없어요! 범인은 g′(x) = 0이 되는 점이 끝없이 나온다는 것(cos x = 0인 곳). 그래서 조건 「g′(x) ≠ 0」이 꼭 필요해요.</p>';}
  draw();
};

/* ⑨ 컴퓨터의 0/0: 자릿수 잃기 */
W.float=function(el,o){
  var k=o.k||4,ou=out(el);var c=ctrl(el);slider(c,'x = 10의 −k제곱, k',1,9,1,k,function(v){k=v;draw();return 'x = 10^−'+v;});
  var tb=H('div','tw',null,el);
  function draw(){var rows='';for(var j=1;j<=9;j++){var x=Math.pow(10,-j),naive=(1-Math.cos(x))/(x*x),s=Math.sin(x/2),safe=2*s*s/(x*x);
      rows+='<tr'+(j===k?' style="font-weight:700;background:var(--info-soft)"':'')+'><td>10^−'+j+'</td><td'+(Math.abs(naive-0.5)>1e-6?' style="color:#c9302c"':'')+'>'+nf(naive,9)+'</td><td>'+nf(safe,9)+'</td></tr>';}
    tb.innerHTML='<table class="tb"><thead><tr><th>x</th><th>그대로 계산 (1 − cos x)/x²</th><th>바꿔 쓴 식 2 sin²(x/2)/x²</th></tr></thead><tbody>'+rows+'</tbody></table>';
    var x=Math.pow(10,-k),cx=Math.cos(x);ou.innerHTML='<p>x = 10^−'+k+'일 때 컴퓨터 속 cos x = '+cx.toPrecision(17)+' → 1 − cos x = '+nf(1-cx,3)+'</p><p class="'+(k>=7?'r':'g')+'">'+(k>=8?'cos x가 1과 구별이 안 돼서 1 − cos x가 0이 됐어요. 진짜 답은 0.5인데 컴퓨터는 0을 내놓아요!':k>=6?'유효숫자가 줄어 오차가 커지기 시작했어요(빨간 글자).':'아직은 0.5에 가까워요.')+'</p><p>오른쪽 열처럼 같은 식을 빼기 없이 바꿔 쓰면 끝까지 0.5를 지켜요. 수학의 극한과 컴퓨터 계산은 다를 수 있어요.</p>';}
  draw();
};
DUELS.float=function(){var x=1e-8,v=(1-Math.cos(x))/(x*x);return {fly:true,robo:false,report:'컴퓨터로 x = 10^−8을 넣으면 (1 − cos x)/x² = '+nf(v,3)+'. 하지만 진짜 극한은 0.5예요. 「x를 작게 할수록 정확하다」는 컴퓨터에서는 틀릴 수 있어요.'};};

/* ⑩ AI 채점표: 0 · log 0 */
W.entropy=function(el,o){
  var rule='lim',p=0;var c=ctrl(el);radio(c,'0 · log 0 처리:',[['nan','그대로 계산 (NaN)'],['lim','극한값 0으로'],['eps','아주 작은 수 ε 더하기']],rule,function(v){rule=v;draw();});
  var c2=ctrl(el);slider(c2,'모델이 「고양이」에 준 확률 p',0,1,0.01,p,function(v){p=v;draw();return nf(v,2);});var ou=out(el);
  function term(q,y){if(y===0)return 0;if(q===0){if(rule==='nan')return NaN;if(rule==='eps')return -y*Math.log(q+1e-7);return Infinity;}return -y*Math.log(q);}
  function plogp(q){if(q===0)return rule==='nan'?NaN:rule==='eps'?(q*Math.log(q+1e-7)):0;return q*Math.log(q);}
  function draw(){var dist=[p,1-p],H0=-(plogp(dist[0])+plogp(dist[1]));var L=term(1-p,1);
    ou.innerHTML='<div class="tw"><table class="tb"><tbody><tr><th>모델의 예측</th><td>고양이 '+nf(p,2)+' · 강아지 '+nf(1-p,2)+' (정답은 강아지)</td></tr><tr><th>예측의 엔트로피 −Σ p log p</th><td><b>'+nf(H0,5)+'</b></td></tr><tr><th>교차 엔트로피 손실 −log(강아지 확률)</th><td><b>'+nf(L,5)+'</b></td></tr></tbody></table></div>'+
      (p===0||p===1?'<p class="'+(rule==='nan'?'r':'g')+'">'+(rule==='nan'?'확률 0이 나오자 0 · log 0 = 0 · (−∞) 계산에서 NaN이 퍼졌어요. 학습이 멈추는 원인이 돼요.':rule==='lim'?'극한 x · ln x → 0을 근거로 0 · log 0 = 0으로 약속했어요. 엔트로피가 제대로 나와요.':'ε를 더해 NaN을 피했어요. 대신 아주 작은 오차가 섞여요.')+'</p>':'<p>p를 0이나 1로 끝까지 밀어 보세요. 확률 0이 나오는 순간 문제가 생겨요.</p>');}
  draw();
};

/* ⑪ 기말 쪽지시험 (여러 문항, 점수) */
W.exam=function(el,o){var qs=o.qs||[],ans={},box=H('div',null,null,el),ou=out(el);
  qs.forEach(function(q,i){var d=H('div','item',null,box);H('p','qq','Q'+(i+1)+'. '+q[0],d);var g=H('div','opts',null,d),fb=H('div','fb',null,d);
    q[1].forEach(function(t,j){var b=btn(g,t,function(){[].forEach.call(g.children,function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});ans[i]=j;fb.innerHTML=j===q[2]?'<b style="color:var(--gfp)">맞았어요.</b> '+q[3]:'<b style="color:var(--eye)">다시 볼까요?</b> '+q[3];score();},false);});});
  function score(){var n=0,m=0;qs.forEach(function(q,i){if(ans[i]!=null){m++;if(ans[i]===q[2])n++;}});ou.innerHTML='<p>푼 문제 '+m+' / '+qs.length+', 맞힌 문제 <b>'+n+'</b>'+(m===qs.length?(n>=Math.ceil(qs.length*0.7)?' — <span class="g">졸업 발표 자격 통과!</span>':' — <span class="a">70% 미만이에요. 틀린 문제의 장으로 돌아가 다시 보고 와요. 기록은 저장되지 않아요.</span>'):'')+'</p>';}
  score();};
DUELS.final=function(){return {fly:true,robo:false,report:'(x² + 1)/(x + 1)는 x = 1에서 2/2 = 1로 대입이 되고, (x + sin x)/x는 미분한 비가 진동하고, sin x/x를 증명에 쓰면 순환이에요. 「무조건 로피탈」은 세 번 모두 틀렸어요. 판정 순서 ① 대입이 먼저예요.'};};
})();

