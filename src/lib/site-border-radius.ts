import {
	siteBorderRadiusConfigSchema,
	type SiteBorderRadiusConfig,
} from "../cms/fields/site-config";
import { getSiteConfig } from "./site-config";

export type { SiteBorderRadiusConfig };

export const DEFAULT_SITE_BORDER_RADIUS: SiteBorderRadiusConfig =
	siteBorderRadiusConfigSchema.parse({});

export function getSiteBorderRadiusConfig(): SiteBorderRadiusConfig {
	return getSiteConfig().design?.borderRadius ?? DEFAULT_SITE_BORDER_RADIUS;
}

/**
 * Inline `:root` overrides from Design → Ecken abrunden.
 * `--radius-image` for content images; `--radius-video` for video embeds
 * (including MemberVideo, which uses `.video-embed`).
 */
export function buildSiteBorderRadiusRootCss(
	radius: SiteBorderRadiusConfig = getSiteBorderRadiusConfig(),
): string {
	const image = Math.max(0, Math.min(64, Math.round(radius.image)));
	const video = Math.max(0, Math.min(64, Math.round(radius.video)));
	return `:root {\n\t--radius-image: ${image}px;\n\t--radius-video: ${video}px;\n}`;
}
