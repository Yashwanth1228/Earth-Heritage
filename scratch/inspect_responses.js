const http = require('http');

function fetchBody(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('--- Checking /projects HTML ---');
  const proj = await fetchBody('/projects');
  console.log('Status:', proj.statusCode);
  const titleMatch = proj.body.match(/<title>([^<]+)<\/title>/);
  console.log('Title:', titleMatch ? titleMatch[1] : 'None');
  console.log('Contains "Taking Shape" state:', proj.body.includes('taking shape') || proj.body.includes('Projects'));

  console.log('\n--- Checking /projects/test-project HTML ---');
  const invalid = await fetchBody('/projects/test-project');
  console.log('Status:', invalid.statusCode);
  const invalidTitle = invalid.body.match(/<title>([^<]+)<\/title>/);
  console.log('Title:', invalidTitle ? invalidTitle[1] : 'None');
  console.log('Contains 404 or Not Found:', invalid.body.includes('404') || invalid.body.includes('not found') || invalid.body.includes('This page could not be found'));
}

verify();
