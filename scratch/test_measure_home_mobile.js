const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function testMobileMeasurements() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9660;
  const tempDir = path.join(os.tmpdir(), 'chrome_measure_' + Date.now());
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

        // 1. Measure Hero Section
        const heroInfo = await send('Runtime.evaluate', {
          expression: `(() => {
            const hero = document.getElementById('hero');
            const rect = hero ? hero.getBoundingClientRect() : null;
            const title = hero ? hero.querySelector('h1, h2') : null;
            const titleRect = title ? title.getBoundingClientRect() : null;
            const buttons = hero ? Array.from(hero.querySelectorAll('a, button')).filter(el => el.textContent.includes('HOW IT WORKS') || el.textContent.includes('TALK TO US') || el.textContent.includes('Talk to Us') || el.textContent.includes('How It Works')) : [];
            const btnInfos = buttons.map(b => {
              const r = b.getBoundingClientRect();
              return { text: b.textContent.trim(), top: r.top, left: r.left, width: r.width, height: r.height };
            });
            const scrollInd = hero ? hero.querySelector('a[aria-label="Scroll to explore"]') : null;
            const scrollRect = scrollInd ? scrollInd.getBoundingClientRect() : null;

            return {
              windowInnerHeight: window.innerHeight,
              windowInnerWidth: window.innerWidth,
              heroHeight: rect ? rect.height : null,
              titleTop: titleRect ? titleRect.top : null,
              buttons: btnInfos,
              buttonsSideBySide: btnInfos.length >= 2 ? Math.abs(btnInfos[0].top - btnInfos[1].top) < 10 : false,
              scrollIndicatorBottom: scrollRect ? window.innerHeight - scrollRect.bottom : null
            };
          })()`,
          returnByValue: true
        });
        console.log('=== HERO METRICS (390x844) ===');
        console.log(JSON.stringify(heroInfo.result.value, null, 2));

        // Take hero screenshot
        const heroShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('scratch/inspect_mobile_hero_compact.png', Buffer.from(heroShot.data, 'base64'));
        console.log('Saved scratch/inspect_mobile_hero_compact.png');

        // 2. Measure Stories Section (Video & Images)
        // Pause animations to measure steady state
        await send('Runtime.evaluate', {
          expression: `(() => {
            const style = document.createElement('style');
            style.id = 'pause-anim';
            style.textContent = '* { animation-play-state: paused !important; }';
            document.head.appendChild(style);
          })()`
        });

        // Scroll into stories
        await send('Runtime.evaluate', {
          expression: `(() => {
            const s = document.getElementById('field-stories');
            if (s) s.scrollIntoView({ block: 'start' });
          })()`
        });
        await new Promise(r => setTimeout(r, 1000));

        const storiesInfo = await send('Runtime.evaluate', {
          expression: `(() => {
            const section = document.getElementById('field-stories');
            const videoTrack = section ? section.querySelector('.group\\\\/video .animate-marquee-stepped-ltr') : null;
            const videoCards = videoTrack ? Array.from(videoTrack.querySelectorAll('.aspect-\\\\[16\\\\/10\\\\]')) : [];
            const imageTrack = section ? section.querySelector('.group\\\\/image .animate-marquee-stepped-rtl') : null;
            const imageCards = imageTrack ? Array.from(imageTrack.querySelectorAll('.aspect-\\\\[16\\\\/10\\\\]')) : [];

            // Find the most visible card in videoCards and imageCards
            const getCenteredness = (cards) => {
              const screenCenter = window.innerWidth / 2;
              return cards.map((c, i) => {
                const r = c.getBoundingClientRect();
                const cardCenter = r.left + r.width / 2;
                const distFromCenter = Math.abs(cardCenter - screenCenter);
                return {
                  index: i,
                  left: r.left,
                  right: r.right,
                  width: r.width,
                  cardCenter,
                  screenCenter,
                  distFromCenter
                };
              }).sort((a, b) => a.distFromCenter - b.distFromCenter)[0];
            };

            const bestVideo = getCenteredness(videoCards);
            const bestImage = getCenteredness(imageCards);

            // Also check first card directly
            const firstVideo = videoCards[0] ? videoCards[0].getBoundingClientRect() : null;
            const firstImage = imageCards[0] ? imageCards[0].getBoundingClientRect() : null;

            return {
              windowWidth: window.innerWidth,
              bestVideo,
              bestImage,
              firstVideo: firstVideo ? { left: firstVideo.left, width: firstVideo.width, right: firstVideo.right } : null,
              firstImage: firstImage ? { left: firstImage.left, width: firstImage.width, right: firstImage.right } : null
            };
          })()`,
          returnByValue: true
        });
        console.log('=== STORIES METRICS (390x844) ===');
        console.log(JSON.stringify(storiesInfo.result.value, null, 2));

        // Take stories screenshot
        const storiesShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('scratch/inspect_mobile_stories_centered.png', Buffer.from(storiesShot.data, 'base64'));
        console.log('Saved scratch/inspect_mobile_stories_centered.png');

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

testMobileMeasurements();
