import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

interface Campaign {
  id: string;
  title: string;
  brand: string;
  photographer: string;
  year: string;
  description: string;
  coverImage: string;
  images: string[];
  featured: boolean;
  category: 'fragrance' | 'fashion' | 'beauty' | 'lifestyle';
}

const CampaignsPage: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const campaigns: Campaign[] = [
    {
      id: 'portrait-of-a-lady',
      title: 'Portrait of a Lady',
      brand: 'Frederic Malle',
      photographer: 'Various Artists',
      year: '2024',
      description: 'Timeless elegance captured in a sophisticated fragrance campaign',
      coverImage: '/assets/images/featured/featured_004.jpg',
      images: [
        '/assets/images/gallery/portrait/portrait_001.jpg',
        '/assets/images/gallery/portrait/portrait_002.jpg',
        '/assets/images/gallery/portrait/portrait_003.jpg'
      ],
      featured: true,
      category: 'fragrance'
    },
    {
      id: 'obsession-campaign',
      title: 'OBSESSION N.2 Campaign',
      brand: 'KIMHĒKIM',
      photographer: 'KIMHĒKIM Studio',
      year: '2024',
      description: 'Women in Canvas - An artistic exploration of feminine power',
      coverImage: '/assets/images/featured/featured_001.jpg',
      images: [
        '/assets/images/gallery/editorial/editorial_001.jpg',
        '/assets/images/gallery/editorial/editorial_002.jpg',
        '/assets/images/gallery/editorial/editorial_003.jpg'
      ],
      featured: true,
      category: 'fashion'
    },
    {
      id: 'cinematic-stories',
      title: 'Cinematic Stories',
      brand: 'MOMI Creative',
      photographer: 'Nicholas Fols',
      year: '2024',
      description: 'Through the lens of cinematic storytelling',
      coverImage: '/assets/images/featured/featured_002.jpg',
      images: [
        '/assets/images/gallery/cinematic/cinematic_series_1_001.jpg',
        '/assets/images/gallery/cinematic/cinematic_series_1_002.jpg',
        '/assets/images/gallery/cinematic/cinematic_series_1_003.jpg'
      ],
      featured: true,
      category: 'lifestyle'
    },
    {
      id: 'minimalist-beauty',
      title: 'Minimalist Beauty',
      brand: 'Beauty Collective',
      photographer: 'Nicholas Fols',
      year: '2023',
      description: 'Clean beauty captured in its purest form',
      coverImage: '/assets/images/featured/featured_003.jpg',
      images: [
        '/assets/images/gallery/artistic/artistic_001.jpg',
        '/assets/images/gallery/artistic/artistic_002.jpg',
        '/assets/images/gallery/artistic/artistic_003.jpg'
      ],
      featured: false,
      category: 'beauty'
    }
  ];

  const categories = ['all', 'fragrance', 'fashion', 'beauty', 'lifestyle'];
  
  const filteredCampaigns = filterCategory === 'all' 
    ? campaigns 
    : campaigns.filter(c => c.category === filterCategory);

  return (
    <Layout title="Campaigns - MOMI" description="Explore our curated campaign photography and brand collaborations">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-black text-white">
        <div className="absolute inset-0">
          <img
            src="/assets/images/featured/featured_001.jpg"
            alt="Campaigns Hero"
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
              Campaigns
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl font-light opacity-80"
            >
              Brand stories told through visual excellence
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-200">
        <div className="px-6 md:px-12 lg:px-20 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 text-sm transition-all ${
                  filterCategory === category
                    ? 'bg-black text-white'
                    : 'border border-gray-300 hover:border-black'
                }`}
              >
                {category === 'all' ? 'All Campaigns' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      {filteredCampaigns.some(c => c.featured) && (
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-light mb-12">Featured Campaigns</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {filteredCampaigns
              .filter(c => c.featured)
              .map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/campaigns/${campaign.id}`}>
                    <div className="group cursor-pointer">
                      <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
                        <LazyLoadImage
                          src={campaign.coverImage}
                          alt={campaign.title}
                          effect="opacity"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                          <div className="absolute bottom-6 left-6 right-6 text-white">
                            <p className="text-xs font-light opacity-80 mb-2">{campaign.brand} • {campaign.year}</p>
                            <h3 className="text-2xl md:text-3xl font-light mb-2">{campaign.title}</h3>
                            <p className="text-sm font-light opacity-90">Photography by {campaign.photographer}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <p className="text-base font-light opacity-80">{campaign.description}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </section>
      )}

      {/* All Campaigns Grid */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-light mb-12">
            {filterCategory !== 'all' ? `${filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)} Campaigns` : 'All Campaigns'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/campaigns/${campaign.id}`}>
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden bg-gray-200 aspect-[4/5]">
                      <LazyLoadImage
                        src={campaign.coverImage}
                        alt={campaign.title}
                        effect="opacity"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <p className="text-white text-sm font-light">View Campaign →</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-light mb-1">{campaign.title}</h3>
                      <p className="text-sm font-light opacity-60">{campaign.brand} • {campaign.year}</p>
                      <p className="text-xs font-light opacity-50 mt-1">{campaign.photographer}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl font-light mb-12 text-center">Campaign Services</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-xl font-light mb-4">Creative Direction</h3>
            <p className="text-sm font-light opacity-70">
              Comprehensive creative strategy and visual concept development for your brand campaigns.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-light mb-4">Photography</h3>
            <p className="text-sm font-light opacity-70">
              Professional campaign photography with our network of talented photographers.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-light mb-4">Art Direction</h3>
            <p className="text-sm font-light opacity-70">
              Complete art direction services to ensure cohesive visual storytelling.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-light mb-4">Post-Production</h3>
            <p className="text-sm font-light opacity-70">
              Professional editing and retouching to perfect your campaign visuals.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Ready to Create?</h2>
          <p className="text-lg font-light opacity-80 mb-8 max-w-2xl mx-auto">
            Let's collaborate to create compelling visual campaigns that tell your brand's story and connect with your audience.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-all duration-300">
                START A PROJECT
              </button>
            </Link>
            <Link href="/photographers">
              <button className="px-8 py-3 bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-300">
                VIEW PHOTOGRAPHERS
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
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'campaigns'])),
    },
  };
};

export default CampaignsPage;

