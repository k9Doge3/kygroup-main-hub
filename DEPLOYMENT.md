# 🚀 Deployment Guide

Complete guide for deploying the Yandex Blob Uploader to production environments.

## 🌟 **Quick Deploy Options**

### Option 1: Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/k9Doge3/kygroup-main-hub)

### Option 2: Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/k9Doge3/kygroup-main-hub)

## 📋 **Environment Variables Setup**

### Required Variables
```env
# NextAuth Configuration
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secure-secret-here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Yandex Disk Integration (Optional)
YANDEX_CLIENT_ID=your-yandex-client-id
YANDEX_CLIENT_SECRET=your-yandex-client-secret
```

### Generating Secrets
```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Or use online generator
# https://generate-secret.vercel.app/32
```

## 🔧 **Platform-Specific Deployment**

### Vercel Deployment

#### 1. **Via GitHub Integration (Recommended)**
1. Connect your GitHub repository to Vercel
2. Import the project from GitHub
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

#### 2. **Via Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### 3. **Environment Variables in Vercel**
```bash
# Add via CLI
vercel env add NEXTAUTH_SECRET
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Or add via Vercel Dashboard:
# https://vercel.com/dashboard → Project → Settings → Environment Variables
```

### Netlify Deployment

#### 1. **Via GitHub Integration**
1. Connect repository to Netlify
2. Set build command: `pnpm build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

#### 2. **Via Netlify CLI**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Self-Hosted Deployment

#### 1. **Docker Deployment**
```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm install -g pnpm && pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXTAUTH_URL=https://your-domain.com
      - NEXTAUTH_SECRET=your-secret
      - NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    restart: unless-stopped
```

```bash
# Deploy with Docker
docker-compose up -d
```

#### 2. **VPS/Server Deployment**
```bash
# Install Node.js and pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh
source ~/.bashrc

# Clone repository
git clone https://github.com/k9Doge3/kygroup-main-hub.git
cd kygroup-main-hub

# Install dependencies
pnpm install

# Build application
pnpm build

# Start with PM2 (process manager)
npm install -g pm2
pm2 start npm --name "kygroup-app" -- start
pm2 save
pm2 startup
```

## 🔒 **Security Configuration**

### SSL/HTTPS Setup
```bash
# Using Certbot (Let's Encrypt)
sudo apt install certbot
sudo certbot --nginx -d your-domain.com
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 **Monitoring & Analytics**

### Performance Monitoring
```bash
# Add to your deployment
npm install @vercel/analytics
npm install @vercel/speed-insights
```

### Error Tracking
```bash
# Sentry integration
npm install @sentry/nextjs
```

### Uptime Monitoring
- UptimeRobot
- Pingdom
- StatusCake

## 🔄 **CI/CD Setup**

### GitHub Actions Secrets
Add these secrets to your GitHub repository:
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `VERCEL_TOKEN` (for Vercel deployment)
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Automated Deployment Flow
1. **Push to `main`** → Production deployment
2. **Push to `develop`** → Staging deployment
3. **Pull Request** → Preview deployment

## 🌐 **Domain & DNS Configuration**

### Custom Domain Setup
1. **Purchase domain** from registrar
2. **Configure DNS records**:
   ```
   Type: A
   Name: @
   Value: [Your server IP]

   Type: CNAME
   Name: www
   Value: your-domain.com
   ```
3. **Update environment variables**:
   ```env
   NEXTAUTH_URL=https://your-domain.com
   ```

## 📋 **Deployment Checklist**

### Pre-Deployment
- [ ] All environment variables configured
- [ ] Database migrations completed (if any)
- [ ] Build passes locally
- [ ] Tests passing
- [ ] Security review completed

### Post-Deployment
- [ ] Site accessible at domain
- [ ] Authentication working
- [ ] File upload/download working
- [ ] All API endpoints responding
- [ ] SSL certificate valid
- [ ] Performance monitoring active
- [ ] Error tracking configured

## 🆘 **Troubleshooting**

### Common Issues

#### Build Failures
```bash
# Check Node.js version
node --version  # Should be 18+ or 20+

# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
pnpm build
```

#### Environment Variable Issues
```bash
# Verify variables are set
echo $NEXTAUTH_SECRET
echo $NEXT_PUBLIC_SUPABASE_URL

# Check deployment platform settings
# Ensure all required variables are added
```

#### Database Connection Issues
- Verify Supabase project is active
- Check database URL and keys
- Confirm IP restrictions in Supabase dashboard

### Performance Optimization
```bash
# Analyze bundle size
npx @next/bundle-analyzer

# Optimize images
# Use Next.js Image component
# Enable WebP format

# Enable caching
# Configure CDN
# Set proper cache headers
```

## 📞 **Support**

### Getting Help
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and community help
- **Documentation**: README and COLLABORATION_GUIDE

### Emergency Contacts
- Repository: https://github.com/k9Doge3/kygroup-main-hub
- Issues: https://github.com/k9Doge3/kygroup-main-hub/issues

---

**Happy Deploying! 🚀**

*For additional help, check the GitHub repository or create an issue.*