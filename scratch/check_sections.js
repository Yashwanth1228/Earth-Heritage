const http = require('http');

http.get('http://localhost:3000/about', (res) => {
  let d = '';
  res.on('data', chunk => d += chunk);
  res.on('end', () => {
    const regex = /<section[^>]*id="([^"]*)"/g;
    let match;
    console.log('HTTP status:', res.statusCode);
    while ((match = regex.exec(d)) !== null) {
      console.log(`Found section id: "${match[1]}" at index ${match.index}`);
    }
  });
});
