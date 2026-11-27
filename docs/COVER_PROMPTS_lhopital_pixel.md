# 젠스파크용 그림 프롬프트 — 로피탈 교실 (픽셀풍)

> 대상: https://adminmrobo.github.io/adminmrobo-lhopital_lab/ (오리엔테이션 · 01~12장 · 실전 연습장)  
> 저장소: adminmrobo/adminmrobo-lhopital_lab · 작성 2026-11-25  
> 화풍: 16비트 RPG 픽셀아트 · 낮의 연구실 강의실 · 흰 배경

## 쓰는 법

- 블록 하나를 통째로 붙여 넣습니다. 화풍·캐릭터 묘사·금지 사항이 모두 들어 있습니다.
- **참고 그림**: 표에 적은 표정 그림을 같이 올립니다. 캐릭터 팩 저장소 `adminmrobo/fruitfly-lab-expressions`의 `images/{doctor·haru·sia·moa·fruitfly·jupanbot·x1~x3}/EXX_*.png`입니다.
- **순서**: 오리엔테이션 표지(A0)를 먼저 받아 그림체를 확인 → 그 표지를 참고 그림으로 함께 올려 나머지를 요청. 한 대화에 3~5장, 같은 비율끼리 묶습니다.
- 그림 속 글자·숫자·수식은 넣지 않습니다. 0/0, lim 같은 기호는 페이지 본문이 맡습니다.
- 설명 그림의 `The picture alone should make this idea clear` 줄이 그 그림이 전해야 할 한 문장입니다. 결과가 그 문장을 못 전하면 그 줄만 남기고 장면을 단순하게 다시 요청하세요.

| 종류 | 비율·크기 | 저장 위치 | 페이지 반영 |
|---|---|---|---|
| 표지 14장 | 16:9 · 1920×1080 | `img/cover/cover_00~12.webp`, `cover_practice.webp` | 이미 연결됨 — 같은 이름으로 바꿔 넣고 `python3 tools/build.py` |
| 공유 미리보기 | 1200×630 | `img/og/og_*.webp` | 표지 가운데를 잘라 만듦 |
| 장별 설명 그림 12장 | 3:2 · 1200×800 | `img/scene/scene_01_lv1.webp` ~ `scene_12_lv1.webp` | 이미 연결됨 — 파일이 있으면 각 장 1단계 「일상으로 치면」 자리에 자동으로 들어감 |

크기를 맞출 때는 '가장 가까운 이웃'(NEAREST) 방식으로 줄이고 무손실 WebP로 저장합니다(픽셀이 뭉개지지 않게).

## 캐릭터 줄 (프롬프트에 그대로 들어가 있음)

| 캐릭터 | 이 시리즈의 자리 | 영어 묘사 | 참고 폴더 |
|---|---|---|---|
| 박사 | 선생님 | a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie | doctor |
| 초파리 연구원 | 조교 (의심 담당) | an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings | fruitfly |
| 주판봇 | 조교 (확신 담당) | a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads | jupanbot |
| 인턴 시아 | 수강생 · 1조 「분자조」 | a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow | sia |
| 인턴 모아 | 수강생 · 2조 「분모조」 | a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan | moa |
| 조수 하루 | 수강생 · 1조 | a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie | haru |
| 미공개 X1~X3 | 수강생 (X1 1조, X2·X3 2조) | three small cute spare characters drawn as solid black silhouettes with round white eyes | x1~x3 |

---

## A. 표지 14장 (16:9)

표지마다 박사·초파리 연구원·주판봇이 나오고, 그 장의 주인공 수강생이 함께 나옵니다. 장의 수업 형식(토론·배틀·발표…)이 장면이 됩니다.

### A0. 오리엔테이션 — `cover_00.webp` · index.html

- 참고 표정: 박사 E08 · 조수 하루 E20 · 시아 E13 · 모아 E12 · 초파리 연구원 E07 · 주판봇 E16 · X1~X3 E13
- 그림이 전하는 것: 교실 첫날 — 칠판의 0/0 수수께끼 앞에 모두가 모인 장면. 「다가간다 · 기울기 · 비교한다」 세 가지만 잡으면 끝까지 간다는 시리즈의 약속.
- 저장: `img/cover/cover_00.webp`

