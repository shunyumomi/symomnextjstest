import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Link from 'next/link';

const NewsletterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your newsletter service
    setIsSubscribed(true);
  };

  return (
    <Layout title="Newsletter - MOMI" description="Subscribe to MOMI newsletter for exclusive content">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-6 max-w-3xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-light mb-6 text-black">Newsletter</h1>
          <p className="text-xl md:text-2xl font-light text-gray-700 mb-8">
            Stay connected with the latest in minimalist fashion and photography
          </p>
          
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 border border-gray-300 focus:outline-none focus:border-black text-black bg-white"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-all duration-300"
                >
                  SUBSCRIBE
                </button>
              </div>
            </form>
          ) : (
            <div className="max-w-md mx-auto">
              <p className="text-lg font-light text-green-600 mb-4">Thank you for subscribing!</p>
              <Link href="/">
                <button className="px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-all duration-300">
                  RETURN HOME
                </button>
              </Link>
            </div>
          )}
        </motion.div>
      </section>

      {/* What You'll Get */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-center text-black">What You'll Receive</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Exclusive Content',
                description: 'Behind-the-scenes access to our latest photoshoots and collections'
              },
              {
                title: 'Featured Artists',
                description: 'In-depth profiles of photographers and designers in our network'
              },
              {
                title: 'Early Access',
                description: 'Be the first to see new collections and editorial features'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="text-xl font-light mb-3 text-black">{item.title}</h3>
                <p className="text-sm font-light text-gray-600">{item.description}</p>
              </motion.div>
            ))}
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

export default NewsletterPage;

