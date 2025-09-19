# The Complete Website Deployment Guide
## Modern Minimalist Decoration Engineering Website

---

# Table of Contents

1. [Overview & Prerequisites](#overview--prerequisites)
2. [Deployment Options Comparison](#deployment-options-comparison)
3. [Method 1: Vercel Deployment (Recommended)](#method-1-vercel-deployment-recommended)
4. [Method 2: Netlify Deployment](#method-2-netlify-deployment)
5. [Method 3: VPS/Server Deployment](#method-3-vpsserver-deployment)
6. [Method 4: AWS CloudFront + S3](#method-4-aws-cloudfront--s3)
7. [Method 5: Docker Deployment](#method-5-docker-deployment)
8. [Environment Variables & Security](#environment-variables--security)
9. [Domain Setup & SSL Configuration](#domain-setup--ssl-configuration)
10. [Performance Optimization](#performance-optimization)
11. [Monitoring & Analytics](#monitoring--analytics)
12. [Backup & Recovery](#backup--recovery)
13. [Troubleshooting Guide](#troubleshooting-guide)
14. [Maintenance & Updates](#maintenance--updates)
15. [Cost Analysis](#cost-analysis)

---

# Overview & Prerequisites

## What You're Deploying

**Your Website Features:**
- ✅ React/TypeScript application with Vite build system
- ✅ Modern minimalist design with premium aesthetics
- ✅ Chinese language interface
- ✅ Enhanced animations and dynamic effects
- ✅ Supabase backend integration for contact forms
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Optimized images and performance

## Prerequisites Checklist

### Required Items
- [ ] **Domain Name**: Purchased and ready (e.g., yourdomain.com)
- [ ] **Supabase Account**: With project credentials ready
- [ ] **Website Source Code**: Downloaded from the workspace
- [ ] **Hosting Account**: Choose from the options below

### Technical Requirements
- [ ] **Node.js 18+**: For local building and testing
- [ ] **Git**: For version control (recommended)
- [ ] **SSH Access**: If using VPS deployment
- [ ] **Basic Terminal Knowledge**: For command-line operations

### Recommended Tools
- [ ] **VS Code**: For code editing
- [ ] **FileZilla**: For FTP uploads (if needed)
- [ ] **PuTTY**: For SSH (Windows users)

---

# Deployment Options Comparison

| Platform | Best For | Difficulty | Time | Cost | Performance | Scalability |
|----------|----------|------------|------|------|-------------|-------------|
| **Vercel** | Beginners | ⭐ Easy | 15 min | Free-$20/mo | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Netlify** | Static Sites | ⭐ Easy | 20 min | Free-$19/mo | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **VPS** | Full Control | ⭐⭐⭐ Hard | 60 min | $5-50/mo | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **AWS** | Enterprise | ⭐⭐⭐⭐ Expert | 90 min | $10-100/mo | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Docker** | DevOps | ⭐⭐⭐ Hard | 45 min | $10-30/mo | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**Recommendation: Start with Vercel for easiest deployment, then migrate to VPS later if needed.**

---

# Method 1: Vercel Deployment (Recommended)

## Why Vercel?
- 🚀 **Zero-config deployment** for React applications
- 🌍 **Global CDN** with 100+ edge locations
- 🔒 **Automatic HTTPS** with free SSL certificates
- 📱 **Perfect performance** on mobile devices
- 💰 **Generous free tier** (100GB bandwidth/month)

## Step-by-Step Guide

### Step 1: Prepare Your Code (5 minutes)

```bash
# 1. Download your website source code
# (You should have this from the development phase)

# 2. Navigate to your project directory
cd path/to/elegance-design-engineering

# 3. Install dependencies
npm install

# 4. Test build locally
npm run build

# 5. Test locally (optional)
npm run preview
```

### Step 2: Create Vercel Account (3 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub, GitLab, or Bitbucket (recommended)
3. Verify your email address

### Step 3: Deploy Your Website (5 minutes)

**Option A: Git Repository (Recommended)**

1. **Push to GitHub:**
   ```bash
   # Initialize Git repository
   git init
   git add .
   git commit -m "Initial commit"
   
   # Create GitHub repository and push
   git remote add origin https://github.com/yourusername/your-repo.git
   git branch -M main
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to Vercel dashboard
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy"

**Option B: Direct Upload**

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   # Follow the prompts
   ```

### Step 4: Configure Environment Variables (3 minutes)

1. Go to your project dashboard in Vercel
2. Click "Settings" → "Environment Variables"
3. Add the following variables:

```
VITE_SUPABASE_URL = https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY = your-anonymous-key
```

4. **Redeploy** to apply changes

### Step 5: Custom Domain Setup (Optional, 10 minutes)

1. **In Vercel Dashboard:**
   - Go to your project → "Settings" → "Domains"
   - Add your custom domain
   - Copy the DNS records provided

2. **In Your Domain Provider:**
   - Add DNS records as instructed
   - Wait for propagation (5 minutes - 24 hours)

### Step 6: Verification

**Test these features:**
- [ ] Homepage loads with background image
- [ ] Navigation works on all pages
- [ ] Contact form submits successfully
- [ ] Chinese text displays correctly
- [ ] Animations work smoothly
- [ ] Mobile responsiveness
- [ ] HTTPS is working

**Your website is now live! 🎉**

---

# Method 2: Netlify Deployment

## Why Netlify?
- 🎯 **Excellent for static sites**
- 📝 **Built-in form handling**
- 🔄 **Continuous deployment**
- 💰 **Free tier with good limits**

## Quick Deployment Steps

### Step 1: Build Your Site
```bash
npm run build
# This creates a 'dist' folder
```

### Step 2: Deploy to Netlify

**Option A: Drag & Drop (Fastest)**
1. Go to [netlify.com](https://netlify.com)
2. Drag your `dist` folder to the deploy area
3. Your site is live instantly!

**Option B: Git Integration**
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

### Step 3: Environment Variables
1. Site Settings → Environment Variables
2. Add your Supabase credentials
3. Trigger new deploy

### Step 4: Custom Domain
1. Domain Settings → Add custom domain
2. Configure DNS records
3. Enable HTTPS (automatic)

---

# Method 3: VPS/Server Deployment

## When to Choose VPS?
- 🔧 **Full server control**
- 🔒 **Enhanced security customization**
- 📊 **Custom analytics and logging**
- 💾 **Direct database access**

## Server Requirements

**Minimum Specifications:**
- **OS**: Ubuntu 20.04 LTS or CentOS 7+
- **CPU**: 2 cores, 2.4GHz+
- **RAM**: 2GB (4GB recommended)
- **Storage**: 20GB SSD
- **Bandwidth**: 1TB/month

**Recommended VPS Providers:**
- **DigitalOcean**: $5-10/month droplets
- **Linode**: $5-20/month instances  
- **Vultr**: $3.50-10/month servers
- **AWS EC2**: $5-50/month (variable)

## Complete VPS Setup Guide

### Step 1: Server Preparation (15 minutes)

```bash
# Connect to your server
ssh root@your-server-ip

# Update system packages
apt update && apt upgrade -y

# Create a non-root user
adduser webuser
usermod -aG sudo webuser

# Switch to the new user
su - webuser
```

### Step 2: Install Required Software (10 minutes)

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt install nginx -y

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Git
sudo apt install git -y

# Install SSL certificate tool
sudo apt install certbot python3-certbot-nginx -y
```

### Step 3: Deploy Website Files (10 minutes)

```bash
# Create website directory
sudo mkdir -p /var/www/your-domain.com
sudo chown -R webuser:webuser /var/www/your-domain.com

# Clone your repository (or upload files)
git clone https://github.com/yourusername/your-repo.git /var/www/your-domain.com

# Navigate to project directory
cd /var/www/your-domain.com

# Install dependencies
npm install

# Create environment file
echo "VITE_SUPABASE_URL=https://your-project-id.supabase.co" > .env
echo "VITE_SUPABASE_ANON_KEY=your-anonymous-key" >> .env

# Build the application
npm run build
```

### Step 4: Configure Nginx (10 minutes)

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/your-domain.com
```

**Nginx Configuration File:**
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/your-domain.com/dist;
    index index.html index.htm;

    # Handle single-page application routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optimize static asset delivery
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary Accept-Encoding;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
}
```

**Enable the site:**
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/your-domain.com /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx
```

### Step 5: SSL Certificate Setup (5 minutes)

```bash
# Install SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

### Step 6: Firewall Configuration (5 minutes)

```bash
# Configure UFW firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Check firewall status
sudo ufw status
```

### Step 7: Create Deployment Script

```bash
# Create update script
nano /var/www/your-domain.com/deploy.sh
```

**Deployment Script:**
```bash
#!/bin/bash
# Website deployment script

echo "Starting deployment..."

# Navigate to project directory
cd /var/www/your-domain.com

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Build the application
npm run build

# Restart Nginx (if needed)
sudo systemctl reload nginx

echo "Deployment completed successfully!"
```

```bash
# Make script executable
chmod +x /var/www/your-domain.com/deploy.sh
```

---

# Method 4: AWS CloudFront + S3

## When to Use AWS?
- 🏢 **Enterprise-level requirements**
- 🌍 **Global audience**
- 📈 **High traffic expectations**
- 🔗 **Integration with other AWS services**

## AWS Deployment Steps

### Step 1: Create S3 Bucket

1. **AWS Console → S3**
2. **Create bucket** with your domain name
3. **Enable static website hosting**
4. **Upload your `dist` folder contents**
5. **Set bucket policy for public access**

**S3 Bucket Policy:**
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

### Step 2: Create CloudFront Distribution

1. **CloudFront → Create Distribution**
2. **Origin Domain**: Your S3 bucket
3. **Default Root Object**: `index.html`
4. **Error Pages**: Configure SPA routing
5. **SSL Certificate**: Request/import certificate

### Step 3: Configure Route 53 (DNS)

1. **Route 53 → Hosted Zone**
2. **Create A record** pointing to CloudFront
3. **Configure www subdomain**

### Step 4: Environment Variables

For AWS deployment, build with environment variables:
```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co VITE_SUPABASE_ANON_KEY=your-key npm run build
```

---

# Method 5: Docker Deployment

## Docker Benefits
- 🐳 **Consistent environments**
- 📦 **Easy scaling**
- 🔄 **Simple updates**
- ☁️ **Cloud-agnostic**

## Docker Setup

### Step 1: Create Dockerfile

```dockerfile
# Multi-stage build for production
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Step 2: Create nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        # Handle SPA routing
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### Step 3: Docker Compose

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
    restart: unless-stopped
```

### Step 4: Deploy with Docker

```bash
# Build and run
docker-compose up --build -d

# View logs
docker-compose logs -f

# Update deployment
git pull
docker-compose up --build -d
```

---

# Environment Variables & Security

## Required Environment Variables

```bash
# Supabase Configuration (Required)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anonymous-key

# Optional: Analytics
VITE_GA_TRACKING_ID=GA_MEASUREMENT_ID

# Optional: Contact Configuration
VITE_CONTACT_EMAIL=contact@your-domain.com
```

## Security Best Practices

### 1. Supabase Security

```sql
-- Enable Row Level Security (RLS)
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy for public inserts
CREATE POLICY "Allow public inserts" ON contact_inquiries
    FOR INSERT WITH CHECK (true);

-- Create policy to prevent public reads
CREATE POLICY "No public reads" ON contact_inquiries
    FOR SELECT USING (false);
```

### 2. Server Security (VPS)

```bash
# Regular security updates
sudo apt update && sudo apt upgrade -y

# Configure fail2ban (prevents brute force)
sudo apt install fail2ban -y
sudo systemctl enable fail2ban

# SSH hardening
sudo nano /etc/ssh/sshd_config
# Add: PermitRootLogin no
# Add: PasswordAuthentication no
sudo systemctl restart sshd

# Enable automatic security updates
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades
```

### 3. Content Security Policy (CSP)

Add to your `index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' 'unsafe-eval' *.supabase.co;
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: blob: *.supabase.co;
               connect-src 'self' *.supabase.co;
               font-src 'self' data:;">
```

---

# Domain Setup & SSL Configuration

## DNS Configuration

### For Root Domain (your-domain.com)

```
# DNS Records
Type    Name    Value                    TTL
A       @       your-server-ip          300
A       www     your-server-ip          300
CNAME   www     your-domain.com         300
```

### For Subdomains

```
# Optional: Create staging subdomain
Type    Name      Value                    TTL
CNAME   staging   your-domain.com         300
```

## SSL Certificate Management

### Let's Encrypt (Free)

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal setup
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Commercial SSL Certificate

1. **Purchase SSL certificate**
2. **Generate CSR** (Certificate Signing Request)
3. **Upload certificate files**
4. **Configure in Nginx/Apache**

**Nginx SSL Configuration:**
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # SSL optimization
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
    
    # Modern configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # HSTS (optional)
    add_header Strict-Transport-Security "max-age=63072000" always;
    
    # Your site configuration here...
}

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

---

# Performance Optimization

## Frontend Optimizations (Already Implemented)

- ✅ **Image optimization** (WebP format, lazy loading)
- ✅ **Code splitting** (Vite automatic)
- ✅ **Tree shaking** (Remove unused code)
- ✅ **Minification** (CSS, JS, HTML)
- ✅ **Gzip compression** (Server-side)

## Server-Side Optimizations

### 1. Nginx Performance Tuning

```nginx
# Add to nginx.conf
worker_processes auto;
worker_connections 1024;
keepalive_timeout 65;
client_max_body_size 10M;

# Enable gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_proxied any;
gzip_comp_level 6;
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/javascript
    application/xml+rss
    application/json;
```

### 2. Caching Strategy

```nginx
# Static assets (1 year)
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML files (short cache)
location ~* \.html$ {
    expires 1h;
    add_header Cache-Control "public";
}
```

### 3. CDN Integration

**Popular CDN Options:**
- **Cloudflare**: Free tier with good features
- **Amazon CloudFront**: Enterprise-level performance  
- **KeyCDN**: Pay-as-you-go pricing
- **BunnyCDN**: Cost-effective option

**Cloudflare Setup:**
1. Sign up at cloudflare.com
2. Add your domain
3. Update nameservers
4. Enable caching and optimization features

## Performance Monitoring

### Tools to Use

1. **Google PageSpeed Insights**
   - Test URL: https://pagespeed.web.dev/
   - Target: 90+ score

2. **GTmetrix**
   - Test URL: https://gtmetrix.com/
   - Monitor loading times

3. **Lighthouse** (Built into Chrome DevTools)
   - Performance audits
   - Accessibility checks
   - SEO analysis

### Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Total Blocking Time**: < 300ms

---

# Monitoring & Analytics

## Website Analytics

### 1. Google Analytics 4 Setup

```html
<!-- Add to index.html <head> section -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Google Search Console

1. **Verify ownership** of your domain
2. **Submit sitemap**: https://your-domain.com/sitemap.xml
3. **Monitor search performance**

### 3. Uptime Monitoring

**Recommended Services:**
- **UptimeRobot**: Free monitoring (5-min intervals)
- **Pingdom**: Professional monitoring
- **StatusCake**: Free tier available
- **Site24x7**: Comprehensive monitoring

**UptimeRobot Setup:**
1. Create account at uptimerobot.com
2. Add HTTP(s) monitor for your domain
3. Set up email/SMS alerts
4. Configure 5-minute check intervals

## Server Monitoring (VPS)

### 1. Basic Monitoring Script

```bash
#!/bin/bash
# Create: /home/webuser/monitor.sh

LOGFILE="/var/log/website-monitor.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Check disk space
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | cut -d'%' -f1)
if [ $DISK_USAGE -gt 80 ]; then
    echo "$DATE - WARNING: Disk usage is ${DISK_USAGE}%" >> $LOGFILE
fi

# Check memory usage
MEM_USAGE=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')
if [ $MEM_USAGE -gt 80 ]; then
    echo "$DATE - WARNING: Memory usage is ${MEM_USAGE}%" >> $LOGFILE
fi

# Check if Nginx is running
if ! systemctl is-active --quiet nginx; then
    echo "$DATE - ERROR: Nginx is not running" >> $LOGFILE
    systemctl start nginx
fi

# Check website response
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://your-domain.com)
if [ $RESPONSE -ne 200 ]; then
    echo "$DATE - ERROR: Website returned HTTP $RESPONSE" >> $LOGFILE
fi
```

```bash
# Make executable and add to cron
chmod +x /home/webuser/monitor.sh
crontab -e
# Add: */5 * * * * /home/webuser/monitor.sh
```

### 2. Log Monitoring

```bash
# View Nginx access logs
sudo tail -f /var/log/nginx/access.log

# View Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Monitor system logs
sudo journalctl -f
```

---

# Backup & Recovery

## Backup Strategy

### 1. Source Code Backup

```bash
# Git repository (primary backup)
git add .
git commit -m "Website update"
git push origin main

# Create local backup
tar -czf website-backup-$(date +%Y%m%d).tar.gz /var/www/your-domain.com/
```

### 2. Database Backup (Supabase)

**Automated Supabase Backup:**
- Supabase provides automatic daily backups
- Access via Dashboard → Settings → Database → Backups

**Manual Backup:**
```bash
# Using pg_dump (if you have direct access)
pg_dump "postgresql://user:pass@host:port/dbname" > backup.sql
```

### 3. Server Configuration Backup

```bash
#!/bin/bash
# Create: /home/webuser/backup-config.sh

BACKUP_DIR="/home/webuser/backups/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

# Backup Nginx configuration
sudo cp -r /etc/nginx/ $BACKUP_DIR/nginx/

# Backup SSL certificates
sudo cp -r /etc/letsencrypt/ $BACKUP_DIR/ssl/

# Backup environment variables
cp /var/www/your-domain.com/.env $BACKUP_DIR/

# Create archive
tar -czf $BACKUP_DIR.tar.gz $BACKUP_DIR/
rm -rf $BACKUP_DIR/

echo "Backup completed: $BACKUP_DIR.tar.gz"
```

### 4. Automated Backup Schedule

```bash
# Add to cron
crontab -e

# Daily backup at 2 AM
0 2 * * * /home/webuser/backup-config.sh

# Weekly cleanup (remove backups older than 30 days)
0 3 * * 0 find /home/webuser/backups/ -name "*.tar.gz" -mtime +30 -delete
```

## Disaster Recovery Plan

### 1. Complete Server Failure

**Recovery Steps:**
1. **Provision new server**
2. **Restore from backups**
3. **Update DNS** (if IP changed)
4. **Verify functionality**

**Recovery Script:**
```bash
#!/bin/bash
# disaster-recovery.sh

echo "Starting disaster recovery..."

# Install required software
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git certbot python3-certbot-nginx

# Restore website files
git clone https://github.com/yourusername/your-repo.git /var/www/your-domain.com
cd /var/www/your-domain.com
npm install
npm run build

# Restore Nginx configuration
sudo cp backup/nginx/sites-available/your-domain.com /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/your-domain.com /etc/nginx/sites-enabled/

# Obtain new SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Start services
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "Recovery completed!"
```

### 2. DNS Failure

**Backup DNS Providers:**
- **Cloudflare**: Free DNS with good performance
- **Route 53**: AWS managed DNS
- **Google Domains**: Simple DNS management

**DNS Records to Keep Handy:**
```
A     @       your-server-ip
A     www     your-server-ip
MX    @       mail.your-domain.com (if using email)
TXT   @       "v=spf1 include:_spf.google.com ~all" (if using email)
```

---

# Troubleshooting Guide

## Common Issues and Solutions

### 1. Website Not Loading

**Symptoms:** Browser shows "This site can't be reached"

**Troubleshooting Steps:**

```bash
# Check DNS resolution
nslookup your-domain.com
dig your-domain.com

# Check server connectivity
ping your-server-ip

# Check if web server is running
sudo systemctl status nginx

# Check server logs
sudo tail -f /var/log/nginx/error.log
```

**Common Fixes:**
- Restart web server: `sudo systemctl restart nginx`
- Check DNS propagation (can take 24-48 hours)
- Verify firewall rules: `sudo ufw status`

### 2. SSL Certificate Issues

**Symptoms:** "Not secure" in browser, certificate errors

**Troubleshooting:**

```bash
# Check certificate status
sudo certbot certificates

# Test certificate renewal
sudo certbot renew --dry-run

# Force renewal
sudo certbot renew --force-renewal

# Check certificate expiration
echo | openssl s_client -servername your-domain.com -connect your-domain.com:443 2>/dev/null | openssl x509 -noout -dates
```

**Common Fixes:**
- Renew expired certificate
- Check Nginx SSL configuration
- Verify DNS records are correct

### 3. Contact Form Not Working

**Symptoms:** Form submission fails or doesn't reach Supabase

**Troubleshooting:**

```bash
# Check browser console for errors
# Open DevTools (F12) → Console tab

# Verify environment variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Test Supabase connection
curl -X POST 'https://your-project-id.supabase.co/rest/v1/contact_inquiries' \
-H "apikey: your-anon-key" \
-H "Content-Type: application/json" \
-d '{"name":"test","email":"test@example.com","message":"test"}'
```

**Common Fixes:**
- Verify Supabase credentials are correct
- Check Row Level Security (RLS) policies
- Ensure CORS is configured in Supabase
- Rebuild and redeploy website

### 4. Chinese Text Not Displaying

**Symptoms:** Chinese characters show as boxes or question marks

**Common Fixes:**
- Verify UTF-8 encoding in HTML: `<meta charset="UTF-8">`
- Check font support for Chinese characters
- Add Chinese fonts to CSS:
  ```css
  body {
      font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  }
  ```

### 5. Performance Issues

**Symptoms:** Slow loading times, poor PageSpeed scores

**Troubleshooting:**

```bash
# Check server resources
top
htop
df -h
free -m

# Test website speed
curl -o /dev/null -s -w "%{time_total}\n" https://your-domain.com
```

**Common Fixes:**
- Enable Gzip compression
- Optimize images further
- Enable browser caching
- Use CDN for static assets
- Upgrade server resources

### 6. High Server Load

**Symptoms:** Website slow or unresponsive, high CPU usage

**Investigation:**

```bash
# Check system load
uptime

# Check processes
ps aux --sort=-%cpu | head -10
ps aux --sort=-%mem | head -10

# Check connections
netstat -tuln
ss -tuln

# Check disk I/O
iostat -x 1
```

**Common Fixes:**
- Restart services: `sudo systemctl restart nginx`
- Check for DDoS attacks in logs
- Implement rate limiting
- Upgrade server resources
- Add load balancing (for high traffic)

## Emergency Procedures

### 1. Website Down - Quick Fix

```bash
#!/bin/bash
# emergency-restart.sh

echo "Emergency website restart procedure"

# Restart all services
sudo systemctl restart nginx
sudo systemctl restart networking

# Clear any cache
sudo sync
echo 3 | sudo tee /proc/sys/vm/drop_caches

# Check status
sudo systemctl status nginx
curl -I https://your-domain.com

echo "Emergency restart completed"
```

### 2. Security Breach Response

```bash
#!/bin/bash
# security-lockdown.sh

echo "Initiating security lockdown"

# Block all incoming connections except SSH
sudo ufw --force reset
sudo ufw allow OpenSSH
sudo ufw enable

# Stop web services
sudo systemctl stop nginx

# Change SSH port (optional)
# sudo sed -i 's/#Port 22/Port 2222/' /etc/ssh/sshd_config
# sudo systemctl restart sshd

echo "System locked down - investigate immediately"
```

---

# Maintenance & Updates

## Regular Maintenance Tasks

### Weekly Tasks

```bash
#!/bin/bash
# weekly-maintenance.sh

echo "Starting weekly maintenance..."

# Update system packages
sudo apt update && sudo apt upgrade -y

# Clean package cache
sudo apt autoremove -y
sudo apt autoclean

# Rotate logs
sudo logrotate /etc/logrotate.conf

# Check disk space
df -h

# Check SSL certificate expiration
certbot certificates

# Test website functionality
curl -f https://your-domain.com > /dev/null && echo "Website OK" || echo "Website ERROR"

echo "Weekly maintenance completed"
```

### Monthly Tasks

```bash
#!/bin/bash
# monthly-maintenance.sh

echo "Starting monthly maintenance..."

# Full system update
sudo apt update && sudo apt dist-upgrade -y

# Update Node.js packages
cd /var/www/your-domain.com
npm audit fix
npm update

# Rebuild website
npm run build

# Backup configuration
/home/webuser/backup-config.sh

# Performance audit
npx lighthouse https://your-domain.com --output json --output-path lighthouse-report.json

# Security scan
npx audit-ci --config audit-ci.json

echo "Monthly maintenance completed"
```

### Automated Maintenance Schedule

```bash
# Add to cron
crontab -e

# Weekly maintenance (Sundays at 2 AM)
0 2 * * 0 /home/webuser/weekly-maintenance.sh

# Monthly maintenance (1st of month at 3 AM)
0 3 1 * * /home/webuser/monthly-maintenance.sh

# SSL certificate renewal check (daily)
0 1 * * * certbot renew --quiet
```

## Website Updates

### 1. Content Updates

```bash
#!/bin/bash
# update-content.sh

echo "Updating website content..."

# Navigate to website directory
cd /var/www/your-domain.com

# Pull latest changes from Git
git pull origin main

# Install any new dependencies
npm install

# Build updated website
npm run build

# Reload Nginx to clear any cache
sudo systemctl reload nginx

echo "Content update completed"
```

### 2. Security Updates

```bash
#!/bin/bash
# security-update.sh

echo "Applying security updates..."

# Update system packages (security only)
sudo apt update
sudo apt list --upgradable | grep security
sudo unattended-upgrade -d

# Update Node.js security packages
cd /var/www/your-domain.com
npm audit --audit-level high
npm audit fix

# Rebuild with updated packages
npm run build

# Restart services
sudo systemctl restart nginx

echo "Security updates completed"
```

### 3. Feature Updates

**Before deploying new features:**

1. **Test locally:**
   ```bash
   npm run dev
   # Test all functionality
   ```

2. **Build and test production:**
   ```bash
   npm run build
   npm run preview
   ```

3. **Deploy to staging** (if available):
   ```bash
   # Deploy to staging subdomain first
   rsync -av dist/ user@server:/var/www/staging.your-domain.com/
   ```

4. **Deploy to production:**
   ```bash
   ./update-content.sh
   ```

5. **Verify deployment:**
   ```bash
   curl -f https://your-domain.com
   # Test contact form
   # Check all pages
   ```

---

# Cost Analysis

## Hosting Cost Comparison

### Option 1: Vercel (Recommended for Most)

**Free Tier:**
- ✅ **100GB bandwidth/month**
- ✅ **Unlimited sites**
- ✅ **Global CDN**
- ✅ **Automatic SSL**
- ✅ **Analytics**

**Pro Tier ($20/month):**
- ✅ **1TB bandwidth/month**
- ✅ **Advanced analytics**
- ✅ **Team collaboration**
- ✅ **Priority support**

**Total Monthly Cost:** $0 - $20

### Option 2: VPS Hosting

**Server Costs:**
- **DigitalOcean Droplet**: $5-10/month
- **Domain**: $10-15/year
- **SSL Certificate**: Free (Let's Encrypt)
- **Backup Storage**: $5/month (optional)

**Total Monthly Cost:** $5 - $15

**Additional Considerations:**
- Time investment: 5-10 hours/month
- Technical expertise required
- Full server management responsibility

### Option 3: AWS (Enterprise)

**Services Required:**
- **S3 Storage**: $1-5/month
- **CloudFront CDN**: $5-20/month
- **Route 53 DNS**: $0.50/month
- **Certificate Manager**: Free
- **Lambda@Edge**: $1-10/month (optional)

**Total Monthly Cost:** $6.50 - $35.50

### Option 4: Shared Hosting (Budget)

**Popular Providers:**
- **SiteGround**: $3-15/month
- **Bluehost**: $3-13/month
- **Hostinger**: $1-9/month

**Limitations:**
- Limited Node.js support
- Shared resources
- Less control over configuration

**Total Monthly Cost:** $1 - $15

## ROI Analysis

### Business Value Calculation

**Website Conversion Assumptions:**
- Monthly visitors: 1,000 - 10,000
- Conversion rate: 2-5%
- Average project value: $5,000 - $50,000
- Monthly leads: 20 - 500
- Closed deals: 2 - 50 per month

**Revenue Impact:**
- Conservative: $10,000 - $100,000/month
- Moderate: $25,000 - $250,000/month
- Optimistic: $50,000 - $500,000/month

**ROI Calculation:**
```
Website Cost: $20/month (Vercel Pro)
Revenue Impact: $25,000/month (Conservative)
ROI: 124,900%
```

### Break-Even Analysis

**Even with minimal impact:**
- Need only 1 small project ($5,000) every 6 months
- Website pays for itself 250x over
- Extremely high-value investment

## Long-term Costs (3 Years)

| Option | Year 1 | Year 2 | Year 3 | Total |
|--------|--------|--------|--------|-------|
| **Vercel Free** | $0 | $0 | $0 | $0 |
| **Vercel Pro** | $240 | $240 | $240 | $720 |
| **VPS (DigitalOcean)** | $120 | $120 | $120 | $360 |
| **AWS** | $420 | $420 | $420 | $1,260 |

**Recommendation:** Start with Vercel Free, upgrade to Pro when needed.

---

# Quick Reference

## Essential Commands

```bash
# Build website
npm run build

# Test locally
npm run dev

# Deploy with Vercel CLI
vercel --prod

# Check Nginx status
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx

# Check SSL certificate
certbot certificates

# View logs
sudo tail -f /var/log/nginx/error.log

# Test website response
curl -I https://your-domain.com
```

## Emergency Contacts

**Service Outages:**
1. Check hosting provider status page
2. Verify DNS resolution
3. Test from different networks
4. Check server logs
5. Contact hosting support

**Security Issues:**
1. Change all passwords immediately
2. Check for unauthorized access
3. Update all software
4. Review server logs
5. Contact security expert if needed

## Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Netlify Documentation**: https://docs.netlify.com
- **DigitalOcean Tutorials**: https://www.digitalocean.com/community/tutorials
- **Let's Encrypt**: https://letsencrypt.org
- **Nginx Documentation**: https://nginx.org/en/docs

---

**Congratulations! You now have a complete deployment guide for your decoration engineering website. Choose the method that best fits your needs and technical comfort level.**

🚀 **Ready to deploy? Start with Vercel for the easiest experience, then consider VPS for more control as your business grows.**