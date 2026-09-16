const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_USER_DATA = path.join(os.tmpdir(), 'chrome_cdp_nav_' + Date.now());
const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c\\scratch';

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(data); }
      });
    }).on('error', reject);
  });
}

async function main() {
  if (!fs.existsSync(TEMP_USER_DATA)) fs.mkdirSync(TEMP_USER_DATA, { recursive: true });
  if (!fs.existsSync(ARTIFACT_DIR)) fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9240',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${TEMP_USER_DATA}`,
    '--window-size=1440,900',
    'http://localhost:3000'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 30; i++) {
      await sleep(300);
      try {
        const targets = await httpGet('http://127.0.0.1:9240/json/list');
        if (targets && targets.length > 0) {
          const pageTarget = targets.find(t => t.type === 'page');
          if (pageTarget) {
            target = pageTarget;
            break;
          }
        }
      } catch (e) {}
    }

    if (!target) throw new Error('Chrome target not found');
    console.log('Target found:', target.url);

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    let msgId = 1;
    const pending = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await send('DOM.enable');

    async function evaluate(expression) {
      const res = await send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true
      });
      if (res.exceptionDetails) {
        throw new Error(JSON.stringify(res.exceptionDetails));
      }
      return res.result ? res.result.value : undefined;
    }

    async function captureScreenshot(filename) {
      const res = await send('Page.captureScreenshot', { format: 'png' });
      const buffer = Buffer.from(res.data, 'base64');
      const filepath = path.join(ARTIFACT_DIR, filename);
      fs.writeFileSync(filepath, buffer);
      console.log(`[Screenshot Captured] ${filepath} (${buffer.length} bytes)`);
      return filepath;
    }

    // Wait for initial render
    await sleep(2500);

    // =========================================================================
    // TEST 1: Inspect Navbar Items
    // =========================================================================
    console.log('\n--- TEST 1: Primary Navbar Items Inspection ---');
    const navItems = await evaluate(`
      (() => {
        const links = Array.from(document.querySelectorAll('nav[aria-label="Main Navigation"] a'));
        return links.map(l => ({ title: l.textContent.trim(), href: l.getAttribute('href') }));
      })()
    `);
    console.log('Desktop Navbar items:', navItems);

    const titles = navItems.map(n => n.title);
    const hasBlogs = titles.includes('Blogs');
    const hasEvents = titles.includes('Events');
    const hasInsights = titles.some(t => t.toLowerCase().includes('insights'));

    console.log('Blogs present:', hasBlogs);
    console.log('Events present:', hasEvents);
    console.log('Insights removed:', !hasInsights);

    if (!hasBlogs || !hasEvents || hasInsights) {
      throw new Error(`Navbar items validation failed! Items: ${JSON.stringify(titles)}`);
    }

    // =========================================================================
    // TEST 2: Hero Navbar Reveal Behavior (Landing /)
    // =========================================================================
    console.log('\n--- TEST 2: Hero Scroll Reveal Behavior ---');
    const heroNavbarState = await evaluate(`
      (() => {
        const header = document.querySelector('header');
        const pill = header ? header.querySelector('div.rounded-full') : null;
        const style = pill ? window.getComputedStyle(pill) : null;
        return {
          scrollY: window.scrollY,
          opacity: style ? style.opacity : null,
          visibility: style ? style.visibility : null
        };
      })()
    `);
    console.log('Navbar at top of hero (scrollY=0):', heroNavbarState);

    // Scroll past hero into light sections (e.g. scrollY = 900)
    await evaluate(`window.scrollTo({ top: 900, behavior: 'instant' })`);
    await sleep(600);

    const lightNavbarState = await evaluate(`
      (() => {
        const header = document.querySelector('header');
        const pill = header ? header.querySelector('div.rounded-full') : null;
        const firstLink = document.querySelector('nav[aria-label="Main Navigation"] a');
        const style = pill ? window.getComputedStyle(pill) : null;
        const linkStyle = firstLink ? window.getComputedStyle(firstLink) : null;
        return {
          scrollY: window.scrollY,
          opacity: style ? style.opacity : null,
          pillBg: style ? style.backgroundColor : null,
          textColor: linkStyle ? linkStyle.color : null,
          linkText: firstLink ? firstLink.textContent.trim() : null
        };
      })()
    `);
    console.log('Navbar in light section (scrollY=900):', lightNavbarState);
    await captureScreenshot('navbar_light_section.png');

    // =========================================================================
    // TEST 3: Scroll to Dark CTA Section ("Have farmland that deserves to be cared for?")
    // =========================================================================
    console.log('\n--- TEST 3: Dark CTA Section Context Behavior ---');
    const ctaScroll = await evaluate(`
      (() => {
        const cta = document.querySelector('[data-navbar-theme="dark"]#contact-cta') || document.getElementById('contact-cta');
        if (!cta) return null;
        const top = cta.getBoundingClientRect().top + window.scrollY;
        // Scroll so CTA is under the navbar (navbar is at top: ~20px)
        window.scrollTo({ top: top + 100, behavior: 'instant' });
        return { top, ctaFound: true };
      })()
    `);
    console.log('Scrolled to CTA:', ctaScroll);
    await sleep(600);

    const ctaNavbarState = await evaluate(`
      (() => {
        const header = document.querySelector('header');
        const pill = header ? header.querySelector('div.rounded-full') : null;
        const firstLink = document.querySelector('nav[aria-label="Main Navigation"] a');
        const talkBtn = header ? header.querySelector('button') : null;
        const style = pill ? window.getComputedStyle(pill) : null;
        const linkStyle = firstLink ? window.getComputedStyle(firstLink) : null;
        const btnStyle = talkBtn ? window.getComputedStyle(talkBtn) : null;
        return {
          scrollY: window.scrollY,
          pillBg: style ? style.backgroundColor : null,
          textColor: linkStyle ? linkStyle.color : null,
          btnColor: btnStyle ? btnStyle.color : null,
          isPillDark: style ? style.backgroundColor.includes('14') : false
        };
      })()
    `);
    console.log('Navbar over Dark CTA section:', ctaNavbarState);
    await captureScreenshot('navbar_dark_cta.png');

    // =========================================================================
    // TEST 4: Continue Scrolling into Dark Green Footer
    // =========================================================================
    console.log('\n--- TEST 4: Footer Dark Context Behavior ---');
    await evaluate(`
      (() => {
        const footer = document.querySelector('footer[data-navbar-theme="dark"]');
        if (footer) {
          const top = footer.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: top + 150, behavior: 'instant' });
        }
      })()
    `);
    await sleep(600);

    const footerNavbarState = await evaluate(`
      (() => {
        const header = document.querySelector('header');
        const pill = header ? header.querySelector('div.rounded-full') : null;
        const firstLink = document.querySelector('nav[aria-label="Main Navigation"] a');
        const style = pill ? window.getComputedStyle(pill) : null;
        const linkStyle = firstLink ? window.getComputedStyle(firstLink) : null;
        return {
          scrollY: window.scrollY,
          pillBg: style ? style.backgroundColor : null,
          textColor: linkStyle ? linkStyle.color : null
        };
      })()
    `);
    console.log('Navbar over Dark Footer:', footerNavbarState);
    await captureScreenshot('navbar_dark_footer.png');

    // =========================================================================
    // TEST 5: Projects Dropdown in Dark Mode
    // =========================================================================
    console.log('\n--- TEST 5: Projects Dropdown in Dark Mode ---');
    // Hover on Projects trigger
    await evaluate(`
      (() => {
        const trigger = document.getElementById('nav-projects-trigger');
        if (trigger) {
          const container = trigger.closest('.group\\\\/projects') || trigger.parentElement;
          container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        }
      })()
    `);
    await sleep(400);

    const dropdownState = await evaluate(`
      (() => {
        const menu = document.querySelector('[role="menu"]');
        if (!menu) return null;
        const inner = menu.querySelector('div');
        const style = inner ? window.getComputedStyle(inner) : null;
        const viewAllLink = menu.querySelector('a[href="/projects"]');
        const viewAllStyle = viewAllLink ? window.getComputedStyle(viewAllLink) : null;
        return {
          menuVisible: style ? style.visibility : null,
          menuBg: style ? style.backgroundColor : null,
          viewAllColor: viewAllStyle ? viewAllStyle.color : null
        };
      })()
    `);
    console.log('Projects dropdown state in dark mode:', dropdownState);
    await captureScreenshot('navbar_projects_dropdown_dark.png');

    // Test Escape key closes dropdown
    await evaluate(`
      (() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      })()
    `);
    await sleep(300);

    // =========================================================================
    // TEST 6: Scroll Back Up to Light Section
    // =========================================================================
    console.log('\n--- TEST 6: Scroll Up Transition Back to Light ---');
    await evaluate(`window.scrollTo({ top: 1200, behavior: 'instant' })`);
    await sleep(600);

    const backToLightState = await evaluate(`
      (() => {
        const firstLink = document.querySelector('nav[aria-label="Main Navigation"] a');
        const style = firstLink ? window.getComputedStyle(firstLink) : null;
        const header = document.querySelector('header');
        const pill = header ? header.querySelector('div.rounded-full') : null;
        const pillStyle = pill ? window.getComputedStyle(pill) : null;
        return {
          scrollY: window.scrollY,
          textColor: style ? style.color : null,
          pillBg: pillStyle ? pillStyle.backgroundColor : null
        };
      })()
    `);
    console.log('Navbar returned to light section:', backToLightState);

    // =========================================================================
    // TEST 7: Mobile Navigation (390px)
    // =========================================================================
    console.log('\n--- TEST 7: Mobile Navigation Viewport (390px) ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(500);

    // Open mobile menu
    await evaluate(`
      (() => {
        const btn = document.querySelector('button[aria-label="Open mobile navigation menu"]');
        if (btn) btn.click();
      })()
    `);
    await sleep(500);

    const mobileNavItems = await evaluate(`
      (() => {
        const nav = document.querySelector('nav[aria-label="Mobile Navigation Links"]');
        if (!nav) return [];
        const links = Array.from(nav.querySelectorAll('a'));
        return links.map(l => ({ title: l.textContent.trim(), href: l.getAttribute('href') }));
      })()
    `);
    console.log('Mobile navigation items:', mobileNavItems);
    await captureScreenshot('navbar_mobile_menu.png');

    // Reset viewport
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await sleep(300);

    // =========================================================================
    // TEST 8: Test New /blogs and /events Routes
    // =========================================================================
    console.log('\n--- TEST 8: Test /blogs and /events Routes ---');
    await evaluate(`window.location.href = 'http://localhost:3000/blogs'`);
    await sleep(2000);
    const blogsInfo = await evaluate(`
      (() => ({
        url: window.location.href,
        title: document.title,
        h1: document.querySelector('h1')?.textContent.trim()
      }))()
    `);
    console.log('Blogs page info:', blogsInfo);
    await captureScreenshot('page_blogs.png');

    await evaluate(`window.location.href = 'http://localhost:3000/events'`);
    await sleep(2000);
    const eventsInfo = await evaluate(`
      (() => ({
        url: window.location.href,
        title: document.title,
        h1: document.querySelector('h1')?.textContent.trim()
      }))()
    `);
    console.log('Events page info:', eventsInfo);
    await captureScreenshot('page_events.png');

    console.log('\n=== ALL BROWSER CDP VERIFICATION TESTS COMPLETED SUCCESSFULLY ===\n');
    ws.close();
  } catch (err) {
    console.error('CDP test error:', err);
    process.exit(1);
  } finally {
    try { chromeProc.kill(); } catch (e) {}
    try { fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true }); } catch (e) {}
  }
}

main();
