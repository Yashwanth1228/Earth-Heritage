const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function captureFooterFull() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9580;
  const tempDir = path.join(os.tmpdir(), 'chrome_footer_full_' + Date.now());
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

        // Scroll footer directly into view (start of footer at top of viewport)
        await send('Runtime.evaluate', {
          expression: `
            const footer = document.querySelector('footer');
            if (footer) {
              footer.scrollIntoView({ behavior: 'instant', block: 'start' });
            }
          `
        });
        await new Promise(r => setTimeout(r, 1200));

        // Let's capture the screenshot of the current viewport showing the footer from top down
        const shot1 = await send('Page.captureScreenshot', { format: 'png' });
        const shotPath1 = path.join(ARTIFACT_DIR, `footer_view_top.png`);
        fs.writeFileSync(shotPath1, Buffer.from(shot1.data, 'base64'));
        console.log(`Saved screenshot 1 to: ${shotPath1}`);

        // Now scroll footer so its bottom aligns with viewport bottom
        await send('Runtime.evaluate', {
          expression: `
            const footer = document.querySelector('footer');
            if (footer) {
              footer.scrollIntoView({ behavior: 'instant', block: 'end' });
            }
          `
        });
        await new Promise(r => setTimeout(r, 1200));

        const shot2 = await send('Page.captureScreenshot', { format: 'png' });
        const shotPath2 = path.join(ARTIFACT_DIR, `footer_view_bottom.png`);
        fs.writeFileSync(shotPath2, Buffer.from(shot2.data, 'base64'));
        console.log(`Saved screenshot 2 to: ${shotPath2}`);

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

captureFooterFull();
