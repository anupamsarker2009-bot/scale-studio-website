const fs = require('fs');
const html = fs.readFileSync('about/index.html', 'utf8');
const images = html.match(/<img[^>]*src=["'][^"']+["'][^>]*>/gi);
console.log(images ? images.slice(0, 5).join('\n') : 'No images found');
