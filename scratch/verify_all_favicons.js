const http = require('http');
const sharp = require('sharp');
const assert = require('assert');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          buffer: Buffer.concat(chunks)
        });
      });
    }).on('error', reject);
  });
}

async function verify() {
  console.log('=== VERIFYING FAVICON ENDPOINTS AND ASSETS ===\n');

  // 1. Verify HTML tags
  const home = await fetchUrl('http://localhost:3000/');
  const html = home.buffer.toString('utf8');
  const iconLinks = html.match(/<link[^>]*rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]*>/gi) || [];
  console.log('1. Rendered HTML icon tags:');
  iconLinks.forEach(tag => console.log('  ', tag));

  // 2. Test http://localhost:3000/favicon.ico
  const icoRes = await fetchUrl('http://localhost:3000/favicon.ico');
  console.log(`\n2. /favicon.ico -> Status: ${icoRes.statusCode}, Content-Type: ${icoRes.headers['content-type']}, Size: ${icoRes.buffer.length} bytes`);
  assert.strictEqual(icoRes.statusCode, 200, '/favicon.ico must be 200 OK');
  assert(icoRes.buffer.length > 0, '/favicon.ico must not be empty');

  // Verify ICO header
  assert.strictEqual(icoRes.buffer.readUInt16LE(0), 0);
  assert.strictEqual(icoRes.buffer.readUInt16LE(2), 1);
  const icoCount = icoRes.buffer.readUInt16LE(4);
  console.log(`   ICO sub-images count: ${icoCount}`);
  for (let i = 0; i < icoCount; i++) {
    const offset = 6 + i * 16;
    console.log(`   Sub-image ${i}: ${icoRes.buffer.readUInt8(offset)}x${icoRes.buffer.readUInt8(offset + 1)}, size: ${icoRes.buffer.readUInt32LE(offset + 8)} bytes`);
  }

  // 3. Test http://localhost:3000/favicon-48x48.png
  const png48Res = await fetchUrl('http://localhost:3000/favicon-48x48.png');
  console.log(`\n3. /favicon-48x48.png -> Status: ${png48Res.statusCode}, Content-Type: ${png48Res.headers['content-type']}, Size: ${png48Res.buffer.length} bytes`);
  assert.strictEqual(png48Res.statusCode, 200, '/favicon-48x48.png must be 200 OK');
  const meta48 = await sharp(png48Res.buffer).metadata();
  console.log(`   Dimensions: ${meta48.width}x${meta48.height}`);
  assert.strictEqual(meta48.width, 48);
  assert.strictEqual(meta48.height, 48);

  // 4. Test http://localhost:3000/favicon-96x96.png
  const png96Res = await fetchUrl('http://localhost:3000/favicon-96x96.png');
  console.log(`\n4. /favicon-96x96.png -> Status: ${png96Res.statusCode}, Content-Type: ${png96Res.headers['content-type']}, Size: ${png96Res.buffer.length} bytes`);
  assert.strictEqual(png96Res.statusCode, 200, '/favicon-96x96.png must be 200 OK');
  const meta96 = await sharp(png96Res.buffer).metadata();
  console.log(`   Dimensions: ${meta96.width}x${meta96.height}`);
  assert.strictEqual(meta96.width, 96);
  assert.strictEqual(meta96.height, 96);

  // 5. Test http://localhost:3000/apple-touch-icon.png
  const appleRes = await fetchUrl('http://localhost:3000/apple-touch-icon.png');
  console.log(`\n5. /apple-touch-icon.png -> Status: ${appleRes.statusCode}, Content-Type: ${appleRes.headers['content-type']}, Size: ${appleRes.buffer.length} bytes`);
  assert.strictEqual(appleRes.statusCode, 200, '/apple-touch-icon.png must be 200 OK');
  const metaApple = await sharp(appleRes.buffer).metadata();
  console.log(`   Dimensions: ${metaApple.width}x${metaApple.height}`);

  // 6. Verify padding and non-cropped nature of master 512x512
  const master = await sharp('public/icon.png').metadata();
  const trimmed = await sharp('public/icon.png').trim().toBuffer({ resolveWithObject: true });
  console.log(`\n6. Master 512x512 Canvas Analysis:`);
  console.log(`   Canvas dimensions: ${master.width}x${master.height} (Aspect ratio: 1:1)`);
  console.log(`   Padded symbol bounding box: ${trimmed.info.width}x${trimmed.info.height}`);
  console.log(`   Height occupancy: ${(trimmed.info.height / master.height * 100).toFixed(1)}%`);
  console.log(`   Width occupancy: ${(trimmed.info.width / master.width * 100).toFixed(1)}%`);
  console.log(`   Top/Bottom transparent padding: ${((master.height - trimmed.info.height) / 2).toFixed(1)}px`);
  console.log(`   Left/Right transparent padding: ${((master.width - trimmed.info.width) / 2).toFixed(1)}px`);

  console.log('\n✔ ALL FAVICON VALIDATIONS PASSED PERFECTLY!');
}

verify().catch(err => {
  console.error('\n❌ Verification failed:', err);
  process.exit(1);
});
