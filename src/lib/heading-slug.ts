/**
 * ASCII heading IDs for anchors / TOC (a–z, 0–9, `-`, `_` only).
 * German umlauts are transliterated; other diacritics stripped.
 * Duplicate titles get `-1`, `-2`, … (github-slugger style).
 */

const UMLAUT_MAP: Record<string, string> = {
	ä: "ae",
	ö: "oe",
	ü: "ue",
	Ä: "Ae",
	Ö: "Oe",
	Ü: "Ue",
	ß: "ss",
};

/** Fold text to an ASCII slug base (no uniqueness suffix). */
export function asciiHeadingSlugBase(text: string): string {
	const folded = text
		.replace(/[äöüÄÖÜß]/g, (ch) => UMLAUT_MAP[ch] ?? ch)
		.normalize("NFD")
		.replace(/\p{M}/gu, "");

	const slug = folded
		.toLowerCase()
		.replace(/[^a-z0-9_-]+/g, "-")
		.replace(/-{2,}/g, "-")
		.replace(/^-+|-+$/g, "");

	return slug || "section";
}

/** Stateful slugger: same input twice → `foo`, `foo-1`. */
export function createHeadingSlugger(): {
	slug: (text: string) => string;
} {
	const counts = new Map<string, number>();

	return {
		slug(text: string): string {
			const base = asciiHeadingSlugBase(text);
			const seen = counts.get(base) ?? 0;
			counts.set(base, seen + 1);
			return seen === 0 ? base : `${base}-${seen}`;
		},
	};
}
