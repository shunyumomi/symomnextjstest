import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Link from 'next/link';

const CareersPage: React.FC = () => {
  const positions = [
    {
      title: 'Senior Photographer',
      department: 'Creative',
      location: 'Seoul, Korea / Remote',
      type: 'Full-time',
      description: 'Lead fashion and editorial photography projects with international brands.'
    },
    {
      title: 'Art Director',
      department: 'Creative',
      location: 'Paris, France',
      type: 'Full-time',
      description: 'Shape visual narratives and oversee creative campaign development.'
    },
    {
      title: 'Content Curator',
      department: 'Editorial',
      location: 'New York, USA / Remote',
      type: 'Part-time',
      description: 'Curate and organize visual content for our digital platform.'
    }
  ];

  return (
    <Layout title="Careers - MOMI" description="Join the MOMI team and shape the future of fashion">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-6 max-w-3xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-light mb-6 text-black">Careers</h1>
          <p className="text-xl md:text-2xl font-light text-gray-700 mb-8">
            Join our global team of creative professionals
          </p>
        </motion.div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-center text-black">Open Positions</h2>
          <div className="space-y-8">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="border border-gray-200 p-8 hover:border-black transition-colors"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-light mb-2 text-black">{position.title}</h3>
                    <p className="text-sm font-light text-gray-600 mb-2">
                      {position.department} • {position.location} • {position.type}
                    </p>
                  </div>
                  <Link href="/contact">
                    <button className="mt-4 md:mt-0 px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition-all duration-300 text-sm">
                      APPLY NOW
                    </button>
                  </Link>
                </div>
                <p className="text-base font-light text-gray-700">{position.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-8 text-black">Our Culture</h2>
            <p className="text-lg font-light text-gray-700 leading-relaxed mb-12">
              We believe in creative freedom, collaborative excellence, and the power of minimalist design. 
              Our team spans across continents, united by a shared passion for visual storytelling.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Creative Freedom', desc: 'Express your artistic vision' },
                { title: 'Global Impact', desc: 'Work with international brands' },
                { title: 'Growth Mindset', desc: 'Continuous learning and development' }
              ].map((item, index) => (
                <div key={item.title} className="text-center">
                  <h3 className="text-xl font-light mb-3 text-black">{item.title}</h3>
                  <p className="text-sm font-light text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-white">
        <div className="px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Don't See Your Role?</h2>
          <p className="text-lg font-light opacity-80 mb-8 max-w-2xl mx-auto">
            We're always looking for exceptional talent. Reach out and tell us how you'd like to contribute.
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
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default CareersPage;

