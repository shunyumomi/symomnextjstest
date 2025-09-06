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

const CinematicGalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [cinematicImages, setCinematicImages] = useState<ImageData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<any>(null);

  // 动态加载cinematic类别的所有图片
  useEffect(() => {
    try {
      console.log('Loading cinematic images...');
      const images = getCategoryImages('cinematic');
      console.log('Cinematic images loaded:', images.length);
      setCinematicImages(images);
    } catch (error) {
      console.error('Error loading cinematic images:', error);
    }
  }, []);

  // 分页数据
  useEffect(() => {
    if (cinematicImages.length > 0) {
      const data = paginateImages(cinematicImages, currentPage, 20);
      setPaginatedData(data);
    }
  }, [cinematicImages, currentPage]);

  // 生成电影风格标题
  const generateCinematicTitle = (index: number): string => {
    const titles = [
      "Cinematic Dreams",
      "Film Noir Elegance",
      "Motion Picture Magic",
      "Dramatic Lighting",
      "Visual Storytelling",
      "Cinematic Vision",
      "Movie-like Moments",
      "Theatrical Beauty",
      "Film-Inspired Art",
      "Cinematic Poetry",
      "Visual Narrative",
      "Dramatic Composition",
      "Film Aesthetic",
      "Cinematic Mood",
      "Motion Picture Style",
      "Visual Drama",
      "Film-like Quality",
      "Cinematic Atmosphere",
      "Movie Magic",
      "Dramatic Scenes",
      "Cinematic Artistry",
      "Film Photography",
      "Visual Cinema",
      "Dramatic Portraits",
      "Cinematic Elegance",
      "Movie-Style Fashion",
      "Film-Inspired Vision",
      "Cinematic Storytelling",
      "Visual Poetry",
      "Dramatic Fashion"
    ];
    return titles[index % titles.length];
  };

  // 生成电影风格描述
  const generateCinematicDescription = (index: number): string => {
    const descriptions = [
      "A cinematic approach to fashion photography that captures the drama and emotion of film storytelling.",
      "Film-inspired photography that transforms fashion into compelling visual narratives with dramatic lighting.",
      "This piece showcases the intersection of cinema and fashion through masterful composition and mood.",
      "Dramatic fashion photography that borrows techniques from film to create powerful visual stories.",
      "Cinematic elegance meets contemporary fashion in this stunning example of visual storytelling.",
      "A movie-like quality pervades this fashion photograph, creating depth and emotional resonance.",
      "Film noir aesthetics influence this dramatic fashion piece, emphasizing shadow, light, and mystery.",
      "This cinematic fashion photograph demonstrates the power of visual narrative in contemporary photography.",
      "Drawing inspiration from classic cinema, this piece elevates fashion photography to artistic expression.",
      "A theatrical approach to fashion photography that captures the essence of cinematic storytelling.",
      "Motion picture techniques inform this dramatic fashion photograph, creating visual depth and emotion.",
      "This piece exemplifies the marriage of fashion and film through sophisticated visual composition.",
      "Cinematic lighting and composition transform this fashion moment into a compelling visual story.",
      "Film-inspired aesthetics create a powerful narrative framework for this contemporary fashion photograph.",
      "A dramatic interpretation of fashion through the lens of cinematic visual language and technique.",
      "This photograph captures the essence of film storytelling through fashion and dramatic composition.",
      "Movie-like quality and cinematic vision combine to create this striking fashion photography piece.",
      "Visual drama and cinematic technique elevate this fashion photograph to the level of fine art.",
      "Film aesthetics and fashion photography merge to create this compelling example of visual storytelling.",
      "A cinematic approach to contemporary fashion that emphasizes mood, atmosphere, and visual narrative."
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
      <Layout title="Cinematic Gallery - MOMI" description="Explore cinematic photography">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading cinematic collection...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Cinematic Gallery - MOMI" 
      description="Explore our curated collection of cinematic photography"
    >
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-gray-900 via-slate-900 to-black">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <motion.h1 
              className="text-5xl md:text-7xl font-light mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Cinematic
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl font-light opacity-80"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Where fashion meets film
            </motion.p>
            <motion.div 
              className="mt-6 text-sm opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {cinematicImages.length} cinematic moments
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
                  alt={generateCinematicTitle(index)}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  effect="opacity"
                  onError={() => {}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-medium mb-2">{generateCinematicTitle(index)}</h3>
                    <p className="text-sm opacity-80 line-clamp-2">{generateCinematicDescription(index)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>

        {/* Pagination */}
        {paginatedData && paginatedData && paginatedData.totalPages > 1 && (
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
                alt={generateCinematicTitle(cinematicImages.indexOf(selectedImage))}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-2xl font-light mb-2">
                  {generateCinematicTitle(cinematicImages.indexOf(selectedImage))}
                </h3>
                <p className="text-sm opacity-80">
                  {generateCinematicDescription(cinematicImages.indexOf(selectedImage))}
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

export default CinematicGalleryPage;