```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Scene: the first day of class. On the big chalkboard, two glowing chalk curves (one blue, one red) both pass through the same point at the center, and at that point sits a small empty circle, like a hole. A teacher's desk with a magnifying glass, a stopwatch and a small toy race car.
Characters: a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie stands at the board pointing at the empty circle with a pointer, smiling warmly; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, nervous with a drop of sweat, raises her hand from the front row; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow sits neatly with a notebook, curious; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan cheers with both fists; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings peers at the empty circle through a magnifying glass; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads proudly holds up an abacus as if ready to calculate anything; three small cute spare characters drawn as solid black silhouettes with round white eyes sit in the back row, leaning forward.
Mood: the hopeful start of a class, calm and bright.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### A1. 극한 — 가까워지기와 같아지기 — `cover_01.webp` · 01_limits.html

- 참고 표정: 박사 E08 · 시아 E09 · 초파리 연구원 E07 · 주판봇 E16 · 조수 하루 E04
- 그림이 전하는 것: 반씩 다가가는 개구리 — 「가까워진다」와 「같아진다」는 다르다.
- 저장: `img/cover/cover_01.webp`

```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Scene: on the lab floor, a long white strip leads to a small wall. Along the strip, a cute green pixel frog leaves a trail of footprints that get closer and closer together as they approach the wall, but the frog never touches it. On the chalkboard behind, a row of dots shrinks toward one end.
Characters: a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, thinking, writes a neat column in her notebook; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie points at the tiny gap between the frog and the wall; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings holds a magnifying glass right at that tiny gap; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads confidently waves a small flag as if the frog already arrived; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie watches with surprise.
Mood: curious first lesson.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### A2. 0/0 수수께끼 — 정해지지 않은 꼴 — `cover_02.webp` · 02_zero_over_zero.html

- 참고 표정: 박사 E10 · 시아 E09 · 모아 E12 · 초파리 연구원 E08 · 주판봇 E16
- 그림이 전하는 것: 1:1 토론 — 「0/0은 0인가, 1인가」. 두 선수가 동시에 결승선에 닿는다.
- 저장: `img/cover/cover_02.webp`

```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Scene: a debate stage in the lab with two small podiums. Between them, a race track on the floor where two pixel runners (one blue, one purple) reach the same finish line at exactly the same moment.
Characters: a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow at the left podium holds up a blank round sign, serious; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan at the right podium holds up a blank round sign, cheerful; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie stands in the middle as judge with a calm face; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings kneels at the finish line comparing the two runners' footprints with a magnifying glass; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads holds a stopwatch, sure of himself.
Mood: friendly rivalry. Do not show who wins.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### A3. 기울기와 미분 다시 잡기 — `cover_03.webp` · 03_slope_derivative.html

- 참고 표정: 박사 E08 · 조수 하루 E19 · 모아 E12 · 초파리 연구원 E07 · 주판봇 E09
- 그림이 전하는 것: 조별 과제 — 언덕 위의 확대경. 확대하면 곡선은 직선, 그 기울기가 미분.
- 저장: `img/cover/cover_03.webp`

```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Scene: a gentle hill made of soft green pixel blocks fills the lower half of the room. A giant magnifying glass floats over one point on the hill; inside the lens, the curved hill looks like a perfectly straight ramp. Two team tables: one with a measuring tape stretched between two flags on the hill, the other with the magnifying glass on a stand.
Characters: a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, sparkling eyes, looks through the giant magnifying glass in amazement; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan holds the stand of the magnifying glass; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie points at the straight ramp inside the lens; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings adjusts the two flags closer together; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads carries a stack of blank formula cards.
Mood: a lightbulb moment.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### A4. 확대하면 직선 — 접선과 두 함수의 비 — `cover_04.webp` · 04_tangent_ratio.html

