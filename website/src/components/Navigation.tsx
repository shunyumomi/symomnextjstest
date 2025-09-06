import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainMenuItems = [
    { href: '/', label: t('navigation.home') },
    { href: '/gallery', label: t('navigation.gallery') },
    { href: '/collections', label: t('navigation.collections') },
    { href: '/photographers', label: t('navigation.photographers') },
    { href: '/magazine', label: t('navigation.magazine') },
    { href: '/campaigns', label: t('navigation.campaigns') },
    { href: '/exhibitions', label: t('navigation.behindTheScenes') },
    { href: '/about', label: t('navigation.about') },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}>
        <div className="px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img 
                src="/assets/images/logo.png" 
                alt="MOMI" 
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {mainMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm tracking-wider transition-all duration-200 ${
                    router.pathname === item.href
                      ? 'font-medium border-b border-black'
                      : 'font-light hover:opacity-60'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Side Items */}
            <div className="flex items-center space-x-6">
              {/* Language Switcher */}
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`text-xs ${i18n.language === 'en' ? 'font-medium' : 'font-light opacity-60'}`}
                >
                  EN
                </button>
                <span className="text-xs opacity-30">|</span>
                <button
                  onClick={() => changeLanguage('ko')}
                  className={`text-xs ${i18n.language === 'ko' ? 'font-medium' : 'font-light opacity-60'}`}
                >
                  KO
                </button>
                <span className="text-xs opacity-30">|</span>
                <button
                  onClick={() => changeLanguage('zh')}
                  className={`text-xs ${i18n.language === 'zh' ? 'font-medium' : 'font-light opacity-60'}`}
                >
                  中
                </button>
              </div>

              {/* Search Icon */}
              <Link href="/search" className="p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2"
              >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 pt-24"
          >
            <div className="px-6 md:px-12">
              {mainMenuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-4 text-2xl font-light border-b border-gray-100"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-4 mt-8">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`text-lg ${i18n.language === 'en' ? 'font-medium' : 'font-light opacity-60'}`}
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage('ko')}
                  className={`text-lg ${i18n.language === 'ko' ? 'font-medium' : 'font-light opacity-60'}`}
                >
                  한국어
                </button>
                <button
                  onClick={() => changeLanguage('zh')}
                  className={`text-lg ${i18n.language === 'zh' ? 'font-medium' : 'font-light opacity-60'}`}
                >
                  中文
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

