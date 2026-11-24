# 로피탈 교실 — 이미지 제작 명세서 (표지 14장)

> **상태 (2026-11-25): 대체 표지 14장 반영** — `tools/make_covers.py`가 캐릭터 팩 그림과 칠판 곡선으로 만든 픽셀아트 대체 표지(480×270 격자 → NEAREST 4배 1920×1080 무손실 WebP)예요. 아래 지시문으로 Genspark 그림을 받으면 같은 파일 이름으로 바꿔 넣으면 돼요.

> 그림체: **16비트 RPG 픽셀아트**(SNES 시대 느낌), **흰 배경(#ffffff) 위 낮의 강의실**. 그림 안에 글자·숫자·기호를 넣지 않는다(제목은 HTML). 캐릭터 외형은 연구실 캐릭터 팩(adminmrobo/fruitfly-lab-expressions)을 따른다. 미공개 X1~X3은 눈만 보이는 검은 실루엣.

## 1. 공용 규칙

- 16:9, 픽셀 격자 480×270로 그려 4배(1920×1080). 무손실 WebP, `NEAREST` 정수배만.
- 오른쪽 위 46%는 제목이 올라갈 빈 여백(칠판 정도만).
- 공통 소품: 짙은 초록 칠판, 분필 곡선(색 분필), 나무 교탁.
- 금지: 무기·담배·술·피, 실존 인물·기업 로고, 저작권 캐릭터, 결과 전 승패를 암시하는 표정.
- 생성 순서: cover_00을 먼저 받아 그림체 확인 → 그 그림을 참고 그림으로 올려 나머지 생성.
- 반영 뒤 `python3 tools/build.py`만 다시 실행(공유 미리보기 `img/og/`는 `make_covers.py`의 자르기 규칙을 따라 400×210 → 3배).

## 2. 필요한 그림 전체

| 키 | 페이지 | 상태 | 등장 |
|---|---|---|---|
| cover_00 | index.html | 대체 표지 반영 | 박사, 초파리, 주판봇, 시아, 모아, 하루 (+ X1~X3 실루엣) |
| cover_01 | 01_limits.html | 대체 표지 반영 | 박사, 초파리, 주판봇, 인턴 시아 |
| cover_02 | 02_zero_over_zero.html | 대체 표지 반영 | 박사, 초파리, 주판봇, 인턴 모아 |
| cover_03 | 03_slope_derivative.html | 대체 표지 반영 | 박사, 초파리, 주판봇, 조수 하루 |
| cover_04 | 04_tangent_ratio.html | 대체 표지 반영 | 박사, 초파리, 주판봇, 인턴 시아 |
| cover_05 | 05_lhopital_rule.html | 대체 표지 반영 | 박사, 초파리, 주판봇, 주판봇 |
| cover_06 | 06_repeat_and_stop.html | 대체 표지 반영 | 박사, 초파리, 주판봇, 미공개 X2 |
| cover_07 | 07_infinity_race.html | 대체 표지 반영 | 박사, 초파리, 주판봇, 미공개 X3 |
| cover_08 | 08_other_forms.html | 대체 표지 반영 | 박사, 초파리, 주판봇, 인턴 모아 |
| cover_09 | 09_mistakes_calc.html | 대체 표지 반영 | 박사, 초파리, 주판봇, 초파리 연구원 |
| cover_10 | 10_mistakes_conditions.html | 대체 표지 반영 | 박사, 초파리, 주판봇, 조수 하루 |
| cover_11 | 11_history_ai.html | 대체 표지 반영 | 박사, 초파리, 주판봇, 인턴 모아 |
| cover_12 | 12_final_review.html | 대체 표지 반영 | 박사, 초파리, 주판봇, 박사 |
| cover_practice | practice/index.html | 대체 표지 반영 | 박사, 하루, 모아, 주판봇 + 사업장 간판 셋(드론·은행·AI) |

## 3. 표지 지시문 (Genspark 등 이미지 생성 도구용)

### cover_00 — 오리엔테이션
```
16-bit SNES-era RPG pixel art, white background, bright daytime classroom. A dark green chalkboard on the right shows two glowing chalk curves meeting at an empty circle (a hole) at the center, no text. In front, a cheerful lab doctor in a white coat points at the board, a tiny fruit-fly researcher with a magnifying glass, a boxy abacus robot with a green screen face, two interns (a calm girl with long black hair, a smiling girl with brown hair), a pink-haired assistant raising her hand, and three black silhouettes with only eyes visible. Keep the right 46% upper area mostly empty for a title. No letters, no numbers, no logos.
```

### cover_01 — 극한 — 가까워지기와 같아지기
- 장면: 개구리가 벽을 향해 반씩 다가가고, 칠판에는 점점 0으로 모이는 점들
- 주인공 표정: 인턴 시아
```
16-bit SNES-era RPG pixel art, white background, daytime classroom with a dark green chalkboard. Scene: 개구리가 벽을 향해 반씩 다가가고, 칠판에는 점점 0으로 모이는 점들. Characters from the lab pack: doctor, fruit-fly researcher, abacus robot, and 인턴 시아 in front. Chalk curves only, no text, no numbers, no logos. Leave the right upper 46% empty for a title.
```

### cover_02 — 0/0 수수께끼 — 정해지지 않은 꼴
- 장면: 두 달리기 선수가 동시에 결승선에 닿는 순간, 관중석의 시아와 모아가 서로 다른 팻말을 듦
- 주인공 표정: 인턴 모아
```
16-bit SNES-era RPG pixel art, white background, daytime classroom with a dark green chalkboard. Scene: 두 달리기 선수가 동시에 결승선에 닿는 순간, 관중석의 시아와 모아가 서로 다른 팻말을 듦. Characters from the lab pack: doctor, fruit-fly researcher, abacus robot, and 인턴 모아 in front. Chalk curves only, no text, no numbers, no logos. Leave the right upper 46% empty for a title.
```

### cover_03 — 기울기와 미분 다시 잡기
- 장면: 등산로 위에서 확대경을 든 하루, 확대경 속 곡선이 곧은 직선으로 보임
- 주인공 표정: 조수 하루
```
16-bit SNES-era RPG pixel art, white background, daytime classroom with a dark green chalkboard. Scene: 등산로 위에서 확대경을 든 하루, 확대경 속 곡선이 곧은 직선으로 보임. Characters from the lab pack: doctor, fruit-fly researcher, abacus robot, and 조수 하루 in front. Chalk curves only, no text, no numbers, no logos. Leave the right upper 46% empty for a title.
```

### cover_04 — 확대하면 직선 — 접선과 두 함수의 비
- 장면: 두 비탈길이 같은 바닥에서 출발하고, 1조가 칠판 앞에서 확대경 그림을 발표
- 주인공 표정: 인턴 시아
```
16-bit SNES-era RPG pixel art, white background, daytime classroom with a dark green chalkboard. Scene: 두 비탈길이 같은 바닥에서 출발하고, 1조가 칠판 앞에서 확대경 그림을 발표. Characters from the lab pack: doctor, fruit-fly researcher, abacus robot, and 인턴 시아 in front. Chalk curves only, no text, no numbers, no logos. Leave the right upper 46% empty for a title.
```

### cover_05 — 로피탈의 정리 — 위아래 따로 미분하기
- 장면: 비행기 조종석 앞 이륙 점검표를 든 초파리, 옆에서 미분 버튼을 누르려는 주판봇
- 주인공 표정: 주판봇
```
16-bit SNES-era RPG pixel art, white background, daytime classroom with a dark green chalkboard. Scene: 비행기 조종석 앞 이륙 점검표를 든 초파리, 옆에서 미분 버튼을 누르려는 주판봇. Characters from the lab pack: doctor, fruit-fly researcher, abacus robot, and 주판봇 in front. Chalk curves only, no text, no numbers, no logos. Leave the right upper 46% empty for a title.
```

### cover_06 — 한 번 더 미분 — 반복과 멈춤
- 장면: 정지 상태에서 출발하는 두 선수와, 고구마 찜기를 젓가락으로 찔러 보는 X2
- 주인공 표정: 미공개 X2
```
16-bit SNES-era RPG pixel art, white background, daytime classroom with a dark green chalkboard. Scene: 정지 상태에서 출발하는 두 선수와, 고구마 찜기를 젓가락으로 찔러 보는 X2. Characters from the lab pack: doctor, fruit-fly researcher, abacus robot, and 미공개 X2 in front. Chalk curves only, no text, no numbers, no logos. Leave the right upper 46% empty for a title.
```

### cover_07 — 무한대 경주 — ∞/∞와 자라는 속도
- 장면: 끝없이 길어지는 두 줄과 회전문 안을 빙글빙글 도는 주판봇
- 주인공 표정: 미공개 X3
```
16-bit SNES-era RPG pixel art, white background, daytime classroom with a dark green chalkboard. Scene: 끝없이 길어지는 두 줄과 회전문 안을 빙글빙글 도는 주판봇. Characters from the lab pack: doctor, fruit-fly researcher, abacus robot, and 미공개 X3 in front. Chalk curves only, no text, no numbers, no logos. Leave the right upper 46% empty for a title.
```

### cover_08 — 변신시켜 쓰기 — 0·∞, 1^∞, ∞−∞
- 장면: 무대 위에서 분수 의상으로 갈아입는 수강생들, 줄다리기와 복리 금화 더미
- 주인공 표정: 인턴 모아
```
16-bit SNES-era RPG pixel art, white background, daytime classroom with a dark green chalkboard. Scene: 무대 위에서 분수 의상으로 갈아입는 수강생들, 줄다리기와 복리 금화 더미. Characters from the lab pack: doctor, fruit-fly researcher, abacus robot, and 인턴 모아 in front. Chalk curves only, no text, no numbers, no logos. Leave the right upper 46% empty for a title.
```

### cover_09 — 오답 노트 ① — 계산 실수형
- 장면: 찬반 토론 단상 두 개, 반례 노트를 든 초파리
- 주인공 표정: 초파리 연구원
```
16-bit SNES-era RPG pixel art, white background, daytime classroom with a dark green chalkboard. Scene: 찬반 토론 단상 두 개, 반례 노트를 든 초파리. Characters from the lab pack: doctor, fruit-fly researcher, abacus robot, and 초파리 연구원 in front. Chalk curves only, no text, no numbers, no logos. Leave the right upper 46% empty for a title.
```

### cover_10 — 오답 노트 ② — 조건 위반형
- 장면: 흔들리는 그래프 앞에서 마주 앉은 하루와 X1의 1:1 토론
- 주인공 표정: 조수 하루
```
16-bit SNES-era RPG pixel art, white background, daytime classroom with a dark green chalkboard. Scene: 흔들리는 그래프 앞에서 마주 앉은 하루와 X1의 1:1 토론. Characters from the lab pack: doctor, fruit-fly researcher, abacus robot, and 조수 하루 in front. Chalk curves only, no text, no numbers, no logos. Leave the right upper 46% empty for a title.
```

### cover_11 — 역사와 AI — 베르누이의 편지에서 컴퓨터까지
- 장면: 옛날 편지와 깃펜, 그리고 0을 내놓는 컴퓨터 화면을 함께 보는 2조
- 주인공 표정: 인턴 모아
```
16-bit SNES-era RPG pixel art, white background, daytime classroom with a dark green chalkboard. Scene: 옛날 편지와 깃펜, 그리고 0을 내놓는 컴퓨터 화면을 함께 보는 2조. Characters from the lab pack: doctor, fruit-fly researcher, abacus robot, and 인턴 모아 in front. Chalk curves only, no text, no numbers, no logos. Leave the right upper 46% empty for a title.
```

### cover_12 — 종합 — 기말 쪽지시험과 졸업 발표
- 장면: 졸업 가운을 입은 수강생 6명과 박사, 칠판의 다섯 걸음 순서도(글자 없이 아이콘)
- 주인공 표정: 박사
```
16-bit SNES-era RPG pixel art, white background, daytime classroom with a dark green chalkboard. Scene: 졸업 가운을 입은 수강생 6명과 박사, 칠판의 다섯 걸음 순서도(글자 없이 아이콘). Characters from the lab pack: doctor, fruit-fly researcher, abacus robot, and 박사 in front. Chalk curves only, no text, no numbers, no logos. Leave the right upper 46% empty for a title.
```

### cover_practice — 실전 연습장
```
16-bit SNES-era RPG pixel art, white background. Three small shop signs without text: a drone with a speedometer, a bank with a pile of gold coins growing, and a computer screen with a small bar chart. The doctor, the pink-haired assistant, the brown-haired intern and the abacus robot stand in front, ready to run the shops. No text, no numbers, no logos.
```

## 4. 장면 그림 (선택)

각 단계의 「일상으로 치면」 상자에 1200×800 장면 그림을 넣을 수 있어요(`img/scene/scene_NN_lvK.webp`, 파일이 있으면 빌드가 자동으로 넣음). 비유 목록은 각 장 정리 표의 「일상 비유」 열을 그대로 쓰면 돼요.
