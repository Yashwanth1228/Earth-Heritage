const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');

async function measure() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9425;
  const tempDir = os.tmpdir() + '/chrome_measure_' + Date.now();
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
    let d = '';
    res.on('data', c => d += c);
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

      const res = await send('Runtime.evaluate', {
        expression: `(() => {
          const footer = document.querySelector("footer");
          const fRect = footer.getBoundingClientRect();
          const getRel = (el) => {
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return {
              top: Math.round(r.top - fRect.top),
              bottom: Math.round(r.bottom - fRect.top),
              left: Math.round(r.left - fRect.left),
              right: Math.round(r.right - fRect.left),
              width: Math.round(r.width),
              height: Math.round(r.height)
            };
          };
          const banner = getRel(footer.querySelector(".border-b"));
          const gridDivs = footer.querySelectorAll(".grid > div");
          const col1 = getRel(gridDivs[0]);
          const col2 = getRel(gridDivs[1]);
          const col3 = getRel(gridDivs[2]);
          const col4 = getRel(gridDivs[3]);
          const noticeBox = getRel(footer.querySelector(".rounded-xl"));
          const copyRow = getRel(footer.querySelector(".border-t"));
          return {
            footer: { width: Math.round(fRect.width), height: Math.round(fRect.height) },
            banner, col1, col2, col3, col4, noticeBox, copyRow
          };
        })()`,
        returnByValue: true
      });
      console.log('DESKTOP MEASUREMENTS:\n', JSON.stringify(res.result.value, null, 2));

      // Mobile
      await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
      await new Promise(r => setTimeout(r, 800));
      const resMob = await send('Runtime.evaluate', {
        expression: `(() => {
          const footer = document.querySelector("footer");
          const fRect = footer.getBoundingClientRect();
          const getRel = (el) => {
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return {
              top: Math.round(r.top - fRect.top),
              bottom: Math.round(r.bottom - fRect.top),
              left: Math.round(r.left - fRect.left),
              right: Math.round(r.right - fRect.left),
              width: Math.round(r.width),
              height: Math.round(r.height)
            };
          };
          const banner = getRel(footer.querySelector(".border-b"));
          const gridDivs = footer.querySelectorAll(".grid > div");
          const col1 = getRel(gridDivs[0]);
          const col2 = getRel(gridDivs[1]);
          const col3 = getRel(gridDivs[2]);
          const col4 = getRel(gridDivs[3]);
          const noticeBox = getRel(footer.querySelector(".rounded-xl"));
          const copyRow = getRel(footer.querySelector(".border-t"));
          return {
            footer: { width: Math.round(fRect.width), height: Math.round(fRect.height) },
            banner, col1, col2, col3, col4, noticeBox, copyRow
          };
        })()`,
        returnByValue: true
      });
      console.log('MOBILE MEASUREMENTS:\n', JSON.stringify(resMob.result.value, null, 2));

      ws.close();
      p.kill();
      try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
      process.exit(0);
    });
  });
}
measure();
