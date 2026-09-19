const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function testNavbar() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9695;
  const tempDir = path.join(os.tmpdir(), 'chrome_navbar_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,900',
    'http://localhost:3000/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  http.get(`http://127.0.0.1:${port}/json/list`, (res) => {
    let d = ''; res.on('data', c => d += c);
    res.on('end', async () => {
      try {
        const targets = JSON.parse(d);
        const page = targets.find(t => t.type === 'page');
        const ws = new WebSocket(page.webSocketDebuggerUrl);
        await new Promise(r => ws.addEventListener('open', r, { once: true }));

        let id = 1;
        const send = (method, params = {}) => new Promise(resolve => {
          const myId = id++;
          const h = (e) => {
            const msg = JSON.parse(e.data);
            if (msg.id === myId) {
              ws.removeEventListener('message', h);
              resolve(msg.result);
            }
          };
          ws.addEventListener('message', h);
          ws.send(JSON.stringify({ id: myId, method, params }));
        });

        await send('Page.enable');
        await send('Runtime.enable');
        await send('DOM.enable');

        await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
        await send('Page.navigate', { url: 'http://localhost:3000/' });
        await new Promise(r => setTimeout(r, 2500));

        // 1. Check header visibility at scroll top = 0 on /
        const topState = await send('Runtime.evaluate', {
          expression: `(() => {
            const header = document.querySelector('header');
            const pill = header ? header.firstElementChild : null;
            const cs = pill ? window.getComputedStyle(pill) : null;
            return {
              scrollY: window.scrollY,
              headerExists: Boolean(header),
              pillOpacity: cs ? cs.opacity : null,
              pillVisibility: cs ? cs.visibility : null,
              pillClasses: pill ? pill.className : null
            };
          })()`,
          returnByValue: true
        });

        // Screenshot at top: navbar should NOT show
        const shotTop = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'home_hero_navbar_hidden.png'), Buffer.from(shotTop.data, 'base64'));

        // 2. Scroll down past hero into section 2
        await send('Runtime.evaluate', {
          expression: `(() => {
            const about = document.getElementById('about-overview');
            if (about) about.scrollIntoView({ behavior: 'instant', block: 'start' });
            else window.scrollTo({ top: 1200, behavior: 'instant' });
          })()`
        });
        await new Promise(r => setTimeout(r, 1200));

        const scrolledState = await send('Runtime.evaluate', {
          expression: `(() => {
            const header = document.querySelector('header');
            const pill = header ? header.firstElementChild : null;
            const cs = pill ? window.getComputedStyle(pill) : null;
            return {
              scrollY: window.scrollY,
              pillOpacity: cs ? cs.opacity : null,
              pillVisibility: cs ? cs.visibility : null,
              pillClasses: pill ? pill.className : null
            };
          })()`,
          returnByValue: true
        });

        // Screenshot scrolled: navbar SHOULD show
        const shotScrolled = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'home_scrolled_navbar_visible.png'), Buffer.from(shotScrolled.data, 'base64'));

        // 3. Scroll back to top
        await send('Runtime.evaluate', {
          expression: 'window.scrollTo({ top: 0, behavior: "instant" })'
        });
        await new Promise(r => setTimeout(r, 1000));

        const returnTopState = await send('Runtime.evaluate', {
          expression: `(() => {
            const header = document.querySelector('header');
            const pill = header ? header.firstElementChild : null;
            const cs = pill ? window.getComputedStyle(pill) : null;
            return {
              scrollY: window.scrollY,
              pillOpacity: cs ? cs.opacity : null,
              pillVisibility: cs ? cs.visibility : null
            };
          })()`,
          returnByValue: true
        });

        // 4. Test inner page (/about) — navbar should be visible at top
        await send('Page.navigate', { url: 'http://localhost:3000/about' });
        await new Promise(r => setTimeout(r, 2000));

        const aboutState = await send('Runtime.evaluate', {
          expression: `(() => {
            const header = document.querySelector('header');
            const pill = header ? header.firstElementChild : null;
            const cs = pill ? window.getComputedStyle(pill) : null;
            return {
              scrollY: window.scrollY,
              pillOpacity: cs ? cs.opacity : null,
              pillVisibility: cs ? cs.visibility : null
            };
          })()`,
          returnByValue: true
        });

        // 5. Test LP (/lp/managed-farmland) — navbar hidden at top, reveals on scroll
        await send('Page.navigate', { url: 'http://localhost:3000/lp/managed-farmland' });
        await new Promise(r => setTimeout(r, 2000));

        const lpTopState = await send('Runtime.evaluate', {
          expression: `(() => {
            const header = document.querySelector('header');
            const pill = header ? header.firstElementChild : null;
            const cs = pill ? window.getComputedStyle(pill) : null;
            return {
              scrollY: window.scrollY,
              pillOpacity: cs ? cs.opacity : null,
              pillVisibility: cs ? cs.visibility : null
            };
          })()`,
          returnByValue: true
        });

        const report = {
          homeAtTop: topState.result.value,
          homeScrolled: scrolledState.result.value,
          homeReturnTop: returnTopState.result.value,
          aboutPageAtTop: aboutState.result.value,
          lpPageAtTop: lpTopState.result.value
        };

        console.log('NAVBAR SCROLL AUDIT REPORT:', JSON.stringify(report, null, 2));
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'navbar_scroll_audit_report.json'), JSON.stringify(report, null, 2));

        ws.close();
        p.kill();
        process.exit(0);
      } catch (err) {
        console.error('Navbar audit error:', err);
        p.kill();
        process.exit(1);
      }
    });
  }).on('error', (e) => {
    console.error('Connection error:', e);
    p.kill();
    process.exit(1);
  });
}

testNavbar();
