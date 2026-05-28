const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src');

files.forEach(file => {
  if (file.includes('Hero.jsx')) return; // Already fixed

  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replacements to match charte
  content = content.replace(/font-display text-(?:4xl|5xl|6xl|7xl|8xl)/g, 'text-h1');
  content = content.replace(/font-display text-(?:3xl|2xl) sm:text-[^ \"]+/g, 'text-h2');
  content = content.replace(/font-display text-(?:2xl|3xl)/g, 'text-h2');
  content = content.replace(/font-display text-(?:xl|lg)/g, 'text-h3');
  
  // Specific pattern for tags/badges
  content = content.replace(/text-\[9px\] font-bold uppercase tracking-widest/g, 'text-stag');
  content = content.replace(/text-\[10px\] font-bold uppercase tracking-widest/g, 'text-stag');
  content = content.replace(/text-\[10px\] uppercase tracking-widest/g, 'text-stag');
  content = content.replace(/text-xs font-bold uppercase tracking-widest/g, 'text-stag');

  // Small text
  content = content.replace(/text-\[11px\]/g, 'text-small');
  content = content.replace(/\btext-xs\b/g, 'text-small');
  
  // body
  content = content.replace(/text-sm sm:text-base/g, 'text-body');
  content = content.replace(/\btext-sm\b/g, 'text-body');
  content = content.replace(/\btext-base\b/g, 'text-body');
  
  // CTAs
  content = content.replace(/font-display text-small tracking-wider/g, 'text-cta');
  content = content.replace(/font-display text-body tracking-wider/g, 'text-cta');
  content = content.replace(/font-display text-\[11px\] tracking-wider/g, 'text-cta');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
