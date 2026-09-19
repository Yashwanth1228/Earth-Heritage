const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = path.join(__dirname, 'chrome_test_profile_mobile_about');

if (!fs.existsSync(USER_DATA_DIR)) {
  fs.mkdirSync(USER_DATA_DIR, { recursive: true });
}

const chrome = spawn(CHROME_PATH, [
  '--headless=new',
  '--remote-debugging-port=9222',
  `--user-data-dir=${USER_DATA_DIR}`,
  '--window-size=390,844',
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

    // Scroll to start of #about-overview
    await evalInPage(cmdId++, `
      (() => {
        const sec = document.getElementById('about-overview');
        if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'start' });
        window.scrollBy(0, -60); // give top breathing room for navbar
      })()
    `);
    await sleep(800);
    await takeScreenshot(cmdId++, 'home_about_mobile_top.png');

    // Scroll down to see the 2 images on mobile
    await evalInPage(cmdId++, `
      (() => {
        window.scrollBy(0, 500);
      })()
    `);
    await sleep(600);
    await takeScreenshot(cmdId++, 'home_about_mobile_images.png');

  } catch (err) {
    console.error(err);
  } finally {
    if (ws) ws.close();
    chrome.kill();
    process.exit(0);
  }
}

run();
