import { z } from "astro/zod";

/** Overlay strength 0–100 (black layer over the background image). */
export const backgroundOverlaySchema = z.coerce
	.number()
	.min(0)
	.max(100)
	.default(40);

/**
 * Background image path from Sveltia (`/assets/…` or entry-relative).
 * Resolved at render via `resolveCmsImage` — not Astro `image()`, which
 * cannot load global `/assets/` paths.
 */
export const backgroundImageSchema = z.preprocess((value) => {
	if (typeof value !== "string") {
		return value;
	}
	const trimmed = value.trim();
	return trimmed === "" ? undefined : trimmed;
}, z.string().min(1).optional());

/**
 * Credit for the page background — plain text, bare URL, or HTML
 * copied from stock platforms (e.g. Unsplash “Copy attribution”).
 * Collected on the Impressum.
 */
export const backgroundAttributionSchema = z.preprocess((value) => {
	if (typeof value !== "string") {
		return value;
	}
	const trimmed = value.trim();
	return trimmed === "" ? undefined : trimmed;
}, z.string().min(1).optional());

export type BackgroundOverlay = z.infer<typeof backgroundOverlaySchema>;
export type BackgroundAttribution = z.infer<typeof backgroundAttributionSchema>;

export type AttributionKind = "url" | "html" | "text";

/** True when the whole field is a single http(s) URL (no surrounding text). */
export function isPureAttributionUrl(value: string): boolean {
	const trimmed = value.trim();
	if (!/^https?:\/\/\S+$/i.test(trimmed)) {
		return false;
	}
	return isHttpUrl(trimmed);
}

/** Classify CMS credit for Impressum rendering. */
export function classifyAttribution(value: string): AttributionKind {
	if (isPureAttributionUrl(value)) {
		return "url";
	}
	if (/<[a-z][\s\S]*>/i.test(value)) {
		return "html";
	}
	return "text";
}

/**
 * Allowlist sanitizer for stock-photo credit HTML.
 * Keeps only `<a href="http(s):…">…</a>`; everything else becomes text.
 */
export function sanitizeAttributionHtml(input: string): string {
	const re = /<a\s+([^>]*)>([\s\S]*?)<\/a>/gi;
	const parts: string[] = [];
	let lastIndex = 0;

	for (const match of input.matchAll(re)) {
		const index = match.index ?? 0;
		parts.push(escapeHtml(input.slice(lastIndex, index)));

		const href = extractHrefAttr(match[1] ?? "");
		const label = escapeHtml(stripTags(match[2] ?? ""));
		if (href && isHttpUrl(href)) {
			parts.push(
				`<a href="${escapeAttr(href)}" rel="noopener noreferrer" target="_blank">${label}</a>`,
			);
		} else {
			parts.push(label);
		}

		lastIndex = index + match[0].length;
	}

	parts.push(escapeHtml(input.slice(lastIndex)));
	return parts.join("");
}

function isHttpUrl(value: string): boolean {
	try {
		const url = new URL(value);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
}

function extractHrefAttr(attrs: string): string | undefined {
	const match = attrs.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
	const raw = match?.[1] ?? match?.[2] ?? match?.[3];
	return raw?.trim() || undefined;
}

function stripTags(value: string): string {
	return value.replace(/<[^>]*>/g, "");
}

function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

function escapeAttr(value: string): string {
	return escapeHtml(value).replaceAll("'", "&#39;");
}

/** Clamp overlay for inline styles (0–1 alpha). */
export function overlayAlpha(percent: number | undefined): number {
	const value = typeof percent === "number" && Number.isFinite(percent) ? percent : 40;
	return Math.min(100, Math.max(0, value)) / 100;
}
