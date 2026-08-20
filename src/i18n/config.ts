export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Resolve the active locale from a pathname (e.g. "/es/..." -> "es"). */
export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : defaultLocale;
}

/**
 * Build an absolute in-site path for a given locale.
 * The default locale is served without a prefix; others are prefixed (e.g. "/es").
 */
export function localizedPath(path: string, locale: Locale): string {
  const clean = `/${path.replace(/^\/+/, "")}`.replace(/\/+$/, "") || "/";
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** The same route in the other locale, used by the language switcher. */
export function alternatePath(pathname: string, target: Locale): string {
  const current = getLocaleFromPath(pathname);
  let rest = pathname;
  if (current !== defaultLocale) {
    rest = pathname.replace(new RegExp(`^/${current}`), "") || "/";
  }
  return localizedPath(rest, target);
}

export const localeMeta: Record<Locale, { short: string; name: string; htmlLang: string }> = {
  en: { short: "US", name: "English", htmlLang: "en" },
  es: { short: "ES", name: "Español", htmlLang: "es" },
};
