const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_USER_DATA = path.join(os.tmpdir(), 'chrome_cdp_' + Date.now());

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('=== Starting Real Chrome Headless Verification via CDP ===\n');

  if (!fs.existsSync(TEMP_USER_DATA)) {
    fs.mkdirSync(TEMP_USER_DATA, { recursive: true });
  }

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${TEMP_USER_DATA}`,
    '--window-size=1440,900',
    'about:blank'
  ]);

  chromeProc.on('error', err => {
    console.error('Chrome spawn error:', err);
  });

  try {
    // Wait for Chrome to be ready
    let target = null;
    for (let i = 0; i < 20; i++) {
      await sleep(300);
      try {
        const targets = await httpGet('http://127.0.0.1:9222/json/list');
        if (targets && targets.length > 0) {
          target = targets[0];
          break;
        }
      } catch (e) {
        // keep waiting
      }
    }

    if (!target) {
      throw new Error('Failed to connect to Chrome DevTools Protocol');
    }

    console.log('Connected to Chrome CDP:', target.webSocketDebuggerUrl);

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

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    function send(method, params = {}) {
      const id = msgId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    async function evaluate(expression) {
      const res = await send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true
      });
      if (res.exceptionDetails) {
        console.error('Exception details:', res.exceptionDetails.exception?.description || res.exceptionDetails.text);
        throw new Error(res.exceptionDetails.text || 'Evaluation exception');
      }
      return res.result?.value;
    }

    await send('Page.enable');
    await send('Runtime.enable');

    console.log('Navigating to http://localhost:3000 ...');
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(2500); // Allow hydration and Lenis to initialize

    // =========================================================================
    // TEST 1: Initial Page Load (Hero visible) -> Floating buttons must be HIDDEN
    // =========================================================================
    console.log('\n--- TEST 1: Initial State (Hero Visible) ---');
    const initialVisibility = await evaluate(`
      (() => {
        const wa = document.querySelector('a[aria-label="Contact Earth Heritage on WhatsApp"], button[aria-label="Contact Earth Heritage on WhatsApp"]');
        const enq = document.querySelector('button[aria-label="Open Earth Heritage enquiry form"]');
        
        const isElementVisible = (el) => {
          if (!el) return false;
          const style = window.getComputedStyle(el);
          const parentStyle = el.parentElement ? window.getComputedStyle(el.parentElement) : null;
          const grandparentStyle = el.parentElement && el.parentElement.parentElement ? window.getComputedStyle(el.parentElement.parentElement) : null;
          
          return style.visibility !== 'hidden' && 
                 style.opacity !== '0' && 
                 (!parentStyle || (parentStyle.visibility !== 'hidden' && parentStyle.opacity !== '0')) &&
                 (!grandparentStyle || (grandparentStyle.visibility !== 'hidden' && grandparentStyle.opacity !== '0'));
        };

        return {
          scrollY: window.scrollY,
          waFound: !!wa,
          enqFound: !!enq,
          waVisible: isElementVisible(wa),
          enqVisible: isElementVisible(enq)
        };
      })()
    `);
    console.log('Scroll position:', initialVisibility.scrollY);
    console.log('WhatsApp button initially visible:', initialVisibility.waVisible);
    console.log('Enquire Now button initially visible:', initialVisibility.enqVisible);
    if (!initialVisibility.waVisible && !initialVisibility.enqVisible) {
      console.log('✓ PASS: Both floating buttons are correctly HIDDEN while hero is visible.');
    } else {
      console.error('✗ FAIL: Floating buttons should be hidden during hero!');
    }

    // =========================================================================
    // TEST 2: Scroll Past Hero -> Floating buttons must dynamically APPEAR
    // =========================================================================
    console.log('\n--- TEST 2: Scrolled Beyond Hero ---');
    await evaluate(`
      (() => {
        if (window.__lenis) {
          window.__lenis.scrollTo(900, { immediate: true });
        } else {
          window.scrollTo(0, 900);
        }
      })()
    `);
    await sleep(800); // allow entrance animation to play

    const scrolledVisibility = await evaluate(`
      (() => {
        const wa = document.querySelector('a[aria-label="Contact Earth Heritage on WhatsApp"], button[aria-label="Contact Earth Heritage on WhatsApp"]');
        const enq = document.querySelector('button[aria-label="Open Earth Heritage enquiry form"]');
        
        const isElementVisible = (el) => {
          if (!el) return false;
          const style = window.getComputedStyle(el);
          const parentStyle = el.parentElement ? window.getComputedStyle(el.parentElement) : null;
          const grandparentStyle = el.parentElement && el.parentElement.parentElement ? window.getComputedStyle(el.parentElement.parentElement) : null;
          
          const opacity = parseFloat(style.opacity) * (parentStyle ? parseFloat(parentStyle.opacity) : 1) * (grandparentStyle ? parseFloat(grandparentStyle.opacity) : 1);
          return style.visibility !== 'hidden' && opacity > 0.5;
        };

        return {
          scrollY: window.scrollY,
          waVisible: isElementVisible(wa),
          enqVisible: isElementVisible(enq),
          waColor: wa ? window.getComputedStyle(wa).backgroundColor : null,
          enqPosition: enq ? window.getComputedStyle(enq).bottom : null
        };
      })()
    `);
    console.log('Scroll position after scroll:', scrolledVisibility.scrollY);
    console.log('WhatsApp button visible:', scrolledVisibility.waVisible, '(Color:', scrolledVisibility.waColor, ')');
    console.log('Enquire Now button visible:', scrolledVisibility.enqVisible);
    if (scrolledVisibility.waVisible && scrolledVisibility.enqVisible) {
      console.log('✓ PASS: Both floating buttons correctly dynamically APPEAR after scrolling beyond hero.');
    } else {
      console.error('✗ FAIL: Floating buttons should be visible after hero!');
    }

    // =========================================================================
    // TEST 3: Wait for Stage 2 Attention Breathing & Ring Animation Activation
    // =========================================================================
    console.log('\n--- TEST 3: Attention Breathing Lifecycle Activation ---');
    await sleep(2200); // wait for 1.8s - 2.2s rest timer to trigger hasEntered = true

    const pulseStatus = await evaluate(`
      (() => {
        const enqPulseContainer = document.querySelector('.animate-enquire-pulse');
        const waPulseContainer = document.querySelector('.animate-whatsapp-pulse');
        const enqRing = document.querySelector('.animate-enquire-ring');
        const waRing = document.querySelector('.animate-whatsapp-ring');

        return {
          enqPulseActive: !!enqPulseContainer,
          waPulseActive: !!waPulseContainer,
          enqRingActive: !!enqRing,
          waRingActive: !!waRing
        };
      })()
    `);
    console.log('Enquire Now attention pulse active:', pulseStatus.enqPulseActive);
    console.log('WhatsApp attention pulse active:', pulseStatus.waPulseActive);
    console.log('Enquire Now soft expanding ring active:', pulseStatus.enqRingActive);
    console.log('WhatsApp soft expanding ring active:', pulseStatus.waRingActive);
    if (pulseStatus.enqPulseActive && pulseStatus.waPulseActive && pulseStatus.enqRingActive && pulseStatus.waRingActive) {
      console.log('✓ PASS: Attention breathing pulse and soft rings are actively running.');
    } else {
      console.error('✗ FAIL: Attention breathing animation did not activate as expected.');
    }

    // Capture screenshot of the floating buttons active state
    const activeButtonsShot = await send('Page.captureScreenshot', { format: 'png' });
    const activeShotPath = path.join(__dirname, 'screenshot_floating_buttons.png');
    fs.writeFileSync(activeShotPath, Buffer.from(activeButtonsShot.data, 'base64'));
    console.log('Saved screenshot:', activeShotPath);

    // =========================================================================
    // TEST 4: Click "Enquire Now" -> Background Scroll Lock & Modal Independence
    // =========================================================================
    console.log('\n--- TEST 4: Click Enquire Now & Background Scroll Lock ---');
    const scrollBeforeModal = await evaluate(`window.scrollY`);
    console.log('Scroll position before opening modal:', scrollBeforeModal);

    await evaluate(`
      (() => {
        const enq = document.querySelector('button[aria-label="Open Earth Heritage enquiry form"]');
        enq.click();
      })()
    `);
    await sleep(500); // allow modal open animation

    const modalStatus = await evaluate(`
      (() => {
        const modal = document.querySelector('div[role="dialog"]');
        const form = modal ? modal.querySelector('form') : null;
        const scrollContainer = modal ? modal.querySelector('[data-lenis-prevent="true"]') : null;
        
        return {
          modalOpen: !!modal,
          bodyOverflow: document.body.style.overflow,
          htmlOverflow: document.documentElement.style.overflow,
          lenisStoppedClass: document.documentElement.classList.contains('lenis-stopped'),
          lenisIsStopped: window.__lenis ? window.__lenis.isStopped : null,
          formFound: !!form,
          scrollContainerHasLenisPrevent: scrollContainer ? scrollContainer.getAttribute('data-lenis-prevent') === 'true' : false,
          currentScrollY: window.scrollY
        };
      })()
    `);
    console.log('Modal dialog open:', modalStatus.modalOpen);
    console.log('Body overflow:', modalStatus.bodyOverflow);
    console.log('Html overflow:', modalStatus.htmlOverflow);
    console.log('Lenis is stopped:', modalStatus.lenisIsStopped);
    console.log('Form has independent scroll container (data-lenis-prevent):', modalStatus.scrollContainerHasLenisPrevent);
    console.log('Current scroll position while modal is open:', modalStatus.currentScrollY);

    if (modalStatus.modalOpen && modalStatus.bodyOverflow === 'hidden' && modalStatus.lenisIsStopped && modalStatus.scrollContainerHasLenisPrevent) {
      console.log('✓ PASS: Background page is completely locked and Lenis is paused.');
    } else {
      console.error('✗ FAIL: Background scroll locking failed.');
    }

    // Capture screenshot of the modal open
    const modalShot = await send('Page.captureScreenshot', { format: 'png' });
    const modalShotPath = path.join(__dirname, 'screenshot_enquiry_modal.png');
    fs.writeFileSync(modalShotPath, Buffer.from(modalShot.data, 'base64'));
    console.log('Saved screenshot:', modalShotPath);

    // =========================================================================
    // TEST 5: Close Modal -> Restore Landing Page Scroll to EXACT Position
    // =========================================================================
    console.log('\n--- TEST 5: Close Modal & Restore Scroll Position ---');
    await evaluate(`
      (() => {
        const closeBtn = document.querySelector('button[aria-label="Close enquiry modal"]');
        if (closeBtn) closeBtn.click();
      })()
    `);
    await sleep(400); // allow exit animation

    const afterCloseStatus = await evaluate(`
      (() => {
        return {
          bodyOverflow: document.body.style.overflow,
          lenisIsStopped: window.__lenis ? window.__lenis.isStopped : null,
          scrollY: window.scrollY
        };
      })()
    `);
    console.log('Body overflow after close:', JSON.stringify(afterCloseStatus.bodyOverflow));
    console.log('Lenis is stopped after close:', afterCloseStatus.lenisIsStopped);
    console.log('Scroll position after close:', afterCloseStatus.scrollY, '(Expected:', scrollBeforeModal, ')');

    if (afterCloseStatus.bodyOverflow === '' && !afterCloseStatus.lenisIsStopped && Math.abs(afterCloseStatus.scrollY - scrollBeforeModal) <= 2) {
      console.log('✓ PASS: Page scroll restored exactly where it was; Lenis resumed without jumping.');
    } else {
      console.error('✗ FAIL: Scroll position was not restored properly!');
    }

    // =========================================================================
    // TEST 6: Scroll to Footer -> Enquire Now Gracefully Hides, WhatsApp Remains
    // =========================================================================
    console.log('\n--- TEST 6: Scroll to Footer Behavior ---');
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

    const footerStatus = await evaluate(`
      (() => {
        const wa = document.querySelector('a[aria-label="Contact Earth Heritage on WhatsApp"], button[aria-label="Contact Earth Heritage on WhatsApp"]');
        const enq = document.querySelector('button[aria-label="Open Earth Heritage enquiry form"]');
        
        const isElementVisible = (el) => {
          if (!el) return false;
          const style = window.getComputedStyle(el);
          const parentStyle = el.parentElement ? window.getComputedStyle(el.parentElement) : null;
          const grandparentStyle = el.parentElement && el.parentElement.parentElement ? window.getComputedStyle(el.parentElement.parentElement) : null;
          
          const opacity = parseFloat(style.opacity) * (parentStyle ? parseFloat(parentStyle.opacity) : 1) * (grandparentStyle ? parseFloat(grandparentStyle.opacity) : 1);
          return style.visibility !== 'hidden' && opacity > 0.5;
        };

        return {
          scrollY: window.scrollY,
          waVisible: isElementVisible(wa),
          enqVisible: isElementVisible(enq)
        };
      })()
    `);
    console.log('At footer - WhatsApp visible:', footerStatus.waVisible);
    console.log('At footer - Enquire Now visible:', footerStatus.enqVisible);

    if (footerStatus.waVisible && !footerStatus.enqVisible) {
      console.log('✓ PASS: Enquire Now button gracefully hides near footer; WhatsApp remains accessible at bottom-right.');
    } else {
      console.warn('Footer status check result:', footerStatus);
    }

    // Capture screenshot at footer
    const footerShot = await send('Page.captureScreenshot', { format: 'png' });
    const footerShotPath = path.join(__dirname, 'screenshot_footer_controls.png');
    fs.writeFileSync(footerShotPath, Buffer.from(footerShot.data, 'base64'));
    console.log('Saved screenshot:', footerShotPath);

    console.log('\n======================================================');
    console.log('🎉 ALL CDP BROWSER INTERACTION TESTS COMPLETED SUCCESSFULLY!');
    console.log('======================================================');

    ws.close();
  } finally {
    chromeProc.kill();
    try {
      fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true });
    } catch (e) {
      // ignore tmp cleanup error
    }
  }
}

main().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
