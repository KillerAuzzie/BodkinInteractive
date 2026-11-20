# Writing a dev log post

Posts are plain Markdown files in `_posts/`. Push one to `main` and GitHub Pages formats it in the
Fields of Renown style, lists it at **/devlog/**, shows it in the "Dev log" section of the game page,
adds it to the RSS feed and sitemap, and builds link previews for Discord and socials. Nothing else
to update by hand.

## The quick way (on this computer)

```bash
./new-post.sh "Fishing is finally fun"
```

That creates `_posts/2026-11-20-fishing-is-finally-fun.md` from the template. Open it, fill in the top
block, write underneath, then:

```bash
git add _posts Assets/img/devlog
git commit -m "Dev log: Fishing is finally fun"
git push
```

It's live a minute or two after the push.

## From the GitHub website (any device, even your phone)

1. Open the repo on GitHub, go into the `_posts` folder, click **Add file → Create new file**.
2. Name it `YYYY-MM-DD-your-title.md`, for example `2026-11-20-fishing-is-finally-fun.md`.
   The date at the front is the post's date, and the rest becomes its link: `/devlog/fishing-is-finally-fun/`.
3. Paste in the contents of `_templates/post.md`, edit it, and **Commit changes** to `main`.

To add screenshots from the website, open `Assets/img/devlog`, **Add file → Upload files**, then use
`/Assets/img/devlog/<file name>` in the post.

## The top block (front matter)

```yaml
---
title: "Fishing is finally fun"
subtitle: "Optional one-liner under the title"
description: "One sentence for the post cards and link previews."
tags: [Fishing, Development]
cover: /Assets/img/devlog/fishing-cover.jpg
---
```

Only `title` is required. `cover` is optional; leave it out for a plain header. Tags turn into the
filter buttons on /devlog/. Reuse the same spelling to group posts together.

## What you can write

| You type | You get |
| --- | --- |
| `## Heading` / `### Smaller heading` | Section headings in the game's display font |
| `**bold**`, `*italic*` | **bold**, *italic* |
| `[text](https://...)` | a link |
| `- item` / `1. item` | bullet / numbered lists |
| `> quote` | an orange-edged pull quote |
| `![what's in it](/Assets/img/devlog/shot.jpg)` | a full-width screenshot |
| `{% include figure.html src="/Assets/img/devlog/shot.jpg" caption="Caption" %}` | screenshot with a caption |
| `{% include youtube.html id="dQw4w9WgXcQ" %}` | an embedded YouTube video (the id is after `watch?v=`) |
| a Markdown table | a styled table |
| `---` on its own line | a divider |

`_templates/post.md` has an example of every one of these.

## Drafts

Put a post in `_drafts/` (no date needed in the file name) to keep it off the live site. When it's
ready, move it into `_posts/` with a date in front of the name. `./preview.sh --drafts` shows drafts locally.

## Previewing before you push

```bash
./preview.sh
```

Then open http://localhost:4000/devlog/. It uses GitHub's own Pages build through Docker, so what you
see is what goes live. Ctrl+C stops it.

## Tips

- Keep images under ~500 KB (JPG for screenshots). Wide 16:9 shots make the best covers.
- A post dated in the future won't appear until that date has passed *and* the site is rebuilt by a later push.
- If a post doesn't show up, check the file name has the `YYYY-MM-DD-` date and ends in `.md`,
  and that the top block starts and ends with `---`.
