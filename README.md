# Engineering Best Practices Documentation Site

A comprehensive Docusaurus-powered documentation site for engineering best practices, covering everything from database design to daily developer workflows.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

```bash
cd docs-site
npm install
# or
yarn
```

### Development

Start the development server:

```bash
npm start
# or
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
# or
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## 📚 Documentation Structure

### Main Guides

1. **Engineering Best Practices Handbook** (`/docs/code-quality`)
   - Database Design, API Architecture, Code Quality
   - Testing, Security, Performance, and more

2. **Daily DevOps Enforcement Checklist** (`/docs/developer-guide`)
   - Branch & PR Rules, Pre-commit Checks
   - Security, Testing, and Workflow Standards

## 🚀 Deployment

### GitHub Pages

Using SSH:

```bash
USE_SSH=true npm run deploy
# or
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
# or
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Other Platforms

Deploy the `build/` directory to Netlify, Vercel, AWS S3, or any static hosting service.

## 📝 Contributing

1. Create new `.md` files in `docs/` directory
2. Update `sidebars.ts` for navigation
3. Test locally with `npm start`
4. Use Docusaurus features like admonitions and code blocks

---

Built with ❤️ using [Docusaurus](https://docusaurus.io/)
