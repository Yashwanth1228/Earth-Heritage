const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function captureBottom() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9560;
  const tempDir = path.join(os.tmpdir(), 'chrome_footer_exact_' + Date.now());
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
      try {
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

        await send('Page.navigate', { url: 'http://localhost:3000/' });
        await new Promise(r => setTimeout(r, 2500));

        await send('Runtime.evaluate', {
          expression: `
            const footer = document.querySelector('footer');
            if (footer) {
              footer.scrollIntoView({ block: 'end' });
            }
          `
        });
        await new Promise(r => setTimeout(r, 1200));

        const shot = await send('Page.captureScreenshot', { format: 'png' });
        const shotPath = path.join(ARTIFACT_DIR, `updated_footer_bottom_exact2.png`);
        fs.writeFileSync(shotPath, Buffer.from(shot.data, 'base64'));
        console.log(`Saved screenshot to: ${shotPath}`);

        ws.close();
        p.kill();
        process.exit(0);
      } catch (err) {
        console.error(err);
        p.kill();
        process.exit(1);
      }
    });
  });
}

captureBottom();
