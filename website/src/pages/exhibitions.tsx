import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Link from 'next/link';

const ExhibitionsPage: React.FC = () => {
  const exhibitions = [
    {
      title: 'Minimalist Visions',
      artist: 'Nicholas Fols',
      location: 'Paris, France',
      dates: 'March 15 - April 30, 2024',
      description: 'A retrospective of minimalist fashion photography',
      status: 'upcoming'
    },
    {
      title: 'Seoul Stories',
      artist: 'Studio Soyul',
      location: 'Seoul, Korea',
      dates: 'January 20 - March 10, 2024',
      description: 'Contemporary wedding and portrait photography',
      status: 'current'
    },
    {
      title: 'Artistic Expressions',
      artist: 'Ramie Pl',
      location: 'New York, USA',
      dates: 'November 15 - December 30, 2023',
      description: 'Abstract and conceptual photography works',
      status: 'past'
    }
  ];

  return (
    <Layout title="Exhibitions - MOMI" description="Explore MOMI's curated photography exhibitions">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-6 max-w-3xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-light mb-6 text-black">Exhibitions</h1>
          <p className="text-xl md:text-2xl font-light text-gray-700 mb-8">
            Curated photography exhibitions around the world
          </p>
        </motion.div>
      </section>

      {/* Current Exhibitions */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-center text-black">Current & Upcoming</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {exhibitions.filter(ex => ex.status !== 'past').map((exhibition, index) => (
              <motion.div
                key={exhibition.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="border border-gray-200 p-8 hover:border-black transition-colors"
              >
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 text-xs font-light ${
                    exhibition.status === 'current' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {exhibition.status === 'current' ? 'NOW SHOWING' : 'UPCOMING'}
                  </span>
                </div>
                <h3 className="text-2xl font-light mb-2 text-black">{exhibition.title}</h3>
                <p className="text-lg font-light text-gray-700 mb-2">{exhibition.artist}</p>
                <p className="text-sm font-light text-gray-600 mb-2">{exhibition.location}</p>
                <p className="text-sm font-light text-gray-600 mb-4">{exhibition.dates}</p>
                <p className="text-base font-light text-gray-700 mb-6">{exhibition.description}</p>
                <Link href="/contact">
                  <button className="px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition-all duration-300 text-sm">
                    LEARN MORE
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Exhibitions */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light mb-12 text-center text-black">Past Exhibitions</h2>
            <div className="space-y-6">
              {exhibitions.filter(ex => ex.status === 'past').map((exhibition, index) => (
                <motion.div
                  key={exhibition.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row md:justify-between md:items-center p-6 bg-white border border-gray-200"
                >
                  <div>
                    <h3 className="text-xl font-light mb-1 text-black">{exhibition.title}</h3>
                    <p className="text-base font-light text-gray-700 mb-1">{exhibition.artist}</p>
                    <p className="text-sm font-light text-gray-600">{exhibition.location} • {exhibition.dates}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Link href="/gallery">
                      <button className="px-6 py-2 text-sm font-light text-gray-600 hover:text-black transition-colors">
                        VIEW WORKS →
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-white">
        <div className="px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Host an Exhibition</h2>
          <p className="text-lg font-light opacity-80 mb-8 max-w-2xl mx-auto">
            Partner with MOMI to bring exceptional photography to your space.
          </p>
          <Link href="/contact">
            <button className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-all duration-300">
              PARTNER WITH US
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
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default ExhibitionsPage;

