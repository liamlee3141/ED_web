# Quick Deployment Checklist

## Pre-Deployment Checklist

### ✅ Required Information
- [ ] Domain name purchased and configured
- [ ] Supabase project credentials ready
- [ ] Hosting platform account created
- [ ] SSL certificate plan (Let's Encrypt recommended)

### ✅ Technical Preparation
- [ ] Website source code downloaded/cloned
- [ ] Node.js 18+ installed locally for testing
- [ ] Environment variables documented
- [ ] Build process tested locally

## Deployment Steps (Choose One Method)

### Method 1: Vercel (Recommended)

1. **Setup** (5 minutes)
   - [ ] Create account at vercel.com
   - [ ] Connect GitHub repository
   - [ ] Import project

2. **Configuration** (3 minutes)
   - [ ] Add environment variables in Vercel dashboard
   - [ ] Verify build settings (auto-detected)
   - [ ] Deploy

3. **Domain Setup** (10 minutes)
   - [ ] Add custom domain in Vercel
   - [ ] Update DNS records
   - [ ] Verify SSL certificate

### Method 2: Own Server

1. **Server Setup** (20 minutes)
   - [ ] Ubuntu server ready
   - [ ] SSH access configured
   - [ ] Domain pointing to server IP

2. **Software Installation** (15 minutes)
   - [ ] Node.js 18+ installed
   - [ ] Nginx installed and configured
   - [ ] PM2 installed globally

3. **Website Deployment** (10 minutes)
   - [ ] Upload website files
   - [ ] Install dependencies (`npm install`)
   - [ ] Build application (`npm run build`)
   - [ ] Configure Nginx virtual host

4. **SSL Setup** (10 minutes)
   - [ ] Install Certbot
   - [ ] Generate SSL certificate
   - [ ] Configure HTTPS redirect

## Post-Deployment Verification

### ✅ Functionality Tests
- [ ] Homepage loads with background image
- [ ] All pages navigate correctly (Home, About, Services, Portfolio, Contact)
- [ ] Chinese text displays properly
- [ ] Animations and effects work smoothly
- [ ] Contact form submits successfully
- [ ] Mobile responsiveness verified

### ✅ Performance Tests
- [ ] Page speed <3 seconds (use PageSpeed Insights)
- [ ] Images load properly on all devices
- [ ] No console errors in browser
- [ ] HTTPS working with valid certificate

### ✅ SEO & Analytics
- [ ] Google Analytics added (optional)
- [ ] Search Console verified (optional)
- [ ] Meta tags and descriptions in place
- [ ] Social media preview images working

## Quick Commands Reference

**Build Website:**
```bash
npm install
npm run build
```

**Test Locally:**
```bash
npm run dev
# Visit: http://localhost:5173
```

**Check Nginx Configuration:**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

**Renew SSL Certificate:**
```bash
sudo certbot renew --dry-run
```

## Emergency Contacts

**If Issues Arise:**
1. Check browser console for JavaScript errors
2. Verify environment variables are set correctly
3. Test Supabase connection independently
4. Review server logs for errors

## Estimated Timeline

**Vercel Deployment**: 15-20 minutes
**VPS Deployment**: 45-60 minutes
**Domain Propagation**: 2-24 hours

---

*Choose Vercel for fastest deployment, or VPS for full control.*