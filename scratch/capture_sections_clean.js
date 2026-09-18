const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function captureSectionsClean() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9645;
  const tempDir = path.join(os.tmpdir(), 'chrome_sections_clean_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,1050',
    'http://localhost:3000/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  http.get(`http://127.0.0.1:${port}/json/list`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      try {
        const targets = JSON.parse(data);
        const page = targets.find(t => t.type === 'page');
        const ws = new WebSocket(page.webSocketDebuggerUrl);

        let id = 1;
        const send = (method, params = {}) => new Promise(resolve => {
          const myId = id++;
          const handler = (e) => {
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

        await send('Page.navigate', { url: 'http://localhost:3000/' });
        await new Promise(r => setTimeout(r, 2500));

        const sections = [
          { name: '01_hero', id: 'home-hero' },
          { name: '02_intro', id: 'brand-intro' },
          { name: '03_model', id: 'core-model' },
          { name: '04_managed_farmland', id: 'managed-farmland-offering' },
          { name: '05_approach', id: 'our-approach' },
          { name: '06_journey', id: 'land-to-legacy' },
          { name: '07_founders', id: 'founders-story' },
          { name: '08_cta', id: 'home-cta' }
        ];

        for (const sec of sections) {
          const evalRes = await send('Runtime.evaluate', {
            expression: `
              (() => {
                const el = document.getElementById('${sec.id}');
                if (el) {
                  el.scrollIntoView({ behavior: 'instant', block: 'start' });
                  return { scrolled: true, top: el.getBoundingClientRect().top };
                }
                return { scrolled: false };
              })()
            `,
            returnByValue: true
          });
          console.log(`Scroll result for ${sec.name}:`, evalRes.result.value);
          await new Promise(r => setTimeout(r, 1000));

          const shot = await send('Page.captureScreenshot', { format: 'png' });
          const shotPath = path.join(ARTIFACT_DIR, `qa_section_${sec.name}.png`);
          fs.writeFileSync(shotPath, Buffer.from(shot.data, 'base64'));
          console.log(`Saved screenshot -> ${shotPath}`);
        }

        ws.close();
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

captureSectionsClean();
