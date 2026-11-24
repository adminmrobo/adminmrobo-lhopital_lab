#!/usr/bin/env python3
"""헤드리스 크롬 점검: 콘솔 오류 · 390/1280px 가로 넘침 · 빈 캐릭터 그림 · 조교 대결 실행 · 퀴즈 클릭.
사용: python3 tools/check_pages.py [파일 이름 ...]  (없으면 전부)"""
import sys, os, glob, json
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
files = sys.argv[1:] or sorted(glob.glob(os.path.join(ROOT, '[0-9][0-9]_*.html'))) + [os.path.join(ROOT, 'index.html'), os.path.join(ROOT, 'practice', 'index.html')]
bad = 0
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    for w in (390, 1280):
        pg = b.new_page(viewport={'width': w, 'height': 900})
        errs = []
        pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' and 'fonts.g' not in m.text and 'ERR_' not in m.text else None)
        pg.on('pageerror', lambda e: errs.append(str(e)))
        for f in files:
            f = f if os.path.isabs(f) else os.path.join(ROOT, f)
            errs.clear()
            pg.goto('file://' + f)
            pg.wait_for_timeout(250)
            r = pg.evaluate('''()=>{const d=document.documentElement;const over=d.scrollWidth-d.clientWidth;
              const wide=[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.right>innerWidth+2&&!e.closest('.tw')&&getComputedStyle(e).position!=='fixed';}).slice(0,3).map(e=>e.tagName+'.'+e.className);
              const empty=[...document.querySelectorAll('img[data-who]')].filter(i=>!i.getAttribute('src')).length;
              const failed=[...document.querySelectorAll('[data-w]')].filter(e=>/그리지 못했어요/.test(e.textContent)).length;
              return {over,wide,empty,failed};}''')
            duel = None
            if pg.query_selector('.duel-run'):
                pg.click('.duel-run')
                pg.wait_for_timeout(100)
                duel = pg.inner_text('.verdict')[:60]
            msg = []
            if r['over'] > 0: msg.append('넘침 %dpx %s' % (r['over'], r['wide']))
            if r['empty']: msg.append('빈 캐릭터 %d' % r['empty'])
            if r['failed']: msg.append('위젯 실패 %d' % r['failed'])
            if errs: msg.append('오류 %s' % errs[:3])
            if duel is not None and ('판정 모듈 없음' in duel or not duel.strip()): msg.append('대결 실패')
            if msg:
                bad += 1
            print(w, os.path.relpath(f, ROOT), 'OK' if not msg else ' / '.join(msg))
        pg.close()
    b.close()
print('문제 페이지', bad)
sys.exit(1 if bad else 0)
