const fs = require('fs');
const path = require('path');

console.log('--- Verifying Project Detail Components Integrity ---');

const componentsDir = path.join(__dirname, '../components/projects');
const files = fs.readdirSync(componentsDir);
console.log('Components found:', files);

// Check ProjectDetailHero.js
const heroCode = fs.readFileSync(path.join(componentsDir, 'ProjectDetailHero.js'), 'utf-8');
console.log('\n[ProjectDetailHero]');
console.log('Starts with #FAF6F0:', heroCode.includes('bg-[#FAF6F0]'));
console.log('Has Back to All Projects:', heroCode.includes('Back to All Projects'));
console.log('Has data-navbar-theme="light":', heroCode.includes('data-navbar-theme="light"'));
console.log('Omission check for status:', heroCode.includes('{status &&'));
console.log('Omission check for location:', heroCode.includes('{location &&'));
console.log('Omission check for tagline:', heroCode.includes('{tagline &&'));
console.log('Omission check for activeHeroImage:', heroCode.includes('{activeHeroImage &&'));

// Check ProjectDetailOverview.js
const overviewCode = fs.readFileSync(path.join(componentsDir, 'ProjectDetailOverview.js'), 'utf-8');
console.log('\n[ProjectDetailOverview]');
console.log('Background is #F0E0C6:', overviewCode.includes('bg-[#F0E0C6]'));
console.log('Has clean null return when no data:', overviewCode.includes('if (!contentText && (!features || features.length === 0)) {\n    return null;\n  }'));
console.log('Ownership philosophy text present:', overviewCode.includes('You own the titled farmland'));

// Check ProjectDetailStewardship.js
const stewardshipCode = fs.readFileSync(path.join(componentsDir, 'ProjectDetailStewardship.js'), 'utf-8');
console.log('\n[ProjectDetailStewardship]');
console.log('Background is #FAF6F0:', stewardshipCode.includes('bg-[#FAF6F0]'));
console.log('Has clean null return when no data:', stewardshipCode.includes('if (!project || !project.stewardshipApproach) {\n    return null;\n  }'));
console.log('Has "You own the land. We manage the farm.":', stewardshipCode.includes('You own the land. We manage the farm.'));

// Check ProjectDetailGallery.js
const galleryCode = fs.readFileSync(path.join(componentsDir, 'ProjectDetailGallery.js'), 'utf-8');
console.log('\n[ProjectDetailGallery]');
console.log('Background is #F0E0C6:', galleryCode.includes('bg-[#F0E0C6]'));
console.log('Has clean null return when no images:', galleryCode.includes('if (!galleryItems || galleryItems.length === 0) {\n    return null;\n  }'));

// Check ProjectDetailNavigation.js
const navCode = fs.readFileSync(path.join(componentsDir, 'ProjectDetailNavigation.js'), 'utf-8');
console.log('\n[ProjectDetailNavigation]');
console.log('Background is #FAF6F0:', navCode.includes('bg-[#FAF6F0]'));
console.log('Has clean null return when no adjacent projects:', navCode.includes('if (!prev && !next) {\n    return null;\n  }'));

// Check ProjectDetailCta.js
const ctaCode = fs.readFileSync(path.join(componentsDir, 'ProjectDetailCta.js'), 'utf-8');
console.log('\n[ProjectDetailCta]');
console.log('Background is #102B17:', ctaCode.includes('bg-[#102B17]'));
console.log('Has data-navbar-theme="dark":', ctaCode.includes('data-navbar-theme="dark"'));
console.log('Uses openEnquiryModal from EnquiryContext:', ctaCode.includes('openEnquiryModal('));
console.log('Pre-populates project context:', ctaCode.includes('enquiryInterest || `${projectName} Inquiry`'));

// Check app/projects/[slug]/page.js
const pageCode = fs.readFileSync(path.join(__dirname, '../app/projects/[slug]/page.js'), 'utf-8');
console.log('\n[app/projects/[slug]/page.js]');
console.log('Uses notFound():', pageCode.includes('notFound()'));
console.log('Starts with bg-[#FAF6F0]:', pageCode.includes('className="w-full bg-[#FAF6F0]"'));
console.log('Has generateMetadata:', pageCode.includes('export async function generateMetadata'));
console.log('Has generateStaticParams:', pageCode.includes('export async function generateStaticParams'));
