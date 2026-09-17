import fs from 'node:fs';

if (fs.existsSync('build/index.html')) {
  fs.copyFileSync('build/index.html', 'build/404.html');
  console.log('Successfully created build/404.html for GitHub Pages SPA routing');
}
