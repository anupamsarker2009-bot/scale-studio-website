const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Remove all style="opacity:0" inline styles
html = html.replace(/style="opacity:0"/g, '');
html = html.replace(/style="opacity: 0"/g, '');

// 2. Add fixes.css after the existing CSS link
html = html.replace(
  'scalestudio.webflow.shared.bf434d2a6.css" rel="stylesheet" type="text/css" crossorigin="anonymous">',
  'scalestudio.webflow.shared.bf434d2a6.css" rel="stylesheet" type="text/css" crossorigin="anonymous"><link href="css/fixes.css" rel="stylesheet" type="text/css">'
);

// 3. Add fixes.js before closing body tag
html = html.replace(
  '</body>',
  '<script src="js/fixes.js"></script></body>'
);

fs.writeFileSync(filePath, html, 'utf8');
console.log('HTML fixed successfully!');
console.log('- Removed opacity:0 inline styles');
console.log('- Added css/fixes.css');
console.log('- Added js/fixes.js');
