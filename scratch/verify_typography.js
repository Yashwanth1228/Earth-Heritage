const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function runVisualQA() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9450;
  const tempDir = path.join(os.tmpdir(), 'chrome_typo_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,1100',
    'http://localhost:3000/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  http.get(`http://127.0.0.1:${port}/json/list`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      const targets = JSON.parse(data);
      const page = targets.find(t => t.type === 'page');
      const ws = new WebSocket(page.webSocketDebuggerUrl);

      let id = 1;
      const send = (method, params = {}) => new Promise(resolve => {
        const myId = id++;
        const handler = (e) => {
          const msg = JSON.parse(e.data);
          if (msg.id === myId) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: myId, method, params }));
      });

      await new Promise(r => ws.onopen = r);
      await send('Page.enable');
      await send('DOM.enable');

      const pagesToTest = [
        { route: '/', name: 'hero' },
        { route: '/about', name: 'about' },
        { route: '/managed-farmland', name: 'managed_farmland' },
        { route: '/how-it-works', name: 'how_it_works' },
        { route: '/projects', name: 'projects' },
        { route: '/gallery', name: 'gallery' },
        { route: '/events', name: 'events' }
      ];

      const results = {};

      for (const item of pagesToTest) {
        console.log(`\n--- Testing ${item.name} (${item.route}) ---`);
        await send('Page.navigate', { url: `http://localhost:3000${item.route}` });
        await new Promise(r => setTimeout(r, 2000));

        // 1. Desktop 1440px
        await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
        await new Promise(r => setTimeout(r, 800));

        const deskAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const h1 = document.querySelector('h1');
            const h2 = document.querySelector('h2');
            const p = document.querySelector('p');
            const getFont = (el) => el ? window.getComputedStyle(el).fontFamily : 'none';
            const getFontSize = (el) => el ? window.getComputedStyle(el).fontSize : 'none';
            const getLineHeight = (el) => el ? window.getComputedStyle(el).lineHeight : 'none';
            return {
              titleText: h1 ? h1.innerText.replace(/\\s+/g, ' ').slice(0, 50) : (h2 ? h2.innerText.replace(/\\s+/g, ' ').slice(0, 50) : 'none'),
              titleFont: getFont(h1 || h2),
              titleSize: getFontSize(h1 || h2),
              titleLineHeight: getLineHeight(h1 || h2),
              bodyFont: getFont(p),
              bodySize: getFontSize(p),
              hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
            };
          })()`,
          returnByValue: true
        });

        console.log(`[Desktop 1440px]`, deskAudit.result.value);

        // Screenshot desktop top area
        const deskScreenshot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, `typography_${item.name}_1440.png`), Buffer.from(deskScreenshot.data, 'base64'));

        // 2. Mobile 390px
        await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
        await new Promise(r => setTimeout(r, 800));

        const mobAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const h1 = document.querySelector('h1');
            const h2 = document.querySelector('h2');
            const p = document.querySelector('p');
            return {
              hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
              scrollWidth: document.documentElement.scrollWidth,
              clientWidth: document.documentElement.clientWidth
            };
          })()`,
          returnByValue: true
        });

        console.log(`[Mobile 390px]`, mobAudit.result.value);

        // Screenshot mobile
        const mobScreenshot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, `typography_${item.name}_390.png`), Buffer.from(mobScreenshot.data, 'base64'));

        results[item.name] = { desktop: deskAudit.result.value, mobile: mobAudit.result.value };
      }

      console.log('\n========================================');
      console.log('ALL TYPOGRAPHY VISUAL QA CHECKS COMPLETE');
      console.log('========================================');

      ws.close();
      p.kill();
      try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
      process.exit(0);
    });
  });
}

runVisualQA();