- 참고 표정: 박사 E08 · 시아 E12 · 모아 E09 · 초파리 연구원 E07 · 주판봇 E16 · X2 E01
- 그림이 전하는 것: 발표수업 — 같은 바닥에서 출발한 두 비탈길, 확대경 속 두 직선의 경사 비교.
- 저장: `img/cover/cover_04.webp`

```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Scene: a presentation corner. On the chalkboard, two chalk curves (green and red) start from the same point on the floor line; a round magnifying glass shape is drawn around that point, and inside it the two curves look like two straight ramps with different steepness.
Characters: a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, presenting with a pointer at the magnified ramps; one of three small cute spare characters drawn as solid black silhouettes with round white eyes holds up a large blank poster beside her; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, thinking, raises her hand from the audience to ask a question; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie listens with arms crossed and a calm smile; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings checks the two ramps with a small protractor; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads nods proudly.
Mood: confident presentation.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### A5. 로피탈의 정리 — 위아래 따로 미분하기 — `cover_05.webp` · 05_lhopital_rule.html

- 참고 표정: 박사 E10 · 주판봇 E16 · 초파리 연구원 E07 · 조수 하루 E09 · X3 E09
- 그림이 전하는 것: 계산배틀 — 이륙 전 점검표. 체크 네 개를 통과해야 「위아래 따로 미분」 버튼을 누른다.
- 저장: `img/cover/cover_05.webp`

```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Scene: a game-show calculation battle in the lab. Two buzzer desks face each other. Between them stands a tall pixel control panel like an airplane cockpit, with four big check lamps in a column (all unlit, waiting) and, below them, a large button split into an upper half and a lower half.
Characters: a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads leans eagerly toward the split button, hand hovering; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings holds a clipboard checklist with four blank boxes, pointing at the check lamps first; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie stands as the referee with a whistle; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie keeps score on a blank board, thinking hard; one of three small cute spare characters drawn as solid black silhouettes with round white eyes checks numbers with an abacus.
Mood: exciting showdown. Do not show who wins.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### A6. 한 번 더 미분 — 반복과 멈춤 — `cover_06.webp` · 06_repeat_and_stop.html

- 참고 표정: 박사 E08 · 모아 E12 · 시아 E09 · 초파리 연구원 E07 · 주판봇 E16 · X1 E04 · X2 E01
- 그림이 전하는 것: 조별 토론 — 젓가락으로 찔러 보기. 다 익으면 멈춘다.
- 저장: `img/cover/cover_06.webp`

```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Scene: a group discussion around two tables. On a small lab stove, a steamer basket of sweet potatoes steams; one sweet potato has a chopstick sliding in easily. On the chalkboard, a staircase of two steps leading down to a small flag.
Characters: one of three small cute spare characters drawn as solid black silhouettes with round white eyes tests the sweet potato with a chopstick; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan's team cheers at the flag; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow's team argues seriously, pointing at the first step; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie moderates with an open palm; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings points at the chopstick test; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads reaches for the steamer lid to steam again.
Mood: lively discussion.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### A7. 무한대 경주 — ∞/∞와 자라는 속도 — `cover_07.webp` · 07_infinity_race.html

- 참고 표정: 박사 E08 · X3 E16 · 주판봇 E16 · 초파리 연구원 E07 · 시아 E17 · 모아 E12
- 그림이 전하는 것: 계산배틀 2회전 — 끝없이 자라는 세 식물과 회전문.
- 저장: `img/cover/cover_07.webp`

```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Scene: three potted plants on a long shelf: a slow little succulent, a medium bamboo, and a giant vine shooting toward the ceiling and curling across it. In the corner, a revolving glass door spins with motion lines.
Characters: one of three small cute spare characters drawn as solid black silhouettes with round white eyes measures the plants with a long tape and looks proud; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads stands next to the bamboo, betting on it with a confident pose; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings points up at the giant vine; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie referees with a stopwatch; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow dozes on a chair; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan gently wakes her up.
Mood: playful competition. Do not show who wins.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### A8. 변신시켜 쓰기 — 0·∞, 1^∞, ∞−∞ — `cover_08.webp` · 08_other_forms.html

