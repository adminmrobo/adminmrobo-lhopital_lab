"""오리엔테이션(목차) 페이지 조립"""
import os, json

FORMAT_NOTE = {
    '첫 강의 + 쪽지시험': '박사의 짧은 강의 뒤 퀴즈로 점검',
    '1:1 토론': '두 수강생이 서로 다른 주장을 맡아 맞붙고, 조교가 근거를 점검',
    '조별 과제': '분자조·분모조가 같은 과제를 다른 방법으로 풀어 비교',
    '발표수업': '한 조가 발표하고 다른 조가 질문',
    '계산배틀': '조교 둘이 숫자로 승부, 수강생은 손계산으로 검산',
    '조별 토론': '조마다 한 가지 주장을 맡아 토론 후 결론 정리',
    '역할극 수업': '수강생이 「식」이 되어 모양을 바꿔 보기',
    '찬반 토론': '「로피탈은 언제나 써도 된다」에 찬성·반대로 나뉘어 토론',
    '발표 + 질의응답': '조별 발표 뒤 박사와 조교의 질문 공세',
    '쪽지시험 + 졸업 발표': '기말 쪽지시험과 한 장 정리 발표',
}

TOPICS = {1: '극한과 기울기 다시 보기', 2: '로피탈의 정리', 3: '틀리지 않게 쓰기', 4: '역사와 AI, 그리고 종합'}


