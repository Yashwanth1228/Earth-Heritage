const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = path.resolve('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c');

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

async function capture() {
  const tempUserData = path.join(os.tmpdir(), 'chrome_cdp_marquee_' + Date.now());
  fs.mkdirSync(tempUserData, { recursive: true });
  const port = 9310;

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${tempUserData}`,
    '--window-size=1440,1100',
    'http://localhost:3000'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 40; i++) {
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

    if (!target) {
      throw new Error('Could not attach to Chrome CDP target');
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

    // ==========================================
    // 1. DESKTOP VIEWPORT (1440 x 950)
    // ==========================================
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 950,
      deviceScaleFactor: 1,
      mobile: false
    });

    await sleep(2500);

    // Get position of #field-stories
    const storiesRect = await evaluate(`
      (() => {
        const el = document.getElementById('field-stories');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: r.top + window.scrollY, height: r.height };
      })()
    `);
    console.log('Stories position (desktop):', storiesRect);

    if (storiesRect) {
      await evaluate(`window.scrollTo(0, ${storiesRect.top - 20})`);
      await sleep(1000);
      const shotStoriesDesk = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'home_stories_desktop_view.png'), Buffer.from(shotStoriesDesk.data, 'base64'));
      console.log('✓ Captured home_stories_desktop_view.png');

      // Scroll a bit further to capture Row 2 clearly
      await evaluate(`window.scrollTo(0, ${storiesRect.top + 320})`);
      await sleep(800);
      const shotStoriesRow2 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'home_stories_row2_photography_desktop.png'), Buffer.from(shotStoriesRow2.data, 'base64'));
      console.log('✓ Captured home_stories_row2_photography_desktop.png');
    }

    // Get position of #community-events
    const eventsRect = await evaluate(`
      (() => {
        const el = document.getElementById('community-events');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: r.top + window.scrollY, height: r.height };
      })()
    `);
    console.log('Events position (desktop):', eventsRect);

    if (eventsRect) {
      await evaluate(`window.scrollTo(0, ${eventsRect.top - 20})`);
      await sleep(1000);
      const shotEventsDesk = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'home_events_desktop_view.png'), Buffer.from(shotEventsDesk.data, 'base64'));
      console.log('✓ Captured home_events_desktop_view.png');
    }

    // Verify Horizontal Overflow on Desktop
    const deskOverflow = await evaluate(`
      (() => {
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;
        return {
          clientWidth: docWidth,
          scrollWidth: scrollWidth,
          bodyScrollWidth: bodyScrollWidth,
          hasOverflow: scrollWidth > docWidth || bodyScrollWidth > docWidth
        };
      })()
    `);
    console.log('Desktop 1440 overflow check:', deskOverflow);

    // ==========================================
    // 2. MOBILE VIEWPORT (390 x 844)
    // ==========================================
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(1500);

    const mobStoriesRect = await evaluate(`
      (() => {
        const el = document.getElementById('field-stories');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: r.top + window.scrollY, height: r.height };
      })()
    `);

    if (mobStoriesRect) {
      await evaluate(`window.scrollTo(0, ${mobStoriesRect.top - 10})`);
      await sleep(800);
      const shotMobStories = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'home_stories_mobile_view.png'), Buffer.from(shotMobStories.data, 'base64'));
      console.log('✓ Captured home_stories_mobile_view.png');
    }

    const mobEventsRect = await evaluate(`
      (() => {
        const el = document.getElementById('community-events');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: r.top + window.scrollY, height: r.height };
      })()
    `);

    if (mobEventsRect) {
      await evaluate(`window.scrollTo(0, ${mobEventsRect.top - 10})`);
      await sleep(800);
      const shotMobEvents = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'home_events_mobile_view.png'), Buffer.from(shotMobEvents.data, 'base64'));
      console.log('✓ Captured home_events_mobile_view.png');
    }

    // Verify Horizontal Overflow on Mobile
    const mobOverflow = await evaluate(`
      (() => {
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;
        return {
          clientWidth: docWidth,
          scrollWidth: scrollWidth,
          bodyScrollWidth: bodyScrollWidth,
          hasOverflow: scrollWidth > docWidth || bodyScrollWidth > docWidth
        };
      })()
    `);
    console.log('Mobile 390 overflow check:', mobOverflow);

    ws.close();
  } finally {
    chromeProc.kill();
    try { fs.rmSync(tempUserData, { recursive: true, force: true }); } catch (e) {}
  }
}

capture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
