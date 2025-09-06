const fs = require('fs');
const path = require('path');

const sourceDir = '/Users/chuksy/Desktop/momifashion/web/eg';
const targetDir = '/Users/chuksy/Desktop/momifashion/website/public/assets/images';
const logoSource = '/Users/chuksy/Desktop/momifashion/web/logo.png';
const logoTarget = path.join(targetDir, 'logo.png');

// Image mapping structure
const imageMapping = {
  featured: [],
  gallery: {
    fashion: [],
    editorial: [],
    cinematic: [],
    portrait: [],
    wedding: [],
    artistic: []
  },
  photographers: {},
  collections: {},
  campaigns: {}
};

function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyFile(source, target) {
  if (fs.existsSync(source)) {
    ensureDirectoryExists(path.dirname(target));
    fs.copyFileSync(source, target);
    console.log(`Copied: ${path.basename(source)} -> ${target}`);
    return true;
  }
  return false;
}

function organizeImages() {
  // Copy logo
  copyFile(logoSource, logoTarget);

  // Process Featured images
  const featuredDir = path.join(sourceDir, 'Featured');
  if (fs.existsSync(featuredDir)) {
    const files = fs.readdirSync(featuredDir);
    files.forEach((file, index) => {
      const source = path.join(featuredDir, file);
      const target = path.join(targetDir, 'featured', `featured_${String(index + 1).padStart(3, '0')}.jpg`);
      if (copyFile(source, target)) {
        imageMapping.featured.push(`featured_${String(index + 1).padStart(3, '0')}.jpg`);
      }
    });
  }

  // Process Gallery categories
  const galleryDir = path.join(sourceDir, 'Gallery');
  if (fs.existsSync(galleryDir)) {
    const categories = fs.readdirSync(galleryDir);
    
    categories.forEach(category => {
      const categoryDir = path.join(galleryDir, category);
      const categoryLower = category.toLowerCase();
      
      if (fs.statSync(categoryDir).isDirectory() && imageMapping.gallery[categoryLower]) {
        const files = fs.readdirSync(categoryDir);
        
        files.forEach((file, index) => {
          if (file.endsWith('.jpg') || file.endsWith('.png')) {
            const source = path.join(categoryDir, file);
            const newName = `${categoryLower}_${String(index + 1).padStart(3, '0')}.jpg`;
            const target = path.join(targetDir, 'gallery', categoryLower, newName);
            
            if (copyFile(source, target)) {
              imageMapping.gallery[categoryLower].push(newName);
            }
          }
        });
      }
    });
  }

  // Process Photographers
  const photographersDir = path.join(sourceDir, 'Photographers');
  if (fs.existsSync(photographersDir)) {
    const photographers = fs.readdirSync(photographersDir);
    
    photographers.forEach(photographer => {
      const photographerDir = path.join(photographersDir, photographer);
      
      if (fs.statSync(photographerDir).isDirectory()) {
        const photographerKey = photographer.toLowerCase().replace(/\s+/g, '_');
        imageMapping.photographers[photographerKey] = [];
        
        const files = fs.readdirSync(photographerDir);
        files.forEach((file, index) => {
          if (file.endsWith('.jpg') || file.endsWith('.png')) {
            const source = path.join(photographerDir, file);
            const newName = `${photographerKey}_${String(index + 1).padStart(3, '0')}.jpg`;
            const target = path.join(targetDir, 'photographers', photographerKey, newName);
            
            if (copyFile(source, target)) {
              imageMapping.photographers[photographerKey].push(newName);
            }
          }
        });
      }
    });
  }

  // Create image manifest
  const manifestPath = path.join(targetDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(imageMapping, null, 2));
  console.log('Image organization complete!');
  console.log(`Manifest saved to: ${manifestPath}`);
}

// Run the organization
organizeImages();

