import type { APIRoute } from "astro";
import { buildAgentIndexFiles } from "../lib/agent-indexes";

/**
 * Deterministic URL inventory for AI agents (published + indexable collections).
 * Companion to `/llms.txt`.
 */
export const GET: APIRoute = async ({ site }) => {
	const { agentsTxt } = await buildAgentIndexFiles(site);
	return new Response(agentsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
