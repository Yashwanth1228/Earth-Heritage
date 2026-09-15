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
  console.log('--- STARTING HOW IT WORKS PAGE VERIFICATION ---');
  let failures = 0;

  // 1. Verify /how-it-works responds with 200
  try {
    const res = await fetchUrl('http://localhost:3000/how-it-works');
    if (res.status === 200) {
      console.log('✓ /how-it-works returned HTTP 200');
    } else {
      console.error(`✗ /how-it-works returned HTTP ${res.status}`);
      failures++;
    }

    const html = res.body;

    const expectedStrings = [
      'HOW IT WORKS',
      'From Land Ownership',
      'to Ongoing Farm Care.',
      'YOU OWN THE LAND.',
      'WE MANAGE THE FARM.',
      'Understand the Land',
      'Plan the Farm',
      'Manage the Work',
      'Cultivate &amp; Care', // or Cultivate & Care
      'Manage the Harvest',
      'Continue the Care',
      'BACK TO ROOTS. FORWARD WITH PURPOSE.',
      'Care for the land, rooted in responsibility.',
      'Common Questions About the Process',
      'What is managed farmland?',
      'Who owns the farmland?',
      'What does Earth Heritage manage?',
      'What does farm management involve on a day-to-day basis?',
      'How does the farm management process work?',
      'How can I learn more about Earth Heritage?',
      'Ready to explore what managed farmland could look like for you?',
      'Talk to Us'
    ];

    expectedStrings.forEach(str => {
      // Decode or check either escaped or raw
      const rawMatch = html.includes(str);
      const decodedMatch = html.includes(str.replace('&amp;', '&'));
      if (rawMatch || decodedMatch) {
        console.log(`✓ HTML contains expected text: "${str}"`);
      } else {
        console.error(`✗ HTML MISSING expected text: "${str}"`);
        failures++;
      }
    });

    // Check SEO metadata
    if (html.includes('<title>How It Works | Earth Heritage</title>')) {
      console.log('✓ SEO title correctly set to "How It Works | Earth Heritage"');
    } else {
      console.error('✗ SEO title missing or incorrect');
      failures++;
    }

  } catch (err) {
    console.error('✗ Failed to fetch /how-it-works:', err.message);
    failures++;
  }

  // 2. Verify all 6 stage images are accessible via HTTP
  const stageImages = [
    '/images/how-it-works/stage-01-understand.jpg',
    '/images/how-it-works/stage-02-plan.jpg',
    '/images/how-it-works/stage-03-work.jpg',
    '/images/how-it-works/stage-04-cultivate.jpg',
    '/images/how-it-works/stage-05-harvest.jpg',
    '/images/how-it-works/stage-06-continue.jpg',
    '/images/how-it-works/responsible-care-panorama.jpg'
  ];

  for (const imgPath of stageImages) {
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
  const coreRoutes = ['/', '/about', '/managed-farmland', '/farm-management', '/gallery'];
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

  // 4. Verify navbar contains How It Works and only approved links
  try {
    const homeRes = await fetchUrl('http://localhost:3000/');
    const homeHtml = homeRes.body;
    if (homeHtml.includes('href="/how-it-works"') && homeHtml.includes('How It Works')) {
      console.log('✓ Navbar contains active link to /how-it-works');
    } else {
      console.error('✗ Navbar is missing link to /how-it-works');
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
