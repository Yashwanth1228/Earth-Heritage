async function test() {
  try {
    const ppRes = await fetch('http://localhost:3000/privacy-policy');
    const ppText = await ppRes.text();
    console.log('Privacy Policy Status:', ppRes.status);
    console.log('Privacy Policy has "Privacy Policy":', ppText.includes('Privacy Policy'));
    console.log('Privacy Policy has NO id="terms":', !ppText.includes('id="terms"'));
    console.log('Privacy Policy has NO "Section Divider • Terms":', !ppText.includes('Section Divider'));

    const termsRes = await fetch('http://localhost:3000/terms');
    const termsText = await termsRes.text();
    console.log('Terms Status:', termsRes.status);
    console.log('Terms has "Terms & Conditions":', termsText.includes('Terms & Conditions'));
    console.log('Terms has "15. Contact":', termsText.includes('15. Contact'));

    const homeRes = await fetch('http://localhost:3000/');
    const homeText = await homeRes.text();
    console.log('Home Status:', homeRes.status);
    console.log('Home includes hero-managed-crops.jpg:', homeText.includes('hero-managed-crops.jpg'));
    console.log('Home includes old solution-management.jpg in hero:', homeText.includes('solution-management.jpg'));
  } catch (err) {
    console.error('Error testing endpoints:', err);
  }
}

test();
