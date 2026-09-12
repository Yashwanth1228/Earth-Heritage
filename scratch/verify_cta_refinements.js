const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    
    const tests = [
      { name: 'WhatsApp button presence', pass: data.includes('Contact Earth Heritage on WhatsApp') },
      { name: 'WhatsApp official SVG path', pass: data.includes('M19.05 4.91A9.816') },
      { name: 'WhatsApp green color (#25D366)', pass: data.includes('#25D366') },
      { name: 'Enquire Now button presence', pass: data.includes('Enquire Now') },
      { name: 'Enquire Now button aria-label', pass: data.includes('Open Earth Heritage enquiry form') },
      { name: 'Modal dialog data-lenis-prevent', pass: data.includes('data-lenis-prevent="true"') },
      { name: 'Modal dialog role="dialog"', pass: data.includes('role="dialog"') },
      { name: 'Modal title id', pass: data.includes('enquiry-modal-title') },
      { name: 'Lenis stopped rule', pass: data.includes('.lenis.lenis-stopped') },
      { name: 'CSS pulse animations', pass: data.includes('enquire-pulse') && data.includes('whatsapp-pulse') }
    ];

    let allPass = true;
    for (const t of tests) {
      console.log(`${t.pass ? '✓ PASS' : '✗ FAIL'}: ${t.name}`);
      if (!t.pass) allPass = false;
    }

    if (allPass) {
      console.log('\nAll SSR and CSS validation checks passed successfully!');
      process.exit(0);
    } else {
      console.error('\nSome checks failed!');
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('Request error:', err.message);
  process.exit(1);
});
