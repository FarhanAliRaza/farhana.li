export interface DiagramSpec {
	id: string;
	anchor: string;
	number: string;
	title: string;
	intro: string;
	nodes: string[][];
	phases: {
		from: number;
		to: number;
		kind: string;
		title: string;
		note: string;
		payload: string;
		values: string[];
	}[];
}

/** The original SVG geometry, scoped to one mounted Svelte figure. */
export function createDiagram(svg: SVGSVGElement, figure: HTMLElement, spec: DiagramSpec) {
	const NS = 'http://www.w3.org/2000/svg';
	const node = <K extends keyof SVGElementTagNameMap>(
		tag: K,
		attrs: Record<string, string | number> = {},
		content?: string
	): SVGElementTagNameMap[K] => {
		const element = document.createElementNS(NS, tag);
		Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, String(value)));
		if (content !== undefined) element.textContent = content;
		return element;
	};
	const reduced = matchMedia('(prefers-reduced-motion: reduce)');
	let currentTime = 0,
		previousWidth = 0,
		lastIndex = -1;
	let points: number[][] = [],
		paths: SVGPathElement[] = [],
		boxes: SVGGElement[] = [],
		readouts: SVGTextElement[] = [];
	let marker: SVGGElement, activePath: SVGPathElement;
	function draw(time: number) {
		currentTime = time;
		if (!paths.length) return;
		const position = time / 2600;
		const index = Math.min(spec.phases.length - 1, Math.floor(position));
		const fraction = Math.min(1, position - index);
		const phase = spec.phases[index];
		if (index !== lastIndex) {
			boxes.forEach((box, i) =>
				box.classList.toggle('is-working', i === phase.from || i === phase.to)
			);
			phase.values.forEach((value, i) => (readouts[i].textContent = value));
			lastIndex = index;
		}
		const path = paths[index];
		activePath.setAttribute('d', path.getAttribute('d') ?? '');
		activePath.setAttribute('class', 'motion-active-path ' + phase.kind);
		const point = path.getPointAtLength(path.getTotalLength() * fraction);
		marker.setAttribute('transform', `translate(${point.x} ${point.y})`);
		marker.setAttribute('class', 'motion-marker ' + phase.kind);
		marker.style.opacity = reduced.matches
			? '0'
			: String(fraction < 0.04 || fraction > 0.96 ? 0.35 : 1);
	}
	function layout() {
		const width = Math.max(250, figure.clientWidth);
		if (Math.abs(width - previousWidth) < 1) return;
		previousWidth = width;
		const mobile = width < 650;
		const height = mobile ? 720 : 490;
		svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
		svg.style.height = height + 'px';
		svg.replaceChildren(node('title', {}, spec.title));
		const defs = node('defs');
		const arrow = node('marker', {
			id: spec.id + '-arrow',
			viewBox: '0 0 10 10',
			refX: 9,
			refY: 5,
			markerWidth: 5,
			markerHeight: 5,
			orient: 'auto-start-reverse'
		});
		arrow.append(node('path', { d: 'M 0 0 L 10 5 L 0 10 Z', fill: 'context-stroke' }));
		defs.append(arrow);
		svg.append(defs);
		points = mobile
			? [
					[width / 2, 125],
					[width / 2, 355],
					[width / 2, 575]
				]
			: [
					[width * 0.17, 245],
					[width * 0.51, 245],
					[width * 0.82, 245]
				];
		const regionNames: Record<string, string[]> = {
			'motion-browser': ['PYTHON BACKEND', 'BROWSER JAVASCRIPT'],
			'motion-compile': ['PYTHON SOURCE', 'FRONTEND BUILD & DELIVERY'],
			'motion-load': ['BROWSER', 'APPLICATION SERVICES'],
			'motion-event': ['CLIENT', 'PYTHON BACKEND'],
			'motion-route': ['BROWSER', 'ROUTING & PAGE LOAD'],
			'motion-state': ['BUILD TIME', 'SESSION RUNTIME']
		};
		const regionLabels = regionNames[spec.id];
		const browserGroup = spec.id === 'motion-browser';
		const region = browserGroup
			? mobile
				? { x: 18, y: 50, width: width - 36, height: 400 }
				: { x: width * 0.03, y: 96, width: width * 0.61, height: 302 }
			: mobile
				? { x: 18, y: 260, width: width - 36, height: 408 }
				: { x: width * 0.36, y: 96, width: width * 0.61, height: 302 };
		svg.append(node('rect', { ...region, class: 'motion-region' }));
		svg.append(
			node(
				'text',
				{
					x: browserGroup ? points[2][0] : points[0][0],
					y: mobile ? (browserGroup ? 490 : 42) : 150,
					class: 'motion-region-label'
				},
				regionLabels[0]
			)
		);
		svg.append(
			node(
				'text',
				{
					x: mobile ? 36 : width * (browserGroup ? 0.335 : 0.665),
					y: mobile ? (browserGroup ? 30 : 239) : 68,
					class: 'motion-region-label',
					style: mobile ? 'text-anchor:start' : ''
				},
				regionLabels[1]
			)
		);
		const boxWidth = mobile ? Math.min(300, width - 76) : Math.min(270, width * 0.25);
		paths = spec.phases.map((p) => {
			const [x, y] = points[p.from],
				[tx, ty] = points[p.to];
			let d;
			if (p.from === p.to) {
				d = `M ${x - boxWidth / 2 + 15} ${y + 56} V ${y + 78} H ${x + boxWidth / 2 - 15} V ${y + 56}`;
			} else if (mobile) {
				if (Math.abs(p.from - p.to) === 2) {
					const side = p.to > p.from ? width - 8 : 8;
					d = `M ${x + (p.to > p.from ? boxWidth / 2 : -boxWidth / 2)} ${y} H ${side} V ${ty} H ${tx + (p.to > p.from ? boxWidth / 2 : -boxWidth / 2)}`;
				} else {
					const dir = ty > y ? 1 : -1;
					d = `M ${x} ${y + dir * 56} L ${tx} ${ty - dir * 56}`;
				}
			} else {
				const dir = tx > x ? 1 : -1;
				if (Math.abs(p.from - p.to) === 2) {
					const lane = dir > 0 ? 125 : 365;
					d = `M ${x} ${y + (dir > 0 ? -56 : 56)} V ${lane} H ${tx} V ${ty + (dir > 0 ? -56 : 56)}`;
				} else {
					const offset = dir > 0 ? -17 : 17;
					d = `M ${x + (dir * boxWidth) / 2} ${y + offset} L ${tx - (dir * boxWidth) / 2} ${ty + offset}`;
				}
			}
			const path = node('path', {
				d,
				class: 'motion-track',
				'marker-end': `url(#${spec.id}-arrow)`
			});
			svg.append(path);
			return path;
		});
		activePath = node('path', {
			class: 'motion-active-path',
			'marker-end': `url(#${spec.id}-arrow)`
		});
		svg.append(activePath);
		boxes = [];
		readouts = [];
		spec.nodes.forEach((entry, i) => {
			const [x, y] = points[i];
			const g = node('g', { class: 'motion-node' });
			g.append(
				node('rect', { x: x - boxWidth / 2, y: y - 55, width: boxWidth, height: 110, rx: 8 })
			);
			g.append(
				node('text', { x: x - boxWidth / 2 + 16, y: y - 22, class: 'motion-node-name' }, entry[0])
			);
			g.append(
				node('text', { x: x - boxWidth / 2 + 16, y: y + 2, class: 'motion-node-sub' }, entry[1])
			);
			const readout = node(
				'text',
				{ x: x - boxWidth / 2 + 16, y: y + 29, class: 'motion-node-value' },
				entry[2]
			);
			g.append(readout);
			svg.append(g);
			boxes.push(g);
			readouts.push(readout);
		});
		marker = node('g', { class: 'motion-marker' });
		marker.append(node('circle', { r: 6 }));
		marker.append(
			node('rect', { x: -5, y: -5, width: 10, height: 10, rx: 2, class: 'motion-square' })
		);
		svg.append(marker);
		lastIndex = -1;
		draw(currentTime);
	}

	const observer = new ResizeObserver(layout);
	observer.observe(figure);
	const redraw = () => draw(currentTime);
	reduced.addEventListener('change', redraw);
	layout();
	return {
		draw,
		destroy() {
			observer.disconnect();
			reduced.removeEventListener('change', redraw);
		}
	};
}
