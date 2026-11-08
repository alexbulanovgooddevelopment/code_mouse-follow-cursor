document.addEventListener("DOMContentLoaded", () => {
  const isReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  const pointer = document.querySelector(".pointer");
  const coordinates = document.querySelector(".coordinates-value");

  if (isReducedMotion || isTouch || !pointer || !coordinates) return;

  window.addEventListener("pointermove", ({ clientX, clientY }) => {
    pointer.style.setProperty("--mouse-x", `${clientX}px`);
    pointer.style.setProperty("--mouse-y", `${clientY}px`);
    pointer.classList.add("is-visible");

    // pointermove отдаёт дробные значения
    coordinates.textContent = `x: ${Math.round(clientX)} y: ${Math.round(clientY)}`;
  });

  // Прячем кружок, когда мышь покидает окно
  document.documentElement.addEventListener("pointerleave", () => {
    pointer.classList.remove("is-visible");
  });
});
