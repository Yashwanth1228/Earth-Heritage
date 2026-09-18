const http = require('http');

function fetchRoute(route) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${route}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, html: data }));
    }).on('error', reject);
  });
}

async function runCheck() {
  const routes = [
    '/',
    '/about',
    '/managed-farmland',
    '/farm-management',
    '/how-it-works',
    '/projects',
    '/gallery',
    '/blogs',
    '/events',
    '/lp/managed-farmland',
    '/lp/land-ownership'
  ];

  console.log('=== ROUTE STATUS VERIFICATION ===');
  for (const r of routes) {
    const res = await fetchRoute(r);
    console.log(`Route: ${r.padEnd(25)} Status: ${res.status}`);
  }

  console.log('\n=== LAYOUT ISOLATION VERIFICATION ===');
  // Check /
  const homeRes = await fetchRoute('/');
  const homeHasCorporateNav = homeRes.html.includes('aria-label="Earth Heritage Corporate Navigation"');
  const homeHasCorporateFooter = homeRes.html.includes('aria-label="Earth Heritage Corporate Footer"');
  const homeHasCampaignHeader = homeRes.html.includes('Campaign Architecture');
  console.log('[/] Corporate Navbar Present:       ', homeHasCorporateNav);
  console.log('[/] Corporate Footer Present:       ', homeHasCorporateFooter);
  console.log('[/] Campaign Header Present:        ', homeHasCampaignHeader);

  // Check /lp/managed-farmland
  const lp1Res = await fetchRoute('/lp/managed-farmland');
  const lp1HasCorporateNav = lp1Res.html.includes('aria-label="Earth Heritage Corporate Navigation"');
  const lp1HasCorporateFooter = lp1Res.html.includes('aria-label="Earth Heritage Corporate Footer"');
  const lp1HasCampaignHeader = lp1Res.html.includes('Campaign Architecture');
  const lp1HasTitle = lp1Res.html.includes('Managed Farmland Campaign');
  console.log('\n[/lp/managed-farmland] Corporate Navbar Present: ', lp1HasCorporateNav);
  console.log('[/lp/managed-farmland] Corporate Footer Present: ', lp1HasCorporateFooter);
  console.log('[/lp/managed-farmland] Campaign Header Present:  ', lp1HasCampaignHeader);
  console.log('[/lp/managed-farmland] Campaign Page Title:      ', lp1HasTitle);

  // Check /lp/land-ownership
  const lp2Res = await fetchRoute('/lp/land-ownership');
  const lp2HasCorporateNav = lp2Res.html.includes('aria-label="Earth Heritage Corporate Navigation"');
  const lp2HasCorporateFooter = lp2Res.html.includes('aria-label="Earth Heritage Corporate Footer"');
  const lp2HasCampaignHeader = lp2Res.html.includes('Campaign Architecture');
  const lp2HasTitle = lp2Res.html.includes('Land Ownership Campaign');
  console.log('\n[/lp/land-ownership] Corporate Navbar Present:   ', lp2HasCorporateNav);
  console.log('[/lp/land-ownership] Corporate Footer Present:   ', lp2HasCorporateFooter);
  console.log('[/lp/land-ownership] Campaign Header Present:    ', lp2HasCampaignHeader);
  console.log('[/lp/land-ownership] Campaign Page Title:        ', lp2HasTitle);

  // Check redirect /contact
  const contactRes = await new Promise((resolve) => {
    http.get('http://localhost:3000/contact', (res) => {
      resolve({ status: res.statusCode, location: res.headers.location });
    });
  });
  console.log('\n[/contact] Status:', contactRes.status, 'Location:', contactRes.location);
}

runCheck().catch(console.error);
