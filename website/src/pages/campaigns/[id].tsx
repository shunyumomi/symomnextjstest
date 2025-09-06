import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';

interface CampaignData {
  id: string;
  title: string;
  brand: string;
  photographer: string;
  year: string;
  description: string;
  longDescription: string;
  coverImage: string;
  images: string[];
  category: string;
  credits: {
    photographer: string;
    artDirector?: string;
    stylist?: string;
    model?: string;
    location?: string;
  };
}

const campaignData: { [key: string]: CampaignData } = {
  'portrait-of-a-lady': {
    id: 'portrait-of-a-lady',
    title: 'Portrait of a Lady',
    brand: 'Frederic Malle',
    photographer: 'Various Artists',
    year: '2024',
    description: 'Timeless elegance captured in a sophisticated fragrance campaign',
    longDescription: 'Portrait of a Lady represents the epitome of sophisticated fragrance marketing, capturing the essence of timeless elegance through carefully crafted visual storytelling. This campaign celebrates the modern woman who embodies both strength and grace, sophistication and approachability. Each image tells a story of confidence and allure, perfectly complementing the complex and nuanced fragrance it represents.',
    coverImage: '/assets/images/featured/featured_004.jpg',
    images: [
      '/assets/images/gallery/portrait/portrait_001.jpg',
      '/assets/images/gallery/portrait/portrait_002.jpg',
      '/assets/images/gallery/portrait/portrait_003.jpg',
      '/assets/images/gallery/portrait/portrait_004.jpg'
    ],
    category: 'Fragrance',
    credits: {
      photographer: 'Various Artists',
      artDirector: 'MOMI Creative',
      stylist: 'Fashion Collective',
      model: 'International Models',
      location: 'Studio & Location'
    }
  },
  'obsession-campaign': {
    id: 'obsession-campaign',
    title: 'OBSESSION N.2 Campaign',
    brand: 'KIMHĒKIM',
    photographer: 'KIMHĒKIM Studio',
    year: '2024',
    description: 'Women in Canvas - An artistic exploration of feminine power',
    longDescription: 'OBSESSION N.2 blurs the lines between fashion and fine art, creating a powerful visual narrative that celebrates feminine strength and artistic expression. This campaign challenges traditional beauty standards while creating images of striking visual impact. Each frame is carefully composed to tell a story of empowerment, creativity, and the intersection of fashion with contemporary art.',
    coverImage: '/assets/images/featured/featured_001.jpg',
    images: [
      '/assets/images/gallery/editorial/editorial_001.jpg',
      '/assets/images/gallery/editorial/editorial_002.jpg',
      '/assets/images/gallery/editorial/editorial_003.jpg',
      '/assets/images/gallery/artistic/artistic_001.jpg'
    ],
    category: 'Fashion',
    credits: {
      photographer: 'KIMHĒKIM Studio',
      artDirector: 'KIMHĒKIM',
      stylist: 'KIMHĒKIM Design Team',
      model: 'Contemporary Artists',
      location: 'Art Studio'
    }
  }
};

const CampaignDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const campaign = campaignData[id as string];

  if (!campaign) {
    return (
      <Layout title="Campaign Not Found - MOMI">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-light mb-4">Campaign Not Found</h1>
            <Link href="/campaigns">
              <button className="px-6 py-3 border border-black hover:bg-black hover:text-white transition-all duration-300">
                Browse All Campaigns
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={`${campaign.title} - ${campaign.brand} - MOMI`} 
      description={campaign.description}
    >
      {/* Hero Section */}
      <section className="relative h-screen">
        <img
          src={campaign.coverImage}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
        
        <div className="absolute bottom-20 left-6 md:left-12 lg:left-20 text-white max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-wider opacity-80 mb-2">{campaign.brand} • {campaign.year}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4">{campaign.title}</h1>
            <p className="text-lg md:text-xl font-light opacity-90 mb-6">{campaign.description}</p>
            <p className="text-sm font-light opacity-70">Photography by {campaign.photographer}</p>
          </motion.div>
        </div>
      </section>

      {/* Campaign Overview */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-light mb-6">Campaign Overview</h2>
            <p className="text-base font-light leading-relaxed opacity-80 mb-8">
              {campaign.longDescription}
            </p>
            
            {/* Campaign Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-light opacity-60 mb-1">Brand</p>
                <p className="text-lg font-light">{campaign.brand}</p>
              </div>
              <div>
                <p className="text-sm font-light opacity-60 mb-1">Category</p>
                <p className="text-lg font-light">{campaign.category}</p>
              </div>
              <div>
                <p className="text-sm font-light opacity-60 mb-1">Year</p>
                <p className="text-lg font-light">{campaign.year}</p>
              </div>
              <div>
                <p className="text-sm font-light opacity-60 mb-1">Images</p>
                <p className="text-lg font-light">{campaign.images.length}</p>
              </div>
            </div>
          </div>
          
          {/* Credits */}
          <div>
            <h2 className="text-3xl font-light mb-6">Credits</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-light opacity-60 mb-1">Photographer</p>
                <p className="text-base font-light">{campaign.credits.photographer}</p>
              </div>
              {campaign.credits.artDirector && (
                <div>
                  <p className="text-sm font-light opacity-60 mb-1">Art Director</p>
                  <p className="text-base font-light">{campaign.credits.artDirector}</p>
                </div>
              )}
              {campaign.credits.stylist && (
                <div>
                  <p className="text-sm font-light opacity-60 mb-1">Stylist</p>
                  <p className="text-base font-light">{campaign.credits.stylist}</p>
                </div>
              )}
              {campaign.credits.model && (
                <div>
                  <p className="text-sm font-light opacity-60 mb-1">Models</p>
                  <p className="text-base font-light">{campaign.credits.model}</p>
                </div>
              )}
              {campaign.credits.location && (
                <div>
                  <p className="text-sm font-light opacity-60 mb-1">Location</p>
                  <p className="text-base font-light">{campaign.credits.location}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Images */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-light mb-12">Campaign Images</h2>
          <div className="space-y-12">
            {campaign.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src={image}
                  alt={`${campaign.title} - Image ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Campaigns */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl font-light mb-12 text-center">Related Campaigns</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {Object.values(campaignData)
            .filter(c => c.id !== campaign.id)
            .map((relatedCampaign) => (
              <Link key={relatedCampaign.id} href={`/campaigns/${relatedCampaign.id}`}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
                    <img
                      src={relatedCampaign.coverImage}
                      alt={relatedCampaign.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-light mb-1">{relatedCampaign.title}</h3>
                    <p className="text-sm font-light opacity-60">{relatedCampaign.brand} • {relatedCampaign.year}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 px-6 md:px-12 lg:px-20 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/campaigns">
            <button className="text-sm font-light underline hover:no-underline">
              ← All Campaigns
            </button>
          </Link>
          <div className="flex gap-4">
            <Link href="/contact">
              <button className="px-6 py-2 border border-black hover:bg-black hover:text-white transition-all duration-300 text-sm">
                INQUIRE
              </button>
            </Link>
            <Link href="/gallery">
              <button className="px-6 py-2 bg-black text-white hover:bg-transparent hover:text-black hover:border hover:border-black transition-all duration-300 text-sm">
                GALLERY
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(campaignData).map((id) => ({
    params: { id }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'campaigns'])),
    },
  };
};

export default CampaignDetailPage;

