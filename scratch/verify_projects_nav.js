const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('--- STARTING PROJECTS NAVIGATION & PAGE VERIFICATION ---');
  let failures = 0;

  // 1. Verify /projects returns 200
  try {
    const res = await fetchUrl('http://localhost:3000/projects');
    if (res.status === 200) {
      console.log('✓ /projects returned HTTP 200');
    } else {
      console.error(`✗ /projects returned HTTP ${res.status}`);
      failures++;
    }

    const html = res.body;

    const expectedStrings = [
      'EARTH HERITAGE PROJECTS',
      'Places with purpose.',
      'Land with a story.',
      'Our project portfolio is taking shape.',
      'More Earth Heritage projects will be introduced here as they become ready to share.',
      'Talk to Us'
    ];

    expectedStrings.forEach(str => {
      if (html.includes(str)) {
        console.log(`✓ HTML contains expected text: "${str}"`);
      } else {
        console.error(`✗ HTML MISSING expected text: "${str}"`);
        failures++;
      }
    });

    if (html.includes('<title>Projects | Earth Heritage</title>')) {
      console.log('✓ SEO title correctly set to "Projects | Earth Heritage"');
    } else {
      console.error('✗ SEO title missing or incorrect');
      failures++;
    }

  } catch (err) {
    console.error('✗ Failed to fetch /projects:', err.message);
    failures++;
  }

  // 2. Verify /projects/sample-slug returns 404 (since projects array is empty)
  try {
    const res404 = await fetchUrl('http://localhost:3000/projects/sample-nonexistent-project');
    if (res404.status === 404) {
      console.log('✓ /projects/sample-nonexistent-project returned HTTP 404 via notFound()');
    } else {
      console.error(`✗ Expected 404 but got HTTP ${res404.status}`);
      failures++;
    }
  } catch (err) {
    console.error('✗ Error testing 404 dynamic slug:', err.message);
    failures++;
  }

  // 3. Regression test on other core routes
  const coreRoutes = ['/', '/about', '/managed-farmland', '/farm-management', '/how-it-works', '/gallery'];
  for (const route of coreRoutes) {
    try {
      const res = await fetchUrl(`http://localhost:3000${route}`);
      if (res.status === 200) {
        console.log(`✓ Regression check: ${route} returned HTTP 200`);
      } else {
        console.error(`✗ Regression check failed: ${route} returned HTTP ${res.status}`);
        failures++;
      }
    } catch (err) {
      console.error(`✗ Regression error on ${route}:`, err.message);
      failures++;
    }
  }

  console.log('\n--- VERIFICATION SUMMARY ---');
  if (failures === 0) {
    console.log('ALL PROJECTS VERIFICATIONS PASSED SUCCESSFULLY!');
  } else {
    console.error(`FAILED with ${failures} error(s).`);
    process.exit(1);
  }
}

verify().catch(e => {
  console.error('Fatal test error:', e);
  process.exit(1);
});
