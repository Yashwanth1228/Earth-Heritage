const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DIR = path.join(os.tmpdir(), 'chrome_cdp_projects_' + Date.now());
fs.mkdirSync(DIR, { recursive: true });

const p = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9388', '--disable-gpu', '--no-first-run', '--user-data-dir=' + DIR, '--window-size=1280,1200', 'http://localhost:3000/projects']);

setTimeout(async () => {
  try {
    const list = await new Promise((res, rej) => http.get('http://127.0.0.1:9388/json/list', r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(JSON.parse(d)));
    }).on('error', rej));

    const target = list.find(t => t.type === 'page');
    const ws = new globalThis.WebSocket(target.webSocketDebuggerUrl);
    await new Promise(r => ws.addEventListener('open', r, { once: true }));

    let id = 1;
    const send = (m, params = {}) => new Promise(r => {
      const mid = id++;
      const h = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === mid) {
          ws.removeEventListener('message', h);
          r(msg.result);
        }
      };
      ws.addEventListener('message', h);
      ws.send(JSON.stringify({ id: mid, method: m, params }));
    });

    await send('Page.enable');
    await send('Runtime.enable');
    await new Promise(r => setTimeout(r, 2000));

    // 1. Desktop Screenshot
    const shotDesktop = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'projects_desktop.png'), Buffer.from(shotDesktop.data, 'base64'));
    console.log('Saved projects_desktop.png');

    // 2. Mobile Screenshot
    await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
    await new Promise(r => setTimeout(r, 1000));
    const shotMobile = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'projects_mobile.png'), Buffer.from(shotMobile.data, 'base64'));
    console.log('Saved projects_mobile.png');

    // 3. Inspect DOM for any fake projects
    const check = await send('Runtime.evaluate', {
      expression: `(() => {
        const text = document.body.innerText;
        return {
          hasConceptI: text.includes('Concept I'),
          hasConceptII: text.includes('Concept II'),
          hasConceptIII: text.includes('Concept III'),
          hasComingSoon: text.includes('COMING') && text.includes('SOON'),
          hasProjects2026: text.includes('PROJECTS · 2026') || text.includes('PROJECTS'),
          hasTalkToUs: text.includes('Talk to Us')
        };
      })()`,
      returnByValue: true
    });

    console.log('CHECK RESULTS:', JSON.stringify(check.result.value, null, 2));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    p.kill();
    try { fs.rmSync(DIR, { recursive: true, force: true }); } catch (e) {}
  }
}, 1500);
