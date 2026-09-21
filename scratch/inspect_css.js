const http = require('http');

http.get('http://localhost:3000/', res => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    const cssMatches = html.match(/\/(_next\/static\/css\/[^"]+)/g);
    console.log('CSS files:', cssMatches);
    if (cssMatches && cssMatches.length > 0) {
      http.get('http://localhost:3000' + cssMatches[0], cssRes => {
        let css = '';
        cssRes.on('data', c => css += c);
        cssRes.on('end', () => {
          console.log('CSS length:', css.length);
          console.log('Contains rounded-2xl?', css.includes('rounded-2xl'));
          console.log('Contains relative?', css.includes('.relative'));
          console.log('Contains aspect-[16/10]?', css.includes('aspect-'));
        });
      });
    }
  });
});
