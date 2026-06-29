import type { Locale } from "./config";
import { defaultLocale } from "./config";

/**
 * UI prose dictionary. Only human-readable copy lives here.
 * Terminal/code-style tokens (e.g. `fetch('/api/career_history')`,
 * `import { tech_stack }`, nav labels) stay in English inside components.
 */
export const ui = {
  en: {
    "meta.title": "Alberto Arana — Principal Software Engineer",
    "meta.description":
      "Principal Software Engineer specializing in scalable architecture, frontend platforms, and high-performance systems.",

    "a11y.skipToContent": "Skip to content",
    "a11y.toggleTheme": "Toggle color theme",
    "a11y.openMenu": "Open navigation menu",
    "a11y.closeMenu": "Close navigation menu",
    "a11y.menu": "Navigation menu",
    "a11y.switchLanguage": "Switch language",
    "a11y.primaryNav": "Primary",
    "a11y.jumpToContact": "Jump to contact",
    "a11y.jumpToExperience": "Jump to experience",
    "a11y.backToTop": "Back to top",

    "section.stack": "Tech stack",
    "section.experience": "Experience",
    "section.contact": "Contact",

    "contact.heading": "Let's build something",
    "contact.lead": "Open to collaboration, architecture reviews, and hard problems.",

    "footer.tagline": "Building robust systems with calm precision.",
    "footer.rights": "All rights reserved.",
  },
  es: {
    "meta.title": "Alberto Arana — Ingeniero de Software Principal",
    "meta.description":
      "Ingeniero de Software Principal especializado en arquitectura escalable, plataformas frontend y sistemas de alto rendimiento.",

    "a11y.skipToContent": "Saltar al contenido",
    "a11y.toggleTheme": "Cambiar tema de color",
    "a11y.openMenu": "Abrir menú de navegación",
    "a11y.closeMenu": "Cerrar menú de navegación",
    "a11y.menu": "Menú de navegación",
    "a11y.switchLanguage": "Cambiar idioma",
    "a11y.primaryNav": "Principal",
    "a11y.jumpToContact": "Ir a contacto",
    "a11y.jumpToExperience": "Ir a experiencia",
    "a11y.backToTop": "Volver arriba",

    "section.stack": "Stack técnico",
    "section.experience": "Experiencia",
    "section.contact": "Contacto",

    "contact.heading": "Construyamos algo",
    "contact.lead": "Abierto a colaboración, revisiones de arquitectura y problemas difíciles.",

    "footer.tagline": "Construyendo sistemas robustos con precisión y calma.",
    "footer.rights": "Todos los derechos reservados.",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof ui)[typeof defaultLocale];

export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key] ?? key;
  };
}
