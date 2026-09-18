const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function runDetailedQa() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9595;
  const tempDir = path.join(os.tmpdir(), 'chrome_qa_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,1000',
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

        const qaReport = {};

        // Helper to evaluate script in page
        const evalScript = async (expression) => {
          const res = await send('Runtime.evaluate', {
            expression,
            returnByValue: true
          });
          return res.result ? res.result.value : null;
        };

        // --- 1. Audit Home (/) at 1440px Desktop ---
        console.log('--- Checking / on Desktop (1440x900) ---');
        await send('Emulation.setDeviceMetricsOverride', {
          width: 1440,
          height: 900,
          deviceScaleFactor: 1,
          mobile: false
        });

        await send('Page.navigate', { url: 'http://localhost:3000/' });
        await new Promise(r => setTimeout(r, 2500));

        // Check 8 sections existence
        const sectionsData = await evalScript(`
          (() => {
            const ids = [
              'home-hero',
              'brand-intro',
              'core-model',
              'managed-farmland-offering',
              'our-approach',
              'land-to-legacy',
              'founders-story',
              'home-cta'
            ];
            return ids.map(id => {
              const el = document.getElementById(id);
              if (!el) return { id, found: false };
              const rect = el.getBoundingClientRect();
              return {
                id,
                found: true,
                tagName: el.tagName,
                height: rect.height,
                width: rect.width,
                navbarTheme: el.getAttribute('data-navbar-theme'),
                heading: el.querySelector('h1, h2')?.textContent?.trim() || ''
              };
            });
          })()
        `);
        qaReport.sections = sectionsData;
        console.log('Sections detected:', sectionsData);

        // Check Floating Navbar on initial load
        const initialNavbar = await evalScript(`
          (() => {
            const header = document.querySelector('header');
            if (!header) return { found: false };
            const pill = header.querySelector('div.rounded-full');
            const logo = header.querySelector('img[alt*="Earth Heritage"]');
            const talkBtn = header.querySelector('button');
            const links = Array.from(header.querySelectorAll('nav a')).map(a => ({ text: a.textContent.trim(), href: a.getAttribute('href') }));
            const isVisible = window.getComputedStyle(header).opacity !== '0' && window.getComputedStyle(header).visibility !== 'hidden';
            return {
              found: true,
              isVisible,
              pillClasses: pill?.className,
              hasLogo: !!logo,
              logoSrc: logo?.src,
              talkBtnText: talkBtn?.textContent?.trim(),
              links
            };
          })()
        `);
        qaReport.initialNavbar = initialNavbar;
        console.log('Initial Navbar:', initialNavbar);

        // Check Floating Controls initial state (at top of hero)
        const initialFloatingControls = await evalScript(`
          (() => {
            const wa = document.querySelector('a[href*="wa.me"], a[href*="whatsapp.com"], a[aria-label*="WhatsApp"]');
            const eq = document.querySelector('button[aria-label*="Enquire"], button[aria-label*="enquiry"]');
            const getVisibility = el => {
              if (!el) return { found: false };
              const style = window.getComputedStyle(el);
              return {
                found: true,
                opacity: style.opacity,
                visibility: style.visibility,
                display: style.display,
                pointerEvents: style.pointerEvents,
                transform: style.transform
              };
            };
            return {
              whatsApp: getVisibility(wa),
              enquiryNow: getVisibility(eq)
            };
          })()
        `);
        qaReport.initialFloatingControls = initialFloatingControls;
        console.log('Initial Floating Controls (hero):', initialFloatingControls);

        // Scroll down past hero to test Navbar theme change and Floating Controls appearance
        await evalScript(`window.scrollTo(0, 1200);`);
        await new Promise(r => setTimeout(r, 1200));

        const midScrollNavbarAndControls = await evalScript(`
          (() => {
            const header = document.querySelector('header');
            const pill = header?.querySelector('div.rounded-full');
            const isDark = pill?.className.includes('bg-[#0e2114]');
            const wa = document.querySelector('a[href*="wa.me"], a[href*="whatsapp.com"], a[aria-label*="WhatsApp"]');
            const eq = document.querySelector('button[aria-label*="Enquire"], button[aria-label*="enquiry"]');
            const getVis = el => {
              if (!el) return { found: false };
              const style = window.getComputedStyle(el);
              return {
                found: true,
                opacity: style.opacity,
                visibility: style.visibility,
                transform: style.transform,
                pointerEvents: style.pointerEvents
              };
            };
            return {
              scrollY: window.scrollY,
              navbarThemeIsDark: isDark,
              whatsApp: getVis(wa),
              enquiryNow: getVis(eq)
            };
          })()
        `);
        qaReport.midScrollNavbarAndControls = midScrollNavbarAndControls;
        console.log('Mid scroll (1200px) navbar & controls:', midScrollNavbarAndControls);

        // Scroll to footer to test footer hiding behavior for floating enquiry
        await evalScript(`window.scrollTo(0, document.body.scrollHeight);`);
        await new Promise(r => setTimeout(r, 1200));

        const footerScrollControls = await evalScript(`
          (() => {
            const wa = document.querySelector('a[href*="wa.me"], a[href*="whatsapp.com"], a[aria-label*="WhatsApp"]');
            const eq = document.querySelector('button[aria-label*="Enquire"], button[aria-label*="enquiry"]');
            const footer = document.querySelector('footer');
            const getVis = el => {
              if (!el) return { found: false };
              const style = window.getComputedStyle(el);
              return {
                found: true,
                opacity: style.opacity,
                visibility: style.visibility,
                transform: style.transform
              };
            };
            return {
              hasFooter: !!footer,
              whatsApp: getVis(wa),
              enquiryNow: getVis(eq)
            };
          })()
        `);
        qaReport.footerScrollControls = footerScrollControls;
        console.log('At footer controls:', footerScrollControls);

        // Check Content Integrity on /
        const contentIntegrity = await evalScript(`
          (() => {
            const bodyText = document.body.innerText;
            return {
              hasTitledLandOwnership: bodyText.includes('titled land ownership'),
              hasTitledPropertyOwnership: bodyText.includes('titled property ownership'),
              hasLegallyRegisteredTitled: bodyText.includes('Legally registered titled property ownership'),
              hasRegisteredPropertyTitled: bodyText.includes('REGISTERED PROPERTY TITLED TO OWNER'),
              hasCorporateHomeEyebrow: bodyText.includes('Corporate Home'),
              hasExecutivePortraitSlot: bodyText.includes('Executive Portrait Slot'),
              hasOfficialPhotographyOf: bodyText.includes('Official photography of'),
              hasGuaranteedYields: bodyText.toLowerCase().includes('guaranteed yield') || bodyText.toLowerCase().includes('guaranteed return'),
              hasPvtLtd: bodyText.includes('Earth Heritage Pvt. Ltd.'),
              foundersSectionCtaHref: document.querySelector('#founders-story a')?.getAttribute('href')
            };
          })()
        `);
        qaReport.contentIntegrity = contentIntegrity;
        console.log('Content Integrity Findings:', contentIntegrity);

        // --- 2. Responsive QA across 1440, 1024, 768, 390 ---
        const viewports = [1440, 1024, 768, 390];
        qaReport.responsive = {};

        for (const vp of viewports) {
          await send('Emulation.setDeviceMetricsOverride', {
            width: vp,
            height: 900,
            deviceScaleFactor: 1,
            mobile: vp <= 768
          });
          await send('Page.navigate', { url: 'http://localhost:3000/' });
          await new Promise(r => setTimeout(r, 2000));

          const vpCheck = await evalScript(`
            (() => {
              const docWidth = document.documentElement.scrollWidth;
              const winWidth = window.innerWidth;
              const hasHorizontalOverflow = docWidth > winWidth;
              const header = document.querySelector('header');
              const mobileMenuBtn = header?.querySelector('button[aria-label*="mobile" i], button[aria-label*="Open mobile" i]');
              const desktopNav = header?.querySelector('nav');
              return {
                viewport: ${vp},
                docWidth,
                winWidth,
                hasHorizontalOverflow,
                overflowDiff: docWidth - winWidth,
                hasMobileMenuBtn: !!mobileMenuBtn,
                mobileBtnVisible: mobileMenuBtn ? window.getComputedStyle(mobileMenuBtn).display !== 'none' : false,
                desktopNavVisible: desktopNav ? window.getComputedStyle(desktopNav).display !== 'none' : false
              };
            })()
          `);
          qaReport.responsive[vp] = vpCheck;
          console.log(`Responsive check ${vp}px:`, vpCheck);
        }

        // Capture mobile screenshot of Hero and Model
        await send('Emulation.setDeviceMetricsOverride', {
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true
        });
        await send('Page.navigate', { url: 'http://localhost:3000/' });
        await new Promise(r => setTimeout(r, 2000));

        const mobileHeroShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'qa_mobile_hero.png'), Buffer.from(mobileHeroShot.data, 'base64'));

        // Scroll to Model on mobile
        await evalScript(`document.getElementById('core-model')?.scrollIntoView({ behavior: 'instant' });`);
        await new Promise(r => setTimeout(r, 1000));
        const mobileModelShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'qa_mobile_model.png'), Buffer.from(mobileModelShot.data, 'base64'));

        // --- 3. Check /lp/managed-farmland (Landing Page Protection) ---
        console.log('--- Checking /lp/managed-farmland ---');
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
            const expectedSections = [
              'hero',
              'statement',
              'solution',
              'management-sequence',
              'how-it-works',
              'principles',
              'responsibility',
              'experience',
              'founders',
              'faq',
              'cta'
            ];
            const sectionStatus = expectedSections.map(id => {
              const el = document.getElementById(id);
              return { id, found: !!el };
            });
            const allFound = sectionStatus.every(s => s.found);
            const header = document.querySelector('header');
            const initialHeaderVisible = header ? window.getComputedStyle(header).opacity !== '0' && window.getComputedStyle(header).visibility !== 'hidden' : false;
            return {
              url: window.location.href,
              all11SectionsPresent: allFound,
              sectionStatus,
              initialHeaderHiddenOnHero: !initialHeaderVisible,
              hasFooter: !!document.querySelector('footer')
            };
          })()
        `);
        qaReport.landingPageProtection = lpCheck;
        console.log('Landing page protection check:', lpCheck);

        // Save report to file
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'qa_audit_data.json'), JSON.stringify(qaReport, null, 2));
        console.log('Saved qa_audit_data.json successfully.');

        ws.close();
        p.kill();
        process.exit(0);
      } catch (err) {
        console.error('Error during QA:', err);
        p.kill();
        process.exit(1);
      }
    });
  });
}

runDetailedQa();
