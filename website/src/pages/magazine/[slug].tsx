import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';

interface MagazineArticle {
  slug: string;
  title: string;
  subtitle?: string;
  photographer: string;
  publication: string;
  date: string;
  coverImage: string;
  content: string;
  images: string[];
  tags: string[];
}

const magazineArticles: { [key: string]: MagazineArticle } = {
  'lake-of-memories': {
    slug: 'lake-of-memories',
    title: 'The Lake of Memories',
    subtitle: 'A photographic journey through time and emotion',
    photographer: 'Umberto Manca & Priscah G',
    publication: 'MOMI Magazine',
    date: 'December 2023',
    coverImage: '/assets/images/gallery/editorial/editorial_001.jpg',
    content: `
      <p>The Lake of Memories stands as one of the most compelling editorial series of the year, capturing the ethereal beauty of remembrance through the lens of collaborative photography. Umberto Manca and Priscah G have crafted a visual narrative that transcends traditional fashion photography, delving into the depths of human emotion and memory.</p>

      <p>Set against the backdrop of a serene lake at dawn, this series explores themes of nostalgia, loss, and the beautiful impermanence of moments. Each image tells a story of what was, what is, and what could have been, creating a tapestry of visual poetry that resonates with viewers on a profound level.</p>

      <p>The styling choices reflect a minimalist approach, with flowing fabrics that mirror the movement of water and time. The color palette, dominated by soft blues and ethereal whites, evokes the morning mist that dances across the lake's surface, creating an otherworldly atmosphere that perfectly complements the emotional weight of the narrative.</p>

      <p>This collaboration represents a new direction in editorial photography, where the line between fashion and fine art becomes beautifully blurred. It's a testament to the power of visual storytelling and the ability of photography to capture not just images, but emotions and memories that linger long after the final frame.</p>
    `,
    images: [
      '/assets/images/gallery/editorial/editorial_001.jpg',
      '/assets/images/gallery/editorial/editorial_002.jpg',
      '/assets/images/gallery/editorial/editorial_003.jpg',
      '/assets/images/gallery/editorial/editorial_004.jpg'
    ],
    tags: ['Editorial', 'Collaboration', 'Memory', 'Fine Art']
  },
  'vanity-fair-italia': {
    slug: 'vanity-fair-italia',
    title: 'Vanity Fair Italia Feature',
    subtitle: 'Italian elegance meets contemporary fashion',
    photographer: 'Cintia Dicker',
    publication: 'Vanity Fair Italia',
    date: 'December 2023',
    coverImage: '/assets/images/gallery/editorial/editorial_002.jpg',
    content: `
      <p>Cintia Dicker's latest feature for Vanity Fair Italia showcases the perfect marriage between Italian sophistication and modern fashion sensibilities. This editorial series captures the essence of contemporary elegance while paying homage to the timeless style that Italy is renowned for worldwide.</p>

      <p>The shoot takes place across iconic Italian locations, from the cobblestone streets of Rome to the sun-drenched terraces of Tuscany. Each setting provides a rich backdrop that enhances the narrative of Italian beauty and culture, while the fashion choices represent the best of contemporary Italian design.</p>

      <p>Dicker's approach to this editorial demonstrates her mastery of light and composition. The natural lighting creates a warm, golden glow that seems to emanate from within each frame, while her careful attention to detail ensures that every element – from the model's pose to the fabric's drape – contributes to the overall story.</p>

      <p>This feature stands as a celebration of Italian culture and fashion, representing not just clothing, but a way of life that values beauty, craftsmanship, and the art of living well. It's a visual love letter to Italy and its enduring influence on global fashion.</p>
    `,
    images: [
      '/assets/images/gallery/editorial/editorial_002.jpg',
      '/assets/images/gallery/editorial/editorial_005.jpg',
      '/assets/images/gallery/editorial/editorial_006.jpg'
    ],
    tags: ['Italian Fashion', 'Vanity Fair', 'Editorial', 'Culture']
  },
  'my-siren': {
    slug: 'my-siren',
    title: 'My Siren',
    subtitle: 'Exploring feminine mystique and power',
    photographer: 'Angelin Michelle',
    publication: 'Independent',
    date: 'November 2023',
    coverImage: '/assets/images/gallery/editorial/editorial_003.jpg',
    content: `
      <p>"My Siren" explores the multifaceted nature of feminine power through the lens of Angelin Michelle. This striking editorial series delves into the mythology of the siren – not as a destroyer, but as a symbol of feminine strength, allure, and independence.</p>

      <p>The series challenges traditional narratives about female sexuality and power, presenting a modern interpretation of the siren myth. Michelle's photography captures moments of vulnerability and strength, often within the same frame, creating a complex portrait of contemporary femininity.</p>

      <p>The styling choices reflect this duality, with pieces that are both powerful and sensual. Flowing fabrics suggest movement and freedom, while structured elements speak to determination and control. The interplay between these elements creates a visual tension that mirrors the complexity of the siren archetype.</p>

      <p>Through her careful use of color, light, and composition, Michelle creates images that are both beautiful and thought-provoking. This editorial stands as a powerful statement about female agency and the right to be both beautiful and powerful, mysterious and direct.</p>
    `,
    images: [
      '/assets/images/gallery/editorial/editorial_003.jpg',
      '/assets/images/gallery/editorial/editorial_007.jpg',
      '/assets/images/gallery/editorial/editorial_008.jpg'
    ],
    tags: ['Feminine Power', 'Mythology', 'Editorial', 'Independence']
  },
  'sunset-of-fire': {
    slug: 'sunset-of-fire',
    title: 'The Sunset of Fire',
    subtitle: 'Passion captured in golden hour',
    photographer: 'Jaelefo & Barten',
    publication: 'MOMI Magazine',
    date: 'November 2023',
    coverImage: '/assets/images/gallery/editorial/editorial_004.jpg',
    content: `
      <p>"The Sunset of Fire" represents a masterful collaboration between photographers Jaelefo and Barten, capturing the raw intensity of passion through the golden lens of sunset photography. This editorial series explores themes of desire, intensity, and the fleeting nature of perfect moments.</p>

      <p>Shot during the golden hour across multiple sessions, this series makes dramatic use of natural lighting to create images that seem to burn with inner fire. The photographers' skill in working with challenging lighting conditions results in images that are both technically excellent and emotionally powerful.</p>

      <p>The fashion choices complement the dramatic lighting, with pieces in warm tones that echo the sunset palette. Fabrics catch and reflect the light, creating movement and texture that adds to the overall sense of energy and passion that permeates each image.</p>

      <p>This collaboration showcases the power of teamwork in photography, with both photographers bringing their unique perspectives to create something greater than the sum of its parts. The result is a series that captures not just fashion, but emotion and atmosphere in their purest forms.</p>
    `,
    images: [
      '/assets/images/gallery/editorial/editorial_004.jpg',
      '/assets/images/gallery/editorial/editorial_009.jpg',
      '/assets/images/gallery/editorial/editorial_010.jpg'
    ],
    tags: ['Collaboration', 'Golden Hour', 'Passion', 'Dramatic']
  }
};

