const http = require('http');

http.get('http://localhost:3000', (res) => {
  console.log('Status code:', res.statusCode);
  console.log('Headers:', res.headers);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTML length:', data.length);
    console.log('Includes Blogs:', data.includes('Blogs'));
    console.log('Includes Events:', data.includes('Events'));
    console.log('Includes Insights:', data.includes('Insights'));
    console.log('Includes Main Navigation:', data.includes('Main Navigation'));
  });
});
