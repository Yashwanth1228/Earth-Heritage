const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function createIco(pngBuffersWithSize) {
  const count = pngBuffersWithSize.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4); // Number of images

  let currentOffset = 6 + (count * 16);
  const dirEntries = [];
  const imageBuffers = [];

  for (const item of pngBuffersWithSize) {
    const entry = Buffer.alloc(16);
    const w = item.width >= 256 ? 0 : item.width;
    const h = item.height >= 256 ? 0 : item.height;
    entry.writeUInt8(w, 0);
    entry.writeUInt8(h, 1);
    entry.writeUInt8(0, 2); // Color count
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Planes
    entry.writeUInt16LE(32, 6); // BPP
    entry.writeUInt32LE(item.buffer.length, 8); // Size
    entry.writeUInt32LE(currentOffset, 12); // Offset

    dirEntries.push(entry);
    imageBuffers.push(item.buffer);
    currentOffset += item.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...imageBuffers]);
}

async function buildFavicons() {
  const rootDir = path.join(__dirname, '..');
  const markPath = path.join(rootDir, 'public/images/earth-heritage-mark.png');

  console.log('1. Reading brand symbol from:', markPath);
  // Trim transparent edges of the brand mark to obtain true bounding box
  const trimmed = await sharp(markPath).trim().toBuffer({ resolveWithObject: true });
  console.log(`   Source mark bounding box: ${trimmed.info.width}x${trimmed.info.height} (Aspect ratio: ${(trimmed.info.width / trimmed.info.height).toFixed(4)})`);

  // Target: symbol occupies ~65% of 512x512 master canvas
  const canvasSize = 512;
  const targetHeight = Math.round(canvasSize * 0.65); // 333px
  const targetWidth = Math.round(trimmed.info.width * (targetHeight / trimmed.info.height)); // 306px

  console.log(`2. Scaling symbol to ${targetWidth}x${targetHeight} inside ${canvasSize}x${canvasSize} canvas`);
  console.log(`   Symbol height coverage: ${(targetHeight / canvasSize * 100).toFixed(1)}%`);
  console.log(`   Symbol width coverage: ${(targetWidth / canvasSize * 100).toFixed(1)}%`);
  console.log(`   Padding: Top/Bottom = ${((canvasSize - targetHeight) / 2).toFixed(1)}px, Left/Right = ${((canvasSize - targetWidth) / 2).toFixed(1)}px`);

  const scaledSymbol = await sharp(trimmed.data)
    .resize(targetWidth, targetHeight, {
      fit: 'contain',
      kernel: 'lanczos3'
    })
    .toBuffer();

  // Create 512x512 transparent canvas and place scaled symbol in center
  const master512 = await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      {
        input: scaledSymbol,
        gravity: 'centre'
      }
    ])
    .png()
    .toBuffer();

  // Generate all required resolutions
  console.log('3. Generating resized assets...');
  const png16 = await sharp(master512).resize(16, 16, { kernel: 'lanczos3' }).png().toBuffer();
  const png32 = await sharp(master512).resize(32, 32, { kernel: 'lanczos3' }).png().toBuffer();
  const png48 = await sharp(master512).resize(48, 48, { kernel: 'lanczos3' }).png().toBuffer();
  const png96 = await sharp(master512).resize(96, 96, { kernel: 'lanczos3' }).png().toBuffer();
  const png180 = await sharp(master512).resize(180, 180, { kernel: 'lanczos3' }).png().toBuffer();

  // Build standard multi-resolution ICO (48x48, 32x32, 16x16)
  const icoBuffer = createIco([
    { width: 48, height: 48, buffer: png48 },
    { width: 32, height: 32, buffer: png32 },
    { width: 16, height: 16, buffer: png16 }
  ]);

  // 4. Write public files
  console.log('4. Writing assets to /public...');
  fs.writeFileSync(path.join(rootDir, 'public/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(rootDir, 'public/favicon-48x48.png'), png48);
  fs.writeFileSync(path.join(rootDir, 'public/favicon-96x96.png'), png96);
  fs.writeFileSync(path.join(rootDir, 'public/apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(rootDir, 'public/apple-icon.png'), png180);
  fs.writeFileSync(path.join(rootDir, 'public/icon.png'), master512);
  fs.writeFileSync(path.join(rootDir, 'public/icons/icon-512.png'), master512);

  // 5. Update app/ directory assets so Next.js internal routes serve the identical padded assets
  console.log('5. Updating assets in /app...');
  fs.writeFileSync(path.join(rootDir, 'app/favicon.ico'), icoBuffer);
  if (fs.existsSync(path.join(rootDir, 'app/apple-icon.png'))) {
    fs.writeFileSync(path.join(rootDir, 'app/apple-icon.png'), png180);
  }
  if (fs.existsSync(path.join(rootDir, 'app/icon.png'))) {
    fs.writeFileSync(path.join(rootDir, 'app/icon.png'), master512);
  }

  console.log('✓ All favicon assets generated successfully:');
  console.log('  - public/favicon.ico:', icoBuffer.length, 'bytes');
  console.log('  - public/favicon-48x48.png:', png48.length, 'bytes');
  console.log('  - public/favicon-96x96.png:', png96.length, 'bytes');
  console.log('  - public/apple-touch-icon.png:', png180.length, 'bytes');
  console.log('  - public/icon.png:', master512.length, 'bytes');
  console.log('  - app/favicon.ico:', icoBuffer.length, 'bytes');
}

buildFavicons().catch(err => {
  console.error('Error building favicons:', err);
  process.exit(1);
});
