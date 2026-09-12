<script lang="ts">
	import { onMount } from 'svelte';
	import { createDiagram, type DiagramSpec } from './diagram';

	let {
		spec,
		captures,
		playback
	}: {
		spec: DiagramSpec;
		captures: { direction: string; data: string }[];
		playback: EventTarget;
	} = $props();
	let figure: HTMLElement;
	let svg: SVGSVGElement;
	let time = $state(0);
	let running = $state(false);
	let speed = $state(1);
	let format = $state('json');
	let messageIndex = $state(0);
	let frame = 0;
	let previousTime = 0;
	let drawing: ReturnType<typeof createDiagram> | undefined;
	const duration = $derived(spec.phases.length * 2600);
	const phaseIndex = $derived(Math.min(spec.phases.length - 1, Math.floor(time / 2600)));
	const phase = $derived(spec.phases[phaseIndex]);
	const phaseFrames: Record<string, Record<number, number[]>> = {
		'motion-browser': { 5: [9], 7: [10] },
		'motion-load': { 3: [0, 1, 2], 4: [3, 4], 5: [5], 7: [7, 8] },
		'motion-event': { 1: [9], 5: [10] },
		'motion-route': { 2: [13], 4: [14, 15, 16] },
		'motion-state': { 1: [0, 1, 2], 3: [5] }
	};
	const frameIds = $derived(phaseFrames[spec.id]?.[phaseIndex] ?? []);
	const packet = $derived.by(() => {
		if (!frameIds.length) {
			const compilation = spec.id === 'motion-compile';
			return {
				direction:
					phase.from === phase.to
						? 'Local processing in ' + spec.nodes[phase.from][0]
						: spec.nodes[phase.from][0] + ' → ' + spec.nodes[phase.to][0],
				name: compilation
					? phase.title
					: phase.kind === 'local'
						? 'Local code / state operation'
						: 'HTTP or build output · illustrative representation',
				body: phase.payload,
				context: compilation
					? 'Actual source/output excerpts where identified; illustrative timing. These are compilation artifacts, not event payloads. Full modules and build output are available below.'
					: phase.kind === 'local'
						? 'This is local processing, not an outgoing Socket.IO payload. Advance to a request or response to inspect a recorded message.'
						: 'This phase shows an explanatory representation. The recorded Socket.IO frames begin when the backend connection is established.'
			};
		}
		const id = frameIds[Math.min(messageIndex, frameIds.length - 1)];
		const message = captures[id];
		const raw = message.data;
		let decoded: Record<string, unknown> = {};
		let name = 'Socket.IO namespace connection';
		if (raw.startsWith('42/_event,')) {
			const envelope = JSON.parse(raw.slice('42/_event,'.length));
			decoded = envelope[1];
			name = String(
				decoded.name ?? (decoded.delta ? 'StateUpdate.delta' : 'Socket.IO ' + envelope[0])
			);
		} else if (raw.startsWith('0{')) {
			decoded = JSON.parse(raw.slice(1));
			name = 'Engine.IO opening handshake';
		} else if (raw.startsWith('40/_event,')) {
			const body = raw.slice('40/_event,'.length);
			decoded = body ? JSON.parse(body) : { namespace: '/_event', type: 'connect' };
		}
		return {
			direction: message.direction,
			name,
			body: format === 'raw' ? raw : JSON.stringify(decoded, null, 2),
			context: `Recorded frame ${id + 1} of ${captures.length} · Volatile identifiers are redacted. ${format === 'raw' ? 'Exact captured WebSocket text, with redactions.' : 'Decoded message body; Raw frame includes the transport prefix and event envelope.'} This is the saved sample trace, not live network traffic.`
		};
	});
	$effect(() => {
		void phaseIndex;
		messageIndex = 0;
	});

	function stop() {
		running = false;
		cancelAnimationFrame(frame);
	}
	function seek(value: number) {
		stop();
		time = Math.max(0, Math.min(duration, value));
		drawing?.draw(time);
	}
	function advance(now: number) {
		time = Math.min(duration, time + (now - previousTime) * speed);
		previousTime = now;
		drawing?.draw(time);
		if (time >= duration) stop();
		else frame = requestAnimationFrame(advance);
	}
	function start() {
		playback.dispatchEvent(new Event('play'));
		if (time >= duration) time = 0;
		running = true;
		previousTime = performance.now();
		frame = requestAnimationFrame(advance);
	}
	onMount(() => {
		drawing = createDiagram(svg, figure, spec);
		const visibility = () => {
			if (document.hidden) stop();
		};
		const observer = new IntersectionObserver((entries) => {
			if (!entries[0].isIntersecting) stop();
		});
		observer.observe(figure);
		playback.addEventListener('play', stop);
		document.addEventListener('visibilitychange', visibility);
		const reduced = matchMedia('(prefers-reduced-motion: reduce)');
		reduced.addEventListener('change', stop);
		return () => {
			stop();
			drawing?.destroy();
			observer.disconnect();
			playback.removeEventListener('play', stop);
			document.removeEventListener('visibilitychange', visibility);
			reduced.removeEventListener('change', stop);
		};
	});
