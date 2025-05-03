document.addEventListener("DOMContentLoaded", function () {
    // Hamburger menu toggle
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    hamburgerBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Fetch Discord announcements
    fetch("https://discord.com/api/webhooks/1345368384279281737/PZ-d2zZopao3CkAt-Z3t-n-5hFz9snDXNy4QmUZLATwQnpBszu56nIPbkqG4KwNlv3tB")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("discord-announcements");
            container.innerHTML = data.length
                ? `<p>${data[0].content}</p>`
                : "<p>No announcements yet.</p>";
        })
        .catch(err => console.error("Error fetching Discord messages:", err));

    // Fetch latest YouTube video
    const channelID = "UCKBOMEqtVu2Z87FnDAhy43A";
    const feedURL = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`;
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feedURL}`)
        .then(res => res.json())
        .then(data => {
            if (data.items.length) {
                const videoId = new URL(data.items[0].link).searchParams.get("v");
                document.getElementById("latest-video").innerHTML = `
                    <iframe width="560" height="315"
                        src="https://www.youtube.com/embed/${videoId}"
                        frameborder="0" allowfullscreen>
                    </iframe>
                `;
            }
        })
        .catch(err => console.error("Error fetching YouTube video:", err));

    // ————————————————
    // Active link highlighting
    const header = document.querySelector("header");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("#nav-menu ul li a");

    function highlightNav() {
        const headerHeight = header.offsetHeight;
        let currentSectionId = "";

        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - headerHeight) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${currentSectionId}`
            );
        });
    }

    window.addEventListener("scroll", highlightNav);
    window.addEventListener("resize", highlightNav);

    // Initial highlight on load
    highlightNav();
});
