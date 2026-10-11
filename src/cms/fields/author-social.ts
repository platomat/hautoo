import { z } from "astro/zod";

/** Social / web platforms on author profiles (#86). */
export const authorSocialPlatformSchema = z.enum([
	"website",
	"youtube",
	"facebook",
	"instagram",
	"pinterest",
	"linkedin",
	"tiktok",
	"x",
	"mastodon",
	"github",
	"other",
]);

export type AuthorSocialPlatform = z.infer<typeof authorSocialPlatformSchema>;

export const authorSocialLinkSchema = z.object({
	platform: authorSocialPlatformSchema,
	/** Absolute http(s) URL. */
	url: z
		.string()
		.trim()
		.refine((value) => /^https?:\/\//i.test(value), {
			message: "URL must start with http:// or https://",
		}),
	/** Optional display label (website / other). */
	label: z.string().trim().optional(),
});

export type AuthorSocialLink = z.infer<typeof authorSocialLinkSchema>;

export const AUTHOR_SOCIAL_PLATFORM_LABELS: Record<
	AuthorSocialPlatform,
	string
> = {
	website: "Webseite",
	youtube: "YouTube",
	facebook: "Facebook",
	instagram: "Instagram",
	pinterest: "Pinterest",
	linkedin: "LinkedIn",
	tiktok: "TikTok",
	x: "X",
	mastodon: "Mastodon",
	github: "GitHub",
	other: "Link",
};

export function authorSocialLinkLabel(link: AuthorSocialLink): string {
	const custom = link.label?.trim();
	if (custom) return custom;
	return AUTHOR_SOCIAL_PLATFORM_LABELS[link.platform];
}
