import { getImage } from "astro:assets";
import { defineHastPlugin } from "satteri";
import { resolveCmsImage } from "./cms-image";

/** Content column ≈ `--content-max-width` (42rem) plus shell padding. */
const CONTENT_WIDTHS = [480, 768, 960, 1280];
const CONTENT_SIZES =
	"(max-width: 679px) calc(100vw - 2.5rem), min(100vw - 2.5rem, 42rem)";

type CmsAssetData = {
	/** First raster image in this markdown compile gets LCP-friendly attrs. */
	cmsEagerImageUsed?: boolean;
};

/**
 * Rewrite Markdown `<img src="/assets/…">` to Astro-optimized URLs + srcset.
 * CMS stores the public path; files live under `src/assets/` (not `public/`).
 */
export const hastCmsAssets = defineHastPlugin({
	name: "hast-cms-assets",
	element: {
		filter: ["img"],
		async visit(node, ctx) {
			const src = node.properties.src;
			if (typeof src !== "string" || !src.trim()) {
				return;
			}
			const meta = resolveCmsImage(src.trim());
			if (!meta) {
				return;
			}

			if (meta.format === "svg") {
				ctx.setProperty(node, "src", meta.src);
				if (meta.width) ctx.setProperty(node, "width", meta.width);
				if (meta.height) ctx.setProperty(node, "height", meta.height);
				ctx.setProperty(node, "loading", "lazy");
				ctx.setProperty(node, "decoding", "async");
				return;
			}

			const data = ctx.data as CmsAssetData;
			const eager = !data.cmsEagerImageUsed;
			if (eager) {
				data.cmsEagerImageUsed = true;
			}

			const maxWidth = Math.min(meta.width || 1280, 1280);
			const optimized = await getImage({
				src: meta,
				width: maxWidth,
				widths: CONTENT_WIDTHS.filter((w) => w <= maxWidth),
				sizes: CONTENT_SIZES,
				format: "webp",
				quality: 75,
			});

			ctx.setProperty(node, "src", optimized.src);
			if (optimized.srcSet.attribute) {
				ctx.setProperty(node, "srcset", optimized.srcSet.attribute);
			}
			ctx.setProperty(node, "sizes", CONTENT_SIZES);
			const { width, height } = optimized.attributes;
			if (width != null) ctx.setProperty(node, "width", width);
			if (height != null) ctx.setProperty(node, "height", height);
			ctx.setProperty(node, "decoding", "async");
			if (eager) {
				ctx.setProperty(node, "loading", "eager");
				ctx.setProperty(node, "fetchpriority", "high");
			} else {
				ctx.setProperty(node, "loading", "lazy");
			}
		},
	},
});