- 참고 표정: 박사 E08 · 모아 E19 · 조수 하루 E09 · 초파리 연구원 E07 · 주판봇 E16 · X1 E16 · X2 E09
- 그림이 전하는 것: 역할극 수업 — 분수 의상으로 갈아입고 무대에 오르기. 줄다리기와 복리 금화.
- 저장: `img/cover/cover_08.webp`

```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Scene: a small theater stage set up in the lab with a curtain. A clothes rack holds costumes shaped like big fraction bars. On stage, a tug-of-war rope stretches between a tiny figure and a huge figure. Beside the stage, a pile of gold coins grows step by step toward a dashed glass ceiling.
Characters: a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, sparkling eyes, holds a gold coin and acts on stage; one of three small cute spare characters drawn as solid black silhouettes with round white eyes pulls the tug-of-war rope; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, as stage manager, holds a checklist; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie claps from the director's chair; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings hands a fraction-bar costume to a performer; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads tries to climb on stage without changing costume.
Mood: fun and theatrical.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### A9. 오답 노트 ① — 계산 실수형 — `cover_09.webp` · 09_mistakes_calc.html

- 참고 표정: 박사 E10 · 초파리 연구원 E16 · 시아 E09 · 주판봇 E16 · X3 E16
- 그림이 전하는 것: 찬반 토론 — 반례 노트를 든 초파리. 열이 없는데 해열제를 꺼내는 주판봇.
- 저장: `img/cover/cover_09.webp`

```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Scene: a debate hall with two podiums facing each other and a big notebook-shaped board in the middle with three blank sticky notes. On a side table, a thermometer showing normal temperature next to an untouched medicine bottle.
Characters: an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, proud, holds up a thick notebook of counterexamples at one podium; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow stands at the other podium, determined; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads reaches for the medicine bottle even though the thermometer is normal; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie watches as judge; one of three small cute spare characters drawn as solid black silhouettes with round white eyes checks a small table of values.
Mood: sharp but friendly debate. Do not show who wins.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### A10. 오답 노트 ② — 조건 위반형 — `cover_10.webp` · 10_mistakes_conditions.html

- 참고 표정: 박사 E10 · 조수 하루 E12 · X1 E24 · 초파리 연구원 E08 · 주판봇 E16 · 모아 E12
- 그림이 전하는 것: 1:1 토론(심화) — 흔들리는 파도 그래프 앞의 하루와 X1.
- 저장: `img/cover/cover_10.webp`

```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Scene: a one-on-one debate table. On the chalkboard behind, a blue chalk line settles into a flat steady line while a red chalk line keeps waving up and down; on a second board, a runner keeps stopping and starting.
Characters: a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, cheerful and determined, on one side; one of three small cute spare characters drawn as solid black silhouettes with round white eyes sits on the other side with wide surprised eyes, holding three blank cards; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings points at the waving red line; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads cheers for the red line; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan cheers for both from the audience; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie judges calmly.
Mood: thoughtful, slightly tense. Do not show who wins.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### A11. 역사와 AI — 베르누이의 편지에서 컴퓨터까지 — `cover_11.webp` · 11_history_ai.html

- 참고 표정: 박사 E08 · 모아 E09 · 시아 E07 · 초파리 연구원 E07 · 주판봇 E04 · X2 E09
- 그림이 전하는 것: 발표 + 질의응답 — 옛 편지와 깃펜, 그리고 0을 내놓는 컴퓨터 화면.
- 저장: `img/cover/cover_11.webp`

```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Scene: a presentation desk split in two halves. Left half: an old parchment letter with a wax seal, a quill pen and a small stack of old gold coins on a wooden tray. Right half: a retro computer screen showing a column of bars that suddenly drops to nothing at the bottom, and a small AI robot icon on a chart.
Characters: a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow presents the old letter with a pointer; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, thinking, holds a magnifying glass over the parchment; one of three small cute spare characters drawn as solid black silhouettes with round white eyes points at the computer screen; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads looks shocked at his own screen; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings takes notes; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie asks a question with a raised finger.
Mood: curious, story-like.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### A12. 종합 — 기말 쪽지시험과 졸업 발표 — `cover_12.webp` · 12_final_review.html

