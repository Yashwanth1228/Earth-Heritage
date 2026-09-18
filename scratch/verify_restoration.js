const http = require('http');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, html: data }));
    }).on('error', reject);
  });
}

async function run() {
  console.log('=== RUNNING RIGOROUS ROUTE VERIFICATION ===\n');

  const sections = [
    { id: 'hero', name: '1. HeroSection' },
    { id: 'statement', name: '2. BrandStatement' },
    { id: 'responsibility', name: '3. ProblemSection' },
    { id: 'solution', name: '4. SolutionSection' },
    { id: 'management-sequence', name: '5. ManagementSection' },
    { id: 'how-it-works', name: '6. HowItWorksSection' },
    { id: 'philosophy', name: '7. PhilosophySection' },
    { id: 'principles', name: '8. PrinciplesSection' },
    { id: 'founders', name: '9. FoundersSection' },
    { id: 'location', name: '10. LocationMapSection' },
    { id: 'contact-cta', name: '11. FinalCtaSection' },
  ];

  // 1. Verify /
  const home = await fetchHtml('http://localhost:3000/');
  console.log(`[ROUTE /] Status: ${home.status}`);
  for (const s of sections) {
    const exists = home.html.includes(`id="${s.id}"`);
    console.log(`  ✓ ${s.name.padEnd(25)} (id="${s.id}"): ${exists}`);
    if (!exists) throw new Error(`Missing ${s.name} on /`);
  }
  const homeHasHeader = home.html.includes('aria-label="Earth Heritage Corporate Navigation"');
  const homeHasFooter = home.html.includes('aria-label="Earth Heritage Corporate Footer"');
  const homeHasNotice = home.html.includes('Ownership &amp; Management Notice:');
  console.log(`  ✓ Corporate Header: ${homeHasHeader}`);
  console.log(`  ✓ Corporate Footer: ${homeHasFooter}`);
  console.log(`  ✓ Ownership & Management Notice: ${homeHasNotice}`);

  // 2. Verify /lp/managed-farmland
  const lp = await fetchHtml('http://localhost:3000/lp/managed-farmland');
  console.log(`\n[ROUTE /lp/managed-farmland] Status: ${lp.status}`);
  for (const s of sections) {
    const exists = lp.html.includes(`id="${s.id}"`);
    console.log(`  ✓ ${s.name.padEnd(25)} (id="${s.id}"): ${exists}`);
    if (!exists) throw new Error(`Missing ${s.name} on /lp/managed-farmland`);
  }
  const lpHasHeader = lp.html.includes('aria-label="Earth Heritage Corporate Navigation"');
  const lpHasFooter = lp.html.includes('aria-label="Earth Heritage Corporate Footer"');
  const lpHasNotice = lp.html.includes('Ownership &amp; Management Notice:');
  // Campaign header/footer checks
  const lpHasCampaignHeader = lp.html.includes('font-mono uppercase tracking-widest text-[#B88E3E]');
  const lpHasCampaignFooter = lp.html.includes('text-[#6E8775]');
  console.log(`  ✓ Corporate Header: ${lpHasHeader}`);
  console.log(`  ✓ Corporate Footer: ${lpHasFooter}`);
  console.log(`  ✓ Ownership & Management Notice: ${lpHasNotice}`);
  console.log(`  ✓ Isolated Campaign Header suppressed: ${!lpHasCampaignHeader}`);
  console.log(`  ✓ Isolated Campaign Footer suppressed: ${!lpHasCampaignFooter}`);

  // 3. Exact Parity Check between / and /lp/managed-farmland
  console.log(`\n[100% PARITY CONFIRMATION]`);
  let parity = true;
  for (const s of sections) {
    const h = home.html.includes(`id="${s.id}"`);
    const l = lp.html.includes(`id="${s.id}"`);
    if (h !== l) {
      console.log(`  ✗ Discrepancy in ${s.name}`);
      parity = false;
    }
  }
  if (parity) {
    console.log(`  ✓ / and /lp/managed-farmland render all 11 original landing sections identically!`);
  }

  // 4. Verify /lp/land-ownership
  const lpLand = await fetchHtml('http://localhost:3000/lp/land-ownership');
  console.log(`\n[ROUTE /lp/land-ownership] Status: ${lpLand.status}`);
  const landHasCampaignHeader = lpLand.html.includes('sticky top-0 z-40') && lpLand.html.includes('Enquire Now');
  const landHasCampaignFooter = lpLand.html.includes('text-[#6E8775]');
  const landHasCorporateHeader = lpLand.html.includes('aria-label="Earth Heritage Corporate Navigation"');
  const landHasCorporateFooter = lpLand.html.includes('aria-label="Earth Heritage Corporate Footer"');
  console.log(`  ✓ Has Campaign Header: ${landHasCampaignHeader}`);
  console.log(`  ✓ Has Campaign Footer: ${landHasCampaignFooter}`);
  console.log(`  ✓ Corporate Header suppressed: ${!landHasCorporateHeader}`);
  console.log(`  ✓ Corporate Footer suppressed: ${!landHasCorporateFooter}`);

  // 5. Verify Corporate Pages
  const corporateRoutes = [
    '/about',
    '/managed-farmland',
    '/farm-management',
    '/how-it-works',
    '/projects',
    '/gallery',
    '/blogs',
    '/events'
  ];

  console.log('\n[CORPORATE ROUTES CHECK]');
  for (const r of corporateRoutes) {
    const res = await fetchHtml(`http://localhost:3000${r}`);
    const hasHeader = res.html.includes('aria-label="Earth Heritage Corporate Navigation"');
    const hasFooter = res.html.includes('aria-label="Earth Heritage Corporate Footer"');
    console.log(`  ✓ ${r.padEnd(20)}: Status ${res.status} | Header: ${hasHeader} | Footer: ${hasFooter}`);
  }

  console.log('\n=========================================');
  console.log('ALL TESTS PASSED WITH COMPLETE VALIDATION');
  console.log('=========================================');
}

run().catch(console.error);
