#!/usr/bin/env python3
"""픽셀아트 대체 표지 (16비트 RPG 느낌, 흰 배경).
480×270 픽셀 격자에 그린 뒤(칠판·캐릭터는 왼쪽, 오른쪽 46%는 제목 자리) NEAREST 4배 → 1920×1080 무손실 WebP.
공유 미리보기: 400×210을 잘라 NEAREST 3배 → 1200×630. 그림 안에 글자는 넣지 않는다(제목은 HTML).
사용: python3 tools/make_covers.py"""
import os, re, io, sys, math, base64, random, importlib.util
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GENERIC = {'think': 'e09', 'cheer': 'e12', 'sparkle': 'e19', 'shock': 'e24', 'spark': 'e01', 'coin': 'e16', 'proud': 'e16', 'judge': 'e10', 'magnify': 'e07', 'front': 'e08', 'calc': 'e09', 'smile': 'e13'}
INK = (22, 33, 43)
COLS = [(120, 190, 255), (255, 130, 120), (140, 235, 150), (255, 210, 90), (230, 160, 255), (150, 230, 230)]  # 분필 색


def load_sprites():
    s = open(os.path.join(ROOT, 'tools', 'sprites_pack.js'), encoding='utf-8').read()
    return {k: Image.open(io.BytesIO(base64.b64decode(v))).convert('RGBA') for k, v in re.findall(r'"([a-z0-9]+_e\d\d)":"data:image/webp;base64,([^"]+)"', s)}


def sprite(SP, who, mood):
    k = who + '_' + (mood if re.match(r'^e\d\d$', mood) else GENERIC.get(mood, 'e13'))
    im = SP.get(k) or SP.get(who + '_e13') or SP.get(who + '_e08')
    return im.resize((48, 48), Image.NEAREST)


