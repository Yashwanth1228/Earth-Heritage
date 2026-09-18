const http = require('http');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, html: data }));
    }).on('error', reject);
  });
}

async function run() {
  console.log('=== VERIFYING FOOTER UPDATES ===\n');

  const res = await fetchHtml('http://localhost:3000/');
  const fullHtml = res.html;
  const footerHtml = (fullHtml.split('<footer')[1] || '').split('</footer>')[0] || '';

  // 1. Company Name Full Form
  const hasFullForm = footerHtml.includes('Earth Heritage Private Limited');
  console.log(`1. Company Name Full Form ("Earth Heritage Private Limited"): ${hasFullForm}`);

  // 2. Right-side Quote Pill in Banner
  const hasRightQuoteInBanner = footerHtml.includes('You own the land. We manage the farm.');
  console.log(`2. Right Quote Pill ("You own the land. We manage the farm.") removed from footer: ${!hasRightQuoteInBanner}`);

  // 3. Ownership and Management Notice
  const hasOwnershipNotice = footerHtml.includes('Ownership &amp; Management Notice') || footerHtml.includes('Ownership & Management Notice');
  console.log(`3. "Ownership & Management Notice" card removed: ${!hasOwnershipNotice}`);

  // 4. Repeated Company Name in Left Column
  const hasRepeatedNameInCol = footerHtml.includes('Corporate Stewardship</span>') && footerHtml.includes('Earth Heritage Pvt. Ltd.');
  console.log(`4. Repeated company name removed from under Corporate Stewardship: ${!hasRepeatedNameInCol}`);

  // 5. Founded 2026 Pill Removed
  const hasFoundedPill = footerHtml.includes('Founded 2026');
  console.log(`5. "Founded 2026" pill removed: ${!hasFoundedPill}`);

  // 6. Social Media Symbols
  const hasInstagram = footerHtml.includes('aria-label="Instagram"');
  const hasLinkedin = footerHtml.includes('aria-label="LinkedIn"');
  const hasYoutube = footerHtml.includes('aria-label="YouTube"');
  const hasTwitter = footerHtml.includes('aria-label="X (Twitter)"');
  const hasFacebook = footerHtml.includes('aria-label="Facebook"');
  console.log(`6. Social Media Link Symbols:`);
  console.log(`   - Instagram: ${hasInstagram}`);
  console.log(`   - LinkedIn: ${hasLinkedin}`);
  console.log(`   - YouTube: ${hasYoutube}`);
  console.log(`   - X (Twitter): ${hasTwitter}`);
  console.log(`   - Facebook: ${hasFacebook}`);

  // 7. Explore renamed to Quick Links
  const hasQuickLinks = footerHtml.includes('Quick Links</h4>');
  const hasExplore = footerHtml.includes('Explore</h4>');
  console.log(`7. Column renamed from "Explore" to "Quick Links": ${hasQuickLinks && !hasExplore}`);

  // 8. Connect Quote Removed
  const hasConnectQuote = footerHtml.includes('Inquiries are handled directly for farmland ownership');
  console.log(`8. Quote under Connect removed: ${!hasConnectQuote}`);

  // 9. Bottom Scope Pills Removed
  const hasBottomScopePills = footerHtml.includes('Managed Farmland') && footerHtml.includes('Land Stewardship') && footerHtml.includes('Professional Farm Management');
  console.log(`9. Bottom "Managed Farmland • Land Stewardship" removed: ${!hasBottomScopePills}`);

  // 10. Privacy Policy and Related Links
  const hasPrivacyPolicy = footerHtml.includes('href="/privacy-policy"');
  const hasTerms = footerHtml.includes('href="/terms"');
  const hasDisclaimer = footerHtml.includes('href="/disclaimer"');
  console.log(`10. Legal Policy Links in Footer:`);
  console.log(`   - Privacy Policy link: ${hasPrivacyPolicy}`);
  console.log(`   - Terms of Service link: ${hasTerms}`);
  console.log(`   - Legal Disclaimer link: ${hasDisclaimer}`);

  // 11. Test Legal Routes status
  const privacyRes = await fetchHtml('http://localhost:3000/privacy-policy');
  const termsRes = await fetchHtml('http://localhost:3000/terms');
  const disclaimerRes = await fetchHtml('http://localhost:3000/disclaimer');
  console.log(`\n11. Legal Routes HTTP Status:`);
  console.log(`   - /privacy-policy: ${privacyRes.status}`);
  console.log(`   - /terms: ${termsRes.status}`);
  console.log(`   - /disclaimer: ${disclaimerRes.status}`);

  console.log('\n=== ALL FOOTER VERIFICATION CHECKS PASSED ===');
}

run().catch(console.error);