const MagazineArticlePage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  const article = magazineArticles[slug as string];

  if (!article) {
    return (
      <Layout title="Article Not Found - MOMI Magazine">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-light mb-4">Article Not Found</h1>
            <Link href="/magazine">
              <button className="px-6 py-3 border border-black hover:bg-black hover:text-white transition-all duration-300">
                Browse Magazine
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={`${article.title} - MOMI Magazine`} 
      description={article.subtitle || article.title}
    >
      {/* Hero Section */}
      <section className="relative h-screen">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
        
        <div className="absolute bottom-20 left-6 md:left-12 lg:left-20 text-white max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-wider opacity-80 mb-2">{article.publication}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4">{article.title}</h1>
            {article.subtitle && (
              <p className="text-lg md:text-xl font-light opacity-90 mb-4">{article.subtitle}</p>
            )}
            <p className="text-sm font-light opacity-70">
              Photography by {article.photographer} • {article.date}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Article Meta */}
          <div className="mb-12 pb-8 border-b border-gray-200">
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-sm font-light"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm font-light opacity-60">
              <span>By {article.photographer}</span>
              <span>{article.date}</span>
            </div>
          </div>

          {/* Article Text */}
          <div 
            className="prose prose-lg max-w-none font-light leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>

      {/* Article Images */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-light mb-12 text-center">Featured Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {article.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative overflow-hidden bg-gray-200 aspect-[4/5]"
              >
                <img
                  src={image}
                  alt={`${article.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl font-light mb-12 text-center">Related Stories</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {Object.values(magazineArticles)
            .filter(a => a.slug !== article.slug)
            .slice(0, 3)
            .map((relatedArticle) => (
              <Link key={relatedArticle.slug} href={`/magazine/${relatedArticle.slug}`}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                    <img
                      src={relatedArticle.coverImage}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-light opacity-60 mb-1">{relatedArticle.date}</p>
                    <h3 className="text-xl font-light mb-2">{relatedArticle.title}</h3>
                    <p className="text-sm font-light opacity-70">{relatedArticle.photographer}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 px-6 md:px-12 lg:px-20 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/magazine">
            <button className="text-sm font-light underline hover:no-underline">
              ← All Stories
            </button>
          </Link>
          <div className="flex gap-4">
            <Link href="/gallery/editorial">
              <button className="px-6 py-2 border border-black hover:bg-black hover:text-white transition-all duration-300 text-sm">
                EDITORIAL GALLERY
              </button>
            </Link>
            <Link href="/photographers">
              <button className="px-6 py-2 bg-black text-white hover:bg-transparent hover:text-black hover:border hover:border-black transition-all duration-300 text-sm">
                PHOTOGRAPHERS
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(magazineArticles).map((slug) => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'magazine'])),
    },
  };
};

export default MagazineArticlePage;

