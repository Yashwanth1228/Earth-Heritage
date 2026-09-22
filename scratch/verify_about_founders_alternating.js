const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function runVerification() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromePort = 9690;
  const tempDir = path.join(os.tmpdir(), 'chrome_founders_alt_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + chromePort,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,1100',
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
        console.log('1. DESKTOP VIEWPORT (1440x1100) - ALTERNATING FOUNDER AUDIT');
        console.log('========================================================');

        await send('Emulation.setDeviceMetricsOverride', {
          width: 1440,
          height: 1100,
          deviceScaleFactor: 1,
          mobile: false
        });

        await send('Page.navigate', { url: `http://localhost:${PORT}/about` });
        await new Promise(r => setTimeout(r, 3000));

        // Scroll to Row 1 (Sathish)
        await send('Runtime.evaluate', {
          expression: `(() => {
            const articles = document.querySelectorAll('#founders article');
            if (articles[0]) articles[0].scrollIntoView({ behavior: 'instant', block: 'center' });
          })()`
        });
        await new Promise(r => setTimeout(r, 1000));

        const desktopAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const sec = document.getElementById('founders');
            if (!sec) return { error: 'Founders section not found' };

            const articles = Array.from(sec.querySelectorAll('article'));
            const results = articles.map(art => {
              const h3 = art.querySelector('h3');
              const role = art.querySelector('span.font-mono');
              const img = art.querySelector('img');
              const textDiv = h3.closest('.space-y-6');

              const imgRect = img ? img.getBoundingClientRect() : null;
              const textRect = textDiv ? textDiv.getBoundingClientRect() : null;

              return {
                name: h3?.textContent.trim(),
                role: role?.textContent.trim(),
                imgSrc: img?.currentSrc || img?.src,
                imgNaturalWidth: img?.naturalWidth,
                imgNaturalHeight: img?.naturalHeight,
                imgRenderedWidth: imgRect?.width,
                imgRenderedHeight: imgRect?.height,
                imgLeft: imgRect?.left,
                textLeft: textRect?.left,
                isImageLeftOfText: imgRect && textRect ? imgRect.left < textRect.left : null
              };
            });

            return {
              heading: sec.querySelector('h2')?.textContent.trim(),
              articleCount: articles.length,
              founders: results,
              row1ImageOnLeft: results[0]?.isImageLeftOfText === true,
              row2ImageOnRight: results[1]?.isImageLeftOfText === false,
              matchingImageDimensions: results.length === 2 &&
                Math.abs(results[0].imgRenderedWidth - results[1].imgRenderedWidth) < 2 &&
                Math.abs(results[0].imgRenderedHeight - results[1].imgRenderedHeight) < 2
            };
          })()`,
          returnByValue: true
        });

        console.log('Desktop Alternating Audit:');
        console.log(JSON.stringify(desktopAudit.result.value, null, 2));

        // Screenshot Row 1 (Sathish)
        const shotRow1 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'about_founders_alt_desktop_row1.png'), Buffer.from(shotRow1.data, 'base64'));
        console.log('Saved: about_founders_alt_desktop_row1.png');

        // Scroll down to Khushi (Row 2)
        await send('Runtime.evaluate', {
          expression: `(() => {
            const articles = document.querySelectorAll('#founders article');
            if (articles[1]) articles[1].scrollIntoView({ behavior: 'instant', block: 'center' });
          })()`
        });
        await new Promise(r => setTimeout(r, 1000));

        // Screenshot Row 2 (Khushi)
        const shotRow2 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'about_founders_alt_desktop_row2.png'), Buffer.from(shotRow2.data, 'base64'));
        console.log('Saved: about_founders_alt_desktop_row2.png');

        console.log('========================================================');
        console.log('2. MOBILE VIEWPORT (390x844) - STACKED FOUNDER AUDIT');
        console.log('========================================================');

        await send('Emulation.setDeviceMetricsOverride', {
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true
        });
        await new Promise(r => setTimeout(r, 1000));

        // Scroll to #founders on mobile
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

            const articles = Array.from(sec.querySelectorAll('article'));
            const results = articles.map(art => {
              const h3 = art.querySelector('h3');
              const img = art.querySelector('img');
              const textDiv = h3.closest('.space-y-6');

              const imgRect = img ? img.getBoundingClientRect() : null;
              const textRect = textDiv ? textDiv.getBoundingClientRect() : null;

              return {
                name: h3?.textContent.trim(),
                imgTop: imgRect?.top,
                textTop: textRect?.top,
                isImageAboveText: imgRect && textRect ? imgRect.top < textRect.top : null,
                imgWidth: imgRect?.width,
                imgHeight: imgRect?.height
              };
            });

            const waBtn = document.querySelector('a[aria-label*="WhatsApp"]');
            const enqBtn = document.querySelector('button[aria-label*="Enquire"], div[class*="fixed"] button');

            return {
              articleCount: articles.length,
              founders: results,
              row1ImageAboveText: results[0]?.isImageAboveText === true,
              row2ImageAboveText: results[1]?.isImageAboveText === true,
              hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
            };
          })()`,
          returnByValue: true
        });

        console.log('Mobile Stacked Audit:');
        console.log(JSON.stringify(mobileAudit.result.value, null, 2));

        // Screenshot Mobile Row 1
        const mobileShot1 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'about_founders_alt_mobile_row1.png'), Buffer.from(mobileShot1.data, 'base64'));
        console.log('Saved: about_founders_alt_mobile_row1.png');

        // Scroll to Row 2 on mobile
        await send('Runtime.evaluate', {
          expression: `(() => {
            const articles = document.querySelectorAll('#founders article');
            if (articles[1]) articles[1].scrollIntoView({ behavior: 'instant', block: 'start' });
          })()`
        });
        await new Promise(r => setTimeout(r, 1000));

        // Screenshot Mobile Row 2
        const mobileShot2 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'about_founders_alt_mobile_row2.png'), Buffer.from(mobileShot2.data, 'base64'));
        console.log('Saved: about_founders_alt_mobile_row2.png');

        console.log('ALL VERIFICATIONS AND SCREENSHOTS COMPLETED!');
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
