const fs = require('fs');

const files = [
  'src/components/Features.jsx',
  'src/components/Challenges.jsx',
  'src/components/Community.jsx',
  'src/components/About.jsx',
  'src/components/projects/ProjectCard.jsx' // Optional, but usually projects are cards in a section
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // In these files, there are lines like className="... rounded-lg ..."
    // Let's replace 'rounded-lg' with 'rounded-2xl' specifically for the main cards
    
    if (file.includes('Features.jsx')) {
      content = content.replace(/group rounded-lg/g, 'group rounded-2xl');
    } else if (file.includes('Challenges.jsx')) {
      content = content.replace(/className="rounded-lg/g, 'className="rounded-2xl');
    } else if (file.includes('Community.jsx')) {
      content = content.replace(/overflow-hidden rounded-lg/g, 'overflow-hidden rounded-2xl');
    } else if (file.includes('About.jsx')) {
      content = content.replace(/className="rounded-lg/g, 'className="rounded-2xl');
    } else if (file.includes('ProjectCard.jsx')) {
      content = content.replace(/className="rounded-lg/g, 'className="rounded-2xl');
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated radius in ${file}`);
  }
});
