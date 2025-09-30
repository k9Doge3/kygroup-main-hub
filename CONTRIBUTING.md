# 🤝 Contributing to Yandex Blob Uploader

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ or 20+
- pnpm (recommended) or npm
- Git
- GitHub account

### Setup Development Environment
1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/kygroup-main-hub.git
   cd kygroup-main-hub
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/k9Doge3/kygroup-main-hub.git
   ```
4. **Install dependencies**:
   ```bash
   pnpm install
   ```
5. **Set up environment variables** (see COLLABORATION_GUIDE.md)
6. **Start development server**:
   ```bash
   pnpm dev
   ```

## 🔄 **Development Workflow**

### Branch Strategy
- `main/master` - Production-ready code
- `develop` - Integration branch (if used)
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-updates` - Documentation changes

### Making Changes
1. **Create a new branch**:
   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Follow the coding standards
   - Write meaningful commit messages
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**:
   ```bash
   pnpm lint
   pnpm type-check
   pnpm build
   # pnpm test (when tests are available)
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## 📝 **Commit Message Guidelines**

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (white-space, formatting)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding missing tests
- `chore`: Changes to build process or auxiliary tools

### Examples
```bash
feat: add Supabase authentication integration
fix: resolve NextAuth secret configuration issue
docs: update README with new setup instructions
refactor: optimize file upload component performance
```

## 🐛 **Bug Reports**

Use GitHub Issues with the Bug Report template:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots if applicable

## ✨ **Feature Requests**

Use GitHub Issues with the Feature Request template:
- Clear description of the feature
- Use case and motivation
- Proposed implementation approach
- Consider alternatives

## 🧪 **Testing Guidelines**

### Test Requirements
- Add tests for new features
- Ensure existing tests pass
- Test in multiple browsers if UI changes
- Test authentication flows thoroughly

### Manual Testing Checklist
- [ ] Authentication systems work (NextAuth + Supabase)
- [ ] File upload/download functionality
- [ ] Family features accessibility
- [ ] Responsive design on mobile/desktop
- [ ] Yandex Disk integration (if applicable)

## 📋 **Code Style Guidelines**

### TypeScript/JavaScript
- Use TypeScript for type safety
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for functions
- Prefer functional components with hooks

### React Components
- Use functional components
- Extract reusable logic into custom hooks
- Keep components small and focused
- Use proper prop types
- Handle loading and error states

### CSS/Styling
- Use Tailwind CSS classes
- Follow responsive design principles
- Ensure accessibility standards
- Test with screen readers

## 🔒 **Security Guidelines**

### Environment Variables
- Never commit secrets to Git
- Use `.env.local` for local development
- Use platform secrets for production
- Document required environment variables

### Authentication
- Test all authentication flows
- Ensure proper session management
- Validate user permissions
- Follow OWASP guidelines

## 📚 **Documentation**

### Required Documentation Updates
- Update README if setup process changes
- Add JSDoc comments to functions
- Update API documentation for new endpoints
- Include examples in code comments

### Documentation Style
- Use clear, concise language
- Include code examples
- Add screenshots for UI changes
- Keep documentation up-to-date

## 👥 **Community Guidelines**

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help newcomers get started
- Focus on what's best for the community

### Communication
- Use GitHub Issues for bug reports and feature requests
- Use GitHub Discussions for questions and ideas
- Tag relevant maintainers for urgent issues
- Be patient and respectful in all interactions

## 🚀 **Release Process**

### Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Breaking changes documented
- [ ] Version number updated
- [ ] Changelog updated

## 🏷️ **Labels and Project Management**

### Issue Labels
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to docs
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `needs-triage` - Needs initial assessment
- `priority-high` - High priority issue
- `wontfix` - This will not be worked on

### Pull Request Labels
- `ready-for-review` - PR is ready for review
- `work-in-progress` - PR is still being worked on
- `needs-changes` - PR needs changes before merge
- `approved` - PR has been approved

## 🤔 **Questions?**

If you have questions about contributing:
1. Check existing GitHub Issues and Discussions
2. Read through this guide and COLLABORATION_GUIDE.md
3. Create a new GitHub Discussion
4. Tag maintainers if needed

---

**Thank you for contributing! 🎉**

*Happy coding and welcome to the community!*