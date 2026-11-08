document.addEventListener("DOMContentLoaded", () => {
  const isReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  const pointer = document.querySelector(".pointer");
  const coordinates = document.querySelector(".coordinates-value");

  if (isReducedMotion || isTouch || !pointer || !coordinates) return;

  let mouseX = 0;
  let mouseY = 0;
  let frame = null;

  window.addEventListener(
    "pointermove",
    ({ clientX, clientY }) => {
      mouseX = clientX;
      mouseY = clientY;

      if (frame !== null) return;

      frame = requestAnimationFrame(() => {
        pointer.style.setProperty("--mouse-x", `${mouseX}px`);
        pointer.style.setProperty("--mouse-y", `${mouseY}px`);

        pointer.classList.add("is-visible");

        coordinates.textContent = `x: ${Math.round(mouseX)} y: ${Math.round(mouseY)}`;

        frame = null;
      });
    },
    { passive: true },
  );

  document.documentElement.addEventListener("pointerleave", () => {
    pointer.classList.remove("is-visible");
  });
});
