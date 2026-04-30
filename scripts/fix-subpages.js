const fs = require('fs');
const pages = [
  'e:/saveweb2zip-com-scalestudio-webflow-io/about/index.html',
  'e:/saveweb2zip-com-scalestudio-webflow-io/pricing/index.html',
  'e:/saveweb2zip-com-scalestudio-webflow-io/career/index.html'
];

for (const page of pages) {
  let c = fs.readFileSync(page, 'utf8');
  const before = c.length;
  
  // Remove generator meta
  c = c.replace('<meta content="Webflow" name="generator">', '');
  
  // Fix wf-domain
  c = c.replace('data-wf-domain="scalestudio.webflow.io"', 'data-wf-domain=""');
  
  // Add robots meta
  if (!c.includes('name="robots"')) {
    c = c.replace('<meta charset="utf-8">', '<meta charset="utf-8"><meta name="robots" content="index, follow">');
  }
  
  // Fix Utility typo in footer
  c = c.split('Utilty').join('Utility');
  
  // Fix Frequently typo
  c = c.split('Frequntly asked questions').join('Frequently Asked Questions');

  // Fix external links in navigation to be root-relative
  c = c.replace(/href="https:\/\/scalestudio\.webflow\.io\/case-studies\/[^"]+"/g, 'href="/case-studies/"');
  c = c.replace(/href="https:\/\/scalestudio\.webflow\.io\/services\/[^"]+"/g, 'href="/services/"');
  c = c.replace(/href="https:\/\/scalestudio\.webflow\.io\/blog-posts\/[^"]+"/g, 'href="/blog/"');
  c = c.replace(/href="https:\/\/scalestudio\.webflow\.io\/product\/[^"]+"/g, 'href="/pricing/"');
  c = c.replace(/href="https:\/\/scalestudio\.webflow\.io\/career\/[^"]+"/g, 'href="/career/"');
  
  fs.writeFileSync(page, c, 'utf8');
  console.log('Fixed:', page.split('/').slice(-2).join('/'), '| before:', before, '| after:', c.length);
}
console.log('All subpages fixed!');
