import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { modifiedDateSchema } from "./cms/fields/dates";
import { menuSchema } from "./cms/fields/menu";
import {
	entryBackgroundSchema,
} from "./cms/fields/page-background";
import { seoSchema } from "./cms/fields/seo";
import { entryLayoutSchema } from "./cms/fields/content-width";
import {
	entryHeroSchema,
	entryTocSchema,
} from "./cms/fields/site-config";
import { entryStatusSchema } from "./cms/fields/status";

const publishDateSchema = z.coerce.date().optional();

/** Lift legacy flat `contentWidth` into `layout.contentWidth`. */
function normalizeEntryLayout(raw: unknown): unknown {
	if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
		return raw;
	}
	const obj = raw as Record<string, unknown>;
	if (!("contentWidth" in obj)) {
		return raw;
	}
	const { contentWidth, layout, ...rest } = obj;
	const layoutObj =
		layout && typeof layout === "object" && !Array.isArray(layout)
			? { ...(layout as Record<string, unknown>) }
			: {};
	if (contentWidth !== undefined && layoutObj.contentWidth === undefined) {
		layoutObj.contentWidth = contentWidth;
	}
	return {
		...rest,
		...(Object.keys(layoutObj).length > 0 ? { layout: layoutObj } : {}),
	};
}

const pages = defineCollection({
	loader: glob({ pattern: "**/index.md", base: "./src/content/pages" }),
	schema: z.preprocess(
		normalizeEntryLayout,
		z.object({
			title: z.string(),
			description: z.string().optional(),
			/** draft | published | future | trash */
			status: entryStatusSchema,
			/** Schedule date when status is `future`. */
			publishDate: publishDateSchema,
			/** Last editorial change (SEO meta; not shown in page UI yet). */
			modifiedDate: modifiedDateSchema,
			/** Parent page id (folder slug), builds nested URLs like `/parent/child/`. */
			parent: z.string().optional(),
			/** Hero overrides; omit = Design → Hero → Seiten. */
			hero: entryHeroSchema,
			/** TOC overrides; omit = Content → TOC → Seiten. */
			toc: entryTocSchema,
			/**
			 * Full-viewport background. CMS may store `/assets/…` (shared library)
			 * or an entry-relative filename — resolved via resolveCmsImage.
			 */
			background: entryBackgroundSchema,
			/**
			 * Width + optional spacing. Omit fields = Content → Breite / Abstand,
			 * or auto `wide` when the body has listing embeds.
			 */
			layout: entryLayoutSchema,
			/** Shared SEO object (same shape as Sveltia `&field_seo`). */
			seo: seoSchema.optional(),
			/** Raw HTML/JS/CSS injected before `</head>` (trusted CMS editors). */
			headCode: z.string().optional(),
			/** Raw HTML/JS/CSS injected before `</body>` (trusted CMS editors). */
			footerCode: z.string().optional(),
		}),
	),
});

const menus = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/menus" }),
	schema: menuSchema,
});

const tags = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/tags" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		modifiedDate: modifiedDateSchema,
	}),
});

/** Hierarchical article categories (optional parent = another category slug). */
const categories = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/categories" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		/** Parent category slug (flat files; URL stays `/kategorien/<slug>/`). */
		parent: z.string().optional(),
		modifiedDate: modifiedDateSchema,
	}),
});

const articles = defineCollection({
	loader: glob({ pattern: "**/index.md", base: "./src/content/articles" }),
	schema: ({ image }) =>
		z.preprocess(
			normalizeEntryLayout,
			z.object({
				title: z.string(),
				summary: z.string().optional(),
				pubDate: z.coerce.date(),
				/** draft | published | future | trash (`pubDate` gates `future`) */
				status: entryStatusSchema,
				/** Last editorial change (SEO meta; not shown in article UI yet). */
				modifiedDate: modifiedDateSchema,
				/** Entry-relative only (Variante B) — use `image()` for optimization. */
				heroImage: image().optional(),
				/** Hero overrides; omit = Design → Hero → Artikel. */
				hero: entryHeroSchema,
				/** TOC overrides; omit = Content → TOC → Artikel. */
				toc: entryTocSchema,
				background: entryBackgroundSchema,
				/** Category slugs (hierarchical taxonomy; see `categories` collection). */
				categories: z.array(z.string()).default([]),
				tags: z.array(z.string()).default([]),
				/**
				 * Where to show tags on the article page.
				 * Categories always appear in the hero under the description.
				 */
				tagPlacement: z.enum(["hero", "after", "both"]).default("hero"),
				videoProvider: z.enum(["youtube", "vimeo"]).optional(),
				videoId: z.string().optional(),
				seo: seoSchema.optional(),
				/**
				 * Width + optional spacing. Omit fields = Content → Breite / Abstand,
				 * or auto `wide` when the body has listing embeds.
				 */
				layout: entryLayoutSchema,
			}),
		),
});

const glossar = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/glossar" }),
	schema: z.object({
		title: z.string(),
		definition: z.string(),
		status: entryStatusSchema,
		publishDate: publishDateSchema,
		modifiedDate: modifiedDateSchema,
		relatedArticles: z.array(z.string()).default([]),
		/** Tag slugs; same slug as glossar id is added automatically when a tag exists. */
		relatedTags: z.array(z.string()).default([]),
		seo: seoSchema.optional(),
	}),
});

/** Reusable CMS snippets; injected via `{{block id="slug"}}` (no own URL). */
const blocks = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/blocks" }),
	schema: z.object({
		title: z.string(),
		status: entryStatusSchema,
		publishDate: publishDateSchema,
		modifiedDate: modifiedDateSchema,
	}),
});

export const collections = {
	pages,
	menus,
	categories,
	tags,
	articles,
	glossar,
	blocks,
};
