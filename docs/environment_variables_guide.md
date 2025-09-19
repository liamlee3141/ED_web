# Environment Variables Configuration Guide

## Required Environment Variables

### Supabase Configuration (Mandatory)

```bash
# Your Supabase project URL
VITE_SUPABASE_URL=https://your-project-id.supabase.co

# Your Supabase anonymous/public key
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**How to find these values:**
1. Go to your Supabase project dashboard
2. Click "Settings" → "API"
3. Copy the "Project URL" and "anon public" key

### Optional Environment Variables

```bash
# Google Analytics (Optional)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Contact Email (Optional)
VITE_CONTACT_EMAIL=contact@your-domain.com

# Custom Company Name (Optional)
VITE_COMPANY_NAME="Your Company Name"

# Custom Phone Number (Optional)
VITE_PHONE_NUMBER="+86-xxx-xxxx-xxxx"
```

## Platform-Specific Setup

### Vercel
1. Go to your project dashboard
2. Settings → Environment Variables
3. Add each variable as "Plain Text"
4. Redeploy your project

### Netlify
1. Site Settings → Environment Variables
2. Add each key-value pair
3. Trigger new deploy

### VPS/Server
```bash
# Create .env file in project root
cd /var/www/your-domain.com
nano .env

# Add your variables
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here

# Rebuild the application
npm run build
```

### Docker
```bash
# Edit .env file
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here

# Rebuild container
docker-compose up --build -d
```

## Security Best Practices

### ✅ Safe Variables (Frontend)
These are safe to expose in frontend builds:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` (this is meant to be public)
- `VITE_GA_TRACKING_ID`
- `VITE_CONTACT_EMAIL`

### ❌ Never Expose
- Database passwords
- Service role keys
- API secrets
- Private keys

### 🔒 Supabase Security
Your Supabase anon key is safe to expose because:
1. It only allows operations permitted by Row Level Security (RLS)
2. Database tables are protected by RLS policies
3. The key cannot access admin functions

## Environment File Templates

### Development (.env.development)
```bash
# Development Environment
VITE_SUPABASE_URL=https://your-dev-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-dev-key
VITE_GA_TRACKING_ID=G-DEVXXXXXXXX
VITE_CONTACT_EMAIL=dev@your-domain.com
```

### Production (.env.production)
```bash
# Production Environment
VITE_SUPABASE_URL=https://your-prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-prod-key
VITE_GA_TRACKING_ID=G-PRODXXXXXXX
VITE_CONTACT_EMAIL=contact@your-domain.com
```

### Testing (.env.test)
```bash
# Testing Environment
VITE_SUPABASE_URL=https://your-test-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-test-key
VITE_CONTACT_EMAIL=test@your-domain.com
```

## Troubleshooting

### Common Issues

**1. Contact form not working**
```bash
# Check if variables are loaded
console.log(import.meta.env.VITE_SUPABASE_URL)

# Verify in browser developer tools
# Network tab → Check for 4xx/5xx errors
```

**2. Variables not updating**
- Clear browser cache
- Rebuild application: `npm run build`
- Restart development server: `npm run dev`

**3. Build fails with environment errors**
```bash
# Check for typos in variable names
# Ensure all required variables are set
# Verify .env file format (no spaces around =)
```

### Verification Commands

```bash
# Check if variables are set (Node.js environment)
node -e "console.log(process.env.VITE_SUPABASE_URL)"

# Test Supabase connection
curl -X GET "$VITE_SUPABASE_URL/rest/v1/" \
  -H "apikey: $VITE_SUPABASE_ANON_KEY"

# Verify build includes variables
npm run build && grep -r "supabase" dist/
```

## Multiple Environment Management

### Using different .env files
```bash
# Development
npm run dev  # Uses .env.development

# Production build
npm run build  # Uses .env.production

# Custom environment
cp .env.production .env.staging
npm run build  # Edit as needed
```

### CI/CD Pipeline Setup
```yaml
# GitHub Actions example
env:
  VITE_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
  VITE_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
  VITE_GA_TRACKING_ID: ${{ secrets.GA_TRACKING_ID }}
```

## Quick Setup Checklist

- [ ] Get Supabase project URL and anon key
- [ ] Create .env file in project root
- [ ] Add required variables
- [ ] Test locally: `npm run dev`
- [ ] Build successfully: `npm run build`
- [ ] Deploy with environment variables
- [ ] Test contact form on deployed site
- [ ] Verify analytics (if configured)

**Remember:** Environment variables starting with `VITE_` are the only ones accessible in your frontend React application.