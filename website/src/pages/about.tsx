import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Link from 'next/link';

const AboutPage: React.FC = () => {
  const values = [
    {
      title: 'Minimalism',
      description: 'We believe in the power of simplicity, where less becomes more.',
      icon: '○'
    },
    {
      title: 'Excellence',
      description: 'Every image, every story, every detail crafted to perfection.',
      icon: '□'
    },
    {
      title: 'Innovation',
      description: 'Pushing boundaries in fashion photography and digital storytelling.',
      icon: '△'
    },
    {
      title: 'Authenticity',
      description: 'Real stories, genuine emotions, authentic connections.',
      icon: '◇'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Platform Founded', description: 'Beginning of a minimalist fashion platform' },
    { year: '2021', event: 'First Major Campaign', description: 'Collaboration with leading fashion houses' },
    { year: '2022', event: 'International Expansion', description: 'Showcasing photographers from around the world' },
    { year: '2023', event: 'Digital Innovation', description: 'Launching immersive digital experiences' },
    { year: '2024', event: 'Global Platform', description: '1000+ curated works, 50+ photographers' }
  ];

  return (
    <Layout title="About - MOMI" description="Learn about MOMI's vision and mission">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center px-6 max-w-4xl mx-auto"
        >
          <img 
            src="/assets/images/logo.png" 
            alt="MOMI" 
            className="h-16 md:h-24 w-auto mx-auto mb-6"
          />
          <p className="text-xl md:text-2xl font-light text-gray-800 mb-8">
            A minimalist fashion platform where art meets style
          </p>
          <p className="text-base md:text-lg font-light text-gray-700 leading-relaxed">
            Our platform represents a curated intersection of fashion, photography, and artistic expression. 
            We showcase the work of visionary photographers and designers who understand that true 
            elegance lies in simplicity.
          </p>
        </motion.div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-black">Our Vision</h2>
            <p className="text-lg font-light text-gray-800 leading-relaxed mb-4">
              To redefine fashion storytelling through a minimalist lens, creating a space where 
              photography transcends mere documentation to become art.
            </p>
            <p className="text-base font-light text-gray-700 leading-relaxed">
              We believe that fashion is more than clothing—it's a form of expression, a narrative, 
              a moment captured in time. Through our platform, we aim to showcase these moments in 
              their purest form.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] bg-gray-100"
          >
            <img
              src="/assets/images/featured/featured_001.jpg"
              alt="Our Vision"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-black text-white">
        <div className="px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-center text-white">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-light mb-4 text-white opacity-60">{value.icon}</div>
                <h3 className="text-xl font-light mb-3 text-white">{value.title}</h3>
                <p className="text-sm font-light text-white opacity-70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-white">
        <h2 className="text-3xl md:text-4xl font-light mb-12 text-center text-black">Our Journey</h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-300"></div>
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex items-start mb-12"
              >
                <div className="w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center z-10">
                  <span className="text-xs font-light text-black">{milestone.year}</span>
                </div>
                <div className="ml-8">
                  <h3 className="text-xl font-light mb-2 text-black">{milestone.event}</h3>
                  <p className="text-sm font-light text-gray-700">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-center text-black">The Team</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg font-light text-gray-800 leading-relaxed mb-8">
              Our platform is powered by a global network of creative professionals—photographers, stylists, 
              writers, and curators—all united by a shared vision of minimalist excellence.
            </p>
            <p className="text-base font-light text-gray-700 leading-relaxed mb-12">
              Our team spans across Paris, Milan, Seoul, Tokyo, New York, and London, bringing diverse 
              perspectives to create a truly global fashion platform.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {['Creative Direction', 'Photography', 'Editorial', 'Digital Experience'].map((dept, index) => (
                <motion.div
                  key={dept}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <p className="text-sm font-light text-black">{dept}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-white">
        <h2 className="text-3xl md:text-4xl font-light mb-12 text-center text-black">Our Partners</h2>
        <div className="max-w-5xl mx-auto">
          <p className="text-lg font-light text-gray-800 text-center mb-12">
            We collaborate with the world's leading fashion houses, publications, and creative agencies
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {['Vogue', 'Harper\'s Bazaar', 'Elle', 'Dior', 'Chanel', 'Saint Laurent', 
              'Vanity Fair', 'W Magazine', 'i-D', 'Dazed', 'Another', 'Document'].map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-sm font-light text-gray-600">{partner}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6 text-white">Join Our Journey</h2>
          <p className="text-lg font-light text-white opacity-80 mb-8 max-w-2xl mx-auto">
            Whether you're a photographer, designer, or fashion enthusiast, there's a place for you in our community.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300">
                GET IN TOUCH
              </button>
            </Link>
            <Link href="/careers">
              <button className="px-8 py-3 bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-300">
                VIEW CAREERS
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

export default AboutPage;

