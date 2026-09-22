const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function runAudit() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromePort = 9689;
  const tempDir = path.join(os.tmpdir(), 'chrome_footer_col_' + Date.now());
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
        console.log('1. DESKTOP VIEWPORT (1440x900) - FOOTER COLUMNS AUDIT');
        console.log('====================================================');

        await send('Page.navigate', { url: `http://localhost:${PORT}/` });
        await new Promise(r => setTimeout(r, 3000));

        await send('Runtime.evaluate', {
          expression: `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });`
        });
        await new Promise(r => setTimeout(r, 1500));

        const footerAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const footer = document.querySelector('footer');
            if (!footer) return { error: 'Footer not found' };

            const columnHeadings = Array.from(footer.querySelectorAll('h4')).map(h => {
              const parent = h.parentElement;
              const links = Array.from(parent.querySelectorAll('a, address')).map(l => ({
                text: l.textContent.replace(/\\s+/g, ' ').trim(),
                href: l.getAttribute ? l.getAttribute('href') : null
              }));
              return {
                heading: h.textContent.trim(),
                links
              };
            });

            const allFooterText = footer.textContent;
            const hasFarmManagement = allFooterText.includes('Farm Management');

            return {
              columnHeadings,
              hasFarmManagementTextInFooter: hasFarmManagement
            };
          })()`,
          returnByValue: true
        });

        console.log('FOOTER COLUMNS AUDIT RESULT:', JSON.stringify(footerAudit.result.value, null, 2));

        const desktopShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'footer_columns_updated_desktop.png'), Buffer.from(desktopShot.data, 'base64'));
        console.log('Saved footer_columns_updated_desktop.png');

        console.log('\n====================================================');
        console.log('2. REDIRECT AUDIT: /farm-management');
        console.log('====================================================');

        await send('Page.navigate', { url: `http://localhost:${PORT}/farm-management` });
        await new Promise(r => setTimeout(r, 2000));

        const redirectAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            return {
              currentUrl: window.location.href,
              pathname: window.location.pathname,
              pageTitle: document.title
            };
          })()`,
          returnByValue: true
        });
        console.log('REDIRECT AUDIT RESULT:', JSON.stringify(redirectAudit.result.value, null, 2));

        console.log('\n====================================================');
        console.log('3. MOBILE VIEWPORT (390x844) - FOOTER COLUMNS AUDIT');
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
        await new Promise(r => setTimeout(r, 1500));

        const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'footer_columns_updated_mobile.png'), Buffer.from(mobileShot.data, 'base64'));
        console.log('Saved footer_columns_updated_mobile.png');

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
