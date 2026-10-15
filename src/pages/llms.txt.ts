import type { APIRoute } from "astro";
import { buildAgentIndexFiles } from "../lib/agent-indexes";

/** https://llmstxt.org/ — curated Markdown index of public, indexable content. */
export const GET: APIRoute = async ({ site }) => {
	const { llmsTxt } = await buildAgentIndexFiles(site);
	return new Response(llmsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
