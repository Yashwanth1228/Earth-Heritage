const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function captureRemainingSections() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9661;
  const tempDir = path.join(os.tmpdir(), 'chrome_sections_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=390,844',
    'http://localhost:3000/'
  ]);
  await new Promise(r => setTimeout(r, 2500));

  http.get(`http://127.0.0.1:${port}/json/list`, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      try {
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
        await send('DOM.enable');

        await send('Emulation.setDeviceMetricsOverride', {
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true
        });

        await send('Page.navigate', { url: 'http://localhost:3000/' });
        await new Promise(r => setTimeout(r, 2000));

        // Pause animations
        await send('Runtime.evaluate', {
          expression: `(() => {
            const style = document.createElement('style');
            style.id = 'pause-anim';
            style.textContent = '* { animation-play-state: paused !important; }';
            document.head.appendChild(style);
          })()`
        });

        // 1. Scroll to HomeEvents
        await send('Runtime.evaluate', {
          expression: `(() => {
            const el = document.getElementById('community-events');
            if (el) el.scrollIntoView({ block: 'start' });
          })()`
        });
        await new Promise(r => setTimeout(r, 800));

        const eventsShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('scratch/inspect_mobile_events_centered.png', Buffer.from(eventsShot.data, 'base64'));
        console.log('Saved scratch/inspect_mobile_events_centered.png');

        // Check events card centering metrics
        const eventsInfo = await send('Runtime.evaluate', {
          expression: `(() => {
            const sec = document.getElementById('community-events');
            const track = sec ? sec.querySelector('.animate-marquee-stepped-ltr') : null;
            const cards = track ? Array.from(track.querySelectorAll('button')) : [];
            const screenCenter = window.innerWidth / 2;
            const cardMetrics = cards.map((c, i) => {
              const r = c.getBoundingClientRect();
              const cardCenter = r.left + r.width / 2;
              return {
                index: i,
                left: r.left,
                right: r.right,
                width: r.width,
                distFromCenter: Math.abs(cardCenter - screenCenter)
              };
            }).sort((a, b) => a.distFromCenter - b.distFromCenter)[0];

            return {
              windowWidth: window.innerWidth,
              bestCard: cardMetrics
            };
          })()`,
          returnByValue: true
        });
        console.log('=== EVENTS METRICS (390x844) ===');
        console.log(JSON.stringify(eventsInfo.result.value, null, 2));

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

captureRemainingSections();
