const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function testScroll() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9625;
  const tempDir = path.join(os.tmpdir(), 'chrome_scrolldebug_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    'http://localhost:3000/'
  ]);
  await new Promise(r => setTimeout(r, 2000));

  http.get(`http://127.0.0.1:${port}/json/list`, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      const targets = JSON.parse(data);
      const page = targets.find(t => t.type === 'page');
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      let id = 1;
      const send = (method, params = {}) => new Promise(resolve => {
        const myId = id++;
        const handler = e => {
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
      await send('Page.navigate', { url: 'http://localhost:3000/' });
      await new Promise(r => setTimeout(r, 2500));

      const debug = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const sections = [
              'home-hero',
              'brand-intro',
              'core-model',
              'managed-farmland-offering',
              'our-approach',
              'land-to-legacy',
              'founders-story',
              'home-cta'
            ];
            return sections.map(id => {
              const el = document.getElementById(id);
              return {
                id,
                offsetTop: el ? el.offsetTop : null,
                rectTop: el ? el.getBoundingClientRect().top : null
              };
            });
          })()
        `,
        returnByValue: true
      });
      console.log('Sections offsets:', debug.result.value);

      // Now scroll to 1000
      await send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: 950, behavior: 'instant' });`
      });
      await new Promise(r => setTimeout(r, 500));
      const sY = await send('Runtime.evaluate', {
        expression: 'window.scrollY',
        returnByValue: true
      });
      console.log('ScrollY after scrollTo 950:', sY.result.value);

      ws.close();
      p.kill();
      process.exit(0);
    });
  });
}
testScroll();
