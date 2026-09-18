const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function testImg() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9675;
  const tempDir = path.join(os.tmpdir(), 'chrome_img_test_' + Date.now());
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
      const targets = JSON.parse(d);
      const page = targets.find(t => t.type === 'page');
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      await new Promise(r => ws.addEventListener('open', r, { once: true }));

      let id = 1;
      const send = (method, params = {}) => new Promise(res => {
        const myId = id++;
        const h = (e) => {
          const msg = JSON.parse(e.data);
          if (msg.id === myId) {
            ws.removeEventListener('message', h);
            res(msg.result);
          }
        };
        ws.addEventListener('message', h);
        ws.send(JSON.stringify({ id: myId, method, params }));
      });

      await send('Page.enable');
      await send('Runtime.enable');

      // Wait 3 seconds for initial render
      await new Promise(r => setTimeout(r, 3000));

      const styles = await send('Runtime.evaluate', {
        expression: `(() => {
          const img = document.querySelector('#hero img');
          if (!img) return 'NO IMG FOUND';
          const cs = window.getComputedStyle(img);
          const p = img.parentElement;
          const pcs = window.getComputedStyle(p);
          return {
            imgSrc: img.currentSrc || img.src,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            complete: img.complete,
            display: cs.display,
            visibility: cs.visibility,
            opacity: cs.opacity,
            position: cs.position,
            zIndex: cs.zIndex,
            parentW: pcs.width,
            parentH: pcs.height,
            parentPos: pcs.position
          };
        })()`,
        returnByValue: true
      });

      console.log('STYLES:', JSON.stringify(styles.result.value, null, 2));

      // Take screenshot of the entire page
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'test_hero_screenshot.png'), Buffer.from(shot.data, 'base64'));

      ws.close();
      p.kill();
      process.exit(0);
    });
  });
}

testImg();
