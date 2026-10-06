process.loadEnvFile('.env.local');
const { cloudinary, isCloudinaryConfigured } = await import('../lib/cloudinary.js');

if (!isCloudinaryConfigured) {
  console.error('Cloudinary not configured');
  process.exit(1);
}

console.log('=== CLOUDINARY READ-ONLY FOLDER INSPECTION ===\n');

try {
  // 1. Root folders
  const rootFolders = await cloudinary.api.root_folders();
  console.log('Root folders in Cloudinary:', rootFolders.folders.map(f => f.name || f.path));

  // 2. Subfolders under earth-heritage
  const ehSub = await cloudinary.api.sub_folders('earth-heritage');
  console.log('\nSubfolders under earth-heritage/:', ehSub.folders.map(f => f.name || f.path));

  // 3. Subfolders under earth-heritage/projects
  try {
    const projSub = await cloudinary.api.sub_folders('earth-heritage/projects');
    console.log('\nSubfolders under earth-heritage/projects/:', projSub.folders.map(f => f.name || f.path));
  } catch (e) {
    console.log('\nCould not get subfolders of earth-heritage/projects:', e.message);
  }

  // 4. Resources under earth-heritage/projects
  const projResources = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'earth-heritage/projects',
    max_results: 100
  });
  console.log(`\nResources with prefix "earth-heritage/projects" (${projResources.resources.length}):`);
  projResources.resources.forEach(r => {
    console.log(`- ${r.public_id} (${r.width}x${r.height}, ${r.format}, ${(r.bytes/1024).toFixed(1)} KB)`);
  });

} catch (err) {
  console.error('Error during read-only inspection:', err);
}
