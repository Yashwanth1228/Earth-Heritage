const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function runVerification() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9675;
  const tempDir = path.join(os.tmpdir(), 'chrome_verif_' + Date.now());
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
        await send('DOM.enable');

        const report = {};

        // Helper to evaluate script
        const evalScript = async (expr) => {
          const res = await send('Runtime.evaluate', {
            expression: expr,
            returnByValue: true
          });
          return res.result ? res.result.value : null;
        };

        console.log('\n=== 1. VERIFYING 8 SECTIONS ON / ===');
        await send('Page.navigate', { url: 'http://localhost:3000/' });
        await new Promise(r => setTimeout(r, 2500));

        const sections = [
          { name: '01. HomeHero', id: 'hero' },
          { name: '02. HomeAbout', id: 'about-overview' },
          { name: '03. HomeManagedFarmland', id: 'managed-farmland-overview' },
          { name: '04. HomeHowItWorks', id: 'how-it-works-overview' },
          { name: '05. HomeStories', id: 'field-stories' },
          { name: '06. HomeEvents', id: 'community-events' },
          { name: '07. HomeFaq', id: 'home-faq' },
          { name: '08. HomeContactLocation', id: 'contact-location' }
        ];

        const secRes = await evalScript(`
          (() => {
            const ids = ['hero', 'about-overview', 'managed-farmland-overview', 'how-it-works-overview', 'field-stories', 'community-events', 'home-faq', 'contact-location'];
            return ids.map(id => {
              const el = document.getElementById(id);
              return {
                id,
                found: !!el,
                navbarTheme: el?.getAttribute('data-navbar-theme'),
                heading: el?.querySelector('h1, h2')?.textContent?.trim()
              };
            });
          })()
        `);
        report.sections = secRes;
        console.log('Sections status:', secRes);

        // Capture Desktop Screenshot of each section
        for (const s of sections) {
          await send('Runtime.evaluate', {
            expression: `
              const el = document.getElementById('${s.id}');
              if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
            `
          });
          await new Promise(r => setTimeout(r, 800));

          const shot = await send('Page.captureScreenshot', { format: 'png' });
          const shotName = `revised_home_${s.id}.png`;
          fs.writeFileSync(path.join(ARTIFACT_DIR, shotName), Buffer.from(shot.data, 'base64'));
          console.log(`Saved screenshot: ${shotName}`);
        }

        console.log('\n=== 2. VERIFYING FAQ ACCORDION INTERACTION ===');
        const faqBefore = await evalScript(`
          (() => {
            const btn0 = document.getElementById('faq-btn-0');
            const btn1 = document.getElementById('faq-btn-1');
            return {
              btn0Expanded: btn0?.getAttribute('aria-expanded'),
              btn1Expanded: btn1?.getAttribute('aria-expanded')
            };
          })()
        `);
        console.log('FAQ initial state:', faqBefore);

        // Click item 1 to expand
        await evalScript(`document.getElementById('faq-btn-1')?.click();`);
        await new Promise(r => setTimeout(r, 400));

        const faqAfter = await evalScript(`
          (() => {
            const btn0 = document.getElementById('faq-btn-0');
            const btn1 = document.getElementById('faq-btn-1');
            const ans1 = document.getElementById('faq-answer-1');
            return {
              btn0Expanded: btn0?.getAttribute('aria-expanded'),
              btn1Expanded: btn1?.getAttribute('aria-expanded'),
              ans1Content: ans1?.textContent?.trim()
            };
          })()
        `);
        console.log('FAQ after clicking item 1:', faqAfter);
        report.faqToggleSuccess = faqAfter.btn1Expanded === 'true' && faqAfter.btn0Expanded === 'false';

        console.log('\n=== 3. VERIFYING FLOATING CONTROLS ON SCROLL ===');
        // Scroll to middle of page
        await evalScript(`window.scrollTo(0, 2000);`);
        await new Promise(r => setTimeout(r, 1200));

        const controlsMidScroll = await evalScript(`
          (() => {
            const wa = document.querySelector('a[href*="wa.me"], a[href*="whatsapp.com"], a[aria-label*="WhatsApp"]');
            const eq = document.querySelector('button[aria-label*="Enquire"], button[aria-label*="enquiry"]');
            const getVis = el => {
              if (!el) return { found: false };
              const s = window.getComputedStyle(el);
              return { found: true, opacity: s.opacity, visibility: s.visibility, pointerEvents: s.pointerEvents };
            };
            return {
              scrollY: window.scrollY,
              whatsApp: getVis(wa),
              enquiryNow: getVis(eq)
            };
          })()
        `);
        console.log('Floating controls when scrolled (2000px):', controlsMidScroll);
        report.floatingControlsActive = controlsMidScroll.whatsApp.visibility === 'visible' && controlsMidScroll.enquiryNow.visibility === 'visible';

        console.log('\n=== 4. RESPONSIVE QA & OVERFLOW CHECKS (1440, 1024, 768, 390) ===');
        const viewports = [1440, 1024, 768, 390];
        report.responsive = {};

        for (const vp of viewports) {
          await send('Emulation.setDeviceMetricsOverride', {
            width: vp,
            height: 900,
            deviceScaleFactor: 1,
            mobile: vp <= 768
          });
          await send('Page.navigate', { url: 'http://localhost:3000/' });
          await new Promise(r => setTimeout(r, 1500));

          const resVp = await evalScript(`
            (() => {
              const docWidth = document.documentElement.scrollWidth;
              const winWidth = window.innerWidth;
              return {
                viewport: ${vp},
                docWidth,
                winWidth,
                hasOverflow: docWidth > winWidth,
                diff: docWidth - winWidth
              };
            })()
          `);
          report.responsive[vp] = resVp;
          console.log(`Viewport ${vp}px check:`, resVp);
        }

        // Capture Mobile Screenshot (390px)
        await send('Emulation.setDeviceMetricsOverride', {
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true
        });
        await send('Page.navigate', { url: 'http://localhost:3000/' });
        await new Promise(r => setTimeout(r, 2000));
        const mobHero = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'revised_home_mobile_hero.png'), Buffer.from(mobHero.data, 'base64'));

        console.log('\n=== 5. VERIFYING LANDING PAGE PROTECTION (/lp/managed-farmland) ===');
        await send('Emulation.setDeviceMetricsOverride', {
          width: 1440,
          height: 900,
          deviceScaleFactor: 1,
          mobile: false
        });
        await send('Page.navigate', { url: 'http://localhost:3000/lp/managed-farmland' });
        await new Promise(r => setTimeout(r, 2500));

        const lpCheck = await evalScript(`
          (() => {
            const expectedIds = ['hero', 'statement', 'responsibility', 'solution', 'management-sequence', 'how-it-works', 'philosophy', 'principles', 'founders', 'location', 'contact-cta'];
            const statuses = expectedIds.map(id => ({ id, present: !!document.getElementById(id) }));
            const hasFooter = !!document.querySelector('footer');
            return {
              all11Present: statuses.every(s => s.present),
              statuses,
              hasFooter
            };
          })()
        `);
        console.log('Landing page protection check:', lpCheck);
        report.landingPageProtection = lpCheck;

        console.log('\n=== 6. VERIFYING ALL CORPORATE ROUTES ===');
        const routesToTest = [
          '/about',
          '/managed-farmland',
          '/farm-management',
          '/how-it-works',
          '/projects',
          '/gallery',
          '/blogs',
          '/events',
          '/contact',
          '/lp/land-ownership'
        ];

        report.routes = {};
        for (const route of routesToTest) {
          await send('Page.navigate', { url: `http://localhost:3000${route}` });
          await new Promise(r => setTimeout(r, 1200));

          const pageInfo = await evalScript(`
            (() => {
              return {
                title: document.title,
                hasHeader: !!document.querySelector('header'),
                hasFooter: !!document.querySelector('footer')
              };
            })()
          `);
          report.routes[route] = pageInfo;
          console.log(`Route ${route}: Title = "${pageInfo.title}"`);
        }

        fs.writeFileSync(path.join(ARTIFACT_DIR, 'revised_home_qa_report.json'), JSON.stringify(report, null, 2));
        console.log('\nAll tests complete. Saved revised_home_qa_report.json.');

        ws.close();
        p.kill();
        process.exit(0);
      } catch (err) {
        console.error('Error during verification:', err);
        p.kill();
        process.exit(1);
      }
    });
  });
}

runVerification();
