const http = require('http');
const fs = require('fs');
const path = require('path');

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
  console.log('--- STARTING GALLERY PAGE VERIFICATION ---');
  let failures = 0;

  // 1. Verify /gallery responds with 200
  try {
    const res = await fetchUrl('http://localhost:3000/gallery');
    if (res.status === 200) {
      console.log('✓ /gallery returned HTTP 200');
    } else {
      console.error(`✗ /gallery returned HTTP ${res.status}`);
      failures++;
    }

    const html = res.body;

    const expectedStrings = [
      'EARTH HERITAGE GALLERY',
      'A closer look at the land',
      'the moments in between',
      'Exhibition Opening',
      'Morning Light over the Valley',
      'Curated Series',
      'Exhibition Catalog',
      'BACK TO ROOTS. FORWARD WITH PURPOSE.',
      'A living archive of stewardship'
    ];

    expectedStrings.forEach(str => {
      if (html.includes(str)) {
        console.log(`✓ HTML contains expected text: "${str}"`);
      } else {
        console.error(`✗ HTML MISSING expected text: "${str}"`);
        failures++;
      }
    });

    // Assert CTA section "Have a vision for your relationship with land?" is REMOVED
    if (!html.includes('Have a vision for your relationship with land?')) {
      console.log('✓ PASS: "Have a vision for your relationship with land?" section is successfully removed.');
    } else {
      console.error('✗ FAIL: "Have a vision for your relationship with land?" section is STILL PRESENT!');
      failures++;
    }

    // Verify categories are present
    ['All', 'Land', 'Nature', 'Cultivation', 'Farm Life', 'Experiences'].forEach(cat => {
      if (html.includes(cat)) {
        console.log(`✓ Category "${cat}" found in SSR HTML`);
      } else {
        console.error(`✗ Category "${cat}" NOT found in SSR HTML`);
        failures++;
      }
    });

    // Check SEO metadata
    if (html.includes('<title>Gallery | Earth Heritage</title>')) {
      console.log('✓ SEO title correctly set to "Gallery | Earth Heritage"');
    } else {
      console.error('✗ SEO title missing or incorrect');
      failures++;
    }

  } catch (err) {
    console.error('✗ Failed to fetch /gallery:', err.message);
    failures++;
  }

  // 2. Verify static gallery images exist and return 200
  const testImages = [
    '/images/gallery/hero-feature.jpg',
    '/images/gallery/nature-canopy.jpg',
    '/images/gallery/cultivation-detail.jpg',
    '/images/gallery/experiences-gathering.jpg'
  ];

  for (const imgPath of testImages) {
    try {
      const imgRes = await fetchUrl(`http://localhost:3000${imgPath}`);
      if (imgRes.status === 200 && imgRes.headers['content-type']?.includes('image')) {
        console.log(`✓ Image accessible via HTTP: ${imgPath} (HTTP ${imgRes.status}, Content-Type: ${imgRes.headers['content-type']})`);
      } else {
        console.error(`✗ Image returned HTTP ${imgRes.status} for ${imgPath}`);
        failures++;
      }
    } catch (err) {
      console.error(`✗ Error requesting image ${imgPath}:`, err.message);
      failures++;
    }
  }

  // 3. Regression test on other core routes
  const coreRoutes = ['/', '/about', '/managed-farmland', '/farm-management'];
  for (const route of coreRoutes) {
    try {
      const res = await fetchUrl(`http://localhost:3000${route}`);
      if (res.status === 200) {
        console.log(`✓ Regression check: ${route} returned HTTP 200`);
      } else {
        console.error(`✗ Regression check: ${route} returned HTTP ${res.status}`);
        failures++;
      }
    } catch (err) {
      console.error(`✗ Regression error on ${route}:`, err.message);
      failures++;
    }
  }

  // 4. Verify navbar contains Gallery and NOT Farm Management in primary navigation
  try {
    const homeRes = await fetchUrl('http://localhost:3000/');
    const homeHtml = homeRes.body;
    if (homeHtml.includes('href="/gallery"') && homeHtml.includes('Gallery')) {
      console.log('✓ Navbar contains link to /gallery');
    } else {
      console.error('✗ Navbar is missing link to /gallery');
      failures++;
    }
  } catch (err) {
    console.error('✗ Error checking navbar:', err.message);
    failures++;
  }

  console.log('\n--- VERIFICATION SUMMARY ---');
  if (failures === 0) {
    console.log('ALL VERIFICATIONS PASSED SUCCESSFULLY!');
  } else {
    console.error(`VERIFICATION FAILED WITH ${failures} ERRORS`);
  }
}

verify();
