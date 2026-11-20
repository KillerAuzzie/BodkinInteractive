# Bodkin Interactive

Welcome to the official repository for [Bodkin Interactive](https://bodkininteractive.com/), an independent studio behind **Fields of Renown** and **BoddyFit**.

## About Us

Bodkin Interactive builds immersive games and practical apps. Our current projects:

- **Fields of Renown**: a medieval RPG set in 13th-century Gwynedd, North West Wales, opening with a shipwreck and an island to survive and escape
- **BoddyFit**: an offline-first Run + Gym Coach for Android

## Fields of Renown

**Fields of Renown** opens with a storm and a shipwreck. The island off the Welsh coast is the game's first chapter and its tutorial:

- **Survive** the days: fishing, campfires, sleep, prayer, and torches against the dark
- **Fight** with directional, stamina-driven sword combat and archery
- **Weather** storms with lightning, rain, and rough seas
- **Escape** on day ten: hold off the bandits, repair the longboat, and sail for the mainland

Beyond the island lies Gwynedd: trade, farming, skills, and renown to earn.

## Repository Overview

This repository contains the source for [bodkininteractive.com](https://bodkininteractive.com/). The root page is a studio hub; product pages live under their own paths.

### Structure

Pretty URLs on GitHub Pages use folders with `index.html` (e.g. `/boddyfit/`). Root `*.html` stubs redirect old links.

- **`index.html`** / **`hub.css`**: Studio hub
- **`BIMS/`** (+ root `bims.css`): BIMS collaborative mind-map marketing and legal (Privacy / Terms / Support); app at bims.bodkininteractive.com
- **`fields-of-renown/`** (+ root `fields-of-renown.css`): Game marketing site; its Dev log section lists the latest posts automatically
- **`_posts/`**: Dev log posts in Markdown, published at `/devlog/<slug>/`. See [WRITING-POSTS.md](WRITING-POSTS.md)
- **`devlog/`**: Dev log index with tag filters; RSS at `/devlog/feed.xml`
- **`_layouts/`**, **`_includes/`**, **`_config.yml`**: Jekyll setup that GitHub Pages builds on push
- **`boddyfit/`** (+ root `boddyfit.css` / `boddyfit.js`): BoddyFit landing
- **`privacy/`**, **`terms/`**, **`legal/`**: BoddyFit legal docs
- **`contact/`**: Contact form
- **`style.css`** / **`script.js`**: Shared styles and scripts
- **`Assets/`**: Images and media
- **`robots.txt`** / **`sitemap.xml`** / **`404.html`**: SEO and error handling

### Dev log

```bash
./new-post.sh "Post title"   # start a post from the template
./preview.sh                 # preview locally at http://localhost:4000 (needs Docker)
```

Full guide: [WRITING-POSTS.md](WRITING-POSTS.md).
