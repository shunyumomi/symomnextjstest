import imageIndex from '../../public/assets/images/image-index.json';
import imageManifest from '../../public/assets/images/image-manifest.json';

export interface ImageData {
  fileName: string;
  relativePath: string;
  originalPath: string;
  size: number;
}

export interface CategoryData {
  count: number;
  targetPath: string;
  images: ImageData[];
}

export interface ImageManifest {
  categories: Record<string, CategoryData>;
  totalImages: number;
  lastUpdated: string;
  randomSelections: Record<string, {
    featured: ImageData[];
    random: ImageData[];
  }>;
  globalRandom: ImageData[];
}

// 获取图片索引数据
export const getImageIndex = (): ImageManifest => {
  return imageManifest as ImageManifest;
};

// 获取特定类别的所有图片
export const getCategoryImages = (category: string): ImageData[] => {
  const manifest = getImageIndex();
  return manifest.categories[category]?.images || [];
};

// 获取随机图片
export const getRandomImages = (category?: string, count: number = 12): ImageData[] => {
  const manifest = getImageIndex();
  
  if (category && manifest.randomSelections[category]) {
    return manifest.randomSelections[category].random.slice(0, count);
  }
  
  return manifest.globalRandom.slice(0, count);
};

// 获取特色图片
export const getFeaturedImages = (category?: string, count: number = 6): ImageData[] => {
  const manifest = getImageIndex();
  
  if (category && manifest.randomSelections[category]) {
    return manifest.randomSelections[category].featured.slice(0, count);
  }
  
  // 如果没有指定类别，从所有类别中随机选择
  const allCategories = Object.keys(manifest.categories);
  const selectedImages: ImageData[] = [];
  
  for (const cat of allCategories) {
    const catImages = manifest.randomSelections[cat]?.featured || [];
    selectedImages.push(...catImages.slice(0, 2)); // 每个类别取2张
  }
  
  return shuffleArray(selectedImages).slice(0, count);
};

// 获取所有类别的统计信息
export const getCategoriesStats = () => {
  const manifest = getImageIndex();
  return Object.entries(manifest.categories).map(([key, value]) => ({
    id: key,
    name: formatCategoryName(key),
    count: value.count,
    targetPath: value.targetPath,
    featured: `/assets/images/${value.images[0]?.relativePath || ''}`,
  }));
};

// 格式化类别名称
export const formatCategoryName = (category: string): string => {
  const nameMap: Record<string, string> = {
    'photographers': 'Photographers',
    'editorial': 'Editorial',
    'cinematic': 'Cinematic',
    'artistic': 'Artistic',
    'collections': 'Collections',
    'wedding': 'Wedding',
    'portrait': 'Portrait',
    'featured': 'Featured',
    'fashion': 'Fashion',
    'gallery': 'Gallery'
  };
  
  return nameMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
};

// 打乱数组
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 分页图片
export const paginateImages = (images: ImageData[], page: number = 1, pageSize: number = 20) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedImages = images.slice(startIndex, endIndex);
  
  return {
    items: paginatedImages,
    images: paginatedImages, // 保持向后兼容
    currentPage: page,
    totalPages: Math.ceil(images.length / pageSize),
    totalImages: images.length,
    hasMore: endIndex < images.length,
    hasPrevious: page > 1
  };
};

// 搜索图片
export const searchImages = (query: string, category?: string): ImageData[] => {
  const manifest = getImageIndex();
  let allImages: ImageData[] = [];
  
  if (category && manifest.categories[category]) {
    allImages = manifest.categories[category].images;
  } else {
    allImages = Object.values(manifest.categories).flatMap(cat => cat.images);
  }
  
  const lowerQuery = query.toLowerCase();
  return allImages.filter(image => 
    image.fileName.toLowerCase().includes(lowerQuery) ||
    image.relativePath.toLowerCase().includes(lowerQuery)
  );
};

// 构建图片URL
export const getImageUrl = (image: ImageData): string => {
  return `/assets/images/${image.relativePath}`;
};

// 获取响应式图片src集合
export const getResponsiveImageProps = (image: ImageData) => {
  const baseUrl = getImageUrl(image);
  return {
    src: baseUrl,
    alt: image.fileName.replace(/\.(jpg|jpeg|png|gif)$/i, '').replace(/_/g, ' '),
    loading: 'lazy' as const,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  };
};

// 预加载图片
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// 批量预加载图片
export const preloadImages = async (images: ImageData[], limit: number = 5): Promise<void> => {
  const imagesToPreload = images.slice(0, limit);
  const preloadPromises = imagesToPreload.map(image => 
    preloadImage(getImageUrl(image)).catch(() => null) // 忽略加载失败的图片
  );
  
  await Promise.allSettled(preloadPromises);
};
