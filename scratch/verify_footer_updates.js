const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function runAudit() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromePort = 9686;
  const tempDir = path.join(os.tmpdir(), 'chrome_footer_' + Date.now());
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

        console.log('====================================================');
        console.log('1. DESKTOP VIEWPORT (1440x900) - FOOTER AUDIT');
        console.log('====================================================');

        await send('Page.navigate', { url: `http://localhost:${PORT}/` });
        await new Promise(r => setTimeout(r, 3000));

        // Scroll to very bottom to trigger WhatsApp button and see footer
        await send('Runtime.evaluate', {
          expression: `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });`
        });
        await new Promise(r => setTimeout(r, 2000));

        const desktopAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const footer = document.querySelector('footer');
            if (!footer) return { error: 'Footer not found' };

            // Check Connect column
            const headings = Array.from(footer.querySelectorAll('h4'));
            const connectH4 = headings.find(h => h.textContent.trim().toLowerCase() === 'connect');
            const connectCol = connectH4 ? connectH4.parentElement : null;
            const connectText = connectCol ? connectCol.textContent : '';

            // Check if any old modal inquiry buttons exist
            const buttons = Array.from(footer.querySelectorAll('button'));
            const oldButtons = buttons.filter(b => 
              b.textContent.includes('Begin a Conversation') ||
              b.textContent.includes('Talk to Earth Heritage') ||
              b.textContent.includes('Farm Management Inquiry')
            ).map(b => b.textContent.trim());

            // Check copyright and privacy policy
            const copyP = Array.from(footer.querySelectorAll('p')).find(p => p.textContent.includes('All rights reserved'));
            const privacyLink = footer.querySelector('a[href="/privacy-policy"]');
            const whatsappBtn = document.querySelector('a[aria-label*="WhatsApp"]');

            const copyStyle = copyP ? window.getComputedStyle(copyP) : null;
            const privacyStyle = privacyLink ? window.getComputedStyle(privacyLink) : null;

            const copyRect = copyP ? copyP.getBoundingClientRect() : null;
            const privacyRect = privacyLink ? privacyLink.getBoundingClientRect() : null;
            const waRect = whatsappBtn ? whatsappBtn.getBoundingClientRect() : null;

            // Check overlap between privacyLink and WhatsApp button
            let overlaps = false;
            if (privacyRect && waRect) {
              overlaps = !(
                privacyRect.right < waRect.left ||
                privacyRect.left > waRect.right ||
                privacyRect.bottom < waRect.top ||
                privacyRect.top > waRect.bottom
              );
            }

            return {
              connectText: connectText.replace(/\\s+/g, ' ').trim(),
              hasAddress: connectText.includes('Samruddi') || connectText.includes('Nagarbhavi') || connectText.includes('560091'),
              hasPhone: connectText.includes('99020 96969'),
              hasEmail: connectText.includes('earthheritageit@gmail.com'),
              oldButtonsFound: oldButtons,
              copyrightText: copyP ? copyP.textContent.trim() : null,
              copyrightFontSize: copyStyle ? copyStyle.fontSize : null,
              copyrightFontWeight: copyStyle ? copyStyle.fontWeight : null,
              privacyText: privacyLink ? privacyLink.textContent.trim() : null,
              privacyFontSize: privacyStyle ? privacyStyle.fontSize : null,
              privacyFontWeight: privacyStyle ? privacyStyle.fontWeight : null,
              privacyRect: privacyRect ? { x: privacyRect.x, y: privacyRect.y, width: privacyRect.width, height: privacyRect.height, right: privacyRect.right } : null,
              whatsappRect: waRect ? { x: waRect.x, y: waRect.y, width: waRect.width, height: waRect.height, left: waRect.left } : null,
              distanceFromPrivacyToWaLeft: (privacyRect && waRect) ? (waRect.left - privacyRect.right) : null,
              overlapsWithWhatsApp: overlaps
            };
          })()`,
          returnByValue: true
        });

        console.log('DESKTOP AUDIT RESULT:', JSON.stringify(desktopAudit.result.value, null, 2));

        const desktopShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'footer_desktop_verified.png'), Buffer.from(desktopShot.data, 'base64'));
        console.log('Saved footer_desktop_verified.png');

        console.log('\n====================================================');
        console.log('2. MOBILE VIEWPORT (390x844) - FOOTER AUDIT');
        console.log('====================================================');

        await send('Emulation.setDeviceMetricsOverride', {
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true
        });

        await send('Page.navigate', { url: `http://localhost:${PORT}/` });
        await new Promise(r => setTimeout(r, 2500));

        await send('Runtime.evaluate', {
          expression: `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });`
        });
        await new Promise(r => setTimeout(r, 2000));

        const mobileAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const footer = document.querySelector('footer');
            if (!footer) return { error: 'Footer not found' };

            const copyP = Array.from(footer.querySelectorAll('p')).find(p => p.textContent.includes('All rights reserved'));
            const privacyLink = footer.querySelector('a[href="/privacy-policy"]');
            const whatsappBtn = document.querySelector('a[aria-label*="WhatsApp"]');

            const copyStyle = copyP ? window.getComputedStyle(copyP) : null;
            const privacyStyle = privacyLink ? window.getComputedStyle(privacyLink) : null;

            const copyRect = copyP ? copyP.getBoundingClientRect() : null;
            const privacyRect = privacyLink ? privacyLink.getBoundingClientRect() : null;
            const waRect = whatsappBtn ? whatsappBtn.getBoundingClientRect() : null;

            let privacyOverlaps = false;
            if (privacyRect && waRect) {
              privacyOverlaps = !(
                privacyRect.right < waRect.left ||
                privacyRect.left > waRect.right ||
                privacyRect.bottom < waRect.top ||
                privacyRect.top > waRect.bottom
              );
            }

            let copyOverlaps = false;
            if (copyRect && waRect) {
              copyOverlaps = !(
                copyRect.right < waRect.left ||
                copyRect.left > waRect.right ||
                copyRect.bottom < waRect.top ||
                copyRect.top > waRect.bottom
              );
            }

            return {
              copyrightText: copyP ? copyP.textContent.trim() : null,
              copyrightFontSize: copyStyle ? copyStyle.fontSize : null,
              privacyText: privacyLink ? privacyLink.textContent.trim() : null,
              privacyFontSize: privacyStyle ? privacyStyle.fontSize : null,
              privacyRect: privacyRect ? { x: privacyRect.x, y: privacyRect.y, width: privacyRect.width, height: privacyRect.height, right: privacyRect.right } : null,
              whatsappRect: waRect ? { x: waRect.x, y: waRect.y, width: waRect.width, height: waRect.height, left: waRect.left } : null,
              privacyOverlapsWithWhatsApp: privacyOverlaps,
              copyOverlapsWithWhatsApp: copyOverlaps
            };
          })()`,
          returnByValue: true
        });

        console.log('MOBILE AUDIT RESULT:', JSON.stringify(mobileAudit.result.value, null, 2));

        console.log('\n====================================================');
        console.log('3. SMALL MOBILE VIEWPORT (360x740) - FOOTER AUDIT');
        console.log('====================================================');

        await send('Emulation.setDeviceMetricsOverride', {
          width: 360,
          height: 740,
          deviceScaleFactor: 2,
          mobile: true
        });

        await send('Page.navigate', { url: `http://localhost:${PORT}/` });
        await new Promise(r => setTimeout(r, 2000));

        await send('Runtime.evaluate', {
          expression: `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });`
        });
        await new Promise(r => setTimeout(r, 1500));

        const smallMobileAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const footer = document.querySelector('footer');
            if (!footer) return { error: 'Footer not found' };

            const copyP = Array.from(footer.querySelectorAll('p')).find(p => p.textContent.includes('All rights reserved'));
            const privacyLink = footer.querySelector('a[href="/privacy-policy"]');
            const whatsappBtn = document.querySelector('a[aria-label*="WhatsApp"]');

            const copyRect = copyP ? copyP.getBoundingClientRect() : null;
            const privacyRect = privacyLink ? privacyLink.getBoundingClientRect() : null;
            const waRect = whatsappBtn ? whatsappBtn.getBoundingClientRect() : null;

            let privacyOverlaps = false;
            if (privacyRect && waRect) {
              privacyOverlaps = !(
                privacyRect.right < waRect.left ||
                privacyRect.left > waRect.right ||
                privacyRect.bottom < waRect.top ||
                privacyRect.top > waRect.bottom
              );
            }

            return {
              privacyRect,
              waRect,
              privacyOverlapsWithWhatsApp: privacyOverlaps,
              gapBetweenWaAndPrivacyX: (privacyRect && waRect) ? (waRect.left - privacyRect.right) : null
            };
          })()`,
          returnByValue: true
        });

        console.log('SMALL MOBILE (360x740) AUDIT RESULT:', JSON.stringify(smallMobileAudit.result.value, null, 2));

        p.kill();
        process.exit(0);
      } catch (err) {
        console.error('Audit error:', err);
        p.kill();
        process.exit(1);
      }
    });
  });
}

runAudit();