- 참고 표정: 박사 E10 · 조수 하루 E12 · 시아 E12 · 모아 E19 · 초파리 연구원 E16 · 주판봇 E01 · X1~X3 E16
- 그림이 전하는 것: 졸업 — 가운을 입은 수강생 6명, 칠판의 다섯 걸음 아이콘.
- 저장: `img/cover/cover_12.webp`

```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Scene: graduation day in the classroom. On the chalkboard, five simple icons in a row connected by arrows: a key, a magnifying glass, a costume hanger, a split button, and a checkmark table. Confetti in the air. Small blank diplomas tied with ribbons on the desk.
Characters: a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow and a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan wear small graduation caps and gowns, smiling; three small cute spare characters drawn as solid black silhouettes with round white eyes also wear tiny caps; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie hands out the diplomas proudly; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings applauds; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads happily holds a diploma for the first time.
Mood: warm and celebratory.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### A13. 실전 연습장 — 로피탈 사업장 시뮬레이터 — `cover_practice.webp` · practice/index.html

- 참고 표정: 박사 E08 · 조수 하루 E19 · 모아 E12 · 주판봇 E09
- 그림이 전하는 것: 세 사업장 — 드론 속도계 공장, 복리 은행, AI 채점실.
- 저장: `img/cover/cover_practice.webp`

```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Scene: three small shop booths side by side inside the lab, each with a blank sign: a drone booth with a hovering drone and a round speedometer gauge; a bank booth with a stack of gold coins growing under a glass dome; an AI booth with a monitor showing a small bar chart and a robot icon.
Characters: a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie gestures toward the three booths like a guide; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, sparkling eyes, holds a drone controller; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan counts coins at the bank booth; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads sits at the AI booth monitor ready to calculate.
Mood: ready for hands-on practice.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

---

## B. 장별 설명 그림 12장 (3:2)

각 장 1단계 「일상으로 치면」 비유를 한 장으로 옮겼습니다.

| 장 | 비유 | 이 그림이 이해시키는 것 |
|---|---|---|
| 01 | 개구리와 벽 | 다가가기와 같아지기는 다르다 |
| 02 | 동시 도착 경주 | 0/0은 경주의 결과에 따라 달라진다 |
| 03 | 언덕 위의 확대경 | 확대하면 곡선은 직선, 그 기울기가 미분 |
| 04 | 같은 바닥에서 출발한 두 비탈길 | 값의 비 ≈ 기울기의 비 |
| 05 | 이륙 전 점검표 | 점검표를 통과해야 위아래 따로 미분 |
| 06 | 젓가락 시험 | 부정형인 동안만 미분, 보통 수가 나오면 멈춤 |
| 07 | 자라기 경주와 회전문 | log < 거듭제곱 < 지수, 그리고 무한 루프 |
| 08 | 줄다리기와 복리 금화 | 0·∞, 1^∞는 분수 꼴로 바꾼 뒤 로피탈 |
| 09 | 열 없는 해열제 | 부정형이 아니면 로피탈을 쓰지 않는다 |
| 10 | 안내 못 하는 내비게이션과 멈칫하는 선수 | 조건 ③④를 어기면 로피탈이 침묵하거나 틀린다 |
| 11 | 옛 편지와 눈금 모자란 자 | 발견은 베르누이, 이름은 로피탈 — 컴퓨터도 눈금이 있다 |
| 12 | 다섯 걸음 순서도 | 대입 → 꼴 확인 → 변신 → 로피탈 → 숫자로 확인 |

### B1. 01장 개구리와 벽 — `scene_01_lv1.webp`

