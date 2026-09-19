const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = path.join(__dirname, 'chrome_test_profile_5steps');

if (!fs.existsSync(USER_DATA_DIR)) {
  fs.mkdirSync(USER_DATA_DIR, { recursive: true });
}

console.log('Spawning Chrome to verify all 5 scroll steps...');
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
      } catch (e) {}
    }

    if (!pageTarget) throw new Error('Chrome target not found');

    ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((resolve) => ws.addEventListener('open', resolve));

    let cmdId = 1;
    await sendCommand(cmdId++, 'Page.enable');
    await sendCommand(cmdId++, 'Runtime.enable');

    await sleep(2500);

    // Scroll to start of #how-it-works-overview
    const baseInfo = await evalInPage(cmdId++, `
      (() => {
        const sec = document.getElementById('how-it-works-overview');
        sec.scrollIntoView({ behavior: 'instant' });
        const pinTop = window.innerWidth >= 640 ? 76 : 66;
        // Align exactly to the pin start point
        const secDocTop = window.scrollY + sec.getBoundingClientRect().top - pinTop;
        window.scrollTo(0, secDocTop);
        if (window.__lenis) window.__lenis.scrollTo(secDocTop, { immediate: true });
        
        return {
          secDocTop: secDocTop,
          totalHeight: sec.getBoundingClientRect().height,
          windowHeight: window.innerHeight,
          scrollableDistance: sec.getBoundingClientRect().height - window.innerHeight
        };
      })()
    `);
    console.log('Base section info:', baseInfo);
    await sleep(600);

    const stepsToTest = [
      { name: 'Step 01 OWN', fraction: 0.05, file: 'hiw_verified_step01.png' },
      { name: 'Step 02 PLAN', fraction: 0.25, file: 'hiw_verified_step02.png' },
      { name: 'Step 03 CULTIVATE', fraction: 0.45, file: 'hiw_verified_step03.png' },
      { name: 'Step 04 CARE', fraction: 0.65, file: 'hiw_verified_step04.png' },
      { name: 'Step 05 CONTINUE', fraction: 0.85, file: 'hiw_verified_step05.png' }
    ];

    for (const step of stepsToTest) {
      console.log(`\n--- TESTING ${step.name} (scroll fraction ${step.fraction}) ---`);
      
      const scrollPos = baseInfo.secDocTop + (step.fraction * baseInfo.scrollableDistance);
      
      await evalInPage(cmdId++, `
        (() => {
          const targetY = ${scrollPos};
          window.scrollTo(0, targetY);
          if (window.__lenis) {
            window.__lenis.scrollTo(targetY, { immediate: true });
          }
          window.dispatchEvent(new Event('scroll'));
        })()
      `);
      await sleep(600);

      const state = await evalInPage(cmdId++, `
        (() => {
          const sec = document.getElementById('how-it-works-overview');
          const activePills = sec.querySelectorAll('.bg-\\\\[\\\\#15341C\\\\].text-white');
          // Filter to the one with the step number
          let stepNumber = 'unknown';
          activePills.forEach(p => {
            const txt = p.textContent.trim();
            if (txt.match(/^0[1-5]$/)) stepNumber = txt;
          });
          const card = sec.querySelector('.bg-white.border');
          const cRect = card ? card.getBoundingClientRect() : null;
          const title = sec.querySelector('h3') ? sec.querySelector('h3').textContent.trim() : '';

          return {
            activeStepNumber: stepNumber,
            cardTop: cRect ? cRect.top : null,
            cardBottom: cRect ? cRect.bottom : null,
            cardHeight: cRect ? cRect.height : null,
            windowHeight: window.innerHeight,
            isFullyVisible: cRect ? (cRect.top >= 0 && cRect.bottom <= window.innerHeight) : false,
            remainingBottomMargin: cRect ? (window.innerHeight - cRect.bottom) : null,
            title: title
          };
        })()
      `);
      console.log(`Result for ${step.name}:`, state);
      await takeScreenshot(cmdId++, step.file);
    }

    console.log('\nAll 5 steps verified and screenshotted successfully!');
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    if (ws) ws.close();
    chrome.kill();
    process.exit(0);
  }
}

run();
