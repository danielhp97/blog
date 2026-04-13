import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://username.github.io', // replace with your GitHub username
  integrations: [mdx()],
});
