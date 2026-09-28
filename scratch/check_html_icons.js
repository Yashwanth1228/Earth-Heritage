const http = require('http');

http.get('http://localhost:3000/', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const iconLinks = d.match(/<link[^>]*rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]*>/gi);
    console.log('Icon links in HTML:');
    if (iconLinks) {
      iconLinks.forEach(link => console.log('  ', link));
    } else {
      console.log('  None found');
    }
  });
});
