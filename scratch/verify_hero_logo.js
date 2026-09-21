const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function verifyHeroLogo() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9667;
  const tempDir = path.join(os.tmpdir(), 'chrome_logo_' + Date.now());
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
        await new Promise(r => setTimeout(r, 3000));

        // 1. Initial State (scrollY = 0)
        const initialInfo = await send('Runtime.evaluate', {
          expression: `(() => {
            const heroLogo = document.querySelector('#hero a[aria-label*="Earth Heritage"], #hero a[href="/"]');
            const heroLogoRect = heroLogo ? heroLogo.getBoundingClientRect() : null;
            const header = document.querySelector('header');
            const headerComp = header ? window.getComputedStyle(header) : null;
            const headerPill = header ? header.querySelector('div') : null;
            const headerPillComp = headerPill ? window.getComputedStyle(headerPill) : null;

            return {
              scrollY: window.scrollY,
              heroLogoFound: !!heroLogo,
              heroLogoRect: heroLogoRect ? {
                top: heroLogoRect.top,
                left: heroLogoRect.left,
                width: heroLogoRect.width,
                height: heroLogoRect.height
              } : null,
              headerVisible: headerPillComp ? headerPillComp.visibility !== 'hidden' && headerPillComp.opacity !== '0' : false,
              headerOpacity: headerPillComp ? headerPillComp.opacity : null
            };
          })()`,
          returnByValue: true
        });
        console.log('=== 1. INITIAL HERO STATE (scrollY = 0) ===');
        console.log(JSON.stringify(initialInfo.result.value, null, 2));

        const shot1 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('scratch/hero_top_logo_initial.png', Buffer.from(shot1.data, 'base64'));
        console.log('Saved scratch/hero_top_logo_initial.png');

        // 2. Scrolled State (scrollY = 600px - past hero)
        await send('Runtime.evaluate', {
          expression: `window.scrollTo({ top: 650, behavior: 'instant' });`
        });
        await new Promise(r => setTimeout(r, 1500));

        const scrolledInfo = await send('Runtime.evaluate', {
          expression: `(() => {
            const heroLogo = document.querySelector('#hero a[aria-label*="Earth Heritage"], #hero a[href="/"]');
            const heroLogoRect = heroLogo ? heroLogo.getBoundingClientRect() : null;
            const header = document.querySelector('header');
            const headerPill = header ? header.querySelector('div') : null;
            const headerPillComp = headerPill ? window.getComputedStyle(headerPill) : null;
            const navbarLogo = header ? header.querySelector('a[aria-label*="Earth Heritage"], a[href="/"]') : null;
            const navbarLogoRect = navbarLogo ? navbarLogo.getBoundingClientRect() : null;

            return {
              scrollY: window.scrollY,
              heroLogoRectTop: heroLogoRect ? heroLogoRect.top : null,
              heroLogoOffScreen: heroLogoRect ? heroLogoRect.bottom < 0 : true,
              headerVisible: headerPillComp ? headerPillComp.visibility !== 'hidden' && headerPillComp.opacity !== '0' : false,
              headerOpacity: headerPillComp ? headerPillComp.opacity : null,
              navbarLogoVisible: !!navbarLogoRect && navbarLogoRect.top >= 0
            };
          })()`,
          returnByValue: true
        });
        console.log('=== 2. SCROLLED STATE (scrollY = 650) ===');
        console.log(JSON.stringify(scrolledInfo.result.value, null, 2));

        const shot2 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('scratch/hero_scrolled_navbar_logo.png', Buffer.from(shot2.data, 'base64'));
        console.log('Saved scratch/hero_scrolled_navbar_logo.png');

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

verifyHeroLogo();
