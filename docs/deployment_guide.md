# Website Deployment Guide for Elegance Design Engineering

This guide provides comprehensive instructions for deploying your Modern Minimalist Decoration Engineering website to various hosting platforms and servers.

## Quick Deployment Summary

**Your Website Build:**
- React/TypeScript application with Vite build system
- Supabase backend integration for contact forms
- Optimized static files with dynamic functionality
- Chinese language interface with enhanced animations

## Deployment Options

### Option 1: Vercel (Recommended - Easy)

**Why Vercel:**
- Free tier available
- Automatic HTTPS
- Global CDN
- Perfect for React applications
- Easy domain connection

**Steps:**
1. **Sign up** at [vercel.com](https://vercel.com)
2. **Connect GitHub**: Import your project repository
3. **Deploy**: Vercel automatically detects React/Vite setup
4. **Environment Variables**: Add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
5. **Custom Domain**: Connect your domain in project settings

### Option 2: Netlify (Easy)

**Why Netlify:**
- Free tier with generous limits
- Easy drag-and-drop deployment
- Automatic HTTPS
- Form handling capabilities

**Steps:**
1. **Sign up** at [netlify.com](https://netlify.com)
2. **Drag & Drop**: Upload your `dist` folder after building
3. **Build Settings**: Configure build command `npm run build`
4. **Environment Variables**: Add Supabase credentials
5. **Domain**: Connect custom domain

### Option 3: Your Own VPS/Server (Advanced)

**Requirements:**
- Ubuntu 20.04+ or CentOS 7+
- Node.js 18+
- Nginx or Apache
- SSL certificate (Let's Encrypt recommended)

**Steps:**

#### 1. Server Preparation
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt install nginx -y

# Install PM2 (Process Manager)
sudo npm install -g pm2
```

#### 2. Upload Website Files
```bash
# Create website directory
sudo mkdir -p /var/www/your-website

# Upload your project files via SCP or Git
scp -r ./elegance-design-engineering/ user@your-server:/var/www/your-website/

# Or clone from Git
git clone your-repository-url /var/www/your-website
```

#### 3. Install Dependencies and Build
```bash
cd /var/www/your-website
npm install

# Set environment variables
echo "VITE_SUPABASE_URL=your_supabase_url" > .env
echo "VITE_SUPABASE_ANON_KEY=your_supabase_anon_key" >> .env

# Build the application
npm run build
```

#### 4. Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/your-website
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/your-website/dist;
    index index.html index.htm;

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optimize static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### 5. Enable Site and SSL
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/your-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Install SSL certificate
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Option 4: AWS S3 + CloudFront (Professional)

**Why AWS:**
- Global CDN performance
- Scalable and reliable
- Professional-grade infrastructure

**Steps:**
1. **Create S3 Bucket**: Enable static website hosting
2. **Upload Files**: Upload `dist` folder contents
3. **CloudFront**: Create distribution for CDN
4. **Route 53**: Configure DNS for custom domain
5. **SSL**: CloudFront provides free SSL certificates

## Environment Variables Setup

For any deployment, you'll need these Supabase environment variables:

```bash
# Your Supabase Project Settings
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anonymous-key
```

## Build Commands

**Local Build:**
```bash
npm install
npm run build
```

**Build Output:**
- Static files will be in the `dist/` folder
- Upload this folder to any static hosting service

## Domain Configuration

**DNS Settings:**
```
# For root domain
A     your-domain.com     → your-server-ip

# For www subdomain  
CNAME www.your-domain.com → your-domain.com
```

## Performance Optimization

**Recommended Settings:**
- Enable GZIP compression
- Set proper cache headers
- Use CDN for static assets
- Enable HTTP/2
- Optimize images (already done)

## Monitoring & Maintenance

**Recommended Tools:**
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Analytics**: Google Analytics (add to index.html)
- **Error Tracking**: Sentry
- **Performance**: Google PageSpeed Insights

## Troubleshooting

**Common Issues:**

1. **Blank Page**: Check browser console for errors, verify environment variables
2. **404 Errors**: Configure server for single-page application routing
3. **Contact Form Not Working**: Verify Supabase credentials and CORS settings
4. **Images Not Loading**: Check file paths and permissions

## Security Checklist

- ✅ HTTPS enabled
- ✅ Security headers configured
- ✅ Environment variables secured
- ✅ Supabase RLS (Row Level Security) enabled
- ✅ Regular security updates

## Support

If you encounter any deployment issues, the most common solution is to:
1. Verify environment variables are set correctly
2. Check that build process completed successfully
3. Ensure server has proper permissions
4. Test Supabase connection independently

Choose the deployment option that best fits your technical expertise and requirements!