- 참고 표정: 시아 E09 · 초파리 연구원 E07 · 주판봇 E16
- 넣는 곳: 01_limits.html 1단계 「일상으로 치면」 상자

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Layout: a long white floor strip from left to right ending at a small wall.
Scene: a cute green pixel frog jumps toward the wall; each jump is half as long as the last, shown by footprints that crowd together near the wall. A tiny glowing gap always remains between the frog and the wall. A target sign hangs on the wall.
Characters: an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings holds a big magnifying glass over the tiny gap; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads waves a small flag declaring arrival too early; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow quietly marks each footprint in a notebook.
The picture alone should make this idea clear: the frog gets closer and closer to the wall without ever touching it; where it is heading (the limit) is the wall.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B2. 02장 동시 도착 경주 — `scene_02_lv1.webp`

- 참고 표정: 모아 E12 · 시아 E09 · 초파리 연구원 E07
- 넣는 곳: 02_zero_over_zero.html 1단계 「일상으로 치면」 상자

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Layout: three short race lanes stacked from top to bottom, all ending at the same finish line on the left.
Scene: in each lane, two runners (blue on top, purple below) arrive at the finish line together, but the leftover distance bars behind them differ: lane 1 equal bars, lane 2 the blue bar almost vanished, lane 3 the blue bar three times longer than the purple.
Characters: a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan and a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow stand at the finish line holding blank round signs; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings compares the bar lengths with a magnifying glass.
The picture alone should make this idea clear: both runners reach zero together, but how fast each one gets there decides the answer, so zero over zero has no single answer.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B3. 03장 언덕 위의 확대경 — `scene_03_lv1.webp`

- 참고 표정: 조수 하루 E19 · 박사 E08 · 초파리 연구원 E07
- 넣는 곳: 03_slope_derivative.html 1단계 「일상으로 치면」 상자

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Layout: left: a whole curved green hill; right: a big round magnifier inset that zooms into one point of the hill.
Scene: on the hill, two flags with a dashed line between them slide closer together. Inside the magnifier the hill looks perfectly straight, like a ramp, with a small orange arrow showing its steepness.
Characters: a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie looks through the magnifier with sparkling eyes; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie points at the straight ramp; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings moves the second flag toward the first.
The picture alone should make this idea clear: zoom in close enough and a smooth curve looks straight; the steepness of that straight piece is the derivative.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B4. 04장 같은 바닥에서 출발한 두 비탈길 — `scene_04_lv1.webp`

- 참고 표정: 시아 E12 · 모아 E09 · 박사 E08
- 넣는 곳: 04_tangent_ratio.html 1단계 「일상으로 치면」 상자

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Layout: two ramps starting from exactly the same point on the floor, one gentle (green), one steep (red), with a magnifying circle around the starting point.
Scene: two small balls have rolled up the ramps by the same horizontal step; vertical height bars show the red height is clearly taller than the green height, in the same proportion as the steepness of the ramps.
Characters: a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow measures the two heights with a ruler; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan measures the two slopes with a protractor; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie nods, holding the magnifier.
The picture alone should make this idea clear: when two things start from zero together, the ratio of their heights right after the start equals the ratio of their slopes.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B5. 05장 이륙 전 점검표 — `scene_05_lv1.webp`

- 참고 표정: 초파리 연구원 E07 · 주판봇 E16 · 조수 하루 E09
- 넣는 곳: 05_lhopital_rule.html 1단계 「일상으로 치면」 상자

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Layout: a cockpit panel in the center with four check lamps in a column; below it a big button split into an upper half and a lower half, each connected to its own small gear machine.
Scene: the four lamps light up one by one in green; only then the split button glows. The upper gear machine works on a top tray and the lower gear machine works on a bottom tray, separately.
Characters: an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings ticks a checklist next to the lamps; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads waits impatiently with a hand near the button; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie watches the two separate machines, understanding.
The picture alone should make this idea clear: check the four conditions first, then work on the top and the bottom separately, never on the whole fraction at once.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B6. 06장 젓가락 시험 — `scene_06_lv1.webp`

