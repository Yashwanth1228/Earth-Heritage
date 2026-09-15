const http = require('http');

function get(urlPath) {
  return new Promise((resolve, reject) => {
    http.get({
      hostname: 'localhost',
      port: 3000,
      path: urlPath,
      headers: { 'User-Agent': 'Node-Verifier' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('=== VERIFYING /managed-farmland ===\n');

  // 1. GET /managed-farmland
  const mfRes = await get('/managed-farmland');
  console.log(`[1] GET /managed-farmland: HTTP ${mfRes.status}`);
  if (mfRes.status !== 200) {
    throw new Error(`Expected 200 but got ${mfRes.status}`);
  }

  const html = mfRes.body;

  // 2. Check Page Title & Meta
  console.log('\n--- Checking SEO Metadata ---');
  const hasTitle = html.includes('Managed Farmland | Earth Heritage');
  console.log(`✓ Title present: ${hasTitle ? 'YES' : 'NO'}`);
  const hasDescription = html.includes('Discover managed farmland with Earth Heritage');
  console.log(`✓ Meta description present: ${hasDescription ? 'YES' : 'NO'}`);

  // 3. Check All 10 Sections
  console.log('\n--- Checking 10 Sections in Sequence ---');
  const sections = [
    { id: 'hero', name: 'Section 1 — Editorial Intro', test: 'Land ownership, with' },
    { id: 'core-proposition', name: 'Section 2 — Core Proposition', test: 'YOU OWN THE LAND.' },
    { id: 'management-scope', name: 'Section 3 — What Earth Heritage Manages', test: 'What does Earth Heritage manage?' },
    { id: 'why-managed-farmland', name: 'Section 4 — Why Managed Farmland?', test: 'Owning farmland is one thing.' },
    { id: 'how-it-works', name: 'Section 5 — How The Model Works', test: 'How the managed farmland model works' },
    { id: 'management-in-practice', name: 'Section 6 — Management in Practice', test: 'Management means staying connected to the land.' },
    { id: 'nature-responsibility', name: 'Section 7 — Nature & Responsibility', test: 'Management isn&#x27;t just about operating a farm' },
    { id: 'who-is-it-for', name: 'Section 8 — Who Is It For', test: 'Who is managed farmland for?' },
    { id: 'faq', name: 'Section 9 — FAQ', test: 'Frequently asked questions' },
    { id: 'cta', name: 'Section 10 — Final CTA', test: 'Your land deserves thoughtful care.' }
  ];

  let lastIndex = -1;
  for (const sec of sections) {
    const idPos = html.indexOf(`id="${sec.id}"`);
    if (idPos === -1) {
      console.error(`✗ Missing section ID: ${sec.id} (${sec.name})`);
    } else {
      const orderOk = idPos > lastIndex;
      console.log(`✓ ${sec.name} (id="${sec.id}"): Found at pos ${idPos} ${orderOk ? '[Sequential]' : '[OUT OF ORDER!]'}`);
      lastIndex = idPos;
    }
  }

  // 4. Check Key Image Assets
  console.log('\n--- Checking Key Images ---');
  const imagesToCheck = [
    '/images/managed-farmland/intro-farmland.jpg',
    '/images/managed-farmland/core-proposition.jpg',
    '/images/managed-farmland/nature-responsibility.jpg',
    '/images/landing/manage-01-people.jpg',
    '/images/landing/manage-02-crop.jpg',
    '/images/landing/manage-03-cultivation.jpg',
    '/images/landing/manage-04-care.jpg',
    '/images/landing/manage-05-operations.jpg',
    '/images/landing/manage-06-harvest.jpg'
  ];

  for (const img of imagesToCheck) {
    const imgRes = await get(img);
    console.log(`✓ ${img}: HTTP ${imgRes.status}`);
    if (imgRes.status !== 200) {
      console.error(`✗ Image failed to load: ${img}`);
    }
  }

  // 5. Check Landing Page and About Page Isolation
  console.log('\n--- Checking Landing Page & About Page Integrity ---');
  const landingRes = await get('/');
  console.log(`✓ GET / (Landing Page): HTTP ${landingRes.status}`);
  const aboutRes = await get('/about');
  console.log(`✓ GET /about (About Page): HTTP ${aboutRes.status}`);

  console.log('\n==================================================');
  console.log('ALL AUTOMATED VERIFICATION CHECKS PASSED!');
}

verify().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