def board(d, x0, y0, w, h, fns, seed, hole=None):
    """칠판(초록 회색) 위에 픽셀 곡선. fns: [(f, xr, yr, color)]"""
    d.rectangle([x0 - 4, y0 - 4, x0 + w + 4, y0 + h + 4], fill=(120, 84, 48))
    d.rectangle([x0, y0, x0 + w, y0 + h], fill=(40, 62, 58))
    for x in range(x0, x0 + w, 2):
        if (x // 2) % 7 == 0:
            d.point((x, y0 + h // 2), fill=(90, 112, 108))
    d.line([x0 + 6, y0 + h // 2, x0 + w - 6, y0 + h // 2], fill=(150, 170, 165))
    d.line([x0 + w // 2, y0 + 6, x0 + w // 2, y0 + h - 6], fill=(150, 170, 165))
    for f, xr, yr, col in fns:
        prev = None
        for i in range(w - 12):
            t = xr[0] + (xr[1] - xr[0]) * i / (w - 12)
            try:
                v = f(t)
            except Exception:
                prev = None
                continue
            if v != v or abs(v) > 1e6:
                prev = None
                continue
            px = x0 + 6 + i
            py = y0 + h - 6 - (v - yr[0]) / (yr[1] - yr[0]) * (h - 12)
            if py < y0 + 3 or py > y0 + h - 3:
                prev = None
                continue
            py = round(py)
            if prev and abs(prev - py) < 30:
                d.line([px - 1, prev, px, py], fill=col, width=2)
            else:
                d.rectangle([px, py, px + 1, py + 1], fill=col)
            prev = py
    if hole:
        hx, hy = hole
        d.rectangle([hx - 2, hy - 2, hx + 2, hy + 2], outline=(255, 255, 255))


def bg(seed):
    W, H = 480, 270
    im = Image.new('RGB', (W, H), (255, 255, 255))
    d = ImageDraw.Draw(im)
    R = random.Random(seed)
    for y in range(0, H, 6):
        for x in range(0, W, 6):
            if R.random() < 0.3:
                d.point((x, y), fill=(226, 232, 238))
    d.rectangle([0, H - 26, W, H], fill=(243, 246, 250))
    for x in range(0, W, 4):
        d.point((x, H - 26), fill=(213, 219, 226))
    return im, d


S = math.sin
MOTIF = {
    0: [(lambda x: (1 - math.cos(x)) / (x * x) if x else float('nan'), (-6, 6), (-0.1, 0.6), COLS[0]), (lambda x: S(x) / x if x else float('nan'), (-6, 6), (-0.3, 1.1), COLS[1])],
    1: [(lambda x: 1 / x, (0.05, 5), (0, 6), COLS[0])],
    2: [(lambda x: x, (-2, 2), (-2, 2), COLS[0]), (lambda x: x * x, (-2, 2), (-2, 2), COLS[1])],
    3: [(lambda x: 2 + S(x), (-0.5, 4), (0, 4), COLS[0]), (lambda x: 2 + S(1) + math.cos(1) * (x - 1), (-0.5, 4), (0, 4), COLS[3])],
    4: [(S, (-1.5, 1.5), (-1.5, 1.5), COLS[2]), (lambda x: math.exp(x) - 1, (-1.5, 1.5), (-1.5, 1.5), COLS[1])],
    5: [(lambda x: x + 2, (0, 4), (1, 7), COLS[0])],
    6: [(lambda x: (1 - math.cos(x)) / (x * x) if x else float('nan'), (-4, 4), (0, 0.6), COLS[0])],
    7: [(lambda x: x ** 2, (0, 6), (0, 40), COLS[0]), (math.exp, (0, 6), (0, 40), COLS[1]), (lambda x: 10 * math.log(x) if x > 0 else float('nan'), (0, 6), (0, 40), COLS[2])],
    8: [(lambda x: (1 + 1 / x) ** x if x > 0 else float('nan'), (0.05, 30), (1, 3), COLS[3])],
    9: [(lambda x: (x * x + 1) / (x + 1), (0, 2), (0, 2), COLS[0]), (lambda x: 2 * x, (0, 2), (0, 4), COLS[1])],
    10: [(lambda x: 1 + math.cos(x), (1, 40), (-0.2, 2.2), COLS[1]), (lambda x: (x + S(x)) / x, (1, 40), (-0.2, 2.2), COLS[0])],
    11: [(lambda x: x * math.log(x) if x > 0 else float('nan'), (0, 1.2), (-0.5, 0.2), COLS[4])],
    12: [(lambda x: (1 - math.cos(x)) / (x * x) if x else float('nan'), (-5, 5), (-0.1, 0.6), COLS[2])],
    'practice': [(lambda x: math.exp(x), (0, 2), (0, 8), COLS[0]), (lambda x: (1 + 1 / max(x, 0.01)) ** max(x, 0.01), (0, 20), (1, 3), COLS[3])],
}


def make(SP, key, chars, motif, seed):
    im, d = bg(seed)
    # 칠판은 왼쪽 절반에 두고, 오른쪽 46%는 제목 자리로 비워 둔다
    board(d, 18, 22, 228, 150, MOTIF[motif], seed)
    d.rectangle([14, 176, 250, 180], fill=(150, 110, 70))
    x = 14
    for i, (who, mood) in enumerate(chars):
        sp = sprite(SP, who, mood)
        y = 270 - 26 - 48 + (0 if i % 2 == 0 else 2)
        im.paste(sp, (x, y), sp)
        x += 52 if i < 3 else 46
    big = im.resize((1920, 1080), Image.NEAREST)
    big.save(os.path.join(ROOT, 'img', 'cover', key + '.webp'), 'WEBP', lossless=True)
    og = im.crop((0, 10, 400, 220)).resize((1200, 630), Image.NEAREST)
    return og


def main():
    if '--force' not in sys.argv:
        print('젠스파크 표지가 들어가 있어요. 대체 표지로 덮어쓰려면 --force'); return
    SP = load_sprites()
    sys.path.insert(0, os.path.join(ROOT, 'content'))
    os.makedirs(os.path.join(ROOT, 'img', 'cover'), exist_ok=True)
    os.makedirs(os.path.join(ROOT, 'img', 'og'), exist_ok=True)
    og = make(SP, 'cover_00', [('doc', 'front'), ('fly', 'magnify'), ('robo', 'coin'), ('sia', 'e13'), ('moa', 'cheer'), ('asst', 'spark')], 0, 0)
    og.save(os.path.join(ROOT, 'img', 'og', 'og_index.webp'), 'WEBP', lossless=True)
    for n in range(1, 13):
        spec = importlib.util.spec_from_file_location('c', os.path.join(ROOT, 'content', 'ch%02d.py' % n))
        m = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(m)
        st = m.CH['star']
        base = [w for w in [('doc', 'front'), ('fly', 'magnify'), ('robo', 'smile')] if w[0] != st[0]]
        if len(base) < 3:
            base.append(('asst', 'spark'))
        og = make(SP, 'cover_%02d' % n, base + [st], n, n)
        og.save(os.path.join(ROOT, 'img', 'og', 'og_%02d.webp' % n), 'WEBP', lossless=True)
    og = make(SP, 'cover_practice', [('doc', 'front'), ('asst', 'spark'), ('moa', 'cheer'), ('robo', 'calc')], 'practice', 99)
    og.save(os.path.join(ROOT, 'img', 'og', 'og_practice.webp'), 'WEBP', lossless=True)
    print('covers done')


if __name__ == '__main__':
    main()
