const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_USER_DATA = path.join(os.tmpdir(), 'chrome_cdp_mobile_' + Date.now());

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(data); }
      });
    }).on('error', reject);
  });
}

async function main() {
  if (!fs.existsSync(TEMP_USER_DATA)) fs.mkdirSync(TEMP_USER_DATA, { recursive: true });

  // Launch Chrome at mobile viewport 375x700
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9288',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${TEMP_USER_DATA}`,
    '--window-size=375,720',
    'http://localhost:3000/'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 30; i++) {
      await sleep(300);
      try {
        const targets = await httpGet('http://127.0.0.1:9288/json/list');
        if (targets && targets.length > 0) {
          const pageTarget = targets.find(t => t.type === 'page');
          if (pageTarget) {
            target = pageTarget;
            break;
          }
        }
      } catch (e) {}
    }

    const ws = new globalThis.WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve, { once: true });
      ws.addEventListener('error', reject, { once: true });
    });

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === id) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await send('DOM.enable');

    // 1. Emulate Mobile Device Metrics (375x700, 2x dpr, mobile=true)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 700,
      deviceScaleFactor: 2,
      mobile: true
    });

    await sleep(2500);

    // Capture Mobile Hero Slide 1
    const heroShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'mobile_hero_slide1.png'), Buffer.from(heroShot.data, 'base64'));
    console.log('Captured mobile_hero_slide1.png');

    // Check title element bounds to ensure NO overflow
    const bounds = await send('Runtime.evaluate', {
      expression: `(() => {
        const h1 = document.querySelector('#hero h1');
        const lines = Array.from(h1 ? h1.querySelectorAll('span.block') : []);
        return {
          windowWidth: window.innerWidth,
          lines: lines.map(l => {
            const rect = l.getBoundingClientRect();
            return {
              text: l.innerText,
              left: rect.left,
              right: rect.right,
              width: rect.width,
              isOverflowing: rect.right > window.innerWidth
            };
          })
        };
      })()`,
      returnByValue: true
    });
    console.log('Mobile Hero Title Bounds:', JSON.stringify(bounds.result.value, null, 2));

    // 2. Test Mobile Menu Open and Check Floating Button Absence
    // First scroll down a bit so floating button would normally be visible
    await send('Runtime.evaluate', {
      expression: 'window.scrollTo(0, 800);'
    });
    await sleep(1500);

    // Open mobile menu by clicking hamburger button
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('button[aria-label="Open mobile navigation menu"]');
        if (btn) btn.click();
      })()`
    });
    await sleep(1000);

    const menuCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const floatingEnquiry = document.querySelector('[data-floating-action="enquiry"]');
        const floatingWhatsapp = document.querySelector('[data-floating-action="whatsapp"]');
        const drawer = document.querySelector('[role="dialog"][aria-label="Mobile Navigation"]');
        const drawerBottom = drawer ? drawer.querySelector('button') : null;
        return {
          drawerExists: !!drawer,
          floatingEnquiryFound: !!floatingEnquiry,
          floatingWhatsappFound: !!floatingWhatsapp,
          bodyAttribute: document.body.getAttribute('data-mobile-menu-open')
        };
      })()`,
      returnByValue: true
    });
    console.log('Mobile Menu & Floating Button State:', JSON.stringify(menuCheck.result.value, null, 2));

    const menuShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'mobile_menu_open.png'), Buffer.from(menuShot.data, 'base64'));
    console.log('Captured mobile_menu_open.png');

    // Close menu
    await send('Runtime.evaluate', {
      expression: `(() => {
        const closeBtn = document.querySelector('button[aria-label="Close menu"]');
        if (closeBtn) closeBtn.click();
      })()`
    });
    await sleep(800);

    // 3. Scroll to Footer to Check Legal Links on Mobile
    await send('Runtime.evaluate', {
      expression: 'document.querySelector("footer").scrollIntoView();'
    });
    await sleep(1500);

    const footerCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const termsLink = document.querySelector('footer a[href="/terms"]');
        const privacyLink = document.querySelector('footer a[href="/privacy-policy"]');
        if (!termsLink || !privacyLink) return null;
        const rectT = termsLink.getBoundingClientRect();
        const rectP = privacyLink.getBoundingClientRect();
        return {
          termsTop: rectT.top,
          privacyTop: rectP.top,
          isSameLine: Math.abs(rectT.top - rectP.top) < 8,
          termsText: termsLink.innerText,
          privacyText: privacyLink.innerText
        };
      })()`,
      returnByValue: true
    });
    console.log('Footer Legal Links Position Check:', JSON.stringify(footerCheck.result.value, null, 2));

    const footerShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'mobile_footer.png'), Buffer.from(footerShot.data, 'base64'));
    console.log('Captured mobile_footer.png');

    ws.close();
  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    chromeProc.kill();
    try { fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true }); } catch (e) {}
  }
}

main();
