document.addEventListener("DOMContentLoaded", function () {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
  
    hamburgerBtn.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  });
  