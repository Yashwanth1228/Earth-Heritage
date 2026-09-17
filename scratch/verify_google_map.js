const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const assert = require('assert');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = path.resolve('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c');

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

async function run() {
  console.log('======================================================');
  console.log('VERIFYING HOMEPAGE GOOGLE MAP LOCATION SECTION');
  console.log('======================================================');

  const tempUserData = path.join(os.tmpdir(), 'chrome_cdp_map_verify_' + Date.now());
  fs.mkdirSync(tempUserData, { recursive: true });
  const port = 9395;

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${tempUserData}`,
    '--window-size=1440,900',
    'http://localhost:3000/'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 30; i++) {
      await sleep(300);
      try {
        const targets = await httpGet(`http://127.0.0.1:${port}/json/list`);
        if (targets && targets.length > 0) {
          const pageTarget = targets.find(t => t.type === 'page');
          if (pageTarget) {
            target = pageTarget;
            break;
          }
        }
      } catch (e) {}
    }

    if (!target) throw new Error('Target not found');

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    let msgId = 1;
    const pending = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };

    await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });

    function send(method, params = {}) {
      const id = msgId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    async function evaluate(expression) {
      const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (res.exceptionDetails) {
        throw new Error(res.exceptionDetails.exception?.description || res.exceptionDetails.text);
      }
      return res.result?.value;
    }

    async function captureScreenshot(filepath, clip = null) {
      const params = { format: 'png' };
      if (clip) params.clip = clip;
      const res = await send('Page.captureScreenshot', params);
      fs.writeFileSync(filepath, Buffer.from(res.data, 'base64'));
      console.log('Saved screenshot:', filepath);
    }

    await send('Page.enable');
    await send('DOM.enable');
    await sleep(2000);

    // ==========================================
    // 1. VERIFY DOM STRUCTURE & PLACEMENT
    // ==========================================
    console.log('\n--- 1. AUDITING PLACEMENT & DOM INTEGRITY ---');
    const domAudit = await evaluate(`(() => {
      const locationSec = document.getElementById('location');
      const contactCta = document.getElementById('contact-cta');
      const founders = document.getElementById('founders');

      // Check order
      const allSections = Array.from(document.querySelectorAll('section'));
      const locIdx = allSections.indexOf(locationSec);
      const ctaIdx = allSections.indexOf(contactCta);
      const foundersIdx = allSections.indexOf(founders);

      // Check iframe
      const iframe = locationSec ? locationSec.querySelector('iframe') : null;
      const h2 = locationSec ? locationSec.querySelector('h2') : null;
      const eyebrow = locationSec ? locationSec.innerText.includes('FIND EARTH HERITAGE') : false;
      const companyName = locationSec ? locationSec.innerText.includes('Earth Heritage Private Limited') : false;

      // Check final CTA heading
      const ctaH2 = contactCta ? contactCta.querySelector('h2') : null;

      return {
        hasLocationSection: !!locationSec,
        hasContactCta: !!contactCta,
        hasFounders: !!founders,
        isDirectlyBeforeCta: locIdx !== -1 && ctaIdx !== -1 && (ctaIdx === locIdx + 1),
        isAfterFounders: locIdx !== -1 && foundersIdx !== -1 && (locIdx > foundersIdx),
        hasEyebrow: eyebrow,
        headingText: h2 ? h2.innerText : null,
        hasCompanyName: companyName,
        ctaHeadingText: ctaH2 ? ctaH2.innerText.replace(/\\n/g, ' ') : null,
        iframeSrc: iframe ? iframe.src : null,
        iframeTitle: iframe ? iframe.title : null,
        iframeLoading: iframe ? iframe.getAttribute('loading') : null,
        iframeReferrerPolicy: iframe ? iframe.getAttribute('referrerpolicy') : null,
        iframeAllowFullScreen: iframe ? iframe.hasAttribute('allowfullscreen') : false
      };
    })()`);

    console.log('DOM Audit Results:', JSON.stringify(domAudit, null, 2));

    assert(domAudit.hasLocationSection, 'Location section #location must exist');
    assert(domAudit.hasContactCta, 'Final CTA section #contact-cta must exist');
    assert(domAudit.isDirectlyBeforeCta, 'Google Map must appear IMMEDIATELY ABOVE "Have farmland that deserves to be cared for?"');
    assert(domAudit.hasEyebrow, 'Must contain "FIND EARTH HERITAGE" eyebrow');
    assert.strictEqual(domAudit.headingText, 'Come closer to where it begins.', 'Heading must be "Come closer to where it begins."');
    assert(domAudit.hasCompanyName, 'Must display "Earth Heritage Private Limited"');
    assert(domAudit.ctaHeadingText.includes('Have farmland that deserves to be cared for?'), 'Final CTA heading must be preserved');

    const expectedIframeUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0269684361006!2d77.49423207358898!3d12.970126114913551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d56f1c4cc8d%3A0x3806e5fa4984ee8!2sEarth%20Heritage%20Private%20Limited!5e0!3m2!1sen!2sin!4v1789637384205!5m2!1sen!2sin';
    assert.strictEqual(domAudit.iframeSrc, expectedIframeUrl, 'Google Maps embed URL must strictly match');
    assert.strictEqual(domAudit.iframeTitle, 'Earth Heritage Private Limited location on Google Maps', 'Must have accessible title');
    assert.strictEqual(domAudit.iframeLoading, 'lazy', 'Must have loading="lazy"');
    assert.strictEqual(domAudit.iframeReferrerPolicy, 'strict-origin-when-cross-origin', 'Must have referrerpolicy="strict-origin-when-cross-origin"');
    assert(domAudit.iframeAllowFullScreen, 'Must have allowfullscreen');

    // ==========================================
    // 2. DESKTOP 1440px AUDIT & SCREENSHOT
    // ==========================================
    console.log('\n--- 2. DESKTOP 1440x900 VERIFICATION ---');
    await evaluate(`(() => {
      const loc = document.getElementById('location');
      if (loc) loc.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`);
    await sleep(1000);

    const desktopStats = await evaluate(`(() => {
      const loc = document.getElementById('location');
      const rect = loc ? loc.getBoundingClientRect() : null;
      const iframe = loc ? loc.querySelector('iframe') : null;
      const iframeRect = iframe ? iframe.getBoundingClientRect() : null;
      const scrollWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;

      return {
        sectionHeight: rect ? rect.height : null,
        iframeWidth: iframeRect ? iframeRect.width : null,
        iframeHeight: iframeRect ? iframeRect.height : null,
        hasHorizontalOverflow: scrollWidth > clientWidth
      };
    })()`);

    console.log('Desktop Stats:', JSON.stringify(desktopStats, null, 2));
    assert(!desktopStats.hasHorizontalOverflow, 'Zero horizontal overflow on desktop');
    assert(desktopStats.iframeHeight >= 450 && desktopStats.iframeHeight <= 520, 'Desktop iframe height must be around 450-520px');

    await captureScreenshot(path.join(ARTIFACT_DIR, 'location_map_desktop_1440.png'));

    // Capture transition from Location Map down into Final CTA
    await evaluate(`(() => {
      const cta = document.getElementById('contact-cta');
      if (cta) cta.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`);
    await sleep(800);
    await captureScreenshot(path.join(ARTIFACT_DIR, 'location_map_to_final_cta.png'));

    // ==========================================
    // 3. MOBILE 390x844 AUDIT & SCREENSHOT
    // ==========================================
    console.log('\n--- 3. MOBILE 390x844 VERIFICATION ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(800);

    await evaluate(`(() => {
      const loc = document.getElementById('location');
      if (loc) loc.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`);
    await sleep(800);

    const mobileStats = await evaluate(`(() => {
      const loc = document.getElementById('location');
      const iframe = loc ? loc.querySelector('iframe') : null;
      const iframeRect = iframe ? iframe.getBoundingClientRect() : null;
      const scrollWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;

      return {
        iframeWidth: iframeRect ? iframeRect.width : null,
        iframeHeight: iframeRect ? iframeRect.height : null,
        scrollWidth,
        clientWidth,
        hasHorizontalOverflow: scrollWidth > clientWidth
      };
    })()`);

    console.log('Mobile Stats:', JSON.stringify(mobileStats, null, 2));
    assert(!mobileStats.hasHorizontalOverflow, 'Zero horizontal overflow on mobile');
    assert(mobileStats.iframeHeight >= 320 && mobileStats.iframeHeight <= 380, 'Mobile iframe height must be approximately 320-380px');

    await captureScreenshot(path.join(ARTIFACT_DIR, 'location_map_mobile_390.png'));

    // ==========================================
    // 4. VERIFY FINAL CTA STILL WORKS
    // ==========================================
    console.log('\n--- 4. VERIFYING FINAL CTA INTERACTIVITY ---');
    const ctaClickResult = await evaluate(`(() => {
      const ctaButton = document.querySelector('#contact-cta button');
      if (!ctaButton) return { error: 'CTA button not found' };
      ctaButton.click();
      const modal = document.querySelector('[role="dialog"]') || document.querySelector('.fixed.inset-0');
      return {
        clicked: true,
        modalOpened: !!modal
      };
    })()`);

    console.log('Final CTA Click Result:', JSON.stringify(ctaClickResult, null, 2));
    assert(ctaClickResult.clicked, 'Final CTA button should be clickable');

    console.log('\n======================================================');
    console.log('✔ ALL GOOGLE MAP & PLACEMENT VERIFICATIONS PASSED!');
    console.log('======================================================');

    ws.close();
  } catch (err) {
    console.error('Audit failed with error:', err);
    process.exitCode = 1;
  } finally {
    try { chromeProc.kill(); } catch (e) {}
    try { fs.rmSync(tempUserData, { recursive: true, force: true }); } catch (e) {}
  }
}

run();
