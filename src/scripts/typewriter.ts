export {};

const elements = document.querySelectorAll<HTMLElement>("[data-typewriter]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

elements.forEach((el) => {
  const text = el.dataset.text ?? el.textContent ?? "";
  el.classList.add("caret");

  if (reduceMotion) {
    el.textContent = text;
    return;
  }

  const speed = Number(el.dataset.speed ?? 42);
  const delay = Number(el.dataset.delay ?? 220);
  el.textContent = "";

  let i = 0;
  const tick = (): void => {
    el.textContent = text.slice(0, i);
    i += 1;
    if (i <= text.length) window.setTimeout(tick, speed);
  };
  window.setTimeout(tick, delay);
});
