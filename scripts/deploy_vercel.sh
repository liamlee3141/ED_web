#!/bin/bash
# Vercel Deployment Script
# This script automates the Vercel deployment process

set -e  # Exit on any error

echo "🚀 Starting Vercel Deployment for Decoration Engineering Website"
echo "================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt "18" ]; then
    print_error "Node.js version 18 or higher is required. Current version: $(node --version)"
    exit 1
fi

print_status "Node.js version check passed: $(node --version)"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from your project root directory."
    exit 1
fi

print_status "Found package.json - in correct directory"

# Install dependencies
echo "📦 Installing dependencies..."
npm install
print_status "Dependencies installed successfully"

# Check if environment variables file exists
if [ ! -f ".env" ]; then
    print_warning "No .env file found. Creating template..."
    cat > .env << EOF
# Supabase Configuration (Required)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anonymous-key

# Optional: Analytics
VITE_GA_TRACKING_ID=GA_MEASUREMENT_ID

# Optional: Contact Configuration
VITE_CONTACT_EMAIL=contact@your-domain.com
EOF
    print_warning "Please edit .env file with your actual credentials before deploying"
    print_warning "Opening .env file for editing..."
    
    # Try to open with default editor
    if command -v code &> /dev/null; then
        code .env
    elif command -v nano &> /dev/null; then
        nano .env
    else
        print_warning "Please edit .env file manually with your Supabase credentials"
    fi
    
    read -p "Press Enter after updating .env file to continue..."
fi

print_status "Environment variables configuration ready"

# Test build locally
echo "🔨 Testing build process..."
npm run build
print_status "Build test successful"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
    print_status "Vercel CLI installed"
else
    print_status "Vercel CLI already installed"
fi

# Login to Vercel (if not already logged in)
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "Please log in to Vercel:"
    vercel login
else
    print_status "Already logged in to Vercel as: $(vercel whoami)"
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

print_status "Deployment completed successfully!"

# Get deployment URL
DEPLOY_URL=$(vercel ls | grep -E "https://.*\.vercel\.app" | head -1 | awk '{print $2}')
if [ -n "$DEPLOY_URL" ]; then
    echo "🌐 Your website is now live at: $DEPLOY_URL"
else
    echo "🌐 Your website has been deployed. Check your Vercel dashboard for the URL."
fi

echo ""
echo "================================================="
echo "🎉 Deployment Complete!"
echo "================================================="
echo ""
echo "Next Steps:"
echo "1. Visit your website and test all functionality"
echo "2. Test the contact form submission"
echo "3. Verify Chinese text displays correctly"
echo "4. Check mobile responsiveness"
echo "5. Set up custom domain (optional)"
echo ""
echo "Need help? Check the complete deployment guide:"
echo "docs/complete_deployment_guide.md"
echo ""

print_status "Happy deploying! 🚀"
