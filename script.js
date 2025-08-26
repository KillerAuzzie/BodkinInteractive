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
    
    hamburgerBtn.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");
        hamburgerBtn.setAttribute("aria-expanded", isOpen);
        
        // Focus management for accessibility
        if (isOpen) {
            const firstLink = navMenu.querySelector("a");
            if (firstLink) firstLink.focus();
        }
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

    // Fetch latest YouTube video with multiple fallback methods
    const videoContainer = document.getElementById("latest-video");
    
    // Add loading shimmer
    videoContainer.classList.add("loading-shimmer");
    videoContainer.innerHTML = `
        <div style="height: 315px; display: flex; align-items: center; justify-content: center; color: #666;">
            <p>Loading latest video...</p>
        </div>
    `;

    // Method 1: Show manual video if specified
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

    // Method 2: Try RSS2JSON API
    async function fetchWithRSS2JSON() {
        const feedURL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CONFIG.channelID}`;
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedURL)}`);
        const data = await response.json();
        
        if (data.status !== 'ok' || !data.items || data.items.length === 0) {
            throw new Error('RSS2JSON failed or no items found');
        }
        
        return data.items[0].link;
    }

    // Method 3: Try alternative RSS service
    async function fetchWithAlternativeRSS() {
        const feedURL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CONFIG.channelID}`;
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feedURL)}`);
        const data = await response.json();
        
        if (!data.contents) {
            throw new Error('Alternative RSS failed');
        }
        
        // Parse XML manually
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");
        const entries = xmlDoc.querySelectorAll('entry');
        
        if (entries.length === 0) {
            throw new Error('No entries found in XML');
        }
        
        const videoLink = entries[0].querySelector('link').getAttribute('href');
        return videoLink;
    }

    // Method 4: Show channel link instead
    function showChannelEmbed() {
        return `
            <div style="padding: 40px; text-align: center; background: rgba(30, 30, 30, 0.8); border-radius: 10px;">
                <h3 style="color: #ff6600; margin-bottom: 15px;">Latest Updates</h3>
                <p style="margin-bottom: 20px; color: #ccc;">Visit our YouTube channel for the latest development videos and updates!</p>
                <a href="https://www.youtube.com/${YOUTUBE_CONFIG.channelHandle}" target="_blank" rel="noopener" 
                   style="display: inline-block; background: linear-gradient(135deg, #ff0000, #cc0000); color: white; 
                          padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                    🎥 Visit YouTube Channel
                </a>
            </div>
        `;
    }

    // Try methods in sequence
    async function loadYouTubeVideo() {
        // Check if we should show channel only
        if (YOUTUBE_CONFIG.showChannelOnly) {
            videoContainer.classList.remove("loading-shimmer");
            videoContainer.innerHTML = showChannelEmbed();
            return;
        }
        
        // Check if manual video ID is specified
        if (YOUTUBE_CONFIG.manualVideoId) {
            videoContainer.classList.remove("loading-shimmer");
            videoContainer.innerHTML = showManualVideo(YOUTUBE_CONFIG.manualVideoId);
            return;
        }
        
        try {
            // Try RSS2JSON first
            const videoLink = await fetchWithRSS2JSON();
            const videoId = new URL(videoLink).searchParams.get("v");
            
            videoContainer.classList.remove("loading-shimmer");
            videoContainer.innerHTML = showManualVideo(videoId);
            
        } catch (error1) {
            console.log("RSS2JSON failed, trying alternative...", error1);
            
            try {
                // Try alternative RSS service
                const videoLink = await fetchWithAlternativeRSS();
                const videoId = new URL(videoLink).searchParams.get("v");
                
                videoContainer.classList.remove("loading-shimmer");
                videoContainer.innerHTML = showManualVideo(videoId);
                
            } catch (error2) {
                console.log("Alternative RSS failed, showing channel link...", error2);
                
                // Show channel link as final fallback
                videoContainer.classList.remove("loading-shimmer");
                videoContainer.innerHTML = showChannelEmbed();
            }
        }
    }

    // Start the loading process
    loadYouTubeVideo();

    // ————————————————
    // Active link highlighting
    const header = document.querySelector("header");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("#nav-menu ul li a");

    function highlightNav() {
        // Use the CSS custom property for scroll offset (90px on desktop, 80px on mobile)
        const scrollOffset = getComputedStyle(document.documentElement).getPropertyValue('--scroll-offset').trim();
        const offsetValue = parseInt(scrollOffset) || 90; // fallback to 90px if CSS var fails
        let currentSectionId = "";

        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - offsetValue) {
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

    // ————————————————
    // Back to top button functionality
    const backToTopButton = document.getElementById("back-to-top");
    
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add("visible");
        } else {
            backToTopButton.classList.remove("visible");
        }
    }

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", toggleBackToTop);

    // ————————————————
    // Smooth mobile menu animations
    const mobileNavLinks = navMenu.querySelectorAll("a");
    
    mobileNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            // Close mobile menu when link is clicked
            if (window.innerWidth <= 768) {
                navMenu.classList.remove("active");
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!hamburgerBtn.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove("active");
            hamburgerBtn.setAttribute("aria-expanded", "false");
        }
    });

    // Handle keyboard navigation
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            hamburgerBtn.setAttribute("aria-expanded", "false");
            hamburgerBtn.focus();
        }
    });

    // ————————————————
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Observe feature cards and roadmap items
    document.querySelectorAll(".feature-card, .roadmap-item").forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });
});
