import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Masonry from 'react-masonry-css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getCategoryImages, getImageUrl, ImageData, paginateImages } from '../../utils/imageUtils';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const EditorialGalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [editorialImages, setEditorialImages] = useState<ImageData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<any>(null);

  // 动态加载editorial类别的所有图片
  useEffect(() => {
    try {
      console.log('Loading editorial images...');
      const images = getCategoryImages('editorial');
      console.log('Editorial images loaded:', images.length);
      setEditorialImages(images);
    } catch (error) {
      console.error('Error loading editorial images:', error);
    }
  }, []);

  // 分页数据
  useEffect(() => {
    if (editorialImages.length > 0) {
      const data = paginateImages(editorialImages, currentPage, 20);
      setPaginatedData(data);
    }
  }, [editorialImages, currentPage]);

  // 生成时尚编辑标题
  const generateEditorialTitle = (index: number): string => {
    const titles = [
      "Metropolitan Elegance",
      "Avant-Garde Vision",
      "Sophisticated Rebellion",
      "Modern Classicism",
      "Editorial Excellence",
      "Fashion Forward",
      "Couture Dreams",
      "Style Revolution",
      "Luxury Redefined",
      "Contemporary Chic",
      "Haute Couture Story",
      "Fashion Narrative",
      "Trendsetter's Tale",
      "Sartorial Poetry",
      "Designer's Vision",
      "Fashion Week Chronicles",
      "Style Icon Moments",
      "Runway Reflections",
      "Fashion Philosophy",
      "Editorial Masterpiece",
      "Glamour Reimagined",
      "Fashion Innovation",
      "Style Statement",
      "Editorial Artistry",
      "Fashion Evolution",
      "Couture Craftsmanship",
      "Style Sophistication",
      "Fashion Journalism",
      "Editorial Excellence",
      "Style Storytelling"
    ];
    return titles[index % titles.length];
  };

  // 生成时尚编辑描述
  const generateEditorialDescription = (index: number): string => {
    const descriptions = [
      "A compelling editorial narrative that explores the intersection of fashion and contemporary culture.",
      "Sophisticated styling meets innovative photography in this captivating fashion editorial.",
      "Bold fashion choices and artistic direction create a powerful visual statement about modern style.",
      "This editorial piece showcases the evolution of fashion through carefully curated looks and settings.",
      "Luxury fashion photography that captures the essence of haute couture craftsmanship and design.",
      "An exploration of fashion as art, where each frame tells a story of creativity and innovation.",
      "Contemporary fashion editorial that pushes boundaries and challenges conventional style norms.",
      "Elegant composition and styling create a timeless fashion narrative with modern sensibilities.",
      "This editorial captures the spirit of fashion week with its dynamic energy and cutting-edge style.",
      "A masterful blend of fashion photography and editorial storytelling that defines contemporary luxury.",
      "Innovative fashion editorial that showcases emerging trends and established design principles.",
      "Sophisticated fashion narrative exploring themes of identity, style, and cultural expression.",
      "Editorial excellence demonstrated through meticulous attention to styling, lighting, and composition.",
      "Fashion photography that transcends mere documentation to become artistic expression.",
      "A celebration of fashion design through editorial photography that honors both tradition and innovation.",
      "Contemporary fashion editorial showcasing the artistry and craftsmanship of luxury design.",
      "This piece exemplifies the power of fashion editorial to inspire and influence style culture.",
      "Elegant fashion storytelling that captures the essence of modern luxury and sophistication.",
      "Editorial photography that transforms fashion into compelling visual narratives and artistic statements.",
      "A sophisticated exploration of fashion trends through the lens of contemporary editorial photography."
    ];
    return descriptions[index % descriptions.length];
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  if (!paginatedData) {
    return (
      <Layout title="Editorial Gallery - MOMI" description="Explore editorial photography">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading editorial collection...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Editorial Gallery - MOMI" 
      description="Explore our curated collection of editorial fashion photography"
    >
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-rose-900 via-pink-900 to-purple-900">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <motion.h1 
              className="text-5xl md:text-7xl font-light mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Editorial
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl font-light opacity-80"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Fashion storytelling at its finest
            </motion.p>
            <motion.div 
              className="mt-6 text-sm opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {editorialImages.length} editorial stories
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {paginatedData?.items?.map((image: ImageData, index: number) => (
            <motion.div
              key={`${image.relativePath}-${index}`}
              className="mb-4 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden bg-gray-900 rounded-lg">
                <LazyLoadImage
                  src={getImageUrl(image)}
                  alt={generateEditorialTitle(index)}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  effect="opacity"
                  onError={() => {}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-medium mb-2">{generateEditorialTitle(index)}</h3>
                    <p className="text-sm opacity-80 line-clamp-2">{generateEditorialDescription(index)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>

        {/* Pagination */}
        {paginatedData && paginatedData.totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: paginatedData.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImageUrl(selectedImage)}
                alt={generateEditorialTitle(editorialImages.indexOf(selectedImage))}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-2xl font-light mb-2">
                  {generateEditorialTitle(editorialImages.indexOf(selectedImage))}
                </h3>
                <p className="text-sm opacity-80">
                  {generateEditorialDescription(editorialImages.indexOf(selectedImage))}
                </p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white text-2xl hover:opacity-70 transition-opacity"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-white mb-8">Explore More Collections</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/gallery/artistic" className="group">
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
                <h3 className="text-white font-medium group-hover:text-gray-300">Artistic</h3>
              </div>
            </Link>
            <Link href="/gallery/portrait" className="group">
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
                <h3 className="text-white font-medium group-hover:text-gray-300">Portrait</h3>
              </div>
            </Link>
            <Link href="/gallery/fashion" className="group">
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
                <h3 className="text-white font-medium group-hover:text-gray-300">Fashion</h3>
              </div>
            </Link>
            <Link href="/gallery/wedding" className="group">
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
                <h3 className="text-white font-medium group-hover:text-gray-300">Wedding</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'gallery'])),
    },
  };
};

export default EditorialGalleryPage;