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

const PortraitGalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [portraitImages, setPortraitImages] = useState<ImageData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<any>(null);

  // 动态加载portrait类别的所有图片
  useEffect(() => {
    try {
      console.log('Loading portrait images...');
      const images = getCategoryImages('portrait');
      console.log('Portrait images loaded:', images.length);
      setPortraitImages(images);
    } catch (error) {
      console.error('Error loading portrait images:', error);
    }
  }, []);

  // 分页数据
  useEffect(() => {
    if (portraitImages.length > 0) {
      const data = paginateImages(portraitImages, currentPage, 20);
      setPaginatedData(data);
    }
  }, [portraitImages, currentPage]);

  // 生成人像标题
  const generatePortraitTitle = (index: number): string => {
    const titles = [
      "Soul's Reflection",
      "Intimate Moments",
      "Character Study",
      "Human Expression",
      "Emotional Depth",
      "Portrait Perfection",
      "Inner Beauty",
      "Timeless Grace",
      "Authentic Self",
      "Silent Stories",
      "Captivating Gaze",
      "Natural Elegance",
      "Emotional Portrait",
      "Human Connection",
      "Soulful Expression",
      "Portrait Artistry",
      "Genuine Moments",
      "Inner Light",
      "Character Revealed",
      "Emotional Truth",
      "Portrait Poetry",
      "Human Essence",
      "Intimate Photography",
      "Personal Narrative",
      "Emotional Journey",
      "Portrait Excellence",
      "Authentic Beauty",
      "Human Stories",
      "Emotional Resonance",
      "Portrait Mastery"
    ];
    return titles[index % titles.length];
  };

  // 生成人像描述
  const generatePortraitDescription = (index: number): string => {
    const descriptions = [
      "An intimate portrait that captures the authentic essence and emotional depth of the human spirit.",
      "Masterful portrait photography that reveals the subject's inner character through careful composition and lighting.",
      "This compelling portrait showcases the photographer's ability to connect with subjects and capture genuine emotion.",
      "A study in human expression that demonstrates the power of portrait photography to tell personal stories.",
      "Sophisticated portrait work that balances technical excellence with emotional authenticity and artistic vision.",
      "This portrait exemplifies the art of capturing personality and character through thoughtful photographic technique.",
      "Contemporary portrait photography that explores themes of identity, emotion, and human connection.",
      "An evocative portrait that demonstrates the photographer's skill in creating intimate and meaningful imagery.",
      "This piece showcases the beauty of human expression through carefully crafted portrait photography.",
      "A masterful portrait that captures both the physical likeness and the emotional essence of the subject.",
      "Innovative portrait photography that pushes creative boundaries while maintaining emotional authenticity.",
      "Sophisticated portrait work exploring themes of identity, character, and personal narrative through imagery.",
      "Portrait excellence demonstrated through meticulous attention to lighting, composition, and emotional connection.",
      "Contemporary portrait artistry that transcends mere documentation to become compelling visual storytelling.",
      "A celebration of human beauty and character through the lens of artistic portrait photography.",
      "Modern portrait showcase highlighting the photographer's ability to capture authentic human moments.",
      "This portrait represents the pinnacle of contemporary portrait photography and emotional storytelling.",
      "Elegant portrait work that captures the subject's unique personality and emotional depth.",
      "Portrait photography that transforms personal moments into compelling visual art and human documentation.",
      "A sophisticated exploration of human character through the medium of artistic portrait photography."
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
      <Layout title="Portrait Gallery - MOMI" description="Explore portrait photography">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading portrait collection...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Portrait Gallery - MOMI" 
      description="Explore our curated collection of portrait photography"
    >
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-900">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <motion.h1 
              className="text-5xl md:text-7xl font-light mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Portrait
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl font-light opacity-80"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Capturing the human soul
            </motion.p>
            <motion.div 
              className="mt-6 text-sm opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {portraitImages.length} intimate portraits
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
                  alt={generatePortraitTitle(index)}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  effect="opacity"
                  onError={() => {}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-medium mb-2">{generatePortraitTitle(index)}</h3>
                    <p className="text-sm opacity-80 line-clamp-2">{generatePortraitDescription(index)}</p>
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
                alt={generatePortraitTitle(portraitImages.indexOf(selectedImage))}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-2xl font-light mb-2">
                  {generatePortraitTitle(portraitImages.indexOf(selectedImage))}
                </h3>
                <p className="text-sm opacity-80">
                  {generatePortraitDescription(portraitImages.indexOf(selectedImage))}
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

export default PortraitGalleryPage;