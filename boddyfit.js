(function () {
  const lightbox = document.getElementById("bf-lightbox");
  if (!lightbox) return;

  const imgEl = document.getElementById("bf-lightbox-img");
  const captionEl = document.getElementById("bf-lightbox-caption");
  const triggers = Array.from(document.querySelectorAll(".bf-screens .bf-phone__zoom"));
  if (!triggers.length || !imgEl || !captionEl) return;

  let index = 0;
  let lastFocus = null;

  function captionFor(button) {
    const fig = button.closest(".bf-phone");
    const strong = fig && fig.querySelector("figcaption strong");
    const text = fig && fig.querySelector("figcaption");
    if (!text) return "";
    const title = strong ? strong.textContent.trim() : "";
    const rest = text.textContent.replace(title, "").trim();
    return title && rest ? title + " — " + rest : text.textContent.trim();
  }

  function show(i) {
    index = (i + triggers.length) % triggers.length;
    const button = triggers[index];
    const thumb = button.querySelector("img");
    if (!thumb) return;

    imgEl.src = thumb.currentSrc || thumb.src;
    imgEl.alt = thumb.alt || "";
    captionEl.textContent = captionFor(button);
    lightbox.hidden = false;
    document.body.classList.add("bf-lightbox-open");
    lightbox.querySelector(".bf-lightbox__close").focus();
  }

  function open(i) {
    lastFocus = document.activeElement;
    show(i);
  }

  function close() {
    lightbox.hidden = true;
    document.body.classList.remove("bf-lightbox-open");
    imgEl.removeAttribute("src");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  triggers.forEach(function (button, i) {
    button.addEventListener("click", function () {
      open(i);
    });
  });

  lightbox.addEventListener("click", function (e) {
    if (e.target.closest("[data-bf-lightbox-close]")) close();
    if (e.target.closest("[data-bf-lightbox-prev]")) show(index - 1);
    if (e.target.closest("[data-bf-lightbox-next]")) show(index + 1);
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
})();
