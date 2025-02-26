document.addEventListener("DOMContentLoaded", () => {
    // If you want advanced smooth scrolling beyond CSS:
    const navLinks = document.querySelectorAll("nav a[href^='#']");
    
    navLinks.forEach(link => {
      link.addEventListener("click", (evt) => {
        evt.preventDefault();
        const targetId = link.getAttribute("href");
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  });
  