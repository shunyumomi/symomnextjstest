import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const NicholasFolsPage: React.FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const photographerInfo = {
    name: 'Nicholas Fols',
    bio: 'Nicholas Fols is a visionary fashion photographer known for his ability to capture the essence of contemporary fashion while maintaining a timeless quality in his work. With over a decade of experience, he has collaborated with leading fashion houses and publications worldwide.',
    specialty: 'Fashion & Editorial Photography',
    location: 'Paris, France',
    experience: '12+ years',
    clients: ['Vogue', 'Harper\'s Bazaar', 'Elle', 'Dior', 'Chanel', 'Saint Laurent'],
    instagram: '@nicholasfols',
    website: 'nicholasfols.com',
    email: 'studio@nicholasfols.com'
  };

  const portfolioCategories = [
    { id: 'all', label: 'All Works', count: 159 },
    { id: 'fashion', label: 'Fashion', count: 68 },
    { id: 'editorial', label: 'Editorial', count: 52 },
    { id: 'portrait', label: 'Portrait', count: 39 }
  ];

  const featuredWorks = [
    {
      id: 1,
      title: 'Vanity Fair Italia Editorial',
      category: 'editorial',
      year: '2023',
      image: '/assets/images/photographers/114image_1.jpg'
    },
    {
      id: 2,
      title: 'SS24 Campaign',
      category: 'fashion',
      year: '2024',
      image: '/assets/images/photographers/114image_2.jpg'
    },
    {
      id: 3,
      title: 'Portrait Series',
      category: 'portrait',
      year: '2023',
      image: '/assets/images/photographers/114image_3.jpg'
    },
    {
      id: 4,
      title: 'Urban Stories',
      category: 'editorial',
      year: '2023',
      image: '/assets/images/photographers/114image_4.jpg'
    },
    {
      id: 5,
      title: 'Minimalist Fashion',
      category: 'fashion',
      year: '2023',
      image: '/assets/images/photographers/114image_5.jpg'
    },
    {
      id: 6,
      title: 'Lake of Memories',
      category: 'editorial',
      year: '2023',
      image: '/assets/images/photographers/114image_6.jpg'
    }
  ];

  const testimonials = [
    {
      author: 'Anna Dello Russo',
      role: 'Fashion Icon',
      quote: 'Nicholas has an extraordinary ability to capture not just images, but emotions and stories that resonate deeply with viewers.'
    },
    {
      author: 'Cintia Dicker',
      role: 'Model',
      quote: 'Working with Nicholas is always a creative journey. He brings out the best in everyone he photographs.'
    }
  ];

  return (
    <Layout title="Nicholas Fols - Photographer | MOMI" description="Explore the portfolio of Nicholas Fols, fashion and editorial photographer">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black">
          <img
            src="/assets/images/photographers/nicholasfols/nf_hero.jpg"
            alt="Nicholas Fols Hero"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative h-full flex items-center justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-6"
          >
            <h1 className="text-6xl md:text-8xl font-light mb-4">{photographerInfo.name}</h1>
            <p className="text-xl font-light opacity-80">{photographerInfo.specialty}</p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12"
          >
            <div>
              <h2 className="text-3xl font-light mb-6">About</h2>
              <p className="text-base font-light leading-relaxed opacity-80 mb-6">
                {photographerInfo.bio}
              </p>
              <p className="text-base font-light leading-relaxed opacity-80">
                Based in {photographerInfo.location}, Nicholas continues to push the boundaries of fashion photography, 
                creating visual narratives that are both contemporary and timeless.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-light mb-4">Details</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-light opacity-60">Experience</dt>
                  <dd className="text-base font-light">{photographerInfo.experience}</dd>
                </div>
                <div>
                  <dt className="text-sm font-light opacity-60">Location</dt>
                  <dd className="text-base font-light">{photographerInfo.location}</dd>
                </div>
                <div>
                  <dt className="text-sm font-light opacity-60">Contact</dt>
                  <dd className="text-base font-light">{photographerInfo.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-light opacity-60">Social</dt>
                  <dd className="text-base font-light">
                    <a href={`https://instagram.com/${photographerInfo.instagram.substring(1)}`} className="hover:opacity-60">
                      {photographerInfo.instagram}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 md:px-12 lg:px-20">
          <h2 className="text-4xl font-light mb-12 text-center">Portfolio</h2>
          
          {/* Category Filter */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {portfolioCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 text-sm transition-all ${
                  activeCategory === category.id
                    ? 'bg-black text-white'
                    : 'border border-gray-300 hover:border-black'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWorks
              .filter(work => activeCategory === 'all' || work.category === activeCategory)
              .map((work, index) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden bg-gray-200 aspect-[4/5]">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-lg font-light">{work.title}</h3>
                        <p className="text-sm font-light opacity-80">{work.year}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/gallery?photographer=nicholas-fols">
              <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-all duration-300">
                VIEW ALL WORKS
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-12 text-center">Selected Clients</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {photographerInfo.clients.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-lg font-light opacity-70">{client}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black text-white">
        <div className="px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-light mb-12 text-center">Testimonials</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-lg font-light italic mb-6 opacity-90">"{testimonial.quote}"</p>
                <p className="text-sm font-light">{testimonial.author}</p>
                <p className="text-xs font-light opacity-60">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 md:px-12 lg:px-20 text-center">
        <h2 className="text-3xl font-light mb-6">Interested in Working Together?</h2>
        <p className="text-lg font-light opacity-70 mb-8 max-w-2xl mx-auto">
          For inquiries about fashion shoots, editorial projects, or collaborations, please get in touch.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href={`mailto:${photographerInfo.email}`}>
            <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-all duration-300">
              CONTACT STUDIO
            </button>
          </a>
          <a href={`https://instagram.com/${photographerInfo.instagram.substring(1)}`} target="_blank" rel="noopener noreferrer">
            <button className="px-8 py-3 bg-black text-white hover:bg-transparent hover:text-black hover:border hover:border-black transition-all duration-300">
              FOLLOW ON INSTAGRAM
            </button>
          </a>
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

export default NicholasFolsPage;

