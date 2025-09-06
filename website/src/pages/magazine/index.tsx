import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

interface Article {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  photographer: string;
  date: string;
  readTime: string;
  category: string;
  coverImage: string;
  excerpt: string;
  featured: boolean;
}

const MagazinePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const articles: Article[] = [
    {
      id: 'lake-of-memories',
      title: 'The Lake of Memories',
      subtitle: 'A visual journey through nostalgia',
      author: 'Sarah Chen',
      photographer: 'Umberto Manca & Priscah G',
      date: 'December 15, 2023',
      readTime: '8 min read',
      category: 'Editorial',
      coverImage: '/assets/images/magazine/28image-7.jpg',
      excerpt: 'Exploring the intersection of memory and fashion through a cinematic lens, this editorial captures the essence of fleeting moments.',
      featured: true
    },
    {
      id: 'vanity-fair-italia',
      title: 'Vanity Fair Italia',
      subtitle: 'Behind the December Cover Story',
      author: 'Marco Rossi',
      photographer: 'Nicholas Fols',
      date: 'December 10, 2023',
      readTime: '12 min read',
      category: 'Cover Story',
      coverImage: '/assets/images/magazine/000347010009.jpg',
      excerpt: 'An exclusive look behind the scenes of our December cover shoot with Cintia Dicker.',
      featured: true
    },
    {
      id: 'my-siren',
      title: 'My Siren',
      subtitle: 'The allure of mythical fashion',
      author: 'Elena Martinez',
      photographer: 'Angelin Michelle',
      date: 'November 28, 2023',
      readTime: '6 min read',
      category: 'Fashion',
      coverImage: '/assets/images/magazine/artistic_n_-99.jpg',
      excerpt: 'Diving into the depths of aquatic-inspired fashion, where mythology meets modern design.',
      featured: true
    },
    {
      id: 'sunset-of-fire',
      title: 'The Sunset of Fire',
      subtitle: 'Golden hour fashion photography',
      author: 'David Kim',
      photographer: 'Jaelefo & Barten',
      date: 'November 20, 2023',
      readTime: '10 min read',
      category: 'Photography',
      coverImage: '/assets/images/magazine/eui_couple_1_008.jpg',
      excerpt: 'Capturing the magic of golden hour, where light becomes the ultimate fashion accessory.',
      featured: false
    },
    {
      id: 'korean-wedding-tales',
      title: 'Korean Wedding Tales',
      subtitle: 'Modern romance in Seoul',
      author: 'Ji-Hye Park',
      photographer: 'Studio Soyul',
      date: 'November 15, 2023',
      readTime: '7 min read',
      category: 'Wedding',
      coverImage: '/assets/images/magazine/29image-13.jpg',
      excerpt: 'Contemporary Korean wedding photography that balances tradition with modern aesthetics.',
      featured: false
    },
    {
      id: 'paris-fashion-week',
      title: 'Paris Fashion Week Highlights',
      subtitle: 'SS24 Runway Trends',
      author: 'Claire Dubois',
      photographer: 'Various',
      date: 'October 5, 2023',
      readTime: '15 min read',
      category: 'Runway',
      coverImage: '/assets/images/magazine/gallery_series_3_014.jpg',
      excerpt: 'A comprehensive look at the standout moments and emerging trends from Paris Fashion Week SS24.',
      featured: false
    },
    {
      id: 'minimalist-movement',
      title: 'The Minimalist Movement',
      subtitle: 'Less is more in contemporary fashion',
      author: 'Alex Thompson',
      photographer: 'Lespecs',
      date: 'September 30, 2023',
      readTime: '9 min read',
      category: 'Trends',
      coverImage: '/assets/images/magazine/image-1.jpg',
      excerpt: 'How minimalism is reshaping the fashion landscape, from runway to street style.',
      featured: false
    },
    {
      id: 'portrait-of-a-lady',
      title: 'Portrait of a Lady',
      subtitle: 'Frederic Malle campaign story',
      author: 'Isabella Romano',
      photographer: 'Nicholas Fols',
      date: 'September 15, 2023',
      readTime: '11 min read',
      category: 'Campaign',
      coverImage: '/assets/images/magazine/nf_artistic_1_005.jpg',
      excerpt: 'The story behind the iconic fragrance campaign featuring Anna Dello Russo.',
      featured: false
    }
  ];

  const categories = ['all', 'Editorial', 'Fashion', 'Photography', 'Wedding', 'Runway', 'Trends', 'Campaign', 'Cover Story'];
  
  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  return (
    <Layout title="Magazine - MOMI" description="Fashion stories, editorials, and insights">
      {/* Hero Section with Featured Article */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/assets/images/magazine/39image-6.jpg"
            alt="Magazine Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative h-full flex items-end pb-20 px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-4xl"
          >
            <p className="text-sm font-light opacity-80 mb-4">FEATURED STORY</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4">The Lake of Memories</h1>
            <p className="text-lg md:text-xl font-light opacity-90 mb-6 max-w-2xl">
              A visual journey through nostalgia, exploring the intersection of memory and fashion through a cinematic lens.
            </p>
            <Link href="/magazine/lake-of-memories">
              <button className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-all duration-300">
                READ STORY
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-200">
        <div className="px-6 md:px-12 lg:px-20 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 text-sm transition-all ${
                  activeCategory === category
                    ? 'bg-black text-white'
                    : 'border border-gray-300 hover:border-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Grid */}
      {filteredArticles.some(a => a.featured) && (
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-light mb-12">Editor's Picks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles
              .filter(a => a.featured)
              .map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/magazine/${article.id}`}>
                    <div className="group cursor-pointer">
                      <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                        <LazyLoadImage
                          src={article.coverImage}
                          alt={article.title}
                          effect="opacity"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white text-xs font-light">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-xs font-light opacity-60 mb-2">
                          {article.date} • {article.readTime}
                        </p>
                        <h3 className="text-xl font-light mb-2 group-hover:opacity-60 transition-opacity">
                          {article.title}
                        </h3>
                        <p className="text-sm font-light opacity-80 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <p className="text-xs font-light opacity-60 mt-3">
                          By {article.author} • Photo: {article.photographer}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
          </div>
        </section>
      )}

      {/* All Articles List */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-light mb-12">Latest Stories</h2>
          <div className="space-y-8">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/magazine/${article.id}`}>
                  <div className="flex flex-col md:flex-row gap-6 p-6 bg-white hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="md:w-1/3">
                      <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
                        <LazyLoadImage
                          src={article.coverImage}
                          alt={article.title}
                          effect="opacity"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-light px-3 py-1 border border-gray-300">
                            {article.category}
                          </span>
                          <span className="text-xs font-light opacity-60">
                            {article.date}
                          </span>
                          <span className="text-xs font-light opacity-60">
                            {article.readTime}
                          </span>
                        </div>
                        <h3 className="text-2xl font-light mb-2">{article.title}</h3>
                        <p className="text-base font-light opacity-60 mb-3">{article.subtitle}</p>
                        <p className="text-sm font-light opacity-80 line-clamp-2">{article.excerpt}</p>
                      </div>
                      <div className="mt-4">
                        <p className="text-xs font-light opacity-60">
                          By {article.author} • Photography: {article.photographer}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-black text-white">
        <div className="px-6 md:px-12 lg:px-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-6">Never Miss a Story</h2>
            <p className="text-lg font-light opacity-80 mb-8">
              Subscribe to our magazine for exclusive content, behind-the-scenes access, and the latest in fashion journalism.
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-6 py-3 bg-transparent border border-white text-white placeholder-white/60 focus:outline-none focus:border-white/60"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-300"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl font-light mb-12 text-center">Popular Topics</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {['Paris Fashion Week', 'Minimalism', 'Street Style', 'Sustainability', 'Haute Couture', 
            'Emerging Designers', 'Fashion Tech', 'Vintage Revival', 'Gender Neutral', 'Accessories'].map(topic => (
            <Link key={topic} href={`/search?topic=${topic.toLowerCase().replace(' ', '-')}`}>
              <span className="px-5 py-2 border border-gray-300 text-sm font-light hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer">
                {topic}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'magazine'])),
    },
  };
};

export default MagazinePage;

