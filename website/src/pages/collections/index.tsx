import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

interface Collection {
  id: string;
  title: string;
  season: string;
  year: string;
  designer: string;
  description: string;
  imageCount: number;
  coverImage: string;
  featured: boolean;
}

const CollectionsPage: React.FC = () => {
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterSeason, setFilterSeason] = useState<string>('all');

  const collections: Collection[] = [
    {
      id: 'ss24',
      title: 'Spring/Summer 2024',
      season: 'Spring/Summer',
      year: '2024',
      designer: 'MOMI Creative Team',
      description: 'A celebration of minimalist elegance and contemporary silhouettes',
      imageCount: 48,
      coverImage: '/assets/images/featured/featured_001.jpg',
      featured: true
    },
    {
      id: 'fw23',
      title: 'Fall/Winter 2023',
      season: 'Fall/Winter',
      year: '2023',
      designer: 'MOMI Creative Team',
      description: 'Dark romance meets architectural precision',
      imageCount: 52,
      coverImage: '/assets/images/featured/featured_002.jpg',
      featured: true
    },
    {
      id: 'couture',
      title: 'Couture 2024',
      season: 'Couture',
      year: '2024',
      designer: 'KIMHĒKIM',
      description: 'Handcrafted excellence in every stitch',
      imageCount: 35,
      coverImage: '/assets/images/featured/featured_003.jpg',
      featured: true
    },
    {
      id: 'bridal',
      title: 'Bridal 2024',
      season: 'Bridal',
      year: '2024',
      designer: 'Various',
      description: 'Modern romance for the contemporary bride',
      imageCount: 42,
      coverImage: '/assets/images/featured/featured_004.jpg',
      featured: false
    },
    {
      id: 'resort24',
      title: 'Resort 2024',
      season: 'Resort',
      year: '2024',
      designer: 'MOMI Creative Team',
      description: 'Effortless luxury for endless summers',
      imageCount: 38,
      coverImage: '/assets/images/featured/featured_005.jpg',
      featured: false
    },
    {
      id: 'ss23',
      title: 'Spring/Summer 2023',
      season: 'Spring/Summer',
      year: '2023',
      designer: 'MOMI Creative Team',
      description: 'A retrospective on light and movement',
      imageCount: 45,
      coverImage: '/assets/images/featured/featured_006.jpg',
      featured: false
    },
    {
      id: 'fw22',
      title: 'Fall/Winter 2022',
      season: 'Fall/Winter',
      year: '2022',
      designer: 'MOMI Creative Team',
      description: 'Exploring texture and form',
      imageCount: 40,
      coverImage: '/assets/images/featured/featured_007.jpg',
      featured: false
    },
    {
      id: 'archive',
      title: 'Archive Collection',
      season: 'Archive',
      year: 'Various',
      designer: 'Various',
      description: 'Timeless pieces from our archives',
      imageCount: 120,
      coverImage: '/assets/images/featured/featured_008.jpg',
      featured: false
    }
  ];

  const years = ['all', '2024', '2023', '2022'];
  const seasons = ['all', 'Spring/Summer', 'Fall/Winter', 'Couture', 'Bridal', 'Resort', 'Archive'];

  let filteredCollections = collections;
  if (filterYear !== 'all') {
    filteredCollections = filteredCollections.filter(c => c.year === filterYear || c.year === 'Various');
  }
  if (filterSeason !== 'all') {
    filteredCollections = filteredCollections.filter(c => c.season === filterSeason);
  }

  return (
    <Layout title="Collections - MOMI" description="Explore our curated fashion collections">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-black text-white">
        <div className="absolute inset-0">
          <img
            src="/assets/images/featured/featured_001.jpg"
            alt="Collections Hero"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-light mb-4"
            >
              Collections
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl font-light opacity-80"
            >
              Curated fashion narratives through the seasons
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-200">
        <div className="px-6 md:px-12 lg:px-20 py-6">
          <div className="flex flex-wrap gap-6 justify-between">
            {/* Year Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-light">Year:</span>
              <div className="flex gap-2">
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => setFilterYear(year)}
                    className={`px-4 py-2 text-sm transition-all ${
                      filterYear === year
                        ? 'bg-black text-white'
                        : 'border border-gray-300 hover:border-black'
                    }`}
                  >
                    {year === 'all' ? 'All Years' : year}
                  </button>
                ))}
              </div>
            </div>

            {/* Season Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-light">Season:</span>
              <select
                value={filterSeason}
                onChange={(e) => setFilterSeason(e.target.value)}
                className="px-4 py-2 border border-gray-300 text-sm font-light focus:outline-none focus:border-black"
              >
                {seasons.map(season => (
                  <option key={season} value={season}>
                    {season === 'all' ? 'All Seasons' : season}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      {filteredCollections.some(c => c.featured) && (
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-light mb-12">Featured Collections</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCollections
              .filter(c => c.featured)
              .map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/collections/${collection.id}`}>
                    <div className="group cursor-pointer">
                      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                        <LazyLoadImage
                          src={collection.coverImage}
                          alt={collection.title}
                          effect="opacity"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                          <div className="absolute bottom-6 left-6 right-6 text-white">
                            <p className="text-xs font-light opacity-80 mb-2">{collection.designer}</p>
                            <h3 className="text-2xl font-light mb-2">{collection.title}</h3>
                            <p className="text-sm font-light opacity-90">{collection.imageCount} looks</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-base font-light opacity-80">{collection.description}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </section>
      )}

      {/* All Collections Grid */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-light mb-12">
            {filterYear !== 'all' || filterSeason !== 'all' ? 'Filtered Collections' : 'All Collections'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/collections/${collection.id}`}>
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden bg-gray-200 aspect-[4/5]">
                      <LazyLoadImage
                        src={collection.coverImage}
                        alt={collection.title}
                        effect="opacity"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <p className="text-white text-sm font-light">View Collection →</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h3 className="text-base font-light">{collection.title}</h3>
                      <p className="text-sm font-light opacity-60">{collection.imageCount} looks</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl font-light mb-12 text-center">Collection Timeline</h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-300"></div>
            
            {/* Timeline Items */}
            {collections.slice(0, 6).map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="w-1/2"></div>
                <div className="w-4 h-4 bg-black rounded-full absolute left-1/2 transform -translate-x-1/2"></div>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <Link href={`/collections/${collection.id}`}>
                    <div className="group cursor-pointer">
                      <p className="text-sm font-light opacity-60 mb-1">{collection.year}</p>
                      <h3 className="text-xl font-light mb-2 group-hover:opacity-60 transition-opacity">
                        {collection.title}
                      </h3>
                      <p className="text-sm font-light opacity-80">{collection.description}</p>
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Discover More</h2>
          <p className="text-lg font-light opacity-80 mb-8 max-w-2xl mx-auto">
            Explore our complete archive of collections and behind-the-scenes content
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/collections/archive">
              <button className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-all duration-300">
                BROWSE ARCHIVE
              </button>
            </Link>
            <Link href="/behind-the-scenes">
              <button className="px-8 py-3 bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-300">
                BEHIND THE SCENES
              </button>
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
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'collections'])),
    },
  };
};

export default CollectionsPage;

