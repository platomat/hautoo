import {
	MEMBER_VIDEO_EXPIRES_KEY,
	MEMBER_VIDEO_TOKEN_KEY,
} from "../lib/member-video";

type UnlockResponse = { token?: string; expiresAt?: number; error?: string };
type SignResponse = { url?: string; expiresAt?: number; error?: string };

function readToken(): string | null {
	try {
		const token = localStorage.getItem(MEMBER_VIDEO_TOKEN_KEY);
		const expRaw = localStorage.getItem(MEMBER_VIDEO_EXPIRES_KEY);
		if (!token) return null;
		const exp = expRaw ? Number(expRaw) : 0;
		if (exp && exp < Math.floor(Date.now() / 1000)) {
			clearToken();
			return null;
		}
		return token;
	} catch {
		return null;
	}
}

function saveToken(token: string, expiresAt?: number) {
	try {
		localStorage.setItem(MEMBER_VIDEO_TOKEN_KEY, token);
		if (expiresAt) {
			localStorage.setItem(MEMBER_VIDEO_EXPIRES_KEY, String(expiresAt));
		}
	} catch {
		/* private mode */
	}
}

function clearToken() {
	try {
		localStorage.removeItem(MEMBER_VIDEO_TOKEN_KEY);
		localStorage.removeItem(MEMBER_VIDEO_EXPIRES_KEY);
	} catch {
		/* ignore */
	}
}

function workerBase(root: HTMLElement): string {
	return (root.dataset.workerUrl ?? "").replace(/\/+$/, "");
}

function setStatus(root: HTMLElement, message: string, isError = false) {
	const el = root.querySelector<HTMLElement>("[data-member-status]");
	if (!el) return;
	el.textContent = message;
	el.hidden = !message;
	el.dataset.error = isError ? "1" : "0";
}

function showPlayer(root: HTMLElement, playUrl: string) {
	const gate = root.querySelector<HTMLElement>("[data-member-gate]");
	const wrap = root.querySelector<HTMLElement>("[data-member-player-wrap]");
	const toolbar = root.querySelector<HTMLElement>("[data-member-toolbar]");
	const video = root.querySelector<HTMLVideoElement>("[data-member-player]");
	if (!video || !wrap) return;

	if (gate) gate.hidden = true;
	wrap.hidden = false;
	if (toolbar) toolbar.hidden = false;
	video.src = playUrl;
	void video.play().catch(() => {
		/* user gesture / autoplay policies */
	});
}

function showGate(root: HTMLElement) {
	const gate = root.querySelector<HTMLElement>("[data-member-gate]");
	const wrap = root.querySelector<HTMLElement>("[data-member-player-wrap]");
	const toolbar = root.querySelector<HTMLElement>("[data-member-toolbar]");
	const video = root.querySelector<HTMLVideoElement>("[data-member-player]");
	if (video) {
		video.removeAttribute("src");
		video.load();
	}
	if (wrap) wrap.hidden = true;
	if (toolbar) toolbar.hidden = true;
	if (gate) gate.hidden = false;
}

async function signAndPlay(root: HTMLElement, token: string): Promise<boolean> {
	const base = workerBase(root);
	const key = root.dataset.videoKey ?? "";
	if (!base || !key) {
		setStatus(root, "Video-Zugang ist nicht konfiguriert.", true);
		return false;
	}

	setStatus(root, "Video wird geladen …");
	try {
		const res = await fetch(`${base}/sign`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token, key }),
		});
		const data = (await res.json()) as SignResponse;
		if (!res.ok || !data.url) {
			if (res.status === 401) {
				clearToken();
				showGate(root);
				setStatus(root, "Zugang abgelaufen. Bitte Code erneut eingeben.", true);
				return false;
			}
			if (res.status === 403) {
				setStatus(root, "Kein Zugriff auf dieses Video mit deinem Code.", true);
				return false;
			}
			if (res.status === 404) {
				setStatus(root, "Video nicht gefunden.", true);
				return false;
			}
			setStatus(root, "Freischaltung fehlgeschlagen. Bitte später erneut versuchen.", true);
			return false;
		}
		setStatus(root, "");
		showPlayer(root, data.url);
		return true;
	} catch {
		setStatus(root, "Netzwerkfehler. Bitte Verbindung prüfen.", true);
		return false;
	}
}

async function unlock(root: HTMLElement, code: string): Promise<boolean> {
	const base = workerBase(root);
	if (!base) {
		setStatus(root, "Video-Zugang ist nicht konfiguriert.", true);
		return false;
	}

	setStatus(root, "Code wird geprüft …");
	try {
		const res = await fetch(`${base}/unlock`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ code }),
		});
		const data = (await res.json()) as UnlockResponse;
		if (!res.ok || !data.token) {
			setStatus(root, "Ungültiger Code.", true);
			return false;
		}
		saveToken(data.token, data.expiresAt);
		return signAndPlay(root, data.token);
	} catch {
		setStatus(root, "Netzwerkfehler. Bitte Verbindung prüfen.", true);
		return false;
	}
}

function bindRoot(root: HTMLElement) {
	if (root.dataset.bound === "1") return;
	root.dataset.bound = "1";

	const form = root.querySelector<HTMLFormElement>("[data-member-form]");
	const resetBtn = root.querySelector<HTMLButtonElement>("[data-member-reset]");

	form?.addEventListener("submit", (event) => {
		event.preventDefault();
		const input = root.querySelector<HTMLInputElement>("[data-member-code]");
		const code = input?.value?.trim() ?? "";
		if (code.length < 6) {
			setStatus(root, "Bitte gültigen Zugangscode eingeben.", true);
			return;
		}
		void unlock(root, code);
	});

	resetBtn?.addEventListener("click", () => {
		clearToken();
		showGate(root);
		setStatus(root, "Zugang zurückgesetzt.");
		const input = root.querySelector<HTMLInputElement>("[data-member-code]");
		if (input) input.value = "";
	});

	const existing = readToken();
	if (existing) {
		void signAndPlay(root, existing);
	}
}

export function initMemberVideos() {
	document
		.querySelectorAll<HTMLElement>("[data-member-video]")
		.forEach((root) => bindRoot(root));
}
