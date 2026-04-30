const fs = require('fs');
const pages = [
  'e:/saveweb2zip-com-scalestudio-webflow-io/index.html',
  'e:/saveweb2zip-com-scalestudio-webflow-io/about/index.html',
  'e:/saveweb2zip-com-scalestudio-webflow-io/pricing/index.html',
  'e:/saveweb2zip-com-scalestudio-webflow-io/career/index.html'
];

for (const page of pages) {
  let c = fs.readFileSync(page, 'utf8');
  const before = c.length;
  
  // Fix 1: Utility typo (all variants)
  c = c.split('Utilty').join('Utility');
  
  // Fix 2: External webflow links - comprehensive fix for ALL occurrences
  // Nav dropdown links
  c = c.replace(/href="https:\/\/scalestudio\.webflow\.io\/case-studies\/[^"]+"/g, 'href="/case-studies/"');
  c = c.replace(/href="https:\/\/scalestudio\.webflow\.io\/services\/[^"]+"/g, 'href="/services/"');
  c = c.replace(/href="https:\/\/scalestudio\.webflow\.io\/blog-posts\/[^"]+"/g, 'href="/blog/"');
  c = c.replace(/href="https:\/\/scalestudio\.webflow\.io\/product\/[^"]+"/g, 'href="/pricing/"');
  c = c.replace(/href="https:\/\/scalestudio\.webflow\.io\/career\/[^"]+"/g, 'href="/career/"');
  c = c.replace(/href="https:\/\/scalestudio\.webflow\.io\/information-pages\/[^"]+"/g, 'href="/"');
  // Catch-all for any remaining scalestudio.webflow.io internal links
  c = c.replace(/href="https:\/\/scalestudio\.webflow\.io(?:\/[^"]*)"/g, 'href="/"');
  
  fs.writeFileSync(page, c, 'utf8');
  console.log('Fixed:', page.split('/').slice(-2).join('/'), '| delta:', c.length - before);
}
console.log('Done!');
