const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('=== VERIFYING SPECIFIC PADDING ADJUSTMENT ===\n');

  const aboutRes = await fetchUrl('http://localhost:3000/about');
  console.log(`[1] GET /about: HTTP ${aboutRes.statusCode}`);
  if (aboutRes.statusCode !== 200) {
    throw new Error(`Expected 200 on /about, got ${aboutRes.statusCode}`);
  }

  const checks = [
    { label: 'AboutIntro padding restored (pt-24 sm:pt-28 lg:pt-32)', pattern: /id="hero"[^>]*pt-24 sm:pt-28 lg:pt-32/ },
    { label: 'Founders padding kept reduced (pt-12 sm:pt-16 lg:pt-20)', pattern: /id="founders"[^>]*pt-12 sm:pt-16 lg:pt-20/ },
    { label: 'Ownership padding kept reduced (pt-12 sm:pt-16 lg:pt-20)', pattern: /id="ownership-management"[^>]*pt-12 sm:pt-16 lg:pt-20/ },
    { label: 'Goals padding kept reduced (pt-12 sm:pt-16 lg:pt-20)', pattern: /id="goals"[^>]*pt-12 sm:pt-16 lg:pt-20/ },
    { label: 'VisionMission padding kept reduced (pt-12 sm:pt-16 lg:pt-20)', pattern: /id="vision-mission"[^>]*pt-12 sm:pt-16 lg:pt-20/ },
    { label: 'FaqSection padding kept reduced (pt-12 sm:pt-16 lg:pt-20)', pattern: /id="faq"[^>]*pt-12 sm:pt-16 lg:pt-20/ }
  ];

  console.log('--- Checking Section Padding ---');
  let passCount = 0;
  for (const c of checks) {
    const passed = c.pattern.test(aboutRes.body);
    console.log(`${passed ? '✓' : '✗'} ${c.label}: ${passed ? 'PASSED' : 'FAILED'}`);
    if (passed) passCount++;
  }

  console.log('\n--- Checking Landing Page Integrity ---');
  const landingRes = await fetchUrl('http://localhost:3000/');
  const landingOk = landingRes.statusCode === 200 && landingRes.body.includes('Own a Piece of Earth');
  console.log(`${landingOk ? '✓' : '✗'} Landing page intact: ${landingOk ? 'YES' : 'NO'}`);

  console.log('\n==================================================');
  if (passCount === checks.length && landingOk) {
    console.log('ALL PADDING SPECIFICATION CHECKS PASSED!');
  } else {
    console.log('FAILED: Review output above.');
  }
}

verify().catch(console.error);
