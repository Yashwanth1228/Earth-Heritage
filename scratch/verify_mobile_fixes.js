const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function verifyMobileFixes() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9657;
  const tempDir = path.join(os.tmpdir(), 'chrome_mobverify_' + Date.now());
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

      console.log('=== 1. TESTING MOBILE MENU SCROLL LOCK & DESIGN ===');
      await send('Page.navigate', { url: 'http://localhost:3000/about' });
      await new Promise(r => setTimeout(r, 2000));

      const initialScrollY = await send('Runtime.evaluate', {
        expression: 'window.scrollY',
        returnByValue: true
      });
      console.log('Initial scrollY before menu open:', initialScrollY.result.value);

      // Open mobile menu
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const btn = document.querySelector('header button[aria-label*="mobile" i], header button[aria-label*="Open mobile" i]');
            if (btn) btn.click();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 600));

      // Check lock state & drawer design elements
      const menuState = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const dialog = document.querySelector('div[role="dialog"][aria-label="Mobile Navigation"]');
            const drawer = dialog ? dialog.querySelector('[data-lenis-prevent="true"]') : null;
            const scrollableArea = drawer ? drawer.querySelector('.overflow-y-auto') : null;
            const contours = drawer ? drawer.querySelector('svg') : null;
            const socialLinks = drawer ? drawer.querySelectorAll('a[aria-label*="Instagram" i], a[aria-label*="LinkedIn" i]') : [];
            const talkToUs = drawer ? drawer.querySelector('button') : null;
            const navLinks = drawer ? drawer.querySelectorAll('nav a') : [];

            return {
              dialogOpen: !!dialog,
              bodyOverflow: document.body.style.overflow,
              htmlOverflow: document.documentElement.style.overflow,
              lenisStoppedClass: document.documentElement.classList.contains('lenis-stopped'),
              lenisIsStopped: window.__lenis ? window.__lenis.isStopped : null,
              hasDrawer: !!drawer,
              hasLenisPrevent: drawer ? drawer.getAttribute('data-lenis-prevent') === 'true' : false,
              hasScrollableArea: !!scrollableArea,
              scrollableOverscroll: scrollableArea ? window.getComputedStyle(scrollableArea).overscrollBehaviorY : null,
              hasContourPattern: !!contours,
              navLinksCount: navLinks.length,
              socialLinksCount: socialLinks.length
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Menu state:', menuState.result.value);

      // Test scroll inside the mobile menu drawer
      const drawerScrollTest = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const scrollableArea = document.querySelector('div[role="dialog"] .overflow-y-auto');
            if (!scrollableArea) return { error: 'No scrollable area' };
            const beforeScroll = scrollableArea.scrollTop;
            scrollableArea.scrollTop = 120;
            const afterScroll = scrollableArea.scrollTop;
            return {
              beforeScroll,
              afterScroll,
              windowScrollY: window.scrollY
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Drawer scroll test (scroll within drawer without moving window):', drawerScrollTest.result.value);

      // Capture Mobile Menu Redesign Screenshot
      const screenshot1 = await send('Page.captureScreenshot', { format: 'png' });
      const shot1Path = path.join(__dirname, 'mobile_menu_redesign.png');
      fs.writeFileSync(shot1Path, Buffer.from(screenshot1.data, 'base64'));
      console.log('Saved mobile menu redesign screenshot to:', shot1Path);

      // Close menu
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const closeBtn = document.querySelector('button[aria-label*="Close navigation" i]');
            if (closeBtn) closeBtn.click();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 500));

      const afterCloseState = await send('Runtime.evaluate', {
        expression: `
          (() => {
            return {
              bodyOverflow: document.body.style.overflow,
              lenisIsStopped: window.__lenis ? window.__lenis.isStopped : null,
              scrollY: window.scrollY
            };
          })()
        `,
        returnByValue: true
      });
      console.log('After close state (restored):', afterCloseState.result.value);

      console.log('\n=== 2. TESTING EVENTS PAGE MOBILE CARD ORDER ===');
      await send('Page.navigate', { url: 'http://localhost:3000/events' });
      await new Promise(r => setTimeout(r, 2000));

      // Measure image vs details top position on mobile
      const eventOrder = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const firstArticle = document.querySelector('#events-list article');
            if (!firstArticle) return { error: 'No event article found' };
            
            const imageWrapper = firstArticle.querySelector('.order-1');
            const narrativeWrapper = firstArticle.querySelector('.order-2');
            
            if (!imageWrapper || !narrativeWrapper) {
              return { error: 'Order classes not found', hasImg: !!imageWrapper, hasNarrative: !!narrativeWrapper };
            }
            
            const imgRect = imageWrapper.getBoundingClientRect();
            const narrativeRect = narrativeWrapper.getBoundingClientRect();
            
            return {
              imageTop: Math.round(imgRect.top),
              imageBottom: Math.round(imgRect.bottom),
              narrativeTop: Math.round(narrativeRect.top),
              narrativeBottom: Math.round(narrativeRect.bottom),
              isImageFirst: imgRect.top < narrativeRect.top
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Event card mobile ordering analysis:', eventOrder.result.value);

      // Scroll to event card and capture screenshot
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const article = document.querySelector('#events-list article');
            if (article) article.scrollIntoView({ behavior: 'instant', block: 'start' });
          })()
        `
      });
      await new Promise(r => setTimeout(r, 600));

      const screenshot2 = await send('Page.captureScreenshot', { format: 'png' });
      const shot2Path = path.join(__dirname, 'events_mobile_card_order.png');
      fs.writeFileSync(shot2Path, Buffer.from(screenshot2.data, 'base64'));
      console.log('Saved events mobile card order screenshot to:', shot2Path);

      ws.close();
      p.kill();
      process.exit(0);
    });
  });
}

verifyMobileFixes().catch(err => {
  console.error(err);
  process.exit(1);
});
