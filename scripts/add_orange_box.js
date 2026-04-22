const fs = require('fs');
const targetFile = 'career/index.html';
let html = fs.readFileSync(targetFile, 'utf8');

const oldText = 'Get Your Dream Job in a eautiful campus with all the facilities that are needed to lead a good life also great management';
const newText = 'Get Your Dream Job in a eautiful campus with all the facilities that are needed to lead a <span class="measurable">good life</span> also great management';

html = html.replace(oldText, newText);

fs.writeFileSync(targetFile, html, 'utf8');
console.log('Added orange box around good life');
