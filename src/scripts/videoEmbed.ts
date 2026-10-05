import {
	VIDEO_CONSENT_STORAGE_KEY,
	VIDEO_CONSENT_VALUE,
} from "../lib/video-consent";

const IFRAME_ALLOW =
	"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

function hasVideoConsent(): boolean {
	try {
		return localStorage.getItem(VIDEO_CONSENT_STORAGE_KEY) === VIDEO_CONSENT_VALUE;
	} catch {
		return false;
	}
}

function setVideoConsent(enabled: boolean) {
	try {
		if (enabled) {
			localStorage.setItem(VIDEO_CONSENT_STORAGE_KEY, VIDEO_CONSENT_VALUE);
		} else {
			localStorage.removeItem(VIDEO_CONSENT_STORAGE_KEY);
		}
	} catch {
		/* private mode / blocked storage */
	}
}

function activateEmbed(root: HTMLElement) {
	const src = root.dataset.videoSrc;
	const title = root.dataset.videoTitle || "Video";
	if (!src || root.querySelector("iframe")) {
		return;
	}

	root.querySelector("[data-video-facade]")?.remove();

	const iframe = document.createElement("iframe");
	iframe.src = src;
	iframe.title = title;
	iframe.allow = IFRAME_ALLOW;
	iframe.allowFullscreen = true;
	iframe.loading = "eager";
	root.appendChild(iframe);
}

function activateAll() {
	document
		.querySelectorAll<HTMLElement>("[data-video-embed]")
		.forEach(activateEmbed);
}

function bindLoadButtons() {
	document.querySelectorAll<HTMLElement>("[data-video-load]").forEach((btn) => {
		if (btn.dataset.videoBound === "1") return;
		btn.dataset.videoBound = "1";
		btn.addEventListener("click", () => {
			setVideoConsent(true);
			activateAll();
		});
	});
}

function bindRevokeButtons() {
	document.querySelectorAll<HTMLElement>("[data-video-revoke]").forEach((btn) => {
		if (btn.dataset.videoBound === "1") return;
		btn.dataset.videoBound = "1";
		btn.addEventListener("click", () => {
			setVideoConsent(false);
			// Restore facades without keeping third-party iframes in the DOM.
			window.location.reload();
		});
	});
}

/** Facade players + optional revoke controls on the privacy page. */
export function initVideoEmbeds() {
	const roots = document.querySelectorAll<HTMLElement>("[data-video-embed]");
	if (roots.length > 0) {
		if (hasVideoConsent()) {
			activateAll();
		} else {
			bindLoadButtons();
		}
	}
	bindRevokeButtons();
}