- 참고 표정: 모아 E12 · X2 E01 · 주판봇 E16
- 넣는 곳: 06_repeat_and_stop.html 1단계 「일상으로 치면」 상자

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Layout: left: a steamer with sweet potatoes; right: a short two-step staircase leading down to a flag.
Scene: a chopstick slides easily into a cooked sweet potato and a small green check mark glows; on the staircase, two footprints go down two steps and stop exactly at the flag.
Characters: a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan holds the chopstick; one of three small cute spare characters drawn as solid black silhouettes with round white eyes stands at the flag; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads tries to keep walking past the flag and a small red stop sign blocks him.
The picture alone should make this idea clear: keep going only while it is still unfinished; the moment you get a normal number, stop.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B7. 07장 자라기 경주와 회전문 — `scene_07_lv1.webp`

- 참고 표정: X3 E16 · 주판봇 E16 · 초파리 연구원 E07
- 넣는 곳: 07_infinity_race.html 1단계 「일상으로 치면」 상자

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Layout: left 65%: three plants growing on a shelf; right 35%: a revolving glass door.
Scene: a slow succulent, a taller bamboo, and a vine that explodes upward and curls along the ceiling. At the right, a figure walks in the revolving door and comes back out to the same spot, with circular motion lines.
Characters: one of three small cute spare characters drawn as solid black silhouettes with round white eyes measures the plants with a tape; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads stands inside the revolving door, dizzy; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings points to a plain side door next to the revolving door.
The picture alone should make this idea clear: some things grow far faster than others in the end; and if a method only spins you around in circles, use another door.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B8. 08장 줄다리기와 복리 금화 — `scene_08_lv1.webp`

- 참고 표정: 모아 E19 · 조수 하루 E09 · 초파리 연구원 E07
- 넣는 곳: 08_other_forms.html 1단계 「일상으로 치면」 상자

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Layout: left: a tug-of-war; right: a pile of gold coins under a glass dome ceiling.
Scene: left, a tiny figure and a huge figure pull a rope, and the knot slowly moves toward the tiny figure's side. Right, coins are added in smaller and smaller amounts more and more often, the pile rising but never passing a dashed line on the glass ceiling.
Characters: a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie holds a fraction-bar costume ready for both scenes; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan drops coins, sparkling eyes; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings watches the knot.
The picture alone should make this idea clear: a tug-of-war between something shrinking and something growing has a winner, and tiny growth repeated forever reaches a ceiling (e), not infinity.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B9. 09장 열 없는 해열제 — `scene_09_lv1.webp`

- 참고 표정: 초파리 연구원 E16 · 주판봇 E16 · 시아 E09
- 넣는 곳: 09_mistakes_calc.html 1단계 「일상으로 치면」 상자

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Layout: three small panels side by side.
Scene: panel 1: a thermometer shows normal temperature while a medicine bottle is about to be opened (stop sign). Panel 2: a cooked sweet potato being steamed again and turning mushy. Panel 3: a performer stepping on stage without a costume, a costume rack ignored behind.
Characters: a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads appears in all three panels making the mistake; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, proud, holds a red stop sign in each; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow writes in a notebook.
The picture alone should make this idea clear: most mistakes come from skipping the first check: substitute first and see whether it is really zero over zero.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B10. 10장 안내 못 하는 내비게이션과 멈칫하는 선수 — `scene_10_lv1.webp`

- 참고 표정: 조수 하루 E12 · X1 E24 · 초파리 연구원 E08
- 넣는 곳: 10_mistakes_conditions.html 1단계 「일상으로 치면」 상자

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Layout: left: a car navigation screen showing a question mark icon while a clear road continues ahead to a destination; right: a race where the lower runner keeps freezing mid-stride at regular spots marked on the track.
Scene: on the left, the road leads to a flag even though the navigation shows nothing. On the right, the freezing spots are marked with small red dots along the lane.
Characters: a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie drives the car, surprised the road still leads on; one of three small cute spare characters drawn as solid black silhouettes with round white eyes points at the red freezing dots; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings holds a magnifying glass over one red dot.
The picture alone should make this idea clear: if the tool goes silent, the answer may still exist; and if the bottom runner keeps stopping, comparing speeds gives a false answer.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B11. 11장 옛 편지와 눈금 모자란 자 — `scene_11_lv1.webp`

