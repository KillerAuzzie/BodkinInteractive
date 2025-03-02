document.addEventListener("DOMContentLoaded", function () {
    // Hamburger menu toggle
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");

    hamburgerBtn.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // Fetch Discord announcements
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

    // Fetch latest YouTube video
    const channelID = "UCKBOMEqtVu2Z87FnDAhy43A"; // Replace with your actual channel ID
    const feedURL = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`;

    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feedURL}`)
        .then(response => response.json())
        .then(data => {
            if (data.items.length > 0) {
                const videoUrl = data.items[0].link;
                const videoId = new URL(videoUrl).searchParams.get("v");

                document.getElementById("latest-video").innerHTML = `
                    <iframe width="560" height="315" 
                        src="https://www.youtube.com/embed/${videoId}" 
                        frameborder="0" allowfullscreen>
                    </iframe>
                `;
            }
        })
        .catch(error => console.error("Error fetching YouTube video:", error));
});