def build(B, chs):
    esc, img, says, rich = B.esc, B.img, B.says, B.rich
    B.GLOSS = {'극한': 'x가 어떤 값에 한없이 다가갈 때 식의 값이 향해 가는 곳. 꼭 그 값이 될 필요는 없다.',
               '부정형': '0/0, ∞/∞처럼 대입만으로는 값을 정할 수 없는 꼴. 「답이 없다」가 아니라 「아직 모른다」는 뜻.'}
    o = [B.head(B.SERIES + ' · 오리엔테이션', '미분이 아직 헷갈리는 학생도 따라오는 로피탈의 정리 12장 + 실전 연습장. 박사 선생님과 두 조교, 수강생 6명이 함께하는 연구실 해설 시리즈.')]
    o.append('<nav class="top" aria-label="목차"><a class="logo" href="index.html">로피탈 교실</a><a href="#three">3줄 요약</a><a href="#cast">등장인물</a><a href="#pillars">네 마당</a><a href="#tracks">과정</a><a href="#toc">목차</a><a href="#how">수업 방식</a><a href="practice/index.html">실전 연습장</a></nav><div id="prog"></div>')
    o.append(B.cover_html('cover_00', '로피탈 교실', '오리엔테이션 · 00', '0/0의 정체를 밝히는 수업 — 12장 + 실전 연습장', '로피탈 교실 표지 — 박사, 조교 둘, 수강생 여섯이 칠판의 0/0 앞에 모인 강의실'))
    o.append('''<header class="hero"><div class="wrap"><div class="kicker">연구실 해설 시리즈 · 미적분 입문</div><h1>로피탈 교실 — 0/0의 정체를 밝히는 수업</h1>
<p class="q">핵심 질문 — 0 ÷ 0처럼 보이는 식의 진짜 값은 어떻게 알아낼까? 그리고 그 방법은 언제 틀릴까?</p>
<p>x = 0을 넣으면 0/0이 되는 식이 있어요. 계산기는 「오류」를 내지만, x를 0에 [[극한|한없이 가까이]] 보내면 식의 값은 또렷한 한 숫자로 모여요. 이 시리즈는 그 숫자를 찾는 도구, <b>로피탈의 정리</b>를 12장에 걸쳐 배워요. 미분을 아직 잘 몰라도 괜찮아요. 03장에서 기울기부터 다시 잡고 시작합니다.</p>
<div class="kpis"><div class="kpi g"><b>12장</b><span>한 장에 개념 2~3단계</span></div><div class="kpi m"><b>4마당</b><span>극한·규칙·오용·AI</span></div><div class="kpi a"><b>10가지</b><span>수업 형식 (토론·배틀·발표…)</span></div><div class="kpi r"><b>3곳</b><span>실전 연습장 사업장</span></div></div>''' + says([('doc', 'front', '안녕하세요, 이 교실의 선생님 박사입니다. 미분이 아직 헷갈려도 괜찮아요. 「다가간다」, 「기울기」, 「비교한다」 세 가지만 같이 잡으면 끝까지 갈 수 있어요.'),
                                                                                                                                                    ('moa', 'cheer', '저희 수강생 6명이 먼저 헤매 볼게요. 같이 가요!')]) + '</div></header>')
    o.append('''<div class="wrap"><div class="three" id="three"><h2>처음 오신 분께 — 이 시리즈를 3줄로</h2><ol>
<li><b>무엇을:</b> 0/0, ∞/∞처럼 정해지지 않은 꼴의 극한을, 분자와 분모를 「따로 미분해서」 구하는 로피탈의 정리와 그 조건을 배웁니다.</li>
<li><b>왜 중요한가:</b> 순간 속도, 복리 이자의 한계, 함수끼리의 자라는 속도 비교가 모두 이 질문에서 나와요. 그리고 조건을 무시하면 그럴듯한 오답이 나와서, 오용 사례를 아는 것이 규칙만큼 중요해요.</li>
<li><b>생활·현장에서는:</b> 속도계, 은행 이자 계산, 컴퓨터의 0/0 처리, AI 손실 함수의 0 · log 0 같은 곳에서 「다가갈 때의 값」을 다뤄요.</li></ol>
<p class="note">장마다 20~25분이면 충분해요. 순서대로 읽으면 가장 편하고, 01~03장은 로피탈을 배우기 위한 준비 운동이에요.</p></div></div>''')
    castl = ''.join('<div>%s<div><span class="role">%s</span><b>%s</b><span>%s</span></div></div>' % (img(w, B.PEOPLE[w][2], cls=''), esc(B.PEOPLE[w][1]), esc(B.PEOPLE[w][0]), esc(B.PEOPLE[w][3]))
                    for w in ['doc', 'fly', 'robo', 'sia', 'moa', 'asst', 'x1', 'x2', 'x3'])
    g1 = ''.join(img(w, 'e13', cls='') for w in ['sia', 'asst', 'x1'])
    g2 = ''.join(img(w, 'e13', cls='') for w in ['moa', 'x2', 'x3'])
    o.append(f'''<section class="level" id="cast"><div class="wrap"><h2>등장인물 — 선생님 1명, 조교 2명, 수강생 6명</h2><div class="cast">{castl}</div>
<div class="groups"><div>{g1} <b>1조 「분자조」</b> 시아 · 하루 · X1</div><div>{g2} <b>2조 「분모조」</b> 모아 · X2 · X3</div></div>
<p class="note">조 이름은 로피탈의 정리에서 왔어요. 분수의 위(분자)와 아래(분모)를 따로 미분하니까, 두 조가 각자 맡은 쪽을 책임져요.</p></div></section>''')
    pill = []
    for p in (1, 2, 3, 4):
        items = ''.join('<li><a href="%s.html">%02d %s</a></li>' % (c['slug'], c['no'], esc(c['title'])) for c in chs if c.get('pillar') == p)
        pill.append('<div><b>%d마당 · %s</b><ul>%s</ul></div>' % (p, TOPICS[p], items))
    o.append('''<section class="level" id="pillars"><div class="wrap"><h2>네 마당 — 이 시리즈의 큰 그림</h2>
<p>준비(극한·기울기) → 규칙(로피탈) → 조심(오용) → 쓰임(역사·AI) 순서로 가요. 원자료는 matharium의 인포그래픽 한 장과 로피탈 오용 사례 정리 글이에요.</p>
<div class="steps">''' + ''.join(pill) + '''</div>
<details><summary>원자료 인포그래픽 보기 (영어 그림)</summary><img loading="lazy" src="img/source/src01.webp" width="1122" height="1402" alt="matharium의 로피탈 규칙 인포그래픽 — 규칙, 기하학적 의미, 예제, 적용 조건"></details>
</div></section>''')
    cards = ''.join('<a href="%s.html"><span class="n">%02d · %s</span><b>%s</b><span>%s</span><span class="fmt">%s</span></a>' % (
        c['slug'], c['no'], ('%d마당' % c['pillar']) + ' · ' + B.STARS[B.LEVEL[c['no']]].split(' ')[0] + ' · 약 %d분' % B.MINUTES[c['no']] + (' <span class="track basic">기본</span>' if c['no'] in B.BASIC else ' <span class="track adv">심화</span>'), esc(c['title']), esc(c['q']), esc(c['format'][0])) for c in chs)
    cards += '<a href="practice/index.html"><span class="n">마지막 장</span><b>실전 연습장 — 로피탈 사업장 시뮬레이터</b><span>드론 속도계 공장, 복리 은행, AI 채점실을 운영하며 「다가갈 때의 값」을 직접 다뤄 봐요.</span><span class="fmt">시뮬레이터</span></a>'
    bas = ' → '.join('<a href="%s.html">%02d</a>' % (c['slug'], c['no']) for c in chs if c['no'] in B.BASIC) + ' → <a href="practice/index.html">실전 연습장</a>'
    adv = ', '.join('<a href="%s.html">%02d %s</a>' % (c['slug'], c['no'], esc(c['title'].split(' — ')[0])) for c in chs if c['no'] not in B.BASIC)
    o.append(f'''<section class="level" id="tracks"><div class="wrap"><h2>두 갈래 과정 — 어디까지 읽을까</h2>
<div class="steps"><div><b class="n">1</b><b>기본 과정 <span class="track basic">기본</span></b><p>처음 오신 분은 이 순서만 따라가도 실전 연습장까지 갈 수 있어요.</p><p>{bas}</p></div>
<div><b class="n">2</b><b>심화 과정 <span class="track adv">심화</span></b><p>기본 과정을 마친 뒤 도전하세요. 고등학교 미적분을 넘는 내용을 그림으로 맛보는 장이에요.</p><p>{adv}</p></div>
<div><b class="n">3</b><b>미분이 아직 낯설다면</b><p>03장 「기울기와 미분 다시 잡기」를 꼭 먼저 보세요. 미분 공식 7개만 알면 이 시리즈의 모든 계산을 따라올 수 있어요. 장마다 「용어 별명 카드」로 어려운 이름을 먼저 익히세요.</p></div></div></div></section>''')
    o.append(f'<section class="level" id="toc"><div class="wrap"><h2>목차 — 12장 + 실전 연습장</h2><div class="toc">{cards}</div></div></section>')
    rows = ''.join('<tr><td>%s</td><td>%s</td><td>%s</td></tr>' % (esc(k), esc(v), ', '.join('%02d' % c['no'] for c in chs if c['format'][0] == k)) for k, v in FORMAT_NOTE.items())
    o.append(f'''<section class="level" id="how"><div class="wrap"><h2>수업 방식 — 장마다 다른 수업</h2>
<div class="tw"><table class="tb"><thead><tr><th>형식</th><th>어떻게 하나</th><th>나오는 장</th></tr></thead><tbody>{rows}</tbody></table></div>
<h3>한 장의 흐름</h3><div class="steps"><div><b class="n">1</b><b>3줄 요약과 수업 소개</b><p>무엇을·왜·어디에 쓰는지 먼저 봐요.</p></div><div><b class="n">2</b><b>단계 2~3개</b><p>박사의 상황 질문 → 왜 이 방법 / 하루의 수식 질문 → 그림 실험 → 풀이 → 퀴즈.</p></div><div><b class="n">3</b><b>AI 판단 · 조교 대결 · 정리</b><p>AI 답의 오류 찾기, 계산으로 가리는 조교 대결, 한눈에 보는 정리표.</p></div></div>
{says([('fly', 'magnify', '원자료에서 과장되거나 빠진 곳은 「바꾼다」 상자로 표시해 뒀어. 원자료도 의심하면서 읽자고.'), ('robo', 'coin', '일단 미분부터 하는 게 제 특기예요! …조교 대결에서 자주 지는 이유이기도 하지만요.')])}</div></section>''')
    o.append(B.footer_html(None, (chs[0]['slug'] + '.html', '01 ' + chs[0]['title']) if chs else None,
                           '<p class="note">원자료: matharium 「L\'Hôpital\'s Rule」 인포그래픽(사용자 제공)과 로피탈 오용 사례 정리 글. 이 시리즈의 숫자 예시는 모두 설명용 예시값입니다.</p>'))
    o.append(B.foot_scripts(kg=False))
    open(os.path.join(B.ROOT, 'index.html'), 'w', encoding='utf-8').write('\n'.join(o))
    print('built index')
