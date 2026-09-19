const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = path.join(__dirname, 'chrome_test_profile_about');

if (!fs.existsSync(USER_DATA_DIR)) {
  fs.mkdirSync(USER_DATA_DIR, { recursive: true });
}

console.log('Spawning Chrome to verify HomeAbout section...');
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

    ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((resolve) => ws.addEventListener('open', resolve));

    let cmdId = 1;
    await sendCommand(cmdId++, 'Page.enable');
    await sendCommand(cmdId++, 'Runtime.enable');

    await sleep(2500);

    // Scroll to #about-overview
    console.log('Scrolling to #about-overview...');
    await evalInPage(cmdId++, `
      (() => {
        const sec = document.getElementById('about-overview');
        if (sec) {
          sec.scrollIntoView({ behavior: 'instant', block: 'center' });
        }
      })()
    `);
    await sleep(1000);

    const metrics = await evalInPage(cmdId++, `
      (() => {
        const sec = document.getElementById('about-overview');
        if (!sec) return { found: false };
        const rect = sec.getBoundingClientRect();
        const images = sec.querySelectorAll('img');
        const h2 = sec.querySelector('h2');
        return {
          found: true,
          top: rect.top,
          height: rect.height,
          imagesCount: images.length,
          h2Text: h2 ? h2.textContent.trim() : ''
        };
      })()
    `);
    console.log('HomeAbout section metrics:', metrics);

    await takeScreenshot(cmdId++, 'home_about_redesign_desktop.png');

    // Test mobile emulation (390x844)
    console.log('Testing mobile layout...');
    await sendCommand(cmdId++, 'Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(800);
    await evalInPage(cmdId++, `
      (() => {
        const sec = document.getElementById('about-overview');
        if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()
    `);
    await sleep(800);
    await takeScreenshot(cmdId++, 'home_about_redesign_mobile.png');

    console.log('\nVerification complete!');
  } catch (err) {
    console.error('Error during HomeAbout verification:', err);
  } finally {
    if (ws) ws.close();
    chrome.kill();
    process.exit(0);
  }
}

run();
