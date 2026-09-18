const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function testModal() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9665;
  const tempDir = path.join(os.tmpdir(), 'chrome_modal_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,900',
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

      // Click "Talk to Us" button in hero
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const heroBtns = Array.from(document.querySelectorAll('#home-hero button'));
            const talkBtn = heroBtns.find(b => b.textContent.includes('Talk to Us'));
            if (talkBtn) talkBtn.click();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 600));

      const modalState = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const modal = document.querySelector('div[role="dialog"]');
            return {
              modalFound: !!modal,
              modalTitle: modal?.querySelector('h2, h3')?.textContent?.trim(),
              formPresent: !!modal?.querySelector('form')
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Modal State after hero Talk to Us click:', modalState.result.value);

      ws.close();
      p.kill();
      process.exit(0);
    });
  });
}
testModal();
