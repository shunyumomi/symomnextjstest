import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { 
  getRandomImages, 
  getFeaturedImages, 
  getCategoriesStats, 
  getImageUrl, 
  shuffleArray, 
  ImageData 
} from '../utils/imageUtils';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const HomePage: React.FC = () => {
  const { t } = useTranslation(['common', 'home']);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroImages, setHeroImages] = useState<ImageData[]>([]);
  const [randomGallery, setRandomGallery] = useState<ImageData[]>([]);
  const [categoryStats, setCategoryStats] = useState<any[]>([]);

  // 动态加载图片
  useEffect(() => {
    try {
      // 获取特色图片用于轮播
      const featuredImages = getFeaturedImages(undefined, 8);
      console.log('Featured images loaded:', featuredImages.length);
      if (featuredImages.length > 0) {
        setHeroImages(shuffleArray(featuredImages).slice(0, 5));
      } else {
        // 如果没有特色图片，使用普通图片
        const fallbackImages = getRandomImages(undefined, 5);
        setHeroImages(fallbackImages);
      }
      
      // 获取随机图片用于画廊展示
      const randomImages = getRandomImages(undefined, 20);
      setRandomGallery(randomImages);
      
      // 获取类别统计信息
      const stats = getCategoriesStats();
      setCategoryStats(stats);
    } catch (error) {
      console.error('Error loading images:', error);
      // 设置默认图片数据
      setHeroImages([]);
      setRandomGallery([]);
      setCategoryStats([]);
    }
  }, []);

  // Hero slides data with dynamic images
  const heroSlides = heroImages.map((image, index) => ({
    image: getImageUrl(image),
    title: getRandomTitle(index),
    subtitle: getRandomSubtitle(index),
    photographer: getRandomPhotographer(),
    link: getRandomLink(index)
  }));

  // 获取随机标题
  function getRandomTitle(index: number): string {
    const titles = [
      'OBSESSION N.2',
      'CINEMATIC STORIES', 
      'EDITORIAL SERIES',
      'PORTRAIT OF A LADY',
      'WEDDING TALES',
      'ARTISTIC VISION',
      'FASHION FORWARD',
      'TIMELESS MOMENTS'
    ];
    return titles[index] || titles[0];
  }

  // 获取随机副标题
  function getRandomSubtitle(index: number): string {
    const subtitles = [
      'Women in Canvas',
      'Through the Lens',
      'Dark Elegance', 
      'Timeless Fragrance Campaign',
      'Love in Every Frame',
      'Contemporary Art',
      'Modern Fashion',
      'Captured Beauty'
    ];
    return subtitles[index] || subtitles[0];
  }

  // 获取随机摄影师
  function getRandomPhotographer(): string {
    const photographers = [
      'Nicholas Fols',
      'Ramie PL', 
      'Studio Soyul',
      'Maley',
      'KIMHĒKIM',
      'Lespecs',
      'Muamu'
    ];
    return photographers[Math.floor(Math.random() * photographers.length)];
  }

  // 获取随机链接
  function getRandomLink(index: number): string {
    const links = [
      '/gallery/artistic',
      '/gallery/cinematic',
      '/gallery/editorial',
      '/gallery/portrait',
      '/gallery/wedding',
      '/gallery/fashion',
      '/photographers',
      '/collections'
    ];
    return links[index] || links[0];
  }

  // 动态特色收藏集
  const featuredCollections = categoryStats.slice(0, 6).map((category, index) => {
    // 修复链接逻辑
    let link = `/gallery`;
    if (category.id === 'photographers') {
      link = '/photographers';
    } else if (category.id === 'collections') {
      link = '/collections';
    } else if (['artistic', 'cinematic', 'editorial', 'fashion', 'portrait', 'wedding'].includes(category.id)) {
      link = `/gallery/${category.id}`;
    }
    
    return {
      id: category.id,
      title: `${category.name} Collection`,
      description: `Explore our ${category.name.toLowerCase()} portfolio - ${category.count} stunning images`,
      image: category.featured,
      link: link,
      count: category.count
    };
  });

  // 动态最新作品
  const latestEditorials = randomGallery.slice(0, 8).map((image, index) => ({
    id: index + 1,
    title: `${formatImageTitle(image.fileName)}`,
    photographer: getRandomPhotographer(),
    date: getRandomDate(),
    image: getImageUrl(image),
    link: `/gallery`
  }));

  // 格式化图片标题
  function formatImageTitle(fileName: string): string {
    return fileName
      .replace(/\.(jpg|jpeg|png|gif)$/i, '')
      .replace(/_/g, ' ')
      .replace(/^\w/, c => c.toUpperCase())
      .slice(0, 30);
  }

  // 获取随机日期
  function getRandomDate(): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const years = ['2023', '2024'];
    const month = months[Math.floor(Math.random() * months.length)];
    const year = years[Math.floor(Math.random() * years.length)];
    return `${month} ${year}`;
  }

  // 摄影师聚焦 - 使用真实数据
  const photographerSpotlight = [
    {
      name: 'Nicholas Fols',
      specialty: 'Fashion & Editorial',
      featured: categoryStats.find(c => c.id === 'photographers')?.count || 159,
      link: '/photographers'
    },
    {
      name: 'Ramie PL',
      specialty: 'Portrait & Artistic', 
      featured: categoryStats.find(c => c.id === 'portrait')?.count || 211,
      link: '/gallery/portrait'
    },
    {
      name: 'Studio Soyul',
      specialty: 'Wedding & Romance',
      featured: categoryStats.find(c => c.id === 'wedding')?.count || 155,
      link: '/gallery/wedding'
    },
    {
      name: 'Lespecs',
      specialty: 'Commercial Fashion',
      featured: categoryStats.find(c => c.id === 'fashion')?.count || 77,
      link: '/gallery/fashion'
    }
  ];

  return (
    <Layout title={t('home.title')} description={t('home.description')}>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {heroSlides.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active'
            }}
            navigation={true}
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
            className="h-full w-full"
          >
            {heroSlides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full">
                  <LazyLoadImage
                    src={slide.image} 
                    alt={slide.title}
                    effect="opacity"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Image failed to load:', slide.image);
                      // 设置默认图片或隐藏
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-20 left-6 md:left-12 lg:left-20 text-white z-10"
                  >
                    <p className="text-xs tracking-wider opacity-80 mb-2">{slide.photographer}</p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-2">{slide.title}</h1>
                    <p className="text-lg md:text-xl font-light opacity-90 mb-6">{slide.subtitle}</p>
                    <Link href={slide.link} className="inline-block">
                      <button className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300">
                        {t('home.explore')}
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // 备用显示内容
          <div className="relative h-full w-full bg-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4">MOMI</h1>
              <p className="text-lg md:text-xl font-light opacity-90 mb-6">Fashion Photography Platform</p>
              <Link href="/gallery" className="inline-block">
                <button className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300">
                  {t('home.explore')}
                </button>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4">{t('home.featuredCollections')}</h2>
          <p className="text-lg font-light opacity-70">{t('home.discoverSelections')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCollections.map((collection) => (
            <motion.div
              key={collection.id}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <Link href={collection.link}>
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                  <LazyLoadImage
                    src={collection.image} 
                    alt={collection.title}
                    effect="opacity"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-2 py-1 text-xs rounded">
                    {collection.count} works
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-light mb-2">{collection.title}</h3>
                  <p className="text-sm font-light opacity-70">{collection.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Latest Editorials */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 md:px-12 lg:px-20">
          <div className="flex justify-between items-center mb-12">
            <div>
            <h2 className="text-3xl md:text-4xl font-light mb-4">{t('home.latestEditorials')}</h2>
            <p className="text-lg font-light opacity-70">{t('home.storiesThroughLens')}</p>
            </div>
            <Link href="/magazine">
              <button className="hidden md:block px-6 py-2 border border-black hover:bg-black hover:text-white transition-all duration-300">
{t('home.viewAll')}
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestEditorials.map((editorial) => (
              <Link key={editorial.id} href={editorial.link}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden bg-gray-200 aspect-[4/5]">
                    <LazyLoadImage
                      src={editorial.image} 
                      alt={editorial.title}
                      effect="opacity"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-xs opacity-60 mb-1">{editorial.date}</p>
                    <h3 className="text-lg font-light mb-1">{editorial.title}</h3>
                    <p className="text-sm font-light opacity-70">{editorial.photographer}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Photographer Spotlight */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4">{t('home.photographerSpotlight')}</h2>
          <p className="text-lg font-light opacity-70">{t('home.mastersBehindLens')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {photographerSpotlight.map((photographer) => (
            <Link key={photographer.name} href={photographer.link}>
              <motion.div
                whileHover={{ x: 10 }}
                className="border-l-2 border-gray-200 pl-6 py-4 hover:border-black transition-colors duration-300"
              >
                <h3 className="text-xl font-light mb-2">{photographer.name}</h3>
                <p className="text-sm font-light opacity-70 mb-2">{photographer.specialty}</p>
                <p className="text-xs font-light opacity-50">{photographer.featured} works featured</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black text-white">
        <div className="px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-3xl md:text-5xl font-light mb-6">{t('home.joinCreativeJourney')}</h2>
          <p className="text-lg font-light opacity-80 mb-8 max-w-2xl mx-auto">
            {t('home.exploreIntersection')}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/newsletter">
              <button className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-all duration-300">
{t('home.subscribe')}
              </button>
            </Link>
            <Link href="/gallery">
              <button className="px-8 py-3 bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-300">
{t('home.exploreGallery')}
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
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'home'])),
    },
  };
};

export default HomePage;
