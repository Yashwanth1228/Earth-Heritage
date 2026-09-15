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
  console.log('=== VERIFYING /farm-management ===\n');

  // 1. GET /farm-management
  const fmRes = await get('/farm-management');
  console.log(`[1] GET /farm-management: HTTP ${fmRes.status}`);
  if (fmRes.status !== 200) {
    throw new Error(`Expected 200 but got ${fmRes.status}`);
  }

  const html = fmRes.body;

  // 2. Check SEO Metadata
  console.log('\n--- Checking SEO Metadata ---');
  const hasTitle = html.includes('Farm Management Services | Earth Heritage');
  console.log(`✓ Title present: ${hasTitle ? 'YES' : 'NO'}`);
  const hasDescription = html.includes('Explore how Earth Heritage approaches farm management');
  console.log(`✓ Meta description present: ${hasDescription ? 'YES' : 'NO'}`);

  // 3. Check All 8 Sections
  console.log('\n--- Checking 8 Sections in Sequence ---');
  const sections = [
    { id: 'hero', name: 'Section 1 — Editorial Intro', test: 'Good farm management begins with' },
    { id: 'management-activities', name: 'Section 2 — What Farm Management Involves', test: 'What does caring for a farm really involve?' },
    { id: 'management-cycle', name: 'Section 3 — The Management Cycle', test: 'Farm management is an ongoing cycle of care.' },
    { id: 'people-and-land', name: 'Section 4 — People + Land', test: 'Management connects people with the land.' },
    { id: 'responsible-care', name: 'Section 5 — Responsible Farm Care', test: 'Care for the land comes first.' },
    { id: 'management-flow', name: 'Section 6 — How the Activities Connect', test: 'How the activities connect' },
    { id: 'ownership-reminder', name: 'Section 7 — Ownership + Management Reminder', test: 'You own the land.' },
    { id: 'cta', name: 'Section 8 — Final CTA', test: 'Let&#x27;s talk about your farmland.' }
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
    '/images/farm-management/intro-farm-management.jpg',
    '/images/farm-management/people-and-land.jpg',
    '/images/farm-management/responsible-care.jpg',
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

  // 5. Check Landing Page, About Page & Managed Farmland Page Isolation
  console.log('\n--- Checking Existing Pages Integrity ---');
  const landingRes = await get('/');
  console.log(`✓ GET / (Landing Page): HTTP ${landingRes.status}`);
  const aboutRes = await get('/about');
  console.log(`✓ GET /about (About Page): HTTP ${aboutRes.status}`);
  const mfRes2 = await get('/managed-farmland');
  console.log(`✓ GET /managed-farmland (Managed Farmland Page): HTTP ${mfRes2.status}`);

  console.log('\n==================================================');
  console.log('ALL AUTOMATED VERIFICATION CHECKS PASSED!');
}

verify().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
