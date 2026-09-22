const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function runVerification() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromePort = 9691;
  const tempDir = path.join(os.tmpdir(), 'chrome_founders_check_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + chromePort,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,1200',
    `http://localhost:${PORT}/about`
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

        await send('Emulation.setDeviceMetricsOverride', {
          width: 1440,
          height: 1200,
          deviceScaleFactor: 1,
          mobile: false
        });

        await send('Page.navigate', { url: `http://localhost:${PORT}/about` });
        await new Promise(r => setTimeout(r, 3000));

        // Scroll smoothly to trigger Framer Motion animations
        await send('Runtime.evaluate', {
          expression: `(async () => {
            window.scrollTo({ top: 600, behavior: 'smooth' });
            await new Promise(r => setTimeout(r, 800));
            const articles = document.querySelectorAll('#founders article');
            if (articles[0]) {
              articles[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          })()`
        });
        await new Promise(r => setTimeout(r, 2000));

        // Check Sathish image status
        const sathishImgStatus = await send('Runtime.evaluate', {
          expression: `(() => {
            const articles = document.querySelectorAll('#founders article');
            const img = articles[0]?.querySelector('img');
            return {
              src: img?.currentSrc || img?.src,
              naturalWidth: img?.naturalWidth,
              naturalHeight: img?.naturalHeight,
              complete: img?.complete
            };
          })()`,
          returnByValue: true
        });
        console.log('Sathish Image Status:', sathishImgStatus.result.value);

        // Screenshot Row 1 (Sathish)
        const shotRow1 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'about_sathish_centered_hd.png'), Buffer.from(shotRow1.data, 'base64'));
        console.log('Saved: about_sathish_centered_hd.png');

        // Now scroll to Khushi (Row 2)
        await send('Runtime.evaluate', {
          expression: `(async () => {
            const articles = document.querySelectorAll('#founders article');
            if (articles[1]) {
              articles[1].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          })()`
        });
        await new Promise(r => setTimeout(r, 2000));

        // Screenshot Row 2 (Khushi)
        const shotRow2 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'about_khushi_centered_hd.png'), Buffer.from(shotRow2.data, 'base64'));
        console.log('Saved: about_khushi_centered_hd.png');

        console.log('Verification completed successfully!');
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
