# SanskritNova AI - Project Structure

## 📁 Root Directory Structure

```
SanskritNova/
├── 📄 README.md                    # Main project documentation
├── 📄 LICENSE                      # MIT License
├── 📄 CONTRIBUTING.md              # Contributing guidelines
├── 📄 Makefile                     # Build and deployment commands
├── 📄 package.json                 # Node.js dependencies
├── 📄 pyproject.toml              # Python project configuration
├── 📄 requirements.txt            # Python dependencies
├── 📄 vercel.json                 # Vercel deployment config
├── 📄 netlify.toml               # Netlify deployment config
├── 📄 .gitignore                  # Git ignore rules
├── 📄 .env.example                # Environment variables template
│
├── 📁 api/                        # FastAPI backend
│   ├── 📄 index.py                # Main API application
│   ├── 📄 chat.py                 # Chat endpoint
│   ├── 📄 transliterate.py        # Transliteration endpoint
│   ├── 📄 tracks.py               # Learning tracks endpoint
│   ├── 📄 health.py               # Health check endpoint
│   ├── 📄 info.py                 # API info endpoint
│   └── 📄 requirements.txt        # Backend dependencies
│
├── 📁 public/                     # Static frontend files
│   ├── 📄 index.html              # Main luxury page
│   ├── 📄 knowledge-base.html     # Knowledge base page
│   ├── 📄 manifest.json           # PWA manifest
│   ├── 📄 icon-192.svg            # App icon (192px)
│   ├── 📄 icon-512.svg            # App icon (512px)
│   ├── 📄 sw.js                   # Service worker
│   │
│   ├── 📁 styles/                # CSS stylesheets
│   │   ├── 📄 luxury-styles.css   # Luxury design tokens
│   │   ├── 📄 luxury-components.css # Luxury UI components
│   │   ├── 📄 knowledge-base-styles.css # Knowledge base styles
│   │   └── 📁 apple-india/        # Legacy Apple India styles
│   │       ├── 📄 apple-india-styles.css
│   │       └── 📄 apple-india-components.css
│   │
│   ├── 📁 scripts/                # JavaScript files
│   │   ├── 📄 luxury-app.js        # Luxury app functionality
│   │   ├── 📄 knowledge-base-app.js # Knowledge base functionality
│   │   └── 📁 apple-india/        # Legacy Apple India scripts
│   │       └── 📄 apple-india-app.js
│   │
│   └── 📁 legacy/                 # Legacy files (not used)
│       ├── 📄 app.js               # Old main app
│       ├── 📄 components.js        # Old components
│       └── 📄 styles.css           # Old styles
│
├── 📁 docs/                       # Documentation
│   ├── 📁 knowledge-base/         # Knowledge base documentation
│   │   ├── 📄 digital-knowledge-base.md
│   │   ├── 📄 comprehensive-sanskrit-library.md
│   │   ├── 📄 digital-knowledge-base-implementation.md
│   │   └── 📄 comprehensive-bibliography.md
│   ├── 📁 legacy/                 # Legacy documentation
│   │   └── 📄 README-old.md
│   ├── 📄 project-setup-guide.md  # Setup instructions
│   ├── 📄 setup-guide.md          # Detailed setup guide
│   ├── 📄 transformation-roadmap.md # Development roadmap
│   └── 📄 original-vs-current.md   # Version comparison
│
├── 📁 scripts/                    # Utility scripts
│   └── 📄 test-website.sh         # Website testing script
│
├── 📁 data/                       # Data files
│   └── 📁 ...                     # Application data
│
├── 📁 sanskrit_rag/               # RAG system files
│   └── 📁 ...                     # RAG implementation
│
├── 📁 tests/                      # Test files
│   └── 📁 ...                     # Test suites
│
├── 📁 docker/                     # Docker configuration
│   └── 📁 ...                     # Docker files
│
├── 📁 k8s/                        # Kubernetes configuration
│   └── 📁 ...                     # K8s manifests
│
├── 📁 netlify/                    # Netlify configuration
│   └── 📁 ...                     # Netlify functions
│
├── 📁 .github/                    # GitHub configuration
│   └── 📁 ...                     # GitHub workflows
│
└── 📁 report/                     # Reports and analytics
    └── 📁 ...                     # Report files
```

## 🎯 Current Active Files

### Frontend (Luxury Design)
- **Main Page**: `public/index.html` - Luxury Sanskrit learning platform
- **Knowledge Base**: `public/knowledge-base.html` - Research-grade digital library
- **Styles**: `public/styles/luxury-styles.css`, `public/styles/luxury-components.css`
- **Scripts**: `public/scripts/luxury-app.js`, `public/scripts/knowledge-base-app.js`

### Backend (FastAPI)
- **Main API**: `api/index.py` - Core API endpoints
- **Chat**: `api/chat.py` - AI chat functionality
- **Transliteration**: `api/transliterate.py` - Sanskrit transliteration
- **Tracks**: `api/tracks.py` - Learning tracks data

### Documentation
- **Main Docs**: `docs/` - Comprehensive project documentation
- **Knowledge Base**: `docs/knowledge-base/` - Academic documentation
- **Legacy**: `docs/legacy/` - Old documentation

## 🗑️ Legacy Files (Archived)

### Legacy Styles
- `public/styles/apple-india/` - Apple India design (not used)
- `public/legacy/` - Old CSS and JS files (not used)

### Legacy Documentation
- `docs/legacy/README-old.md` - Old README file

## 🚀 Deployment

### Production URLs
- **Main Site**: https://sanskrit-nova.vercel.app
- **Knowledge Base**: https://sanskrit-nova.vercel.app/knowledge-base.html
- **API**: https://sanskrit-nova.vercel.app/api

### Local Development
- **Frontend**: `python -m http.server 9000` (port 9000)
- **Backend**: `python -m uvicorn api.index:app --reload` (port 8000)

## 📋 File Organization Rules

### ✅ Keep in Root
- Configuration files (pyproject.toml, package.json, vercel.json)
- Documentation (README.md, LICENSE, CONTRIBUTING.md)
- Build files (Makefile)
- Environment templates (.env.example)

### ✅ Organize in Folders
- All code in appropriate subdirectories
- Documentation in `docs/`
- Assets in `public/`
- Scripts in `scripts/`
- Tests in `tests/`

### ✅ Archive Legacy Files
- Move unused files to `legacy/` folders
- Keep for reference but don't use in production
- Update imports/paths accordingly

## 🔄 Maintenance

### Regular Cleanup
- Remove unused files and folders
- Update documentation
- Archive old versions
- Clean up test artifacts

### File Naming
- Use kebab-case for files and folders
- Be descriptive and consistent
- Include version numbers for legacy files
- Use proper file extensions

### Documentation Updates
- Keep README.md current
- Update structure documentation
- Document changes in CHANGELOG
- Maintain API documentation

This structure ensures a clean, maintainable, and scalable project organization.
