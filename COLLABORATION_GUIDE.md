# 🚀 Yandex Blob Uploader - Collaboration Guide

## 📋 **Project Overview**
A Next.js 14 application with dual authentication systems (NextAuth + Supabase), file management, and cloud storage integration.

## 🔧 **Quick Setup for New Developers**

### Prerequisites
```bash
- Node.js 18+ or 20+
- pnpm (recommended) or npm
- Git
- VS Code (recommended)
```

### 1. **Clone Repository**
```bash
git clone https://github.com/k9Doge3/kygroup-main-hub.git
cd kygroup-main-hub
```

### 2. **Install Dependencies**
```bash
pnpm install
# or
npm install
```

### 3. **Environment Setup**
Create `.env.local` file with required variables:
```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://rpzjqftzinytixqyomyt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwempxZnR6aW55dGl4cXlvbXl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2ODY4MDIsImV4cCI6MjA0MzI2MjgwMn0.h4dQExOZn-8HZ84Ykh4Uwd-7zRu2mOcLuaANWr-pqaI

# Yandex Disk Integration (Optional)
YANDEX_CLIENT_ID=your-yandex-client-id
YANDEX_CLIENT_SECRET=your-yandex-client-secret
```

### 4. **Start Development**
```bash
pnpm dev
# or
npm run dev
```

Visit `http://localhost:3000` (or `http://localhost:3001` if 3000 is busy)

## 🌟 **Key Features**

### Authentication Systems
- **NextAuth.js**: Traditional authentication with credentials
- **Supabase**: Modern auth with PostgreSQL backend
- **Guest Access**: For public file browsing

### Pages & Features
- `/auth/supabase` - Supabase authentication
- `/dashboard/supabase` - User dashboard
- `/family/*` - Family management features
- `/files` - File management system
- `/portfolio` - Portfolio management
- `/cloud-storage` - Yandex Disk integration

### API Routes
- `/api/auth/*` - NextAuth endpoints
- `/api/yandex/*` - Yandex Disk integration
- `/api/upload` - File upload functionality
- `/api/list` - File listing
- `/api/delete` - File deletion

## 🎯 **Development Workflow**

### Branch Strategy
```bash
main/master    - Production ready code
develop        - Integration branch
feature/*      - New features
hotfix/*       - Emergency fixes
```

### Making Changes
1. **Create feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test locally**:
   ```bash
   pnpm dev
   # Test your changes at localhost:3000
   ```

3. **Commit changes**:
   ```bash
   git add .
   git commit -m "feat: descriptive commit message"
   ```

4. **Push and create PR**:
   ```bash
   git push origin feature/your-feature-name
   # Create Pull Request on GitHub
   ```

## 🔐 **Security & Credentials**

### Environment Variables
- Never commit `.env.local` to Git
- Use Vercel/deployment platform for production env vars
- Store backup credentials in secure location

### Supabase Access
- **Dashboard**: https://supabase.com/dashboard/project/rpzjqftzinytixqyomyt
- **Database**: PostgreSQL with connection pooling
- **Authentication**: Built-in auth with multiple providers

### Yandex Integration
- OAuth 2.0 for secure API access
- File storage and retrieval capabilities
- Requires Yandex developer account

## 📱 **Tech Stack**

### Frontend
- **Next.js 14.2.16**: React framework with App Router
- **TypeScript**: Type safety and better DX
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern component library

### Backend & Database
- **Supabase**: PostgreSQL database with real-time features
- **NextAuth.js**: Authentication library
- **Server Actions**: Next.js server-side logic

### External Services
- **Yandex Disk**: Cloud storage integration
- **Vercel**: Deployment platform (recommended)
- **GitHub**: Version control and CI/CD

## 🚀 **Deployment**

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Manual Deployment
```bash
pnpm build
pnpm start
```

## 🔧 **Common Issues & Solutions**

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
pnpm dev -- -p 3001
```

### NextAuth Secret Error
```bash
# Generate new secret
openssl rand -base64 32
# Add to .env.local as NEXTAUTH_SECRET
```

### Supabase Connection Issues
- Verify URL and anon key in `.env.local`
- Check Supabase dashboard for service status
- Ensure database is not paused

## 📞 **Getting Help**

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com/)

### Contact
- **GitHub Issues**: For bugs and feature requests
- **Project Repository**: https://github.com/k9Doge3/kygroup-main-hub

## 📋 **Checklist for New Contributors**

- [ ] Clone repository and install dependencies
- [ ] Set up environment variables
- [ ] Run development server successfully
- [ ] Test authentication systems
- [ ] Read codebase and understand structure
- [ ] Make first small contribution
- [ ] Submit pull request following guidelines

---

**Happy Coding! 🎉**

*Last updated: September 30, 2025*