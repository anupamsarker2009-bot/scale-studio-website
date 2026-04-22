const fs = require('fs');
const targetFile = 'career/index.html';
let html = fs.readFileSync(targetFile, 'utf8');

const originalText = 'At Scale Studio, we embrace creativity, collaboration, and innovation. We value diverse perspectives, encourage bold ideas, celebrate achievements, and <span class="measurable">empower</span> every team member to grow professionally while making a meaningful impact on every project they touch.';
const newText = 'Get Your Dream Job in a eautiful campus with all the facilities that are needed to lead a good life also great management';

html = html.replace(originalText, newText);

fs.writeFileSync(targetFile, html, 'utf8');
console.log('Text replaced successfully');
