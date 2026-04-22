const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The best way to hide it robustly without parsing errors is injecting CSS at the end of <head>.
// If it's already there, we update it. If not, we add it.
const styleInjection = '<style>.website-banner-wrapper, .w-webflow-badge { display: none !important; opacity: 0 !important; visibility: hidden !important; }</style></head>';

if (html.includes('website-banner-wrapper, .w-webflow-badge { display: none !important;')) {
    console.log('Style already injected.');
} else {
    html = html.replace('</head>', styleInjection);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Injected robust hiding CSS into index.html');
}
