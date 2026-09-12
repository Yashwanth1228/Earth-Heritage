const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

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

async function testViewport(width, height, label) {
  const tempDir = path.join(os.tmpdir(), 'chrome_mobile_' + label + '_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const port = 9230 + Math.floor(Math.random() * 50);
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    `--user-data-dir=${tempDir}`,
    `--window-size=${width},${height}`,
    'http://localhost:3000'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 25; i++) {
      await sleep(300);
      try {
        const targets = await httpGet(`http://127.0.0.1:${port}/json/list`);
        if (targets && targets.length > 0) {
          const pageTarget = targets.find(t => t.type === 'page');
          if (pageTarget) { target = pageTarget; break; }
        }
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

    await send('Runtime.enable');
    await send('Page.enable');
    await sleep(2200);

    // Check horizontal overflow at top
    const topCheck = await evaluate(`
      (() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth
        };
      })()
    `);
    console.log(`[${label}] Top Overflow Check:`, topCheck);

    // Scroll past hero
    await send('Input.dispatchMouseEvent', {
      type: 'mouseWheel',
      x: width / 2,
      y: height / 2,
      deltaX: 0,
      deltaY: 1000
    });
    await sleep(1000);

    // Check visibility and positions of buttons
    const btnCheck = await evaluate(`
      (() => {
        const wa = document.querySelector('button[aria-label="Contact Earth Heritage on WhatsApp"], a[aria-label="Contact Earth Heritage on WhatsApp"]');
        const enq = document.querySelector('button[aria-label="Open Earth Heritage enquiry form"]');
        
        const waRect = wa ? wa.getBoundingClientRect() : null;
        const enqRect = enq ? enq.getBoundingClientRect() : null;
        
        let overlaps = false;
        if (waRect && enqRect) {
          overlaps = !(waRect.right < enqRect.left || 
                       waRect.left > enqRect.right || 
                       waRect.bottom < enqRect.top || 
                       waRect.top > enqRect.bottom);
        }

        return {
          waVisible: !!wa && window.getComputedStyle(wa.closest('.fixed')).visibility !== 'hidden',
          enqVisible: !!enq && window.getComputedStyle(enq.closest('.fixed')).visibility !== 'hidden',
          overlaps,
          waRect: waRect ? { right: waRect.right, bottom: waRect.bottom, width: waRect.width } : null,
          enqRect: enqRect ? { left: enqRect.left, right: enqRect.right, bottom: enqRect.bottom } : null
        };
      })()
    `);
    console.log(`[${label}] Buttons Check:`, btnCheck);

    // Open modal
    await evaluate(`
      (() => {
        const btn = document.querySelector('button[aria-label="Open Earth Heritage enquiry form"]');
        if (btn) btn.click();
      })()
    `);
    await sleep(600);

    // Check modal sizing on mobile
    const modalCheck = await evaluate(`
      (() => {
        const modal = document.querySelector('div[role="dialog"]');
        const panel = modal ? modal.querySelector('.relative.w-full.max-w-lg') : null;
        const panelRect = panel ? panel.getBoundingClientRect() : null;
        return {
          modalOpen: !!modal,
          bodyOverflow: document.body.style.overflow,
          panelHeight: panelRect ? panelRect.height : 0,
          windowHeight: window.innerHeight,
          fitsViewport: panelRect ? panelRect.height <= window.innerHeight : false
        };
      })()
    `);
    console.log(`[${label}] Modal Mobile Check:`, modalCheck);

    // Screenshot on mobile
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const shotPath = `C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c\\scratch\\mobile_${label}.png`;
    fs.writeFileSync(shotPath, Buffer.from(shot.data, 'base64'));
    console.log(`[${label}] Saved screenshot to:`, shotPath);

    ws.close();
  } finally {
    chromeProc.kill();
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

async function run() {
  console.log('=== Running Mobile Viewport Verification ===');
  await testViewport(390, 844, '390x844_iPhone12');
  await testViewport(375, 812, '375x812_iPhoneX');
  console.log('=== Mobile Viewport Verification Complete ===');
}

run().catch(console.error);
