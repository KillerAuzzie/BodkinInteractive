document.addEventListener("DOMContentLoaded", function () {
    // ————————————————
    // Configuration - Update these as needed
    const YOUTUBE_CONFIG = {
        channelID: "UCKBOMEqtVu2Z87FnDAhy43A",
        channelHandle: "@KillerAuzzie",
        // Optional: Set a specific video ID to always show (leave empty for auto-fetch)
        manualVideoId: "", // e.g., "dQw4w9WgXcQ"
        // If true, will always show the channel link instead of trying to fetch videos
        showChannelOnly: false
    };

    // ————————————————
    // Hamburger menu toggle with accessibility
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("active");
            hamburgerBtn.setAttribute("aria-expanded", isOpen);

            if (isOpen) {
                const firstLink = navMenu.querySelector("a");
                if (firstLink) firstLink.focus();
            }
        });
    }

    // Fetch Discord announcements (optional section)
    const discordContainer = document.getElementById("discord-announcements");
    if (discordContainer) {
        fetch("https://discord.com/api/webhooks/1345368384279281737/PZ-d2zZopao3CkAt-Z3t-n-5hFz9snDXNy4QmUZLATwQnpBszu56nIPbkqG4KwNlv3tB")
            .then(res => res.json())
            .then(data => {
                discordContainer.innerHTML = data.length
                    ? `<p>${data[0].content}</p>`
                    : "<p>No announcements yet.</p>";
            })
            .catch(err => console.error("Error fetching Discord messages:", err));
    }

    // Fetch latest YouTube video with multiple fallback methods
    const videoContainer = document.getElementById("latest-video");

    if (videoContainer) {
        videoContainer.classList.add("loading-shimmer");
        videoContainer.innerHTML = `
            <div style="height: 315px; display: flex; align-items: center; justify-content: center; color: #666;">
                <p>Loading latest video...</p>
            </div>
        `;

        function showManualVideo(videoId) {
            return `
                <iframe width="560" height="315"
                    src="https://www.youtube.com/embed/${videoId}"
                    frameborder="0" allowfullscreen
                    loading="lazy"
                    title="Bodkin Interactive Video">
                </iframe>
            `;
        }

        async function fetchWithRSS2JSON() {
            const feedURL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CONFIG.channelID}`;
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedURL)}`);
            const data = await response.json();

            if (data.status !== "ok" || !data.items || data.items.length === 0) {
                throw new Error("RSS2JSON failed or no items found");
            }

            return data.items[0].link;
        }

        async function fetchWithAlternativeRSS() {
            const feedURL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CONFIG.channelID}`;
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feedURL)}`);
            const data = await response.json();

            if (!data.contents) {
                throw new Error("Alternative RSS failed");
            }

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, "text/xml");
            const entries = xmlDoc.querySelectorAll("entry");

            if (entries.length === 0) {
                throw new Error("No entries found in XML");
            }

            return entries[0].querySelector("link").getAttribute("href");
        }

        function showChannelEmbed() {
            return `
                <div style="padding: 40px; text-align: center; background: rgba(30, 30, 30, 0.8); border-radius: 10px;">
                    <h3 style="color: #ff6600; margin-bottom: 15px;">Latest Updates</h3>
                    <p style="margin-bottom: 20px; color: #ccc;">Visit our YouTube channel for the latest development videos and updates!</p>
                    <a href="https://www.youtube.com/${YOUTUBE_CONFIG.channelHandle}" target="_blank" rel="noopener"
                       style="display: inline-block; background: linear-gradient(135deg, #ff0000, #cc0000); color: white;
                              padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                        Visit YouTube Channel
                    </a>
                </div>
            `;
        }

        async function loadYouTubeVideo() {
            if (YOUTUBE_CONFIG.showChannelOnly) {
                videoContainer.classList.remove("loading-shimmer");
                videoContainer.innerHTML = showChannelEmbed();
                return;
            }

            if (YOUTUBE_CONFIG.manualVideoId) {
                videoContainer.classList.remove("loading-shimmer");
                videoContainer.innerHTML = showManualVideo(YOUTUBE_CONFIG.manualVideoId);
                return;
            }

            try {
                const videoLink = await fetchWithRSS2JSON();
                const videoId = new URL(videoLink).searchParams.get("v");
                videoContainer.classList.remove("loading-shimmer");
                videoContainer.innerHTML = showManualVideo(videoId);
            } catch (error1) {
                console.log("RSS2JSON failed, trying alternative...", error1);
                try {
                    const videoLink = await fetchWithAlternativeRSS();
                    const videoId = new URL(videoLink).searchParams.get("v");
                    videoContainer.classList.remove("loading-shimmer");
                    videoContainer.innerHTML = showManualVideo(videoId);
                } catch (error2) {
                    console.log("Alternative RSS failed, showing channel link...", error2);
                    videoContainer.classList.remove("loading-shimmer");
                    videoContainer.innerHTML = showChannelEmbed();
                }
            }
        }

        loadYouTubeVideo();
    }

    // ————————————————
    // Active link highlighting
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("#nav-menu ul li a");

    function highlightNav() {
        const scrollPosition = window.pageYOffset;
        const currentHash = window.location.hash.slice(1);
        let currentSectionId = "";

        if (currentHash && sections.length > 0) {
            const hashSection = document.getElementById(currentHash);
            if (hashSection && hashSection.tagName === "SECTION") {
                currentSectionId = currentHash;
            }
        }

        if (!currentSectionId) {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop - 150 && scrollPosition < sectionBottom - 50) {
                    currentSectionId = section.id;
                }
            });

            if (!currentSectionId) {
                for (let i = sections.length - 1; i >= 0; i--) {
                    const section = sections[i];
                    if (scrollPosition >= section.offsetTop - 150) {
                        currentSectionId = section.id;
                        break;
                    }
                }
            }
        }

        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (!href || !href.startsWith("#")) {
                return;
            }
            const isActive = href === `#${currentSectionId}`;
            link.classList.toggle("active", isActive);
            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    window.addEventListener("scroll", highlightNav);
    window.addEventListener("resize", highlightNav);
    highlightNav();

    window.addEventListener("hashchange", () => {
        setTimeout(highlightNav, 100);
    });

    // ————————————————
    // Back to top button
    const backToTopButton = document.getElementById("back-to-top");

    if (backToTopButton) {
        function toggleBackToTop() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add("visible");
            } else {
                backToTopButton.classList.remove("visible");
            }
        }

        backToTopButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        window.addEventListener("scroll", toggleBackToTop);
    }

    // ————————————————
    // Mobile menu
    if (navMenu && hamburgerBtn) {
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 900) {
                    navMenu.classList.remove("active");
                    hamburgerBtn.setAttribute("aria-expanded", "false");
                }
            });
        });

        document.addEventListener("click", (event) => {
            if (!hamburgerBtn.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove("active");
                hamburgerBtn.setAttribute("aria-expanded", "false");
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                hamburgerBtn.setAttribute("aria-expanded", "false");
                hamburgerBtn.focus();
            }
        });
    }

    // ————————————————
    // Fade-in for legacy card selectors (blog / older pages)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll(".feature-card, .blog-preview-card, .supporter-card-enhanced, .roadmap-item").forEach(el => {
        observer.observe(el);
    });
});
