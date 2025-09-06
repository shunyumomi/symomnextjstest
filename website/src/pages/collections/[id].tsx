import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

interface CollectionImage {
  id: string;
  src: string;
  title: string;
  description?: string;
}

interface CollectionData {
  id: string;
  title: string;
  season: string;
  year: string;
  designer: string;
  description: string;
  longDescription: string;
  imageCount: number;
  coverImage: string;
  images: CollectionImage[];
  featured: boolean;
}

const collectionsData: { [key: string]: CollectionData } = {
  'ss24': {
    id: 'ss24',
    title: 'Spring/Summer 2024',
    season: 'Spring/Summer',
    year: '2024',
    designer: 'MOMI Creative Team',
    description: 'A celebration of minimalist elegance and contemporary silhouettes',
    longDescription: 'Our Spring/Summer 2024 collection embodies the essence of minimalist elegance, featuring clean lines, sustainable materials, and contemporary silhouettes that speak to the modern woman. Each piece is carefully crafted to represent the perfect balance between comfort and sophistication.',
    imageCount: 15,
    coverImage: '/assets/images/featured/featured_001.jpg',
    images: Array.from({ length: 15 }, (_, i) => ({
      id: `ss24_${i + 1}`,
      src: `/assets/images/gallery/fashion/fashion_${String(i + 1).padStart(3, '0')}.jpg`,
      title: `Look ${i + 1}`,
      description: `Spring/Summer 2024 - Look ${i + 1}`
    })),
    featured: true
  },
  'couture': {
    id: 'couture',
    title: 'Couture 2024',
    season: 'Couture',
    year: '2024',
    designer: 'KIMHĒKIM',
    description: 'Handcrafted excellence in every stitch',
    longDescription: 'The Couture 2024 collection represents the pinnacle of craftsmanship and artistry. Each piece is meticulously handcrafted by master artisans, featuring intricate beadwork, delicate embroidery, and innovative construction techniques that push the boundaries of traditional couture.',
    imageCount: 12,
    coverImage: '/assets/images/featured/featured_002.jpg',
    images: Array.from({ length: 12 }, (_, i) => ({
      id: `couture_${i + 1}`,
      src: `/assets/images/gallery/fashion/fashion_${String(i + 10).padStart(3, '0')}.jpg`,
      title: `Couture Look ${i + 1}`,
      description: `Couture 2024 - Look ${i + 1}`
    })),
    featured: true
  },
  'bridal': {
    id: 'bridal',
    title: 'Bridal 2024',
    season: 'Bridal',
    year: '2024',
    designer: 'Various',
    description: 'Modern romance for the contemporary bride',
    longDescription: 'The Bridal 2024 collection redefines modern romance with contemporary silhouettes and timeless elegance. From minimalist crepe gowns to intricate lace masterpieces, each dress is designed to make every bride feel confident and radiant on her special day.',
    imageCount: 10,
    coverImage: '/assets/images/featured/featured_003.jpg',
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `bridal_${i + 1}`,
      src: `/assets/images/gallery/wedding/wedding_${String(i + 1).padStart(3, '0')}.jpg`,
      title: `Bridal Look ${i + 1}`,
      description: `Bridal 2024 - Look ${i + 1}`
    })),
    featured: false
  },
  'obsession': {
    id: 'obsession',
    title: 'OBSESSION N.2 - Women in Canvas',
    season: 'Special',
    year: '2024',
    designer: 'KIMHĒKIM',
    description: 'An artistic exploration of feminine power and grace',
    longDescription: 'OBSESSION N.2 is a groundbreaking collection that merges fashion with fine art. Inspired by classical paintings and contemporary feminism, this collection presents women as both muse and artist, subject and creator. Each piece tells a story of empowerment through carefully curated fabrics and sculptural silhouettes.',
    imageCount: 8,
    coverImage: '/assets/images/featured/featured_001.jpg',
    images: Array.from({ length: 8 }, (_, i) => ({
      id: `obsession_${i + 1}`,
      src: `/assets/images/gallery/editorial/editorial_${String(i + 1).padStart(3, '0')}.jpg`,
      title: `Obsession Look ${i + 1}`,
      description: `OBSESSION N.2 - Look ${i + 1}`
    })),
    featured: true
  }
};

const CollectionDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedImage, setSelectedImage] = useState<CollectionImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const collection = collectionsData[id as string];

  if (!collection) {
    return (
      <Layout title="Collection Not Found - MOMI">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-light mb-4">Collection Not Found</h1>
            <Link href="/collections">
              <button className="px-6 py-3 border border-black hover:bg-black hover:text-white transition-all duration-300">
                Browse All Collections
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const openLightbox = (image: CollectionImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % collection.images.length
      : (currentIndex - 1 + collection.images.length) % collection.images.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(collection.images[newIndex]);
  };

  return (
    <Layout 
      title={`${collection.title} - MOMI`} 
      description={collection.description}
    >
      {/* Hero Section */}
      <section className="relative h-screen">
        <img
          src={collection.coverImage}
          alt={collection.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
        
        <div className="absolute bottom-20 left-6 md:left-12 lg:left-20 text-white max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-wider opacity-80 mb-2">{collection.designer}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4">{collection.title}</h1>
            <p className="text-lg md:text-xl font-light opacity-90 mb-6">{collection.description}</p>
            <p className="text-sm font-light opacity-70">{collection.imageCount} looks</p>
          </motion.div>
        </div>
      </section>

      {/* Collection Info */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-light mb-6">About the Collection</h2>
            <p className="text-base font-light leading-relaxed opacity-80 mb-6">
              {collection.longDescription}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-light opacity-60 mb-1">Designer</p>
                <p className="text-base font-light">{collection.designer}</p>
              </div>
              <div>
                <p className="text-sm font-light opacity-60 mb-1">Season</p>
                <p className="text-base font-light">{collection.season} {collection.year}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-6xl font-light mb-4">{collection.imageCount}</h3>
              <p className="text-lg font-light opacity-70">Looks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-light mb-12">Collection Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collection.images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative overflow-hidden bg-gray-200 aspect-[3/4]">
                  <LazyLoadImage
                    src={image.src}
                    alt={image.title}
                    effect="opacity"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm font-light">{image.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Collections */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl font-light mb-12 text-center">Related Collections</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {Object.values(collectionsData)
            .filter(col => col.id !== collection.id)
            .slice(0, 3)
            .map((relatedCollection) => (
              <Link key={relatedCollection.id} href={`/collections/${relatedCollection.id}`}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                    <img
                      src={relatedCollection.coverImage}
                      alt={relatedCollection.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-light mb-1">{relatedCollection.title}</h3>
                    <p className="text-sm font-light opacity-60">{relatedCollection.designer}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Lightbox */}
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
              key={selectedImage.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain"
              />
            </motion.div>

            {/* Image Info */}
            <div className="absolute bottom-6 left-6 right-6 text-white text-center">
              <p className="text-lg font-light mb-1">{selectedImage.title}</p>
              <p className="text-sm font-light opacity-70">{collection.title}</p>
              <p className="text-xs font-light opacity-50 mt-2">
                {currentIndex + 1} of {collection.images.length}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <section className="py-12 px-6 md:px-12 lg:px-20 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/collections">
            <button className="text-sm font-light underline hover:no-underline">
              ← All Collections
            </button>
          </Link>
          <div className="flex gap-4">
            <Link href="/contact">
              <button className="px-6 py-2 border border-black hover:bg-black hover:text-white transition-all duration-300 text-sm">
                INQUIRE
              </button>
            </Link>
            <Link href="/gallery">
              <button className="px-6 py-2 bg-black text-white hover:bg-transparent hover:text-black hover:border hover:border-black transition-all duration-300 text-sm">
                GALLERY
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(collectionsData).map((id) => ({
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
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'collections'])),
    },
  };
};

export default CollectionDetailPage;

