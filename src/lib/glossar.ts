import { getCollection, type CollectionEntry } from "astro:content";

export type GlossarEntry = CollectionEntry<"glossar">;

export async function getGlossarEntries(): Promise<GlossarEntry[]> {
	const entries = await getCollection("glossar");
	return entries.sort((a, b) =>
		a.data.title.localeCompare(b.data.title, "de"),
	);
}

export function getGlossarHref(entry: GlossarEntry): string {
	return `/glossar/${entry.id}/`;
}
