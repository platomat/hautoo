import { getSiteConfig } from "./site-config";

function normalizeEmail(raw: unknown): string | undefined {
	if (typeof raw !== "string") {
		return undefined;
	}
	const email = raw.trim();
	if (!email || !email.includes("@")) {
		return undefined;
	}
	return email;
}

/**
 * Contact address for `{{contact-email}}` (Impressum / Datenschutz).
 * Priority: CMS `general.contactEmail` (if set) → env `CONTACT_EMAIL`.
 * CMS value is committed with the public repo; leave it empty and use ENV
 * when the address should stay out of Git.
 */
export async function getContactEmail(): Promise<string | undefined> {
	const config = await getSiteConfig();
	const fromCms = normalizeEmail(config.general?.contactEmail);
	if (fromCms) {
		return fromCms;
	}
	return normalizeEmail(import.meta.env.CONTACT_EMAIL);
}

export function splitContactEmail(
	email: string,
): { user: string; domain: string } | undefined {
	const at = email.lastIndexOf("@");
	if (at <= 0 || at === email.length - 1) {
		return undefined;
	}
	return {
		user: email.slice(0, at),
		domain: email.slice(at + 1),
	};
}
