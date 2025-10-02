const fs = require('fs');
const path = require('path');

const distCss = path.resolve(__dirname, '..', 'dist', 'assets');

function findCssFile(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f.endsWith('.css')) return path.join(dir, f);
  }
  return null;
}

const cssFile = findCssFile(distCss);
if (!cssFile) {
  console.error('No CSS file found in', distCss);
  process.exit(1);
}

let css = fs.readFileSync(cssFile, 'utf8');

// Remove declarations like --tw-pan-x: ; or --tw-foo: ; (custom properties with empty value)
// Only match when property is followed by a semicolon or closing brace and has no value
css = css.replace(/--[a-zA-Z0-9-_]+:\s*;(?=|\s|\})/g, '');

fs.writeFileSync(cssFile, css, 'utf8');
console.log('Postprocessed CSS:', cssFile);
