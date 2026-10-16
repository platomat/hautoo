// @ts-check
import { defineConfig } from 'astro/config';

import { satteri } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { hastExternalLinks } from './src/lib/hast-external-links.ts';
import { hastHeadingIds } from './src/lib/hast-heading-ids.ts';
import { sitemapPageFilter } from './src/lib/sitemap.ts';
import { loadAstroRedirects } from './scripts/build-redirects.mjs';

const buildId =
	process.env.CF_PAGES_COMMIT_SHA?.slice(0, 8) ||
	process.env.GITHUB_SHA?.slice(0, 8) ||
	process.env.BUILD_ID ||
	'dev';

// https://astro.build/config
export default defineConfig({
  site: 'https://hautoo.storyofai.net',
  redirects: loadAstroRedirects(),
  build: {
    // Avoid a render-blocking CSS round-trip (Lighthouse FCP/LCP).
    inlineStylesheets: 'always',
  },
  integrations: [
    mdx(),
    sitemap({
      filter: sitemapPageFilter,
    }),
  ],
  markdown: {
    processor: satteri({
      // Heading IDs before Satteri's built-in slugger (keeps pre-set ASCII ids).
      hastPlugins: [hastHeadingIds, hastExternalLinks],
    }),
  },
  vite: {
    define: {
      'import.meta.env.BUILD_ID': JSON.stringify(buildId),
    },
  },
});

