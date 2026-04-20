// i18n utility functions

export type Language = 'de' | 'en';
export type Service = 'dj' | 'developer';

const LANG_STORAGE_KEY = 'preferred-language';

// Get language from URL path (e.g., /de/dj/ or /en/developer/)
export function getLanguageFromURL(): Language | null {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname;

  // Match /lang/service/ pattern
  if (path.startsWith('/de/')) return 'de';
  if (path.startsWith('/en/')) return 'en';

  return null;
}

// Get service from URL path (e.g., /de/dj/ or /en/developer/)
export function getServiceFromURL(): Service | null {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname;

  if (path.includes('/dj/') || path.includes('/dj')) return 'dj';
  if (path.includes('/developer/') || path.includes('/developer')) return 'developer';

  return null;
}

// Get stored language with URL path priority
export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'de';

  // Priority 1: URL path
  const urlLang = getLanguageFromURL();
  if (urlLang) return urlLang;

  // Priority 2: localStorage
  const storedLang = localStorage.getItem(LANG_STORAGE_KEY) as Language;
  return storedLang || 'de';
}

export function setStoredLanguage(lang: Language, updateURL: boolean = true) {
  if (typeof window === 'undefined') return;

  // Update localStorage
  localStorage.setItem(LANG_STORAGE_KEY, lang);

  // Update HTML lang attribute
  document.documentElement.setAttribute('lang', lang);

  // Navigate to language-specific URL within same service
  if (updateURL) {
    const service = getServiceFromURL() || 'dj'; // Default to dj
    const hash = window.location.hash;
    const newPath = `/${lang}/${service}/${hash}`;
    window.location.href = newPath;
  }
}

export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') return 'de';
  return (document.documentElement.getAttribute('lang') as Language) || 'de';
}

export function getCurrentService(): Service {
  if (typeof window === 'undefined') return 'dj';
  return getServiceFromURL() || 'dj';
}







