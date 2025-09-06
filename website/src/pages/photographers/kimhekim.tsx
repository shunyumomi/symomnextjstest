import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import Link from 'next/link';

const KimhekimPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const photographerInfo = {
    name: 'KIMHĒKIM',
    bio: 'KIMHĒKIM is a Seoul-based fashion photographer and creative director known for their avant-garde approach to fashion imagery. Blending traditional Korean aesthetics with contemporary fashion, they create visually striking narratives that challenge conventional beauty standards.',
    specialty: 'Avant-garde Fashion & Creative Direction',
    location: 'Seoul, South Korea',
    experience: '10+ years',
    clients: ['Vogue Korea', 'Harper\'s Bazaar Korea', 'W Korea', 'Gentle Monster', 'Ambush'],
    instagram: '@kimhekim',
    website: 'kimhekim.kr',
    email: 'studio@kimhekim.kr'
  };

  const portfolioCategories = [
    { id: 'all', label: 'All Works', count: 97 },
    { id: 'fashion', label: 'Fashion', count: 52 },
    { id: 'editorial', label: 'Editorial', count: 28 },
    { id: 'creative', label: 'Creative Direction', count: 17 }
  ];

  const featuredWorks = [
    {
      id: 1,
      title: 'Neo-Traditional',
      category: 'fashion',
      year: '2024',
      image: '/assets/images/photographers/39image_1.jpg'
    },
    {
      id: 2,
      title: 'Seoul Nights',
      category: 'editorial',
      year: '2023',
      image: '/assets/images/photographers/39image_2.jpg'
    },
    {
      id: 3,
      title: 'Digital Hanbok',
      category: 'creative',
      year: '2024',
      image: '/assets/images/photographers/39image_3.jpg'
    },
    {
      id: 4,
      title: 'K-Fashion Forward',
      category: 'fashion',
      year: '2023',
      image: '/assets/images/photographers/39image_4.jpg'
    },
    {
      id: 5,
      title: 'Cultural Synthesis',
      category: 'editorial',
      year: '2024',
      image: '/assets/images/photographers/39image_5.jpg'
    },
    {
      id: 6,
      title: 'Future Heritage',
      category: 'creative',
      year: '2023',
      image: '/assets/images/photographers/39image_6.jpg'
    }
  ];

  const testimonials = [
    {
      author: 'Lee Soo-man',
      role: 'Creative Director, SM Entertainment',
      quote: 'KIMHĒKIM brings a unique perspective that perfectly captures the essence of contemporary Korean fashion culture.'
    },
    {
      author: 'Park Min-jung',
      role: 'Editor-in-Chief, Vogue Korea',
      quote: 'Their work represents the new wave of Korean creative talent that is reshaping global fashion imagery.'
    }
  ];

  const filteredWorks = activeCategory === 'all' 
    ? featuredWorks 
    : featuredWorks.filter(work => work.category === activeCategory);

  return (
    <Layout 
      title="KIMHĒKIM - Photographer | MOMI"
      description="Explore the avant-garde fashion photography of KIMHĒKIM"
    >
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/assets/images/photographers/39image_1.jpg"
            alt="KIMHĒKIM Photography"
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
              <h1 className="text-5xl md:text-7xl font-light mb-4">{photographerInfo.name}</h1>
              <p className="text-xl md:text-2xl font-light opacity-90 mb-2">{photographerInfo.specialty}</p>
              <p className="text-lg font-light opacity-70">{photographerInfo.location}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photographer Info */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-light mb-6">About</h2>
            <p className="text-lg font-light leading-relaxed opacity-80 mb-8">
              {photographerInfo.bio}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-sm font-medium opacity-60 w-24">Experience:</span>
                <span className="text-sm font-light">{photographerInfo.experience}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium opacity-60 w-24">Location:</span>
                <span className="text-sm font-light">{photographerInfo.location}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium opacity-60 w-24">Instagram:</span>
                <span className="text-sm font-light">{photographerInfo.instagram}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium opacity-60 w-24">Website:</span>
                <span className="text-sm font-light">{photographerInfo.website}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-light mb-6">Notable Clients</h3>
            <div className="grid grid-cols-2 gap-4">
              {photographerInfo.clients.map((client, index) => (
                <div key={index} className="text-sm font-light opacity-70 py-2">
                  {client}
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
                  <p className="text-sm opacity-80">{work.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-light mb-12 text-center">Recognition</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <p className="text-lg font-light italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm opacity-60">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-black text-white">
        <div className="px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Work With KIMHĒKIM</h2>
          <p className="text-lg font-light opacity-80 mb-8 max-w-2xl mx-auto">
            Interested in collaborating on your next creative project? Let's create something extraordinary together.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href={`mailto:${photographerInfo.email}`}
              className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Send Email
            </a>
            <Link href="/contact">
              <button className="px-8 py-3 bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-300">
                Contact Form
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

export default KimhekimPage;
