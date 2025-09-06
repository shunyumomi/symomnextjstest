import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Masonry from 'react-masonry-css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

interface PhotographerData {
  id: string;
  name: string;
  specialty: string;
  location: string;
  bio: string;
  longBio: string;
  workCount: number;
  featured: string;
  instagram?: string;
  website?: string;
  works: string[];
  achievements: string[];
}

const photographersData: { [key: string]: PhotographerData } = {
  'nicholas-fols': {
    id: 'nicholas-fols',
    name: 'Nicholas Fols',
    specialty: 'Fashion & Editorial',
    location: 'Seoul, Korea',
    bio: 'Master of light and shadow, creating timeless fashion narratives',
    longBio: 'Nicholas Fols is a Seoul-based photographer known for his masterful use of light and shadow in fashion photography. With over a decade of experience, he has developed a distinctive style that blends minimalist aesthetics with dramatic storytelling. His work has been featured in major international publications and campaigns for luxury brands.',
    workCount: 159,
    featured: '/assets/images/photographers/nicholasfols/nicholasfols_001.jpg',
    instagram: '@nicholasfols',
    website: 'nicholasfols.com',
    works: Array.from({ length: 20 }, (_, i) => `/assets/images/gallery/fashion/fashion_${String(i + 1).padStart(3, '0')}.jpg`),
    achievements: ['Vogue Korea Photographer of the Year 2023', 'Harper\'s Bazaar Featured Artist', 'Seoul Fashion Week Official Photographer']
  },
  'ramie-pl': {
    id: 'ramie-pl',
    name: 'Ramie Pl',
    specialty: 'Portrait & Artistic',
    location: 'New York, USA',
    bio: 'Capturing raw emotions and authentic moments in every frame',
    longBio: 'Ramie Pl is a New York-based photographer specializing in portrait and artistic photography. Known for capturing raw emotions and authentic moments, Ramie has built a reputation for creating intimate portraits that reveal the true essence of subjects. Their work explores themes of identity, emotion, and human connection.',
    workCount: 213,
    featured: '/assets/images/photographers/ramiepl/ramiepl_001.jpg',
    instagram: '@ramiepl',
    works: Array.from({ length: 25 }, (_, i) => `/assets/images/gallery/portrait/portrait_${String(i + 1).padStart(3, '0')}.jpg`),
    achievements: ['International Portrait Photography Award', 'Featured in TIME Magazine', 'Solo Exhibition at MoMA']
  },
  'soyul': {
    id: 'soyul',
    name: 'Studio Soyul',
    specialty: 'Wedding & Romance',
    location: 'Seoul, Korea',
    bio: 'Seoul-based studio specializing in romantic and cinematic wedding photography',
    longBio: 'Studio Soyul is a Seoul-based photography studio specializing in wedding and romantic photography. Known for their cinematic approach to capturing love stories, they create dreamy, film-like images that perfectly capture the emotion and beauty of special moments. Their work spans across Korea and internationally.',
    workCount: 60,
    featured: '/assets/images/photographers/soyul/soyul_001.jpg',
    instagram: '@studio_soyul',
    works: Array.from({ length: 15 }, (_, i) => `/assets/images/gallery/wedding/wedding_${String(i + 1).padStart(3, '0')}.jpg`),
    achievements: ['Korea Wedding Photographer of the Year', 'Featured in Korean Vogue', 'International Wedding Photography Awards']
  },
  'eui': {
    id: 'eui',
    name: 'Eui',
    specialty: 'Lifestyle & Wedding',
    location: 'Jeju, Korea',
    bio: 'Creating dreamy, youth-inspired narratives in Jeju and beyond',
    longBio: 'Eui is a Jeju-based photographer known for creating dreamy, youth-inspired wedding and lifestyle photography. With a focus on natural light and candid moments, Eui captures the beauty of Jeju Island and the authentic emotions of couples and individuals in their most natural state.',
    workCount: 39,
    featured: '/assets/images/photographers/eui/eui_001.jpg',
    instagram: '@eui.me',
    works: Array.from({ length: 12 }, (_, i) => `/assets/images/gallery/wedding/wedding_${String(i + 10).padStart(3, '0')}.jpg`),
    achievements: ['Jeju Tourism Board Official Photographer', 'Featured in Wedding Magazine Korea', 'Natural Light Photography Award']
  },
  'lespecs': {
    id: 'lespecs',
    name: 'Lespecs',
    specialty: 'Commercial Fashion',
    location: 'Paris, France',
    bio: 'Bold commercial fashion photography with a minimalist aesthetic',
    longBio: 'Lespecs is a Paris-based photographer specializing in commercial fashion photography. Known for bold, minimalist aesthetics, they create striking images that perfectly balance commercial appeal with artistic vision. Their work has been featured in major fashion campaigns and editorial spreads.',
    workCount: 24,
    featured: '/assets/images/photographers/lespecs/lespecs_001.jpg',
    instagram: '@wolfcubwolfcub',
    works: Array.from({ length: 10 }, (_, i) => `/assets/images/gallery/fashion/fashion_${String(i + 15).padStart(3, '0')}.jpg`),
    achievements: ['Paris Fashion Week Featured Photographer', 'Commercial Photography Excellence Award', 'Featured in Elle France']
  }
};

const PhotographerDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const photographer = photographersData[id as string];

  if (!photographer) {
    return (
      <Layout title="Photographer Not Found - MOMI">
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h1 className="text-4xl font-light mb-4 text-black">Photographer Not Found</h1>
            <Link href="/photographers">
              <button className="px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-all duration-300">
                Browse All Photographers
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const openLightbox = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % photographer.works.length
      : (currentIndex - 1 + photographer.works.length) % photographer.works.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(photographer.works[newIndex]);
  };

  const breakpointColumnsObj = {
    default: 3,
    1280: 2,
    768: 1
  };

  return (
    <Layout 
      title={`${photographer.name} - MOMI`} 
      description={photographer.bio}
    >
      {/* Hero Section */}
      <section className="relative h-screen bg-white">
        <img
          src={photographer.featured}
          alt={photographer.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
        
        <div className="absolute bottom-20 left-6 md:left-12 lg:left-20 text-white max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-wider opacity-80 mb-2">{photographer.location}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4 text-white">{photographer.name}</h1>
            <p className="text-lg md:text-xl font-light opacity-90 mb-6 text-white">{photographer.specialty}</p>
            <p className="text-sm font-light opacity-70 text-white">{photographer.workCount} works featured</p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-light mb-6 text-black">About the Artist</h2>
            <p className="text-base font-light leading-relaxed text-gray-800 mb-8">
              {photographer.longBio}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-light text-gray-600 mb-1">Location</p>
                <p className="text-base font-light text-black">{photographer.location}</p>
              </div>
              <div>
                <p className="text-sm font-light text-gray-600 mb-1">Specialty</p>
                <p className="text-base font-light text-black">{photographer.specialty}</p>
              </div>
              {photographer.instagram && (
                <div>
                  <p className="text-sm font-light text-gray-600 mb-1">Instagram</p>
                  <p className="text-base font-light text-black">{photographer.instagram}</p>
                </div>
              )}
              {photographer.website && (
                <div>
                  <p className="text-sm font-light text-gray-600 mb-1">Website</p>
                  <p className="text-base font-light text-black">{photographer.website}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Achievements */}
          <div>
            <h2 className="text-3xl font-light mb-6 text-black">Achievements</h2>
            <ul className="space-y-3">
              {photographer.achievements.map((achievement, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-base font-light text-gray-800"
                >
                  • {achievement}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Works Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-light mb-12 text-center text-black">Featured Works</h2>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex -ml-6 w-auto"
            columnClassName="pl-6 bg-clip-padding"
          >
            {photographer.works.map((work, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="mb-6"
              >
                <div 
                  className="group cursor-pointer" 
                  onClick={() => openLightbox(work, index)}
                >
                  <div className="relative overflow-hidden bg-gray-100">
                    <LazyLoadImage
                      src={work}
                      alt={`${photographer.name} Work ${index + 1}`}
                      effect="opacity"
                      className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 overflow-hidden"
            onClick={() => setSelectedImage(null)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Navigation Buttons */}
              <button
                className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:opacity-60 transition-opacity z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:opacity-60 transition-opacity z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Close Button */}
              <button
                className="absolute top-6 right-6 text-white hover:opacity-60 transition-opacity z-10"
                onClick={() => setSelectedImage(null)}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <motion.div
                key={selectedImage}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt={`${photographer.name} Work`}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>

              {/* Image Info */}
              <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                <p className="text-lg font-light mb-1">{photographer.name}</p>
                <p className="text-sm font-light opacity-70">{photographer.specialty}</p>
                <p className="text-xs font-light opacity-50 mt-2">
                  {currentIndex + 1} of {photographer.works.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <section className="py-12 px-6 md:px-12 lg:px-20 border-t border-gray-200 bg-white">
        <div className="flex justify-between items-center">
          <Link href="/photographers">
            <button className="text-sm font-light text-gray-600 hover:text-black transition-colors">
              ← All Photographers
            </button>
          </Link>
          <div className="flex gap-4">
            <Link href="/contact">
              <button className="px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition-all duration-300 text-sm">
                COLLABORATE
              </button>
            </Link>
            <Link href="/gallery">
              <button className="px-6 py-2 bg-black text-white hover:bg-transparent hover:text-black hover:border hover:border-black transition-all duration-300 text-sm">
                VIEW GALLERY
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(photographersData).map((id) => ({
    params: { id }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'photographers'])),
    },
  };
};

export default PhotographerDetailPage;

