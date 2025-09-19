#!/bin/bash
# VPS Deployment Script
# Complete server setup and website deployment for Ubuntu 20.04+

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration variables (edit these)
DOMAIN_NAME="your-domain.com"
WWW_DOMAIN="www.your-domain.com"
WEB_USER="webuser"
WEBSITE_DIR="/var/www/$DOMAIN_NAME"
GIT_REPO="https://github.com/yourusername/your-repo.git"

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

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_header() {
    echo ""
    echo "================================================="
    echo "🚀 $1"
    echo "================================================="
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please don't run this script as root. Run as regular user with sudo access."
    exit 1
fi

# Check Ubuntu version
if ! grep -q "Ubuntu" /etc/os-release; then
    print_error "This script is designed for Ubuntu. Other distributions may require modifications."
    exit 1
fi

print_header "VPS Deployment for Decoration Engineering Website"

print_info "This script will:"
echo "1. Update system packages"
echo "2. Install Node.js, Nginx, and other dependencies"
echo "3. Create web user and directories"
echo "4. Deploy your website"
echo "5. Configure Nginx"
echo "6. Set up SSL with Let's Encrypt"
echo "7. Configure firewall"
echo ""
read -p "Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 1
fi

# Update configuration
print_info "Please update configuration variables at the top of this script:"
print_info "DOMAIN_NAME, WWW_DOMAIN, GIT_REPO"
read -p "Have you updated the configuration? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please update the script configuration and run again."
    exit 1
fi

print_header "Step 1: System Update"
sudo apt update && sudo apt upgrade -y
print_status "System packages updated"

print_header "Step 2: Install Dependencies"

# Install Node.js 18.x
print_info "Installing Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
print_status "Node.js installed: $(node --version)"

# Install other dependencies
print_info "Installing other dependencies..."
sudo apt install -y nginx git ufw certbot python3-certbot-nginx fail2ban htop unzip
print_status "Dependencies installed"

# Install PM2 globally
sudo npm install -g pm2
print_status "PM2 process manager installed"

print_header "Step 3: Create Web User"

# Create web user if doesn't exist
if ! id "$WEB_USER" &>/dev/null; then
    sudo adduser --disabled-password --gecos "" $WEB_USER
    sudo usermod -aG sudo $WEB_USER
    print_status "Created user: $WEB_USER"
else
    print_status "User $WEB_USER already exists"
fi

# Create website directory
sudo mkdir -p $WEBSITE_DIR
sudo chown -R $WEB_USER:$WEB_USER $WEBSITE_DIR
print_status "Website directory created: $WEBSITE_DIR"

print_header "Step 4: Deploy Website"

# Clone repository
print_info "Cloning repository..."
if [ -d "$WEBSITE_DIR/.git" ]; then
    cd $WEBSITE_DIR
    sudo -u $WEB_USER git pull origin main
    print_status "Repository updated"
else
    sudo -u $WEB_USER git clone $GIT_REPO $WEBSITE_DIR
    print_status "Repository cloned"
fi

cd $WEBSITE_DIR

# Install dependencies
print_info "Installing Node.js dependencies..."
sudo -u $WEB_USER npm install
print_status "Dependencies installed"

# Create environment file
print_info "Creating environment configuration..."
if [ ! -f ".env" ]; then
    sudo -u $WEB_USER tee .env > /dev/null << EOF
# Supabase Configuration (Required)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anonymous-key

# Optional: Analytics
VITE_GA_TRACKING_ID=GA_MEASUREMENT_ID

# Optional: Contact Configuration
VITE_CONTACT_EMAIL=contact@$DOMAIN_NAME
EOF
    print_warning "Created .env template. Please update with actual credentials."
    print_warning "Edit: $WEBSITE_DIR/.env"
else
    print_status "Environment file already exists"
fi

# Build website
print_info "Building website..."
sudo -u $WEB_USER npm run build
print_status "Website built successfully"

print_header "Step 5: Configure Nginx"

# Create Nginx configuration
sudo tee /etc/nginx/sites-available/$DOMAIN_NAME > /dev/null << EOF
server {
    listen 80;
    server_name $DOMAIN_NAME $WWW_DOMAIN;
    root $WEBSITE_DIR/dist;
    index index.html index.htm;

    # Handle single-page application routing
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Optimize static asset delivery
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)\$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary Accept-Encoding;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip compression
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
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/$DOMAIN_NAME /etc/nginx/sites-enabled/

# Remove default site
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t
print_status "Nginx configuration created and tested"

# Start and enable Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
print_status "Nginx started and enabled"

print_header "Step 6: Configure Firewall"

# Configure UFW
sudo ufw --force reset
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
print_status "Firewall configured"

# Check firewall status
print_info "Firewall status:"
sudo ufw status

print_header "Step 7: SSL Certificate Setup"

print_info "Setting up SSL certificate with Let's Encrypt..."
print_warning "Make sure your domain DNS is pointing to this server IP before continuing."
read -p "Is your domain DNS configured correctly? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    sudo certbot --nginx -d $DOMAIN_NAME -d $WWW_DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN_NAME
    print_status "SSL certificate installed successfully"
else
    print_warning "Skipping SSL setup. Run 'sudo certbot --nginx -d $DOMAIN_NAME -d $WWW_DOMAIN' later."
fi

# Set up automatic certificate renewal
sudo crontab -l | grep -q certbot || (sudo crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | sudo crontab -
print_status "Automatic SSL renewal configured"

print_header "Step 8: Security Hardening"

# Configure fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
print_status "Fail2ban configured and started"

# Set up automatic security updates
sudo apt install -y unattended-upgrades
echo 'Unattended-Upgrade::Automatic-Reboot "false";' | sudo tee -a /etc/apt/apt.conf.d/50unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
print_status "Automatic security updates configured"

print_header "Step 9: Create Management Scripts"

# Create deployment script
sudo -u $WEB_USER tee $WEBSITE_DIR/deploy.sh > /dev/null << 'EOF'
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
EOF

sudo chmod +x $WEBSITE_DIR/deploy.sh
print_status "Deployment script created: $WEBSITE_DIR/deploy.sh"

# Create monitoring script
sudo -u $WEB_USER tee /home/$WEB_USER/monitor.sh > /dev/null << EOF
#!/bin/bash
# Website monitoring script

LOGFILE="/var/log/website-monitor.log"
DATE=\$(date '+%Y-%m-%d %H:%M:%S')

# Check disk space
DISK_USAGE=\$(df -h / | awk 'NR==2 {print \$5}' | cut -d'%' -f1)
if [ \$DISK_USAGE -gt 80 ]; then
    echo "\$DATE - WARNING: Disk usage is \${DISK_USAGE}%" >> \$LOGFILE
fi

# Check memory usage
MEM_USAGE=\$(free | grep Mem | awk '{printf "%.0f", \$3/\$2 * 100.0}')
if [ \$MEM_USAGE -gt 80 ]; then
    echo "\$DATE - WARNING: Memory usage is \${MEM_USAGE}%" >> \$LOGFILE
fi

# Check if Nginx is running
if ! systemctl is-active --quiet nginx; then
    echo "\$DATE - ERROR: Nginx is not running" >> \$LOGFILE
    sudo systemctl start nginx
fi

# Check website response
RESPONSE=\$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN_NAME)
if [ \$RESPONSE -ne 200 ]; then
    echo "\$DATE - ERROR: Website returned HTTP \$RESPONSE" >> \$LOGFILE
fi
EOF

sudo chmod +x /home/$WEB_USER/monitor.sh
print_status "Monitoring script created: /home/$WEB_USER/monitor.sh"

# Add monitoring to cron
(sudo -u $WEB_USER crontab -l 2>/dev/null; echo "*/5 * * * * /home/$WEB_USER/monitor.sh") | sudo -u $WEB_USER crontab -
print_status "Monitoring cron job added"

print_header "Deployment Completed Successfully!"

print_status "Your website should now be live at:"
echo "🌐 https://$DOMAIN_NAME"
echo "🌐 https://$WWW_DOMAIN"
echo ""
print_info "Important files and directories:"
echo "📁 Website: $WEBSITE_DIR"
echo "📄 Nginx config: /etc/nginx/sites-available/$DOMAIN_NAME"
echo "📄 Environment: $WEBSITE_DIR/.env"
echo "🔧 Deploy script: $WEBSITE_DIR/deploy.sh"
echo "📊 Monitor script: /home/$WEB_USER/monitor.sh"
echo ""
print_info "Management commands:"
echo "🔄 Update website: cd $WEBSITE_DIR && ./deploy.sh"
echo "📊 Check status: sudo systemctl status nginx"
echo "📝 View logs: sudo tail -f /var/log/nginx/error.log"
echo "🔒 Renew SSL: sudo certbot renew"
echo ""
print_warning "Next steps:"
echo "1. Edit $WEBSITE_DIR/.env with your Supabase credentials"
echo "2. Run: cd $WEBSITE_DIR && npm run build"
echo "3. Test your website: https://$DOMAIN_NAME"
echo "4. Test the contact form"
echo "5. Set up backups and monitoring"
echo ""
print_status "Deployment complete! 🎉"
