import { getCollection, getEntry, type CollectionEntry } from "astro:content";
import { isEntryPublic } from "../cms/fields/status";

export type BlockEntry = CollectionEntry<"blocks">;

export function isBlockPublic(block: BlockEntry): boolean {
	return isEntryPublic(block.data.status, block.data.publishDate);
}

/** Published (or due `future`) block by slug/id, or undefined. */
export async function getPublicBlock(
	id: string,
): Promise<BlockEntry | undefined> {
	const trimmed = id.trim();
	if (!trimmed) {
		return undefined;
	}
	const block = await getEntry("blocks", trimmed);
	if (!block || !isBlockPublic(block)) {
		return undefined;
	}
	return block;
}

export async function getPublicBlocks(): Promise<BlockEntry[]> {
	const blocks = await getCollection("blocks");
	return blocks.filter(isBlockPublic);
}
