process.loadEnvFile('.env.local');
const { cloudinary } = await import('../lib/cloudinary.js');

console.log('Testing Cloudinary Admin API methods for asset folders:\n');

// 1. Check create_folder
console.log('typeof cloudinary.api.create_folder:', typeof cloudinary.api.create_folder);
console.log('typeof cloudinary.api.update:', typeof cloudinary.api.update);

// 2. Try creating folder earth-heritage/projects/nairuthya-whispering-wood
try {
  const createRes = await cloudinary.api.create_folder('earth-heritage/projects/nairuthya-whispering-wood');
  console.log('create_folder result:', createRes);
} catch (err) {
  console.log('create_folder note/error:', err.message);
}

// 3. Verify subfolders under earth-heritage/projects now
try {
  const sub = await cloudinary.api.sub_folders('earth-heritage/projects');
  console.log('Subfolders under earth-heritage/projects now:', sub.folders.map(f => f.name || f.path));
} catch (err) {
  console.log('Error checking subfolders:', err.message);
}
