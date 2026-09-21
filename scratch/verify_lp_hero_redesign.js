const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function verifyLpHeroRedesign() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9668;
  const tempDir = path.join(os.tmpdir(), 'chrome_lphero_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,900',
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

        console.log('====================================================');
        console.log('1. AUDITING /lp/managed-farmland ON DESKTOP (1440x900)');
        console.log('====================================================');

        await send('Emulation.setDeviceMetricsOverride', {
          width: 1440,
          height: 900,
          deviceScaleFactor: 2,
          mobile: false
        });

        await send('Page.navigate', { url: 'http://localhost:3000/lp/managed-farmland' });
        await new Promise(r => setTimeout(r, 3500));

        const desktopLpInfo = await send('Runtime.evaluate', {
          expression: `(() => {
            const hero = document.getElementById('hero');
            const hRect = hero ? hero.getBoundingClientRect() : null;
            const h1 = hero ? hero.querySelector('h1') : null;
            const h1Rect = h1 ? h1.getBoundingClientRect() : null;
            const h1Comp = h1 ? window.getComputedStyle(h1) : null;
            const subtext = hero ? hero.querySelector('p') : null;
            const scrollCue = hero ? hero.querySelector('a[aria-label*="Scroll"]') : null;
            const btns = hero ? Array.from(hero.querySelectorAll('a, button')).map(b => b.textContent.trim()) : [];
            const headerPill = document.querySelector('header > div');
            const headerComp = headerPill ? window.getComputedStyle(headerPill) : null;

            return {
              heroFound: !!hero,
              heroHeight: hRect ? hRect.height : null,
              windowHeight: window.innerHeight,
              heroHeightRatio: hRect ? (hRect.height / window.innerHeight).toFixed(2) : null,
              h1Text: h1 ? h1.textContent.replace(/\\s+/g, ' ').trim() : null,
              h1FontFamily: h1Comp ? h1Comp.fontFamily : null,
              h1Top: h1Rect ? h1Rect.top : null,
              h1Left: h1Rect ? h1Rect.left : null,
              isLowerLeft: h1Rect ? h1Rect.top > window.innerHeight * 0.35 && h1Rect.left < window.innerWidth * 0.35 : false,
              subtextContent: subtext ? subtext.textContent.trim() : null,
              buttons: btns.filter(t => t.length > 0),
              scrollCueFound: !!scrollCue,
              headerHiddenAtTop: headerComp ? headerComp.visibility === 'hidden' || headerComp.opacity === '0' : false,
              hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
            };
          })()`,
          returnByValue: true
        });
        console.log('DESKTOP LP HERO INFO:', JSON.stringify(desktopLpInfo.result.value, null, 2));

        const desktopShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('scratch/lp_hero_desktop_1440.png', Buffer.from(desktopShot.data, 'base64'));
        const artifactDir = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';
        fs.writeFileSync(path.join(artifactDir, 'lp_hero_desktop_1440.png'), Buffer.from(desktopShot.data, 'base64'));
        console.log('Saved lp_hero_desktop_1440.png to scratch and artifacts');

        // Test scroll navbar reveal on /lp/managed-farmland
        await send('Runtime.evaluate', {
          expression: `window.scrollTo({ top: 750, behavior: 'instant' });`
        });
        await new Promise(r => setTimeout(r, 1500));

        const scrolledLpInfo = await send('Runtime.evaluate', {
          expression: `(() => {
            const headerPill = document.querySelector('header > div');
            const headerComp = headerPill ? window.getComputedStyle(headerPill) : null;
            return {
              scrollY: window.scrollY,
              headerRevealedOnScroll: headerComp ? headerComp.visibility !== 'hidden' && headerComp.opacity === '1' : false
            };
          })()`,
          returnByValue: true
        });
        console.log('SCROLLED LP NAVBAR REVEAL:', scrolledLpInfo.result.value);

        console.log('\n====================================================');
        console.log('2. AUDITING /lp/managed-farmland ON MOBILE (390x844)');
        console.log('====================================================');

        await send('Emulation.setDeviceMetricsOverride', {
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true
        });

        await send('Page.navigate', { url: 'http://localhost:3000/lp/managed-farmland' });
        await new Promise(r => setTimeout(r, 3000));

        const mobileLpInfo = await send('Runtime.evaluate', {
          expression: `(() => {
            const hero = document.getElementById('hero');
            const hRect = hero ? hero.getBoundingClientRect() : null;
            const h1 = hero ? hero.querySelector('h1') : null;
            const h1Rect = h1 ? h1.getBoundingClientRect() : null;
            const mobileLogo = hero ? hero.querySelector('a[aria-label*="Earth Heritage"], a[href="/"]') : null;
            const mobileLogoRect = mobileLogo ? mobileLogo.getBoundingClientRect() : null;

            return {
              heroHeight: hRect ? hRect.height : null,
              windowHeight: window.innerHeight,
              heroRatio: hRect ? (hRect.height / window.innerHeight).toFixed(2) : null,
              h1Text: h1 ? h1.textContent.replace(/\\s+/g, ' ').trim() : null,
              h1Top: h1Rect ? h1Rect.top : null,
              h1Left: h1Rect ? h1Rect.left : null,
              mobileLogoFound: !!mobileLogo,
              mobileLogoTop: mobileLogoRect ? mobileLogoRect.top : null,
              mobileLogoLeft: mobileLogoRect ? mobileLogoRect.left : null,
              hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
            };
          })()`,
          returnByValue: true
        });
        console.log('MOBILE LP HERO INFO:', JSON.stringify(mobileLpInfo.result.value, null, 2));

        const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('scratch/lp_hero_mobile_390.png', Buffer.from(mobileShot.data, 'base64'));
        fs.writeFileSync(path.join(artifactDir, 'lp_hero_mobile_390.png'), Buffer.from(mobileShot.data, 'base64'));
        console.log('Saved lp_hero_mobile_390.png to scratch and artifacts');

        console.log('\n====================================================');
        console.log('3. AUDITING /lp/managed-farmland ON TABLET (768x1024)');
        console.log('====================================================');

        await send('Emulation.setDeviceMetricsOverride', {
          width: 768,
          height: 1024,
          deviceScaleFactor: 2,
          mobile: true
        });

        await send('Page.navigate', { url: 'http://localhost:3000/lp/managed-farmland' });
        await new Promise(r => setTimeout(r, 2500));

        const tabletShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('scratch/lp_hero_tablet_768.png', Buffer.from(tabletShot.data, 'base64'));
        fs.writeFileSync(path.join(artifactDir, 'lp_hero_tablet_768.png'), Buffer.from(tabletShot.data, 'base64'));
        console.log('Saved lp_hero_tablet_768.png to scratch and artifacts');

        console.log('\n====================================================');
        console.log('4. VERIFYING CORPORATE HOME HERO (/) IS 100% UNCHANGED');
        console.log('====================================================');

        await send('Emulation.setDeviceMetricsOverride', {
          width: 1440,
          height: 900,
          deviceScaleFactor: 2,
          mobile: false
        });

        await send('Page.navigate', { url: 'http://localhost:3000/' });
        await new Promise(r => setTimeout(r, 2500));

        const homeHeroInfo = await send('Runtime.evaluate', {
          expression: `(() => {
            const hero = document.getElementById('hero');
            const roleDesc = hero ? hero.getAttribute('aria-roledescription') : null;
            const isCarousel = roleDesc === 'carousel';
            const eyebrowBadge = hero ? hero.querySelector('.rounded-full') : null;
            const eyebrowText = eyebrowBadge ? eyebrowBadge.textContent.trim() : null;
            return {
              heroFound: !!hero,
              isCarousel,
              eyebrowText
            };
          })()`,
          returnByValue: true
        });
        console.log('HOME HERO VERIFICATION:', JSON.stringify(homeHeroInfo.result.value, null, 2));

        const homeShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('scratch/home_hero_preserved.png', Buffer.from(homeShot.data, 'base64'));
        fs.writeFileSync(path.join(artifactDir, 'home_hero_preserved.png'), Buffer.from(homeShot.data, 'base64'));
        console.log('Saved home_hero_preserved.png to scratch and artifacts');

        console.log('\n====================================================');
        console.log('5. VERIFYING /events AND /blogs REMAIN FUNCTIONAL');
        console.log('====================================================');

        await send('Page.navigate', { url: 'http://localhost:3000/events' });
        await new Promise(r => setTimeout(r, 2000));
        const eventsCheck = await send('Runtime.evaluate', {
          expression: `document.title && document.title.includes('Events')`,
          returnByValue: true
        });
        console.log('Route /events operational (title):', eventsCheck.result.value);

        await send('Page.navigate', { url: 'http://localhost:3000/blogs' });
        await new Promise(r => setTimeout(r, 2000));
        const blogsCheck = await send('Runtime.evaluate', {
          expression: `document.title && document.title.includes('Blog')`,
          returnByValue: true
        });
        console.log('Route /blogs operational (title):', blogsCheck.result.value);

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

verifyLpHeroRedesign();
