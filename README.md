# My Blog

Personal blog built with [Astro](https://astro.build), hosted on GitHub Pages.

## Setup

```bash
npm install
npm run dev
```

## Before you publish

1. Open `astro.config.mjs` and replace `username` with your GitHub username
2. Open `src/layouts/BaseLayout.astro` and replace `your name here` with your name

## Writing a post

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: "My post title"
date: 2026-04-13
description: "A short description."
tags: ["travel", "portugal"]
---

Your content here.
```

The filename becomes the URL slug: `my-post.md` → `/blog/my-post`

## Adding a Google Photos album

Rename your post file from `.md` to `.mdx`, then paste your Google Photos embed directly in the content.

## Deploy

Push to GitHub. Set up GitHub Pages in repo Settings → Pages → Source: GitHub Actions.

Add this file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```
