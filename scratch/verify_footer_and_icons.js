const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function verify() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9679;
  const tempDir = path.join(os.tmpdir(), 'chrome_footer_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,900',
    'http://localhost:3000/'
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

      await new Promise(r => setTimeout(r, 3000));

      // Scroll to footer
      await send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });`
      });
      await new Promise(r => setTimeout(r, 1500));

      const footerInfo = await send('Runtime.evaluate', {
        expression: `(() => {
          const footer = document.querySelector('footer');
          const title = footer ? footer.querySelector('h2') : null;
          const subtitle = title ? title.nextElementSibling : null;
          return {
            titleText: title ? title.textContent.trim() : null,
            subtitleText: subtitle ? subtitle.textContent.trim() : null
          };
        })()`,
        returnByValue: true
      });
      console.log('FOOTER BRAND INFO:', footerInfo.result.value);

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('scratch/footer_verified.png', Buffer.from(shot.data, 'base64'));
      console.log('Saved scratch/footer_verified.png');
      p.kill();
      process.exit(0);
    });
  });
}
verify();