- 참고 표정: 모아 E09 · 주판봇 E04 · 박사 E08
- 넣는 곳: 11_history_ai.html 1단계 「일상으로 치면」 상자

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Layout: left: a candlelit desk with a parchment letter, a quill and a small stack of old coins; right: a modern desk with a ruler measuring a tiny gap that is smaller than its marks, and a monitor showing bars that suddenly drop to zero at the bottom.
Scene: a soft path of light connects the old letter on the left to the monitor on the right.
Characters: a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan studies the old letter with a magnifying glass; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads stares at his screen in shock; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie holds the ruler up, showing its coarse marks.
The picture alone should make this idea clear: the rule was discovered by a teacher and published by his student, and today computers can be fooled when the gap is smaller than their marks.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B12. 12장 다섯 걸음 순서도 — `scene_12_lv1.webp`

- 참고 표정: 조수 하루 E12 · 시아 E12 · 모아 E19 · 박사 E10
- 넣는 곳: 12_final_review.html 1단계 「일상으로 치면」 상자

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background and white walls, soft natural sunlight, a dark green chalkboard with colored chalk lines, teal, orange and navy accents.
Layout: a winding path on the floor with five stepping stones from left to right, ending at a graduation stage.
Scene: each stone has an icon: a key, a magnifying glass, a costume hanger, a split button, a checkmark table. Most footprints leave the path early at the first stone and go straight to the stage by a shortcut, showing that many problems end at the first step.
Characters: a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow and a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan walk the stones in graduation caps; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie waits at the stage with diplomas.
The picture alone should make this idea clear: solve every limit in the same five-step order, and most problems finish at the very first step.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

---

## C. 금지 표현 검사 (2026-11-25)

| 검사 대상 | 결과 |
|---|---|
| 연구실 금지 표현 3종(사용자 지정) | 0건 |
| 독자를 낮춰 부르는 줄임말 두 가지 | 0건 |
| 그림 속 글자·숫자·수식 요청 | 0건 (모든 블록에 금지 줄 포함) |

---

## D. 오프닝 만화 (선택, 4컷 · 1:1)

오리엔테이션의 오프닝은 이제 「로피탈 교실 단톡방」 메신저 대화(캐릭터 팩 얼굴 + HTML 말풍선)예요. 아래는 같은 이야기를 한 장짜리 픽셀 만화(공유용 포스터 등)로 만들고 싶을 때 쓰는 선택 지시문이에요. 원작 밈(@the_calculusguy)의 애니메이션 캐릭터는 쓰지 않고, 2×2 구도와 「자신만만 → 머리가 멈춤」 흐름만 빌려요. 말풍선은 비워 두고 글은 페이지가 맡아요.

- 참고 표정: 박사 E07 · 주판봇 E09·E07 · 조수 하루 E16·E24·E02 · 시아 E09 · 초파리 연구원 E10 · 모아 E09
- 저장: `img/scene/comic_lhopital.webp` (1200×1200, NEAREST, 무손실)

```
Four-panel comic strip in a 2x2 grid, square 1:1, thick black panel borders, white gutters.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit SNES-era RPG pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime classroom inside a lab, clean white background, a dark green chalkboard with a single chalk fraction-bar shape (no symbols).
Panel 1 (top left): a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie points at the chalkboard; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads stands beside him with a small question mark.
Panel 2 (top right): close-up of a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, very confident smug grin, one finger raised, sparkles around her. Empty speech bubble.
Panel 3 (bottom left): the same girl frozen with wide shocked eyes, both hands on her head, a gray pixel loading-spinner circle above her head; around her a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, and a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan gently scold her with small sweat drops and wagging fingers (playful, not mean). Three empty speech bubbles.
Panel 4 (bottom right): the boxy CRT robot kindly explains with an open hand next to a small chalk staircase of four steps; the pink-haired girl listens with a relieved sigh; the scientist smiles. Empty speech bubble.
Mood: comic and warm, gentle teasing, no one is hurt or humiliated.
No text, no letters, no numbers, no formulas inside the picture, no logos, no school uniform, no weapons, no real brands, no existing anime characters.
```
