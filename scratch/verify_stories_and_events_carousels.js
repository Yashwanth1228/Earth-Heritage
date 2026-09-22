const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function runVerification() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromePort = 9687;
  const tempDir = path.join(os.tmpdir(), 'chrome_carousel_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + chromePort,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,900',
    `http://localhost:${PORT}/`
  ]);

  await new Promise(r => setTimeout(r, 2500));

  http.get(`http://127.0.0.1:${chromePort}/json/list`, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      try {
        const targets = JSON.parse(data);
        const page = targets.find(t => t.type === 'page');
        const ws = new WebSocket(page.webSocketDebuggerUrl);
        let id = 1;
        const send = (method, params = {}) => new Promise(resolve => {
          const myId = id++;
          const handler = e => {
            const msg = JSON.parse(e.data);
            if (msg.id === myId) {
              ws.removeEventListener('message', handler);
              resolve(msg.result);
            }
          };
          ws.addEventListener('message', handler);
          ws.send(JSON.stringify({ id: myId, method, params }));
        });

        await new Promise(r => ws.onopen = r);
        await send('Page.enable');
        await send('DOM.enable');

        console.log('========================================================');
        console.log('1. DESKTOP VIEWPORT (1440x900) - STORIES & EVENTS AUDIT');
        console.log('========================================================');

        await send('Emulation.setDeviceMetricsOverride', {
          width: 1440,
          height: 900,
          deviceScaleFactor: 1,
          mobile: false
        });

        await send('Page.navigate', { url: `http://localhost:${PORT}/` });
        await new Promise(r => setTimeout(r, 3000));

        // Scroll to Stories from the Ground section
        await send('Runtime.evaluate', {
          expression: `(() => {
            const el = document.getElementById('field-stories');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
          })()`
        });
        await new Promise(r => setTimeout(r, 1000));

        // Audit Stories Section
        const storiesAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const sec = document.getElementById('field-stories');
            if (!sec) return { error: 'Stories section not found' };

            const prevButtons = Array.from(sec.querySelectorAll('button[aria-label*="Previous"]'));
            const nextButtons = Array.from(sec.querySelectorAll('button[aria-label*="Next"]'));

            const tracks = Array.from(sec.querySelectorAll('.overflow-x-auto'));

            return {
              title: sec.querySelector('h2')?.textContent.trim(),
              prevButtonCount: prevButtons.length,
              nextButtonCount: nextButtons.length,
              prevButtonLabels: prevButtons.map(b => b.getAttribute('aria-label')),
              nextButtonLabels: nextButtons.map(b => b.getAttribute('aria-label')),
              trackCount: tracks.length,
              track1ScrollLeft: tracks[0]?.scrollLeft,
              track2ScrollLeft: tracks[1]?.scrollLeft
            };
          })()`,
          returnByValue: true
        });

        console.log('Stories Section Audit:', JSON.stringify(storiesAudit.value, null, 2));

        // Test clicking Next on Video Stories
        console.log('Clicking Next Video Story button...');
        await send('Runtime.evaluate', {
          expression: `(() => {
            const btn = document.querySelector('button[aria-label="Next video story"]');
            if (btn) btn.click();
          })()`
        });
        await new Promise(r => setTimeout(r, 800));

        const afterClickVideoNext = await send('Runtime.evaluate', {
          expression: `(() => {
            const sec = document.getElementById('field-stories');
            const tracks = Array.from(sec.querySelectorAll('.overflow-x-auto'));
            const counter = sec.querySelector('span.font-mono.font-bold');
            return {
              counterText: counter?.textContent.trim(),
              track1ScrollLeft: tracks[0]?.scrollLeft
            };
          })()`,
          returnByValue: true
        });
        console.log('After Video Next Click:', JSON.stringify(afterClickVideoNext.value, null, 2));

        // Take Desktop Screenshot of Stories
        const storiesDesktopShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'stories_ground_desktop.png'), Buffer.from(storiesDesktopShot.data, 'base64'));
        console.log('Saved: stories_ground_desktop.png');

        // Scroll to Moments on the Land section
        await send('Runtime.evaluate', {
          expression: `(() => {
            const el = document.getElementById('community-events');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
          })()`
        });
        await new Promise(r => setTimeout(r, 1000));

        // Audit Events Section
        const eventsAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const sec = document.getElementById('community-events');
            if (!sec) return { error: 'Events section not found' };

            const prevButtons = Array.from(sec.querySelectorAll('button[aria-label*="Previous"]'));
            const nextButtons = Array.from(sec.querySelectorAll('button[aria-label*="Next"]'));
            const track = sec.querySelector('.overflow-x-auto');
            const counter = sec.querySelector('span.font-mono.font-bold');

            return {
              title: sec.querySelector('h2')?.textContent.trim(),
              prevButtonCount: prevButtons.length,
              nextButtonCount: nextButtons.length,
              prevButtonLabels: prevButtons.map(b => b.getAttribute('aria-label')),
              nextButtonLabels: nextButtons.map(b => b.getAttribute('aria-label')),
              initialCounter: counter?.textContent.trim(),
              initialScrollLeft: track?.scrollLeft
            };
          })()`,
          returnByValue: true
        });
        console.log('Events Section Audit:', JSON.stringify(eventsAudit.value, null, 2));

        // Test clicking Next on Events
        console.log('Clicking Next Community Event button...');
        await send('Runtime.evaluate', {
          expression: `(() => {
            const btn = document.querySelector('button[aria-label="Next community event"]');
            if (btn) btn.click();
          })()`
        });
        await new Promise(r => setTimeout(r, 800));

        const afterClickEventsNext = await send('Runtime.evaluate', {
          expression: `(() => {
            const sec = document.getElementById('community-events');
            const track = sec.querySelector('.overflow-x-auto');
            const counter = sec.querySelector('span.font-mono.font-bold');
            return {
              counterText: counter?.textContent.trim(),
              scrollLeft: track?.scrollLeft
            };
          })()`,
          returnByValue: true
        });
        console.log('After Events Next Click:', JSON.stringify(afterClickEventsNext.value, null, 2));

        // Take Desktop Screenshot of Events
        const eventsDesktopShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'movements_land_desktop.png'), Buffer.from(eventsDesktopShot.data, 'base64'));
        console.log('Saved: movements_land_desktop.png');

        console.log('========================================================');
        console.log('2. MOBILE VIEWPORT (390x844) - RESPONSIVE DISPLAY AUDIT');
        console.log('========================================================');

        await send('Emulation.setDeviceMetricsOverride', {
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true
        });
        await new Promise(r => setTimeout(r, 1000));

        // Scroll to Stories in mobile
        await send('Runtime.evaluate', {
          expression: `(() => {
            const el = document.getElementById('field-stories');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
          })()`
        });
        await new Promise(r => setTimeout(r, 1000));

        const mobileStoriesAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const sec = document.getElementById('field-stories');
            const prevBtns = Array.from(sec.querySelectorAll('button[aria-label="Previous video story"], button[aria-label="Previous photo story"]'));
            const nextBtns = Array.from(sec.querySelectorAll('button[aria-label="Next video story"], button[aria-label="Next photo story"]'));

            const isVisible = (el) => {
              const rect = el.getBoundingClientRect();
              return rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';
            };

            return {
              visiblePrevButtons: prevBtns.filter(isVisible).length,
              visibleNextButtons: nextBtns.filter(isVisible).length,
              documentScrollWidth: document.documentElement.scrollWidth,
              windowInnerWidth: window.innerWidth,
              hasHorizontalPageOverflow: document.documentElement.scrollWidth > window.innerWidth
            };
          })()`,
          returnByValue: true
        });
        console.log('Mobile Stories Audit:', JSON.stringify(mobileStoriesAudit.value, null, 2));

        // Take Mobile Screenshot of Stories
        const storiesMobileShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'stories_ground_mobile.png'), Buffer.from(storiesMobileShot.data, 'base64'));
        console.log('Saved: stories_ground_mobile.png');

        // Scroll to Events in mobile
        await send('Runtime.evaluate', {
          expression: `(() => {
            const el = document.getElementById('community-events');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
          })()`
        });
        await new Promise(r => setTimeout(r, 1000));

        const mobileEventsAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const sec = document.getElementById('community-events');
            const prevBtn = sec.querySelector('button[aria-label="Previous community event"]');
            const nextBtn = sec.querySelector('button[aria-label="Next community event"]');

            const isVisible = (el) => {
              if (!el) return false;
              const rect = el.getBoundingClientRect();
              return rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';
            };

            return {
              prevVisible: isVisible(prevBtn),
              nextVisible: isVisible(nextBtn),
              hasHorizontalPageOverflow: document.documentElement.scrollWidth > window.innerWidth
            };
          })()`,
          returnByValue: true
        });
        console.log('Mobile Events Audit:', JSON.stringify(mobileEventsAudit.value, null, 2));

        // Test Next button click on mobile
        console.log('Clicking Next community event on Mobile...');
        await send('Runtime.evaluate', {
          expression: `(() => {
            const nextBtn = document.querySelector('button[aria-label="Next community event"]');
            if (nextBtn) nextBtn.click();
          })()`
        });
        await new Promise(r => setTimeout(r, 800));

        // Take Mobile Screenshot of Events
        const eventsMobileShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'movements_land_mobile.png'), Buffer.from(eventsMobileShot.data, 'base64'));
        console.log('Saved: movements_land_mobile.png');

        console.log('ALL VERIFICATIONS AND SCREENSHOTS COMPLETED SUCCESSFULLY!');
        ws.close();
        p.kill();
        process.exit(0);
      } catch (err) {
        console.error('Audit Error:', err);
        p.kill();
        process.exit(1);
      }
    });
  });
}

runVerification();
