import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import Link from 'next/link';

const CollectiveArtistsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const collectiveInfo = {
    name: 'Collective Artists',
    bio: 'A diverse group of emerging and established photographers from around the world, united by their passion for innovative fashion photography. Our collective represents various cultural perspectives and artistic approaches, creating a rich tapestry of visual storytelling.',
    specialty: 'Diverse Fashion & Artistic Photography',
    location: 'Global Network',
    experience: 'Various',
    members: ['Elena Rodriguez', 'Kenji Nakamura', 'Amara Johnson', 'Lucas Chen', 'Sofia Petrov', 'David Kim'],
    instagram: '@collectiveartists',
    website: 'collectiveartists.com',
    email: 'info@collectiveartists.com'
  };

  const portfolioCategories = [
    { id: 'all', label: 'All Works', count: 124 },
    { id: 'fashion', label: 'Fashion', count: 58 },
    { id: 'portrait', label: 'Portrait', count: 41 },
    { id: 'artistic', label: 'Artistic', count: 25 }
  ];

  const featuredWorks = [
    {
      id: 1,
      title: 'Global Perspectives',
      category: 'fashion',
      year: '2024',
      artist: 'Elena Rodriguez',
      image: '/assets/images/photographers/42image_1.jpg'
    },
    {
      id: 2,
      title: 'Tokyo Streets',
      category: 'portrait',
      year: '2023',
      artist: 'Kenji Nakamura',
      image: '/assets/images/photographers/42image_2.jpg'
    },
    {
      id: 3,
      title: 'Cultural Fusion',
      category: 'artistic',
      year: '2024',
      artist: 'Amara Johnson',
      image: '/assets/images/photographers/42image_3.jpg'
    },
    {
      id: 4,
      title: 'Modern Minimalism',
      category: 'fashion',
      year: '2023',
      artist: 'Lucas Chen',
      image: '/assets/images/photographers/42image_4.jpg'
    },
    {
      id: 5,
      title: 'Urban Poetry',
      category: 'portrait',
      year: '2024',
      artist: 'Sofia Petrov',
      image: '/assets/images/photographers/42image_5.jpg'
    },
    {
      id: 6,
      title: 'Digital Dreams',
      category: 'artistic',
      year: '2023',
      artist: 'David Kim',
      image: '/assets/images/photographers/42image_6.jpg'
    }
  ];

  const filteredWorks = activeCategory === 'all' 
    ? featuredWorks 
    : featuredWorks.filter(work => work.category === activeCategory);

  return (
    <Layout 
      title="Collective Artists - Photographers | MOMI"
      description="Explore the diverse work of our international collective of fashion photographers"
    >
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/assets/images/photographers/42image_1.jpg"
            alt="Collective Artists Photography"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
        </div>
        
        <div className="relative z-10 h-full flex items-end">
          <div className="px-6 md:px-12 lg:px-20 pb-20 text-white">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-light mb-4">{collectiveInfo.name}</h1>
              <p className="text-xl md:text-2xl font-light opacity-90 mb-2">{collectiveInfo.specialty}</p>
              <p className="text-lg font-light opacity-70">{collectiveInfo.location}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collective Info */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-light mb-6">About Our Collective</h2>
            <p className="text-lg font-light leading-relaxed opacity-80 mb-8">
              {collectiveInfo.bio}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-sm font-medium opacity-60 w-24">Network:</span>
                <span className="text-sm font-light">{collectiveInfo.location}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium opacity-60 w-24">Instagram:</span>
                <span className="text-sm font-light">{collectiveInfo.instagram}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium opacity-60 w-24">Website:</span>
                <span className="text-sm font-light">{collectiveInfo.website}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-light mb-6">Featured Artists</h3>
            <div className="grid grid-cols-2 gap-4">
              {collectiveInfo.members.map((member, index) => (
                <div key={index} className="text-sm font-light opacity-70 py-2">
                  {member}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Categories */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-200">
        <div className="px-6 md:px-12 lg:px-20 py-6">
          <div className="flex flex-wrap gap-3">
            {portfolioCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 text-sm transition-all ${
                  activeCategory === category.id
                    ? 'bg-black text-white'
                    : 'border border-gray-300 hover:border-black'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorks.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-lg font-light">{work.title}</h3>
                  <p className="text-sm opacity-80">{work.artist}</p>
                  <p className="text-xs opacity-60">{work.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-black text-white">
        <div className="px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Join Our Collective</h2>
          <p className="text-lg font-light opacity-80 mb-8 max-w-2xl mx-auto">
            Are you a photographer interested in joining our global collective? We're always looking for fresh talent and unique perspectives.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href={`mailto:${collectiveInfo.email}`}
              className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Send Portfolio
            </a>
            <Link href="/contact">
              <button className="px-8 py-3 bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-300">
                Learn More
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
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default CollectiveArtistsPage;


