export {};

const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const menu = document.querySelector<HTMLElement>("[data-menu]");
const closeBtn = menu?.querySelector<HTMLButtonElement>("[data-menu-close]");

function focusableIn(root: HTMLElement): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
}

// Make everything except the menu inert while it is open. This keeps screen
// reader and keyboard focus contained within the overlay (a focus trap).
function setBackgroundInert(inert: boolean): void {
  if (!menu) return;
  for (const node of Array.from(document.body.children)) {
    if (node === menu || node.tagName === "SCRIPT") continue;
    if (inert) node.setAttribute("inert", "");
    else node.removeAttribute("inert");
  }
}

function setOpen(open: boolean, restoreFocus = true): void {
  if (!menu || !toggle) return;
  menu.dataset.open = String(open);
  toggle.setAttribute("aria-expanded", String(open));
  document.documentElement.style.overflow = open ? "hidden" : "";
  setBackgroundInert(open);

  if (open) {
    (closeBtn ?? menu).focus();
  } else if (restoreFocus) {
    toggle.focus();
  }
}

if (toggle && menu) {
  toggle.addEventListener("click", () => setOpen(menu.dataset.open !== "true"));

  closeBtn?.addEventListener("click", () => setOpen(false));

  // Activating a link navigates away/jumps to an anchor, so let the browser
  // manage focus instead of forcing it back to the toggle.
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false, false));
  });

  document.addEventListener("keydown", (event) => {
    if (menu.dataset.open !== "true") return;

    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = focusableIn(menu);
    if (focusable.length === 0) return;

    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  });
}
