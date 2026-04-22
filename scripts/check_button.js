const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<a[^>]*class=["'][^"']*primary-button[^"']*["'][^>]*>.*?<\/a>/);
console.log(match ? match[0] : 'not found');
