/* 실전 연습장: 로피탈 교실 사업장 시뮬레이터 (외부 라이브러리 없음, 기록은 현재 탭에만) */
(function(){
'use strict';
var U=window.WU,C=window.WC,E=U.E,H=U.H,svg=U.svg,tx=U.tx,nf=U.nf;
var root=document.getElementById('sim');if(!root)return;
var SC={};
function kpi(cls,val,label){return '<div class="kpi '+cls+'"><b>'+val+'</b><span>'+label+'</span></div>';}
function sayH(who,mood,text){return '<div class="say" data-who="'+who+'"><img class="who" data-who="'+who+'" data-mood="'+mood+'" alt="" aria-hidden="true"><div><b class="name">'+Cast.names[who]+'</b><p>'+text+'</p></div></div>';}
function grp(title,cls,inner){return '<div class="cgrp '+cls+'"><div class="ct">'+title+'</div>'+inner+'</div>';}
function btns(id,opts,cur){return '<div class="ctrl" data-k="'+id+'">'+opts.map(function(o){return '<button type="button" class="bt" data-v="'+o[0]+'" aria-pressed="'+(String(o[0])===String(cur))+'">'+o[1]+'</button>';}).join('')+'</div>';}
function rng(id,label,min,max,step,val){return '<div class="ctrl"><span class="glabel">'+label+'</span><input type="range" data-k="'+id+'" min="'+min+'" max="'+max+'" step="'+step+'" value="'+val+'" aria-label="'+label+'"><span class="val" data-v="'+id+'"></span></div>';}
/* 작은 그래프: 가로축 로그(10의 거듭제곱 지수), 세로축 로그 또는 보통 */
function mini(el,title,pts,cur,opt){var s=svg(el,320,210,title),L=40,R=310,T=26,B=180;tx(s,8,16,title,{'font-size':12,fill:C.mu});
  var xs=pts.map(function(p){return p[0];}),ys=pts.map(function(p){return p[1];}).filter(isFinite);
  var x0=opt.x0!=null?opt.x0:Math.min.apply(null,xs),x1=opt.x1!=null?opt.x1:Math.max.apply(null,xs),y0=opt.y0!=null?opt.y0:Math.min.apply(null,ys),y1=opt.y1!=null?opt.y1:Math.max.apply(null,ys);
  function X(v){return L+(v-x0)/(x1-x0)*(R-L);}function Y(v){return B-(Math.max(y0,Math.min(y1,v))-y0)/(y1-y0)*(B-T);}
  E('rect',{x:L,y:T,width:R-L,height:B-T,fill:'#fff',stroke:C.rule},s);
  if(opt.band)E('rect',{x:L,y:Y(opt.band),width:R-L,height:B-Y(opt.band),fill:'rgba(19,115,58,.10)'},s);
  E('polyline',{points:pts.filter(function(p){return isFinite(p[1]);}).map(function(p){return X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1);}).join(' '),fill:'none',stroke:C.b,'stroke-width':2},s);
  if(opt.hline!=null){E('line',{x1:L,y1:Y(opt.hline),x2:R,y2:Y(opt.hline),stroke:C.g,'stroke-width':1.5,'stroke-dasharray':'5 4'},s);}
  if(cur)E('circle',{cx:X(cur[0]),cy:Y(cur[1]),r:6,fill:C.r},s);
  tx(s,L,B+16,opt.xl0||'',{'font-size':11,fill:C.mu});tx(s,R,B+16,opt.xl1||'',{'font-size':11,fill:C.mu,'text-anchor':'end'});tx(s,(L+R)/2,B+28,opt.xl||'',{'font-size':11,fill:C.mu,'text-anchor':'middle'});
  tx(s,L-4,T+8,opt.yl1||'',{'font-size':10,fill:C.mu,'text-anchor':'end'});tx(s,L-4,B,opt.yl0||'',{'font-size':10,fill:C.mu,'text-anchor':'end'});return s;}

/* ① 드론 속도계 공장 */
var RES=1e-6;function qz(v){return Math.round(v/RES)*RES;}
function speedErr(k,sensor){var h=Math.pow(10,-k),a=Math.exp(1+h),b=Math.exp(1);if(sensor==='cheap'){a=qz(a);b=qz(b);}var v=(a-b)/h;return {v:v,err:Math.abs(v-Math.E),h:h};}
SC.speed={title:'드론 속도계 공장',ch:'03_slope_derivative.html',chn:'03장 기울기와 미분',
  st:{sensor:'double',k:2},
  intro:'드론 고도 s(t) = eᵗ m (교육용 모형)를 재서 t = 1초의 <b>순간 속도</b>를 보여 주는 속도계를 만들어요. 속도계는 (s(1 + h) − s(1)) ÷ h를 계산해요. 진짜 답은 e ≈ 2.71828 m/s. 센서(초록)는 시장에서 사 오는 부품이고, 시간 간격 h(파랑)는 여러분이 정해요.',
  controls:function(st){return grp('시장 환경 · 고도 센서','env',btns('sensor',[['double','정밀 센서 (컴퓨터 숫자 그대로)'],['cheap','보급형 센서 (0.000001 m 단위로 반올림)']],st.sensor))+grp('내 결정 · 시간 간격 h = 10의 −k제곱 초','dec',rng('k','k',1,14,0.25,st.k));},
  calc:function(st){var r=speedErr(st.k,st.sensor);r.good=st.sensor==='double'?r.err<1e-6:r.err<0.005;return r;},
  scores:function(r,st){return kpi('m',nf(r.v,7),'속도계가 보여 준 속도 (m/s)')+kpi('a','2.7182818','진짜 순간 속도 e')+kpi(r.good?'g':'r',nf(r.err,3),'오차')+kpi(r.good?'g':'r',r.good?'합격':'불합격','출하 판정 (기준 '+(st.sensor==='double'?'10^−6':'0.005')+' 미만)');},
  graphs:function(r,st,g1,g2){var pts=[];for(var k=1;k<=14;k+=0.25)pts.push([k,Math.log10(Math.max(1e-12,speedErr(k,st.sensor).err))]);
    mini(g1,'h에 따른 오차 (위로 갈수록 나쁨, 로그 눈금)',pts,[st.k,Math.log10(Math.max(1e-12,r.err))],{x0:1,x1:14,y0:-10,y1:1,xl0:'h = 0.1',xl1:'h = 10^−14',xl:'h를 작게 →',yl1:'10',yl0:'10^−10',hline:Math.log10(st.sensor==='double'?1e-6:0.005)});
    var s=svg(g2,320,210,'고도 그래프와 두 점'),X=function(t){return 30+(t-0.8)/0.6*270;},Y=function(v){return 190-(v-2)/2.2*170;};tx(s,8,16,'고도 s(t) = eᵗ 와 두 측정점 (h는 보기 좋게 크게 그림)',{'font-size':12,fill:C.mu});
    var d='';for(var t=0.8;t<=1.4;t+=0.01)d+=(d?'L':'M')+X(t).toFixed(1)+','+Y(Math.exp(t)).toFixed(1);E('path',{d:d,fill:'none',stroke:C.b,'stroke-width':2.5},s);
    var hv=Math.min(0.3,Math.max(0.03,r.h*30));E('circle',{cx:X(1),cy:Y(Math.E),r:5,fill:C.k},s);E('circle',{cx:X(1+hv),cy:Y(Math.exp(1+hv)),r:5,fill:C.r},s);
    E('line',{x1:X(0.85),y1:Y(Math.E-0.15*Math.E),x2:X(1.35),y2:Y(Math.E+0.35*Math.E),stroke:C.a,'stroke-dasharray':'5 4'},s);},
  talk:function(r,st){var cheap=st.sensor==='cheap';return [['doc',r.good?'judge':'think',r.good?'합격입니다. h가 너무 크지도, 너무 작지도 않아요.':st.k<3?'h가 너무 커요. 두 점이 멀면 「평균」 속도가 나와요.':'h가 너무 작아요. 거의 같은 두 수를 빼면 숫자가 망가져요.'],
    ['asst','report','h = '+nf(r.h,3)+'초에서 '+nf(r.v,6)+' m/s, 오차 '+nf(r.err,3)+'이에요.'],
    ['fly','magnify',cheap&&st.k>=6?'센서가 반올림하니 두 고도가 똑같이 읽혀. 0 ÷ h = 0, 드론이 멈춘 걸로 나오잖아!':'h를 끝까지 줄여 봐. 정말 계속 좋아질까?'],
    ['robo','calc',st.k>=12?'h는 작을수록 정확하죠! 수학에서 h → 0이니까요!':'h를 더 줄이면 무조건 더 정확해질 거예요!']];},
  missions:[{t:'최적 찾기: 보급형 센서로 오차 0.005 미만의 합격 속도계 만들기',chk:function(st,r){return st.sensor==='cheap'&&r.err<0.005;}},
    {t:'함정 관찰: 정밀 센서에서도 h를 10^−13.5 이하로 줄이면 오차가 0.001보다 커지는 것 보기',chk:function(st,r){return st.sensor==='double'&&st.k>=13.5&&r.err>1e-3;}},
    {t:'조건 바꾸기: 두 센서 모두에서 합격 속도계를 만들어, 센서에 따라 좋은 h가 달라짐을 확인',chk:function(st,r,h){return h.okD&&h.okC;}}],
  hist:function(st,r,h){if(r.good){if(st.sensor==='double')h.okD=1;else h.okC=1;}}};

/* ② 복리 은행 */
SC.bank={title:'복리 은행',ch:'08_other_forms.html',chn:'08장 변신시켜 쓰기',
  st:{r:5,k:0},
  intro:'원금 1,000만 원을 1년 맡기는 예금 상품을 설계해요. 연 이율 r%를 1년에 n번 나눠 붙이면 1년 뒤 금액은 1,000만 × (1 + r/n)ⁿ 원이에요. n을 끝없이 늘린 한계(연속 복리)는 1,000만 × e^(r/100). 이율(초록)은 시장이 정하고, 나눠 붙이는 횟수(파랑)는 여러분이 정해요.',
  controls:function(st){return grp('시장 환경 · 연 이율 r (%)','env',rng('r','r',1,100,1,st.r))+grp('내 결정 · 이자를 붙이는 횟수 n = 10의 k제곱 번 (반올림)','dec',rng('k','k',0,5,0.05,st.k));},
  calc:function(st){var n=Math.round(Math.pow(10,st.k)),r=st.r/100,A=1e7*Math.pow(1+r/n,n),Lm=1e7*Math.exp(r);return {n:n,A:A,Lm:Lm,gap:(Lm-A)/Lm};},
  scores:function(r){return kpi('m',Math.round(r.A).toLocaleString('ko-KR')+'원','1년 뒤 금액')+kpi('a',Math.round(r.Lm).toLocaleString('ko-KR')+'원','연속 복리 한계 (넘을 수 없음)')+kpi(r.gap<1e-4?'g':'r',nf(100*r.gap,4)+'%','한계와의 차이')+kpi('g',r.n.toLocaleString('ko-KR')+'번','1년에 이자 붙이는 횟수');},
  graphs:function(r,st,g1,g2){var pts=[],rr=st.r/100;for(var k=0;k<=5;k+=0.05){var n=Math.round(Math.pow(10,k));pts.push([k,Math.pow(1+rr/n,n)]);}
    mini(g1,'n에 따른 1년 뒤 금액 배수 (점선 = e^r 한계)',pts,[st.k,Math.pow(1+rr/r.n,r.n)],{x0:0,x1:5,y0:1+rr*0.95,y1:Math.exp(rr)*1.002,hline:Math.exp(rr),xl0:'n = 1',xl1:'n = 100,000',xl:'n을 늘리면 →',yl1:'',yl0:''});
    var p2=[];for(var k2=0;k2<=5;k2+=0.05){var n2=Math.round(Math.pow(10,k2));p2.push([k2,Math.log10(Math.max(1e-12,(Math.exp(rr)-Math.pow(1+rr/n2,n2))/Math.exp(rr)))]);}
    mini(g2,'한계와의 차이 (로그 눈금, 초록 띠 = 0.01% 미만)',p2,[st.k,Math.log10(Math.max(1e-12,r.gap))],{x0:0,x1:5,y0:-9,y1:0,band:-4,xl0:'n = 1',xl1:'100,000',xl:'n',yl1:'100%',yl0:'10^−9'});},
  talk:function(r,st){return [['doc',r.gap<1e-4?'judge':'think',r.gap<1e-4?'한계와 0.01%도 차이 나지 않아요. 더 자주 붙여도 고객이 얻는 건 거의 없어요.':'횟수를 늘리면 늘어나긴 하는데, 어디까지 늘어날까요?'],
    ['asst','report','n = '+r.n.toLocaleString('ko-KR')+'번이면 '+Math.round(r.A).toLocaleString('ko-KR')+'원, 한계보다 '+Math.round(r.Lm-r.A).toLocaleString('ko-KR')+'원 적어요.'],
    ['fly','magnify','(1 + 아주 작은 수)를 아주 많이 곱하는 1^∞ 꼴이야. 끝없이 커질 것 같지만 벽이 있어.'],
    ['robo','calc',r.n>=10000?'1초마다 이자를 붙이면 부자가 되겠죠!':'횟수를 무한히 늘리면 금액도 무한!']];},
  missions:[{t:'최적 찾기: 이율 5%에서 한계와의 차이가 0.01% 미만이 되게 하되, 횟수는 20번 이하로',chk:function(st,r){return st.r===5&&r.gap<1e-4&&r.n<=20;}},
    {t:'함정 관찰: 횟수를 100,000번으로 늘려도 금액이 연속 복리 한계를 넘지 못하는 것 보기',chk:function(st,r){return r.n>=100000&&r.A<=r.Lm;}},
    {t:'조건 바꾸기: 이율 1%와 100%에서 모두 n = 100,000번이 한계 아래에 머무는지 확인',chk:function(st,r,h){return h.r1&&h.r100;}}],
  hist:function(st,r,h){if(r.n>=100000&&r.A<=r.Lm){if(st.r===1)h.r1=1;if(st.r===100)h.r100=1;}}};

/* ③ AI 채점실: 0 · log 0 */
var BATCH={sure:[[1,0,0],[0.9,0.1,0],[0,1,0],[0.5,0.5,0],[0.2,0.3,0.5],[0,0,1]],soft:[[0.8,0.15,0.05],[0.6,0.3,0.1],[0.1,0.85,0.05],[0.4,0.4,0.2],[0.2,0.3,0.5],[0.05,0.05,0.9]]};
function ent(p,rule,e){var s=0;p.forEach(function(q){if(rule==='nan')s-=q*Math.log(q);else if(rule==='lim')s-=q>0?q*Math.log(q):0;else s-=q*Math.log(q+e);});return s;}
SC.loss={title:'AI 채점실',ch:'11_history_ai.html',chn:'11장 역사와 AI',
  st:{model:'sure',rule:'nan',k:6},
  intro:'AI 분류 모델이 사진 6장에 대해 낸 확률(고양이·강아지·새)의 <b>엔트로피</b>(얼마나 헷갈려하는지)를 계산해 학습 기록에 남기는 채점실이에요. 엔트로피 = −Σ p · log p. 그런데 확률이 0이면 0 · log 0 = 0 · (−∞) 꼴이 나와요. 모델(초록)은 연구팀이 정하고, 0 · log 0 처리 규칙(파랑)은 여러분이 정해요.',
  controls:function(st){return grp('시장 환경 · 모델의 성격','env',btns('model',[['sure','확신형 (0을 자주 냄)'],['soft','조심형 (0을 안 냄)']],st.model))+grp('내 결정 · 0 · log 0 처리','dec',btns('rule',[['nan','그대로 계산'],['lim','극한값 0으로 약속'],['eps','log(p + ε)']],st.rule)+rng('k','ε = 10의 −k제곱, k',1,9,1,st.k));},
  calc:function(st){var B=BATCH[st.model],e=Math.pow(10,-st.k),vals=B.map(function(p){return ent(p,st.rule,e);}),ex=B.map(function(p){return ent(p,'lim',0);}),nan=vals.filter(function(v){return v!==v;}).length,err=0;
    vals.forEach(function(v,i){if(v===v)err=Math.max(err,Math.abs(v-ex[i]));});var avg=nan?NaN:vals.reduce(function(a,b){return a+b;},0)/vals.length;return {vals:vals,ex:ex,nan:nan,err:nan?Infinity:err,avg:avg};},
  scores:function(r){return kpi(r.nan?'r':'m',nf(r.avg,5),'평균 엔트로피')+kpi(r.nan?'r':'g',r.nan+'개','NaN이 나온 사진')+kpi(r.err<1e-4?'g':'r',r.err===Infinity?'계산 불가':nf(r.err,3),'정확한 값과의 최대 차이')+kpi(r.nan?'r':'g',r.nan?'학습 멈춤':'정상 기록','학습 상태');},
  graphs:function(r,st,g1,g2){var s=svg(g1,320,210,'사진별 엔트로피 막대');tx(s,8,16,'사진별 엔트로피 (빨강 = NaN)',{'font-size':12,fill:C.mu});
    r.vals.forEach(function(v,i){var x=30+i*48,h=v===v?Math.max(2,v/1.1*150):150;E('rect',{x:x,y:185-h,width:34,height:h,fill:v===v?C.b:C.r,opacity:v===v?.8:.35},s);tx(s,x+2,200,v===v?nf(v,2):'NaN',{'font-size':11,fill:v===v?C.k:C.r});});
    var pts=[],B=BATCH[st.model];for(var k=1;k<=9;k+=0.25){var e=Math.pow(10,-k),m=0;B.forEach(function(p){m=Math.max(m,Math.abs(ent(p,'eps',e)-ent(p,'lim',0)));});pts.push([k,Math.log10(Math.max(1e-12,m))]);}
    mini(g2,'log(p + ε) 규칙: ε에 따른 오차 (로그 눈금)',pts,st.rule==='eps'?[st.k,Math.log10(Math.max(1e-12,r.err))]:null,{x0:1,x1:9,y0:-9,y1:0,band:-4,xl0:'ε = 0.1',xl1:'ε = 10^−9',xl:'ε를 작게 →',yl1:'1',yl0:'10^−9'});},
  talk:function(r,st){return [['doc',r.nan?'think':'judge',r.nan?'NaN 하나가 평균 전체를 NaN으로 만들었어요. 학습 기록이 망가졌습니다.':st.rule==='lim'?'x · ln x → 0이라는 극한이 「0 · log 0 = 0」 약속의 근거예요. 정확하고 안전해요.':'NaN은 피했어요. 대신 ε만큼 값이 살짝 비틀려요.'],
    ['asst','report','NaN '+r.nan+'개, 최대 차이 '+(r.err===Infinity?'계산 불가':nf(r.err,3))+'이에요.'],
    ['fly','magnify',st.model==='soft'?'조심형 모델에서 괜찮다고 끝이 아니야. 확신형 모델로도 시험해 봐.':'0 · (−∞)는 부정형이야. 그대로 계산하면 컴퓨터는 답을 못 내.'],
    ['robo','calc',st.rule==='eps'&&st.k<=2?'ε는 클수록 안전하죠! 0.1이면 든든해요!':'0 곱하기 뭐든 0이니까 문제없어요!']];},
  missions:[{t:'최적 찾기: 확신형 모델에서 NaN 0개, 정확한 값과의 차이 0인 규칙 찾기',chk:function(st,r){return st.model==='sure'&&r.nan===0&&r.err<1e-12;}},
    {t:'함정 관찰: 확신형 모델을 「그대로 계산」해서 NaN이 퍼지는 것 보기',chk:function(st,r){return st.model==='sure'&&st.rule==='nan'&&r.nan>0;}},
    {t:'조건 바꾸기: log(p + ε) 규칙에서 두 모델 모두 차이 0.0001 미만이 되는 ε 찾기',chk:function(st,r,h){return h.es&&h.eo;}}],
  hist:function(st,r,h){if(st.rule==='eps'&&r.err<1e-4){if(st.model==='sure')h.es=1;else h.eo=1;}}};

var ORDER=['speed','bank','loss'],cur=null,touched={},done={},hist={};
var tabs=H('div','ctrl',null,root);tabs.setAttribute('role','tablist');
ORDER.forEach(function(k){var b=H('button','bt',SC[k].title,tabs);b.type='button';b.setAttribute('role','tab');b.dataset.t=k;b.onclick=function(){open(k);};});
var body=H('div',null,null,root);
function open(k){cur=k;[].forEach.call(tabs.children,function(b){b.setAttribute('aria-pressed',b.dataset.t===k);b.setAttribute('aria-selected',b.dataset.t===k);});
  try{history.replaceState(null,'','#'+k);}catch(e){}
  var S=SC[k];body.innerHTML='<h2>'+S.title+'</h2><div class="sitbox">'+S.intro+'</div><div class="simgrid"><div class="simctl">'+S.controls(S.st)+'</div><div class="simout"><div class="kpis"></div><div class="graphs"><div class="g1"></div><div class="g2"></div></div></div></div><div class="talkbox"></div><h3>미션</h3><ol class="missions"></ol><p class="note">배운 곳 다시 보기 → <a href="../'+S.ch+'">'+S.chn+'</a></p>';
  [].forEach.call(body.querySelectorAll('[data-k] button'),function(b){b.onclick=function(){var key=b.parentNode.dataset.k;S.st[key]=b.dataset.v;[].forEach.call(b.parentNode.children,function(x){x.setAttribute('aria-pressed',x===b);});touched[k]=1;update();};});
  [].forEach.call(body.querySelectorAll('input[data-k]'),function(r){r.oninput=function(){S.st[r.dataset.k]=+r.value;touched[k]=1;update();};});
  update();}
function update(){var S=SC[cur],st=S.st,r=S.calc(st);hist[cur]=hist[cur]||{};if(touched[cur]&&S.hist)S.hist(st,r,hist[cur]);
  [].forEach.call(body.querySelectorAll('.val[data-v]'),function(v){v.textContent=st[v.dataset.v];});
  body.querySelector('.kpis').innerHTML=S.scores(r,st);var g1=body.querySelector('.g1'),g2=body.querySelector('.g2');g1.innerHTML='';g2.innerHTML='';S.graphs(r,st,g1,g2);
  body.querySelector('.talkbox').innerHTML=S.talk(r,st).map(function(t){return sayH(t[0],t[1],t[2]);}).join('');Cast.fill(body);
  done[cur]=done[cur]||{};var ml=body.querySelector('.missions');ml.innerHTML='';
  S.missions.forEach(function(m,i){var ok=touched[cur]&&m.chk(st,r,hist[cur]);if(ok)done[cur][i]=1;var li=document.createElement('li');li.innerHTML=(done[cur][i]?'<b style="color:var(--gfp)">통과 ✓</b> ':'<span class="note">도전 중</span> ')+m.t;ml.appendChild(li);});}
window.PRACTICE={open:open,set:function(k,st){if(cur!==k)open(k);Object.assign(SC[k].st,st);touched[k]=1;update();return SC[k].missions.map(function(m,i){return !!done[k][i];});},status:function(k){return SC[k].missions.map(function(m,i){return !!(done[k]||{})[i];});},calc:function(k){return SC[k].calc(SC[k].st);}};
var h=(location.hash||'').slice(1);open(SC[h]?h:'speed');
})();
