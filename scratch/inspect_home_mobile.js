const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function inspectHomeMobile() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9659;
  const tempDir = path.join(os.tmpdir(), 'chrome_mobinspect_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=390,844',
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
      await send('DOM.enable');

      await send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        mobile: true
      });

      await send('Page.navigate', { url: 'http://localhost:3000/' });
      await new Promise(r => setTimeout(r, 3000));

      // 1. Hero banner dimensions on mobile
      const heroInfo = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const hero = document.getElementById('hero');
            if (!hero) return null;
            const rect = hero.getBoundingClientRect();
            return {
              height: Math.round(rect.height),
              windowHeight: window.innerHeight,
              ratio: (rect.height / window.innerHeight).toFixed(2)
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Hero banner height on mobile:', heroInfo.result.value);

      // Screenshot of Hero
      const shotHero = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(__dirname, 'inspect_mobile_hero.png'), Buffer.from(shotHero.data, 'base64'));

      // 2. Inspect all sections on homepage
      const sections = await send('Runtime.evaluate', {
        expression: `
          (() => {
            return Array.from(document.querySelectorAll('section')).map(s => ({
              id: s.id,
              ariaLabel: s.getAttribute('aria-label'),
              height: s.offsetHeight,
              top: s.offsetTop
            }));
          })()
        `,
        returnByValue: true
      });
      console.log('Home sections:', sections.result.value);

      // Scroll to HomeStories ("Stories from the Ground" / Video and image rows)
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const stories = Array.from(document.querySelectorAll('section')).find(s => 
              s.innerText.includes('Stories from the Ground') || 
              s.innerText.includes('Video Chronicles')
            );
            if (stories) stories.scrollIntoView({ behavior: 'instant', block: 'start' });
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1000));

      // Inspect Video and Image rows in HomeStories
      const storiesInfo = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const videoRow = document.querySelector('.animate-marquee-stepped-ltr') || document.querySelector('.group\\/video');
            const imgRow = document.querySelector('.animate-marquee-stepped-rtl') || document.querySelector('.group\\/image');
            
            // Check card alignments and positioning
            const firstVideoCard = document.querySelector('.group\\/video .aspect-\\[16\\/10\\]') || document.querySelector('.group\\/video [class*="aspect"]');
            const firstImgCard = document.querySelector('.group\\/image .aspect-\\[16\\/10\\]') || document.querySelector('.group\\/image [class*="aspect"]');

            return {
              hasVideoRow: !!videoRow,
              hasImgRow: !!imgRow,
              firstVideoCardRect: firstVideoCard ? {
                left: Math.round(firstVideoCard.getBoundingClientRect().left),
                width: Math.round(firstVideoCard.getBoundingClientRect().width)
              } : null,
              firstImgCardRect: firstImgCard ? {
                left: Math.round(firstImgCard.getBoundingClientRect().left),
                width: Math.round(firstImgCard.getBoundingClientRect().width)
              } : null
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Stories info on mobile:', storiesInfo.result.value);

      const shotStories = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(__dirname, 'inspect_mobile_stories.png'), Buffer.from(shotStories.data, 'base64'));

      // Also check HomeAbout and HomeHowItWorks image/video placements
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const about = document.getElementById('about-overview');
            if (about) about.scrollIntoView({ behavior: 'instant', block: 'start' });
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1000));
      const shotAbout = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(__dirname, 'inspect_mobile_about.png'), Buffer.from(shotAbout.data, 'base64'));

      ws.close();
      p.kill();
      process.exit(0);
    });
  });
}

inspectHomeMobile().catch(console.error);
