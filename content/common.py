# 시리즈 공용 데이터
SERIES = '로피탈 교실 — 0/0의 정체를 밝히는 수업'
SITE = 'https://adminmrobo.github.io/lhopital_lab/'
AUTHOR = {'name': '안상선', 'en': 'Ahn Sangsun', 'site': 'https://adminmrobo.github.io/who_am_i/who_am_i.html', 'org': '(주)M-Robo 대표'}

# who: (이름, 이 시리즈의 자리, 기본 표정, 한 줄 소개)
PEOPLE = {
    'doc': ('박사', '선생님', 'front', '목소리는 크지만 판단은 계산대로. 막히는 곳에서 꼭 멈춰 줍니다.'),
    'fly': ('초파리 연구원', '조교 (의심 담당)', 'magnify', '작지만 날카롭다. "정말 그래?" 하고 반례를 찾아옵니다.'),
    'robo': ('주판봇', '조교 (확신 담당)', 'calc', '빠른 계산을 좋아한다. 공식을 보면 일단 미분부터 하고 싶어 합니다.'),
    'sia': ('인턴 시아', '수강생 · 1조', 'e13', '조용하고 꼼꼼한 정리 담당. 표를 만들면 눈이 반짝인다.'),
    'moa': ('인턴 모아', '수강생 · 2조', 'e13', '상냥하고 잘 웃는다. 발표와 응원 목소리가 제일 크다.'),
    'asst': ('조수 하루', '수강생 · 1조', 'e13', '미분이 아직 헷갈리는 질문 담당. 처음 오신 분의 눈높이.'),
    'x1': ('미공개 X1', '수강생 · 1조', 'e13', '정체는 비밀. 짧고 엉뚱한 질문을 던진다.'),
    'x2': ('미공개 X2', '수강생 · 2조', 'e13', '정체는 비밀. 조용히 그래프를 그려 온다.'),
    'x3': ('미공개 X3', '수강생 · 2조', 'e13', '정체는 비밀. 숫자 세기와 검산을 좋아한다.'),
}

CHAPTERS = [('ch%02d' % i, None) for i in range(1, 13)]

_V = {'title': True, 'author': True, 'year': True, 'doi': False, 'pages': False}
REFS = {
    'src_matharium': {'type': 'graphic', 'title': "L'Hôpital's Rule (인포그래픽)", 'author': [{'literal': 'matharium'}], 'year': 2026, 'role': 'primary',
                      'verified': {'title': True, 'author': True, 'year': False}, 'short': "matharium 「L'Hôpital's Rule」 인포그래픽 (사용자 제공)",
                      'use': '규칙 문장·기하학적 의미·예제 (1−cos x)/x²·적용 조건 4개'},
    'src_aioverview': {'type': 'webpage', 'title': '로피탈의 정리 오용 사례 (구글 AI 모드 개요)', 'author': [{'literal': 'Google AI 모드 (사용자 제공 화면)'}], 'year': 2026, 'role': 'primary',
                       'verified': {'title': False, 'author': True, 'year': True}, 'short': '구글 AI 모드 「로피탈 오용 사례」 개요 (사용자 제공)',
                       'use': '오용 사례 다섯 가지의 출발점 (09·10장). 과장된 문장은 바로잡음'},
    'lhopital1696': {'type': 'book', 'title': "Analyse des Infiniment Petits pour l'Intelligence des Lignes Courbes", 'author': [{'family': "de l'Hôpital", 'given': 'Guillaume'}], 'year': 1696,
                     'publisher': 'Imprimerie Royale (Paris)', 'role': 'background', 'verified': dict(_V), 'short': "로피탈 (1696) 『무한소 해석』", 'use': '규칙이 처음 책에 실린 곳 (11장)'},
    'struik1963': {'type': 'article-journal', 'title': "The origin of L'Hôpital's rule", 'author': [{'family': 'Struik', 'given': 'D. J.'}], 'year': 1963, 'container': 'The Mathematics Teacher', 'volume': '56',
                   'role': 'background', 'verified': dict(_V), 'short': 'Struik (1963) The origin of L\'Hôpital\'s rule', 'use': '요한 베르누이와 로피탈의 계약·편지 (11장)'},
    'stewart2015': {'type': 'book', 'title': 'Calculus: Early Transcendentals (8th ed.)', 'author': [{'family': 'Stewart', 'given': 'James'}], 'year': 2015, 'publisher': 'Cengage Learning',
                    'role': 'background', 'verified': dict(_V), 'short': 'Stewart (2015) Calculus', 'use': '극한·미분·로피탈 규칙과 부정형의 표준 설명'},
    'stolz1879': {'type': 'article-journal', 'title': 'Ueber die Grenzwerthe der Quotienten', 'author': [{'family': 'Stolz', 'given': 'Otto'}], 'year': 1879, 'container': 'Mathematische Annalen', 'volume': '15',
                  'role': 'background', 'verified': dict(_V), 'short': 'Stolz (1879)', 'use': 'g′(x) ≠ 0 조건이 왜 필요한지 보여 주는 반례 (10장)'},
    'boas1986': {'type': 'article-journal', 'title': "Counterexamples to L'Hôpital's rule", 'author': [{'family': 'Boas', 'given': 'R. P.'}], 'year': 1986, 'container': 'The American Mathematical Monthly', 'volume': '93',
                 'role': 'background', 'verified': dict(_V), 'short': "Boas (1986) Counterexamples to L'Hôpital's rule", 'use': '슈톨츠 반례의 현대적 정리 (10장)'},
    'goldberg1991': {'type': 'article-journal', 'title': 'What every computer scientist should know about floating-point arithmetic', 'author': [{'family': 'Goldberg', 'given': 'David'}], 'year': 1991,
                     'container': 'ACM Computing Surveys', 'volume': '23', 'role': 'background', 'verified': dict(_V), 'short': 'Goldberg (1991) Floating-point arithmetic', 'use': '컴퓨터가 0/0과 아주 작은 수를 다루는 방식, 자릿수 잃기 (11장·실전 연습장)'},
    'goodfellow2016': {'type': 'book', 'title': 'Deep Learning', 'author': [{'family': 'Goodfellow', 'given': 'Ian'}, {'family': 'Bengio', 'given': 'Yoshua'}, {'family': 'Courville', 'given': 'Aaron'}], 'year': 2016,
                       'publisher': 'MIT Press', 'role': 'background', 'verified': dict(_V), 'short': 'Goodfellow 외 (2016) Deep Learning', 'use': '교차 엔트로피와 0·log 0 = 0 약속 (08·11장)'},
}
