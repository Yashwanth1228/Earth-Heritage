const http = require('http');
const assert = require('assert');

function testEndpoint(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);
        resolve({
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          length: buffer.length,
          body: buffer.toString('utf8')
        });
      });
    }).on('error', reject);
  });
}

async function verifyFavicons() {
  console.log('=== VERIFYING FAVICON & ICON ROUTES ===');

  // 1. Check /favicon.ico
  const icoRes = await testEndpoint('http://localhost:3000/favicon.ico');
  console.log(`[1] /favicon.ico -> HTTP ${icoRes.statusCode}, Content-Type: ${icoRes.contentType}, Size: ${icoRes.length} bytes`);
  assert.strictEqual(icoRes.statusCode, 200, 'favicon.ico must return 200 OK');
  assert(icoRes.length > 0, 'favicon.ico must not be empty');

  // 2. Check /icon.png
  const pngRes = await testEndpoint('http://localhost:3000/icon.png');
  console.log(`[2] /icon.png -> HTTP ${pngRes.statusCode}, Content-Type: ${pngRes.contentType}, Size: ${pngRes.length} bytes`);
  assert.strictEqual(pngRes.statusCode, 200, 'icon.png must return 200 OK');
  assert(pngRes.length > 0, 'icon.png must not be empty');

  // 3. Check /apple-icon.png
  const appleRes = await testEndpoint('http://localhost:3000/apple-icon.png');
  console.log(`[3] /apple-icon.png -> HTTP ${appleRes.statusCode}, Content-Type: ${appleRes.contentType}, Size: ${appleRes.length} bytes`);
  assert.strictEqual(appleRes.statusCode, 200, 'apple-icon.png must return 200 OK');
  assert(appleRes.length > 0, 'apple-icon.png must not be empty');

  // 4. Check HTML <head> for <link rel="icon">
  const htmlRes = await testEndpoint('http://localhost:3000/');
  console.log(`[4] Homepage HTML -> HTTP ${htmlRes.statusCode}`);
  const html = htmlRes.body;
  const hasIconTag = html.includes('rel="icon"') || html.includes("rel='icon'");
  console.log('    Has <link rel="icon"> in HTML:', hasIconTag);
  assert(hasIconTag, 'HTML must contain rel="icon" tag in <head>');

  // Find all icon links in HTML
  const iconMatches = html.match(/<link[^>]+rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]*>/gi) || [];
  console.log('    Found icon link tags:');
  iconMatches.forEach(tag => console.log('     ', tag));

  console.log('\n✔ ALL FAVICON AND ICON VERIFICATIONS PASSED SUCCESSFULLY!');
}

verifyFavicons().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
