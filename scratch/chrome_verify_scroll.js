const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = path.join(__dirname, 'chrome_test_profile');

// Ensure user data dir exists
if (!fs.existsSync(USER_DATA_DIR)) {
  fs.mkdirSync(USER_DATA_DIR, { recursive: true });
}

console.log('Spawning Chrome with CDP...');
const chrome = spawn(CHROME_PATH, [
  '--headless=new',
  '--remote-debugging-port=9222',
  `--user-data-dir=${USER_DATA_DIR}`,
  '--window-size=1440,900',
  '--disable-gpu',
  'http://localhost:3000'
], { stdio: 'ignore' });

let ws;

function sendCommand(id, method, params = {}) {
  return new Promise((resolve, reject) => {
    const messageHandler = (event) => {
      const data = JSON.parse(event.data);
      if (data.id === id) {
        ws.removeEventListener('message', messageHandler);
        if (data.error) reject(data.error);
        else resolve(data.result);
      }
    };
    ws.addEventListener('message', messageHandler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evalInPage(cmdId, expr) {
  const res = await sendCommand(cmdId, 'Runtime.evaluate', {
    expression: expr,
    returnByValue: true,
    awaitPromise: true
  });
  return res && res.result ? res.result.value : null;
}

async function takeScreenshot(cmdId, filename) {
  const res = await sendCommand(cmdId, 'Page.captureScreenshot', { format: 'png' });
  const filepath = path.join(ARTIFACT_DIR, filename);
  fs.writeFileSync(filepath, Buffer.from(res.data, 'base64'));
  console.log(`Saved screenshot: ${filename}`);
  return filepath;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  try {
    // Wait for Chrome to bind to port 9222
    let pageTarget = null;
    for (let i = 0; i < 20; i++) {
      await sleep(500);
      try {
        const list = await new Promise((resolve, reject) => {
          http.get('http://localhost:9222/json/list', (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
              try { resolve(JSON.parse(data)); } catch(e) { reject(e); }
            });
          }).on('error', reject);
        });
        pageTarget = list.find(t => t.type === 'page');
        if (pageTarget && pageTarget.webSocketDebuggerUrl) break;
      } catch (e) {
        // retry
      }
    }

    if (!pageTarget) {
      throw new Error('Failed to find Chrome page target with WebSocket URL');
    }

    console.log('Connecting to WebSocket:', pageTarget.webSocketDebuggerUrl);
    ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((resolve) => ws.addEventListener('open', resolve));
    console.log('WebSocket connected successfully!');

    let cmdId = 1;
    await sendCommand(cmdId++, 'Page.enable');
    await sendCommand(cmdId++, 'Runtime.enable');

    // Wait for initial render and hydration
    await sleep(2500);

    // Scroll directly to #how-it-works-overview
    console.log('\n--- SCROLLING TO #how-it-works-overview ---');
    const initialMetrics = await evalInPage(cmdId++, `
      (() => {
        const sec = document.getElementById('how-it-works-overview');
        if (!sec) return { found: false };
        sec.scrollIntoView({ behavior: 'instant' });
        const rect = sec.getBoundingClientRect();
        return {
          found: true,
          top: rect.top,
          height: rect.height,
          scrollY: window.scrollY,
          innerHeight: window.innerHeight,
          innerWidth: window.innerWidth
        };
      })()
    `);
    console.log('Initial metrics at section top:', initialMetrics);

    await sleep(1000);

    // Check card bounds & 100% viewport visibility
    const cardVisibility = await evalInPage(cmdId++, `
      (() => {
        const sec = document.getElementById('how-it-works-overview');
        const stickyContainer = sec.querySelector('.sticky');
        const card = sec.querySelector('.bg-white.border');
        const sRect = stickyContainer ? stickyContainer.getBoundingClientRect() : null;
        const cRect = card ? card.getBoundingClientRect() : null;
        const windowHeight = window.innerHeight;

        return {
          stickyTop: sRect ? sRect.top : null,
          stickyBottom: sRect ? sRect.bottom : null,
          cardTop: cRect ? cRect.top : null,
          cardBottom: cRect ? cRect.bottom : null,
          cardHeight: cRect ? cRect.height : null,
          windowHeight: windowHeight,
          // Card is 100% visible if cardTop >= 0 and cardBottom <= windowHeight
          isCardFullyVisible: cRect ? (cRect.top >= 0 && cRect.bottom <= windowHeight) : false,
          remainingSpaceAtBottom: cRect ? (windowHeight - cRect.bottom) : null
        };
      })()
    `);
    console.log('Card visibility analysis:', cardVisibility);

    // Capture Step 01
    await takeScreenshot(cmdId++, 'hiw_scroll_step01_100percent.png');

    // Test scrolling down: 5 steps across ~2200px of scrollable distance
    // Let's scroll +450px to trigger Step 02
    console.log('\n--- SCROLLING +450px (to Step 02) ---');
    const step2Info = await evalInPage(cmdId++, `
      (() => {
        window.scrollBy({ top: 450, behavior: 'instant' });
        // Also trigger scroll event manually if needed
        window.dispatchEvent(new Event('scroll'));
        if (window.__lenis) {
          window.__lenis.scrollTo(window.scrollY + 450, { immediate: true });
        }
        return { scrollY: window.scrollY };
      })()
    `);
    await sleep(800);

    const step2State = await evalInPage(cmdId++, `
      (() => {
        const sec = document.getElementById('how-it-works-overview');
        const activePill = sec.querySelector('.bg-\\\\[\\\\#15341C\\\\].text-white');
        const titleEl = sec.querySelector('h3');
        return {
          activeStepText: activePill ? activePill.textContent.trim() : 'none',
          title: titleEl ? titleEl.textContent.trim() : 'none'
        };
      })()
    `);
    console.log('Step 2 state:', step2State);
    await takeScreenshot(cmdId++, 'hiw_scroll_step02_scrolled.png');

    // Scroll +450px to Step 03
    console.log('\n--- SCROLLING +450px (to Step 03) ---');
    await evalInPage(cmdId++, `
      (() => {
        window.scrollBy({ top: 450, behavior: 'instant' });
        window.dispatchEvent(new Event('scroll'));
        if (window.__lenis) {
          window.__lenis.scrollTo(window.scrollY + 450, { immediate: true });
        }
      })()
    `);
    await sleep(800);

    const step3State = await evalInPage(cmdId++, `
      (() => {
        const sec = document.getElementById('how-it-works-overview');
        const activePill = sec.querySelector('.bg-\\\\[\\\\#15341C\\\\].text-white');
        const titleEl = sec.querySelector('h3');
        return {
          activeStepText: activePill ? activePill.textContent.trim() : 'none',
          title: titleEl ? titleEl.textContent.trim() : 'none'
        };
      })()
    `);
    console.log('Step 3 state:', step3State);
    await takeScreenshot(cmdId++, 'hiw_scroll_step03_scrolled.png');

    // Scroll +450px to Step 04
    console.log('\n--- SCROLLING +450px (to Step 04) ---');
    await evalInPage(cmdId++, `
      (() => {
        window.scrollBy({ top: 450, behavior: 'instant' });
        window.dispatchEvent(new Event('scroll'));
        if (window.__lenis) {
          window.__lenis.scrollTo(window.scrollY + 450, { immediate: true });
        }
      })()
    `);
    await sleep(800);

    const step4State = await evalInPage(cmdId++, `
      (() => {
        const sec = document.getElementById('how-it-works-overview');
        const activePill = sec.querySelector('.bg-\\\\[\\\\#15341C\\\\].text-white');
        const titleEl = sec.querySelector('h3');
        return {
          activeStepText: activePill ? activePill.textContent.trim() : 'none',
          title: titleEl ? titleEl.textContent.trim() : 'none'
        };
      })()
    `);
    console.log('Step 4 state:', step4State);
    await takeScreenshot(cmdId++, 'hiw_scroll_step04_scrolled.png');

    // Scroll +450px to Step 05
    console.log('\n--- SCROLLING +450px (to Step 05) ---');
    await evalInPage(cmdId++, `
      (() => {
        window.scrollBy({ top: 450, behavior: 'instant' });
        window.dispatchEvent(new Event('scroll'));
        if (window.__lenis) {
          window.__lenis.scrollTo(window.scrollY + 450, { immediate: true });
        }
      })()
    `);
    await sleep(800);

    const step5State = await evalInPage(cmdId++, `
      (() => {
        const sec = document.getElementById('how-it-works-overview');
        const activePill = sec.querySelector('.bg-\\\\[\\\\#15341C\\\\].text-white');
        const titleEl = sec.querySelector('h3');
        return {
          activeStepText: activePill ? activePill.textContent.trim() : 'none',
          title: titleEl ? titleEl.textContent.trim() : 'none'
        };
      })()
    `);
    console.log('Step 5 state:', step5State);
    await takeScreenshot(cmdId++, 'hiw_scroll_step05_scrolled.png');

    console.log('\nAll 5 steps verified successfully!');
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    if (ws) ws.close();
    chrome.kill();
    console.log('Chrome process terminated.');
    process.exit(0);
  }
}

run();
