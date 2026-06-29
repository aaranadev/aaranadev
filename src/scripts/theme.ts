export {};

type Theme = "dark" | "light";

const STORAGE_KEY = "theme";
const lightQuery = window.matchMedia("(prefers-color-scheme: light)");

function getStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  return lightQuery.matches ? "light" : "dark";
}

function currentTheme(): Theme {
  const attr = document.documentElement.dataset.theme;
  return attr === "light" || attr === "dark" ? attr : systemTheme();
}

function apply(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(theme === "light"));
  });
}

function setTheme(theme: Theme): void {
  apply(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore persistence errors (private mode, etc.) */
  }
}

apply(getStored() ?? currentTheme());

document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
  btn.addEventListener("click", () => {
    setTheme(currentTheme() === "dark" ? "light" : "dark");
  });
});

// Follow the OS only while the visitor has not made an explicit choice.
lightQuery.addEventListener("change", (event) => {
  if (!getStored()) apply(event.matches ? "light" : "dark");
});
