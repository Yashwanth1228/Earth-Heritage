const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

const EXPECTED_FAQS = [
  {
    q: 'What does “Managed Farmland” mean at Earth Heritage?',
    a: 'Managed farmland means that agreed agricultural and land-management activities can be professionally handled on behalf of owners. The exact services vary by project and are clearly explained before purchase, allowing owners to stay connected to their land without having to manage every activity themselves.'
  },
  {
    q: 'What makes Earth Heritage different?',
    a: 'We go beyond land ownership by combining nature, thoughtful development, responsible management, and community.'
  },
  {
    q: 'What does “Rooted in Nature. Built for Generations.” mean?',
    a: 'It reflects our belief in creating spaces that connect people with nature and become meaningful legacies for future generations.'
  },
  {
    q: 'What do I actually own?',
    a: 'You own the specific plot or property described in your registered sale and ownership documents, subject to the applicable legal terms and project structure.'
  },
  {
    q: 'What is the vision behind Earth Heritage?',
    a: 'Our vision is to redefine the way people own, experience, and connect with land—creating spaces that can become meaningful legacies for generations.'
  },
  {
    q: 'Why choose Earth Heritage?',
    a: 'We bring together thoughtful development, responsible land management, transparency, and a strong connection with nature to create more meaningful land-ownership experiences.'
  },
  {
    q: 'Is the farmland registered under my name?',
    a: 'Yes, the plot is registered in the buyer’s name as per the applicable legal and registration process.'
  },
  {
    q: 'What crops are grown on the farmland?',
    a: 'We grow carefully selected crops and plantations suited to the local soil, climate, and project location, with specific crops varying by project.'
  }
];

