// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const buildId =
	process.env.CF_PAGES_COMMIT_SHA?.slice(0, 8) ||
	process.env.GITHUB_SHA?.slice(0, 8) ||
	process.env.BUILD_ID ||
	'dev';

// https://astro.build/config
export default defineConfig({
  site: 'https://hautoo.storyofai.net',
  integrations: [mdx(), sitemap()],
  vite: {
    define: {
      'import.meta.env.BUILD_ID': JSON.stringify(buildId),
    },
  },
});
