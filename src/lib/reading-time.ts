/** Rough German reading speed for editorial meta (words per minute). */
const WORDS_PER_MINUTE = 200;

/** Strip markdown / embeds so word count reflects readable prose. */
function plainTextFromMarkdown(body: string): string {
	return body
		.replace(/\{\{[^}]+\}\}/g, " ")
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/`[^`]+`/g, " ")
		.replace(/!\[[^\]]*]\([^)]*\)/g, " ")
		.replace(/\[([^\]]*)]\([^)]*\)/g, "$1")
		.replace(/<[^>]+>/g, " ")
		.replace(/[#>*_\-~|]+/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

/** Estimated reading time in whole minutes (minimum 1). */
export function estimateReadingTimeMinutes(body: string | undefined): number {
	if (!body?.trim()) return 1;
	const words = plainTextFromMarkdown(body).split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** UI label, e.g. `5 Min. Lesezeit`. */
export function formatReadingTime(minutes: number): string {
	return minutes === 1 ? "1 Min. Lesezeit" : `${minutes} Min. Lesezeit`;
}
