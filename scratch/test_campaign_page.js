const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function runCampaignQA() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9460;
  const tempDir = path.join(os.tmpdir(), 'chrome_camp_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,1100',
    'http://localhost:3000/lp/managed-farmland'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  http.get(`http://127.0.0.1:${port}/json/list`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
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
      await send('DOM.enable');

      console.log('=== TESTING /lp/managed-farmland ===');
      await send('Page.navigate', { url: 'http://localhost:3000/lp/managed-farmland' });
      await new Promise(r => setTimeout(r, 2000));

      const viewports = [
        { name: 'desktop', width: 1440, height: 1100 },
        { name: 'tablet', width: 768, height: 1024 },
        { name: 'mobile', width: 390, height: 844 }
      ];

      for (const vp of viewports) {
        await send('Emulation.setDeviceMetricsOverride', {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: vp.name === 'mobile' ? 2 : 1,
          mobile: vp.name === 'mobile'
        });
        await new Promise(r => setTimeout(r, 600));

        const audit = await send('Runtime.evaluate', {
          expression: `(() => {
            const hasCorporateNav = !!document.querySelector('header[aria-label="Earth Heritage Corporate Navigation"]');
            const hasCorporateFooter = !!document.querySelector('footer[aria-label="Earth Heritage Corporate Footer"]');
            const hasCampaignHeader = !!document.querySelector('header');
            const hasCampaignFooter = !!document.querySelector('footer');
            const h1 = document.querySelector('h1')?.innerText || '';
            const sections = Array.from(document.querySelectorAll('section')).map(s => s.getAttribute('aria-label') || s.id);
            const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth;

            return {
              viewport: "${vp.name} (${vp.width}x${vp.height})",
              hasCorporateNav,
              hasCorporateFooter,
              hasCampaignHeader,
              hasCampaignFooter,
              h1,
              sectionCount: sections.length,
              sections,
              overflow,
              scrollWidth: document.documentElement.scrollWidth,
              clientWidth: document.documentElement.clientWidth
            };
          })()`,
          returnByValue: true
        });

        console.log(`[Viewport: ${vp.name}]`, audit.result.value);

        const shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, `lp_managed_farmland_${vp.name}.png`), Buffer.from(shot.data, 'base64'));
      }

      console.log('\n=== TESTING HOMEPAGE / PRESERVATION ===');
      await send('Page.navigate', { url: 'http://localhost:3000/' });
      await new Promise(r => setTimeout(r, 2000));

      await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
      const homeAudit = await send('Runtime.evaluate', {
        expression: `(() => {
          const hasCorporateNav = !!document.querySelector('header[aria-label="Earth Heritage Corporate Navigation"]');
          const hasCorporateFooter = !!document.querySelector('footer[aria-label="Earth Heritage Corporate Footer"]');
          const heroH1 = document.querySelector('h1')?.innerText || '';
          const sections = document.querySelectorAll('section').length;
          const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth;
          return { hasCorporateNav, hasCorporateFooter, heroH1, sections, overflow };
        })()`,
        returnByValue: true
      });
      console.log('[/ Homepage Check]', homeAudit.result.value);

      ws.close();
      p.kill();
      try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
      process.exit(0);
    });
  });
}

runCampaignQA().catch(console.error);
