const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8');
h = h.replace(
  'Build demand <span class="blue-text">Dominate</span> Market.',
  'Grow your Business with <span class="blue-text">Speed</span>'
);
fs.writeFileSync('index.html', h);
console.log('Headline updated!');
