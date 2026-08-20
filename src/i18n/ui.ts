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
      "Principal engineer in CARTO Professional Services — product-minded React/TypeScript geospatial apps and shared libraries for enterprise clients.",

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
    "a11y.github": "GitHub",
    "a11y.linkedin": "LinkedIn",

    "section.about": "About",
    "section.projects": "Projects",
    "section.stack": "Tech stack",
    "section.experience": "Experience",
    "section.contact": "Contact",

    "about.focus": "What I focus on",
    "about.principles": "How I work",

    "projects.problem": "Problem",
    "projects.approach": "Approach",
    "projects.challenge": "Challenge",
    "projects.outcome": "Outcome",
    "projects.differently": "Differently",
    "projects.demo": "demo",
    "projects.repo": "repo",

    "contact.heading": "Let's build something",
    "contact.lead": "Open to collaboration, architecture reviews, and hard problems.",

    "footer.tagline": "Building robust systems with calm precision.",
    "footer.rights": "All rights reserved.",
  },
  es: {
    "meta.title": "Alberto Arana — Ingeniero de Software Principal",
    "meta.description":
      "Ingeniero principal en CARTO Professional Services — apps geoespaciales React/TypeScript orientadas a producto y librerías compartidas para clientes enterprise.",

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
    "a11y.github": "GitHub",
    "a11y.linkedin": "LinkedIn",

    "section.about": "Sobre mí",
    "section.projects": "Proyectos",
    "section.stack": "Stack técnico",
    "section.experience": "Experiencia",
    "section.contact": "Contacto",

    "about.focus": "En qué me enfoco",
    "about.principles": "Cómo trabajo",

    "projects.problem": "Problema",
    "projects.approach": "Enfoque",
    "projects.challenge": "Reto",
    "projects.outcome": "Resultado",
    "projects.differently": "Diferente",
    "projects.demo": "demo",
    "projects.repo": "repo",

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
