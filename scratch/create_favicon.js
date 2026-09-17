const fs = require('fs');
const path = require('path');

// Read the high quality logo mark PNG
const pngBuffer = fs.readFileSync(path.join(__dirname, '../public/icon.png'));

// Construct a valid ICO header containing the PNG data
// ICO Header: 6 bytes
// 0-1: Reserved (0)
// 2-3: Image type (1 for ICO)
// 4-5: Number of images (1)
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);

// Directory Entry: 16 bytes
// 0: Width (0 means >= 256px)
// 1: Height (0 means >= 256px)
// 2: Color palette count (0)
// 3: Reserved (0)
// 4-5: Color planes (1)
// 6-7: Bits per pixel (32)
// 8-11: Size of image data in bytes
// 12-15: Offset of image data from beginning of file (6 + 16 = 22)
const dirEntry = Buffer.alloc(16);
dirEntry.writeUInt8(0, 0); // width: 0 for 256+
dirEntry.writeUInt8(0, 1); // height: 0 for 256+
dirEntry.writeUInt8(0, 2); // color count: 0
dirEntry.writeUInt8(0, 3); // reserved: 0
dirEntry.writeUInt16LE(1, 4); // color planes: 1
dirEntry.writeUInt16LE(32, 6); // bpp: 32
dirEntry.writeUInt32LE(pngBuffer.length, 8); // size
dirEntry.writeUInt32LE(22, 12); // offset

const icoBuffer = Buffer.concat([header, dirEntry, pngBuffer]);

// Write favicon.ico to public and app directories
fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoBuffer);
fs.writeFileSync(path.join(__dirname, '../app/favicon.ico'), icoBuffer);

// Copy icon.png to app/icon.png and app/apple-icon.png for Next.js automatic App Router metadata icons
fs.writeFileSync(path.join(__dirname, '../app/icon.png'), pngBuffer);
fs.writeFileSync(path.join(__dirname, '../app/apple-icon.png'), pngBuffer);

// Also copy to public/apple-icon.png
fs.writeFileSync(path.join(__dirname, '../public/apple-icon.png'), pngBuffer);

console.log('✓ Successfully created:');
console.log('  - public/favicon.ico (' + icoBuffer.length + ' bytes)');
console.log('  - app/favicon.ico (' + icoBuffer.length + ' bytes)');
console.log('  - app/icon.png (' + pngBuffer.length + ' bytes)');
console.log('  - app/apple-icon.png (' + pngBuffer.length + ' bytes)');
console.log('  - public/apple-icon.png (' + pngBuffer.length + ' bytes)');
