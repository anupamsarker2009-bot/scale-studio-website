const fs = require('fs');
const pages = ['about/index.html','pricing/index.html','career/index.html'];
for(const p of pages){
  const c = fs.readFileSync(p,'utf8');
  const hasCss = c.includes('fixes.css');
  const hasJs = c.includes('fixes.js');
  console.log(p + ':', 'CSS:', hasCss, '| JS:', hasJs);
}
