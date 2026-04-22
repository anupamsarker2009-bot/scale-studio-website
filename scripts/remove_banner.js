const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const startString = '<div data-w-id="9be58693-2eeb-00f6-cc04-009a2d34854c" class="website-banner-wrapper">';

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  let startIndex = html.indexOf(startString);
  if (startIndex !== -1) {
    // Find the matching end tag for this div
    let depth = 1;
    let curr = startIndex + startString.length;
    while (depth > 0 && curr < html.length) {
      const nextDivOpen = html.indexOf('<div', curr);
      const nextDivClose = html.indexOf('</div>', curr);
      const nextAOpen = html.indexOf('<a', curr);
      const nextAClose = html.indexOf('</a>', curr);

      // In this specific block, the outer tag is a div.
      // But actually, it might be simpler to just remove up to the end of the script tags.
      // Looking at the block earlier:
      // <div data-w-id="9be58693-2eeb-00f6-cc04-009a2d34854c" class="website-banner-wrapper">...</div>
      // Let's just find the closing </div> of website-banner-wrapper.
      
      // A simple regex might be easier since we know its contents
      // Wait, there are nested divs and a tags.
      
      if (nextDivClose === -1) break;
      
      if (nextDivOpen !== -1 && nextDivOpen < nextDivClose) {
        depth++;
        curr = nextDivOpen + 4;
      } else {
        depth--;
        curr = nextDivClose + 6;
      }
    }
    
    if (depth === 0) {
      console.log(`Removing banner from ${file}, length: ${curr - startIndex}`);
      const newHtml = html.substring(0, startIndex) + html.substring(curr);
      fs.writeFileSync(file, newHtml, 'utf8');
    } else {
      console.log(`Could not find end of banner in ${file}`);
    }
  } else {
    console.log(`Banner not found in ${file}`);
  }
}
