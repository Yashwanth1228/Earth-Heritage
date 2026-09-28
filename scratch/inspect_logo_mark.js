const sharp = require('sharp');
const path = require('path');

async function inspectMark() {
  const markPath = path.join(__dirname, '../public/images/earth-heritage-mark.png');
  const image = sharp(markPath);
  const metadata = await image.metadata();
  console.log('Original mark metadata:', metadata);

  // Get trimmed bounding box
  const trimmed = await sharp(markPath).trim().toBuffer({ resolveWithObject: true });
  console.log('Trimmed dimensions:', trimmed.info.width, 'x', trimmed.info.height);

  // Calculate scaling for 60%, 65%, 70% of 512
  for (const percent of [60, 62, 65, 68, 70]) {
    const targetDimension = Math.round(512 * (percent / 100));
    // Since height (474) > width (435), the symbol's height will be targetDimension
    const scale = targetDimension / trimmed.info.height;
    const scaledWidth = Math.round(trimmed.info.width * scale);
    const scaledHeight = targetDimension;
    const padX = (512 - scaledWidth) / 2;
    const padY = (512 - scaledHeight) / 2;
    console.log(`Percent: ${percent}% -> scaled: ${scaledWidth}x${scaledHeight}, padding X: ${padX}px, padding Y: ${padY}px`);
  }
}

inspectMark().catch(console.error);
