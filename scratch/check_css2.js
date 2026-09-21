const http = require('http');

http.get('http://localhost:3000/_next/static/css/678d8392a8820fbf.css', cssRes => {
  let css = '';
  cssRes.on('data', c => css += c);
  cssRes.on('end', () => {
    console.log('CSS 2 length:', css.length);
    console.log('Contains rounded-2xl?', css.includes('rounded-2xl'));
    console.log('Contains relative?', css.includes('.relative'));
    console.log('Contains aspect-[16/10]?', css.includes('aspect-'));
  });
});
