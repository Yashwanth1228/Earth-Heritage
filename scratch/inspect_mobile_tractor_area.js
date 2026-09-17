const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');

async function test() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9431;
  const tempDir = os.tmpdir() + '/chrome_tmp_' + Date.now();
  fs.mkdirSync(tempDir, { recursive: true });
  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=390,844',
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
      await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
      await new Promise(r => setTimeout(r, 500));
      
      const inspectRes = await send('Runtime.evaluate', {
        expression: `(() => {
          const footer = document.querySelector('footer');
          const fRect = footer.getBoundingClientRect();
          const els = Array.from(footer.querySelectorAll('*')).map(el => {
            const r = el.getBoundingClientRect();
            const relY = Math.round(r.top - fRect.top);
            const relBottom = Math.round(r.bottom - fRect.top);
            const style = window.getComputedStyle(el);
            return {
              tag: el.tagName,
              className: el.className ? el.className.toString().slice(0, 50) : '',
              relY,
              relBottom,
              text: el.children.length === 0 ? el.textContent.trim().slice(0, 30) : '',
              borderTop: style.borderTop,
              borderBottom: style.borderBottom
            };
          }).filter(e => e.relY >= 1200 && e.relY <= 1350);
          return els;
        })()`,
        returnByValue: true
      });
      console.log('Elements around 1200-1350:', JSON.stringify(inspectRes.result.value, null, 2));
      ws.close();
      p.kill();
      try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
      process.exit(0);
    });
  });
}
test();
