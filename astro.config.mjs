// @ts-check
import { defineConfig } from 'astro/config';

import { satteri } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { hastExternalLinks } from './src/lib/hast-external-links.ts';

const buildId =
	process.env.CF_PAGES_COMMIT_SHA?.slice(0, 8) ||
	process.env.GITHUB_SHA?.slice(0, 8) ||
	process.env.BUILD_ID ||
	'dev';

// https://astro.build/config
export default defineConfig({
  site: 'https://hautoo.storyofai.net',
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: satteri({
      hastPlugins: [hastExternalLinks],
    }),
  },
  vite: {
    define: {
      'import.meta.env.BUILD_ID': JSON.stringify(buildId),
    },
  },
});

