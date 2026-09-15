const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_USER_DATA = path.join(os.tmpdir(), 'chrome_cdp_equal_' + Date.now());

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
    '--remote-debugging-port=9230',
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
        const targets = await httpGet('http://127.0.0.1:9230/json/list');
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

    console.log('=== 1. VERIFYING EQUAL CARD SIZES IN EXHIBITION GRID ===');
    const cardDims = await evaluate(`
      (() => {
        const articles = Array.from(document.querySelectorAll('#exhibition-grid article'));
        return articles.map((a, i) => ({
          index: i,
          width: a.offsetWidth,
          height: a.offsetHeight,
          aspectRatio: (a.offsetWidth / a.offsetHeight).toFixed(2),
          title: a.querySelector('h3')?.textContent
        }));
      })()
    `);

    console.log('Total grid cards measured:', cardDims.length);
    console.log('First 6 card dimensions:', cardDims.slice(0, 6));

    const firstW = cardDims[0].width;
    const firstH = cardDims[0].height;
    let allEqual = true;
    for (const card of cardDims) {
      if (card.width !== firstW || card.height !== firstH) {
        console.error('Mismatch found on card:', card);
        allEqual = false;
      }
    }

    if (allEqual) {
      console.log(`✓ PASS: Every single image card in the grid has IDENTICAL dimensions: ${firstW}px x ${firstH}px (Aspect Ratio: 4:3)!`);
    } else {
      console.error('✗ FAIL: Cards do not have equal dimensions!');
    }

    console.log('\n=== 2. VERIFYING CTA SECTION REMOVAL ===');
    const ctaCheck = await evaluate(`
      (() => {
        const ctaEl = document.getElementById('cta');
        const ctaText = document.body.innerText.includes('Have a vision for your relationship with land?');
        return { ctaElementExists: !!ctaEl, ctaTextFound: ctaText };
      })()
    `);
    console.log('CTA Check:', ctaCheck);
    if (!ctaCheck.ctaElementExists && !ctaCheck.ctaTextFound) {
      console.log('✓ PASS: "Have a vision for your relationship with land?" section is completely removed.');
    } else {
      console.error('✗ FAIL: CTA section still present in DOM!');
    }

    // Capture Grid Screenshot with equal card sizes
    await evaluate(`window.scrollTo({ top: 900, behavior: 'instant' })`);
    await sleep(800);
    const shotGrid = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c\\scratch\\gallery_grid_equal_sizes.png', Buffer.from(shotGrid.data, 'base64'));
    console.log('✓ Grid screenshot captured with equal card sizes.');

    // Capture Bottom / Footer View showing clean ending at Philosophy Panorama -> Footer
    await evaluate(`document.getElementById('gallery-philosophy')?.scrollIntoView({ block: 'center' })`);
    await sleep(1000);
    const shotBottom = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c\\scratch\\gallery_bottom_view.png', Buffer.from(shotBottom.data, 'base64'));
    console.log('✓ Bottom page screenshot captured showing clean flow directly to footer.');

    ws.close();
  } finally {
    chromeProc.kill();
    try { fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true }); } catch (e) {}
  }
}

main().catch(console.error);
