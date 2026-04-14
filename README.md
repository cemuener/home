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

Ready for GitHub Pages. Push to main branch for auto-deploy.

## Author

**Cem Üner** - DJ • Cycling Coach • Developer  
Munich, Germany

