const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = path.join(__dirname, 'chrome_test_profile_768p');

if (!fs.existsSync(USER_DATA_DIR)) {
  fs.mkdirSync(USER_DATA_DIR, { recursive: true });
}

const chrome = spawn(CHROME_PATH, [
  '--headless=new',
  '--remote-debugging-port=9222',
  `--user-data-dir=${USER_DATA_DIR}`,
  '--window-size=1366,768',
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

    const check = await evalInPage(cmdId++, `
      (() => {
        const sec = document.getElementById('how-it-works-overview');
        sec.scrollIntoView({ behavior: 'instant' });
        const pinTop = 76;
        const secDocTop = window.scrollY + sec.getBoundingClientRect().top - pinTop;
        window.scrollTo(0, secDocTop);
        if (window.__lenis) window.__lenis.scrollTo(secDocTop, { immediate: true });
        
        const card = sec.querySelector('.bg-white.border');
        const cRect = card ? card.getBoundingClientRect() : null;
        
        return {
          windowHeight: window.innerHeight,
          cardTop: cRect ? cRect.top : null,
          cardBottom: cRect ? cRect.bottom : null,
          cardHeight: cRect ? cRect.height : null,
          isFullyVisible: cRect ? (cRect.top >= 0 && cRect.bottom <= window.innerHeight) : false,
          remainingSpace: cRect ? (window.innerHeight - cRect.bottom) : null
        };
      })()
    `);
    console.log('768p viewport check:', check);
    await takeScreenshot(cmdId++, 'hiw_verified_768p.png');
  } catch (err) {
    console.error('768p check error:', err);
  } finally {
    if (ws) ws.close();
    chrome.kill();
    process.exit(0);
  }
}

run();
