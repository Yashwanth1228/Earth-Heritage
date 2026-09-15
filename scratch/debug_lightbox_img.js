const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_USER_DATA = path.join(os.tmpdir(), 'chrome_cdp_debug_' + Date.now());

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
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9228',
    '--disable-gpu',
    `--user-data-dir=${TEMP_USER_DATA}`,
    '--window-size=1440,900',
    'http://localhost:3000/gallery'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 30; i++) {
      await sleep(300);
      try {
        const targets = await httpGet('http://127.0.0.1:9228/json/list');
        const page = targets.find(t => t.type === 'page');
        if (page) { target = page; break; }
      } catch (e) {}
    }

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    let msgId = 1;
    const pending = new Map();
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(msg.error); else resolve(msg.result);
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
      return res.result?.value;
    }

    await send('Runtime.enable');
    await send('Page.enable');
    await sleep(2500);

    // Click first article
    await evaluate(`document.querySelector('#exhibition-grid article')?.click()`);
    await sleep(800);

    const imgDebug = await evaluate(`
      (() => {
        const dialog = document.querySelector('aside[role="dialog"]');
        const img = dialog?.querySelector('img');
        const parent = img?.parentElement;
        return {
          dialogFound: !!dialog,
          imgFound: !!img,
          imgSrc: img ? img.src : null,
          imgCurrentSrc: img ? img.currentSrc : null,
          naturalWidth: img ? img.naturalWidth : null,
          naturalHeight: img ? img.naturalHeight : null,
          imgOffsetWidth: img ? img.offsetWidth : null,
          imgOffsetHeight: img ? img.offsetHeight : null,
          parentWidth: parent ? parent.offsetWidth : null,
          parentHeight: parent ? parent.offsetHeight : null,
          parentClasses: parent ? parent.className : null,
          computedDisplay: img ? window.getComputedStyle(img).display : null,
          computedOpacity: img ? window.getComputedStyle(img).opacity : null,
          computedVisibility: img ? window.getComputedStyle(img).visibility : null,
          computedZIndex: img ? window.getComputedStyle(img).zIndex : null
        };
      })()
    `);

    console.log('Image Debug Info:', imgDebug);
    ws.close();
  } finally {
    chromeProc.kill();
    try { fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true }); } catch (e) {}
  }
}

main().catch(console.error);
