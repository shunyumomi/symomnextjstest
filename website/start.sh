#!/bin/bash

# MOMI Fashion Website Startup Script
# This script helps you quickly set up and run the website

echo "================================================"
echo "          MOMI FASHION WEBSITE SETUP           "
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm is installed: $(npm -v)"
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    echo "This may take a few minutes..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

echo ""

# Check if images are organized
if [ ! -d "public/assets/images/featured" ]; then
    echo "🖼  Organizing images..."
    echo "Note: If this fails, manually copy images from /web/eg/ to /public/assets/images/"
    node scripts/organize-images.js 2>/dev/null || echo "⚠️  Image organization failed - please organize manually"
else
    echo "✅ Images already organized"
fi

echo ""

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOL
# MOMI Fashion Website Environment Variables
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api
EOL
    echo "✅ .env.local created"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "================================================"
echo "              STARTING DEVELOPMENT SERVER        "
echo "================================================"
echo ""
echo "🚀 Starting the development server..."
echo "🌐 Open http://localhost:3000 in your browser"
echo ""
echo "Press Ctrl+C to stop the server"
echo "================================================"
echo ""

# Start the development server
npm run dev




