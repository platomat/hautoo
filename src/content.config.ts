import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { modifiedDateSchema } from "./cms/fields/dates";
import { menuSchema } from "./cms/fields/menu";
import {
	cmsImagePathSchema,
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
			 * Width + optional spacing. Omit fields = Design → Inhaltsbreite / Abstand,
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

/** Article authors; profile at `/autoren/<slug>/`. Bio = Markdown body. */
const authors = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/authors" }),
	schema: z.object({
		title: z.string(),
		/** Short meta / listing blurb (optional). */
		description: z.string().optional(),
		/** Local avatar (`/assets/…`). Preferred over Gravatar when set. */
		avatar: cmsImagePathSchema,
		/**
		 * Gravatar: email or https image URL. Downloaded at build into
		 * `src/assets/authors/gravatar/<slug>.*` (see sync-author-avatars.mjs).
		 */
		gravatarUrl: z.string().trim().optional(),
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
	schema: z.preprocess(
		normalizeEntryLayout,
		z.object({
			title: z.string(),
			summary: z.string().optional(),
			pubDate: z.coerce.date(),
			/** draft | published | future | trash (`pubDate` gates `future`) */
			status: entryStatusSchema,
			/** Last editorial change (SEO meta; not shown in article UI yet). */
			modifiedDate: modifiedDateSchema,
			/**
			 * Title image: `/assets/…` (shared pool) or entry-relative (Variante B).
			 * Resolved via `resolveCmsImage` (Astro `image()` cannot load `/assets/`).
			 */
			heroImage: cmsImagePathSchema,
			/** Hero overrides; omit = Design → Hero → Artikel. */
			hero: entryHeroSchema,
			/** TOC overrides; omit = Content → TOC → Artikel. */
			toc: entryTocSchema,
			background: entryBackgroundSchema,
			/** Category slugs (hierarchical taxonomy; see `categories` collection). */
			categories: z.array(z.string()).default([]),
			tags: z.array(z.string()).default([]),
			/** Author slugs (0..n); see `authors` collection. */
			authors: z.array(z.string()).default([]),
			/**
			 * Where to show tags on the article page.
			 * Categories always appear in the hero under the description.
			 */
			tagPlacement: z.enum(["hero", "after", "both"]).default("hero"),
			/** youtube / vimeo / file (R2 or other self-hosted MP4). */
			videoProvider: z.enum(["youtube", "vimeo", "file"]).optional(),
			/** YT/Vimeo id/URL, or for `file` full URL / key under Content → Medien → videoBaseUrl. */
			videoId: z.string().optional(),
			/**
			 * Frontmatter video only (not `{{video …}}` embeds).
			 * `before` = after hero/TOC/title image; `after` = after body, before tags/authors.
			 */
			videoPlacement: z.enum(["before", "after"]).default("before"),
			seo: seoSchema.optional(),
			/**
			 * Width + optional spacing. Omit fields = Design → Inhaltsbreite / Abstand,
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

/**
 * Manual URL redirects (CMS → `public/_redirects` via build-redirects.mjs).
 * Multiple sources per entry, one target.
 */
const redirects = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/redirects" }),
	schema: z.object({
		title: z.string(),
		/** Source paths (one or more); each maps to `target`. */
		sources: z.preprocess((value) => {
			if (typeof value === "string") {
				return value
					.split(/\r?\n/)
					.map((line) => line.replace(/^\s*[-*]\s+/, "").trim())
					.filter(Boolean);
			}
			if (Array.isArray(value)) {
				return value
					.map((item) => {
						if (item && typeof item === "object") {
							const obj = item as Record<string, unknown>;
							return String(
								obj.source ?? obj.path ?? Object.values(obj)[0] ?? "",
							).trim();
						}
						return String(item ?? "").trim();
					})
					.filter(Boolean);
			}
			return value;
		}, z.array(z.string().trim().min(1)).min(1)),
		/** Single destination path or absolute https URL. */
		target: z.string().trim().min(1),
		/** HTTP status; default 301 (moved permanently). */
		code: z
			.preprocess(
				(value) => (value === 302 || value === "302" ? 302 : 301),
				z.union([z.literal(301), z.literal(302)]),
			)
			.default(301),
		modifiedDate: modifiedDateSchema,
	}),
});

export const collections = {
	pages,
	menus,
	categories,
	tags,
	authors,
	articles,
	glossar,
	blocks,
	redirects,
};
