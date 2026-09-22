const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

const PORT = 3001; // active dev server port
const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function runAudit() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromePort = 9685;
  const tempDir = path.join(os.tmpdir(), 'chrome_legal_' + Date.now());
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
        console.log('1. AUDITING FOOTER ON HOMEPAGE (1440x900)');
        console.log('====================================================');

        await send('Page.navigate', { url: `http://localhost:${PORT}/` });
        await new Promise(r => setTimeout(r, 3000));

        // Scroll down to footer
        await send('Runtime.evaluate', {
          expression: `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });`
        });
        await new Promise(r => setTimeout(r, 1500));

        const footerAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const footer = document.querySelector('footer');
            if (!footer) return { error: 'Footer not found' };

            const brandH2 = footer.querySelector('h2');
            const pvtLtdSpan = brandH2 ? brandH2.querySelector('span:nth-child(2)') : null;
            const tagline = footer.querySelector('h2 + span');

            const socialAnchors = Array.from(footer.querySelectorAll('div[aria-label="Social media links"] a'));
            const socials = socialAnchors.map(a => ({
              label: a.getAttribute('aria-label'),
              href: a.getAttribute('href'),
              target: a.getAttribute('target'),
              rel: a.getAttribute('rel')
            }));

            const footerLinks = Array.from(footer.querySelectorAll('a')).map(a => ({
              text: a.textContent.trim(),
              href: a.getAttribute('href')
            }));

            const legalLinks = footerLinks.filter(l => 
              l.text.toLowerCase().includes('privacy') ||
              l.text.toLowerCase().includes('terms') ||
              l.text.toLowerCase().includes('disclaimer')
            );

            return {
              brandHeading: brandH2 ? brandH2.textContent.replace(/\\s+/g, ' ').trim() : null,
              hasPvtLtd: brandH2 ? brandH2.textContent.includes('Pvt. Ltd.') : false,
              pvtLtdIsSecondarySpan: !!pvtLtdSpan,
              tagline: tagline ? tagline.textContent.trim() : null,
              socials,
              legalLinks,
              hasTermsLink: footerLinks.some(l => l.text.toLowerCase().includes('terms')),
              hasDisclaimerLink: footerLinks.some(l => l.text.toLowerCase().includes('disclaimer')),
              hasPrivacyPolicyLink: footerLinks.some(l => l.text.toLowerCase().includes('privacy policy'))
            };
          })()`,
          returnByValue: true
        });
        console.log('FOOTER AUDIT RESULT:', JSON.stringify(footerAudit.result.value, null, 2));

        const footerShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'footer_legal_updated.png'), Buffer.from(footerShot.data, 'base64'));
        console.log('Saved footer_legal_updated.png to artifacts');

        console.log('\n====================================================');
        console.log('2. AUDITING /privacy-policy COMBINED LEGAL PAGE');
        console.log('====================================================');

        await send('Page.navigate', { url: `http://localhost:${PORT}/privacy-policy` });
        await new Promise(r => setTimeout(r, 2500));

        const pageAudit = await send('Runtime.evaluate', {
          expression: `(() => {
            const bodyText = document.body.textContent;
            const h1 = document.querySelector('h1');
            const h2s = Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim());
            const h3s = Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim());

            const hasPlaceholders = 
              bodyText.includes('[Company Name]') ||
              bodyText.includes('[State/Country]') ||
              bodyText.includes('[City, State/Country]');

            const hasPrivacyPolicy = bodyText.includes('PRIVACY POLICY') || bodyText.includes('Privacy Policy');
            const hasTerms = bodyText.includes('TERMS & CONDITIONS') || bodyText.includes('Terms & Conditions');
            const hasEmail = bodyText.includes('earthheritageit@gmail.com');
            const hasPhone = bodyText.includes('9902096969');
            const hasAddress = bodyText.includes('SAMRUDDI') || bodyText.includes('GIDADAKONENAHALLI') || bodyText.includes('Gidadakonahalli');
            const hasWebsite = bodyText.includes('https://earthheritage.in');

            const ppArticle = document.getElementById('privacy-policy');
            const termsArticle = document.getElementById('terms');

            return {
              h1Text: h1 ? h1.textContent.trim() : null,
              h2Count: h2s.length,
              hasPrivacyPolicy,
              hasTerms,
              hasPlaceholders,
              hasEmail,
              hasPhone,
              hasAddress,
              hasWebsite,
              ppArticleFound: !!ppArticle,
              termsArticleFound: !!termsArticle,
              bodyLength: bodyText.length
            };
          })()`,
          returnByValue: true
        });
        console.log('PRIVACY POLICY AUDIT RESULT:', JSON.stringify(pageAudit.result.value, null, 2));

        const privacyShotTop = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'privacy_policy_top.png'), Buffer.from(privacyShotTop.data, 'base64'));

        // Scroll to terms
        await send('Runtime.evaluate', {
          expression: `const terms = document.getElementById('terms'); if (terms) terms.scrollIntoView({ behavior: 'instant' });`
        });
        await new Promise(r => setTimeout(r, 1000));

        const termsShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'terms_and_conditions_section.png'), Buffer.from(termsShot.data, 'base64'));
        console.log('Saved privacy_policy_top.png and terms_and_conditions_section.png');

        console.log('\n====================================================');
        console.log('3. AUDITING MOBILE (390x844) VIEWPORT');
        console.log('====================================================');

        await send('Emulation.setDeviceMetricsOverride', {
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true
        });

        await send('Page.navigate', { url: `http://localhost:${PORT}/privacy-policy` });
        await new Promise(r => setTimeout(r, 2000));

        const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'privacy_policy_mobile.png'), Buffer.from(mobileShot.data, 'base64'));
        console.log('Saved privacy_policy_mobile.png');

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
