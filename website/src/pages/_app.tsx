import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { AnimatePresence, motion } from 'framer-motion';
import { appWithTranslation } from 'next-i18next';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    // Initialize any global settings
    document.documentElement.lang = 'en';
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );
}

export default appWithTranslation(MyApp);

