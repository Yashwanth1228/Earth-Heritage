const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');

async function test() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9670;
  const tempDir = path.join(os.tmpdir(), 'chrome_dom_' + Date.now());
  require('fs').mkdirSync(tempDir, { recursive: true });
  const p = spawn(CHROME_PATH, ['--headless=new', '--remote-debugging-port=' + port, '--user-data-dir=' + tempDir, 'http://localhost:3000/']);
  await new Promise(r => setTimeout(r, 2500));

  http.get('http://127.0.0.1:' + port + '/json/list', (res) => {
    let d = ''; res.on('data', c => d += c);
    res.on('end', async () => {
      const targets = JSON.parse(d);
      const page = targets.find(t => t.type === 'page');
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      await new Promise(r => ws.addEventListener('open', r, { once: true }));
      let id = 1;
      const send = (m, params = {}) => new Promise(res => {
        const myId = id++;
        const h = (e) => {
          const msg = JSON.parse(e.data);
          if (msg.id === myId) { ws.removeEventListener('message', h); res(msg.result); }
        };
        ws.addEventListener('message', h);
        ws.send(JSON.stringify({ id: myId, method: m, params }));
      });
      await send('Runtime.enable');
      const info = await send('Runtime.evaluate', {
        expression: `(() => {
          const img = document.querySelector('#hero img');
          const p = img ? img.parentElement : null;
          const col = p ? p.parentElement : null;
          const r = img ? img.getBoundingClientRect() : {};
          const pr = p ? p.getBoundingClientRect() : {};
          const cr = col ? col.getBoundingClientRect() : {};
          return {
            imgSrc: img ? img.src : null,
            imgW: r.width,
            imgH: r.height,
            pW: pr.width,
            pH: pr.height,
            colW: cr.width,
            colH: cr.height,
            naturalW: img ? img.naturalWidth : null,
            naturalH: img ? img.naturalHeight : null
          };
        })()`,
        returnByValue: true
      });
      console.log('DOM INFO:', JSON.stringify(info.result.value, null, 2));
      ws.close(); p.kill(); process.exit(0);
    });
  });
}
test();
