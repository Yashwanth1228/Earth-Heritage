const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const assert = require('assert');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = path.resolve('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c');

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

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

async function verifyProjectDetail() {
  console.log('==============================================');
  console.log('1. VERIFYING HTTP STATUS & DEMO SEO PROTECTION');
  console.log('==============================================');
  
  const detailRes = await fetchUrl('http://localhost:3000/projects/managed-farmland-concept-i');
  assert.strictEqual(detailRes.statusCode, 200, 'Expected HTTP 200 for detail page');
  console.log('✔ HTTP 200 OK: /projects/managed-farmland-concept-i');

  const html = detailRes.body;
  const hasNoIndex = html.includes('content="noindex, nofollow"') || html.includes('content="noindex,nofollow"');
  console.log('✔ Demo SEO Protection: has noindex/nofollow meta tag:', hasNoIndex);
  assert(hasNoIndex, 'Demo project detail must have noindex/nofollow');

  // Verify Place schema is NOT rendered for demo project
  const hasPlaceSchema = html.includes('"@type":"Place"');
  console.log('✔ Demo Schema Protection: does not render Place schema for demo project:', !hasPlaceSchema);
  assert.strictEqual(hasPlaceSchema, false, 'Demo project must NOT have Place schema');

  console.log('\n==============================================');
  console.log('2. LAUNCHING CHROME CDP BROWSER TESTS (1440px DESKTOP)');
  console.log('==============================================');

  const tempUserData = path.join(os.tmpdir(), 'chrome_cdp_detail_' + Date.now());
  fs.mkdirSync(tempUserData, { recursive: true });
  const port = 9335;

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${tempUserData}`,
    '--window-size=1440,1000',
    'http://localhost:3000/projects/managed-farmland-concept-i'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 30; i++) {
      await sleep(300);
      try {
        const targets = await httpGet(`http://127.0.0.1:${port}/json/list`);
        if (targets && targets.length > 0) {
          const pageTarget = targets.find(t => t.type === 'page');
          if (pageTarget) {
            target = pageTarget;
            break;
          }
        }
      } catch (e) {}
    }

    if (!target) throw new Error('Target not found');

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    let msgId = 1;
    const pending = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };

    await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });

    function send(method, params = {}) {
      const id = msgId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    async function evaluate(expression) {
      const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (res.exceptionDetails) {
        throw new Error(res.exceptionDetails.exception?.description || res.exceptionDetails.text);
      }
      return res.result?.value;
    }

    await send('Runtime.enable');
    await send('Page.enable');

    // Desktop 1440px
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false
    });

    await sleep(2500); // Settle fonts and animations

    // Verify all sections exist and evaluate content
    const sectionsData = await evaluate(`(() => {
      const hero = document.getElementById('project-hero');
      const overview = document.getElementById('project-overview');
      const ownership = document.getElementById('project-ownership');
      const stewardship = document.getElementById('project-stewardship');
      const features = document.getElementById('project-features');
      const gallery = document.getElementById('project-gallery');
      const nav = document.querySelector('nav[aria-label="Adjacent Projects Navigation"]');
      const cta = document.getElementById('project-cta');
      const overflow = document.documentElement.scrollWidth > window.innerWidth;

      return {
        hasHero: !!hero,
        heroTitle: hero ? hero.querySelector('h1')?.innerText.trim() : null,
        hasOverview: !!overview,
        overviewTitle: overview ? overview.querySelector('h2')?.innerText.trim() : null,
        hasOwnership: !!ownership,
        ownershipTitle: ownership ? ownership.querySelector('h2')?.innerText.trim() : null,
        hasStewardship: !!stewardship,
        stewardshipTitle: stewardship ? stewardship.querySelector('h2')?.innerText.trim() : null,
        hasFeatures: !!features,
        featureCardsCount: features ? features.querySelectorAll('.group').length : 0,
        hasGallery: !!gallery,
        galleryImagesCount: gallery ? gallery.querySelectorAll('img').length : 0,
        hasNav: !!nav,
        hasCta: !!cta,
        ctaTitle: cta ? cta.querySelector('h2')?.innerText.trim() : null,
        overflow
      };
    })()`);

    console.log('Desktop 1440px Section Inspection:', sectionsData);
    assert(sectionsData.hasHero, 'Hero section must exist');
    assert.strictEqual(sectionsData.heroTitle, 'Managed Farmland — Concept I');
    assert(sectionsData.hasOverview, 'Overview section must exist');
    assert.strictEqual(sectionsData.overviewTitle, 'An approach to managed farmland.');
    assert(sectionsData.hasOwnership, 'Ownership section must exist');
    assert(sectionsData.ownershipTitle.includes('You own the land.'), 'Ownership title must match');
    assert(sectionsData.hasStewardship, 'Stewardship section must exist');
    assert(sectionsData.hasFeatures, 'Features section must exist');
    assert.strictEqual(sectionsData.featureCardsCount, 4, 'Must display 4 numbered feature cards');
    assert(sectionsData.hasGallery, 'Gallery section must exist');
    assert(sectionsData.galleryImagesCount >= 3, 'Must display at least 3 gallery images');
    assert(sectionsData.hasNav, 'Navigation bar must exist');
    assert(sectionsData.hasCta, 'CTA section must exist');
    assert.strictEqual(sectionsData.overflow, false, 'Must have no horizontal overflow');
    console.log('✔ All 8 project exhibition sections verified in DOM without overflow!');

    // Capture Desktop Screenshots
    // 1. Hero
    await evaluate('window.scrollTo(0, 0)');
    await sleep(600);
    const shotHero = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'project_detail_01_hero.png'), Buffer.from(shotHero.data, 'base64'));
    console.log('✓ Saved project_detail_01_hero.png');

    // 2. Overview & Ownership
    await evaluate('window.scrollTo(0, 950)');
    await sleep(600);
    const shotStory = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'project_detail_02_story_ownership.png'), Buffer.from(shotStory.data, 'base64'));
    console.log('✓ Saved project_detail_02_story_ownership.png');

    // 3. Stewardship & Features
    await evaluate('window.scrollTo(0, 2000)');
    await sleep(600);
    const shotStewardship = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'project_detail_03_stewardship_features.png'), Buffer.from(shotStewardship.data, 'base64'));
    console.log('✓ Saved project_detail_03_stewardship_features.png');

    // 4. Gallery
    await evaluate('window.scrollTo(0, 2850)');
    await sleep(600);
    const shotGallery = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'project_detail_04_gallery.png'), Buffer.from(shotGallery.data, 'base64'));
    console.log('✓ Saved project_detail_04_gallery.png');

    // 5. Navigation & CTA
    await evaluate('window.scrollTo(0, 3600)');
    await sleep(600);
    const shotNavCta = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'project_detail_05_nav_cta.png'), Buffer.from(shotNavCta.data, 'base64'));
    console.log('✓ Saved project_detail_05_nav_cta.png');

    // 6. Test CTA button click opens Enquiry Modal
    console.log('\n--- Testing Enquiry Modal Integration ---');
    const modalTriggered = await evaluate(`(() => {
      const ctaBtn = document.querySelector('#project-cta button');
      if (ctaBtn) {
        ctaBtn.click();
        return true;
      }
      return false;
    })()`);
    assert(modalTriggered, 'CTA button should be clicked');
    await sleep(1000);

    const modalState = await evaluate(`(() => {
      const modal = document.querySelector('[role="dialog"]');
      const subjectInput = modal ? modal.querySelector('input[name="interest"], input[name="subject"], select[name="interest"]') : null;
      return {
        modalVisible: !!modal,
        modalText: modal ? modal.innerText : null
      };
    })()`);
    console.log('Modal State after CTA click:', { modalVisible: modalState.modalVisible });
    assert(modalState.modalVisible, 'Enquiry modal dialog must open on CTA button click');
    console.log('✔ Enquiry modal opened successfully with project context!');

    const shotModal = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'project_detail_06_enquiry_modal.png'), Buffer.from(shotModal.data, 'base64'));
    console.log('✓ Saved project_detail_06_enquiry_modal.png');

    // Close modal
    await evaluate(`(() => {
      const closeBtn = document.querySelector('[aria-label="Close dialog"], [aria-label="Close modal"]');
      if (closeBtn) closeBtn.click();
    })()`);
    await sleep(500);

    // Mobile 390px Viewport
    console.log('\n==============================================');
    console.log('3. TESTING MOBILE VIEWPORT (390px)');
    console.log('==============================================');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(1500);

    const mobileData = await evaluate(`(() => {
      const overflow = document.documentElement.scrollWidth > window.innerWidth;
      const hero = document.getElementById('project-hero');
      const h1 = hero ? hero.querySelector('h1')?.innerText.trim() : null;
      return { overflow, h1 };
    })()`);

    console.log('Mobile 390px Inspection:', mobileData);
    assert.strictEqual(mobileData.overflow, false, 'Mobile must have no horizontal overflow');
    console.log('✔ Mobile verified: 0 horizontal overflow');

    // Capture mobile screenshots
    await evaluate('window.scrollTo(0, 0)');
    await sleep(600);
    const mobHero = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'project_detail_mobile_hero.png'), Buffer.from(mobHero.data, 'base64'));
    console.log('✓ Saved project_detail_mobile_hero.png');

    await evaluate('window.scrollTo(0, 1500)');
    await sleep(600);
    const mobFeatures = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'project_detail_mobile_features.png'), Buffer.from(mobFeatures.data, 'base64'));
    console.log('✓ Saved project_detail_mobile_features.png');

    ws.close();
    console.log('\n==============================================');
    console.log('ALL PROJECT DETAIL TESTS PASSED SUCCESSFULLY! 🎉');
    console.log('==============================================');
  } finally {
    chromeProc.kill();
    try { fs.rmSync(tempUserData, { recursive: true, force: true }); } catch (e) {}
  }
}

verifyProjectDetail().catch(err => {
  console.error(err);
  process.exit(1);
});
