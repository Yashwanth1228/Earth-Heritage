const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_USER_DATA = path.join(os.tmpdir(), 'chrome_cdp_mobile_update_' + Date.now());

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
  if (!fs.existsSync(TEMP_USER_DATA)) fs.mkdirSync(TEMP_USER_DATA, { recursive: true });

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9322',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${TEMP_USER_DATA}`,
    '--window-size=375,750',
    'http://localhost:3000/'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 30; i++) {
      await sleep(300);
      try {
        const targets = await httpGet('http://127.0.0.1:9322/json/list');
        if (targets && targets.length > 0) {
          const pageTarget = targets.find(t => t.type === 'page');
          if (pageTarget) {
            target = pageTarget;
            break;
          }
        }
      } catch (e) {}
    }

    const ws = new globalThis.WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve, { once: true });
      ws.addEventListener('error', reject, { once: true });
    });

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === id) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await send('DOM.enable');

    await send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 750,
      deviceScaleFactor: 2,
      mobile: true
    });

    // Wait 3.5 seconds so slide 1 animation completes
    await sleep(3500);
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'mobile_hero_slide1_clean.png'), Buffer.from(shot1.data, 'base64'));
    console.log('Saved mobile_hero_slide1_clean.png');

    // Wait for slide 4 (at ~18-20s mark)
    console.log('Waiting for slide 4 rotation (~16s)...');
    await sleep(16500);

    const shot4 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'mobile_hero_slide4_clean.png'), Buffer.from(shot4.data, 'base64'));
    console.log('Saved mobile_hero_slide4_clean.png');

    const metrics = await send('Runtime.evaluate', {
      expression: `(() => {
        const h1 = document.querySelector('#hero h1');
        const lines = Array.from(h1 ? h1.querySelectorAll('span.block') : []);
        const btns = document.querySelectorAll('#hero button, #hero a[href="#statement"]');
        const btnArray = Array.from(btns).filter(b => b.innerText.includes('CONTACT') || b.innerText.includes('DISCOVER'));
        return {
          windowWidth: window.innerWidth,
          lines: lines.map(l => {
            const rect = l.getBoundingClientRect();
            return {
              text: l.innerText.replace(/\\n/g, ' '),
              left: rect.left,
              right: rect.right,
              width: rect.width,
              isOverflowing: rect.right > window.innerWidth
            };
          }),
          buttonsStacked: btnArray.length >= 2 ? btnArray[1].getBoundingClientRect().top > btnArray[0].getBoundingClientRect().bottom - 2 : false,
          buttons: btnArray.map(b => ({
            text: b.innerText,
            top: b.getBoundingClientRect().top,
            bottom: b.getBoundingClientRect().bottom,
            width: b.getBoundingClientRect().width
          }))
        };
      })()`,
      returnByValue: true
    });

    console.log('Metrics:', JSON.stringify(metrics.result.value, null, 2));

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chromeProc.kill();
    try { fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true }); } catch (e) {}
  }
}

main();
