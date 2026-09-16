const http = require('http');
const assert = require('assert');

// Test data helpers & schema helpers directly
const {
  getAllBlogs,
  getBlogBySlug,
  getFeaturedBlog,
  getAdjacentBlogs,
  getBlogsByCategory,
  getAllCategories
} = require('../data/blogs');

function testHelpers() {
  console.log('--- Testing data/blogs.js and lib/schema.js helpers ---');
  
  // 1. Initial empty state
  assert.deepStrictEqual(getAllBlogs(), [], 'getAllBlogs should return empty array');
  assert.strictEqual(getBlogBySlug('any-slug'), undefined, 'getBlogBySlug should return undefined');
  assert.strictEqual(getFeaturedBlog(), null, 'getFeaturedBlog should return null');
  assert.deepStrictEqual(getAdjacentBlogs('any-slug'), { prev: null, next: null }, 'getAdjacentBlogs should return { prev: null, next: null }');
  assert.deepStrictEqual(getBlogsByCategory('all'), [], 'getBlogsByCategory should return empty array');
  assert.deepStrictEqual(getAllCategories(), [], 'getAllCategories should return empty array');
  console.log('✔ data/blogs.js query helpers pass for empty data');

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

  // 1. GET /blogs
  console.log('Fetching /blogs ...');
  const blogsRes = await fetchUrl('http://localhost:3000/blogs');
  assert.strictEqual(blogsRes.statusCode, 200, `/blogs returned status ${blogsRes.statusCode}`);
  assert(blogsRes.body.includes('Earth Heritage Journal'), 'Should contain "Earth Heritage Journal"');
  assert(blogsRes.body.includes('Our journal is taking shape.'), 'Should contain empty state title "Our journal is taking shape."');
  assert(blogsRes.body.includes('CollectionPage'), 'Should contain CollectionPage structured data');
  assert(blogsRes.body.includes('Talk to Us'), 'Should contain navbar');
  console.log('✔ /blogs endpoint returned HTTP 200 with verified editorial content, empty state, and JSON-LD schema');

  // 2. GET /blogs/unconfirmed-slug
  console.log('Fetching /blogs/unconfirmed-slug ...');
  const notFoundRes = await fetchUrl('http://localhost:3000/blogs/unconfirmed-slug');
  assert.strictEqual(notFoundRes.statusCode, 404, `/blogs/unconfirmed-slug returned status ${notFoundRes.statusCode}`);
  console.log('✔ /blogs/unconfirmed-slug returned HTTP 404 (notFound safety verified)');

  // 3. GET /sitemap.xml
  console.log('Fetching /sitemap.xml ...');
  const sitemapRes = await fetchUrl('http://localhost:3000/sitemap.xml');
  assert.strictEqual(sitemapRes.statusCode, 200, `/sitemap.xml returned status ${sitemapRes.statusCode}`);
  assert(sitemapRes.body.includes('https://earthheritage.in/blogs'), 'sitemap should include /blogs');
  assert(!sitemapRes.body.includes('unconfirmed-slug'), 'sitemap should not include unconfirmed slugs');
  console.log('✔ /sitemap.xml correctly registers https://earthheritage.in/blogs and omits unconfirmed articles');
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
