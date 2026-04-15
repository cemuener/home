# Cem Üner - Portfolio Website

Modern bilingual portfolio website showcasing DJ services and customer testimonials.

## Quick Start

```bash
npm install
npm run dev     # http://localhost:4321
npm run build
```

## Features

- 🌍 Bilingual (DE/EN toggle in navigation)
- 🎵 DJ Section with SoundCloud mixes
- ⭐ Customer testimonials  
- 📧 Contact form (Formspree)
- 📱 Fully responsive
- ♿ WCAG 2.1 AA accessible

## Tech Stack

- Astro 4.x
- SCSS + BEM
- TypeScript
- Formspree.io

## Configuration

### Contact Form
1. Sign up at https://formspree.io
2. Get form ID
3. Replace `YOUR_FORMSPREE_ID` in `src/components/ContactSection.astro` line 18

### Content
- Mixes: `src/data/mixes.json`
- Events: `src/data/events.json`
- Testimonials: `src/data/testimonials.json`
- Translations: `src/i18n/translations.ts`

### Theme Colors
Edit `src/styles/_variables.scss`

## Deployment

### GitHub Pages Setup

This site is configured for automatic deployment to GitHub Pages.

**One-time setup in GitHub repository:**
1. Go to your repository settings
2. Navigate to **Pages** (left sidebar)
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
4. That's it! The workflow is already configured.

**Automatic deployment:**
- Every push to the `main` branch triggers automatic deployment
- The GitHub Actions workflow builds and deploys your site
- View deployment status in the **Actions** tab
- Site will be live at: `https://cemuener.github.io/home`

**Manual deployment:**
- Go to **Actions** tab in your repository
- Select "Deploy to GitHub Pages" workflow
- Click "Run workflow" button

**Files involved:**
- `.github/workflows/deploy.yml` - Deployment workflow
- `astro.config.mjs` - Site URL configuration
- `public/.nojekyll` - Prevents Jekyll processing

## Author

**Cem Üner** - DJ • Cycling Coach • Developer  
Munich, Germany

