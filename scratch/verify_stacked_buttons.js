const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function verifyStackedButtons() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9665;
  const tempDir = path.join(os.tmpdir(), 'chrome_btn_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=390,844',
    'http://localhost:3000/'
  ]);
  await new Promise(r => setTimeout(r, 2500));

  http.get(`http://127.0.0.1:${port}/json/list`, res => {
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

        await send('Emulation.setDeviceMetricsOverride', {
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true
        });

        await send('Page.navigate', { url: 'http://localhost:3000/' });
        await new Promise(r => setTimeout(r, 3000));

        // 1. Inspect Slide 1 Buttons
        const slide1BtnInfo = await send('Runtime.evaluate', {
          expression: `(() => {
            const hero = document.getElementById('hero');
            if (!hero) return { error: 'No hero' };
            const btns = Array.from(hero.querySelectorAll('a[href^="#"], a[href^="/"], button')).filter(el => {
              const txt = el.textContent.trim().toUpperCase();
              return txt.includes('DISCOVER') || txt.includes('HOW IT WORKS') || txt.includes('EXPLORE') || txt.includes('OUR PHILOSOPHY') || txt.includes('TALK TO US');
            });
            return btns.map(b => {
              const r = b.getBoundingClientRect();
              const comp = window.getComputedStyle(b);
              return {
                text: b.textContent.trim(),
                top: r.top,
                bottom: r.bottom,
                left: r.left,
                width: r.width,
                height: r.height,
                backgroundColor: comp.backgroundColor,
                color: comp.color,
                borderRadius: comp.borderRadius
              };
            });
          })()`,
          returnByValue: true
        });
        console.log('=== SLIDE 1 BUTTONS (MOBILE 390x844) ===');
        console.log(JSON.stringify(slide1BtnInfo.result.value, null, 2));

        const shot1 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('scratch/verified_slide1_stacked_buttons.png', Buffer.from(shot1.data, 'base64'));
        console.log('Saved scratch/verified_slide1_stacked_buttons.png');

        // 2. Advance to Slide 3 ("You Own the Land. We Manage the Farm.")
        // Wait until Slide 3 is active or let timer advance
        console.log('Waiting for slides to rotate to Slide 3 (The Partnership / How It Works)...');
        let slide3Reached = false;
        for (let i = 0; i < 20; i++) {
          await new Promise(r => setTimeout(r, 1000));
          const currentTitle = await send('Runtime.evaluate', {
            expression: `document.getElementById('hero')?.textContent.includes('You Own the Land')`,
            returnByValue: true
          });
          if (currentTitle.result.value) {
            slide3Reached = true;
            console.log('Slide 3 active after ' + (i + 1) + 's!');
            break;
          }
        }

        if (slide3Reached) {
          const slide3BtnInfo = await send('Runtime.evaluate', {
            expression: `(() => {
              const hero = document.getElementById('hero');
              const btns = Array.from(hero.querySelectorAll('a[href^="#"], a[href^="/"], button')).filter(el => {
                const txt = el.textContent.trim().toUpperCase();
                return txt.includes('HOW IT WORKS') || txt.includes('TALK TO US');
              });
              return btns.map(b => {
                const r = b.getBoundingClientRect();
                const comp = window.getComputedStyle(b);
                return {
                  text: b.textContent.trim(),
                  top: r.top,
                  bottom: r.bottom,
                  left: r.left,
                  width: r.width,
                  height: r.height,
                  backgroundColor: comp.backgroundColor,
                  color: comp.color
                };
              });
            })()`,
            returnByValue: true
          });
          console.log('=== SLIDE 3 BUTTONS (MOBILE 390x844) ===');
          console.log(JSON.stringify(slide3BtnInfo.result.value, null, 2));

          const shot3 = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync('scratch/verified_slide3_stacked_buttons.png', Buffer.from(shot3.data, 'base64'));
          console.log('Saved scratch/verified_slide3_stacked_buttons.png');
        } else {
          console.log('Slide 3 not reached in window; captured current slide');
        }

        p.kill();
        process.exit(0);
      } catch (err) {
        console.error(err);
        p.kill();
        process.exit(1);
      }
    });
  });
}

verifyStackedButtons();
