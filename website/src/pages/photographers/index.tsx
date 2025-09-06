import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

interface Photographer {
  id: string;
  name: string;
  specialty: string;
  description: string;
  workCount: number;
  featured: string;
  instagram?: string;
  website?: string;
}

const PhotographersPage: React.FC = () => {
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const photographers: Photographer[] = [
    {
      id: 'nicholas-fols',
      name: 'Nicholas Fols',
      specialty: 'Fashion & Editorial',
      description: 'Master of light and shadow, creating timeless fashion narratives',
      workCount: 159,
      featured: '/assets/images/photographers/nicholasfols/nicholasfols_001.jpg',
      instagram: '@nicholasfols',
      website: 'nicholasfols.com'
    },
    {
      id: 'ramie-pl',
      name: 'Ramie Pl',
      specialty: 'Portrait & Artistic',
      description: 'Capturing raw emotions and authentic moments in every frame',
      workCount: 213,
      featured: '/assets/images/photographers/ramiepl/ramiepl_001.jpg',
      instagram: '@ramiepl',
    },
    {
      id: 'soyul',
      name: 'Studio Soyul',
      specialty: 'Wedding & Romance',
      description: 'Seoul-based studio specializing in romantic and cinematic wedding photography',
      workCount: 60,
      featured: '/assets/images/photographers/soyul/soyul_001.jpg',
      instagram: '@studio_soyul',
    },
    {
      id: 'eui',
      name: 'Eui',
      specialty: 'Lifestyle & Wedding',
      description: 'Creating dreamy, youth-inspired narratives in Jeju and beyond',
      workCount: 39,
      featured: '/assets/images/photographers/eui/eui_001.jpg',
      instagram: '@eui.me',
    },
    {
      id: 'lespecs',
      name: 'Lespecs',
      specialty: 'Commercial Fashion',
      description: 'Bold commercial fashion photography with a minimalist aesthetic',
      workCount: 24,
      featured: '/assets/images/photographers/lespecs/lespecs_001.jpg',
      instagram: '@wolfcubwolfcub',
    },
    {
      id: 'maley',
      name: 'Maley',
      specialty: 'Cinematic & Fashion',
      description: 'Cinematic approach to fashion, creating movie-like scenes in still photography',
      workCount: 30,
      featured: '/assets/images/photographers/maley/maley_001.jpg',
    },
    {
      id: 'kimhekim',
      name: 'KIMHĒKIM',
      specialty: 'Haute Couture',
      description: 'Haute couture photography for Paris Fashion Week and beyond',
      workCount: 6,
      featured: '/assets/images/photographers/kimhekim/kimhekim_001.jpg',
      instagram: '@maison_kimhekim',
    },
    {
      id: 'muamu',
      name: 'Muamu',
      specialty: 'Artistic Fashion',
      description: 'Experimental fashion photography pushing creative boundaries',
      workCount: 27,
      featured: '/assets/images/photographers/muamu/muamu_001.jpg',
    },
    {
      id: 'others',
      name: 'Collective Artists',
      specialty: 'Various',
      description: 'A collective of emerging and established photographers',
      workCount: 472,
      featured: '/assets/images/photographers/others/others_001.jpg',
    }
  ];

  const specialties = ['all', 'Fashion & Editorial', 'Portrait & Artistic', 'Wedding & Romance', 'Commercial Fashion', 'Cinematic & Fashion'];
  
  const filteredPhotographers = filterSpecialty === 'all' 
    ? photographers 
    : photographers.filter(p => p.specialty.includes(filterSpecialty));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout title="Photographers - MOMI" description="Meet the talented photographers behind our collections">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-black text-white flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-5xl md:text-7xl font-light mb-4">Photographers</h1>
          <p className="text-lg md:text-xl font-light opacity-80 max-w-2xl mx-auto">
            Visionaries who capture moments, create narratives, and define aesthetics
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-200">
        <div className="px-6 md:px-12 lg:px-20 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Specialty Filters */}
            <div className="flex flex-wrap gap-2">
              {specialties.map(specialty => (
                <button
                  key={specialty}
                  onClick={() => setFilterSpecialty(specialty)}
                  className={`px-4 py-2 text-sm transition-all ${
                    filterSpecialty === specialty
                      ? 'bg-black text-white'
                      : 'border border-gray-300 hover:border-black'
                  }`}
                >
                  {specialty === 'all' ? 'All' : specialty}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-black text-white' : 'border border-gray-300'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-black text-white' : 'border border-gray-300'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Photographers Display */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        {viewMode === 'grid' ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPhotographers.map((photographer) => (
              <motion.div key={photographer.id} variants={itemVariants}>
                <Link href={`/photographers/${photographer.id}`}>
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                      <LazyLoadImage
                        src={photographer.featured}
                        alt={photographer.name}
                        effect="opacity"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                          <p className="text-sm font-light opacity-80">{photographer.workCount} works</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-light mb-1">{photographer.name}</h3>
                      <p className="text-sm font-light opacity-60 mb-2">{photographer.specialty}</p>
                      <p className="text-sm font-light opacity-80 line-clamp-2">{photographer.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredPhotographers.map((photographer, index) => (
              <motion.div
                key={photographer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/photographers/${photographer.id}`}>
                  <div className="flex flex-col md:flex-row gap-6 p-6 border border-gray-200 hover:border-black transition-colors cursor-pointer">
                    <div className="md:w-1/3">
                      <LazyLoadImage
                        src={photographer.featured}
                        alt={photographer.name}
                        effect="opacity"
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-light mb-2">{photographer.name}</h3>
                        <p className="text-sm font-light opacity-60 mb-3">{photographer.specialty} • {photographer.workCount} works</p>
                        <p className="text-base font-light opacity-80 mb-4">{photographer.description}</p>
                      </div>
                      <div className="flex gap-4">
                        {photographer.instagram && (
                          <span className="text-sm font-light opacity-60">{photographer.instagram}</span>
                        )}
                        {photographer.website && (
                          <span className="text-sm font-light opacity-60">{photographer.website}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Work Section */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-light mb-12 text-center">Featured Works This Month</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div key={index} className="relative aspect-square bg-gray-200 overflow-hidden group">
                <img
                  src={`/assets/images/featured/featured_00${index}.jpg`}
                  alt={`Featured ${index}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/gallery">
              <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-all duration-300">
                EXPLORE ALL WORKS
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Work With Us</h2>
          <p className="text-lg font-light opacity-80 mb-8 max-w-2xl mx-auto">
            Are you a photographer interested in showcasing your work on our platform? We're always looking for fresh perspectives.
          </p>
          <Link href="/contact">
            <button className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-all duration-300">
              GET IN TOUCH
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
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'photographers'])),
    },
  };
};

export default PhotographersPage;

