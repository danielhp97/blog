import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://danielhp97.github.io',
  base: '/blog',
  integrations: [mdx()],
});
