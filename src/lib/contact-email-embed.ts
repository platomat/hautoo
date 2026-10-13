import type { ContentSegment } from "./content-embeds";

/** How `{{contact-email}}` sits relative to neighboring Markdown segments. */
export type ContactEmailLayout = "block" | "run-after" | "run-before" | "run-between";

const LAYOUTS = new Set<ContactEmailLayout>([
	"block",
	"run-after",
	"run-before",
	"run-between",
]);

export type ContactEmailEmbedProps = {
	layout: ContactEmailLayout;
};

export function parseContactEmailEmbedProps(
	attrs: Record<string, string>,
): ContactEmailEmbedProps {
	const raw = (attrs.layout ?? "").trim() as ContactEmailLayout;
	return {
		layout: LAYOUTS.has(raw) ? raw : "block",
	};
}

export type ContactEmailFlowSegment = {
	type: "contact-email-flow";
	layout: ContactEmailLayout;
	htmlBefore?: string;
	htmlAfter?: string;
};

/** Join Markdown neighbors for run-* layouts (embed line stays alone in source). */
export function mergeContactEmailLayoutSegments(
	segments: ContentSegment[],
): ContentSegment[] {
	const out: ContentSegment[] = [];
	let i = 0;

	while (i < segments.length) {
		const seg = segments[i];
		if (seg.type !== "contact-email") {
			out.push(seg);
			i += 1;
			continue;
		}

		const { layout } = seg.props;

		if (layout === "block") {
			out.push(seg);
			i += 1;
			continue;
		}

		if (layout === "run-after") {
			const prev = out.at(-1);
			if (prev?.type === "html") {
				out.pop();
				out.push({
					type: "contact-email-flow",
					layout: "run-after",
					htmlBefore: prev.html,
				});
				i += 1;
				continue;
			}
			out.push({ type: "contact-email", props: { layout: "block" } });
			i += 1;
			continue;
		}

		if (layout === "run-before") {
			const next = segments[i + 1];
			if (next?.type === "html") {
				out.push({
					type: "contact-email-flow",
					layout: "run-before",
					htmlAfter: next.html,
				});
				i += 2;
				continue;
			}
			out.push({ type: "contact-email", props: { layout: "block" } });
			i += 1;
			continue;
		}

		if (layout === "run-between") {
			const prev = out.at(-1);
			const next = segments[i + 1];
			if (prev?.type === "html" && next?.type === "html") {
				out.pop();
				out.push({
					type: "contact-email-flow",
					layout: "run-between",
					htmlBefore: prev.html,
					htmlAfter: next.html,
				});
				i += 2;
				continue;
			}
			if (prev?.type === "html") {
				out.pop();
				out.push({
					type: "contact-email-flow",
					layout: "run-after",
					htmlBefore: prev.html,
				});
				i += 1;
				continue;
			}
			if (next?.type === "html") {
				out.push({
					type: "contact-email-flow",
					layout: "run-before",
					htmlAfter: next.html,
				});
				i += 2;
				continue;
			}
			out.push({ type: "contact-email", props: { layout: "block" } });
			i += 1;
			continue;
		}

		out.push(seg);
		i += 1;
	}

	return out;
}
