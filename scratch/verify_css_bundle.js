const http = require('http');

http.get('http://localhost:3000', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    // Find linked CSS files
    const cssMatches = [...html.matchAll(/href="(\/_next\/static\/css\/[^"]+\.css)"/g)].map(m => m[1]);
    console.log('Found CSS files:', cssMatches);

    if (cssMatches.length === 0) {
      console.error('No CSS files found in HTML');
      process.exit(1);
    }

    let checked = 0;
    let foundPulse = false;
    let foundLenis = false;

    cssMatches.forEach(cssPath => {
      http.get('http://localhost:3000' + cssPath, (cssRes) => {
        let cssData = '';
        cssRes.on('data', c => cssData += c);
        cssRes.on('end', () => {
          if (cssData.includes('enquire-pulse') && cssData.includes('whatsapp-pulse')) {
            foundPulse = true;
          }
          if (cssData.includes('.lenis.lenis-stopped') || cssData.includes('lenis-stopped')) {
            foundLenis = true;
          }
          checked++;
          if (checked === cssMatches.length) {
            console.log('CSS enquire-pulse & whatsapp-pulse present in bundle:', foundPulse ? '✓ YES' : '✗ NO');
            console.log('CSS lenis-stopped present in bundle:', foundLenis ? '✓ YES' : '✗ NO');
            if (foundPulse && foundLenis) {
              console.log('\n✓ Production CSS contains all required animation & scroll lock rules.');
            } else {
              process.exit(1);
            }
          }
        });
      });
    });
  });
});
