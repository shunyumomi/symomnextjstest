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

const WeddingGalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [weddingImages, setWeddingImages] = useState<ImageData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<any>(null);

  // 动态加载wedding类别的所有图片
  useEffect(() => {
    try {
      console.log('Loading wedding images...');
      const images = getCategoryImages('wedding');
      console.log('Wedding images loaded:', images.length);
      setWeddingImages(images);
    } catch (error) {
      console.error('Error loading wedding images:', error);
    }
  }, []);

  // 分页数据
  useEffect(() => {
    if (weddingImages.length > 0) {
      const data = paginateImages(weddingImages, currentPage, 20);
      setPaginatedData(data);
    }
  }, [weddingImages, currentPage]);

  // 生成婚礼标题
  const generateWeddingTitle = (index: number): string => {
    const titles = [
      "Eternal Promise",
      "Love's Symphony",
      "Sacred Moments",
      "Wedding Bliss",
      "Forever Begins",
      "Romantic Dreams",
      "Pure Joy",
      "Love Story",
      "Wedding Magic",
      "Heartfelt Vows",
      "Celebration of Love",
      "Perfect Union",
      "Wedding Elegance",
      "Love's Journey",
      "Matrimonial Beauty",
      "Wedding Perfection",
      "Romantic Moments",
      "Love Captured",
      "Wedding Artistry",
      "Eternal Bond",
      "Wedding Dreams",
      "Love's Celebration",
      "Sacred Union",
      "Wedding Poetry",
      "Romantic Elegance",
      "Love's Promise",
      "Wedding Memories",
      "Timeless Love",
      "Wedding Grace",
      "Love's Triumph"
    ];
    return titles[index % titles.length];
  };

  // 生成婚礼描述
  const generateWeddingDescription = (index: number): string => {
    const descriptions = [
      "A beautiful celebration of love captured through elegant wedding photography that preserves precious moments forever.",
      "Romantic wedding photography that tells the story of two hearts becoming one in perfect harmony.",
      "This wedding moment showcases the joy, elegance, and emotional depth of matrimonial celebration.",
      "Sophisticated wedding photography that captures the essence of love, commitment, and celebration.",
      "A timeless wedding photograph that preserves the beauty and emotion of this sacred celebration.",
      "Elegant wedding documentation that honors the tradition and beauty of matrimonial ceremonies.",
      "Contemporary wedding photography that captures both intimate moments and grand celebrations.",
      "This wedding image demonstrates the photographer's ability to capture authentic emotion and joy.",
      "Beautiful wedding photography that celebrates love through artistic composition and emotional storytelling.",
      "A masterful wedding photograph that captures the romance, elegance, and significance of the occasion.",
      "Innovative wedding photography that balances traditional elements with contemporary artistic vision.",
      "Sophisticated wedding documentation exploring themes of love, commitment, and family celebration.",
      "Wedding photography excellence demonstrated through careful attention to emotion, detail, and composition.",
      "Contemporary wedding artistry that transforms matrimonial moments into timeless visual memories.",
      "A celebration of love and commitment through the lens of artistic wedding photography.",
      "Modern wedding showcase highlighting the photographer's skill in capturing authentic romantic moments.",
      "This wedding photograph represents the pinnacle of matrimonial photography and emotional storytelling.",
      "Elegant wedding work that captures the unique beauty and emotion of each couple's special day.",
      "Wedding photography that transforms ceremonial moments into compelling visual art and lasting memories.",
      "A sophisticated exploration of love and celebration through the medium of artistic wedding photography."
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
      <Layout title="Wedding Gallery - MOMI" description="Explore wedding photography">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading wedding collection...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Wedding Gallery - MOMI" 
      description="Explore our curated collection of wedding photography"
    >
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-pink-900 via-rose-900 to-red-900">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <motion.h1 
              className="text-5xl md:text-7xl font-light mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Wedding
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl font-light opacity-80"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Celebrating love's eternal moments
            </motion.p>
            <motion.div 
              className="mt-6 text-sm opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {weddingImages.length} love stories
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
                  alt={generateWeddingTitle(index)}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  effect="opacity"
                  onError={() => {}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-medium mb-2">{generateWeddingTitle(index)}</h3>
                    <p className="text-sm opacity-80 line-clamp-2">{generateWeddingDescription(index)}</p>
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
                alt={generateWeddingTitle(weddingImages.indexOf(selectedImage))}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-2xl font-light mb-2">
                  {generateWeddingTitle(weddingImages.indexOf(selectedImage))}
                </h3>
                <p className="text-sm opacity-80">
                  {generateWeddingDescription(weddingImages.indexOf(selectedImage))}
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
            <Link href="/gallery/fashion" className="group">
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
                <h3 className="text-white font-medium group-hover:text-gray-300">Fashion</h3>
              </div>
            </Link>
            <Link href="/gallery/portrait" className="group">
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
                <h3 className="text-white font-medium group-hover:text-gray-300">Portrait</h3>
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

export default WeddingGalleryPage;