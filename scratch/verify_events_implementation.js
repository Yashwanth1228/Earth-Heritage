const http = require('http');
const assert = require('assert');

const {
  getAllEvents,
  getEventBySlug
} = require('../data/events');

function testHelpers() {
  console.log('--- Testing data/events.js helpers ---');
  
  const all = getAllEvents();
  assert.strictEqual(all.length, 6, 'Should have exactly 6 confirmed events');
  
  const harvest = getEventBySlug('seasonal-harvest-celebration');
  assert(harvest, 'Seasonal harvest celebration must exist');
  assert(harvest.theme, 'Event must have theme property matching reference design');
  assert.strictEqual(harvest.category, 'Community Gathering');
  
  console.log('✔ data/events.js helpers pass completely');
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body, headers: res.headers }));
    }).on('error', reject);
  });
}

async function testHttpEndpoints() {
  console.log('\n--- Testing Next.js Production Endpoints ---');

  // 1. GET /events
  console.log('Fetching /events ...');
  const eventsRes = await fetchUrl('http://localhost:3000/events');
  assert.strictEqual(eventsRes.statusCode, 200, `/events returned status ${eventsRes.statusCode}`);
  assert(eventsRes.body.includes('EVENTS &amp; MOMENTS') || eventsRes.body.includes('EVENTS & MOMENTS'), 'Should contain eyebrow "EVENTS & MOMENTS"');
  assert(eventsRes.body.includes('Where people, land and community come together.'), 'Should contain previous title wordings "Where people, land and community come together."');
  assert(eventsRes.body.includes('Seasonal Harvest Celebration'), 'Should contain event "Seasonal Harvest Celebration"');
  assert(eventsRes.body.includes('Theme:'), 'Should contain "Theme:" metadata');
  assert(eventsRes.body.includes('Guided Estate Walkthroughs'), 'Should contain event "Guided Estate Walkthroughs"');
  assert(eventsRes.body.includes('Stay connected with Earth Heritage.'), 'Should contain closing CTA');
  assert(eventsRes.body.includes('CollectionPage'), 'Should contain CollectionPage structured data');
  console.log('✔ /events endpoint returned HTTP 200 with original title wordings, direct event list, and CollectionPage schema');

  // 2. Verify untouched routes remain 200 OK
  console.log('Checking / ...');
  const homeRes = await fetchUrl('http://localhost:3000/');
  assert.strictEqual(homeRes.statusCode, 200, `/ returned status ${homeRes.statusCode}`);

  console.log('Checking /lp/managed-farmland ...');
  const lpRes = await fetchUrl('http://localhost:3000/lp/managed-farmland');
  assert.strictEqual(lpRes.statusCode, 200, `/lp/managed-farmland returned status ${lpRes.statusCode}`);

  console.log('Checking /blogs ...');
  const blogsRes = await fetchUrl('http://localhost:3000/blogs');
  assert.strictEqual(blogsRes.statusCode, 200, `/blogs returned status ${blogsRes.statusCode}`);

  console.log('✔ All un-touched routes (/, /lp/managed-farmland, /blogs) remain 100% operational');
}

async function run() {
  try {
    testHelpers();
    await testHttpEndpoints();
    console.log('\nALL VERIFICATION TESTS PASSED SUCCESSFULLY! 🚀');
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
}

run();
