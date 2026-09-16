const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const assert = require('assert');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_USER_DATA = path.join(os.tmpdir(), 'chrome_cdp_proj_redesign_' + Date.now());

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', reject);
  });
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

async function captureViewport(url, width, height, outputPath) {
  if (!fs.existsSync(TEMP_USER_DATA)) fs.mkdirSync(TEMP_USER_DATA, { recursive: true });

  const port = 9260 + Math.floor(Math.random() * 30);
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${TEMP_USER_DATA}`,
    `--window-size=${width},${height}`,
    url
  ]);

  try {
    let target = null;
    for (let i = 0; i < 30; i++) {
      await sleep(300);
      try {
        const targets = await httpGet(`http://127.0.0.1:${port}/json/list`);
        if (targets && targets.length > 0) {
          const pageTarget = targets.find(t => t.type === 'page');
          if (pageTarget) {
            target = pageTarget;
            break;
          }
        }
      } catch (e) {}
    }

    if (!target) throw new Error('Chrome target not found');

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
      if (res.exceptionDetails) {
        throw new Error(res.exceptionDetails.exception?.description || res.exceptionDetails.text);
      }
      return res.result?.value;
    }

    await send('Runtime.enable');
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 600
    });

    for (let i = 0; i < 30; i++) {
      const ready = await evaluate('document.readyState');
      if (ready === 'complete') break;
      await sleep(200);
    }
    await sleep(2500); // Settle fonts and animations

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outputPath, Buffer.from(shot.data, 'base64'));
    console.log(`✓ Screenshot saved: ${outputPath} (${width}x${height})`);

    ws.close();
  } finally {
    chromeProc.kill();
    try { fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true }); } catch (e) {}
  }
}

async function verify() {
  console.log('--- 1. Testing projects Data Integrity ---');
  const { projects } = require('../data/projects');
  assert.strictEqual(projects.length, 0, 'data/projects.js must remain strictly empty (length === 0)');
  console.log('✔ data/projects.js strictly verified: projects = [] (0 fake projects)');

  console.log('\n--- 2. Testing HTTP Endpoints & Content Transformation ---');
  const res = await fetchUrl('http://localhost:3000/projects');
  assert.strictEqual(res.statusCode, 200, 'Expected status 200 for /projects');
  const html = res.body;

  // New Editorial Exhibition assertions
  const requiredStrings = [
    'THE EARTH HERITAGE APPROACH',
    'Land is more than a place.',
    'It is something to own, care for, and build with purpose.',
    '01 — LAND',
    'Own the Land',
    'Explore Managed Farmland',
    '02 — CARE',
    'Care for the Farm',
    'See How It Works',
    '03 — PURPOSE',
    'Build a Legacy',
    'BACK TO ROOTS. FORWARD WITH PURPOSE.',
    'PROJECT PROFILES',
    'Project stories will be shared here as Earth Heritage initiatives are ready to be officially presented.',
    'Have land you want to care for with purpose?',
    'Explore how Earth Heritage approaches managed farmland and ongoing farm care.',
    'Talk to Us'
  ];

  for (const str of requiredStrings) {
    assert(html.includes(str), `HTML missing required string: "${str}"`);
    console.log(`✔ Verified string present: "${str}"`);
  }

  // Verify OLD small card elements are gone
  assert(!html.includes('Our project portfolio is taking shape.'), 'Old heading "Our project portfolio is taking shape." should NOT exist');
  assert(!html.includes('PORTFOLIO STATUS'), 'Old badge "PORTFOLIO STATUS" should NOT exist');
  console.log('✔ Verified old small empty-state card is completely replaced');

  console.log('\n--- 3. Capturing Live Browser Visuals ---');
  const brainDir = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c\\scratch';
  if (!fs.existsSync(brainDir)) fs.mkdirSync(brainDir, { recursive: true });

  const desktopPath = path.join(brainDir, 'projects_editorial_desktop_1440.png');
  const mobilePath = path.join(brainDir, 'projects_editorial_mobile_390.png');

  console.log('Capturing Desktop View (1440x1080)...');
  await captureViewport('http://localhost:3000/projects', 1440, 1080, desktopPath);

  console.log('Capturing Mobile View (390x844)...');
  await captureViewport('http://localhost:3000/projects', 390, 844, mobilePath);

  console.log('\nALL TESTS AND VISUAL CAPTURES COMPLETED SUCCESSFULLY! 🎉');
}

verify().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
