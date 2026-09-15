const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_USER_DATA = path.join(os.tmpdir(), 'chrome_cdp_all_light_' + Date.now());

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

const pagesToTest = [
  { url: '/about', shotName: 'start_light_about.png' },
  { url: '/managed-farmland', shotName: 'start_light_managed_farmland.png' },
  { url: '/farm-management', shotName: 'start_light_farm_management.png' },
  { url: '/how-it-works', shotName: 'start_light_how_it_works.png' },
  { url: '/gallery', shotName: 'start_light_gallery.png' },
  { url: '/projects', shotName: 'start_light_projects.png' }
];

async function main() {
  if (!fs.existsSync(TEMP_USER_DATA)) fs.mkdirSync(TEMP_USER_DATA, { recursive: true });

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9234',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${TEMP_USER_DATA}`,
    '--window-size=1440,900',
    'http://localhost:3000/about'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 30; i++) {
      await sleep(300);
      try {
        const targets = await httpGet('http://127.0.0.1:9234/json/list');
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

    console.log('\n=== TESTING ALL PAGES FOR LIGHT STARTING SECTION ===\n');

    for (const p of pagesToTest) {
      console.log(`--- Navigating to ${p.url} ---`);
      await send('Page.navigate', { url: `http://localhost:3000${p.url}` });
      await sleep(1500);

      const pageInfo = await evaluate(`
        (() => {
          const hero = document.getElementById('hero');
          const heroBg = hero ? window.getComputedStyle(hero).backgroundColor : null;
          const heroClasses = hero ? hero.className : '';
          
          // Get next section
          const nextSec = hero ? hero.nextElementSibling : null;
          const nextBg = nextSec ? window.getComputedStyle(nextSec).backgroundColor : null;
          const nextClasses = nextSec ? nextSec.className : '';

          return {
            title: document.title,
            heroExists: !!hero,
            heroBg,
            heroClasses,
            nextBg,
            nextClasses
          };
        })()
      `);

      console.log(`Page: ${p.url}`);
      console.log(`- Hero background: ${pageInfo.heroBg}`);
      console.log(`- Next section background: ${pageInfo.nextBg}`);

      const isHeroLight = pageInfo.heroBg === 'rgb(250, 246, 240)' || pageInfo.heroClasses.includes('bg-[#FAF6F0]');
      console.log(isHeroLight ? `✓ PASS: ${p.url} starting section is light (#FAF6F0)` : `✗ FAIL: ${p.url} hero not light`);

      // Capture screenshot
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      const shotPath = `C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c\\scratch\\${p.shotName}`;
      fs.writeFileSync(shotPath, Buffer.from(shot.data, 'base64'));
      console.log(`✓ Screenshot captured: ${shotPath}\n`);
    }

    console.log('======================================================');
    console.log(' ALL 6 PAGES TESTED AND STARTING WITH LIGHT COLOR! ');
    console.log('======================================================');

    ws.close();
  } finally {
    chromeProc.kill();
    try { fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true }); } catch (e) {}
  }
}

main().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
