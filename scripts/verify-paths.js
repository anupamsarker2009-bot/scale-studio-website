const fs = require('fs');
const pages = ['about/index.html','pricing/index.html','career/index.html'];
for(const p of pages){
  const c = fs.readFileSync(p,'utf8');
  // Check for relative (broken) paths
  const relCss = (c.match(/href="css\//g) || []).length;
  const relJs = (c.match(/src="js\//g) || []).length;
  const relImg = (c.match(/src="images\//g) || []).length;
  const relLogo = (c.match(/src="logo\.png"/g) || []).length;
  // Check for root-relative (correct) paths
  const absCss = (c.match(/href="\/css\//g) || []).length;
  const absJs = (c.match(/src="\/js\//g) || []).length;
  const absImg = (c.match(/src="\/images\//g) || []).length;
  console.log(p + ':');
  console.log('  Relative (BROKEN) - CSS:', relCss, '| JS:', relJs, '| img:', relImg, '| logo:', relLogo);
  console.log('  Root-relative (OK) - CSS:', absCss, '| JS:', absJs, '| img:', absImg);
}
