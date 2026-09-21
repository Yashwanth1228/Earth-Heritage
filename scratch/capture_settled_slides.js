const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function captureSettledSlides() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9666;
  const tempDir = path.join(os.tmpdir(), 'chrome_settled_' + Date.now());
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

        // Slide 1 - after 2.5s it is fully settled
        const shot1 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('scratch/settled_slide1_stacked.png', Buffer.from(shot1.data, 'base64'));
        console.log('Saved scratch/settled_slide1_stacked.png');

        // Check button metrics for slide 1
        const s1Btns = await send('Runtime.evaluate', {
          expression: `(() => {
            const btns = Array.from(document.querySelectorAll('#hero a, #hero button')).filter(b => b.textContent.includes('Discover') || b.textContent.includes('Talk to Us'));
            return btns.map(b => {
              const r = b.getBoundingClientRect();
              return { text: b.textContent.trim(), width: r.width, height: r.height, top: r.top, left: r.left };
            });
          })()`,
          returnByValue: true
        });
        console.log('Slide 1 buttons:', s1Btns.result.value);

        // Wait until Slide 3 is displayed and settled (each slide is 6s)
        console.log('Waiting for Slide 3 to become active and settled...');
        for (let i = 0; i < 25; i++) {
          await new Promise(r => setTimeout(r, 1000));
          const text = await send('Runtime.evaluate', {
            expression: `document.getElementById('hero')?.textContent || ''`,
            returnByValue: true
          });
          if (text.result.value.includes('You Own the Land')) {
            console.log('Slide 3 detected! Waiting 2s for text animation to settle...');
            await new Promise(r => setTimeout(r, 2000));
            const shot3 = await send('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync('scratch/settled_slide3_stacked.png', Buffer.from(shot3.data, 'base64'));
            console.log('Saved scratch/settled_slide3_stacked.png');

            const s3Btns = await send('Runtime.evaluate', {
              expression: `(() => {
                const btns = Array.from(document.querySelectorAll('#hero a, #hero button')).filter(b => b.textContent.includes('How It Works') || b.textContent.includes('Talk to Us'));
                return btns.map(b => {
                  const r = b.getBoundingClientRect();
                  return { text: b.textContent.trim(), width: r.width, height: r.height, top: r.top, left: r.left };
                });
              })()`,
              returnByValue: true
            });
            console.log('Slide 3 buttons:', s3Btns.result.value);
            break;
          }
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

captureSettledSlides();
