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

const ArtisticGalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [artisticImages, setArtisticImages] = useState<ImageData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<any>(null);

  // 动态加载artistic类别的所有图片
  useEffect(() => {
    try {
      const images = getCategoryImages('artistic');
      console.log('Artistic images loaded:', images.length);
      setArtisticImages(images);
    } catch (error) {
      console.error('Error loading artistic images:', error);
    }
  }, []);

  // 分页数据
  useEffect(() => {
    if (artisticImages.length > 0) {
      const data = paginateImages(artisticImages, currentPage, 20);
      setPaginatedData(data);
    }
  }, [artisticImages, currentPage]);

  // 生成创意标题
  const generateCreativeTitle = (index: number): string => {
    const titles = [
      "Ethereal Whispers",
      "Urban Symphony",
      "Shadows of Tomorrow",
      "Luminous Dreams",
      "Abstract Emotions",
      "Timeless Elegance",
      "Mystic Horizons",
      "Silent Poetry",
      "Chromatic Reverie",
      "Infinite Reflections",
      "Velvet Mysteries",
      "Golden Fragments",
      "Celestial Dance",
      "Monochrome Solitude",
      "Vibrant Chaos",
      "Serene Awakening",
      "Digital Renaissance",
      "Organic Geometry",
      "Fluid Narratives",
      "Crystalline Moments",
      "Phantom Landscapes",
      "Textured Silence",
      "Neon Nostalgia",
      "Minimalist Passion",
      "Baroque Modernism",
      "Surreal Intimacy",
      "Architectural Poetry",
      "Emotional Geometry",
      "Vintage Futurism",
      "Abstract Portraiture"
    ];
    return titles[index % titles.length];
  };

  // 生成创意描述
  const generateCreativeDescription = (index: number): string => {
    const descriptions = [
      "A mesmerizing exploration of light and shadow that captures the essence of human emotion through abstract forms.",
      "Contemporary artistry meets classical composition in this stunning visual narrative of urban life.",
      "An intimate journey through color and texture, revealing hidden stories within everyday moments.",
      "Bold geometric patterns interweave with organic forms to create a harmonious visual symphony.",
      "Delicate interplay of contrast and balance showcases the photographer's mastery of artistic vision.",
      "Ethereal beauty emerges from the intersection of reality and imagination in this captivating piece.",
      "Raw emotion translated into visual poetry through innovative use of perspective and lighting.",
      "A contemplative study of form and space that challenges conventional artistic boundaries.",
      "Vibrant energy flows through carefully composed elements, creating dynamic visual tension.",
      "Subtle nuances of tone and texture reveal the profound beauty found in simplicity.",
      "Experimental techniques merge with traditional aesthetics to produce this striking artistic statement.",
      "Layered compositions invite viewers to discover new details with each contemplative viewing.",
      "The photographer's unique perspective transforms ordinary subjects into extraordinary art.",
      "Conceptual depth meets visual elegance in this thought-provoking artistic exploration.",
      "Innovative use of negative space creates powerful emotional resonance within the frame.",
      "Cultural influences blend seamlessly with contemporary artistic expression in this compelling work.",
      "Technical precision serves artistic vision in this masterful demonstration of creative photography.",
      "Abstract concepts take tangible form through the photographer's skilled manipulation of visual elements.",
      "Emotional authenticity shines through carefully crafted artistic interpretation and execution.",
      "The boundaries between photography and fine art dissolve in this evocative visual experience."
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
      <Layout title="Artistic Gallery - MOMI" description="Explore artistic photography">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading artistic collection...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Artistic Gallery - MOMI" 
      description="Explore our curated collection of artistic photography"
    >
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <motion.h1 
              className="text-5xl md:text-7xl font-light mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Artistic
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl font-light opacity-80"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Where creativity meets vision
            </motion.p>
            <motion.div 
              className="mt-6 text-sm opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {artisticImages.length} works of art
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
                  alt={generateCreativeTitle(index)}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  effect="opacity"
                  onError={() => {}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-medium mb-2">{generateCreativeTitle(index)}</h3>
                    <p className="text-sm opacity-80 line-clamp-2">{generateCreativeDescription(index)}</p>
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
                alt={generateCreativeTitle(artisticImages.indexOf(selectedImage))}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-2xl font-light mb-2">
                  {generateCreativeTitle(artisticImages.indexOf(selectedImage))}
                </h3>
                <p className="text-sm opacity-80">
                  {generateCreativeDescription(artisticImages.indexOf(selectedImage))}
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

export default ArtisticGalleryPage;