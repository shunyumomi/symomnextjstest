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

const FashionGalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [fashionImages, setFashionImages] = useState<ImageData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<any>(null);

  // 动态加载fashion类别的所有图片
  useEffect(() => {
    try {
      console.log('Loading fashion images...');
      const images = getCategoryImages('fashion');
      console.log('Fashion images loaded:', images.length);
      setFashionImages(images);
    } catch (error) {
      console.error('Error loading fashion images:', error);
    }
  }, []);

  // 分页数据
  useEffect(() => {
    if (fashionImages.length > 0) {
      const data = paginateImages(fashionImages, currentPage, 20);
      setPaginatedData(data);
    }
  }, [fashionImages, currentPage]);

  // 生成时尚标题
  const generateFashionTitle = (index: number): string => {
    const titles = [
      "Runway Revolution",
      "Designer's Dream",
      "Fashion Forward",
      "Style Evolution",
      "Couture Elegance",
      "Trendsetter's Vision",
      "Fashion Fusion",
      "Style Symphony",
      "Haute Couture Magic",
      "Fashion Innovation",
      "Style Perfection",
      "Designer Showcase",
      "Fashion Artistry",
      "Style Statement",
      "Couture Creation",
      "Fashion Excellence",
      "Style Inspiration",
      "Designer's Touch",
      "Fashion Philosophy",
      "Style Revolution",
      "Couture Craftsmanship",
      "Fashion Narrative",
      "Style Sophistication",
      "Designer Vision",
      "Fashion Mastery",
      "Style Elegance",
      "Couture Dreams",
      "Fashion Innovation",
      "Style Expression",
      "Designer's Art"
    ];
    return titles[index % titles.length];
  };

  // 生成时尚描述
  const generateFashionDescription = (index: number): string => {
    const descriptions = [
      "Cutting-edge fashion design meets innovative photography in this stunning showcase of contemporary style.",
      "A celebration of fashion craftsmanship where every detail reflects the designer's artistic vision and expertise.",
      "Bold fashion statements and creative styling come together to create this captivating visual narrative.",
      "This piece exemplifies the evolution of fashion through innovative design and masterful execution.",
      "Luxury fashion photography that captures the essence of haute couture and contemporary design trends.",
      "An exploration of fashion as wearable art, showcasing the intersection of creativity and functionality.",
      "Contemporary fashion showcase featuring cutting-edge designs and innovative styling approaches.",
      "Elegant fashion photography that highlights the beauty and craftsmanship of designer creations.",
      "This fashion piece demonstrates the power of design to inspire and influence contemporary culture.",
      "A masterful presentation of fashion excellence through sophisticated styling and artistic direction.",
      "Innovative fashion photography that pushes creative boundaries and challenges style conventions.",
      "Sophisticated fashion narrative exploring themes of identity, creativity, and cultural expression.",
      "Fashion excellence demonstrated through meticulous attention to design, styling, and presentation.",
      "Contemporary fashion artistry that transcends trends to become timeless style statements.",
      "A celebration of fashion design through photography that honors both innovation and tradition.",
      "Modern fashion showcase highlighting the artistry and technical skill of contemporary designers.",
      "This piece represents the pinnacle of fashion photography and creative styling excellence.",
      "Elegant fashion storytelling that captures the spirit of contemporary luxury and sophistication.",
      "Fashion photography that transforms clothing into compelling visual art and cultural commentary.",
      "A sophisticated exploration of fashion trends through the lens of artistic photography and styling."
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
      <Layout title="Fashion Gallery - MOMI" description="Explore fashion photography">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading fashion collection...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Fashion Gallery - MOMI" 
      description="Explore our curated collection of fashion photography"
    >
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-amber-900 via-orange-900 to-red-900">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <motion.h1 
              className="text-5xl md:text-7xl font-light mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Fashion
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl font-light opacity-80"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Where style meets innovation
            </motion.p>
            <motion.div 
              className="mt-6 text-sm opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {fashionImages.length} fashion moments
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
                  alt={generateFashionTitle(index)}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  effect="opacity"
                  onError={() => {
                    // 图片加载失败时隐藏
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-medium mb-2">{generateFashionTitle(index)}</h3>
                    <p className="text-sm opacity-80 line-clamp-2">{generateFashionDescription(index)}</p>
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
                alt={generateFashionTitle(fashionImages.indexOf(selectedImage))}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-2xl font-light mb-2">
                  {generateFashionTitle(fashionImages.indexOf(selectedImage))}
                </h3>
                <p className="text-sm opacity-80">
                  {generateFashionDescription(fashionImages.indexOf(selectedImage))}
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
            <Link href="/gallery/editorial" className="group">
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
                <h3 className="text-white font-medium group-hover:text-gray-300">Editorial</h3>
              </div>
            </Link>
            <Link href="/gallery/portrait" className="group">
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
                <h3 className="text-white font-medium group-hover:text-gray-300">Portrait</h3>
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

export default FashionGalleryPage;