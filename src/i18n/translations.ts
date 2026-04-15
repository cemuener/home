// Translation data for German and English

export const translations = {
  de: {
    // Navigation
    nav: {
      dj: 'DJ',
      references: 'Referenzen',
      contact: 'Kontakt'
    },
    
    // Hero Section
    hero: {
      name: 'Cem Üner',
      subtitle: 'DJ • Web Developer',
      tagline: 'Energie für die Tanzfläche, Motivation für das Bike und Innovation für Code.',
      ctaPrimary: 'Kontakt aufnehmen',
      ctaSecondary: 'DJ Sets entdecken',
      scrollDown: 'Runterscrollen'
    },
    
    // DJ Section
    dj: {
      title: 'DJ Cem Üner',
      subtitle: 'München • House • Afro • Latin',
      bioPara1: 'Cem Üner ist ein DJ aus München mit einem feinen Gespür für Menschen und Atmosphäre. In kürzester Zeit erfasst er die Stimmung des Raums und baut daraus einen musikalischen Spannungsbogen, der die Tanzfläche Schritt für Schritt füllt. Seine Sets verbinden House mit Afro-, Oriental- und Latin-Vibes, angereichert mit groovy Funk und viel Gefühl für den richtigen Moment. Vom Lowtempo bis zum energiegeladenen Drop bleibt jedes Detail im Flow.',
      bioPara2: 'Ob Hochzeit, Geburtstag oder Club-Event – Cem passt Sound, Energie und Wünsche präzise an den Moment an und schafft Abende, die lange in Erinnerung bleiben.',
      latestMixes: 'Neueste Mixes',
      upcomingEvents: 'Kommende Events',
      listenOn: 'Hören auf Soundcloud'
    },
    
    // Testimonials Section
    testimonials: {
      title: 'Referenzen',
      subtitle: 'Was meine Kunden über die Zusammenarbeit mit mir sagen',
      djService: 'DJ Service'
    },
    
    // Contact Section
    contact: {
      title: 'Kontakt aufnehmen',
      subtitle: 'Lass uns gemeinsam etwas Großartiges schaffen. Schreib mir für Buchungen, Kooperationen oder einfach zum Hallo sagen.',
      form: {
        name: 'Name',
        email: 'E-Mail',
        subject: 'Betreff',
        message: 'Nachricht',
        required: '*',
        submit: 'Nachricht senden',
        sending: 'Wird gesendet...',
        success: '✓ Vielen Dank! Deine Nachricht wurde erfolgreich versendet. Ich melde mich bald bei dir.',
        error: '✗ Ups! Etwas ist schief gelaufen. Bitte versuche es erneut oder schreibe mir direkt eine E-Mail.',
        errorRequired: 'Dieses Feld ist erforderlich',
        errorEmail: 'Bitte gib eine gültige E-Mail-Adresse ein'
      },
      social: {
        title: 'Vernetze dich mit mir',
        instagram: 'Instagram',
        soundcloud: 'SoundCloud',
        mixcloud: 'Mixcloud',
        linkedin: 'LinkedIn',
        github: 'GitHub'
      }
    }
  },
  
  en: {
    // Navigation
    nav: {
      dj: 'DJ',
      references: 'References',
      contact: 'Contact'
    },
    
    // Hero Section
    hero: {
      name: 'Cem Üner',
      subtitle: 'DJ • Web Developer',
      tagline: 'Beats for the dancefloor, code for the web – two worlds, one passion.',
      ctaPrimary: 'Get in Touch',
      ctaSecondary: 'Explore DJ Sets',
      scrollDown: 'Scroll Down'
    },
    
    // DJ Section
    dj: {
      title: 'DJ Cem Üner',
      subtitle: 'Munich • House • Afro • Oriental • Latin',
      bioPara1: 'Cem Uener is a DJ from Munich with a fine sense for people and atmosphere. In no time, he captures the mood of the room and builds a musical arc of suspense that gradually fills the dance floor. His sets combine House with Afro, Oriental, and Latin vibes, enriched with groovy Funk and a great feeling for the right moment. From low tempo to energetic drops, every detail stays in the flow.',
      bioPara2: 'Whether wedding, birthday, or club event – Cem precisely adapts sound, energy, and wishes to the moment, creating evenings that remain memorable for a long time.',
      latestMixes: 'Latest Mixes',
      upcomingEvents: 'Upcoming Events',
      listenOn: 'Listen on Soundcloud'
    },
    
    // Testimonials Section
    testimonials: {
      title: 'Customer References',
      subtitle: 'What my clients say about working with me',
      djService: 'DJ Service'
    },
    
    // Contact Section
    contact: {
      title: 'Get in Touch',
      subtitle: "Let's create something amazing together. Send me a message for bookings, collaborations, or just to say hello.",
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        required: '*',
        submit: 'Send Message',
        sending: 'Sending...',
        success: '✓ Thank you! Your message has been sent successfully. I will get back to you soon.',
        error: '✗ Oops! Something went wrong. Please try again or email me directly.',
        errorRequired: 'This field is required',
        errorEmail: 'Please enter a valid email address'
      },
      social: {
        title: 'Connect With Me',
        instagram: 'Instagram',
        soundcloud: 'SoundCloud',
        mixcloud: 'Mixcloud',
        linkedin: 'LinkedIn',
        github: 'GitHub'
      }
    }
  }
};

export type Language = 'de' | 'en';
export type TranslationKey = keyof typeof translations.de;

export function getTranslation(lang: Language = 'de') {
  return translations[lang];
}

