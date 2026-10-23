const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\perce\\.gemini\\antigravity\\brain\\b22ab6b4-a36f-4afb-bb09-baeaec85cf6c';
const dstDir = 'C:\\Users\\perce\\.gemini\\antigravity\\scratch\\odonto-santyx\\images';

if (!fs.existsSync(dstDir)) {
  fs.mkdirSync(dstDir, { recursive: true });
}

const files = {
  'media__1787162092499.jpg': 'logo.jpg',
  'dental_hero_clinic_1787162114576.png': 'hero_clinic.png',
  'dental_happy_smile_1787162126171.png': 'happy_smile.png'
};

for (const [src, dst] of Object.entries(files)) {
  const srcPath = path.join(srcDir, src);
  const dstPath = path.join(dstDir, dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    console.log(`Copied ${src} to ${dst}`);
  } else {
    console.log(`Not found: ${srcPath}`);
  }
}
