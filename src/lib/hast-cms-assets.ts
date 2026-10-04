import { defineHastPlugin } from "satteri";
import { resolveCmsImage } from "./cms-image";

/**
 * Rewrite Markdown `<img src="/assets/…">` to Astro-built asset URLs.
 * CMS stores the public path; files live under `src/assets/` (not `public/`).
 */
export const hastCmsAssets = defineHastPlugin({
	name: "hast-cms-assets",
	element: {
		filter: ["img"],
		visit(node, ctx) {
			const src = node.properties.src;
			if (typeof src !== "string" || !src.trim()) {
				return;
			}
			const meta = resolveCmsImage(src.trim());
			if (!meta) {
				return;
			}
			ctx.setProperty(node, "src", meta.src);
			if (meta.width) {
				ctx.setProperty(node, "width", meta.width);
			}
			if (meta.height) {
				ctx.setProperty(node, "height", meta.height);
			}
			ctx.setProperty(node, "loading", "lazy");
			ctx.setProperty(node, "decoding", "async");
		},
	},
});
