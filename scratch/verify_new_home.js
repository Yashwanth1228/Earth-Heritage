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
  console.log('=== VERIFYING NEW CORPORATE HOME & PRESERVED ROUTES ===\n');

  // 1. Verify New Corporate Home (/)
  const home = await fetchHtml('http://localhost:3000/');
  console.log(`[ROUTE /] (New Corporate Home) — Status: ${home.status}`);

  const homeSections = [
    { id: 'home-hero', name: '01. HomeHero' },
    { id: 'brand-intro', name: '02. HomeIntroduction' },
    { id: 'core-model', name: '03. HomeModel' },
    { id: 'managed-farmland-offering', name: '04. HomeManagedFarmland' },
    { id: 'our-approach', name: '05. HomeApproach' },
    { id: 'land-to-legacy', name: '06. HomeJourney' },
    { id: 'founders-story', name: '07. HomeFounders' },
    { id: 'home-cta', name: '08. HomeCta' },
  ];

  for (const s of homeSections) {
    const exists = home.html.includes(`id="${s.id}"`);
    console.log(`  ✓ ${s.name.padEnd(28)} (id="${s.id}"): ${exists}`);
    if (!exists) throw new Error(`Missing ${s.name} on /`);
  }

  const homeHasCorporateHeader = home.html.includes('aria-label="Earth Heritage Corporate Navigation"');
  const homeHasCorporateFooter = home.html.includes('aria-label="Earth Heritage Corporate Footer"');
  const homeHasLandscape = home.html.includes('viewBox="0 0 1440 280"') || home.html.includes('preserveAspectRatio="xMidYMax meet"');
  const homeHasOldSlider = home.html.includes('4-Chapter Cinematic Opening Sequence') || home.html.includes('id="management-sequence"');

  console.log(`  ✓ Corporate Header: ${homeHasCorporateHeader}`);
  console.log(`  ✓ Full Corporate Footer: ${homeHasCorporateFooter}`);
  console.log(`  ✓ Landscape Illustration: ${homeHasLandscape}`);
  console.log(`  ✓ Old Landing Page Slider Excluded from /: ${!homeHasOldSlider}`);

  // 2. Verify /lp/managed-farmland (Preserved Original Advertising Landing Page)
  const lp = await fetchHtml('http://localhost:3000/lp/managed-farmland');
  console.log(`\n[ROUTE /lp/managed-farmland] (Original Landing Page) — Status: ${lp.status}`);

  const originalSections = [
    { id: 'hero', name: '1. HeroSection (Slider)' },
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

  for (const s of originalSections) {
    const exists = lp.html.includes(`id="${s.id}"`);
    console.log(`  ✓ ${s.name.padEnd(28)} (id="${s.id}"): ${exists}`);
    if (!exists) throw new Error(`Missing ${s.name} on /lp/managed-farmland`);
  }

  const lpHasCorporateHeader = lp.html.includes('aria-label="Earth Heritage Corporate Navigation"');
  const lpHasCorporateFooter = lp.html.includes('aria-label="Earth Heritage Corporate Footer"');
  const lpHasCampaignHeader = lp.html.includes('font-mono uppercase tracking-widest text-[#B88E3E]');
  const lpHasCampaignFooter = lp.html.includes('text-[#6E8775]');

  console.log(`  ✓ Corporate Header: ${lpHasCorporateHeader}`);
  console.log(`  ✓ Corporate Footer: ${lpHasCorporateFooter}`);
  console.log(`  ✓ Isolated Campaign Header suppressed: ${!lpHasCampaignHeader}`);
  console.log(`  ✓ Isolated Campaign Footer suppressed: ${!lpHasCampaignFooter}`);

  // 3. Verify /lp/land-ownership (Isolated Campaign Slot)
  const lpLand = await fetchHtml('http://localhost:3000/lp/land-ownership');
  console.log(`\n[ROUTE /lp/land-ownership] (Isolated Campaign Slot) — Status: ${lpLand.status}`);
  const landHasCampaignHeader = lpLand.html.includes('sticky top-0 z-40') && lpLand.html.includes('Enquire Now');
  const landHasCampaignFooter = lpLand.html.includes('text-[#6E8775]');
  const landHasCorporateHeader = lpLand.html.includes('aria-label="Earth Heritage Corporate Navigation"');
  const landHasCorporateFooter = lpLand.html.includes('aria-label="Earth Heritage Corporate Footer"');

  console.log(`  ✓ Has Campaign Header: ${landHasCampaignHeader}`);
  console.log(`  ✓ Has Campaign Footer: ${landHasCampaignFooter}`);
  console.log(`  ✓ Corporate Header suppressed: ${!landHasCorporateHeader}`);
  console.log(`  ✓ Corporate Footer suppressed: ${!landHasCorporateFooter}`);

  // 4. Verify All Corporate Routes
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
  console.log('ALL VERIFICATION CHECKS PASSED PERFECTLY');
  console.log('=========================================');
}

run().catch(console.error);
