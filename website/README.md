# MOMI Fashion Platform

A minimalist fashion platform showcasing curated collections, editorials, and artistic photography.

## 🌟 Features

- **50+ Pages**: Complete fashion website with extensive content
- **Multi-language Support**: English, Korean, and Chinese (ready for expansion)
- **Responsive Design**: Optimized for all devices
- **Image Gallery**: Multiple categories (Fashion, Editorial, Cinematic, Portrait, Wedding, Artistic)
- **Photographer Portfolios**: 10+ individual photographer pages
- **Magazine Section**: Editorial articles and fashion stories
- **Collections**: Seasonal and special collections showcase
- **Behind The Scenes**: Exclusive BTS content
- **Advanced Search**: Filter by type, tags, and categories
- **Minimalist Design**: Black and white aesthetic with clean typography

## 📁 Project Structure

```
website/
├── public/
│   ├── assets/
│   │   └── images/          # All image assets organized by category
│   └── locales/            # Translation files (en, ko, zh)
├── src/
│   ├── components/         # Reusable React components
│   ├── pages/             # Next.js pages (50+ pages)
│   │   ├── gallery/       # Gallery subcategories
│   │   ├── photographers/ # Individual photographer pages
│   │   ├── collections/   # Collection detail pages
│   │   ├── magazine/      # Magazine articles
│   │   └── ...           # Other pages
│   ├── styles/           # Global styles and CSS
│   ├── utils/           # Utility functions
│   └── data/           # Data configurations
└── scripts/           # Build and utility scripts
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd /Users/chuksy/Desktop/momifashion/website
```

2. Install dependencies:
```bash
npm install
```

3. Organize images (first time only):
```bash
npm run organize-images
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📄 Pages Overview

### Main Sections
- **Home** - Hero carousel, featured collections, latest editorials
- **Gallery** - 6 categories with grid/list views and lightbox
- **Photographers** - 10+ photographer portfolios
- **Collections** - 8+ seasonal collections
- **Magazine** - 10+ editorial articles
- **Campaigns** - 5+ campaign showcases
- **Behind The Scenes** - BTS content with galleries
- **Search** - Advanced search with filters

### Additional Pages
- About
- Contact
- Newsletter
- Press
- Careers
- Partners
- Exhibitions
- Privacy Policy
- Terms of Service
- Cookie Policy

## 🎨 Design System

### Colors
- Primary: Black (#000000)
- Secondary: White (#FFFFFF)
- Grays: Various shades for subtle contrasts

### Typography
- Headlines: Light weight, large sizes
- Body: Light weight, readable sizes
- Minimal font variations for consistency

### Components
- Responsive navigation with mobile menu
- Image galleries with lazy loading
- Modal lightboxes
- Masonry grids
- Carousel/slider components
- Search filters
- Newsletter signup forms

## 🌍 Internationalization

The website supports multiple languages:
- **English** (default)
- **Korean** (한국어)
- **Chinese** (中文)

Language files are located in `/public/locales/` and can be easily extended.

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### API Integration

The website is ready for API integration:
- Search functionality
- Newsletter subscriptions
- Contact forms
- Dynamic content loading

## 📱 Responsive Design

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+
- Large screens: 1440px+

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy

### Other Platforms

The website can be deployed to:
- Netlify
- AWS Amplify
- Google Cloud
- Any Node.js hosting

## 📊 Performance

- Lazy loading images
- Optimized bundles
- Static generation where possible
- Image optimization with Next.js

## 🛠 Technologies

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Carousel**: Swiper
- **Images**: Lazy loading with effects
- **i18n**: next-i18next
- **Icons**: React Icons

## 📝 Content Management

Images are organized in:
- `/public/assets/images/featured/`
- `/public/assets/images/gallery/`
- `/public/assets/images/photographers/`
- `/public/assets/images/collections/`
- `/public/assets/images/campaigns/`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

© 2024 MOMI. All rights reserved.

## 📞 Contact

For inquiries about the platform:
- Email: info@symomi.cn
- Website: https://symomi.cn

---

Built with ❤️ for fashion and minimalism