async function runAudit() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromePort = 9688;
  const tempDir = path.join(os.tmpdir(), 'chrome_faq_' + Date.now());
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
        console.log('1. DESKTOP VIEWPORT (1440x900) - HOME FAQ AUDIT');
        console.log('====================================================');

        await send('Page.navigate', { url: `http://localhost:${PORT}/` });
        await new Promise(r => setTimeout(r, 3000));

        // Scroll to FAQ section
        await send('Runtime.evaluate', {
          expression: `(() => {
            const faqSection = document.getElementById('home-faq');
            if (faqSection) {
              faqSection.scrollIntoView({ behavior: 'instant', block: 'center' });
            }
          })()`
        });
        await new Promise(r => setTimeout(r, 1500));

        const faqAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const faqSection = document.getElementById('home-faq');
            if (!faqSection) return { error: 'home-faq section not found' };

            const buttons = Array.from(faqSection.querySelectorAll('button[id^="faq-btn-"]'));
            const faqItems = buttons.map((btn, idx) => {
              const h3 = btn.querySelector('h3');
              const answerEl = document.getElementById('faq-answer-' + idx);
              return {
                index: idx,
                question: h3 ? h3.textContent.trim() : null,
                isExpanded: btn.getAttribute('aria-expanded') === 'true',
                hasAnswerElement: !!answerEl,
                answerText: answerEl ? answerEl.textContent.trim() : null
              };
            });

            return {
              totalFaqs: faqItems.length,
              faqItems
            };
          })()`,
          returnByValue: true
        });

        console.log('FAQ AUDIT RESULT (Initial state):', JSON.stringify(faqAudit.result.value, null, 2));

        // Capture FAQ screenshot
        const faqShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'home_faq_desktop.png'), Buffer.from(faqShot.data, 'base64'));
        console.log('Saved home_faq_desktop.png');

        console.log('\n====================================================');
        console.log('2. TESTING ACCORDION INTERACTION (Click item 1)');
        console.log('====================================================');

        await send('Runtime.evaluate', {
          expression: `(() => {
            const btn1 = document.getElementById('faq-btn-1');
            if (btn1) btn1.click();
          })()`
        });
        await new Promise(r => setTimeout(r, 800));

        const afterClickAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const btn0 = document.getElementById('faq-btn-0');
            const btn1 = document.getElementById('faq-btn-1');
            const ans0 = document.getElementById('faq-answer-0');
            const ans1 = document.getElementById('faq-answer-1');
            return {
              item0Expanded: btn0 ? btn0.getAttribute('aria-expanded') : null,
              item0AnswerVisible: !!ans0,
              item1Expanded: btn1 ? btn1.getAttribute('aria-expanded') : null,
              item1AnswerVisible: !!ans1,
              item1AnswerText: ans1 ? ans1.textContent.trim() : null
            };
          })()`,
          returnByValue: true
        });
        console.log('ACCORDION CLICK TEST RESULT:', JSON.stringify(afterClickAudit.result.value, null, 2));

        const faqOpenShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'home_faq_accordion_open.png'), Buffer.from(faqOpenShot.data, 'base64'));

        console.log('\n====================================================');
        console.log('3. FOOTER COLUMN HEADINGS TYPOGRAPHY AUDIT');
        console.log('====================================================');

        await send('Runtime.evaluate', {
          expression: `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });`
        });
        await new Promise(r => setTimeout(r, 1500));

        const footerAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const footer = document.querySelector('footer');
            if (!footer) return { error: 'Footer not found' };

            const h4s = Array.from(footer.querySelectorAll('h4')).map(h => {
              const style = window.getComputedStyle(h);
              const parent = h.parentElement;
              const links = Array.from(parent.querySelectorAll('a, address'));
              const linkStyles = links.map(l => {
                const ls = window.getComputedStyle(l);
                return {
                  text: l.textContent.replace(/\\s+/g, ' ').trim().substring(0, 30),
                  fontSize: ls.fontSize,
                  fontWeight: ls.fontWeight
                };
              });

              return {
                title: h.textContent.trim(),
                fontSize: style.fontSize,
                fontWeight: style.fontWeight,
                fontFamily: style.fontFamily,
                color: style.color,
                firstSubLink: linkStyles[0] || null
              };
            });

            // Branding & legal checks
            const brandH2 = footer.querySelector('h2');
            const tagline = footer.querySelector('h2 + span');
            const legalLinks = Array.from(footer.querySelectorAll('a[href*="privacy"], a[href*="terms"], a[href*="disclaimer"]')).map(a => ({
              text: a.textContent.trim(),
              href: a.getAttribute('href')
            }));

            const socials = Array.from(footer.querySelectorAll('div[aria-label="Social media links"] a')).map(a => ({
              label: a.getAttribute('aria-label'),
              href: a.getAttribute('href')
            }));

            return {
              headings: h4s,
              brandHeading: brandH2 ? brandH2.textContent.replace(/\\s+/g, ' ').trim() : null,
              tagline: tagline ? tagline.textContent.trim() : null,
              legalLinks,
              socials
            };
          })()`,
          returnByValue: true
        });
        console.log('FOOTER AUDIT RESULT:', JSON.stringify(footerAudit.result.value, null, 2));

        const footerShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'footer_headings_desktop.png'), Buffer.from(footerShot.data, 'base64'));
        console.log('Saved footer_headings_desktop.png');

        console.log('\n====================================================');
        console.log('4. MOBILE VIEWPORT (390x844) - FAQ & FOOTER AUDIT');
        console.log('====================================================');

        await send('Emulation.setDeviceMetricsOverride', {
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true
        });

        await send('Page.navigate', { url: `http://localhost:${PORT}/` });
        await new Promise(r => setTimeout(r, 2500));

        // Scroll to FAQ on mobile
        await send('Runtime.evaluate', {
          expression: `(() => {
            const faqSection = document.getElementById('home-faq');
            if (faqSection) faqSection.scrollIntoView({ behavior: 'instant', block: 'start' });
          })()`
        });
        await new Promise(r => setTimeout(r, 1500));

        const mobileFaqShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'home_faq_mobile.png'), Buffer.from(mobileFaqShot.data, 'base64'));
        console.log('Saved home_faq_mobile.png');

        // Scroll to Footer on mobile
        await send('Runtime.evaluate', {
          expression: `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });`
        });
        await new Promise(r => setTimeout(r, 1500));

        const mobileFooterAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const footer = document.querySelector('footer');
            if (!footer) return { error: 'Footer not found' };

            const h4s = Array.from(footer.querySelectorAll('h4')).map(h => {
              const style = window.getComputedStyle(h);
              const parent = h.parentElement;
              const links = Array.from(parent.querySelectorAll('a, address'));
              const ls = links[0] ? window.getComputedStyle(links[0]) : null;
              return {
                title: h.textContent.trim(),
                headingFontSize: style.fontSize,
                headingFontWeight: style.fontWeight,
                linkFontSize: ls ? ls.fontSize : null,
                headingIsLargerThanLink: ls ? parseFloat(style.fontSize) > parseFloat(ls.fontSize) : null
              };
            });

            return {
              headings: h4s
            };
          })()`,
          returnByValue: true
        });
        console.log('MOBILE FOOTER AUDIT RESULT:', JSON.stringify(mobileFooterAudit.result.value, null, 2));

        const mobileFooterShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'footer_headings_mobile.png'), Buffer.from(mobileFooterShot.data, 'base64'));
        console.log('Saved footer_headings_mobile.png');

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
