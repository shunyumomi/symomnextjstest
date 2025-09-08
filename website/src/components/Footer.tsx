import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation('common');
  
  const footerSections = [
    {
      title: t('footer.explore'),
      links: [
        { href: '/gallery/fashion', label: t('gallery.fashion') },
        { href: '/gallery/editorial', label: t('gallery.editorial') },
        { href: '/gallery/cinematic', label: t('gallery.cinematic') },
        { href: '/gallery/portrait', label: t('gallery.portrait') },
        { href: '/gallery/wedding', label: t('gallery.wedding') },
        { href: '/gallery/artistic', label: t('gallery.artistic') },
      ]
    },
    {
      title: t('navigation.photographers'),
      links: [
        { href: '/photographers/nicholas-fols', label: 'Nicholas Fols' },
        { href: '/photographers/ramie-pl', label: 'Ramie Pl' },
        { href: '/photographers/soyul', label: 'Soyul' },
        { href: '/photographers/eui', label: 'Eui' },
        { href: '/photographers/maley', label: 'Maley' },
        { href: '/photographers/lespecs', label: 'Lespecs' },
      ]
    },
    {
      title: t('navigation.collections'),
      links: [
        { href: '/collections/ss24', label: 'Spring/Summer 2024' },
        { href: '/collections/fw23', label: 'Fall/Winter 2023' },
        { href: '/collections/couture', label: 'Couture' },
        { href: '/collections/bridal', label: 'Bridal' },
        { href: '/collections/archive', label: 'Archive' },
      ]
    },
    {
      title: t('footer.connect'),
      links: [
        { href: '/contact', label: t('navigation.contact') },
        { href: '/newsletter', label: 'Newsletter' },
        { href: '/press', label: 'Press' },
        { href: '/careers', label: 'Careers' },
        { href: '/partners', label: 'Partners' },
      ]
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="px-6 md:px-12 lg:px-20 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-medium tracking-wider mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-sm font-light opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-200 pt-12 mb-12">
          <div className="max-w-md">
            <h3 className="text-lg font-light mb-4">{t('footer.newsletter')}</h3>
            <p className="text-sm font-light opacity-70 mb-6">
              Subscribe to our newsletter for exclusive content, behind-the-scenes access, and early previews.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')!}
                className="flex-grow px-4 py-2 border border-gray-300 text-sm font-light focus:outline-none focus:border-black transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white text-sm font-light hover:bg-gray-800 transition-colors"
              >
{t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <Link href="/privacy" className="text-xs font-light opacity-60 hover:opacity-100">
              {t('footer.privacyPolicy')}
            </Link>
            <Link href="/terms" className="text-xs font-light opacity-60 hover:opacity-100">
              {t('footer.termsOfService')}
            </Link>
            <Link href="/cookies" className="text-xs font-light opacity-60 hover:opacity-100">
              {t('footer.cookiePolicy')}
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Social Media Icons */}
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
              </svg>
            </a>
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8">
          <p className="text-xs font-light opacity-60">
            © 2024 MOMI. {t('footer.allRightsReserved')}
          </p>
          <p className="text-xs font-light opacity-40 mt-2">
            <a 
              href="http://www.momi.org.cn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity"
            >
              Chinese official website
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

