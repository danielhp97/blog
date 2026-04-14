import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defineConfig, sharpImageService } from "astro/config";
import remarkToc from "remark-toc";


// https://astro.build/config
export default defineConfig({
  site: 'https://danielhp97.github.io',
  base: '/blog',
  trailingSlash: "ignore",
  image: { service: sharpImageService() },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    react(),
    sitemap(),
    AutoImport({
      imports: [
        "@/shortcodes/Accordion",
        "@/shortcodes/Button",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
        "@/shortcodes/PhotoGrid",
        "@/shortcodes/GooglePhotosAlbum",
        "@/shortcodes/TrekMap",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [remarkToc],
    shikiConfig: { theme: "one-dark-pro", wrap: true },
  },
});
