/** Build-time contact address — set via env, never commit the real value. */
export function getContactEmail(): string | undefined {
	const raw = import.meta.env.CONTACT_EMAIL;
	if (typeof raw !== "string") {
		return undefined;
	}
	const email = raw.trim();
	if (!email || !email.includes("@")) {
		return undefined;
	}
	return email;
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
