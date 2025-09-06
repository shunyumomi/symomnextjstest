import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getCategoriesStats, getRandomImages, getImageUrl } from '../../utils/imageUtils';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const GalleryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [galleryCategories, setGalleryCategories] = useState<any[]>([]);
  const [recentImages, setRecentImages] = useState<any[]>([]);

  // 动态加载画廊数据
  useEffect(() => {
    const categoriesStats = getCategoriesStats();
    const formattedCategories = categoriesStats
      .filter(cat => ['fashion', 'editorial', 'cinematic', 'portrait', 'wedding', 'artistic'].includes(cat.id))
      .map(cat => ({
        id: cat.id,
        title: cat.name,
        description: getDescription(cat.id),
        imageCount: cat.count,
        featured: cat.featured,
        link: `/gallery/${cat.id}`
      }));
    
    setGalleryCategories(formattedCategories);

    // 获取最近添加的图片
    const randomImages = getRandomImages(undefined, 10);
    setRecentImages(randomImages);
  }, []);

  // 获取类别描述
  const getDescription = (categoryId: string): string => {
    const descriptions: Record<string, string> = {
      fashion: 'Contemporary fashion photography',
      editorial: 'Editorial stories and campaigns',
      cinematic: 'Film-inspired photography',
      portrait: 'Intimate portrait photography',
      wedding: 'Romantic wedding photography',
      artistic: 'Experimental and artistic works'
    };
    return descriptions[categoryId] || 'Photography collection';
  };

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'editorial', label: 'Editorial' },
    { id: 'cinematic', label: 'Cinematic' },
    { id: 'portrait', label: 'Portrait' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'artistic', label: 'Artistic' }
  ];

  const filteredCategories = activeFilter === 'all' 
    ? galleryCategories 
    : galleryCategories.filter(cat => cat.id === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Layout title="Gallery - MOMI" description="Explore our curated collection of fashion, editorial, and artistic photography">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-light mb-4">Gallery</h1>
          <p className="text-lg md:text-xl font-light opacity-70">Curated visual narratives</p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-200">
        <div className="px-6 md:px-12 lg:px-20 py-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 text-sm transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-black text-white'
                    : 'border border-gray-300 hover:border-black'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group"
            >
              <Link href={category.link}>
                <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                  <LazyLoadImage
                    src={category.featured}
                    alt={category.title}
                    effect="opacity"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-xs tracking-wider opacity-80 mb-2">{category.imageCount} WORKS</p>
                    <h3 className="text-2xl font-light mb-2">{category.title}</h3>
                    <p className="text-sm font-light opacity-90">{category.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Recent Additions */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 md:px-12 lg:px-20">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-4">Recent Additions</h2>
            <p className="text-lg font-light opacity-70">Latest works added to our collection</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {recentImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="relative aspect-square bg-gray-200 overflow-hidden group cursor-pointer"
              >
                <LazyLoadImage
                  src={getImageUrl(image)}
                  alt={`Recent ${index + 1}`}
                  effect="opacity"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 md:px-12 lg:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-light mb-6">Looking for something specific?</h2>
        <p className="text-lg font-light opacity-70 mb-8 max-w-2xl mx-auto">
          Use our advanced search to find exactly what you're looking for, or browse by photographer, collection, or style.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/search">
            <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-all duration-300">
              ADVANCED SEARCH
            </button>
          </Link>
          <Link href="/photographers">
            <button className="px-8 py-3 bg-black text-white hover:bg-transparent hover:text-black hover:border hover:border-black transition-all duration-300">
              BROWSE PHOTOGRAPHERS
            </button>
          </Link>
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

export default GalleryPage;

