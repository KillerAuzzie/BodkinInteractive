document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");

  hamburgerBtn.addEventListener("click", function () {
      navMenu.classList.toggle("active");
  });

  // Fetch announcements from your webhook (limited functionality)
  fetch("https://discord.com/api/webhooks/1345368384279281737/PZ-d2zZopao3CkAt-Z3t-n-5hFz9snDXNy4QmUZLATwQnpBszu56nIPbkqG4KwNlv3tB")  // Replace with actual webhook forwarding URL
      .then(response => response.json())
      .then(data => {
          const announcementContainer = document.getElementById("discord-announcements");
          if (data.length > 0) {
              announcementContainer.innerHTML = `<p>${data[0].content}</p>`;
          } else {
              announcementContainer.innerHTML = "<p>No announcements yet.</p>";
          }
      })
      .catch(error => console.error("Error fetching Discord messages:", error));
});
