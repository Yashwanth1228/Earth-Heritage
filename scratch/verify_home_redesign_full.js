const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function runAudit() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9695;
  const tempDir = path.join(os.tmpdir(), 'chrome_redesign_' + Date.now());
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

        await send('Page.enable');
        await send('Runtime.enable');

        console.log('=== 1. AUDITING 4 VIEWPORTS (1440px, 1024px, 768px, 390px) ===');
        const viewports = [
          { name: 'desktop_1440', width: 1440, height: 900, mobile: false },
          { name: 'tablet_1024', width: 1024, height: 800, mobile: false },
          { name: 'tablet_768', width: 768, height: 1024, mobile: true },
          { name: 'mobile_390', width: 390, height: 844, mobile: true }
        ];

        for (const vp of viewports) {
          await send('Emulation.setDeviceMetricsOverride', {
            width: vp.width,
            height: vp.height,
            deviceScaleFactor: 1,
            mobile: vp.mobile
          });
          await new Promise(r => setTimeout(r, 800));

          const metrics = await send('Runtime.evaluate', {
            expression: `({
              scrollWidth: document.documentElement.scrollWidth,
              clientWidth: document.documentElement.clientWidth,
              innerWidth: window.innerWidth,
              hasOverflow: document.documentElement.scrollWidth > window.innerWidth
            })`,
            returnByValue: true
          });

          const val = (metrics.result && metrics.result.value) || metrics.value || {};
          console.log(`[${vp.name}] Width=${vp.width}, scrollWidth=${val.scrollWidth}, hasOverflow=${val.hasOverflow}`);
        }

        // Reset to desktop 1440
        await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
        await new Promise(r => setTimeout(r, 500));

        console.log('\n=== 2. AUDITING SECTION BACKGROUND COLORS & NAVBAR THEMES ===');
        const sectionAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const sections = [
              { id: 'hero', name: '01 Hero' },
              { id: 'about-overview', name: '02 About' },
              { id: 'managed-farmland-overview', name: '03 Managed Farmland' },
              { id: 'how-it-works-overview', name: '04 How It Works' },
              { id: 'field-stories', name: '05 Stories' },
              { id: 'community-events', name: '06 Events' },
              { id: 'home-faq', name: '07 FAQ' },
              { id: 'contact-location', name: '08 Contact & Location' }
            ];

            return sections.map(s => {
              const el = document.getElementById(s.id);
              if (!el) return { ...s, found: false };
              const comp = window.getComputedStyle(el);
              return {
                ...s,
                found: true,
                bg: comp.backgroundColor,
                color: comp.color,
                navbarTheme: el.getAttribute('data-navbar-theme'),
                rect: { top: Math.round(el.getBoundingClientRect().top + window.scrollY), height: Math.round(el.offsetHeight) }
              };
            });
          })()`,
          returnByValue: true
        });

        const sVal = (sectionAudit.result && sectionAudit.result.value) || sectionAudit.value;
        console.log(JSON.stringify(sVal, null, 2));

        console.log('\n=== 3. AUDITING FAQ ACCORDION INTERACTION ===');
        const faqTest = await send('Runtime.evaluate', {
          expression: `(() => {
            const btn1 = document.getElementById('faq-btn-0');
            const btn2 = document.getElementById('faq-btn-1');
            const initialOpen = btn1 ? btn1.getAttribute('aria-expanded') : null;
            if (btn2) btn2.click();
            const afterClickSecond = btn2 ? btn2.getAttribute('aria-expanded') : null;
            const firstAfterClick = btn1 ? btn1.getAttribute('aria-expanded') : null;
            return { initialOpen, afterClickSecond, firstAfterClick };
          })()`,
          returnByValue: true
        });
        const fVal = (faqTest.result && faqTest.result.value) || faqTest.value;
        console.log('FAQ interaction test:', fVal);

        console.log('\n=== 4. AUDITING ENQUIRY FORM & MAP EMBED IN SECTION 08 ===');
        const contactAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const form = document.querySelector('#contact-location form');
            const nameInput = document.getElementById('home-name');
            const phoneInput = document.getElementById('home-phone');
            const emailInput = document.getElementById('home-email');
            const interestSelect = document.getElementById('home-interest');
            const msgInput = document.getElementById('home-message');
            const iframe = document.querySelector('#contact-location iframe');
            return {
              formPresent: !!form,
              namePresent: !!nameInput,
              phonePresent: !!phoneInput,
              emailPresent: !!emailInput,
              interestPresent: !!interestSelect,
              msgPresent: !!msgInput,
              mapIframePresent: !!iframe,
              mapSrcValid: iframe ? iframe.src.includes('google.com/maps/embed') : false
            };
          })()`,
          returnByValue: true
        });
        const cVal = (contactAudit.result && contactAudit.result.value) || contactAudit.value;
        console.log('Contact & Location audit:', cVal);

        console.log('\n=== 5. CAPTURING SECTION VISUAL SCREENSHOTS ===');
        // Capture each section below hero
        const sectionsToCapture = [
          { id: 'about-overview', file: 'redesign_sec02_about.png' },
          { id: 'managed-farmland-overview', file: 'redesign_sec03_managed_farmland.png' },
          { id: 'how-it-works-overview', file: 'redesign_sec04_how_it_works.png' },
          { id: 'field-stories', file: 'redesign_sec05_stories.png' },
          { id: 'community-events', file: 'redesign_sec06_events.png' },
          { id: 'home-faq', file: 'redesign_sec07_faq.png' },
          { id: 'contact-location', file: 'redesign_sec08_contact_location.png' }
        ];

        for (const item of sectionsToCapture) {
          const scrollRes = await send('Runtime.evaluate', {
            expression: `(() => {
              const el = document.getElementById('${item.id}');
              if (el) {
                el.scrollIntoView({ behavior: 'instant', block: 'start' });
                return { found: true, top: el.offsetTop };
              }
              return { found: false };
            })()`,
            returnByValue: true
          });

          await new Promise(r => setTimeout(r, 600));
          const shot = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(path.join(ARTIFACT_DIR, item.file), Buffer.from(shot.data, 'base64'));
          console.log(`✓ Saved ${item.file}`);
        }

        console.log('\n=== 6. VERIFYING /lp/managed-farmland IS UNCHANGED ===');
        await send('Page.navigate', { url: 'http://localhost:3000/lp/managed-farmland' });
        await new Promise(r => setTimeout(r, 2000));
        const lpAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            return {
              heroPresent: !!document.getElementById('hero'),
              solutionPresent: !!document.getElementById('solution'),
              modelPresent: !!document.getElementById('model'),
              faqPresent: !!document.getElementById('faq'),
              title: document.title
            };
          })()`,
          returnByValue: true
        });
        const lVal = (lpAudit.result && lpAudit.result.value) || lpAudit.value;
        console.log('LP audit:', lVal);

        console.log('\n=== ALL AUDIT CHECKS COMPLETED SUCCESSFULLY ===');
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

runAudit();
