// i18n utility functions

export type Language = 'de' | 'en';

const LANG_STORAGE_KEY = 'preferred-language';

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'de';
  return (localStorage.getItem(LANG_STORAGE_KEY) as Language) || 'de';
}

export function setStoredLanguage(lang: Language) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  document.documentElement.setAttribute('lang', lang);
}

export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') return 'de';
  return (document.documentElement.getAttribute('lang') as Language) || 'de';
}

