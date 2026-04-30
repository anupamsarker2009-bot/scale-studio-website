const fs = require('fs');
const path = require('path');

// Sub-pages that need root-relative paths for assets
const subpages = [
  'about/index.html',
  'pricing/index.html',
  'career/index.html'
];

for (const page of subpages) {
  let c = fs.readFileSync(page, 'utf8');
  const before = c.length;
  
  // Fix CSS paths: css/X.css → /css/X.css (but not already /css/X.css)
  c = c.replace(/href="css\//g, 'href="/css/');
  
  // Fix JS paths: js/X.js → /js/X.js (but not already /js/X.js)
  c = c.replace(/src="js\//g, 'src="/js/');
  
  // Fix image paths: images/X → /images/X
  c = c.replace(/src="images\//g, 'src="/images/');
  c = c.replace(/href="images\//g, 'href="/images/');
  
  // Fix srcset paths: images/X → /images/X in srcsets
  c = c.replace(/([, ])images\//g, '$1/images/');
  
  // Fix logo.png reference
  c = c.replace(/src="logo\.png"/g, 'src="/logo.png"');
  c = c.replace(/href="logo\.png"/g, 'href="/logo.png"');
  
  fs.writeFileSync(page, c, 'utf8');
  console.log('Fixed paths in:', page, '| delta chars:', c.length - before);
}

console.log('All subpage paths fixed!');
