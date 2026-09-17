const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');

async function test() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9442;
  const tempDir = os.tmpdir() + '/chrome_tmp_' + Date.now();
  fs.mkdirSync(tempDir, { recursive: true });
  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,1100',
    'http://localhost:3000/'
  ]);
  await new Promise(r => setTimeout(r, 2000));
  http.get('http://127.0.0.1:' + port + '/json/list', (res) => {
    let d = ''; res.on('data', c => d += c);
    res.on('end', async () => {
      const targets = JSON.parse(d);
      const page = targets.find(t => t.type === 'page');
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      let id = 1;
      const send = (m, params = {}) => new Promise(resolve => {
        const myId = id++;
        const h = (e) => {
          const msg = JSON.parse(e.data);
          if (msg.id === myId) { ws.removeEventListener('message', h); resolve(msg.result); }
        };
        ws.addEventListener('message', h);
        ws.send(JSON.stringify({ id: myId, method: m, params }));
      });
      await new Promise(r => ws.onopen = r);
      
      const inspectRes = await send('Runtime.evaluate', {
        expression: `(() => {
          const footer = document.querySelector('footer');
          const fRect = footer.getBoundingClientRect();
          const col1 = footer.querySelectorAll('.grid > div')[0];
          const pill = col1.querySelector('.pt-2');
          const pRect = pill.getBoundingClientRect();
          const grid = footer.querySelector('.grid');
          const gRect = grid.getBoundingClientRect();
          const notice = footer.querySelector('.rounded-xl');
          const nRect = notice.getBoundingClientRect();
          return {
            pill: {
              top: Math.round(pRect.top - fRect.top),
              bottom: Math.round(pRect.bottom - fRect.top),
              left: Math.round(pRect.left - fRect.left),
              right: Math.round(pRect.right - fRect.left)
            },
            gridBorderBottom: Math.round(gRect.bottom - fRect.top),
            noticeTop: Math.round(nRect.top - fRect.top)
          };
        })()`,
        returnByValue: true
      });
      console.log('Desktop Coordinates:', JSON.stringify(inspectRes.result.value, null, 2));

      // Mobile check
      await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
      await new Promise(r => setTimeout(r, 600));

      const mobRes = await send('Runtime.evaluate', {
        expression: `(() => {
          const footer = document.querySelector('footer');
          const fRect = footer.getBoundingClientRect();
          const copyRow = footer.querySelector('.border-t');
          const cRect = copyRow.getBoundingClientRect();
          const notice = footer.querySelector('.rounded-xl');
          const nRect = notice.getBoundingClientRect();
          return {
            noticeBottom: Math.round(nRect.bottom - fRect.top),
            copyRowTop: Math.round(cRect.top - fRect.top),
            copyRowBottom: Math.round(cRect.bottom - fRect.top),
            footerHeight: Math.round(fRect.height)
          };
        })()`,
        returnByValue: true
      });
      console.log('Mobile Coordinates:', JSON.stringify(mobRes.result.value, null, 2));

      ws.close();
      p.kill();
      try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
      process.exit(0);
    });
  });
}
test();
