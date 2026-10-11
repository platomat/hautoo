/**
 * Desktop only: stick the article sidebar when it fits in the viewport.
 * Below the tablet breakpoint the sidebar stacks under the main column.
 */

const DESKTOP_MQ = "(min-width: 1024px)";
const STICKY_CLASS = "article-sidebar--sticky";
const GAP_PX = 16;

function headerHeight(): number {
	const header = document.querySelector<HTMLElement>("[data-site-header]");
	if (!header) {
		return 64;
	}
	return Math.ceil(header.getBoundingClientRect().height);
}

function updateArticleSidebarSticky(): void {
	const aside = document.querySelector<HTMLElement>("[data-article-sidebar]");
	if (!aside) {
		return;
	}

	if (!window.matchMedia(DESKTOP_MQ).matches) {
		aside.classList.remove(STICKY_CLASS);
		aside.style.removeProperty("--article-sidebar-sticky-top");
		return;
	}

	const top = headerHeight() + GAP_PX;
	const available = window.innerHeight - top - GAP_PX;
	const fits = aside.scrollHeight <= available + 1;

	aside.style.setProperty("--article-sidebar-sticky-top", `${top}px`);
	aside.classList.toggle(STICKY_CLASS, fits);
}

function initArticleSidebarSticky(): void {
	const aside = document.querySelector<HTMLElement>("[data-article-sidebar]");
	if (!aside) {
		return;
	}

	updateArticleSidebarSticky();

	const mq = window.matchMedia(DESKTOP_MQ);
	mq.addEventListener("change", updateArticleSidebarSticky);
	window.addEventListener("resize", updateArticleSidebarSticky, { passive: true });

	if (typeof ResizeObserver !== "undefined") {
		const ro = new ResizeObserver(() => updateArticleSidebarSticky());
		ro.observe(aside);
		const header = document.querySelector<HTMLElement>("[data-site-header]");
		if (header) {
			ro.observe(header);
		}
	}
}

initArticleSidebarSticky();
