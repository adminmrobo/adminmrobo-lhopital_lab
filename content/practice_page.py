"""마지막 장 · 실전 연습장 조립"""
import os


def build(B, chs):
    B.USED.update({('doc', 'judge'), ('doc', 'think'), ('asst', 'report'), ('fly', 'magnify'), ('robo', 'calc')})
    o = [B.head('마지막 장 · 실전 연습장 — ' + B.SERIES, '드론 속도계 공장, 복리 은행, AI 채점실을 운영하며 극한과 로피탈 개념을 써 보는 시뮬레이터.', depth=1, og='../img/og/og_practice.webp')]
    o.append('<nav class="top" aria-label="실전 연습장 목차"><a class="logo" href="../index.html">로피탈 교실</a><a href="#sim">사업장</a><a href="#wrap">마무리</a><a href="../12_final_review.html">12장 종합</a></nav><div id="prog"></div>')
    o.append(B.cover_html('cover_practice', '로피탈 사업장 시뮬레이터', '마지막 장 · 실전 연습장', '드론 속도계 공장 · 복리 은행 · AI 채점실', '실전 연습장 표지 — 세 사업장 앞의 박사와 수강생들', up='../'))
    o.append('<header class="hero"><div class="wrap"><div class="kicker">마지막 장 · 실전 연습장</div><h1>로피탈 사업장 시뮬레이터</h1>'
             '<p class="q">핵심 질문 — 배운 개념으로 「가상 사업장」의 결정을 내리면, 숫자가 어떻게 달라질까?</p>'
             '<p>사업장 세 곳을 탭으로 골라 운영해 보세요. 초록 상자는 시장 환경(내가 못 바꾸는 조건), 파란 상자는 내 결정이에요. 성적표·그래프·캐릭터 대사가 바로 바뀌고, 미션 3개는 조작한 뒤에 자동으로 판정돼요. 주소 끝에 #speed, #bank, #loss를 붙이면 그 사업장이 바로 열려요.</p>'
             + B.says([('doc', 'front', '마지막 장은 실습입니다. 정답은 계산이 판정해요. 미션 세 개씩, 모두 아홉 개!'), ('moa', 'cheer', '사업장 세 곳 다 운영해 볼래요!')]) + '</div></header>')
    o.append('<section class="level" id="sim" style="padding-top:24px"><div class="wrap"></div></section>')
    o.append('''<section class="level" id="wrap"><div class="wrap"><h2>마무리 — 세 사업장이 함께 묻는 질문</h2>
<p>세 사업장은 모두 「다가갈 때의 값과, 실제로 계산한 값은 같을까?」를 물어요. 속도계에서는 h를 0에 다가가게 했지만 너무 작으면 숫자가 망가졌고, 은행에서는 이자를 끝없이 자주 붙여도 e라는 벽을 넘지 못했고, AI 채점실에서는 0 · log 0을 극한값 0으로 약속해야 학습이 멈추지 않았어요. 수학의 극한은 방향을 알려 주고, 실제 계산은 그 방향을 얼마나 믿을 수 있는지 확인해야 해요 — 이것이 이 시리즈가 말하는 「AI와 컴퓨터의 결과를 판단하는 힘」이에요.</p>
<div class="lim"><b>모형의 한계</b> — 드론 고도 eᵗ, 센서 단위, 이율, AI 확률은 모두 교육용 예시값이에요. 실제 센서 설계·금융 상품·AI 학습에는 훨씬 많은 조건이 붙어요. 이 페이지의 결과는 경영·투자 권고가 아닙니다.</div>
</div></section>''')
    o.append(B.footer_html(('../12_final_review.html', '12 종합 — 기말 쪽지시험과 졸업 발표'), ('../index.html', '오리엔테이션으로'), '').replace('href="12', 'href="../12'))
    o.append('<script src="../assets/sprites.js"></script><script src="../assets/widgets.js"></script><script src="../assets/lab.js"></script><script src="../assets/practice.js"></script></body></html>')
    html = '\n'.join(o).replace('<section class="level" id="sim" style="padding-top:24px"><div class="wrap"></div></section>', '<section class="level" style="padding-top:24px"><div class="wrap" id="sim"></div></section>')
    open(os.path.join(B.ROOT, 'practice', 'index.html'), 'w', encoding='utf-8').write(html)
    print('built practice')
