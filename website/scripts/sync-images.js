const fs = require('fs');
const path = require('path');

// 源图片目录（用户指定的路径）
const sourceBaseDir = '/Users/chuksy/Desktop/momifashion/assets/images';

// 目标目录（网站public目录）
const targetBaseDir = '/Users/chuksy/Desktop/momifashion/website/public/assets/images';

// 图片类别映射
const categoryMapping = {
  photographers: 'photographers',
  cinematic: 'gallery/cinematic',
  editorial: 'gallery/editorial', 
  artistic: 'gallery/artistic',
  collections: 'collections',
  wedding: 'gallery/wedding',
  portrait: 'gallery/portrait',
  featured: 'featured',
  fashion: 'gallery/fashion',
  gallery: 'gallery/misc'
};

// 图片索引数据结构
let imageIndex = {
  categories: {},
  totalImages: 0,
  lastUpdated: new Date().toISOString()
};

function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

function getImageFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) {
    console.log(`Directory does not exist: ${dir}`);
    return files;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // 递归处理子目录
      files.push(...getImageFiles(itemPath));
    } else if (stat.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(item)) {
      files.push(itemPath);
    }
  }
  
  return files;
}

function copyImage(sourcePath, targetPath) {
  try {
    ensureDirectoryExists(path.dirname(targetPath));
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied: ${path.basename(sourcePath)} -> ${targetPath}`);
    return true;
  } catch (error) {
    console.error(`Error copying ${sourcePath} to ${targetPath}:`, error.message);
    return false;
  }
}

function generateUniqueFilename(originalPath, targetDir, index = 0) {
  const ext = path.extname(originalPath);
  const baseName = path.basename(originalPath, ext).toLowerCase().replace(/[^a-z0-9]/g, '_');
  const suffix = index > 0 ? `_${index}` : '';
  const newName = `${baseName}${suffix}${ext}`;
  const targetPath = path.join(targetDir, newName);
  
  if (fs.existsSync(targetPath)) {
    return generateUniqueFilename(originalPath, targetDir, index + 1);
  }
  
  return { fileName: newName, fullPath: targetPath };
}

function processCategory(categoryName) {
  const sourceDir = path.join(sourceBaseDir, categoryName);
  const targetSubDir = categoryMapping[categoryName] || `gallery/${categoryName}`;
  const targetDir = path.join(targetBaseDir, targetSubDir);
  
  console.log(`\nProcessing category: ${categoryName}`);
  console.log(`Source: ${sourceDir}`);
  console.log(`Target: ${targetDir}`);
  
  const imageFiles = getImageFiles(sourceDir);
  console.log(`Found ${imageFiles.length} image files`);
  
  const categoryImages = [];
  let copiedCount = 0;
  
  for (const imagePath of imageFiles) {
    const { fileName, fullPath } = generateUniqueFilename(imagePath, targetDir);
    
    if (copyImage(imagePath, fullPath)) {
      const relativePath = path.relative(targetBaseDir, fullPath);
      categoryImages.push({
        fileName: fileName,
        relativePath: relativePath.replace(/\\/g, '/'),
        originalPath: imagePath,
        size: fs.statSync(imagePath).size
      });
      copiedCount++;
    }
  }
  
  imageIndex.categories[categoryName] = {
    count: categoryImages.length,
    targetPath: targetSubDir,
    images: categoryImages
  };
  
  console.log(`Successfully copied ${copiedCount}/${imageFiles.length} images for ${categoryName}`);
  return copiedCount;
}

function generateImageManifest() {
  // 为每个类别生成随机展示列表
  const manifest = {
    ...imageIndex,
    randomSelections: {}
  };
  
  for (const [category, data] of Object.entries(imageIndex.categories)) {
    const images = data.images || [];
    
    // 为首页随机选择展示的图片
    manifest.randomSelections[category] = {
      featured: images.slice(0, Math.min(6, images.length)),
      random: images.sort(() => 0.5 - Math.random()).slice(0, Math.min(12, images.length))
    };
  }
  
  // 生成全局随机选择
  const allImages = Object.values(imageIndex.categories)
    .flatMap(cat => cat.images || []);
  
  manifest.globalRandom = allImages
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(20, allImages.length));
  
  return manifest;
}

async function syncAllImages() {
  console.log('开始同步所有图片...\n');
  
  imageIndex.totalImages = 0;
  
  // 处理所有指定的类别
  const categories = [
    'photographers',
    'cinematic', 
    'editorial',
    'artistic',
    'collections',
    'wedding',
    'portrait',
    'featured',
    'fashion',
    'gallery'
  ];
  
  for (const category of categories) {
    const count = processCategory(category);
    imageIndex.totalImages += count;
  }
  
  // 生成图片清单
  const manifest = generateImageManifest();
  
  // 保存图片索引和清单
  const indexPath = path.join(targetBaseDir, 'image-index.json');
  const manifestPath = path.join(targetBaseDir, 'image-manifest.json');
  
  try {
    fs.writeFileSync(indexPath, JSON.stringify(imageIndex, null, 2));
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    
    console.log(`\n图片同步完成！`);
    console.log(`总计处理图片: ${imageIndex.totalImages}`);
    console.log(`图片索引保存至: ${indexPath}`);
    console.log(`图片清单保存至: ${manifestPath}`);
    
    // 显示每个类别的统计信息
    console.log('\n各类别统计:');
    for (const [category, data] of Object.entries(imageIndex.categories)) {
      console.log(`  ${category}: ${data.count} 张图片`);
    }
    
  } catch (error) {
    console.error('保存图片索引时出错:', error.message);
  }
}

// 执行同步
syncAllImages().catch(console.error);
