const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function run() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9693;
  const tempDir = path.join(os.tmpdir(), 'chrome_events_v2_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,900',
    'http://localhost:3000/events'
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

      console.log('--- Capturing /events at 1440px Desktop ---');
      await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
      await new Promise(r => setTimeout(r, 1200));

      const shot1440_top = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'events_desktop_1440_top.png'), Buffer.from(shot1440_top.data, 'base64'));

      // Scroll slightly down to view the full card
      await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 350, behavior: "instant" })' });
      await new Promise(r => setTimeout(r, 600));
      const shot1440_card1 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'events_desktop_1440_card1.png'), Buffer.from(shot1440_card1.data, 'base64'));

      // Scroll to second card
      await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 950, behavior: "instant" })' });
      await new Promise(r => setTimeout(r, 600));
      const shot1440_card2 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'events_desktop_1440_card2.png'), Buffer.from(shot1440_card2.data, 'base64'));

      const ov1440 = await send('Runtime.evaluate', {
        expression: 'JSON.stringify({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth })',
        returnByValue: true
      });
      console.log('1440px Overflow check:', ov1440.result.value);

      // 2. Mobile 390px
      console.log('--- Capturing /events at 390px Mobile ---');
      await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
      await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 0, behavior: "instant" })' });
      await new Promise(r => setTimeout(r, 800));
      const shot390_top = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'events_mobile_390_top.png'), Buffer.from(shot390_top.data, 'base64'));

      await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 250, behavior: "instant" })' });
      await new Promise(r => setTimeout(r, 600));
      const shot390_card = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'events_mobile_390_card.png'), Buffer.from(shot390_card.data, 'base64'));

      const ov390 = await send('Runtime.evaluate', {
        expression: 'JSON.stringify({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth })',
        returnByValue: true
      });
      console.log('390px Overflow check:', ov390.result.value);

      p.kill();
      console.log('✔ All screenshots and overflow checks completed successfully!');
      process.exit(0);
    });
  });
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