</script>

<figure id={spec.id} class="motion-figure" bind:this={figure}>
	<figcaption>
		<span class="motion-kicker">Figure {spec.number} · Follow the data</span>
		<h3>{spec.title}</h3>
		<p>{spec.intro}</p>
		<button type="button" data-control="play" onclick={() => (running ? stop() : start())}
			>{running ? 'Pause' : time >= duration ? 'Play again' : 'Play'}</button
		>
		<span class="motion-legend"
			><span class="request-dot">Request</span><span class="response-dot">Response</span><span
				class="local-dot">Local work</span
			></span
		>
	</figcaption>
	<svg class="motion-diagram" role="img" aria-label={spec.title} bind:this={svg}
		><title>{spec.title}</title></svg
	>
	<div class="motion-explanation" aria-live={running ? 'off' : 'polite'}>
		<span class="motion-phase"
			>{String(phaseIndex + 1).padStart(2, '0')} · {phase.kind === 'local'
				? 'Local processing'
				: phase.kind === 'request'
					? 'Request →'
					: '← Response'}</span
		>
		<h4>{phase.title}</h4>
		<p>{phase.note}</p>
	</div>
	<details class="motion-controls">
		<summary>Timeline &amp; playback controls</summary>
		<div class="motion-toolbar">
			<button
				type="button"
				data-control="replay"
				onclick={() => {
					seek(0);
					start();
				}}>Replay</button
			>
			<button
				type="button"
				data-control="back"
				aria-label="Previous phase"
				disabled={time === 0}
				onclick={() => seek((Math.ceil(time / 2600) - 1) * 2600)}>←</button
			>
			<button
				type="button"
				data-control="forward"
				aria-label="Next phase"
				disabled={time >= duration}
				onclick={() => seek((Math.floor(time / 2600) + 1) * 2600)}>→</button
			>
			<label
				>Speed <select data-control="speed" bind:value={speed}
					><option value={0.5}>0.5×</option><option value={1}>1×</option><option value={1.5}
						>1.5×</option
					></select
				></label
			>
		</div>
		<div class="motion-progress">
			<label for={`${spec.id}-seek`}>Illustrative progress</label>
			<input
				id={`${spec.id}-seek`}
				type="range"
				min="0"
				max="1000"
				step="1"
				value={(time / duration) * 1000}
				aria-valuetext={`Phase ${phaseIndex + 1} of ${spec.phases.length}: ${phase.title}`}
				oninput={(event) => seek((Number(event.currentTarget.value) / 1000) * duration)}
			/>
			<output>{phaseIndex + 1} / {spec.phases.length}</output>
		</div>
	</details>
	<div
		class="motion-payload wire-panel"
		data-kind={phase.kind}
		role="region"
		aria-label={spec.id === 'motion-compile'
			? 'Compilation artifact inspector'
			: 'Packet inspector'}
	>
		<div class="wire-heading">
			<span
				>{spec.id === 'motion-compile'
					? 'Compilation artifact inspector'
					: 'Packet inspector'}</span
			><button type="button" data-control="inspect" onclick={stop}>Pause to inspect</button>
		</div>
		<p class="wire-direction">{packet.direction}</p>
		<p class="wire-name">{packet.name}</p>
		<div class="wire-tools">
			{#if spec.id !== 'motion-compile'}
				<button
					type="button"
					data-format="json"
					aria-pressed={format === 'json'}
					disabled={!frameIds.length}
					onclick={() => (format = 'json')}>Decoded JSON</button
				>
				<button
					type="button"
					data-format="raw"
					aria-pressed={format === 'raw'}
					disabled={!frameIds.length}
					onclick={() => (format = 'raw')}>Raw frame</button
				>
			{/if}
			{#if frameIds.length > 1}<label class="wire-frame-label"
					>Message <select
						aria-label="Message in this phase"
						class="wire-frame"
						bind:value={messageIndex}
						>{#each frameIds as id, i}<option value={i}
								>{i + 1} / {frameIds.length} · {captures[id].direction}</option
							>{/each}</select
					></label
				>{/if}
		</div>
		<!-- Scrollable packet text must remain keyboard accessible. -->
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<pre
			class="wire-body"
			role="region"
			tabindex="0"
			aria-label="Current packet contents">{packet.body}</pre>
		<p class="wire-context">{packet.context}</p>
	</div>
	<p class="motion-footnote">
		Illustrative timing, not measured latency. Pause or drag the timeline to inspect any phase. {spec.id ===
		'motion-state'
			? 'Shortened field names in this figure; full generated names remain in the source and captures.'
			: 'The original source and real captured frames remain below.'}
	</p>
</figure>
