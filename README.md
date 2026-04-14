# Blog

Personal blog built with [Astro](https://astro.build), Tailwind CSS, MDX, and React. Deployed to GitHub Pages at `https://danielhp97.github.io/blog`.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Creating a New Post](#creating-a-new-post)
- [Frontmatter Reference](#frontmatter-reference)
- [Adding Images](#adding-images)
- [Shortcodes](#shortcodes)
  - [PhotoGrid](#photogrid)
  - [GooglePhotosAlbum](#googlephotosalbum)
  - [TrekMap](#trekmap)
  - [YouTube](#youtube)
  - [Notice](#notice)
  - [Tabs](#tabs)
  - [Button](#button)
- [Running Locally](#running-locally)
- [Deploying](#deploying)

---

## Project Structure

```
src/
├── content/
│   └── posts/          ← your blog posts (.md or .mdx)
├── layouts/
│   └── shortcodes/     ← reusable components for use inside posts
public/
└── images/
    └── posts/          ← images referenced in posts
```

---

## Creating a New Post

1. **Create a file** in `src/content/posts/`.
   - Use `.md` for plain text posts.
   - Use `.mdx` if you need interactive components (maps, photo grids, YouTube, etc.).

2. **Name the file** using kebab-case — this becomes the URL slug:
   ```
   src/content/posts/my-trip-to-japan.mdx
   ```
   → published at `/blog/my-trip-to-japan`

3. **Add the frontmatter** at the top of the file (see [Frontmatter Reference](#frontmatter-reference) below).

4. **Write your content** in Markdown below the frontmatter.

### Minimal example — `src/content/posts/my-trip-to-japan.mdx`

```mdx
---
title: "My Trip to Japan"
description: "Two weeks in Tokyo, Kyoto, and the Japanese Alps."
date: 2026-05-01T00:00:00Z
image: "/images/posts/japan-cover.jpg"
categories: ["travel"]
tags: ["japan", "asia", "hiking"]
draft: false
---

Opening paragraph here.

## Day 1

More content...
```

---

## Frontmatter Reference

| Field | Required | Description |
|---|---|---|
| `title` | yes | Post title shown in the header and browser tab |
| `description` | no | Short summary shown in post cards and SEO meta |
| `meta_title` | no | Override the `<title>` tag (defaults to `title`) |
| `date` | no | Publication date in ISO 8601 format |
| `image` | no | Cover image path — must start with `/images/` |
| `categories` | no | Array of category strings, e.g. `["travel", "hiking"]` |
| `tags` | no | Array of tag strings, e.g. `["patagonia", "chile"]` |
| `authors` | no | Array of author names (defaults to Daniel Henriques Pereira) |
| `draft` | no | Set to `true` to hide the post from listings |

---

## Adding Images

### 1. Store the image

Put image files in `public/images/posts/`:

```
public/images/posts/japan-cover.jpg
public/images/posts/tokyo-temple.jpg
```

### 2. Reference in frontmatter (cover image)

```yaml
image: "/images/posts/japan-cover.jpg"
```

### 3. Inline image in Markdown

```markdown
![Alt text](/images/posts/tokyo-temple.jpg)
```

### 4. Side-by-side images with `PhotoGrid` (MDX only)

Use the `PhotoGrid` shortcode for 1 or 2 photos with optional captions — see [PhotoGrid](#photogrid) below.

> **Tip:** `PhotoGrid` only shows the first 2 photos from the array. For a full gallery, use a [GooglePhotosAlbum](#googlephotosalbum) link instead.

---

## Shortcodes

All shortcodes are **auto-imported** — no import statement needed. They only work in `.mdx` files.

---

### PhotoGrid

Displays 1 or 2 photos side by side with optional captions.

```mdx
<PhotoGrid photos={[
  { src: "/images/posts/photo-1.jpg", alt: "A mountain", caption: "Summit at dawn" },
  { src: "/images/posts/photo-2.jpg", alt: "A lake",    caption: "Glacial lake below" },
]} />
```

| Prop | Type | Description |
|---|---|---|
| `photos` | `Photo[]` | Array of photo objects (max 2 displayed) |
| `photos[].src` | string | Path to the image (relative to `public/`) |
| `photos[].alt` | string | Alt text for accessibility |
| `photos[].caption` | string | Optional caption shown below the image |

---

### GooglePhotosAlbum

Renders a styled link card pointing to a Google Photos shared album.

```mdx
<GooglePhotosAlbum
  url="https://photos.app.goo.gl/YOUR_ALBUM_ID"
  title="Japan 2026 — Full Album"
  description="200+ photos from Tokyo, Kyoto, and the Alps."
/>
```

| Prop | Required | Description |
|---|---|---|
| `url` | yes | The shared Google Photos album link |
| `title` | no | Card title (defaults to "Photo Album") |
| `description` | no | Short description shown under the title |

**How to get a Google Photos share link:**
1. Open Google Photos → select the album → click the share icon.
2. Choose "Create link" → copy the link.
3. Paste it as the `url` prop.

---

### TrekMap

An interactive Leaflet map built specifically for the Torres del Paine W / O Circuit routes. It includes hardcoded POIs and route lines and does not take props.

```mdx
<TrekMap client:only="react" />
```

> `client:only="react"` is required — Leaflet needs the browser DOM and cannot run server-side.

**To create a map for a different route**, duplicate `src/layouts/shortcodes/TrekMap.tsx`, replace the `POIS`, `W_ROUTE`, and `O_ROUTE` arrays with your own coordinates, and register the new component in `astro.config.mjs` under `AutoImport`.

---

### YouTube

Embeds a YouTube video using a lightweight custom element (no cookie tracking on load).

```mdx
<Youtube id="dQw4w9WgXcQ" title="Video title for accessibility" />
```

| Prop | Required | Description |
|---|---|---|
| `id` | yes | The YouTube video ID (the part after `?v=`) |
| `title` | yes | Accessible title for the embed |

---

### Notice

Callout box for tips, warnings, or info.

```mdx
<Notice type="tip">
  Book campsites months in advance — they sell out fast.
</Notice>

<Notice type="warning">
  Weather in Patagonia changes without warning. Always carry rain gear.
</Notice>
```

| `type` value | Use for |
|---|---|
| `tip` | Helpful hints |
| `warning` | Cautions and risks |
| `info` | Background context |
| `note` | General side notes |

---

### Tabs

Group content into switchable tabs.

```mdx
<Tabs>
  <Tab name="W Trek">
    4–5 days, ~80 km. Covers all three main highlights.
  </Tab>
  <Tab name="O Circuit">
    8–10 days, ~130 km. Full loop including the remote back side.
  </Tab>
</Tabs>
```

---

### Button

A styled link button.

```mdx
<Button label="Book on CONAF" link="https://reservas.conaf.cl" style="solid" />
```

| Prop | Description |
|---|---|
| `label` | Button text |
| `link` | URL the button points to |
| `style` | `"solid"` (filled) or `"outline"` |

---

## Running Locally

```bash
npm install
npm run dev
```

The site is served at `http://localhost:4321/blog`.

---

## Deploying

Push to `master`. GitHub Actions builds and deploys automatically to `https://danielhp97.github.io/blog`.
