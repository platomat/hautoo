import type { ImageMetadata } from "astro";

type ImageModule = { default: ImageMetadata };

const assetModules = import.meta.glob<ImageModule>(
	"/src/assets/**/*.{png,jpg,jpeg,webp,gif,avif,svg}",
	{ eager: true },
);

const contentModules = import.meta.glob<ImageModule>(
	"/src/content/**/*.{png,jpg,jpeg,webp,gif,avif,svg}",
	{ eager: true },
);

const assetsByPublicPath = new Map<string, ImageMetadata>();
const assetsByFileName = new Map<string, ImageMetadata>();

for (const [modulePath, mod] of Object.entries(assetModules)) {
	const file = modulePath.replace(/^.*\/src\/assets\//, "");
	assetsByPublicPath.set(`/assets/${file}`, mod.default);
	assetsByPublicPath.set(`/src/assets/${file}`, mod.default);
	assetsByFileName.set(file, mod.default);
}

/**
 * Resolve a CMS image path to Astro ImageMetadata.
 *
 * Supports:
 * - Global library: `/assets/foo.webp` → `src/assets/foo.webp`
 * - Entry-relative: `foo.webp` / `./foo.webp` next to the content file
 */
export function resolveCmsImage(
	path: string | undefined | null,
	entryDir?: string,
): ImageMetadata | undefined {
	if (!path || !path.trim()) {
		return undefined;
	}

	const raw = path.trim();

	const fromAssets =
		assetsByPublicPath.get(raw) ||
		assetsByFileName.get(raw.replace(/^\/assets\//, ""));
	if (fromAssets) {
		return fromAssets;
	}

	const relative = raw.replace(/^\.\//, "");
	if (entryDir) {
		const dir = entryDir.replace(/\\/g, "/").replace(/\/?$/, "/");
		const needle = `${dir}${relative}`.replace(/^\/+/, "");
		for (const [modulePath, mod] of Object.entries(contentModules)) {
			const normalized = modulePath.replace(/\\/g, "/");
			if (
				normalized.endsWith(`/${needle}`) ||
				normalized.endsWith(needle) ||
				normalized.includes(`/src/${needle}`)
			) {
				return mod.default;
			}
		}
	}

	// Last resort: unique filename match under content/
	const baseName = relative.split("/").pop();
	if (baseName) {
		const matches = Object.entries(contentModules).filter(([modulePath]) =>
			modulePath.replace(/\\/g, "/").endsWith(`/${baseName}`),
		);
		if (matches.length === 1) {
			return matches[0][1].default;
		}
	}

	return undefined;
}
