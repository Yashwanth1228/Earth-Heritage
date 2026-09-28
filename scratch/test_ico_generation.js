const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function createIco(pngBuffersWithSize) {
  // pngBuffersWithSize: array of { width, height, buffer }
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

async function testGeneration() {
  const markPath = path.join(__dirname, '../public/images/earth-heritage-mark.png');

  // 1. Trim the source mark to ensure exact tight bounding box
  const trimmedMark = await sharp(markPath).trim().toBuffer({ resolveWithObject: true });
  console.log('Trimmed source symbol:', trimmedMark.info.width, 'x', trimmedMark.info.height);

  // 2. We want the symbol to occupy ~65% of the 512x512 canvas.
  // Target height = Math.round(512 * 0.65) = 333px.
  const targetHeight = 333;
  const targetWidth = Math.round(trimmedMark.info.width * (targetHeight / trimmedMark.info.height)); // 306px

  // Resize trimmed symbol smoothly with lanczos3
  const resizedSymbol = await sharp(trimmedMark.data)
    .resize(targetWidth, targetHeight, {
      fit: 'contain',
      kernel: 'lanczos3'
    })
    .toBuffer();

  // Create 512x512 transparent master canvas and place the symbol dead center
  const master512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      {
        input: resizedSymbol,
        gravity: 'centre'
      }
    ])
    .png()
    .toBuffer();

  console.log('Master 512x512 padded buffer size:', master512.length);

  // Generate 16x16, 32x32, 48x48, 96x96, 180x180
  const png16 = await sharp(master512).resize(16, 16).png().toBuffer();
  const png32 = await sharp(master512).resize(32, 32).png().toBuffer();
  const png48 = await sharp(master512).resize(48, 48).png().toBuffer();
  const png96 = await sharp(master512).resize(96, 96).png().toBuffer();
  const png180 = await sharp(master512).resize(180, 180).png().toBuffer();

  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 }
  ]);

  console.log('Generated ICO size:', icoBuffer.length);
  console.log('Generated 48x48 PNG size:', png48.length);
  console.log('Generated 96x96 PNG size:', png96.length);
  console.log('Generated 180x180 PNG size:', png180.length);

  // Save to scratch to verify
  const scratchDir = path.join(__dirname, 'test_favicons');
  if (!fs.existsSync(scratchDir)) fs.mkdirSync(scratchDir);
  fs.writeFileSync(path.join(scratchDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(scratchDir, 'favicon-48x48.png'), png48);
  fs.writeFileSync(path.join(scratchDir, 'favicon-96x96.png'), png96);
  fs.writeFileSync(path.join(scratchDir, 'apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(scratchDir, 'icon-512.png'), master512);

  // Verify that the images can be read back and trimmed dimensions on 512 match expected
  const testMaster = await sharp(master512).trim().toBuffer({ resolveWithObject: true });
  console.log('Trimmed area inside 512 master:', testMaster.info.width, 'x', testMaster.info.height);
  console.log('Occupancy height %:', (testMaster.info.height / 512 * 100).toFixed(1) + '%');
  console.log('Occupancy width %:', (testMaster.info.width / 512 * 100).toFixed(1) + '%');
}

testGeneration().catch(console.error);
