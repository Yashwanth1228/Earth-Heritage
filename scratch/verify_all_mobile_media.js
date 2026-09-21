const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function verifyAllMobileMedia() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9663;
  const tempDir = path.join(os.tmpdir(), 'chrome_verif_' + Date.now());
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
        await new Promise(r => setTimeout(r, 3500));

        // 1. Hero Check
        const heroData = await send('Runtime.evaluate', {
          expression: `(() => {
            const h = document.getElementById('hero');
            const rect = h ? h.getBoundingClientRect() : {};
            return {
              heroHeight: rect.height,
              viewportHeight: window.innerHeight,
              ratio: rect.height / window.innerHeight
            };
          })()`,
          returnByValue: true
        });
        console.log('1. HERO DATA:', heroData.result.value);

        const heroShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('scratch/final_verified_hero.png', Buffer.from(heroShot.data, 'base64'));

        // Pause animation for crisp inspection
        await send('Runtime.evaluate', {
          expression: `(() => {
            const style = document.createElement('style');
            style.textContent = '* { animation-play-state: paused !important; }';
            document.head.appendChild(style);
          })()`
        });

        // 2. Field Stories (Video & Estate Photography)
        await send('Runtime.evaluate', {
          expression: `(() => {
            const s = document.getElementById('field-stories');
            if (s) s.scrollIntoView({ block: 'center' });
          })()`
        });
        await new Promise(r => setTimeout(r, 1500));

        const storiesData = await send('Runtime.evaluate', {
          expression: `(() => {
            const sec = document.getElementById('field-stories');
            const vidCard = sec ? sec.querySelector('.group\\\\/video .aspect-\\\\[16\\\\/10\\\\]') : null;
            const imgCard = sec ? sec.querySelector('.group\\\\/image .aspect-\\\\[16\\\\/10\\\\]') : null;
            const vr = vidCard ? vidCard.getBoundingClientRect() : {};
            const ir = imgCard ? imgCard.getBoundingClientRect() : {};
            return {
              videoCardWidth: vr.width,
              videoCardHeight: vr.height,
              videoCardLeft: vr.left,
              imageCardWidth: ir.width,
              imageCardHeight: ir.height,
              imageCardLeft: ir.left
            };
          })()`,
          returnByValue: true
        });
        console.log('2. STORIES DATA:', storiesData.result.value);

        const storiesShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('scratch/final_verified_stories.png', Buffer.from(storiesShot.data, 'base64'));

        // 3. Community Events Marquee
        await send('Runtime.evaluate', {
          expression: `(() => {
            const ev = document.getElementById('community-events');
            if (ev) ev.scrollIntoView({ block: 'center' });
          })()`
        });
        await new Promise(r => setTimeout(r, 1500));

        const eventsData = await send('Runtime.evaluate', {
          expression: `(() => {
            const sec = document.getElementById('community-events');
            const evCard = sec ? sec.querySelector('.aspect-\\\\[16\\\\/10\\\\]') : null;
            const r = evCard ? evCard.getBoundingClientRect() : {};
            return {
              eventCardWidth: r.width,
              eventCardHeight: r.height,
              eventCardLeft: r.left
            };
          })()`,
          returnByValue: true
        });
        console.log('3. EVENTS DATA:', eventsData.result.value);

        const eventsShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('scratch/final_verified_events.png', Buffer.from(eventsShot.data, 'base64'));

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

verifyAllMobileMedia();
