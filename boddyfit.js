(function () {
  const lightbox = document.getElementById("bf-lightbox");
  if (!lightbox) return;

  const imgEl = document.getElementById("bf-lightbox-img");
  const captionEl = document.getElementById("bf-lightbox-caption");
  const closeBtn = lightbox.querySelector(".bf-lightbox__close");
  const triggers = Array.from(document.querySelectorAll(".bf-screens .bf-phone__zoom"));
  if (!triggers.length || !imgEl || !captionEl || !closeBtn) return;

  let index = 0;
  let lastFocus = null;
  let scrollY = 0;

  function captionFor(button) {
    const fig = button.closest(".bf-phone");
    const strong = fig && fig.querySelector("figcaption strong");
    const text = fig && fig.querySelector("figcaption");
    if (!text) return "";
    const title = strong ? strong.textContent.trim() : "";
    const rest = text.textContent.replace(title, "").trim();
    return title && rest ? title + " — " + rest : text.textContent.trim();
  }

  function focusEl(el) {
    if (!el || typeof el.focus !== "function") return;
    try {
      el.focus({ preventScroll: true });
    } catch (err) {
      el.focus();
    }
  }

  function lockScroll() {
    scrollY = window.scrollY || window.pageYOffset || 0;
    document.body.style.top = "-" + scrollY + "px";
    document.body.classList.add("bf-lightbox-open");
  }

  function unlockScroll() {
    document.body.classList.remove("bf-lightbox-open");
    document.body.style.top = "";
    window.scrollTo(0, scrollY);
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
    focusEl(closeBtn);
  }

  function open(i) {
    lastFocus = document.activeElement;
    lockScroll();
    show(i);
  }

  function close() {
    lightbox.hidden = true;
    imgEl.removeAttribute("src");
    unlockScroll();
    focusEl(lastFocus);
  }

  triggers.forEach(function (button, i) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      open(i);
    });
  });

  lightbox.addEventListener("click", function (e) {
    if (e.target.closest("[data-bf-lightbox-close]")) {
      e.preventDefault();
      close();
      return;
    }
    if (e.target.closest("[data-bf-lightbox-prev]")) {
      e.preventDefault();
      show(index - 1);
      return;
    }
    if (e.target.closest("[data-bf-lightbox-next]")) {
      e.preventDefault();
      show(index + 1);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
})();
