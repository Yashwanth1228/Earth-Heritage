const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function verify() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9690;
  const tempDir = path.join(os.tmpdir(), 'chrome_qa_verify_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,900',
    'http://localhost:3000/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  http.get(`http://127.0.0.1:${port}/json/list`, (res) => {
    let d = ''; res.on('data', c => d += c);
    res.on('end', async () => {
      try {
        const targets = JSON.parse(d);
        const page = targets.find(t => t.type === 'page');
        const ws = new WebSocket(page.webSocketDebuggerUrl);
        await new Promise(r => ws.addEventListener('open', r, { once: true }));

        let id = 1;
        const send = (method, params = {}) => new Promise(resolve => {
          const myId = id++;
          const h = (e) => {
            const msg = JSON.parse(e.data);
            if (msg.id === myId) {
              ws.removeEventListener('message', h);
              resolve(msg.result);
            }
          };
          ws.addEventListener('message', h);
          ws.send(JSON.stringify({ id: myId, method, params }));
        });

        const consoleMessages = [];
        ws.addEventListener('message', (e) => {
          const msg = JSON.parse(e.data);
          if (msg.method === 'Runtime.consoleAPICalled') {
            consoleMessages.push({
              type: msg.params.type,
              args: msg.params.args.map(a => a.value || a.description)
            });
          }
        });

        await send('Page.enable');
        await send('Runtime.enable');
        await send('DOM.enable');

        await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
        await send('Page.navigate', { url: 'http://localhost:3000/' });

        // Wait for page to render and hydrate
        await new Promise(r => setTimeout(r, 3000));

        // 1. Check hero attributes
        const heroCheck = await send('Runtime.evaluate', {
          expression: `(() => {
            const hero = document.getElementById('hero');
            return {
              exists: Boolean(hero),
              roledescription: hero ? hero.getAttribute('aria-roledescription') : null,
              slidesCount: document.querySelectorAll('#hero img').length,
              headline: hero ? (hero.querySelector('h1') || hero.querySelector('h2'))?.innerText : null
            };
          })()`,
          returnByValue: true
        });

        // 2. Check HomeContactLocation select options
        const selectCheck = await send('Runtime.evaluate', {
          expression: `(() => {
            const select = document.getElementById('home-interest');
            if (!select) return null;
            const options = Array.from(select.querySelectorAll('option')).map(o => ({
              value: o.value,
              text: o.innerText
            }));
            return {
              exists: true,
              optionsCount: options.length,
              options
            };
          })()`,
          returnByValue: true
        });

        // Capture Home hero screenshot
        const shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'home_landing_hero_1440.png'), Buffer.from(shot.data, 'base64'));

        // Scroll down to contact section to ensure it rendered without errors
        await send('Runtime.evaluate', {
          expression: `(() => {
            const contact = document.getElementById('contact-location');
            if (contact) contact.scrollIntoView({ behavior: 'instant' });
          })()`
        });
        await new Promise(r => setTimeout(r, 1000));

        const keyErrors = consoleMessages.filter(m => 
          m.type === 'error' || 
          m.type === 'warning' ||
          m.args.some(a => typeof a === 'string' && a.includes('key'))
        );

        const result = {
          heroCheck: heroCheck.result.value,
          selectCheck: selectCheck.result.value,
          consoleMessagesCount: consoleMessages.length,
          keyErrors,
          allConsoleMessages: consoleMessages
        };

        console.log('VERIFICATION RESULT:', JSON.stringify(result, null, 2));
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'console_error_fix_report.json'), JSON.stringify(result, null, 2));

        ws.close();
        p.kill();
        process.exit(0);
      } catch (e) {
        console.error('Error during verification:', e);
        p.kill();
        process.exit(1);
      }
    });
  }).on('error', (err) => {
    console.error('Connection error:', err);
    p.kill();
    process.exit(1);
  });
}

verify();
