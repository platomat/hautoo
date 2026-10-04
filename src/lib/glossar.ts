import { getCollection, type CollectionEntry } from "astro:content";
import { isEntryPublic } from "../cms/fields/status";

export type GlossarEntry = CollectionEntry<"glossar">;

export function isGlossarPublic(entry: GlossarEntry): boolean {
	return isEntryPublic(entry.data.status, entry.data.publishDate);
}

export async function getGlossarEntries(): Promise<GlossarEntry[]> {
	const entries = await getCollection("glossar");
	return entries
		.filter(isGlossarPublic)
		.sort((a, b) => a.data.title.localeCompare(b.data.title, "de"));
}

export function getGlossarHref(entry: GlossarEntry): string {
	return `/glossar/${entry.id}/`;
}
