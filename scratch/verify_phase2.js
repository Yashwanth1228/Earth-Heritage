const http = require('http');

function checkUrl(urlPath) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path: urlPath,
          statusCode: res.statusCode,
          bodyLength: data.length,
          snippet: data.slice(0, 300)
        });
      });
    }).on('error', (err) => {
      resolve({ path: urlPath, error: err.message });
    });
  });
}

async function run() {
  console.log('--- Testing /projects and /projects/[slug] ---');
  const r1 = await checkUrl('/projects');
  console.log('1. /projects status:', r1.statusCode);

  const r2 = await checkUrl('/projects/unconfirmed-slug');
  console.log('2. /projects/unconfirmed-slug status:', r2.statusCode);

  const r3 = await checkUrl('/projects/green-valley');
  console.log('3. /projects/green-valley status:', r3.statusCode);

  console.log('\n--- Checking data/projects.js ---');
  const { projects, getAllProjects, getProjectBySlug, getAdjacentProjects } = require('../data/projects');
  console.log('projects array length:', projects.length);
  console.log('getAllProjects():', getAllProjects());
  console.log('getProjectBySlug("random"):', getProjectBySlug('random'));
  console.log('getAdjacentProjects("random"):', getAdjacentProjects('random'));
}

run();
