# 🚀 Yandex Blob Uploader - Modern Family Hub

A Next.js 14 application with dual authentication systems, family management features, file storage, and cloud integration. Perfect for personal use and family collaboration.

## 🌟 **Quick Start**

```bash
# Clone the repository
git clone https://github.com/k9Doge3/kygroup-main-hub.git
cd kygroup-main-hub

# Install dependencies
pnpm install

# Set up environment variables (see COLLABORATION_GUIDE.md)
cp .env.example .env.local

# Start development server
pnpm dev
```

Visit `http://localhost:3000` to get started!

## ✨ **Key Features**

### 🔐 **Dual Authentication Systems**
- **Supabase Auth**: Modern authentication with PostgreSQL backend
- **NextAuth.js**: Traditional credentials-based authentication
- **Guest Access**: Public file browsing without registration
- **Google OAuth**: Social login integration ready

### 👨‍👩‍👧‍� **Family Hub Features**
- **Family Calendar**: Shared family scheduling and events
- **File Management**: Secure family file storage and sharing
- **Financial Dashboard**: Family expense tracking and budgeting
- **Todo Lists**: Collaborative task management
- **Profile Management**: Individual and family profiles

### � **Advanced File Management**
- **Yandex Disk Integration**: Cloud storage with OAuth authentication
- **Real-time Updates**: Live file synchronization
- **Multi-format Support**: Images, documents, media files
- **Secure Upload/Download**: Protected file operations
- **Live Preview**: Preview HTML content with proper rendering

### 🌐 Website Serving
- **Dynamic Content**: Serve website content directly from Yandex Disk
- **Multiple File Types**: Support for HTML, CSS, JavaScript, JSON, images, and more
- **Content Editing**: Edit website content in real-time through the web interface

## Setup Instructions

### 1. Yandex Developer Setup

1. Go to [Yandex Developer Console](https://oauth.yandex.com/)
2. Create a new OAuth application
3. Set the redirect URI to: `https://your-domain.com/yandex-callback`
4. Note down your Client ID

### 2. Environment Variables

Add the following environment variable to your Vercel project:

\`\`\`
NEXT_PUBLIC_YANDEX_CLIENT_ID=your_yandex_client_id_here
\`\`\`

### 3. Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the environment variable in Vercel dashboard
4. Deploy the application

## Usage

### Getting Started

1. **Connect to Yandex**: Click "Connect with Yandex ID" to authenticate
2. **Browse Files**: Use the file browser to navigate your Yandex Disk
3. **Upload Content**: Upload files directly through the web interface
4. **Edit Content**: Click on text files to edit them in the browser
5. **Create New Files**: Use the "Create New" tab to generate new content

### Content Management

- **HTML Files**: Edit and preview HTML content with live rendering
- **Text Files**: Edit configuration files, CSS, JavaScript, and more
- **Images**: View and manage image files
- **Folders**: Navigate through directory structures

### Website Architecture

The system treats your Yandex Disk as a content management system:
- Root directory files are accessible as website content
- HTML files can be edited and served dynamically
- Images and assets are properly linked and served
- Configuration files can be managed through the interface

## API Endpoints

### Authentication
- `POST /api/yandex/connect` - Validate and store OAuth token

### File Operations
- `GET /api/yandex/files` - List files and directories
- `POST /api/yandex/upload` - Upload files to Yandex Disk

### Content Management
- `GET /api/yandex/content` - List content files
- `GET /api/yandex/content/[...path]` - Download specific file content
- `POST /api/yandex/content/save` - Save edited content
- `POST /api/yandex/content/create` - Create new files

## Technical Details

### Yandex Disk API Integration
- Uses official Yandex Disk REST API v1
- Implements proper OAuth 2.0 flow
- Handles file upload/download through temporary URLs
- Supports all major file types and MIME types

### Security Features
- HTTP-only cookies for token storage
- CSRF protection through SameSite cookies
- Secure token validation on each request
- No client-side token exposure

### Performance Optimizations
- Efficient file listing with pagination
- Lazy loading of file content
- Optimized image serving through Yandex CDN
- Minimal API calls through smart caching

## Supported File Types

- **Text Files**: .txt, .md, .json, .xml
- **Web Files**: .html, .css, .js, .jsx, .ts, .tsx
- **Images**: .jpg, .jpeg, .png, .gif, .webp, .svg
- **Documents**: .pdf (view only)
- **Configuration**: .env, .config, .yml, .yaml

## Troubleshooting

### Authentication Issues
- Ensure your Yandex Client ID is correctly set
- Check that redirect URI matches your domain
- Verify Yandex Disk API access is enabled

### File Upload Problems
- Check file size limits (Yandex Disk has a 50GB limit per file)
- Ensure proper permissions on your Yandex Disk
- Verify network connectivity

### Content Editing Issues
- Large files may take time to load
- Binary files cannot be edited (images, PDFs, etc.)
- Check file permissions on Yandex Disk

## Contributing

This project uses:
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for components
- **Yandex Disk REST API** for storage

Feel free to contribute improvements, bug fixes, or new features!
