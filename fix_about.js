const fs = require('fs');

const targetFile = 'about/index.html';
let html = fs.readFileSync(targetFile, 'utf8');

// Inject css/fixes.css into <head> if not already there
if (!html.includes('href="css/fixes.css"')) {
    html = html.replace('</head>', '<link href="css/fixes.css" rel="stylesheet" type="text/css"></head>');
}

// Inject js/fixes.js before </body> if not already there
if (!html.includes('src="js/fixes.js"')) {
    html = html.replace('</body>', '<script src="js/fixes.js"></script></body>');
}

fs.writeFileSync(targetFile, html, 'utf8');
console.log('Fixed about/index.html');
