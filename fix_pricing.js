const fs = require('fs');

const targetFile = 'pricing/index.html';
let html = fs.readFileSync(targetFile, 'utf8');

if (!html.includes('href="css/fixes.css"')) {
    html = html.replace('</head>', '<link href="css/fixes.css" rel="stylesheet" type="text/css"></head>');
}

if (!html.includes('src="js/fixes.js"')) {
    html = html.replace('</body>', '<script src="js/fixes.js"></script></body>');
}

fs.writeFileSync(targetFile, html, 'utf8');
console.log('Fixed pricing/index.html');
