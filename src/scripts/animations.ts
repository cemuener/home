/**
 * animations.ts — Global animation controller
 * Handles: scroll reveal, staggered children, hero entrance
 */

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Instantly reveal everything and bail
    document.querySelectorAll<HTMLElement>('.reveal, .reveal-children > *').forEach(el => {
      el.classList.add('is-revealed');
      el.style.transitionDelay = '0ms';
    });
    return;
  }

  // Single elements with .reveal
  const revealEls = document.querySelectorAll<HTMLElement>('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  revealEls.forEach(el => revealObserver.observe(el));

  // Staggered children — parent gets .reveal-children, kids stagger automatically
  const staggerParents = document.querySelectorAll<HTMLElement>('.reveal-children');
  const staggerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const children = Array.from(target.children) as HTMLElement[];
          const baseDelay = parseInt(target.dataset.staggerBase ?? '0', 10);
          const step = parseInt(target.dataset.staggerStep ?? '80', 10);
          children.forEach((child, i) => {
            child.style.transitionDelay = `${baseDelay + i * step}ms`;
            child.classList.add('is-revealed');
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  staggerParents.forEach(parent => {
    // Prep children — optionally apply a reveal variant from data attribute
    const variant = (parent as HTMLElement).dataset.revealVariant ?? '';
    Array.from(parent.children).forEach(child => {
      child.classList.add('reveal');
      if (variant) child.classList.add(`reveal--${variant}`);
    });
    staggerObserver.observe(parent);
  });
}

// ─── Hero Entrance ────────────────────────────────────────────────────────────
function initHeroEntrance() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const selectors = [
    '.hero__title',
    '.hero__subtitle',
    '.hero__tagline',
    '.hero__cta',
    '.hero__scroll-indicator',
  ];

  selectors.forEach((sel, i) => {
    const el = document.querySelector<HTMLElement>(sel);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    el.style.transitionDelay = `${i * 120 + 200}ms`;

    // Trigger on next frame so the initial styles are painted first
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.style.opacity = '';
        el.style.transform = '';
      })
    );
  });
}

// ─── Section Title Shimmer ─────────────────────────────────────────────────────
// Adds a one-shot shimmer sweep on gradient text when it enters the viewport
function initTitleShimmer() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const titles = document.querySelectorAll<HTMLElement>('.text--gradient-dj');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('shimmer-once');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  titles.forEach(t => observer.observe(t));
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initHeroEntrance();
  initScrollReveal();
  initTitleShimmer();
});

