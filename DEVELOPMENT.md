# KY Group Hub - Development Guide

## 🚀 Quick Start

```bash
# Development
pnpm dev            # Start development server on http://localhost:3000
pnpm build          # Build for production
pnpm start          # Start production server
pnpm lint           # Run ESLint

# Dependencies
pnpm install        # Install all dependencies
pnpm add <package>  # Add new dependency
```

## 📁 Project Structure

```
kygroup-hub/
├── 📁 app/                    # Next.js App Router pages
│   ├── 📁 api/               # API routes
│   │   ├── 📁 yandex/        # Yandex Disk integration
│   │   ├── 📁 list/          # File listing API
│   │   └── 📁 upload/        # File upload API
│   ├── 📁 family/            # Family management pages
│   ├── 📁 portfolio/         # Portfolio showcase
│   ├── 📁 resume/            # Resume page
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── 📁 components/            # Reusable React components
│   ├── 📁 ui/               # shadcn/ui components
│   ├── file-uploader.tsx    # File management
│   ├── main-navigation.tsx  # Site navigation
│   └── ...                  # Feature components
├── 📁 lib/                  # Utilities and configurations
├── 📁 hooks/                # Custom React hooks
├── 📁 public/               # Static assets
└── 📁 styles/               # Global styles
```

## 🔧 Development Workflow

### 1. Local Development
```bash
# Clone and setup
git clone https://github.com/k9Doge3/kygroup-main-hub.git
cd kygroup-main-hub
pnpm install
pnpm dev
```

### 2. Making Changes
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make your changes
# Test locally with `pnpm dev`

# Commit changes
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

### 3. Deployment
- **Automatic**: Push to `master` branch triggers Vercel deployment
- **Manual**: Use Vercel CLI or dashboard

## 🏗️ Architecture Overview

### Frontend Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: React hooks + Context
- **Icons**: Lucide React

### Backend Integration
- **File Storage**: Yandex Disk API
- **Authentication**: Yandex OAuth
- **API**: Next.js API routes

### Key Features
1. **Multi-site Hub**: Portfolio, Family, Resume sections
2. **File Management**: Upload, organize, share files
3. **Family Tools**: Calendar, finances, todos
4. **Portfolio**: Project showcase with dynamic content

## 🔒 Environment Variables

Create `.env.local` for development:
```env
# Yandex Disk
YANDEX_CLIENT_ID=your_client_id
YANDEX_CLIENT_SECRET=your_secret

# Optional: Vercel Blob for additional storage
BLOB_READ_WRITE_TOKEN=your_token
```

## 📝 Code Standards

### File Naming
- Components: `PascalCase.tsx`
- Pages: `kebab-case/page.tsx`
- API routes: `route.ts`
- Utilities: `camelCase.ts`

### Component Structure
```tsx
// Import order: React -> Third-party -> Local
import React from 'react'
import { Button } from '@/components/ui/button'
import { useCustomHook } from '@/hooks/use-custom'

interface ComponentProps {
  // Props interface
}

export function ComponentName({ prop }: ComponentProps) {
  // Component logic
  return (
    // JSX
  )
}
```

## 🚢 Deployment Checklist

- [ ] All tests pass locally
- [ ] Build completes without errors (`pnpm build`)
- [ ] Environment variables configured
- [ ] No console errors in browser
- [ ] Mobile responsive design verified
- [ ] Performance optimized (images, bundle size)

## 🐛 Troubleshooting

### Common Issues
1. **Build Errors**: Check TypeScript types and imports
2. **API Issues**: Verify environment variables
3. **Styling Issues**: Check Tailwind class names
4. **Performance**: Use Next.js Image component, lazy loading

### Useful Commands
```bash
# Clear Next.js cache
rm -rf .next

# Check bundle size
pnpm build && pnpm analyze

# Type checking
pnpm tsc --noEmit
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Yandex Disk API](https://yandex.com/dev/disk/)