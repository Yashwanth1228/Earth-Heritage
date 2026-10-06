const res = await fetch('http://localhost:3000/projects/coconut-garden');
const text = await res.text();
console.log('Status:', res.status);
const match = text.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s);
if (match) {
  const data = JSON.parse(match[1]);
  console.log('Next Data:', JSON.stringify(data, null, 2));
} else {
  console.log('Body:', text.slice(0, 1500));
}
