import captures from './captures.json';

/** Mount the article's click explorer and transcript viewer, with route cleanup. */
export function initializeExplorer(root: HTMLElement) {
	const abort = new AbortController();
	const { signal } = abort;

	const LAB = 'reflex___state____state.flow_lab___flow_lab____lab_state';
	const ROOT = 'reflex___state____state';
	const ONLOAD = ROOT + '.reflex___state____on_load_internal_state.on_load_internal';
	const initial = {
		name: 'Ada',
		count: 0,
		visits: 1,
		page: 'Home',
		greeting: 'Hello, Ada!',
		doubled: 0
	};
	const stages = [
		[
			'browser',
			'The screen is ready',
			'Both sides agree after hydration. The browser holds public fields; Python also holds _handled.'
		],
		[
			'browser',
			'React handles your action',
			'A generated callback selects a handler and extracts only the required arguments. For navigation, React Router changes the location and queues the internal on-load event.'
		],
		[
			'wire',
			'An event travels to Python',
			'Socket.IO sends an object containing the handler name and router_data. Only rename needs a payload argument. The session token belongs to the connection.'
		],
		[
			'server',
			'Python changes the session state',
			'The backend resolves the token and registered handler. The protected state mutation changes Python values and marks affected fields dirty.'
		],
		[
			'wire',
			'A delta travels back',
			'Public changed fields and dependent computed values are serialized. _handled stays on the server. Routing also emits root-router/hydration deltas omitted from this app-only view.'
		],
		[
			'browser',
			'React merges and renders',
			'The substate reducer shallow-merges received fields. React updates the affected visible output. Omitted fields retain their previous values.'
		]
	];
	let step = 0;
	const el = (id: string) => {
		const element = root.querySelector<HTMLElement>('#' + id);
		if (!element) throw new Error('Missing walkthrough element: ' + id);
		return element;
	};
	const select = (id: string) => el(id) as HTMLSelectElement;
	const button = (id: string) => el(id) as HTMLButtonElement;
	const pretty = (value: unknown) => JSON.stringify(value, null, 2);
	function scenario() {
		const kind = select('action').value;
		const route = kind === 'route';
		const event: {
			name: string;
			payload?: { value: string };
			router_data?: { pathname: string; asPath: string };
		} = { name: route ? ONLOAD : LAB + '.' + kind };
		if (kind === 'rename') event.payload = { value: 'Lin' };
		event.router_data = { pathname: route ? '/details' : '/', asPath: route ? '/details' : '/' };
		const changes =
			kind === 'increment'
				? { count: 1, doubled: 2 }
				: kind === 'rename'
					? { name: 'Lin', greeting: 'Hello, Lin!' }
					: { page: 'Details', visits: 2 };
		const delta = {
			[LAB]: Object.fromEntries(Object.entries(changes).map(([k, v]) => [k + '_rx_state_', v]))
		};
		return { kind, event, changes, delta };
	}
	function render() {
		const s = scenario(),
			stage = stages[step];
		el('step-number').textContent = `Step ${step + 1} of ${stages.length} · Simulation`;
		el('step-title').textContent = stage[1];
		el('step-description').textContent = stage[2];
		['browser', 'wire', 'server'].forEach((layer) =>
			el('layer-' + layer).classList.toggle('active', layer === stage[0])
		);
		el('client-state').textContent = pretty(
			Object.fromEntries(
				Object.entries({ ...initial, ...(step === 5 ? s.changes : {}) }).map(([k, v]) => [
					k + '_rx_state_',
					v
				])
			)
		);
		el('server-state').textContent = pretty({
			...initial,
			...(step >= 3 ? s.changes : {}),
			_handled: step >= 3 && s.kind !== 'route' ? 1 : 0
		});
		const snippets = [
			'Ready: name="Ada", count=0, page="Home", visits=1',
			s.kind === 'increment'
				? 'on_click=LabState.increment'
				: s.kind === 'rename'
					? 'event.target.value → "Lin" → payload.value'
					: 'React Router location → /details → on_load_internal',
			'42/_event,' + JSON.stringify(['event', s.event]),
			s.kind === 'increment'
				? 'self.count += 1\nself._handled += 1\n# doubled recomputes to 2'
				: s.kind === 'rename'
					? 'self.name = "Lin"\nself._handled += 1\n# greeting recomputes to "Hello, Lin!"'
					: 'self.page = "Details"\nself.visits += 1\n# on_load chain later sets is_hydrated=True',
			pretty({ delta: s.delta }),
			'applyDelta = (state, delta) => ({ ...state, ...delta });\n\n' +
				(s.kind === 'increment'
					? 'Visible: Count: 1 · Doubled: 2'
					: s.kind === 'rename'
						? 'Visible: Hello, Lin!'
						: 'Visible: Same state, another route · Page loads: 2')
		];
		el('step-payload').textContent = snippets[step];
		button('prev').disabled = step === 0;
		button('next').disabled = step === stages.length - 1;
	}
	el('prev').addEventListener(
		'click',
		() => {
			if (step > 0) step--;
			render();
		},
		{ signal }
	);
	el('next').addEventListener(
		'click',
		() => {
			if (step < stages.length - 1) step++;
			render();
		},
		{ signal }
	);
	el('action').addEventListener(
		'change',
		() => {
			step = 0;
			render();
		},
		{ signal }
	);
	render();
	const frames = captures;
	function decodeFrame(text: string) {
		if (text.startsWith('42/_event,')) return JSON.parse(text.slice('42/_event,'.length));
		if (text.startsWith('40/_event,'))
			return text.length > 10
				? JSON.parse(text.slice('40/_event,'.length))
				: 'Socket.IO namespace connect';
		if (text.startsWith('0{')) return JSON.parse(text.slice(1));
		return text;
	}
	frames.forEach((frame, i) => {
		const option = document.createElement('option');
		option.value = String(i);
		const decoded = decodeFrame(frame.data);
		const label = Array.isArray(decoded)
			? (decoded[1].name?.split('.').pop() ?? 'state delta')
			: frame.data.startsWith('0{')
				? 'Engine.IO handshake'
				: 'namespace control';
		option.textContent = `${i + 1} · ${frame.direction} · ${label}`;
		el('frame-select').append(option);
	});
	function showFrame() {
		const frame = frames[Number(select('frame-select').value)];
		el('frame-direction').textContent = frame.direction + ' · volatile identifiers sanitized';
		el('frame-raw').textContent = frame.data;
		el('frame-decoded').textContent = pretty(decodeFrame(frame.data));
	}
	el('frame-select').addEventListener('change', showFrame, { signal });
	showFrame();

	return () => {
		abort.abort();
	};
}
