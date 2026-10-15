<script module lang="ts">
	export const metadata = {
		title: 'Reflex under the hood: what actually happens when you click?',
		description:
			'An illustrated walkthrough of how Reflex compiles Python into React, sends events, synchronizes state, and updates the screen. Explore the diagrams and real captured packets.',
		date: '2026-09-13',
		tags: ['python', 'reflex', 'react', 'web-development'],
		published: true,
		layout: 'interactive'
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import MotionFigure from './MotionFigure.svelte';
	import TableOfContents from './TableOfContents.svelte';
	import diagrams from './diagrams.json';
	import captures from './captures.json';
	import { initializeExplorer } from './explorer';
	import './walkthrough.css';

	let article: HTMLElement;
	const playback = new EventTarget();
	onMount(() => initializeExplorer(article));
</script>

<div class="reflex-walkthrough" bind:this={article}>
	<TableOfContents />
	<div class="publication-shell">
		<header id="top">
			<div class="eyebrow">September 13, 2026</div>
			<h1>What actually happens<br />when you click?</h1>
			<p class="lead">
				How Reflex turns Python into a React interface, and moves data between your browser and
				server.
			</p>
			<p class="article-byline">Farhan Ali Raza · Based on Reflex 0.9.10</p>
		</header>
		<main>
			<section id="introduction">
				<p>
					Reflex lets you write a web app entirely in Python. It compiles your UI into a React app
					that runs in the browser, while your state and event handlers stay in Python on the
					server. This post follows one small app through compilation, first load, a click, and a
					page change, using real captured messages.
				</p>
			</section>
			<section id="app">
				<div class="eyebrow">01 / The example</div>
				<h2>A two-page counter</h2>
				<div class="grid">
					<div class="card">
						<h3>Home /</h3>
						<p>
							<strong>Hello, Ada!</strong><br />Name input: Ada<br />Count: 0 · Doubled: 0<br
							/>Button: Add one
						</p>
						<p class="small">
							Typing calls <code>rename(value)</code>. Clicking calls <code>increment()</code>.
							Loading calls <code>enter_home()</code>.
						</p>
					</div>
					<div class="card">
						<h3>Details /details</h3>
						<p>
							<strong>Same state, another route</strong><br />Shows the same greeting and count.<br
							/>Has another increment button.
						</p>
						<p class="small">
							Navigating calls <code>enter_details()</code>. The count survives the route change.
						</p>
					</div>
				</div>
				<p>
					<code>greeting</code> is computed from <code>name</code>, and <code>doubled</code> from
					<code>count</code>. <code>_handled</code> is a backend-only counter: the underscore keeps it
					out of everything sent to the browser.
				</p>
				<details>
					<summary>Full app source</summary>
					<pre><code id="app-source"
							>import reflex as rx


class LabState(rx.State):
    name: str = "Ada"
    count: int = 0
    visits: int = 0
    page: str = "Not loaded"
    _handled: int = 0

    @rx.var
    def greeting(self) -&gt; str:
        return f"Hello, &#123;self.name&#125;!"

    @rx.var
    def doubled(self) -&gt; int:
        return self.count * 2

    @rx.event
    def rename(self, value: str):
        self.name = value
        self._handled += 1

    @rx.event
    def increment(self):
        self.count += 1
        self._handled += 1

    @rx.event
    def enter_home(self):
        self.page = "Home"
        self.visits += 1

    @rx.event
    def enter_details(self):
        self.page = "Details"
        self.visits += 1


def layout(content: rx.Component) -&gt; rx.Component:
    return rx.center(
        rx.vstack(
            rx.heading("Reflex flow lab", size="8"),
            rx.text("One Python state. Two routes. Watch every round trip."),
            rx.hstack(rx.link("Home", href="/"), rx.link("Details", href="/details")),
            rx.text("Server page: ", LabState.page, " · Page loads: ", LabState.visits),
            rx.text("State synchronized: ", rx.cond(rx.State.is_hydrated, "yes", "no")),
            rx.separator(),
            content,
            rx.separator(),
            spacing="5",
            width="100%",
            max_width="680px",
            padding="32px",
        ),
        min_height="100vh",
    )


def index() -&gt; rx.Component:
    return layout(
        rx.vstack(
            rx.heading(LabState.greeting, id="greeting"),
            rx.text("Your name"),
            rx.input(
                value=LabState.name,
                on_change=LabState.rename,
                id="name",
                aria_label="Your name",
            ),
            rx.text("Count: ", LabState.count, id="count"),
            rx.text("Doubled: ", LabState.doubled, id="doubled"),
            rx.button("Add one", on_click=LabState.increment, id="increment"),
            width="100%",
            spacing="4",
        )
    )


def details() -&gt; rx.Component:
    return layout(
        rx.vstack(
            rx.heading("Same state, another route"),
            rx.text(LabState.greeting),
            rx.text("Count: ", LabState.count, " · Doubled: ", LabState.doubled),
            rx.button("Add one here too", on_click=LabState.increment),
            spacing="4",
        )
    )


app = rx.App()
app.add_page(index, route="/", on_load=LabState.enter_home)
app.add_page(details, route="/details", on_load=LabState.enter_details)</code
						></pre>
				</details>
			</section>
			<section id="architecture">
				<div class="eyebrow">02 / Two runtimes</div>
				<h2>Python describes the UI. React runs it.</h2>
				<div
					class="flow"
					role="img"
					aria-label="Build time: Python page functions compile into React modules and assets."
				>
					<div class="node server">
						<b>Python source</b><span
							>rx.State · page functions · components · event declarations</span
						>
					</div>
					<div class="arrow">→</div>
					<div class="node">
						<b>Reflex compiler</b><span
							>Component tree → expressions, imports, styles, routes, contexts</span
						>
					</div>
					<div class="arrow">→</div>
					<div class="node browser">
						<b>Generated frontend</b><span
							>React modules + JavaScript runtime + CSS + asset references</span
						>
					</div>
				</div>
				<div
					class="flow"
					role="img"
					aria-label="Runtime: browser exchanges events and state deltas with Python, which accesses session state and optional databases."
				>
					<div class="node browser">
						<b>Browser / React</b><span>DOM · input events · client copy of public state</span>
					</div>
					<div class="arrow">⇄</div>
					<div class="node wire">
						<b>Socket.IO</b><span>Event requests →<br />← State deltas / frontend commands</span>
					</div>
					<div class="arrow">⇄</div>
					<div class="node server">
						<b>Python backend</b><span
							>Handlers · per-token state · middleware · optional database calls</span
						>
					</div>
				</div>
				<p>
					<strong>Page functions run once, at compile time.</strong> They build a component tree that
					becomes React code. A click sends an event name over a WebSocket; Python runs the handler against
					that visitor's state and sends back only the fields that changed. React re-renders from those
					fields. No HTML is generated per click.
				</p>
			</section>
			<section id="compile">
				<div class="eyebrow">03 / Before the visitor arrives</div>
				<h2>How your Python becomes browser code</h2>
				<MotionFigure spec={diagrams[1]} {captures} {playback} />

				<p>
					Reflex is a UI compiler, not a Python-to-JavaScript translator. It runs your page
					functions, turns the resulting components into React modules, and leaves your state class
					and handlers as Python on the server.
				</p>
				<h3>Page functions build a component tree</h3>
				<pre><code
						># What you write:
rx.button("Add one", on_click=LabState.increment, id="increment")

# What Python builds in memory (shortened):
Center
└── VStack
    ├── Text("Count: ", Var(LabState.count))
    └── Button("Add one", on_click=EventHandler(LabState.increment))</code
					></pre>
				<p>
					Because this runs at build time, a plain Python <code>if LabState.count &gt; 0</code>
					can't choose what a visitor sees later. Use <code>rx.cond</code> and
					<code>rx.foreach</code> for anything that depends on state.
				</p>
				<h3>State references become JavaScript expressions</h3>
				<p>
					Inside a page function, <code>LabState.count</code> is a <em>Var</em>: a placeholder that
					compiles to a read from a React context. Inside a handler, <code>self.count</code> is the real
					Python integer for one session.
				</p>
				<pre><code
						># In a page function:
LabState.count
# compiles to:
reflex___state____state__flow_lab___flow_lab____lab_state.count_rx_state_

# In a handler:
self.count  # e.g. 1</code
					></pre>
				<h3>Handlers stay in Python</h3>
				<p>
					The button's <code>on_click</code> compiles to a callback that sends the handler's
					<em>name</em>. The body of <code>increment()</code> never reaches the browser.
				</p>
				<pre><code
						>// Readable equivalent of the generated code:
const onClick = (_e) =&gt; addEvents([
  ReflexEvent("reflex___state____state.flow_lab___flow_lab____lab_state.increment")
]);
return jsx(RadixThemesButton, &#123; id: "increment", onClick &#125;, "Add one");</code
					></pre>
				<details>
					<summary>Generated button React module — actual excerpt</summary>
					<pre><code
							>export const Button_button_5b96ea87d6d46c65a36c4e74327104a9_4c100443 = memo((&#123;children&#125;) =&gt; &#123;
    const ref_increment = useRef(null); refs[&quot;ref_increment&quot;] = ref_increment;
const on_click_f878fea372bb8c958470a4b8a1cc88df = useCallback(((_e) =&gt; (addEvents([(ReflexEvent(&quot;reflex___state____state.flow_lab___flow_lab____lab_state.increment&quot;, (&#123;  &#125;), (&#123;  &#125;)))], [_e], (&#123;  &#125;)))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,&#123;id:&quot;increment&quot;,onClick:on_click_f878fea372bb8c958470a4b8a1cc88df,ref:ref_increment&#125;,children)
    )
&#125;);
Button_button_5b96ea87d6d46c65a36c4e74327104a9_4c100443.displayName = &quot;Button&quot;;</code
						></pre>
				</details>
				<h3>Defaults, then bundling</h3>
				<p>
					The compiler also writes each state's default values into
					<code>.web/utils/context.js</code> so the first render has something to show. These are build-time
					defaults, not any visitor's data. Vite and React Router then bundle the generated project into
					JavaScript and CSS. None of this reruns when state changes; only editing your source triggers
					a recompile.
				</p>
			</section>
			<section id="load">
				<div class="eyebrow">04 / An empty tab becomes a working app</div>
				<h2>First load has two different “hydrations”</h2>
				<MotionFigure spec={diagrams[2]} {captures} {playback} />

				<div class="callout">
					<strong>React hydration</strong> attaches React to the initial document.<br /><strong
						>Reflex state hydration</strong
					> replaces the build-time defaults with this visitor's state from Python.
				</div>
				<div class="sequence" role="table" aria-label="First-load sequence">
					<div class="label">Step</div>
					<div class="label">Browser / frontend</div>
					<div class="label">Python / backend</div>
					<div>1</div>
					<div>GET / returns an HTML shell with script and style links.</div>
					<div>No handler runs.</div>
					<div>2</div>
					<div>React mounts and renders the build-time defaults (“Hello, Ada!”).</div>
					<div>The real session may already hold a different name and count.</div>
					<div>3</div>
					<div>Read or create a token in sessionStorage; open the socket with it.</div>
					<div>Map the socket to that token.</div>
					<div>4</div>
					<div class="cross">
						Browser sends <code>State.hydrate</code>, then <code>on_load_internal</code>.
					</div>
					<div>5</div>
					<div>Receive the full public state and merge it into React.</div>
					<div>Load or create the session's state and send all public fields.</div>
					<div>6</div>
					<div>Receive page="Home", visits=1, then is_hydrated=true.</div>
					<div>Run <code>enter_home</code>, then mark the session hydrated.</div>
				</div>
				<p>
					The HTML is not rendered per visitor: this app builds with <code>ssr: false</code>, so
					every visitor gets the same shell. Current data always arrives over the socket.
				</p>
			</section>
			<section id="browser-events">
				<div class="eyebrow">05 / Inside the browser</div>
				<h2>From click to socket</h2>
				<MotionFigure spec={diagrams[0]} {captures} {playback} />

				<h3>1. The callback builds a Reflex event</h3>
				<pre><code
						>// The generated callback:
const onClick = (_e) =&gt; addEvents([
  ReflexEvent(LAB + ".increment", &#123;&#125;, &#123;&#125;)
], [_e], &#123;&#125;);

// The event it produces:
&#123; name: "reflex___state____state.flow_lab___flow_lab____lab_state.increment" &#125;</code
					></pre>
				<p>
					The DOM event is never sent. For the name input, the callback copies
					<code>_e.target.value</code> into <code>payload.value</code>; the increment button has no
					arguments, so its payload is empty.
				</p>
				<h3>2. addEvents, queueEvents, processEvent</h3>
				<p>
					<code>addEvents</code> applies any event actions (<code>preventDefault</code>,
					<code>stopPropagation</code>, throttle, debounce), then <code>queueEvents</code> pushes
					the event onto a plain JavaScript array. <code>processEvent</code> shifts it off and sends
					it:
				</p>
				<pre><code
						>if (statefulWorkQueued &amp;&amp; !socket.connected) return;
const event = event_queue.shift();

if (event.handler) &#123;
  await applyRestEvent(event, ...);   // uploads and other REST paths
&#125; else &#123;
  await applyEvent(event, ...);       // socket.emit("event", event)
&#125;</code
					></pre>
				<p>
					If the socket is down, events wait in the array until it reconnects. A page refresh
					discards them.
				</p>
				<h3>3. JavaScript doesn't wait for Python</h3>
				<p>
					<code>socket.emit</code> returns immediately. The reply arrives later through a separate socket
					listener, which merges it into React state.
				</p>
				<pre><code
						>Click callback → event queue → socket.emit()
                                 │
                       Python processes event
                                 │
Later socket callback ← StateUpdate.delta
          ↓
React reducer dispatch → updated context → render</code
					></pre>
			</section>

			<section id="explorer">
				<div class="eyebrow">06 / Step through the round trip</div>
				<h2>Follow one click, one layer at a time</h2>
				<MotionFigure spec={diagrams[3]} {captures} {playback} />

				<p>
					Pick an action and step through it. Each starts from the same hydrated Home page, and the
					packets match the captured app.
				</p>
				<div class="controls">
					<label for="action">Action </label><select id="action"
						><option value="increment">Click Add one</option><option value="rename"
							>Change Ada to Lin</option
						><option value="route">Navigate to Details</option></select
					><button id="prev" type="button">← Previous</button><button id="next" type="button"
						>Next →</button
					>
				</div>
				<div id="step-status" aria-live="polite">
					<div class="small" id="step-number">Step 1 of 6 · Simulation</div>
					<h3 class="stage" id="step-title">The screen is ready</h3>
					<p id="step-description">
						Both sides agree after hydration. The browser holds public fields; Python also holds
						_handled.
					</p>
				</div>
				<div class="flow" aria-label="Current processing layer">
					<div class="node browser" id="layer-browser">
						<b>1 · Browser</b><span>DOM + React state</span>
					</div>
					<div class="arrow">⇄</div>
					<div class="node wire" id="layer-wire">
						<b>2 · Wire</b><span>Socket.IO event / delta</span>
					</div>
					<div class="arrow">⇄</div>
					<div class="node server" id="layer-server">
						<b>3 · Python</b><span>Session state + handler</span>
					</div>
				</div>
				<div class="grid">
					<div>
						<h3>Browser's app state</h3>
						<pre id="client-state"></pre>
					</div>
					<div>
						<h3>Python's app state</h3>
						<pre id="server-state"></pre>
					</div>
				</div>
				<h3 id="payload-label">Selected layer's data</h3>
				<pre id="step-payload"></pre>
				<noscript><p>Enable JavaScript to use this stepper.</p></noscript>
			</section>
			<section id="representations">
				<div class="eyebrow">07 / The same data, in different forms</div>
				<h2>What crosses the wire?</h2>
				<div class="table-wrap">
					<table>
						<thead><tr><th>Where</th><th>Form</th></tr></thead><tbody>
							<tr><td>Browser input</td><td><code>event.target.value === "Lin"</code></td></tr>
							<tr
								><td>Reflex event</td><td
									><code
										>&#123;name: LAB + ".rename", payload: &#123;value: "Lin"&#125;, router_data:
										…&#125;</code
									></td
								></tr
							>
							<tr
								><td>Socket.IO frame</td><td><code>42/_event,["event",&#123;…&#125;]</code></td></tr
							>
							<tr><td>Python handler call</td><td><code>rename(value="Lin")</code></td></tr>
							<tr
								><td>Python reply</td><td
									><code
										>StateUpdate(delta=&#123;LAB: &#123;"name_rx_state_": "Lin",
										"greeting_rx_state_": "Hello, Lin!"&#125;&#125;)</code
									></td
								></tr
							>
							<tr><td>Browser merge</td><td><code>&#123;…oldState, …delta[LAB]&#125;</code></td></tr
							>
						</tbody>
					</table>
				</div>
				<p class="small">
					<code>LAB</code> is shorthand for
					<code>reflex___state____state.flow_lab___flow_lab____lab_state</code>.
				</p>
				<div class="grid">
					<div>
						<h3>Rename request</h3>
						<pre><code
								>&#123;
  "name": "reflex___state____state.flow_lab___flow_lab____lab_state.rename",
  "payload": &#123;"value": "Lin"&#125;,
  "router_data": &#123;"pathname": "/", "asPath": "/"&#125;
&#125;</code
							></pre>
					</div>
					<div>
						<h3>Rename response</h3>
						<pre><code
								>&#123;
  "delta": &#123;
    "reflex___state____state.flow_lab___flow_lab____lab_state": &#123;
      "name_rx_state_": "Lin",
      "greeting_rx_state_": "Hello, Lin!"
    &#125;
  &#125;
&#125;</code
							></pre>
					</div>
				</div>
				<p>
					The request carries no session token; the server already knows it from the socket
					connection. The response contains only the changed field and the computed field that
					depends on it.
				</p>
				<h3>The raw frame</h3>
				<pre><code
						>42/_event,["event",&#123;"name":"reflex___state____state.flow_lab___flow_lab____lab_state.rename","payload":&#123;"value":"Lin"&#125;,"router_data":&#123;"pathname":"/","asPath":"/"&#125;&#125;]</code
					></pre>
				<p>
					<code>4</code> is the Engine.IO message type, <code>2</code> the Socket.IO event type,
					<code>/_event</code> the namespace, and <code>"event"</code> the event name. Everything after
					that is JSON, so Python values arrive as JSON numbers, strings, booleans, arrays and objects.
					Nothing is pickled, and types beyond that need a Reflex serializer.
				</p>
			</section>
			<section id="capture">
				<div class="eyebrow">08 / Evidence from the working app</div>
				<h2>Read the real conversation</h2>
				<p>
					Recorded with headless Chromium: load Home → increment → rename to Lin → open Details →
					refresh. Client IDs and socket keys are redacted.
				</p>
				<div class="controls">
					<label for="frame-select">Recorded frame </label><select
						id="frame-select"
						aria-label="Recorded Socket.IO frame"
					></select>
				</div>
				<p class="small" id="frame-direction"></p>
				<div class="grid">
					<div>
						<h3>WebSocket text</h3>
						<pre class="packet" id="frame-raw"></pre>
					</div>
					<div>
						<h3>Decoded event or handshake</h3>
						<pre class="packet" id="frame-decoded"></pre>
					</div>
				</div>
				<p>
					The first hydrate sends everything (count 0, name Ada). Increment sends only count and
					doubled. Rename sends only name and greeting. After the refresh, a new connection hydrates
					count 1 and name Lin from the saved session.
				</p>
			</section>
			<section id="server">
				<div class="eyebrow">09 / Inside the server</div>
				<h2>From event name to Python mutation</h2>
				<ol>
					<li>
						<strong>Find the session.</strong> <code>EventNamespace.on_event</code> looks up the
						token linked to this socket and builds an <code>Event</code>.
					</li>
					<li>
						<strong>Queue it.</strong> The event processor schedules the handler for that token.
					</li>
					<li>
						<strong>Lock and run.</strong> The state manager loads this token's state and locks it while
						the handler runs, so two visitors never share a counter.
					</li>
					<li>
						<strong>Track changes.</strong> Assigning <code>self.count</code> marks it dirty, which
						also invalidates <code>doubled</code>.
					</li>
					<li>
						<strong>Emit the delta.</strong> <code>get_delta()</code> collects the dirty public fields
						and sends them to that token's socket.
					</li>
				</ol>
				<div
					class="flow"
					role="img"
					aria-label="Handler processing: token resolves state, handler changes fields, dirty tracking computes a delta, emit sends to the matching browser."
				>
					<div class="node"><b>Token → state</b><span>Find this visitor's LabState</span></div>
					<div class="arrow">→</div>
					<div class="node server">
						<b>count += 1</b><span>count dirty; doubled invalidated</span>
					</div>
					<div class="arrow">→</div>
					<div class="node wire">
						<b>Public delta</b><span>count=1, doubled=2 → matching socket</span>
					</div>
				</div>
				<p>
					<code>_handled</code> changes too, but underscore fields never appear in a delta.
					<code>doubled</code> is recomputed in Python and sent as a value; the browser never runs the
					getter. The state lock is not a database transaction, so database writes still need their own.
				</p>
			</section>
			<section id="render">
				<div class="eyebrow">10 / Back in the browser</div>
				<h2>A delta changes state; React changes the DOM</h2>
				<pre><code
						>// The reducer, in full:
export const applyDelta = (state, delta) =&gt; &#123;
  return &#123; ...state, ...delta &#125;;
&#125;;

// Applied to the counter reply:
dispatch[LAB](&#123; count_rx_state_: 1, doubled_rx_state_: 2 &#125;);</code
					></pre>
				<p>
					The merge is shallow: fields missing from the delta keep their values, and a changed list
					is sent whole. React re-renders whatever reads those fields. If a delta names a substate
					the frontend doesn't know, the frontend and backend builds are out of sync and Reflex
					reports an error.
				</p>
				<p>
					The counter waits for the server's reply before it changes. Text inputs feel instant
					because the input keeps its own value and Reflex debounces the event (300 ms here).
				</p>
			</section>
			<section id="routing">
				<div class="eyebrow">11 / A new URL, the same session</div>
				<h2>What happens when you click Details?</h2>
				<MotionFigure spec={diagrams[4]} {captures} {playback} />

				<div
					class="flow"
					role="img"
					aria-label="Routing: internal link changes React Router location, loads route UI, sends on_load_internal with routing data, then updates page and visits."
				>
					<div class="node browser">
						<b>Internal link</b><span>React Router navigates to /details</span>
					</div>
					<div class="arrow">→</div>
					<div class="node browser">
						<b>Route UI</b><span>Existing state contexts remain available</span>
					</div>
					<div class="arrow">→</div>
					<div class="node wire">
						<b>on_load_internal</b><span>pathname=/details, asPath=/details</span>
					</div>
					<div class="arrow">→</div>
					<div class="node server"><b>enter_details</b><span>page=Details; visits += 1</span></div>
				</div>
				<p>
					React Router swaps the page without reloading the document, so the socket and state stay.
					The browser sends <code>on_load_internal</code> with the new path; Python runs
					<code>enter_details</code> and sends back the router, page and visits changes. The new
					page can render before its on-load handler finishes, so check <code>is_hydrated</code> when
					that matters.
				</p>
				<div class="table-wrap">
					<table>
						<thead><tr><th>Action</th><th>What happens</th></tr></thead><tbody>
							<tr
								><td>Click an internal link</td><td
									>Same document and socket. No full hydrate; on-load runs.</td
								></tr
							>
							<tr
								><td>Refresh</td><td
									>New document and socket. The token survives in sessionStorage, so hydrate
									restores the saved state, then on-load runs.</td
								></tr
							>
							<tr
								><td>Open in a fresh browser</td><td>New token, so state starts from defaults.</td
								></tr
							>
							<tr
								><td>Change only the query string</td><td
									>On-load runs again with the new query. Query values arrive as strings; validate
									them on the server.</td
								></tr
							>
						</tbody>
					</table>
				</div>
			</section>
			<section id="sessions">
				<div class="eyebrow">12 / Where does the data live?</div>
				<h2>Browser copy, session state, and durable records</h2>
				<MotionFigure spec={diagrams[5]} {captures} {playback} />

				<div class="grid">
					<div class="card">
						<h3>Browser</h3>
						<ul>
							<li>DOM: what's on screen.</li>
							<li>React contexts: a copy of public state.</li>
							<li>sessionStorage: the client token.</li>
							<li>Optional cookie / localStorage fields you declare.</li>
						</ul>
					</div>
					<div class="card">
						<h3>Server</h3>
						<ul>
							<li>State manager: the real session state (disk by default, or memory/Redis).</li>
							<li>Backend-only fields and handlers.</li>
							<li>Your database, if you use one, for anything that must last.</li>
						</ul>
					</div>
				</div>
				<p>
					Session state can be evicted or expire, so treat it as a cache for UI state, not storage.
					The token identifies a tab session, not a user, so it is no substitute for authentication.
					Anything in public state is visible to the visitor, even if no component shows it; keep
					secrets in underscore fields and check permissions inside handlers.
				</p>
			</section>
			<section id="debug">
				<div class="eyebrow">13 / Verify with your own eyes</div>
				<h2>See it in DevTools</h2>
				<ol>
					<li>Open Network, enable Preserve log, and refresh.</li>
					<li>
						Filter to WS and pick the <code>/_event</code> connection (not Vite's hot-reload socket).
					</li>
					<li>
						In Messages, find <code>hydrate</code> and <code>on_load_internal</code>, then click Add
						one and compare the request with the reply.
					</li>
					<li>Rename to Lin, then click Details and confirm the count stays.</li>
					<li>
						For breakpoints: <code>applyEvent</code> before <code>socket.emit</code> in
						<code>utils/state.js</code>, your handler in Python, and <code>applyDelta</code> when the
						reply lands.
					</li>
				</ol>
				<h3>Common wrong mental models</h3>
				<ul>
					<li>
						<strong>“Python runs in the browser.”</strong> The browser runs React; Python stays on the
						server.
					</li>
					<li>
						<strong>“The server sends HTML for every click.”</strong> It sends a state delta.
					</li>
					<li>
						<strong>“The browser sends the new count.”</strong> It sends a handler name; Python does
						the increment.
					</li>
					<li>
						<strong>“Every update sends all fields.”</strong> Only hydration does. Normal updates send
						changed fields plus dependent computed ones.
					</li>
					<li>
						<strong>“Each page has its own state.”</strong> Both pages share the session's LabState.
					</li>
				</ul>
			</section>
		</main>
		<footer>
			<p><a href="/blog">← All articles</a></p>
		</footer>
	</div>
</div>
