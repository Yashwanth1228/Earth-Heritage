const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function check() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9673;
  const tempDir = path.join(os.tmpdir(), 'chrome_check_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,900',
    'http://localhost:3000/lp/managed-farmland'
  ]);
  await new Promise(r => setTimeout(r, 2500));

  http.get('http://127.0.0.1:' + port + '/json/list', res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      const targets = JSON.parse(data);
      const page = targets.find(t => t.type === 'page');
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      let id = 1;
      const send = (m, params = {}) => new Promise(res => {
        const myId = id++;
        const h = e => {
          const msg = JSON.parse(e.data);
          if (msg.id === myId) {
            ws.removeEventListener('message', h);
            res(msg.result);
          }
        };
        ws.addEventListener('message', h);
        ws.send(JSON.stringify({ id: myId, method: m, params }));
      });
      await new Promise(r => ws.onopen = r);
      await send('Page.enable');
      await send('DOM.enable');

      await new Promise(r => setTimeout(r, 4000));

      const info = await send('Runtime.evaluate', {
        expression: `(() => {
          const h1 = document.querySelector('h1');
          const p = h1 ? h1.parentElement : null;
          const hero = document.getElementById('hero');
          const heroOverlays = hero ? Array.from(hero.querySelectorAll('.absolute.inset-0')).map(el => ({
            className: el.className,
            zIndex: window.getComputedStyle(el).zIndex,
            bg: window.getComputedStyle(el).backgroundImage
          })) : [];

          return {
            h1Text: h1 ? h1.textContent : null,
            h1ParentOpacity: p ? window.getComputedStyle(p).opacity : null,
            h1ParentTransform: p ? window.getComputedStyle(p).transform : null,
            h1Color: h1 ? window.getComputedStyle(h1).color : null,
            h1Rect: h1 ? h1.getBoundingClientRect() : null,
            heroOverlays
          };
        })()`,
        returnByValue: true
      });
      console.log('H1 Diagnostic Info:', JSON.stringify(info.result.value, null, 2));

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('scratch/check_shot.png', Buffer.from(shot.data, 'base64'));
      p.kill();
      process.exit(0);
    });
  });
}
check();
