const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function runVerification() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromePort = 9688;
  const tempDir = path.join(os.tmpdir(), 'chrome_founders_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + chromePort,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,900',
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

        console.log('========================================================');
        console.log('1. DESKTOP VIEWPORT (1440x900) - FOUNDERS AUDIT');
        console.log('========================================================');

        await send('Emulation.setDeviceMetricsOverride', {
          width: 1440,
          height: 1400,
          deviceScaleFactor: 1,
          mobile: false
        });

        await send('Page.navigate', { url: `http://localhost:${PORT}/about` });
        await new Promise(r => setTimeout(r, 3500));

        // Scroll to #founders
        await send('Runtime.evaluate', {
          expression: `(() => {
            const el = document.getElementById('founders');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
          })()`
        });
        await new Promise(r => setTimeout(r, 1000));

        const desktopAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const sec = document.getElementById('founders');
            if (!sec) return { error: 'Founders section not found' };

            const imgs = Array.from(sec.querySelectorAll('img')).map(img => {
              const rect = img.getBoundingClientRect();
              const parentRect = img.parentElement ? img.parentElement.getBoundingClientRect() : null;
              return {
                src: img.currentSrc || img.src,
                alt: img.alt,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                renderedWidth: rect.width,
                renderedHeight: rect.height,
                parentWidth: parentRect?.width,
                parentHeight: parentRect?.height,
                objectFit: window.getComputedStyle(img).objectFit,
                objectPosition: window.getComputedStyle(img).objectPosition
              };
            });

            const articles = Array.from(sec.querySelectorAll('article')).map(art => {
              const h3 = art.querySelector('h3');
              const role = art.querySelector('span.font-mono');
              const rect = art.getBoundingClientRect();
              return {
                name: h3?.textContent.trim(),
                role: role?.textContent.trim(),
                width: rect.width,
                height: rect.height,
                top: rect.top
              };
            });

            return {
              heading: sec.querySelector('h2')?.textContent.trim(),
              imageCount: imgs.length,
              images: imgs,
              articles: articles,
              equalVisualHeight: imgs.length === 2 && Math.abs(imgs[0].renderedHeight - imgs[1].renderedHeight) < 2
            };
          })()`,
          returnByValue: true
        });

        console.log('Desktop Founders Audit:');
        console.log(JSON.stringify(desktopAudit.result.value, null, 2));

        // Capture Desktop Screenshot
        const desktopShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'about_founders_desktop.png'), Buffer.from(desktopShot.data, 'base64'));
        console.log('Saved: about_founders_desktop.png');

        console.log('========================================================');
        console.log('2. MOBILE VIEWPORT (390x844) - FOUNDERS AUDIT');
        console.log('========================================================');

        await send('Emulation.setDeviceMetricsOverride', {
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true
        });
        await new Promise(r => setTimeout(r, 1000));

        await send('Runtime.evaluate', {
          expression: `(() => {
            const el = document.getElementById('founders');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
          })()`
        });
        await new Promise(r => setTimeout(r, 1000));

        const mobileAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const sec = document.getElementById('founders');
            if (!sec) return { error: 'Founders section not found' };

            const imgs = Array.from(sec.querySelectorAll('img')).map(img => {
              const rect = img.getBoundingClientRect();
              return {
                src: img.currentSrc || img.src,
                alt: img.alt,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                renderedWidth: rect.width,
                renderedHeight: rect.height
              };
            });

            const articles = Array.from(sec.querySelectorAll('article')).map(art => {
              const rect = art.getBoundingClientRect();
              return {
                name: art.querySelector('h3')?.textContent.trim(),
                width: rect.width,
                height: rect.height,
                top: rect.top
              };
            });

            return {
              imageCount: imgs.length,
              images: imgs,
              articles: articles,
              isStackedVertically: articles.length === 2 && articles[1].top > articles[0].top + articles[0].height * 0.5,
              hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
            };
          })()`,
          returnByValue: true
        });

        console.log('Mobile Founders Audit:');
        console.log(JSON.stringify(mobileAudit.result.value, null, 2));

        // Capture Mobile Screenshot
        const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'about_founders_mobile.png'), Buffer.from(mobileShot.data, 'base64'));
        console.log('Saved: about_founders_mobile.png');

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
