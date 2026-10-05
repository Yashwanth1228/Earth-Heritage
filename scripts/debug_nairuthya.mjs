const res = await fetch('http://localhost:3000/projects/nairuthya-whispering-wood');
const text = await res.text();
console.log('Status:', res.status);
// Extract any error message or stack trace in html
const match = text.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i) || text.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i) || text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (match) {
  console.log('Error snippet:', match[1].substring(0, 1000));
} else {
  console.log('Body:', text.substring(0, 1000));
}
