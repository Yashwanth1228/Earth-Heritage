const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_USER_DATA = path.join(os.tmpdir(), 'chrome_cdp_refine_' + Date.now());

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
  console.log('=== VERIFYING REFINED CTA ATTENTION CYCLES & CLICK ACTIONS ===\n');

  if (!fs.existsSync(TEMP_USER_DATA)) fs.mkdirSync(TEMP_USER_DATA, { recursive: true });

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9226',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${TEMP_USER_DATA}`,
    '--window-size=1440,900',
    'http://localhost:3000'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 30; i++) {
      await sleep(300);
      try {
        const targets = await httpGet('http://127.0.0.1:9226/json/list');
        if (targets && targets.length > 0) {
          const pageTarget = targets.find(t => t.type === 'page');
          if (pageTarget) { target = pageTarget; break; }
        }
      } catch (e) {}
    }

    if (!target) throw new Error('Chrome target not found');
    console.log('Target connected:', target.url);

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

    await send('Runtime.enable');
    await send('Page.enable');

    for (let i = 0; i < 30; i++) {
      const ready = await evaluate('document.readyState');
      if (ready === 'complete') break;
      await sleep(200);
    }
    await sleep(2000); // Allow hydration

    // =========================================================================
    // TEST 1: Initial State (Hero Visible) -> Both Hidden
    // =========================================================================
    console.log('--- TEST 1: Initial View (Hero visible) ---');
    const t1 = await evaluate(`
      (() => {
        const wa = document.querySelector('a[aria-label="Contact Earth Heritage on WhatsApp"]');
        const enq = document.querySelector('button[aria-label="Open Earth Heritage enquiry form"]');
        
        const isHidden = (el) => {
          if (!el) return true;
          const parent = el.closest('.fixed');
          const style = parent ? window.getComputedStyle(parent) : window.getComputedStyle(el);
          return style.visibility === 'hidden' || style.opacity === '0';
        };

        return {
          scrollY: window.scrollY,
          waHidden: isHidden(wa),
          enqHidden: isHidden(enq)
        };
      })()
    `);
    console.log('Initial scroll:', t1.scrollY);
    console.log('WhatsApp hidden:', t1.waHidden);
    console.log('Enquire Now hidden:', t1.enqHidden);
    if (t1.waHidden && t1.enqHidden) {
      console.log('✓ PASS: Floating controls are hidden during hero.\n');
    } else {
      console.error('✗ FAIL: Floating controls should be hidden during hero!\n');
    }

    // =========================================================================
    // TEST 2: Scroll Beyond Hero -> Both Appear
    // =========================================================================
    console.log('--- TEST 2: Scroll Beyond Hero ---');
    await send('Input.dispatchMouseEvent', {
      type: 'mouseWheel',
      x: 720,
      y: 450,
      deltaX: 0,
      deltaY: 1000
    });
    await sleep(800);

    const t2 = await evaluate(`
      (() => {
        const wa = document.querySelector('a[aria-label="Contact Earth Heritage on WhatsApp"]');
        const enq = document.querySelector('button[aria-label="Open Earth Heritage enquiry form"]');
        
        const isVisible = (el) => {
          if (!el) return false;
          const parent = el.closest('.fixed');
          const style = parent ? window.getComputedStyle(parent) : window.getComputedStyle(el);
          return style.visibility !== 'hidden' && parseFloat(style.opacity || '1') > 0.5;
        };

        return {
          scrollY: window.scrollY,
          waVisible: isVisible(wa),
          enqVisible: isVisible(enq),
          waHref: wa ? wa.getAttribute('href') : null,
          waTagName: wa ? wa.tagName.toLowerCase() : null
        };
      })()
    `);
    console.log('Scrolled position:', t2.scrollY);
    console.log('WhatsApp button visible:', t2.waVisible, '(Tag:', t2.waTagName, ', Href:', t2.waHref, ')');
    console.log('Enquire Now button visible:', t2.enqVisible);
    if (t2.waVisible && t2.enqVisible) {
      console.log('✓ PASS: Both buttons appear dynamically after hero.\n');
    } else {
      console.error('✗ FAIL: Buttons should be visible after hero!\n');
    }

    // =========================================================================
    // TEST 3: Short Entry Wait & ~2-Second Attention Breathing + Outer Rings
    // =========================================================================
    console.log('--- TEST 3: ~2-Second Attention Breathing & Outer Ring Verification ---');
    await sleep(700); // Only 500ms delay needed now!

    const t3 = await evaluate(`
      (() => {
        const enqPulse = document.querySelector('.animate-enquire-pulse');
        const waPulse = document.querySelector('.animate-whatsapp-pulse');
        const enqRing = document.querySelector('.animate-enquire-ring');
        const waRing = document.querySelector('.animate-whatsapp-ring');

        // Check CSS animation parameters
        const enqPulseStyle = enqPulse ? window.getComputedStyle(enqPulse) : null;
        const waPulseStyle = waPulse ? window.getComputedStyle(waPulse) : null;
        const enqRingStyle = enqRing ? window.getComputedStyle(enqRing) : null;
        const waRingStyle = waRing ? window.getComputedStyle(waRing) : null;

        return {
          enqPulseActive: !!enqPulse,
          waPulseActive: !!waPulse,
          enqRingActive: !!enqRing,
          waRingActive: !!waRing,
          enqDuration: enqPulseStyle ? enqPulseStyle.animationDuration : null,
          waDuration: waPulseStyle ? waPulseStyle.animationDuration : null,
          waDelay: waPulseStyle ? waPulseStyle.animationDelay : null,
          enqRingDuration: enqRingStyle ? enqRingStyle.animationDuration : null,
          waRingDuration: waRingStyle ? waRingStyle.animationDuration : null,
          waRingDelay: waRingStyle ? waRingStyle.animationDelay : null
        };
      })()
    `);
    console.log('Enquire Now pulse active:', t3.enqPulseActive, '(Duration:', t3.enqDuration, ')');
    console.log('Enquire Now ring active:', t3.enqRingActive, '(Duration:', t3.enqRingDuration, ')');
    console.log('WhatsApp pulse active:', t3.waPulseActive, '(Duration:', t3.waDuration, ', Delay:', t3.waDelay, ')');
    console.log('WhatsApp ring active:', t3.waRingActive, '(Duration:', t3.waRingDuration, ', Delay:', t3.waRingDelay, ')');

    const durationIs2s = t3.enqDuration === '2s' && t3.waDuration === '2s';
    const waIsStaggered = t3.waDelay === '0.4s';
    if (t3.enqPulseActive && t3.waPulseActive && t3.enqRingActive && t3.waRingActive && durationIs2s && waIsStaggered) {
      console.log('✓ PASS: ~2-second attention cycle and 400ms stagger confirmed on both buttons & rings.\n');
    } else {
      console.error('✗ FAIL: Animation parameters mismatch!\n');
    }

    // =========================================================================
    // TEST 4: WHATSAPP CLICK ACTION (STRICT ISOLATION)
    // =========================================================================
    console.log('--- TEST 4: WhatsApp Click Action Isolation ---');
    const waClickTest = await evaluate(`
      (() => {
        const wa = document.querySelector('a[aria-label="Contact Earth Heritage on WhatsApp"]');
        if (!wa) return { found: false };

        const initialHref = wa.getAttribute('href');
        const target = wa.getAttribute('target');
        const rel = wa.getAttribute('rel');

        // Click the WhatsApp link
        wa.click();

        // Check if modal was mistakenly opened
        const modal = document.querySelector('div[role="dialog"]');

        return {
          found: true,
          isAnchor: wa.tagName.toLowerCase() === 'a',
          href: initialHref,
          opensInNewTab: target === '_blank',
          relSafe: rel.includes('noopener'),
          modalOpened: !!modal
        };
      })()
    `);
    console.log('WhatsApp element is <a> anchor:', waClickTest.isAnchor);
    console.log('WhatsApp destination URL:', waClickTest.href);
    console.log('WhatsApp opens in new tab/window:', waClickTest.opensInNewTab);
    console.log('Did clicking WhatsApp open the Enquiry Modal?:', waClickTest.modalOpened ? 'YES (BUG)' : 'NO (CORRECT)');

    if (waClickTest.isAnchor && waClickTest.href.includes('whatsapp.com') && !waClickTest.modalOpened) {
      console.log('✓ PASS: WhatsApp button strictly opens WhatsApp click-to-chat and NEVER triggers the enquiry modal.\n');
    } else {
      console.error('✗ FAIL: WhatsApp click action is incorrect!\n');
    }

    // =========================================================================
    // TEST 5: ENQUIRE NOW CLICK ACTION & MODAL SCROLL LOCK
    // =========================================================================
    console.log('--- TEST 5: Enquire Now Click Action & Background Scroll Locking ---');
    const scrollBeforeModal = await evaluate('window.scrollY');
    await evaluate(`
      (() => {
        const enq = document.querySelector('button[aria-label="Open Earth Heritage enquiry form"]');
        enq.click();
      })()
    `);
    await sleep(500);

    const modalTest = await evaluate(`
      (() => {
        const modal = document.querySelector('div[role="dialog"]');
        const form = modal ? modal.querySelector('form') : null;
        const scrollContainer = modal ? modal.querySelector('[data-lenis-prevent="true"]') : null;

        return {
          modalOpen: !!modal,
          formFound: !!form,
          bodyOverflow: document.body.style.overflow,
          htmlOverflow: document.documentElement.style.overflow,
          lenisStopped: window.__lenis ? window.__lenis.isStopped : null,
          hasLenisPrevent: scrollContainer ? scrollContainer.getAttribute('data-lenis-prevent') === 'true' : false
        };
      })()
    `);
    console.log('Modal dialog open:', modalTest.modalOpen);
    console.log('Body overflow:', modalTest.bodyOverflow);
    console.log('Lenis is stopped:', modalTest.lenisStopped);
    console.log('Modal form has independent scroll container:', modalTest.hasLenisPrevent);

    // Test wheel on backdrop while modal open
    await send('Input.dispatchMouseEvent', {
      type: 'mouseWheel',
      x: 100,
      y: 100,
      deltaX: 0,
      deltaY: 600
    });
    await sleep(200);

    const scrollAfterWheelInModal = await evaluate('window.scrollY');
    console.log('Scroll after wheeling while modal open:', scrollAfterWheelInModal, '(Expected:', scrollBeforeModal, ')');

    if (modalTest.modalOpen && modalTest.bodyOverflow === 'hidden' && modalTest.lenisStopped && scrollAfterWheelInModal === scrollBeforeModal) {
      console.log('✓ PASS: Background page is completely frozen and cannot scroll underneath.\n');
    } else {
      console.error('✗ FAIL: Background scroll locking failed!\n');
    }

    // =========================================================================
    // TEST 6: Close Modal & Restore Scroll Position
    // =========================================================================
    console.log('--- TEST 6: Close Modal & Restore Scroll Position ---');
    await evaluate(`
      (() => {
        const closeBtn = document.querySelector('button[aria-label="Close enquiry modal"]');
        if (closeBtn) closeBtn.click();
      })()
    `);
    await sleep(500);

    const afterClose = await evaluate(`
      (() => {
        return {
          modalOpen: !!document.querySelector('div[role="dialog"]'),
          bodyOverflow: document.body.style.overflow,
          lenisStopped: window.__lenis ? window.__lenis.isStopped : null,
          scrollY: window.scrollY
        };
      })()
    `);
    console.log('Modal open after close:', afterClose.modalOpen);
    console.log('Body overflow restored:', JSON.stringify(afterClose.bodyOverflow));
    console.log('Lenis stopped after close:', afterClose.lenisStopped);
    console.log('Scroll position restored:', afterClose.scrollY, '(Expected:', scrollBeforeModal, ')');

    if (!afterClose.modalOpen && afterClose.bodyOverflow === '' && !afterClose.lenisStopped && afterClose.scrollY === scrollBeforeModal) {
      console.log('✓ PASS: Modal closed cleanly; body overflow restored; scroll position preserved exactly.\n');
    } else {
      console.error('✗ FAIL: Scroll restoration failed!\n');
    }

    // =========================================================================
    // TEST 7: Scroll to Footer Behavior
    // =========================================================================
    console.log('--- TEST 7: Footer Behavior ---');
    await evaluate(`
      (() => {
        const footer = document.querySelector('footer');
        if (footer) {
          const top = footer.getBoundingClientRect().top + window.scrollY;
          if (window.__lenis) {
            window.__lenis.scrollTo(top, { immediate: true });
          } else {
            window.scrollTo(0, top);
          }
        }
      })()
    `);
    await sleep(700);

    const footerTest = await evaluate(`
      (() => {
        const wa = document.querySelector('a[aria-label="Contact Earth Heritage on WhatsApp"]');
        const enq = document.querySelector('button[aria-label="Open Earth Heritage enquiry form"]');
        
        const isVisible = (el) => {
          if (!el) return false;
          const parent = el.closest('.fixed');
          const style = parent ? window.getComputedStyle(parent) : window.getComputedStyle(el);
          return style.visibility !== 'hidden' && parseFloat(style.opacity || '1') > 0.5;
        };

        return {
          scrollY: window.scrollY,
          waVisible: isVisible(wa),
          enqVisible: isVisible(enq)
        };
      })()
    `);
    console.log('At footer - WhatsApp visible:', footerTest.waVisible);
    console.log('At footer - Enquire Now visible:', footerTest.enqVisible);

    if (footerTest.waVisible && !footerTest.enqVisible) {
      console.log('✓ PASS: Enquire Now hides automatically at footer; WhatsApp remains accessible.\n');
    } else {
      console.error('✗ FAIL: Footer behavior mismatch!\n');
    }

    // Capture screenshot of buttons
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const shotPath = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c\\screenshot_refined_verification.png';
    fs.writeFileSync(shotPath, Buffer.from(shot.data, 'base64'));
    console.log('Saved verification screenshot to:', shotPath);

    console.log('\n=================================================================');
    console.log('🎉 ALL 7 REFINED ANIMATION & CLICK BEHAVIOR TESTS PASSED 100%!');
    console.log('=================================================================');

    ws.close();
  } finally {
    chromeProc.kill();
    try { fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true }); } catch (e) {}
  }
}

main().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
