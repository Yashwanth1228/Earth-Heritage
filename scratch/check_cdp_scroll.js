const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const os = require('os');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_USER_DATA = path.join(os.tmpdir(), 'chrome_cdp_diag_' + Date.now());

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
  if (!fs.existsSync(TEMP_USER_DATA)) fs.mkdirSync(TEMP_USER_DATA, { recursive: true });

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    `--user-data-dir=${TEMP_USER_DATA}`,
    '--window-size=1440,900',
    'about:blank'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 20; i++) {
      await sleep(300);
      try {
        const targets = await httpGet('http://127.0.0.1:9223/json/list');
        if (targets && targets.length > 0) { target = targets[0]; break; }
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
      return res.result?.value;
    }

    await send('Page.enable');
    await send('Runtime.enable');

    console.log('Navigating to http://localhost:3000 ...');
    const loadPromise = new Promise(resolve => {
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Page.loadEventFired') {
          resolve();
        }
      };
      ws.addEventListener('message', handler);
    });
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await loadPromise;
    console.log('Page loaded!');
    await sleep(2000); // Allow hydration

    const diag1 = await evaluate(`
      (() => {
        return {
          scrollY: window.scrollY,
          docScrollTop: document.documentElement.scrollTop,
          hasLenis: !!window.__lenis,
          lenisScroll: window.__lenis ? window.__lenis.scroll : null,
          bodyHeight: document.body.scrollHeight,
          windowHeight: window.innerHeight
        };
      })()
    `);
    console.log('Diag before scroll:', diag1);

    // Try scrolling with multiple methods
    await evaluate(`
      (() => {
        window.scrollTo(0, 1000);
        document.documentElement.scrollTop = 1000;
        document.body.scrollTop = 1000;
        if (window.__lenis) {
          window.__lenis.scrollTo(1000, { immediate: true });
        }
        window.dispatchEvent(new Event('scroll'));
      })()
    `);
    await sleep(500);

    const diag2 = await evaluate(`
      (() => {
        const hero = document.getElementById('hero');
        const heroRect = hero ? hero.getBoundingClientRect() : null;
        return {
          scrollY: window.scrollY,
          docScrollTop: document.documentElement.scrollTop,
          heroRectBottom: heroRect ? heroRect.bottom : null,
          hasHero: !!hero
        };
      })()
    `);
    console.log('Diag after scroll:', diag2);

    ws.close();
  } finally {
    chromeProc.kill();
    try { fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true }); } catch (e) {}
  }
}

main().catch(console.error);
