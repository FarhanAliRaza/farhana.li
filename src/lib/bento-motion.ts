/**
 * Bento grid motion, applied globally to every `.bento-list` and the hero `.bento-grid`:
 *  - hovering a card nudges the surrounding cards away from it (desktop only)
 *  - cards fly in from the viewport centre the first time a grid scrolls into view
 *  - clicking anywhere on a card with `data-href` navigates there
 */
import { goto } from '$app/navigation';

const CARD = '.bento-list > .bento-card, .bento-grid > .tile';
const CHILD = ':scope > .bento-card, :scope > .tile';
const SOFT_SPRING =
	'linear(0 0%, 0.047 4.2%, 0.152 8.3%, 0.278 12.5%, 0.404 16.7%, 0.52 20.8%, 0.62 25%, 0.704 29.2%, 0.772 33.3%, 0.827 37.5%, 0.87 41.7%, 0.903 45.8%, 0.928 50%, 0.947 54.2%, 0.962 58.3%, 0.972 62.5%, 0.98 66.7%, 0.986 70.8%, 0.99 75%, 0.993 79.2%, 0.995 83.3%, 0.997 87.5%, 0.998 91.7%, 0.998 95.8%, 1 100%)';

const fine = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function center(el: Element) {
	const r = el.getBoundingClientRect();
	return [r.left + r.width / 2, r.top + r.height / 2];
}

/** Push every sibling of `card` away from it; pass null to reset. */
function repel(list: Element, card: Element | null) {
	const cards = Array.from(list.children) as HTMLElement[];
	const from = card && center(card);
	for (const el of cards) {
		if (!from || el === card) {
			el.style.removeProperty('--tx');
			el.style.removeProperty('--ty');
			continue;
		}
		const [cx, cy] = center(el);
		const dx = cx - from[0];
		const dy = cy - from[1];
		const dist = Math.hypot(dx, dy) || 1;
		const mag = Math.min(5000 / dist, 30);
		el.style.setProperty('--tx', `${(dx / dist) * mag}px`);
		el.style.setProperty('--ty', `${(dy / dist) * mag}px`);
	}
}

/** Fly cards in from the viewport centre, once the list is on screen. */
export function enterBentoLists() {
	if (reduced()) return;
	const lists = document.querySelectorAll<HTMLElement>(
		'.bento-list:not([data-entered]), .bento-grid:not([data-entered])'
	);
	if (!lists.length) return;
	lists.forEach((list) => {
		list.dataset.entered = '';
		list.querySelectorAll<HTMLElement>(CHILD).forEach((el) => (el.style.opacity = '0'));
	});
	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (!e.isIntersecting) continue;
				io.unobserve(e.target);
				const vx = window.innerWidth / 2;
				const vy = window.innerHeight / 2;
				const cards = e.target.querySelectorAll<HTMLElement>(CHILD);
				cards.forEach((el, i) => {
					const [cx, cy] = center(el);
					el.style.removeProperty('opacity');
					el.animate(
						[
							{ translate: `${(cx - vx) * 0.6}px ${(cy - vy) * 0.6}px`, opacity: 0 },
							{ translate: '0px 0px', opacity: 1 }
						],
						{ duration: 1060, easing: SOFT_SPRING, delay: i * 6, fill: 'backwards' }
					);
				});
			}
		},
		{ threshold: 0.1 }
	);
	lists.forEach((l) => io.observe(l));
}

export function initBentoMotion() {
	let hovered: Element | null = null;

	const over = (e: PointerEvent) => {
		if (!fine() || window.innerWidth < 1024) return;
		const card = (e.target as Element).closest(CARD);
		if (card === hovered) return;
		hovered = card;
		if (card) repel(card.parentElement!, card);
	};
	const out = (e: PointerEvent) => {
		if (!hovered) return;
		const to = e.relatedTarget as Element | null;
		if (to && hovered.contains(to)) return;
		repel(hovered.parentElement!, null);
		hovered = null;
	};
	const click = (e: MouseEvent) => {
		const target = e.target as Element;
		const card = target.closest<HTMLElement>('[data-href]');
		if (!card || target.closest('a, button')) return;
		goto(card.dataset.href!);
	};

	document.addEventListener('pointerover', over);
	document.addEventListener('pointerout', out);
	document.addEventListener('click', click);
	enterBentoLists();

	return () => {
		document.removeEventListener('pointerover', over);
		document.removeEventListener('pointerout', out);
		document.removeEventListener('click', click);
	};
}
