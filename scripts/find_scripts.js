const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const scripts = html.match(/<script[^>]*src=["'][^"']+["'][^>]*>/gi);
console.log(scripts ? scripts.join('\n') : 'No scripts found');
