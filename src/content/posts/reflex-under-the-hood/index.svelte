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
			<div class="eyebrow">September 13, 2026 &nbsp; · &nbsp; Engineering</div>
			<h1>What actually happens<br />when you click?</h1>
			<p class="lead">
				How Reflex turns Python into a React interface, and moves data between your browser and
				server.
			</p>
			<p class="article-byline">Farhan Ali Raza · An illustrated framework walkthrough</p>
			<details class="article-meta">
				<summary>About this walkthrough</summary>
				<p class="meta">
					Verified against this checkout: <code>9c270ca6c</code> · Reflex
					<code>0.9.10.post41.dev0+9c270ca6c</code> · September 9, 2026. This guide covers the standard
					compiled, stateful app path in this example; optional systems are mapped separately. It is
					not a claim that every Reflex mode works identically.
				</p>
			</details>
		</header>
		<main>
			<section id="introduction">
				<p>
					Reflex lets you describe the screen in Python. It compiles that description into a React
					app. Your browser runs the screen; your Python server runs the stateful event handlers.
				</p>
				<p>
					Think of a restaurant: the browser shows the menu and takes your order. The Python server
					is the kitchen. An event is the order ticket. A state update is the kitchen telling the
					screen what changed. Below, we open the ticket, follow the kitchen code, and inspect the
					exact reply.
				</p>
			</section>
			<section id="app">
				<div class="eyebrow">01 / Start small</div>
				<h2>The entire story fits in two pages</h2>
				<div class="grid">
					<div class="card">
						<h3>Home /</h3>
						<p>
							<strong>Hello, Ada!</strong><br />Name input: Ada<br />Count: 0 · Doubled: 0<br
							/>Button: Add one
						</p>
						<p class="small">
							Typing invokes <code>rename(value)</code>. Clicking invokes <code>increment()</code>.
							Loading invokes <code>enter_home()</code>.
						</p>
					</div>
					<div class="card">
						<h3>Details /details</h3>
						<p>
							<strong>Same state, another route</strong><br />Shows the same greeting and count.<br
							/>Has another increment button.
						</p>
						<p class="small">
							Navigating invokes <code>enter_details()</code>. The state survives the route change;
							visits increase.
						</p>
					</div>
				</div>
				<p>
					The server starts with <code>name="Ada"</code>, <code>count=0</code>,
					<code>visits=0</code>, and <code>page="Not loaded"</code>. The first home on-load changes
					page to <code>"Home"</code> and visits to <code>1</code>. <code>greeting</code> depends on
					name; <code>doubled</code> depends on count. <code>_handled</code> is a backend-only counter,
					deliberately absent from public state snapshots.
				</p>
				<h3>Run this checkout's example</h3>
				<pre><code
						># From the original Reflex development checkout:
cd examples/flow_lab
uv run reflex run --frontend-port 3037 --backend-port 8037
# App: http://localhost:3037
# This guide: http://localhost:3037/walkthrough.html</code
					></pre>
				<p class="small">
					Run <code>uv sync</code> at the repository root first if dependencies are missing. This app
					uses the repository's uv environment. The guide also opens directly as an HTML file and needs
					no CDN or backend. The interactive explorer below is a teaching simulation; the separate Python
					app is the live framework example.
				</p>
				<details>
					<summary>Full runnable Python source — not pseudocode</summary>
					<pre><code id="app-source"
							>&quot;&quot;&quot;Follow a name and a counter from Python to the browser and back.&quot;&quot;&quot;

import reflex as rx


class LabState(rx.State):
    &quot;&quot;&quot;Per-browser data shared by both pages.&quot;&quot;&quot;

    name: str = &quot;Ada&quot;
    count: int = 0
    visits: int = 0
    page: str = &quot;Not loaded&quot;
    _handled: int = 0

    @rx.var
    def greeting(self) -&gt; str:
        &quot;&quot;&quot;Return the greeting derived from the current name.

        Returns:
            A greeting for the current visitor.
        &quot;&quot;&quot;
        return f&quot;Hello, &#123;self.name&#125;!&quot;

    @rx.var
    def doubled(self) -&gt; int:
        &quot;&quot;&quot;Return twice the current counter.

        Returns:
            The counter multiplied by two.
        &quot;&quot;&quot;
        return self.count * 2

    @rx.event
    def rename(self, value: str):
        &quot;&quot;&quot;Store the text received from the input.

        Args:
            value: The input&#x27;s current text.
        &quot;&quot;&quot;
        self.name = value
        self._handled += 1

    @rx.event
    def increment(self):
        &quot;&quot;&quot;Increase the counter by one.&quot;&quot;&quot;
        self.count += 1
        self._handled += 1

    @rx.event
    def enter_home(self):
        &quot;&quot;&quot;Record a visit to the home page.&quot;&quot;&quot;
        self.page = &quot;Home&quot;
        self.visits += 1

    @rx.event
    def enter_details(self):
        &quot;&quot;&quot;Record a visit to the details page.&quot;&quot;&quot;
        self.page = &quot;Details&quot;
        self.visits += 1


def layout(content: rx.Component) -&gt; rx.Component:
    &quot;&quot;&quot;Wrap either page in shared navigation and state readouts.

    Args:
        content: The page-specific content.

    Returns:
        The complete page component.
    &quot;&quot;&quot;
    return rx.center(
        rx.vstack(
            rx.heading(&quot;Reflex flow lab&quot;, size=&quot;8&quot;),
            rx.text(&quot;One Python state. Two routes. Watch every round trip.&quot;),
            rx.hstack(rx.link(&quot;Home&quot;, href=&quot;/&quot;), rx.link(&quot;Details&quot;, href=&quot;/details&quot;)),
            rx.text(&quot;Server page: &quot;, LabState.page, &quot; · Page loads: &quot;, LabState.visits),
            rx.text(&quot;State synchronized: &quot;, rx.cond(rx.State.is_hydrated, &quot;yes&quot;, &quot;no&quot;)),
            rx.separator(),
            content,
            rx.separator(),
            rx.link(
                &quot;Open the illustrated walkthrough ↗&quot;,
                href=&quot;/walkthrough.html&quot;,
                is_external=True,
            ),
            spacing=&quot;5&quot;,
            width=&quot;100%&quot;,
            max_width=&quot;680px&quot;,
            padding=&quot;32px&quot;,
        ),
        min_height=&quot;100vh&quot;,
    )


def index() -&gt; rx.Component:
    &quot;&quot;&quot;Build the home page at compile time.

    Returns:
        The greeting, editable name, and counter controls.
    &quot;&quot;&quot;
    return layout(
        rx.vstack(
            rx.heading(LabState.greeting, id=&quot;greeting&quot;),
            rx.text(&quot;Your name&quot;),
            rx.input(
                value=LabState.name,
                on_change=LabState.rename,
                id=&quot;name&quot;,
                aria_label=&quot;Your name&quot;,
            ),
            rx.text(&quot;Count: &quot;, LabState.count, id=&quot;count&quot;),
            rx.text(&quot;Doubled: &quot;, LabState.doubled, id=&quot;doubled&quot;),
            rx.button(&quot;Add one&quot;, on_click=LabState.increment, id=&quot;increment&quot;),
            width=&quot;100%&quot;,
            spacing=&quot;4&quot;,
        )
    )


def details() -&gt; rx.Component:
    &quot;&quot;&quot;Build a second route that reads the same state.

    Returns:
        The details page with a counter control.
    &quot;&quot;&quot;
    return layout(
        rx.vstack(
            rx.heading(&quot;Same state, another route&quot;),
            rx.text(LabState.greeting),
            rx.text(&quot;Count: &quot;, LabState.count, &quot; · Doubled: &quot;, LabState.doubled),
            rx.button(&quot;Add one here too&quot;, on_click=LabState.increment),
            spacing=&quot;4&quot;,
        )
    )


app = rx.App()
app.add_page(index, route=&quot;/&quot;, on_load=LabState.enter_home)
app.add_page(details, route=&quot;/details&quot;, on_load=LabState.enter_details)
</code></pre>
				</details>
				<details>
					<summary>Configuration</summary>
					<pre><code
							>&quot;&quot;&quot;Configuration for the data-flow teaching app.&quot;&quot;&quot;

import reflex as rx

config = rx.Config(
    app_name=&quot;flow_lab&quot;,
    plugins=[rx.plugins.RadixThemesPlugin()],
    disable_plugins=[rx.plugins.SitemapPlugin],
)
</code></pre>
				</details>
			</section>
			<section id="architecture">
				<div class="eyebrow">02 / Two runtimes, two kinds of work</div>
				<h2>Python makes the instructions. React runs the screen.</h2>
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
					<strong>The page function does not run on the Python server every time you click.</strong>
					For this app it builds a component description during compilation. A click runs an event handler
					against a server state instance. React then renders using the received state. This differs
					from rendering a whole new HTML document for each event.
				</p>
				<p>
					There are two services in the usual development setup: a Vite/React Router frontend
					serving the page and modules, and an ASGI backend handling Socket.IO and API endpoints.
					Production serves built frontend assets and a backend, often behind a reverse proxy.
					Single-port mode can put both behind one port. This repository uses Starlette for the
					backend path; older descriptions may refer to a different stack.
				</p>
			</section>
			<section id="compile">
				<div class="eyebrow">03 / Before the visitor arrives</div>
				<h2>How your Python becomes browser code</h2>
				<MotionFigure spec={diagrams[1]} {captures} {playback} />

				<div class="callout">
					<strong>Reflex is a UI compiler, not a general Python-to-JavaScript translator.</strong> Python
					executes your page function to create component objects. Reflex generates React modules from
					those objects. The frontend toolchain resolves and bundles those modules. Your Python state
					class and event methods remain Python on the backend.
				</div>
				<h3>Two outputs from one Python app</h3>
				<div class="grid">
					<div class="card">
						<h3>Frontend output</h3>
						<p>
							React components, event callbacks, state providers, CSS, routing code, and static
							assets. The browser downloads JavaScript and runs it with React.
						</p>
						<pre><code
								>button callback → event name + arguments
context lookup → public state value
component render → React elements → DOM</code
							></pre>
					</div>
					<div class="card">
						<h3>Backend runtime</h3>
						<p>
							The original Python modules, imported classes/functions, registered handlers, and
							per-client state. An ASGI server runs these objects in a Python process.
						</p>
						<pre><code
								>Event name → registered Python method
client token → state instance
self.count += 1 → public state delta</code
							></pre>
					</div>
				</div>
				<h3>1. Python executes the UI description</h3>
				<p>
					When the compiler evaluates <code>index()</code>, Python executes the calls to
					<code>rx.vstack</code>, <code>rx.text</code>, and <code>rx.button</code>. Each call
					creates a Python component object containing properties, children, style information,
					imports, and event declarations. The result is an in-memory tree. It is not a screenshot,
					DOM tree, HTML string, or browser state instance.
				</p>
				<pre><code
						># A component description constructed by Python:
rx.button("Add one", on_click=LabState.increment, id="increment")

# Conceptual tree (shortened):
Center
└── VStack
    ├── Heading("Reflex flow lab")
    ├── Text("Count: ", Var(LabState.count))
    └── Button("Add one", on_click=EventHandler(LabState.increment))</code
					></pre>
				<p>
					Python can run ordinary loops or call helper functions to build this static structure.
					State-dependent browser branches use <code>rx.cond</code> and <code>rx.foreach</code>:
					those represent future frontend expressions. An ordinary Python
					<code>if LabState.count &gt; 0</code> cannot choose a future visitor’s UI at compile time.
				</p>
				<h3>2. A class-level state reference is a symbolic expression</h3>
				<p>
					In a page definition, <code>LabState.count</code> is a <em>Var</em>: an object
					representing a value that will be read from a frontend state context. Reflex tracks the
					expression’s Python type and the imports/hooks/state dependencies needed to render it. It
					is different from <code>self.count</code> inside a running handler, which is the current Python
					integer for that session.
				</p>
				<pre><code
						># Page-building time:
LabState.count
# Browser expression for this example:
reflex___state____state__flow_lab___flow_lab____lab_state.count_rx_state_

# Handler execution time:
self.count  # e.g. the Python integer 1</code
					></pre>
				<p>
					The compiler registers a context dependency so the generated React component can use <code
						>useContext</code
					>. That is why a counter can update without rerunning the Python page function. The
					class-level expression is a description of a read; it is not a request to send the current
					value during compilation.
				</p>
				<h3>3. Render metadata becomes JavaScript source</h3>
				<p>
					The compiler collects imports, hooks, custom code, dynamic imports, and render metadata.
					In this checkout, <code>_compile_page</code> passes them to <code>page_template</code>.
					Components can be extracted into memoized modules. The renderer emits JavaScript
					expressions such as <code>jsx(RadixThemesButton, props, children)</code>.
				</p>
				<p>
					For the example button, the wrapper supplies the React component import. The event
					declaration supplies a callback that sends a handler identifier. It does <strong
						>not</strong
					>
					copy the body of <code>increment()</code> into JavaScript. The actual intermediate dictionary
					and generated code are shown in the artifact viewer below.
				</p>
				<pre><code
						>// Readable equivalent; names simplified:
const onClick = event =&gt; addEvents([
  ReflexEvent("reflex___state____state.flow_lab___flow_lab____lab_state.increment")
]);
return jsx(RadixThemesButton, &#123; id: "increment", onClick &#125;, "Add one");

// This Python statement has NOT been translated into the callback:
// self.count += 1</code
					></pre>
				<p>
					<code>jsx(...)</code> is a JavaScript function call used by React’s rendering ecosystem. A
					<code>.jsx</code>
					filename does not mean every generated file must contain literal
					<code>&lt;Button&gt;</code> tags. Our generated files already use function calls. The toolchain
					still needs to resolve imports and prepare the module graph for browser delivery.
				</p>
				<h3>4. Contexts, initial data, routes, and styles are generated too</h3>
				<p>
					<code>compile_state</code> creates a framework-initialized state instance and serializes
					its initial public values. The context template writes these defaults, a context/reducer
					per substate, and the dispatch mapping into <code>.web/utils/context.js</code>. These are
					build-time defaults—not a particular visitor’s saved state.
				</p>
				<p>
					The app root installs the providers and routing structure. Route modules import their
					components. Styles become CSS or style expressions consumed by the React components; the
					bundler also includes styles from component libraries. References such as <code
						>$/utils/state</code
					>
					are project aliases resolved by the frontend toolchain, while imports such as
					<code>react</code> resolve to installed packages.
				</p>
				<h3>5. The frontend toolchain makes runnable browser assets</h3>
				<p>
					Reflex’s compiler produces the frontend project. React Router and Vite then process that
					project: they resolve dependencies, transform modules as needed, split code into chunks,
					and emit production JavaScript/CSS plus a document. In development, Vite serves
					transformed modules on demand. In production, the host serves the built files.
				</p>
				<p>
					I built the example’s existing generated frontend to make this concrete. The build
					transformed 417 client modules and produced <code>build/client/index.html</code>, hashed
					JavaScript chunks and styles. A manifest is also emitted during bundling; the React Router
					SPA build cleans intermediate build files. The full example chunk and HTML below are
					actual build output. Their filenames and contents are a snapshot; a later build can change
					them.
				</p>
				<p>
					The build log also mentions an <code>ssr</code> environment and temporarily creates a
					React Router server bundle. With this app’s <code>ssr: false</code> configuration, the build
					uses that machinery to generate the SPA document. That bundle is not a translation of your
					Python handlers, and its existence is not evidence that each visitor receives personalized
					Python-rendered HTML.
				</p>
				<h3>6. The browser loads modules and React creates the UI</h3>
				<p>
					The HTML points to JavaScript assets. The browser parses the document, fetches modules and
					their dependencies, and its JavaScript engine executes them. React’s entry point attaches
					the application to the document. Context providers initialize from the generated defaults;
					React evaluates the component functions and commits DOM nodes. CSS controls their
					appearance. Socket hydration then synchronizes the public state with the Python session.
				</p>
				<pre><code
						>HTTP document → asset URLs → JavaScript modules
    → React entry point → providers + route component
    → React elements → DOM nodes → layout and paint
    → Socket.IO hydration → current session values</code
					></pre>
				<p>
					The Python <code>Button</code> wrapper is not shipped as a Python object. It became an import
					plus React component code. The rendered UI may include library classes, accessibility attributes,
					and wrapper elements, so the literal final HTML is not necessarily a one-to-one transcription
					of your Python component calls.
				</p>
				<h3>What is stored where?</h3>
				<div class="table-wrap">
					<table>
						<thead
							><tr><th>Location</th><th>Concrete form</th><th>Lifetime / purpose</th></tr></thead
						><tbody>
							<tr
								><td>Application source</td><td
									><code>flow_lab/flow_lab.py</code>, <code>rxconfig.py</code></td
								><td>Authored Python on disk. Imported by compilation and backend startup.</td></tr
							>
							<tr
								><td>Compiler process memory</td><td
									>Python component objects, Var expressions, registries, render dictionaries,
									generated source strings</td
								><td
									>Build-time representations. Not automatically persisted as an executable
									Python-to-JS cache or sent as application payloads.</td
								></tr
							>
							<tr
								><td><code>.web/app_components/</code> and <code>.web/app/routes/</code></td><td
									>Generated React/JavaScript source modules</td
								><td
									>Input to the frontend toolchain. Generated files should be changed through Python
									source, not hand-edited as the source of truth.</td
								></tr
							>
							<tr
								><td><code>.web/utils/context.js</code></td><td
									>JavaScript defaults, contexts, reducers, and event setup</td
								><td
									>Initial frontend state shape and update wiring. Contains public defaults, not
									every visitor’s data.</td
								></tr
							>
							<tr
								><td><code>.web/node_modules/</code></td><td
									>Installed React, component libraries, build tools, and their dependencies</td
								><td
									>Build/development dependencies. The browser receives the needed
									transformed/bundled code, not the whole directory.</td
								></tr
							>
							<tr
								><td><code>.web/build/client/</code></td><td
									>Production HTML, hashed JS/CSS, static assets</td
								><td
									>Browser-facing files generated by this build. Browser/proxy caches may retain
									them according to serving headers.</td
								></tr
							>
							<tr
								><td>Python backend memory</td><td
									>Imported modules, function/code objects, handler registry, app/ASGI objects,
									state-manager objects</td
								><td
									>Long-lived runtime handling incoming events. CPython executes compiled Python
									bytecode/code objects; an optional <code>__pycache__</code> is an import cache, not
									a frontend asset.</td
								></tr
							>
							<tr
								><td>State-manager storage</td><td
									>Memory objects, serialized disk state, or Redis data, depending on configuration</td
								><td
									>Per-client state retention. This is separate from generated JS. Server-side state
									serialization is distinct from the public JSON wire representation.</td
								></tr
							>
							<tr
								><td>Browser memory / storage</td><td
									>JavaScript modules, React contexts, DOM; session token in sessionStorage</td
								><td
									>UI execution and public data. Reload discards the current JS/DOM instances, then
									initialization and hydration rebuild them.</td
								></tr
							>
						</tbody>
					</table>
				</div>
				<h3>What form is the code in on the Python server?</h3>
				<pre><code
						># This stays Python. The backend imports it normally.
@rx.event
def increment(self):
    self.count += 1
    self._handled += 1

# Conceptual runtime dispatch, NOT literal framework source:
handler = registered_handlers[event.name]
state = state_manager.get_state(client_token)
handler(state, **event.payload)
# Framework resolves deltas and emits them.</code
					></pre>
				<p>
					The decorator and registration machinery make the method addressable by an event name. The
					method’s code and the state instance’s values are separate objects: the code describes
					what to do, and the session instance holds the current count/name. A stored session file
					is not a compiled frontend module or a copy of the handler’s source.
				</p>
				<p>
					For an ordinary counter click, there is no Vite build, Python page-function evaluation, or
					rewritten JavaScript file. Python mutates state and sends a delta; the already-loaded
					frontend renders it. Editing the Python UI source is different: the development workflow
					can re-evaluate pages, regenerate frontend code, and refresh/reload the browser as
					configured.
				</p>
				<h3>Inspect the actual compilation artifacts</h3>
				<p class="small">
					The original generated frontend and socket capture belong to the guide’s September 9
					snapshot. The button intermediate representation was inspected against checkout <code
						>35c11e12c</code
					>, and the existing generated frontend was successfully production-built on September 13.
					These are explicitly identified snapshots, not a claim that the saved frontend was
					regenerated from today’s checkout.
				</p>
				<details>
					<summary>Intermediate render dictionary — actual button.render() output</summary>
					<pre><code
							>&#123;
  &quot;name&quot;: &quot;RadixThemesButton&quot;,
  &quot;props&quot;: [
    &quot;id:\&quot;increment\&quot;&quot;,
    &quot;onClick:((_e) =&gt; (addEvents([(ReflexEvent(\&quot;reflex___state____state.flow_lab___flow_lab____lab_state.increment\&quot;, (&#123;  &#125;), (&#123;  &#125;)))], [_e], (&#123;  &#125;))))&quot;,
    &quot;ref:ref_increment&quot;
  ],
  &quot;children&quot;: [
    &#123;
      &quot;contents&quot;: &quot;\&quot;Add one\&quot;&quot;
    &#125;
  ]
&#125;</code
						></pre>
				</details>
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
				<details>
					<summary>Generated contexts and defaults — actual excerpts</summary>
					<pre><code
							>export const initialState = &#123;&quot;reflex___state____state&quot;: &#123;&quot;is_hydrated_rx_state_&quot;: false, &quot;router_headers_rx_state_&quot;: &#123;&quot;host&quot;: &quot;&quot;, &quot;origin&quot;: &quot;&quot;, &quot;upgrade&quot;: &quot;&quot;, &quot;connection&quot;: &quot;&quot;, &quot;cookie&quot;: &quot;&quot;, &quot;pragma&quot;: &quot;&quot;, &quot;cache_control&quot;: &quot;&quot;, &quot;user_agent&quot;: &quot;&quot;, &quot;sec_websocket_version&quot;: &quot;&quot;, &quot;sec_websocket_key&quot;: &quot;&quot;, &quot;sec_websocket_extensions&quot;: &quot;&quot;, &quot;accept_encoding&quot;: &quot;&quot;, &quot;accept_language&quot;: &quot;&quot;, &quot;raw_headers&quot;: &#123;&#125;&#125;, &quot;router_page_rx_state_&quot;: &#123;&quot;host&quot;: &quot;&quot;, &quot;path&quot;: &quot;&quot;, &quot;raw_path&quot;: &quot;&quot;, &quot;full_path&quot;: &quot;&quot;, &quot;full_raw_path&quot;: &quot;&quot;, &quot;params&quot;: &#123;&#125;&#125;, &quot;router_route_id_rx_state_&quot;: &quot;&quot;, &quot;router_session_rx_state_&quot;: &#123;&quot;client_token&quot;: &quot;&quot;, &quot;client_ip&quot;: &quot;&quot;, &quot;session_id&quot;: &quot;&quot;&#125;, &quot;router_url_rx_state_&quot;: &#123;&quot;scheme&quot;: &quot;&quot;, &quot;netloc&quot;: &quot;&quot;, &quot;origin&quot;: &quot;&quot;, &quot;path&quot;: &quot;&quot;, &quot;query&quot;: &quot;&quot;, &quot;query_parameters&quot;: &#123;&#125;, &quot;fragment&quot;: &quot;&quot;, &quot;href&quot;: &quot;&quot;&#125;&#125;, &quot;reflex___state____state.flow_lab___flow_lab____lab_state&quot;: &#123;&quot;count_rx_state_&quot;: 0, &quot;doubled_rx_state_&quot;: 0, &quot;greeting_rx_state_&quot;: &quot;Hello, Ada!&quot;, &quot;name_rx_state_&quot;: &quot;Ada&quot;, &quot;page_rx_state_&quot;: &quot;Not loaded&quot;, &quot;visits_rx_state_&quot;: 0&#125;, &quot;reflex___state____state.reflex___istate___shared____shared_state_base_internal&quot;: &#123;&#125;, &quot;reflex___state____state.reflex___state____frontend_event_exception_state&quot;: &#123;&#125;, &quot;reflex___state____state.reflex___state____on_load_internal_state&quot;: &#123;&#125;, &quot;reflex___state____state.reflex___state____update_vars_internal_state&quot;: &#123;&#125;&#125;
export const UploadFilesContext = createContext(null);
export const DispatchContext = createContext(null);
export const StateContexts = &#123;reflex___state____state: createContext(null),reflex___state____state__flow_lab___flow_lab____lab_state: createContext(null),reflex___state____state__reflex___istate___shared____shared_state_base_internal: createContext(null),reflex___state____state__reflex___state____frontend_event_exception_state: createContext(null),reflex___state____state__reflex___state____on_load_internal_state: createContext(null),reflex___state____state__reflex___state____update_vars_internal_state: createContext(null),&#125;;
export const EventLoopContext = createContext(null);
  const [reflex___state____state, dispatch_reflex___state____state] = useReducer(applyDelta, initialState[&quot;reflex___state____state&quot;])
const [reflex___state____state__flow_lab___flow_lab____lab_state, dispatch_reflex___state____state__flow_lab___flow_lab____lab_state] = useReducer(applyDelta, initialState[&quot;reflex___state____state.flow_lab___flow_lab____lab_state&quot;])
const [reflex___state____state__reflex___istate___shared____shared_state_base_internal, dispatch_reflex___state____state__reflex___istate___shared____shared_state_base_internal] = useReducer(applyDelta, initialState[&quot;reflex___state____state.reflex___istate___shared____shared_state_base_internal&quot;])
const [reflex___state____state__reflex___state____frontend_event_exception_state, dispatch_reflex___state____state__reflex___state____frontend_event_exception_state] = useReducer(applyDelta, initialState[&quot;reflex___state____state.reflex___state____frontend_event_exception_state&quot;])
const [reflex___state____state__reflex___state____on_load_internal_state, dispatch_reflex___state____state__reflex___state____on_load_internal_state] = useReducer(applyDelta, initialState[&quot;reflex___state____state.reflex___state____on_load_internal_state&quot;])
const [reflex___state____state__reflex___state____update_vars_internal_state, dispatch_reflex___state____state__reflex___state____update_vars_internal_state] = useReducer(applyDelta, initialState[&quot;reflex___state____state.reflex___state____update_vars_internal_state&quot;])</code
						></pre>
				</details>
				<details>
					<summary>Generated Home route — actual complete module</summary>
					<pre><code
							>import &#123;Flex as RadixThemesFlex,Heading as RadixThemesHeading,Link as RadixThemesLink,Separator as RadixThemesSeparator,Text as RadixThemesText&#125; from &quot;@radix-ui/themes&quot;
import &#123;Link as ReactRouterLink&#125; from &quot;react-router&quot;
import &#123;Bare_comp_08b86a9f1bd7a593973d476aa345bb48_4c100443,Bare_comp_3b3be27a1da5f94255775fbf381c65c6_4c100443,Bare_comp_54b99599c937d55ee52fd2f5e8ce87e1_4c100443,Bare_comp_a04c3d7fb1724c249acaa687c753f068_4c100443,Bare_comp_bd80ed2b11892f25e4ebf1ecc0c92c00_4c100443,Bare_comp_fdcf0bd4ec792dfdb7c993a1ed3aa361_4c100443,Button_button_5b96ea87d6d46c65a36c4e74327104a9_4c100443,Debounceinput_debounceinput_c4ee43471c4a3b824243638911cd8d18_4c100443&#125; from &quot;$/app_components/flow_lab/flow_lab&quot;
import &#123;Fragment,useEffect,useRef&#125; from &quot;react&quot;
import &#123;refs&#125; from &quot;$/utils/state&quot;
import &#123;jsx&#125; from &quot;@emotion/react&quot;





function Component() &#123;
const ref_greeting = useRef(null); refs[&quot;ref_greeting&quot;] = ref_greeting;
const ref_count = useRef(null); refs[&quot;ref_count&quot;] = ref_count;
const ref_doubled = useRef(null); refs[&quot;ref_doubled&quot;] = ref_doubled;




  return (
    jsx(Fragment,&#123;&#125;,jsx(RadixThemesFlex,&#123;css:(&#123; [&quot;display&quot;] : &quot;flex&quot;, [&quot;alignItems&quot;] : &quot;center&quot;, [&quot;justifyContent&quot;] : &quot;center&quot;, [&quot;minHeight&quot;] : &quot;100vh&quot; &#125;)&#125;,jsx(RadixThemesFlex,&#123;align:&quot;start&quot;,className:&quot;rx-Stack&quot;,css:(&#123; [&quot;width&quot;] : &quot;100%&quot;, [&quot;maxWidth&quot;] : &quot;680px&quot;, [&quot;padding&quot;] : &quot;32px&quot; &#125;),direction:&quot;column&quot;,gap:&quot;5&quot;&#125;,jsx(RadixThemesHeading,&#123;size:&quot;8&quot;&#125;,&quot;Reflex flow lab&quot;),jsx(RadixThemesText,&#123;as:&quot;p&quot;&#125;,&quot;One Python state. Two routes. Watch every round trip.&quot;),jsx(RadixThemesFlex,&#123;align:&quot;start&quot;,className:&quot;rx-Stack&quot;,direction:&quot;row&quot;,gap:&quot;3&quot;&#125;,jsx(RadixThemesLink,&#123;asChild:true,css:(&#123; [&quot;&amp;:hover&quot;] : (&#123; [&quot;color&quot;] : &quot;var(--accent-8)&quot; &#125;) &#125;)&#125;,jsx(ReactRouterLink,&#123;to:&quot;/&quot;&#125;,&quot;Home&quot;)),jsx(RadixThemesLink,&#123;asChild:true,css:(&#123; [&quot;&amp;:hover&quot;] : (&#123; [&quot;color&quot;] : &quot;var(--accent-8)&quot; &#125;) &#125;)&#125;,jsx(ReactRouterLink,&#123;to:&quot;/details&quot;&#125;,&quot;Details&quot;))),jsx(RadixThemesText,&#123;as:&quot;p&quot;&#125;,&quot;Server page: &quot;,jsx(Bare_comp_08b86a9f1bd7a593973d476aa345bb48_4c100443,&#123;&#125;,),&quot; \u00b7 Page loads: &quot;,jsx(Bare_comp_54b99599c937d55ee52fd2f5e8ce87e1_4c100443,&#123;&#125;,)),jsx(RadixThemesText,&#123;as:&quot;p&quot;&#125;,&quot;State synchronized: &quot;,jsx(Bare_comp_a04c3d7fb1724c249acaa687c753f068_4c100443,&#123;&#125;,)),jsx(RadixThemesSeparator,&#123;size:&quot;4&quot;&#125;,),jsx(RadixThemesFlex,&#123;align:&quot;start&quot;,className:&quot;rx-Stack&quot;,css:(&#123; [&quot;width&quot;] : &quot;100%&quot; &#125;),direction:&quot;column&quot;,gap:&quot;4&quot;&#125;,jsx(RadixThemesHeading,&#123;id:&quot;greeting&quot;,ref:ref_greeting&#125;,jsx(Bare_comp_bd80ed2b11892f25e4ebf1ecc0c92c00_4c100443,&#123;&#125;,)),jsx(RadixThemesText,&#123;as:&quot;p&quot;&#125;,&quot;Your name&quot;),jsx(Debounceinput_debounceinput_c4ee43471c4a3b824243638911cd8d18_4c100443,&#123;&#125;,),jsx(RadixThemesText,&#123;as:&quot;p&quot;,id:&quot;count&quot;,ref:ref_count&#125;,&quot;Count: &quot;,jsx(Bare_comp_fdcf0bd4ec792dfdb7c993a1ed3aa361_4c100443,&#123;&#125;,)),jsx(RadixThemesText,&#123;as:&quot;p&quot;,id:&quot;doubled&quot;,ref:ref_doubled&#125;,&quot;Doubled: &quot;,jsx(Bare_comp_3b3be27a1da5f94255775fbf381c65c6_4c100443,&#123;&#125;,)),jsx(Button_button_5b96ea87d6d46c65a36c4e74327104a9_4c100443,&#123;&#125;,&quot;Add one&quot;)),jsx(RadixThemesSeparator,&#123;size:&quot;4&quot;&#125;,),jsx(RadixThemesLink,&#123;asChild:true,css:(&#123; [&quot;&amp;:hover&quot;] : (&#123; [&quot;color&quot;] : &quot;var(--accent-8)&quot; &#125;) &#125;)&#125;,jsx(ReactRouterLink,&#123;target:(true ? &quot;_blank&quot; : &quot;&quot;),to:&quot;/walkthrough.html&quot;&#125;,&quot;Open the illustrated walkthrough \u2197&quot;)))),jsx(&quot;title&quot;,&#123;&#125;,&quot;FlowLab | Index&quot;),jsx(&quot;meta&quot;,&#123;content:&quot;favicon.ico&quot;,property:&quot;og:image&quot;&#125;,))
  )
&#125;
Component.displayName = &quot;Component(index)&quot;;

export default Component;
</code></pre>
				</details>
				<details>
					<summary>Production browser JavaScript — actual flow_lab-lNesF4hv.js</summary>
					<pre><code
							>import&#123;G as e,W as t,q as n&#125;from&quot;./components-Blt2PyNA.js&quot;;import&#123;$ as r,a as i,it as a,n as o,ot as s,st as c,tt as l&#125;from&quot;./text-field-BkrB7aRw.js&quot;;import&#123;n as u&#125;from&quot;./emotion-react.browser.esm-Do-RBW0K.js&quot;;var d=e(((e,t)=&gt;&#123;var n=NaN,r=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,o=/^0o[0-7]+$/i,s=parseInt,c=typeof global==`object`&amp;&amp;global&amp;&amp;global.Object===Object&amp;&amp;global,l=typeof self==`object`&amp;&amp;self&amp;&amp;self.Object===Object&amp;&amp;self,u=c||l||Function(`return this`)(),d=Object.prototype.toString,f=Math.max,p=Math.min,m=function()&#123;return u.Date.now()&#125;;function h(e,t,n)&#123;var r,i,a,o,s,c,l=0,u=!1,d=!1,h=!0;if(typeof e!=`function`)throw TypeError(`Expected a function`);t=y(t)||0,g(n)&amp;&amp;(u=!!n.leading,d=`maxWait`in n,a=d?f(y(n.maxWait)||0,t):a,h=`trailing`in n?!!n.trailing:h);function _(t)&#123;var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o&#125;function v(e)&#123;return l=e,s=setTimeout(S,t),u?_(e):o&#125;function b(e)&#123;var n=e-c,r=e-l,i=t-n;return d?p(i,a-r):i&#125;function x(e)&#123;var n=e-c,r=e-l;return c===void 0||n&gt;=t||n&lt;0||d&amp;&amp;r&gt;=a&#125;function S()&#123;var e=m();if(x(e))return C(e);s=setTimeout(S,b(e))&#125;function C(e)&#123;return s=void 0,h&amp;&amp;r?_(e):(r=i=void 0,o)&#125;function w()&#123;s!==void 0&amp;&amp;clearTimeout(s),l=0,r=c=i=s=void 0&#125;function T()&#123;return s===void 0?o:C(m())&#125;function E()&#123;var e=m(),n=x(e);if(r=arguments,i=this,c=e,n)&#123;if(s===void 0)return v(c);if(d)return s=setTimeout(S,t),_(c)&#125;return s===void 0&amp;&amp;(s=setTimeout(S,t)),o&#125;return E.cancel=w,E.flush=T,E&#125;function g(e)&#123;var t=typeof e;return!!e&amp;&amp;(t==`object`||t==`function`)&#125;function _(e)&#123;return!!e&amp;&amp;typeof e==`object`&#125;function v(e)&#123;return typeof e==`symbol`||_(e)&amp;&amp;d.call(e)==`[object Symbol]`&#125;function y(e)&#123;if(typeof e==`number`)return e;if(v(e))return n;if(g(e))&#123;var t=typeof e.valueOf==`function`?e.valueOf():e;e=g(t)?t+``:t&#125;if(typeof e!=`string`)return e===0?e:+e;e=e.replace(r,``);var c=a.test(e);return c||o.test(e)?s(e.slice(2),c?2:8):i.test(e)?n:+e&#125;t.exports=h&#125;)),f=e((e=&gt;&#123;function n(e)&#123;&quot;@babel/helpers - typeof&quot;;return n=typeof Symbol==`function`&amp;&amp;typeof Symbol.iterator==`symbol`?function(e)&#123;return typeof e&#125;:function(e)&#123;return e&amp;&amp;typeof Symbol==`function`&amp;&amp;e.constructor===Symbol&amp;&amp;e!==Symbol.prototype?`symbol`:typeof e&#125;,n(e)&#125;Object.defineProperty(e,&quot;__esModule&quot;,&#123;value:!0&#125;),e.DebounceInput=void 0;var r=o(t()),i=o(d()),a=[`element`,`onChange`,`value`,`minLength`,`debounceTimeout`,`forceNotifyByEnter`,`forceNotifyOnBlur`,`onKeyDown`,`onBlur`,`inputRef`];function o(e)&#123;return e&amp;&amp;e.__esModule?e:&#123;default:e&#125;&#125;function s(e,t)&#123;if(e==null)return&#123;&#125;;var n=c(e,t),r,i;if(Object.getOwnPropertySymbols)&#123;var a=Object.getOwnPropertySymbols(e);for(i=0;i&lt;a.length;i++)r=a[i],!(t.indexOf(r)&gt;=0)&amp;&amp;Object.prototype.propertyIsEnumerable.call(e,r)&amp;&amp;(n[r]=e[r])&#125;return n&#125;function c(e,t)&#123;if(e==null)return&#123;&#125;;for(var n=&#123;&#125;,r=Object.keys(e),i,a=0;a&lt;r.length;a++)i=r[a],!(t.indexOf(i)&gt;=0)&amp;&amp;(n[i]=e[i]);return n&#125;function l(e,t)&#123;var n=Object.keys(e);if(Object.getOwnPropertySymbols)&#123;var r=Object.getOwnPropertySymbols(e);t&amp;&amp;(r=r.filter(function(t)&#123;return Object.getOwnPropertyDescriptor(e,t).enumerable&#125;)),n.push.apply(n,r)&#125;return n&#125;function u(e)&#123;for(var t=1;t&lt;arguments.length;t++)&#123;var n=arguments[t]==null?&#123;&#125;:arguments[t];t%2?l(Object(n),!0).forEach(function(t)&#123;S(e,t,n[t])&#125;):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach(function(t)&#123;Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))&#125;)&#125;return e&#125;function f(e,t)&#123;if(!(e instanceof t))throw TypeError(`Cannot call a class as a function`)&#125;function p(e,t)&#123;for(var n=0;n&lt;t.length;n++)&#123;var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&amp;&amp;(r.writable=!0),Object.defineProperty(e,r.key,r)&#125;&#125;function m(e,t,n)&#123;return t&amp;&amp;p(e.prototype,t),n&amp;&amp;p(e,n),Object.defineProperty(e,&quot;prototype&quot;,&#123;writable:!1&#125;),e&#125;function h(e,t)&#123;if(typeof t!=`function`&amp;&amp;t!==null)throw TypeError(`Super expression must either be null or a function`);e.prototype=Object.create(t&amp;&amp;t.prototype,&#123;constructor:&#123;value:e,writable:!0,configurable:!0&#125;&#125;),Object.defineProperty(e,&quot;prototype&quot;,&#123;writable:!1&#125;),t&amp;&amp;g(e,t)&#125;function g(e,t)&#123;return g=Object.setPrototypeOf||function(e,t)&#123;return e.__proto__=t,e&#125;,g(e,t)&#125;function _(e)&#123;var t=b();return function()&#123;var n=x(e),r;if(t)&#123;var i=x(this).constructor;r=Reflect.construct(n,arguments,i)&#125;else r=n.apply(this,arguments);return v(this,r)&#125;&#125;function v(e,t)&#123;if(t&amp;&amp;(n(t)===`object`||typeof t==`function`))return t;if(t!==void 0)throw TypeError(`Derived constructors may only return object or undefined`);return y(e)&#125;function y(e)&#123;if(e===void 0)throw ReferenceError(`this hasn&#x27;t been initialised - super() hasn&#x27;t been called`);return e&#125;function b()&#123;if(typeof Reflect&gt;`u`||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy==`function`)return!0;try&#123;return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function()&#123;&#125;)),!0&#125;catch&#123;return!1&#125;&#125;function x(e)&#123;return x=Object.setPrototypeOf?Object.getPrototypeOf:function(e)&#123;return e.__proto__||Object.getPrototypeOf(e)&#125;,x(e)&#125;function S(e,t,n)&#123;return t in e?Object.defineProperty(e,t,&#123;value:n,enumerable:!0,configurable:!0,writable:!0&#125;):e[t]=n,e&#125;var C=function(e)&#123;h(n,e);var t=_(n);function n(e)&#123;var r;f(this,n),r=t.call(this,e),S(y(r),`onChange`,function(e)&#123;e.persist();var t=r.state.value,n=r.props.minLength;r.setState(&#123;value:e.target.value&#125;,function()&#123;var i=r.state.value;if(i.length&gt;=n)&#123;r.notify(e);return&#125;t.length&gt;i.length&amp;&amp;r.notify(u(u(&#123;&#125;,e),&#123;&#125;,&#123;target:u(u(&#123;&#125;,e.target),&#123;&#125;,&#123;value:``&#125;)&#125;))&#125;)&#125;),S(y(r),`onKeyDown`,function(e)&#123;e.key===`Enter`&amp;&amp;r.forceNotify(e);var t=r.props.onKeyDown;t&amp;&amp;(e.persist(),t(e))&#125;),S(y(r),`onBlur`,function(e)&#123;r.forceNotify(e);var t=r.props.onBlur;t&amp;&amp;(e.persist(),t(e))&#125;),S(y(r),`createNotifier`,function(e)&#123;if(e&lt;0)r.notify=function()&#123;return null&#125;;else if(e===0)r.notify=r.doNotify;else&#123;var t=(0,i.default)(function(e)&#123;r.isDebouncing=!1,r.doNotify(e)&#125;,e);r.notify=function(e)&#123;r.isDebouncing=!0,t(e)&#125;,r.flush=function()&#123;return t.flush()&#125;,r.cancel=function()&#123;r.isDebouncing=!1,t.cancel()&#125;&#125;&#125;),S(y(r),`doNotify`,function()&#123;r.props.onChange.apply(void 0,arguments)&#125;),S(y(r),`forceNotify`,function(e)&#123;var t=r.props.debounceTimeout;if(!(!r.isDebouncing&amp;&amp;t&gt;0))&#123;r.cancel&amp;&amp;r.cancel();var n=r.state.value,i=r.props.minLength;n.length&gt;=i?r.doNotify(e):r.doNotify(u(u(&#123;&#125;,e),&#123;&#125;,&#123;target:u(u(&#123;&#125;,e.target),&#123;&#125;,&#123;value:n&#125;)&#125;))&#125;&#125;),r.isDebouncing=!1,r.state=&#123;value:e.value===void 0||e.value===null?``:e.value&#125;;var a=r.props.debounceTimeout;return r.createNotifier(a),r&#125;return m(n,[&#123;key:`componentDidUpdate`,value:function(e)&#123;if(!this.isDebouncing)&#123;var t=this.props,n=t.value,r=t.debounceTimeout,i=e.debounceTimeout,a=e.value,o=this.state.value;n!==void 0&amp;&amp;a!==n&amp;&amp;o!==n&amp;&amp;this.setState(&#123;value:n&#125;),r!==i&amp;&amp;this.createNotifier(r)&#125;&#125;&#125;,&#123;key:`componentWillUnmount`,value:function()&#123;this.flush&amp;&amp;this.flush()&#125;&#125;,&#123;key:`render`,value:function()&#123;var e=this.props,t=e.element;e.onChange,e.value,e.minLength,e.debounceTimeout;var n=e.forceNotifyByEnter,i=e.forceNotifyOnBlur,o=e.onKeyDown,c=e.onBlur,l=e.inputRef,d=s(e,a),f=this.state.value,p=n?&#123;onKeyDown:this.onKeyDown&#125;:o?&#123;onKeyDown:o&#125;:&#123;&#125;,m=i?&#123;onBlur:this.onBlur&#125;:c?&#123;onBlur:c&#125;:&#123;&#125;,h=l?&#123;ref:l&#125;:&#123;&#125;;return r.default.createElement(t,u(u(u(u(&#123;&#125;,d),&#123;&#125;,&#123;onChange:this.onChange,value:f&#125;,p),m),h))&#125;&#125;]),n&#125;(r.default.PureComponent);e.DebounceInput=C,S(C,`defaultProps`,&#123;element:`input`,type:`text`,onKeyDown:void 0,onBlur:void 0,value:void 0,minLength:0,debounceTimeout:100,forceNotifyByEnter:!0,forceNotifyOnBlur:!0,inputRef:void 0&#125;)&#125;)),p=e(((e,t)=&gt;&#123;var n=f().DebounceInput;n.DebounceInput=n,t.exports=n&#125;)),m=n(t(),1),h=n(p(),1),g=(0,m.memo)((&#123;children:e&#125;)=&gt;(0,m.useContext)(r.reflex___state____state__flow_lab___flow_lab____lab_state).page_rx_state_);g.displayName=`Bare`;var _=(0,m.memo)((&#123;children:e&#125;)=&gt;(0,m.useContext)(r.reflex___state____state__flow_lab___flow_lab____lab_state).visits_rx_state_);_.displayName=`Bare`;var v=(0,m.memo)((&#123;children:e&#125;)=&gt;(0,m.useContext)(r.reflex___state____state).is_hydrated_rx_state_?`yes`:`no`);v.displayName=`Bare`;var y=(0,m.memo)((&#123;children:e&#125;)=&gt;(0,m.useContext)(r.reflex___state____state__flow_lab___flow_lab____lab_state).greeting_rx_state_);y.displayName=`Bare`;var b=(0,m.memo)((&#123;children:e&#125;)=&gt;&#123;let t=(0,m.useRef)(null);c.ref_name=t;let n=(0,m.useCallback)((e=&gt;l([a(`reflex___state____state.flow_lab___flow_lab____lab_state.rename`,&#123;value:e?.target?.value&#125;,&#123;&#125;)],[e],&#123;&#125;)),[l,a]),i=(0,m.useContext)(r.reflex___state____state__flow_lab___flow_lab____lab_state);return u(h.default,&#123;&quot;aria-label&quot;:`Your name`,debounceTimeout:300,element:o,id:`name`,inputRef:t,onChange:n,value:s(i.name_rx_state_)?i.name_rx_state_:``&#125;)&#125;);b.displayName=`DebounceInput`;var x=(0,m.memo)((&#123;children:e&#125;)=&gt;(0,m.useContext)(r.reflex___state____state__flow_lab___flow_lab____lab_state).count_rx_state_);x.displayName=`Bare`;var S=(0,m.memo)((&#123;children:e&#125;)=&gt;(0,m.useContext)(r.reflex___state____state__flow_lab___flow_lab____lab_state).doubled_rx_state_);S.displayName=`Bare`;var C=(0,m.memo)((&#123;children:e&#125;)=&gt;&#123;let t=(0,m.useRef)(null);c.ref_increment=t;let n=(0,m.useCallback)((e=&gt;l([a(`reflex___state____state.flow_lab___flow_lab____lab_state.increment`,&#123;&#125;,&#123;&#125;)],[e],&#123;&#125;)),[l,a]);return u(i,&#123;id:`increment`,onClick:n,ref:t&#125;,e)&#125;);C.displayName=`Button`;var w=(0,m.memo)((&#123;children:e&#125;)=&gt;&#123;let t=(0,m.useCallback)((e=&gt;l([a(`reflex___state____state.flow_lab___flow_lab____lab_state.increment`,&#123;&#125;,&#123;&#125;)],[e],&#123;&#125;)),[l,a]);return u(i,&#123;onClick:t&#125;,e)&#125;);w.displayName=`Button`;export&#123;y as a,w as c,v as i,b as l,S as n,x as o,_ as r,C as s,g as t&#125;;</code
						></pre>
				</details>
				<details>
					<summary>Production SPA HTML — actual build/client/index.html</summary>
					<pre><code
							>&lt;!DOCTYPE html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charSet=&quot;utf-8&quot;/&gt;&lt;meta content=&quot;width=device-width, initial-scale=1&quot; name=&quot;viewport&quot;/&gt;&lt;link rel=&quot;modulepreload&quot; href=&quot;/assets/manifest-95bcf033.js&quot;/&gt;&lt;link rel=&quot;modulepreload&quot; href=&quot;/assets/entry.client-5UErbQKK.js&quot;/&gt;&lt;link rel=&quot;modulepreload&quot; href=&quot;/assets/components-Blt2PyNA.js&quot;/&gt;&lt;link rel=&quot;modulepreload&quot; href=&quot;/assets/errorBoundaries-DIYo_grw.js&quot;/&gt;&lt;link rel=&quot;modulepreload&quot; href=&quot;/assets/root-gPZAYZ4h.js&quot;/&gt;&lt;link rel=&quot;modulepreload&quot; href=&quot;/assets/text-field-BkrB7aRw.js&quot;/&gt;&lt;link rel=&quot;modulepreload&quot; href=&quot;/assets/reflex-env-Bgj8Vl-s.js&quot;/&gt;&lt;link rel=&quot;modulepreload&quot; href=&quot;/assets/emotion-react.browser.esm-Do-RBW0K.js&quot;/&gt;&lt;script&gt;
// Only run in browser environment, not during SSR
if (typeof document !== &#x27;undefined&#x27;) &#123;
    try &#123;
        const theme = localStorage.getItem(&quot;theme&quot;) || &#x27;system&#x27;;
        const systemPreference = window.matchMedia(&quot;(prefers-color-scheme: dark)&quot;).matches ? &quot;dark&quot; : &quot;light&quot;;
        const resolvedTheme = theme === &quot;system&quot; ? systemPreference : theme;

        // Apply theme immediately - blocks until complete
        // Use classList to avoid overwriting other classes
        document.documentElement.classList.remove(&quot;light&quot;, &quot;dark&quot;);
        document.documentElement.classList.add(resolvedTheme);
        document.documentElement.style.colorScheme = resolvedTheme;

    &#125; catch (e) &#123;
        // Fallback to system preference on any error (resolve &quot;system&quot; to actual theme)
        const fallbackTheme = window.matchMedia(&quot;(prefers-color-scheme: dark)&quot;).matches ? &quot;dark&quot; : &quot;light&quot;;
        document.documentElement.classList.remove(&quot;light&quot;, &quot;dark&quot;);
        document.documentElement.classList.add(fallbackTheme);
        document.documentElement.style.colorScheme = fallbackTheme;
    &#125;
&#125;
&lt;/script&gt;&lt;link href=&quot;/assets/__reflex_global_styles-NccINl-w.css&quot; rel=&quot;stylesheet&quot; type=&quot;text/css&quot;/&gt;&lt;/head&gt;&lt;body&gt;&lt;section aria-label=&quot;Notifications alt+T&quot; tabindex=&quot;-1&quot; aria-live=&quot;polite&quot; aria-relevant=&quot;additions text&quot; aria-atomic=&quot;false&quot; data-react-aria-top-layer=&quot;true&quot;&gt;&lt;/section&gt;&lt;div data-is-root-theme=&quot;true&quot; data-accent-color=&quot;blue&quot; data-gray-color=&quot;slate&quot; data-has-background=&quot;true&quot; data-panel-background=&quot;translucent&quot; data-radius=&quot;medium&quot; data-scaling=&quot;100%&quot; class=&quot;radix-themes css-0&quot;&gt;&lt;style data-emotion=&quot;css 17rg0dp&quot;&gt;.css-17rg0dp&#123;position:fixed;width:100vw;height:0;&#125;&lt;/style&gt;&lt;div title=&quot;Connection Error: &quot; class=&quot;css-17rg0dp&quot;&gt;&lt;/div&gt;&lt;/div&gt;&lt;script&gt;window.__reactRouterContext = &#123;&quot;basename&quot;:&quot;/&quot;,&quot;future&quot;:&#123;&quot;unstable_enableNodeReadableStream&quot;:false,&quot;unstable_optimizeDeps&quot;:true&#125;,&quot;routeDiscovery&quot;:&#123;&quot;mode&quot;:&quot;initial&quot;&#125;,&quot;ssr&quot;:false,&quot;isSpaMode&quot;:true&#125;;window.__reactRouterContext.stream = new ReadableStream(&#123;start(controller)&#123;window.__reactRouterContext.streamController = controller;&#125;&#125;).pipeThrough(new TextEncoderStream());&lt;/script&gt;&lt;script type=&quot;module&quot; async=&quot;&quot;&gt;import &quot;/assets/manifest-95bcf033.js&quot;;
import * as route0 from &quot;/assets/root-gPZAYZ4h.js&quot;;

  window.__reactRouterRouteModules = &#123;&quot;root&quot;:route0&#125;;

import(&quot;/assets/entry.client-5UErbQKK.js&quot;);&lt;/script&gt;&lt;!--$--&gt;&lt;script&gt;window.__reactRouterContext.streamController.enqueue(&quot;[&#123;\&quot;_1\&quot;:2,\&quot;_3\&quot;:-5,\&quot;_4\&quot;:-5&#125;,\&quot;loaderData\&quot;,&#123;&#125;,\&quot;actionData\&quot;,\&quot;errors\&quot;]\n&quot;);&lt;/script&gt;&lt;!--$--&gt;&lt;script&gt;window.__reactRouterContext.streamController.close();&lt;/script&gt;&lt;!--/$--&gt;&lt;!--/$--&gt;&lt;/body&gt;&lt;/html&gt;</code
						></pre>
				</details>

				<ol>
					<li>
						<strong>Import configuration and app.</strong> Python evaluates the state class and
						registers event handlers, variable types, defaults, and computed-variable dependencies.
						<code>app.add_page</code> records routes and on-load handlers.
					</li>
					<li>
						<strong>Evaluate the page functions.</strong> <code>index()</code> returns a tree of
						components. A reference such as <code>LabState.count</code> is a symbolic Var expression
						at this point, not a particular visitor's integer.
					</li>
					<li>
						<strong>Compile component properties and children.</strong> Reflex collects imports, styles,
						hooks, event argument expressions, and dependencies. It generates React code, memoized component
						modules, route modules, and state context providers.
					</li>
					<li>
						<strong>Generate initial state.</strong> The compiler serializes default state into
						<code>.web/utils/context.js</code>. This is a build-time starting point, not a lookup of
						the visitor's saved state.
					</li>
					<li>
						<strong>Serve or bundle.</strong> Development serves/transforms modules with Vite. Production
						builds JavaScript/CSS/assets. The browser downloads those files and executes JavaScript;
						it does not run the Python page functions.
					</li>
				</ol>
				<div class="grid">
					<div>
						<h3>Python declaration</h3>
						<pre><code
								>rx.text("Count: ", LabState.count)
rx.button("Add one", on_click=LabState.increment)
rx.input(value=LabState.name,
         on_change=LabState.rename)</code
							></pre>
					</div>
					<div>
						<h3>Readable equivalent of generated JS</h3>
						<pre><code
								>// Simplified names and structure, not verbatim output.
const state = useContext(StateContexts.lab);
jsx(Text, &#123; children: ["Count: ", state.count_rx_state_] &#125;);

// The DOM event is used locally to extract the argument.
addEvents([ReflexEvent(LAB + ".rename", &#123;
  value: event.target.value
&#125;)]);</code
							></pre>
					</div>
				</div>
				<details>
					<summary>Actual generated component module from this app</summary>
					<pre><code>
import &#123;ReflexEvent,applyEventActions,isNotNullOrUndefined,isTrue,refs&#125; from &quot;$/utils/state&quot;
import &#123;StateContexts,addEvents&#125; from &quot;$/utils/context&quot;
import &#123;Fragment,memo,useCallback,useContext,useEffect,useRef&#125; from &quot;react&quot;
import &#123;jsx&#125; from &quot;@emotion/react&quot;
import DebounceInput from &quot;react-debounce-input&quot;
import &#123;Button as RadixThemesButton,TextField as RadixThemesTextField&#125; from &quot;@radix-ui/themes&quot;








export const Bare_comp_08b86a9f1bd7a593973d476aa345bb48_4c100443 = memo((&#123;children&#125;) =&gt; &#123;
    const reflex___state____state__flow_lab___flow_lab____lab_state = useContext(StateContexts.reflex___state____state__flow_lab___flow_lab____lab_state)



    return(
        reflex___state____state__flow_lab___flow_lab____lab_state.page_rx_state_
    )
&#125;);
Bare_comp_08b86a9f1bd7a593973d476aa345bb48_4c100443.displayName = &quot;Bare&quot;;

export const Bare_comp_54b99599c937d55ee52fd2f5e8ce87e1_4c100443 = memo((&#123;children&#125;) =&gt; &#123;
    const reflex___state____state__flow_lab___flow_lab____lab_state = useContext(StateContexts.reflex___state____state__flow_lab___flow_lab____lab_state)



    return(
        reflex___state____state__flow_lab___flow_lab____lab_state.visits_rx_state_
    )
&#125;);
Bare_comp_54b99599c937d55ee52fd2f5e8ce87e1_4c100443.displayName = &quot;Bare&quot;;

export const Bare_comp_a04c3d7fb1724c249acaa687c753f068_4c100443 = memo((&#123;children&#125;) =&gt; &#123;
    const reflex___state____state = useContext(StateContexts.reflex___state____state)



    return(
        (reflex___state____state.is_hydrated_rx_state_ ? &quot;yes&quot; : &quot;no&quot;)
    )
&#125;);
Bare_comp_a04c3d7fb1724c249acaa687c753f068_4c100443.displayName = &quot;Bare&quot;;

export const Bare_comp_bd80ed2b11892f25e4ebf1ecc0c92c00_4c100443 = memo((&#123;children&#125;) =&gt; &#123;
    const reflex___state____state__flow_lab___flow_lab____lab_state = useContext(StateContexts.reflex___state____state__flow_lab___flow_lab____lab_state)



    return(
        reflex___state____state__flow_lab___flow_lab____lab_state.greeting_rx_state_
    )
&#125;);
Bare_comp_bd80ed2b11892f25e4ebf1ecc0c92c00_4c100443.displayName = &quot;Bare&quot;;

export const Debounceinput_debounceinput_c4ee43471c4a3b824243638911cd8d18_4c100443 = memo((&#123;children&#125;) =&gt; &#123;
    const ref_name = useRef(null); refs[&quot;ref_name&quot;] = ref_name;
const on_change_7b9c23851e47f1545854e812eeac6a5d = useCallback(((_e) =&gt; (addEvents([(ReflexEvent(&quot;reflex___state____state.flow_lab___flow_lab____lab_state.rename&quot;, (&#123; [&quot;value&quot;] : _e?.[&quot;target&quot;]?.[&quot;value&quot;] &#125;), (&#123;  &#125;)))], [_e], (&#123;  &#125;)))), [addEvents, ReflexEvent])
const reflex___state____state__flow_lab___flow_lab____lab_state = useContext(StateContexts.reflex___state____state__flow_lab___flow_lab____lab_state)



    return(
        jsx(DebounceInput,&#123;&quot;aria-label&quot;:&quot;Your name&quot;,debounceTimeout:300,element:RadixThemesTextField.Root,id:&quot;name&quot;,inputRef:ref_name,onChange:on_change_7b9c23851e47f1545854e812eeac6a5d,value:(isNotNullOrUndefined(reflex___state____state__flow_lab___flow_lab____lab_state.name_rx_state_) ? reflex___state____state__flow_lab___flow_lab____lab_state.name_rx_state_ : &quot;&quot;)&#125;,)
    )
&#125;);
Debounceinput_debounceinput_c4ee43471c4a3b824243638911cd8d18_4c100443.displayName = &quot;DebounceInput&quot;;

export const Bare_comp_fdcf0bd4ec792dfdb7c993a1ed3aa361_4c100443 = memo((&#123;children&#125;) =&gt; &#123;
    const reflex___state____state__flow_lab___flow_lab____lab_state = useContext(StateContexts.reflex___state____state__flow_lab___flow_lab____lab_state)



    return(
        reflex___state____state__flow_lab___flow_lab____lab_state.count_rx_state_
    )
&#125;);
Bare_comp_fdcf0bd4ec792dfdb7c993a1ed3aa361_4c100443.displayName = &quot;Bare&quot;;

export const Bare_comp_3b3be27a1da5f94255775fbf381c65c6_4c100443 = memo((&#123;children&#125;) =&gt; &#123;
    const reflex___state____state__flow_lab___flow_lab____lab_state = useContext(StateContexts.reflex___state____state__flow_lab___flow_lab____lab_state)



    return(
        reflex___state____state__flow_lab___flow_lab____lab_state.doubled_rx_state_
    )
&#125;);
Bare_comp_3b3be27a1da5f94255775fbf381c65c6_4c100443.displayName = &quot;Bare&quot;;

export const Button_button_5b96ea87d6d46c65a36c4e74327104a9_4c100443 = memo((&#123;children&#125;) =&gt; &#123;
    const ref_increment = useRef(null); refs[&quot;ref_increment&quot;] = ref_increment;
const on_click_f878fea372bb8c958470a4b8a1cc88df = useCallback(((_e) =&gt; (addEvents([(ReflexEvent(&quot;reflex___state____state.flow_lab___flow_lab____lab_state.increment&quot;, (&#123;  &#125;), (&#123;  &#125;)))], [_e], (&#123;  &#125;)))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,&#123;id:&quot;increment&quot;,onClick:on_click_f878fea372bb8c958470a4b8a1cc88df,ref:ref_increment&#125;,children)
    )
&#125;);
Button_button_5b96ea87d6d46c65a36c4e74327104a9_4c100443.displayName = &quot;Button&quot;;

export const Button_button_95e42ef5e6e269cf3d8d5b17cfe4e82a_4c100443 = memo((&#123;children&#125;) =&gt; &#123;
    const on_click_f878fea372bb8c958470a4b8a1cc88df = useCallback(((_e) =&gt; (addEvents([(ReflexEvent(&quot;reflex___state____state.flow_lab___flow_lab____lab_state.increment&quot;, (&#123;  &#125;), (&#123;  &#125;)))], [_e], (&#123;  &#125;)))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,&#123;onClick:on_click_f878fea372bb8c958470a4b8a1cc88df&#125;,children)
    )
&#125;);
Button_button_95e42ef5e6e269cf3d8d5b17cfe4e82a_4c100443.displayName = &quot;Button&quot;;
</code></pre>
				</details>
				<details>
					<summary>Actual generated initialState declaration, including framework substates</summary
					>
					<pre><code
							>export const initialState = &#123;&quot;reflex___state____state&quot;: &#123;&quot;is_hydrated_rx_state_&quot;: false, &quot;router_headers_rx_state_&quot;: &#123;&quot;host&quot;: &quot;&quot;, &quot;origin&quot;: &quot;&quot;, &quot;upgrade&quot;: &quot;&quot;, &quot;connection&quot;: &quot;&quot;, &quot;cookie&quot;: &quot;&quot;, &quot;pragma&quot;: &quot;&quot;, &quot;cache_control&quot;: &quot;&quot;, &quot;user_agent&quot;: &quot;&quot;, &quot;sec_websocket_version&quot;: &quot;&quot;, &quot;sec_websocket_key&quot;: &quot;&quot;, &quot;sec_websocket_extensions&quot;: &quot;&quot;, &quot;accept_encoding&quot;: &quot;&quot;, &quot;accept_language&quot;: &quot;&quot;, &quot;raw_headers&quot;: &#123;&#125;&#125;, &quot;router_page_rx_state_&quot;: &#123;&quot;host&quot;: &quot;&quot;, &quot;path&quot;: &quot;&quot;, &quot;raw_path&quot;: &quot;&quot;, &quot;full_path&quot;: &quot;&quot;, &quot;full_raw_path&quot;: &quot;&quot;, &quot;params&quot;: &#123;&#125;&#125;, &quot;router_route_id_rx_state_&quot;: &quot;&quot;, &quot;router_session_rx_state_&quot;: &#123;&quot;client_token&quot;: &quot;&quot;, &quot;client_ip&quot;: &quot;&quot;, &quot;session_id&quot;: &quot;&quot;&#125;, &quot;router_url_rx_state_&quot;: &#123;&quot;scheme&quot;: &quot;&quot;, &quot;netloc&quot;: &quot;&quot;, &quot;origin&quot;: &quot;&quot;, &quot;path&quot;: &quot;&quot;, &quot;query&quot;: &quot;&quot;, &quot;query_parameters&quot;: &#123;&#125;, &quot;fragment&quot;: &quot;&quot;, &quot;href&quot;: &quot;&quot;&#125;&#125;, &quot;reflex___state____state.flow_lab___flow_lab____lab_state&quot;: &#123;&quot;count_rx_state_&quot;: 0, &quot;doubled_rx_state_&quot;: 0, &quot;greeting_rx_state_&quot;: &quot;Hello, Ada!&quot;, &quot;name_rx_state_&quot;: &quot;Ada&quot;, &quot;page_rx_state_&quot;: &quot;Not loaded&quot;, &quot;visits_rx_state_&quot;: 0&#125;, &quot;reflex___state____state.reflex___istate___shared____shared_state_base_internal&quot;: &#123;&#125;, &quot;reflex___state____state.reflex___state____frontend_event_exception_state&quot;: &#123;&#125;, &quot;reflex___state____state.reflex___state____on_load_internal_state&quot;: &#123;&#125;, &quot;reflex___state____state.reflex___state____update_vars_internal_state&quot;: &#123;&#125;&#125;</code
						></pre>
				</details>
				<p>
					Those long names encode the state class and its parent hierarchy. <code>_rx_state_</code>
					is this checkout's field marker. They are generated implementation details; write
					<code>LabState.count</code> in Python rather than hand-writing the browser key.
				</p>
				<p>
					Use <code>rx.cond</code> and <code>rx.foreach</code> for state-dependent branches and
					lists. An ordinary Python <code>if</code> cannot test a visitor's future browser value while
					compiling the app. Python can still decide static, build-time structure.
				</p>
			</section>
			<section id="load">
				<div class="eyebrow">04 / An empty tab becomes a working app</div>
				<h2>First load has two different “hydrations”</h2>
				<MotionFigure spec={diagrams[2]} {captures} {playback} />

				<div class="callout">
					<strong>React hydration:</strong> attach the client React runtime to the initial document.<br
					/><strong>Reflex state hydration:</strong> synchronize the browser's public state with this
					client's Python state. These are separate steps with similar names.
				</div>
				<div class="sequence" role="table" aria-label="First-load sequence">
					<div class="label">Step</div>
					<div class="label">Browser / frontend</div>
					<div class="label">Python / backend</div>
					<div>1</div>
					<div>
						GET / over HTTP. Receive HTML containing the document shell, metadata, styles, and
						script references.
					</div>
					<div>No user event handler runs just because the frontend serves HTML.</div>
					<div>2</div>
					<div>
						Parse HTML → DOM. Load CSS and JS. Run entry.client.js: hydrateRoot(document,
						HydratedRouter).
					</div>
					<div>The Python server is separately ready to process events.</div>
					<div>3</div>
					<div>
						State providers start from generated initialState. A compiled greeting can initially say
						“Ada”.
					</div>
					<div>The real session may already contain a different name and count.</div>
					<div>4</div>
					<div>
						Read/create a token in sessionStorage. Connect to /_event with the token in the
						connection query.
					</div>
					<div>Socket.IO connects; map the socket SID to a client token.</div>
					<div>5</div>
					<div class="cross">
						Browser → <code>State.hydrate</code>, then <code>on_load_internal</code>. Tracked
						browser storage values, if set, add an update_vars_internal event between them. This app
						has none.
					</div>
					<div>6</div>
					<div>Receive full public snapshot. Replace matching fields in each substate context.</div>
					<div>
						Get/create the session state; hydrate marks is_hydrated false and emits state.dict().
					</div>
					<div>7</div>
					<div>Receive page="Home", visits=1, then is_hydrated=true.</div>
					<div>on_load_internal selects enter_home, chains it, then set_is_hydrated(True).</div>
					<div>8</div>
					<div>
						React commits the updated visible UI. The connection stays open for later events.
					</div>
					<div>State manager retains the session state for the next event.</div>
				</div>
				<p>
					<strong>What is inside the first HTML?</strong> The default React Router config here is
					<code>ssr: false</code>. Do not assume the Python server renders personalized HTML for
					every GET. Production SPA builds can create a static shell/fallback; optional route
					prerendering changes build-time HTML. Neither is a per-visitor state lookup. In
					development, Vite serves the runtime and modules. The actual initial DOM content depends
					on the build/fallback configuration; the generated JS supplies initial state, and the
					socket supplies current session data.
				</p>
				<p>
					The full hydration snapshot has more than the app's fields: the root state includes router
					URL, route identifier, session details and headers; internal substates may be empty
					objects. The capture below lets you inspect all of them. Initial false/true hydration
					changes and on-load updates can arrive in several frames; they are not one magic HTML
					response.
				</p>
				<pre><code
						>// Actual runtime entry point (imports omitted here):
startTransition(() =&gt; &#123;
  hydrateRoot(document, createElement(HydratedRouter));
&#125;);</code
					></pre>
			</section>
			<details>
				<summary>Actual initial development HTML response (GET /)</summary>
				<p class="small">
					Captured from the local Vite frontend before browser execution. Content-Type: text/html.
					Development script paths differ from a production build.
				</p>
				<pre><code
						>&lt;!DOCTYPE html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charSet=&quot;utf-8&quot;/&gt;&lt;meta content=&quot;width=device-width, initial-scale=1&quot; name=&quot;viewport&quot;/&gt;&lt;link rel=&quot;modulepreload&quot; href=&quot;/@id/__x00__virtual:react-router/browser-manifest&quot;/&gt;&lt;link rel=&quot;modulepreload&quot; href=&quot;/app/entry.client.js&quot;/&gt;&lt;link rel=&quot;modulepreload&quot; href=&quot;/app/root.jsx&quot;/&gt;&lt;script&gt;
// Only run in browser environment, not during SSR
if (typeof document !== &#x27;undefined&#x27;) &#123;
    try &#123;
        const theme = localStorage.getItem(&quot;theme&quot;) || &#x27;system&#x27;;
        const systemPreference = window.matchMedia(&quot;(prefers-color-scheme: dark)&quot;).matches ? &quot;dark&quot; : &quot;light&quot;;
        const resolvedTheme = theme === &quot;system&quot; ? systemPreference : theme;

        // Apply theme immediately - blocks until complete
        // Use classList to avoid overwriting other classes
        document.documentElement.classList.remove(&quot;light&quot;, &quot;dark&quot;);
        document.documentElement.classList.add(resolvedTheme);
        document.documentElement.style.colorScheme = resolvedTheme;

    &#125; catch (e) &#123;
        // Fallback to system preference on any error (resolve &quot;system&quot; to actual theme)
        const fallbackTheme = window.matchMedia(&quot;(prefers-color-scheme: dark)&quot;).matches ? &quot;dark&quot; : &quot;light&quot;;
        document.documentElement.classList.remove(&quot;light&quot;, &quot;dark&quot;);
        document.documentElement.classList.add(fallbackTheme);
        document.documentElement.style.colorScheme = fallbackTheme;
    &#125;
&#125;
&lt;/script&gt;&lt;link href=&quot;/styles/__reflex_global_styles.css&quot; rel=&quot;stylesheet&quot; type=&quot;text/css&quot;/&gt;&lt;link data-react-router-critical-css=&quot;&quot; rel=&quot;stylesheet&quot; href=&quot;/@react-router/critical.css?pathname=/&quot;/&gt;&lt;/head&gt;&lt;body&gt;&lt;section aria-label=&quot;Notifications alt+T&quot; tabindex=&quot;-1&quot; aria-live=&quot;polite&quot; aria-relevant=&quot;additions text&quot; aria-atomic=&quot;false&quot; data-react-aria-top-layer=&quot;true&quot;&gt;&lt;/section&gt;&lt;div data-is-root-theme=&quot;true&quot; data-accent-color=&quot;blue&quot; data-gray-color=&quot;slate&quot; data-has-background=&quot;true&quot; data-panel-background=&quot;translucent&quot; data-radius=&quot;medium&quot; data-scaling=&quot;100%&quot; class=&quot;radix-themes css-0&quot;&gt;&lt;style data-emotion=&quot;css 17rg0dp&quot;&gt;.css-17rg0dp&#123;position:fixed;width:100vw;height:0;&#125;&lt;/style&gt;&lt;div title=&quot;Connection Error: &quot; class=&quot;css-17rg0dp&quot;&gt;&lt;/div&gt;&lt;script&gt;
              console.log(
                &quot;💿 Hey developer 👋. You can provide a way better UX than this &quot; +
                &quot;when your app is loading JS modules and/or running `clientLoader` &quot; +
                &quot;functions. Check out https://reactrouter.com/start/framework/route-module#hydratefallback &quot; +
                &quot;for more information.&quot;
              );
            &lt;/script&gt;&lt;/div&gt;&lt;script&gt;window.__reactRouterContext = &#123;&quot;basename&quot;:&quot;/&quot;,&quot;future&quot;:&#123;&quot;unstable_enableNodeReadableStream&quot;:false,&quot;unstable_optimizeDeps&quot;:true&#125;,&quot;routeDiscovery&quot;:&#123;&quot;mode&quot;:&quot;initial&quot;&#125;,&quot;ssr&quot;:false,&quot;isSpaMode&quot;:true,&quot;criticalCss&quot;:&#123;&quot;rel&quot;:&quot;stylesheet&quot;,&quot;href&quot;:&quot;/@react-router/critical.css?pathname=/&quot;&#125;&#125;;window.__reactRouterContext.stream = new ReadableStream(&#123;start(controller)&#123;window.__reactRouterContext.streamController = controller;&#125;&#125;).pipeThrough(new TextEncoderStream());&lt;/script&gt;&lt;script type=&quot;module&quot; async=&quot;&quot;&gt;import &quot;/@id/__x00__virtual:react-router/inject-hmr-runtime&quot;;import &quot;/@id/__x00__virtual:react-router/browser-manifest&quot;;
import * as route0 from &quot;/app/root.jsx&quot;;

  window.__reactRouterRouteModules = &#123;&quot;root&quot;:route0&#125;;

import(&quot;/app/entry.client.js&quot;);&lt;/script&gt;&lt;!--$--&gt;&lt;script&gt;window.__reactRouterContext.streamController.enqueue(&quot;[&#123;\&quot;_1\&quot;:2,\&quot;_3\&quot;:-5,\&quot;_4\&quot;:-5&#125;,\&quot;loaderData\&quot;,&#123;&#125;,\&quot;actionData\&quot;,\&quot;errors\&quot;]\n&quot;);&lt;/script&gt;&lt;!--$--&gt;&lt;script&gt;window.__reactRouterContext.streamController.close();&lt;/script&gt;&lt;!--/$--&gt;&lt;!--/$--&gt;&lt;/body&gt;&lt;/html&gt;</code
					></pre>
			</details>
			<section id="browser-events">
				<div class="eyebrow">Inside the browser</div>
				<h2>What happens between a click and the socket?</h2>
				<MotionFigure spec={diagrams[0]} {captures} {playback} />

				<p>
					There really is a Reflex hook called <code>useEventLoop</code>. It wires together the
					frontend event queue, socket lifecycle, router information, initial events, and browser
					error handling. It returns <code>addEvents</code> and connection errors. It runs as JavaScript
					inside React; it is not a separate thread and does not replace the browser’s native event loop.
				</p>
				<div class="table-wrap">
					<table>
						<thead
							><tr><th>Mechanism</th><th>What it schedules or stores</th><th>Where it lives</th></tr
							></thead
						><tbody>
							<tr
								><td>Browser event loop</td><td
									>JavaScript callbacks, tasks/microtasks, and opportunities to update rendering</td
								><td>Browser runtime</td></tr
							>
							<tr
								><td>React event handling</td><td
									>Dispatches a browser interaction to the component’s registered callback</td
								><td>Loaded React code in the browser</td></tr
							>
							<tr
								><td>Reflex <code>event_queue</code></td><td
									>Reflex event objects awaiting frontend dispatch</td
								><td>A module-level JavaScript array in the current document</td></tr
							>
							<tr
								><td>Socket.IO transport</td><td
									>Connection management, encoding and delivery of named messages</td
								><td>Browser client and backend socket implementation</td></tr
							>
							<tr
								><td>Python event processor</td><td
									>Registered backend handler work for the session</td
								><td>Python server process</td></tr
							>
						</tbody>
					</table>
				</div>
				<h3>1. The browser delivers the click; React calls the handler</h3>
				<p>
					A click reaches the browser’s event system. React’s event handling invokes the callback
					associated with this button. The callback runs on the JavaScript call stack. Synchronous
					calls execute before other queued callbacks can run. Promise continuations use microtasks;
					browser rendering happens at rendering opportunities, not automatically after each source
					line. Long synchronous JavaScript can delay both interaction handling and painting. See <a
						href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model"
						>MDN’s JavaScript execution model</a
					>.
				</p>
				<p>
					Those are browser scheduling rules. Our diagram divides the callback into explanatory
					phases; <strong
						>it does not mean each box is a separate browser task, thread, or rendered frame</strong
					>. A normal callback can call several Reflex functions in the same execution turn.
				</p>
				<h3>2. The generated callback constructs a Reflex event</h3>
				<pre><code
						>// Readable equivalent of the generated button callback:
const onClick = (_e) =&gt; addEvents([
  ReflexEvent(LAB + ".increment", &#123;&#125;, &#123;&#125;)
], [_e], &#123;&#125;);

// Actual ReflexEvent result for this no-argument action:
&#123; name: "reflex___state____state.flow_lab___flow_lab____lab_state.increment" &#125;</code
					></pre>
				<p>
					The browser/React event <code>_e</code> and the Reflex event are different objects. The
					former describes an interaction and supports browser actions. The latter describes the
					application operation to dispatch. The entire DOM event is not serialized. For the name
					input, the generated callback extracts <code>_e.target.value</code> into
					<code>payload.value</code>. For the increment button, no arguments are required and the
					empty payload is omitted.
				</p>
				<p>
					<code>useCallback</code> in the generated component helps preserve the callback reference across
					React renders. It does not create a background task or make the Python event handler execute
					in JavaScript.
				</p>
				<h3>3. addEvents applies frontend event actions</h3>
				<p>
					<code>addEvents</code> removes null/undefined events, merges event-action settings,
					requests a connection when appropriate, and calls <code>applyEventActions</code>. That
					function can invoke <code>preventDefault()</code> or <code>stopPropagation()</code> on the
					local interaction, apply temporal/throttle/debounce behavior, and then invoke the queueing
					target.
				</p>
				<div class="table-wrap">
					<table>
						<thead><tr><th>Action</th><th>Effect</th></tr></thead><tbody>
							<tr
								><td><code>preventDefault</code></td><td
									>Suppresses the browser’s default action for the event, where applicable. This is
									distinct from stopping propagation.</td
								></tr
							>
							<tr
								><td><code>stopPropagation</code></td><td
									>Stops the interaction propagating to further event handlers through the event
									system.</td
								></tr
							>
							<tr
								><td>Throttle</td><td
									>Limits invocation frequency using a keyed frontend throttle helper.</td
								></tr
							>
							<tr
								><td>Debounce</td><td
									>Defers the target through a keyed debounce helper; subsequent activity can
									replace the pending invocation.</td
								></tr
							>
							<tr
								><td>Temporal</td><td
									>Can skip the action when the socket is unavailable instead of reconnecting for
									it.</td
								></tr
							>
						</tbody>
					</table>
				</div>
				<p>
					The sample button has no configured debounce/throttle action. Its name input is separately
					wrapped by a generated <code>DebounceInput</code> with a 300 ms timeout in the saved frontend.
					Component-level input debouncing and Reflex event-action debouncing are separate mechanisms;
					neither means the browser pauses its entire event loop.
				</p>
				<h3>4. queueEvents puts event objects into an ordinary array</h3>
				<pre><code
						>// Frontend module state:
const event_queue = [];

// Simplified from queueEvents:
event_queue.push(...events.filter(e =&gt; e !== undefined &amp;&amp; e !== null));
await processEvent(resolveSocket(socket), navigate, params);

// A transient teaching snapshot, before processEvent shifts it:
[
  &#123; name: "reflex___state____state.flow_lab___flow_lab____lab_state.increment" &#125;
]</code
					></pre>
				<p>
					This array lives in JavaScript memory. It is not the browser’s task queue, Python’s event
					queue, sessionStorage, a database, or a durable message log. When the connection is ready,
					dispatch may begin immediately in the same call chain; you should not expect the
					intermediate array contents to persist long enough to produce a visible UI frame.
				</p>
				<p>
					<code>prepend=true</code> puts supplied events ahead of pending ones. The runtime uses it
					for initialization/reconnection work. If the queue contains stateful work and the socket
					is unavailable, <code>processEvent</code> returns before removing the next event. Connection
					setup later drains pending events. Refresh discards this in-memory array; it is not an offline-delivery
					guarantee.
				</p>
				<h3>5. processEvent selects local, REST, or socket handling</h3>
				<pre><code
						>// Readable outline; inspect the source excerpt below for the real code:
if (statefulWorkQueued &amp;&amp; !socket.connected) return;
const event = event_queue.shift();

if (event.handler) &#123;
  await applyRestEvent(event, ...);
&#125; else &#123;
  await applyEvent(event, ...);
&#125;</code
					></pre>
				<p>
					<code>applyEvent</code> recognizes browser-side commands such as redirects and script
					execution. For an ordinary Python handler event, it attaches <code>router_data</code> if
					missing, then calls <code>socket.emit("event", event)</code>. The browser token belongs to
					the connection in this checkout. REST/upload paths are separate from this button’s socket
					path.
				</p>
				<p>
					<strong>“Queue drained” does not mean “Python finished.”</strong> The normal socket path
					awaits local dispatch code, not the server’s state delta. There is no
					<code>final=true</code>
					gate here. The inspected <code>processEvent</code> implementation removes the next event and
					continues local processing; it does not contain a single-flight “wait for the backend reply”
					flag. Separate asynchronous entry points can interleave at await boundaries, so do not infer
					global server-completion ordering from this frontend array.
				</p>
				<h3>6. JavaScript continues while Python works</h3>
				<p>
					Socket transmission does not make the callback synchronously execute the Python handler.
					After local JavaScript yields or returns, the browser can handle other work. Later,
					incoming network data causes Socket.IO to invoke its registered <code>"event"</code> listener.
					That listener is a different entry into the frontend runtime from the original click.
				</p>
				<pre><code
						>Click callback → outgoing queue → socket.emit()
                                   │
                             Python processes event
                                   │
Later socket callback ← StateUpdate.delta
          ↓
React reducer dispatch → updated context → render/commit</code
					></pre>
				<h3>7. The incoming listener updates React state</h3>
				<p>
					The incoming callback validates substate names, dispatches each received substate delta to
					its reducer, applies configured client-storage changes, and queues any returned frontend
					events. The reducer shallow-merges the changed fields. React then schedules/render-commits
					the affected UI; the callback itself does not assign the counter’s HTML directly.
				</p>
				<p>
					This receive path can report a fatal frontend/backend state-definition mismatch if a delta
					targets an unknown substate. The current outgoing processing code also drops pending
					events after such a mismatch to avoid repeatedly processing an invalid queue. Connection
					errors and frontend exception reporting are other responsibilities wired through <code
						>useEventLoop</code
					>.
				</p>
				<h3>How to inspect it in DevTools</h3>
				<ol>
					<li>
						Open Sources and find the generated frontend’s <code>utils/state.js</code>. In a
						production build, source maps and minification settings affect how easily this maps back
						to source; development mode is simpler.
					</li>
					<li>
						Break in the generated button callback, then <code>addEvents</code>,
						<code>queueEvents</code>, <code>processEvent</code>, and just before
						<code>socket.emit</code>. Inspect <code>_e</code>, the separate Reflex event, and the
						module’s <code>event_queue</code> in scope.
					</li>
					<li>
						Break separately in <code>socket.current.on("event", ...)</code> and inspect the incoming
						update. Notice that the original click callback is no longer waiting on the stack for this
						reply.
					</li>
					<li>
						Break at <code>applyDelta</code> to compare the old substate with the changed fields. Use
						Network → WebSocket messages to compare the real request and response.
					</li>
				</ol>
				<p class="small">
					Frontend source inspected at checkout <code>35c11e12c</code>:
					<code>packages/reflex-base/src/reflex_base/.templates/web/utils/state.js</code>. The
					diagram’s network phases reuse the guide’s saved counter request/response. Its queue
					snapshots and local call-stack phases are explanatory, not a browser performance trace.
				</p>
				<details>
					<summary>Actual queueEvents and processEvent source</summary>
					<pre><code
							>export const queueEvents = async (
  events,
  socket,
  prepend,
  navigate,
  params,
) =&gt; &#123;
  if (prepend) &#123;
    // Drain the existing queue and place it after the given events.
    events = [
      ...events,
      ...Array.from(&#123; length: event_queue.length &#125;).map(() =&gt;
        event_queue.shift(),
      ),
    ];
  &#125;
  event_queue.push(...events.filter((e) =&gt; e !== undefined &amp;&amp; e !== null));
  await processEvent(resolveSocket(socket), navigate, params);
&#125;;

/**
 * Process an event off the event queue.
 * @param socket The socket object to send the event on.
 * @param navigate The navigate function from React Router
 * @param params The params object from React Router
 */
export const processEvent = async (socket, navigate, params) =&gt; &#123;
  // Only proceed if the socket is up or no event in the queue uses state, otherwise we throw the event into the void
  if (isStateful() &amp;&amp; !(socket &amp;&amp; socket.connected)) &#123;
    return;
  &#125;

  // A backend/frontend state mismatch is fatal; do not send further events.
  // Drop pending events too: callers drain the queue in while-loops that
  // would otherwise spin forever on an early return.
  if (backend_state_mismatch) &#123;
    event_queue.length = 0;
    return;
  &#125;

  // Only proceed if we&#x27;re not already processing an event.
  if (event_queue.length === 0) &#123;
    return;
  &#125;

  // Apply the next event in the queue.
  const event = event_queue.shift();

  // Process events with handlers via REST and all others via websockets.
  if (event.handler) &#123;
    await applyRestEvent(event, socket, navigate, params);
  &#125; else &#123;
    await applyEvent(event, socket, navigate, params);
  &#125;
  // Process any remaining events.
  if (event_queue.length &gt; 0) &#123;
    await processEvent(socket, navigate, params);
  &#125;
&#125;;

</code></pre>
				</details>
				<details>
					<summary>Actual applyEventActions source</summary>
					<pre><code
							>export const applyEventActions = (
  target,
  event_actions = &#123;&#125;,
  args = [],
  action_key = null,
  temporal_handler = null,
) =&gt; &#123;
  if (!(args instanceof Array)) &#123;
    args = [args];
  &#125;

  const _e = args.find((o) =&gt; o?.preventDefault !== undefined);

  if (event_actions?.preventDefault &amp;&amp; _e?.preventDefault) &#123;
    _e.preventDefault();
  &#125;
  if (event_actions?.stopPropagation &amp;&amp; _e?.stopPropagation) &#123;
    _e.stopPropagation();
  &#125;
  if (event_actions?.temporal &amp;&amp; temporal_handler &amp;&amp; !temporal_handler()) &#123;
    return;
  &#125;

  const invokeTarget = () =&gt; target(...args);
  const resolved_action_key = action_key ?? target.toString();

  if (event_actions?.throttle) &#123;
    if (!throttle(resolved_action_key, event_actions.throttle)) &#123;
      return;
    &#125;
  &#125;
  if (event_actions?.debounce) &#123;
    debounce(resolved_action_key, invokeTarget, event_actions.debounce);
    return;
  &#125;
  return invokeTarget();
&#125;;

</code></pre>
				</details>
			</section>

			<section id="explorer">
				<div class="eyebrow">05 / Step through the round trip</div>
				<h2>Follow one click, one layer at a time</h2>
				<MotionFigure spec={diagrams[3]} {captures} {playback} />

				<p>
					This deterministic simulation starts after the Home page has hydrated. Choose an action
					and step through it. Each action begins from the same baseline so you can compare them.
					The packet shapes match the captured app; only the relevant app substate is shown.
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
				<noscript
					><p>
						JavaScript is disabled. The static chapters and expanded source sections still explain
						the complete flow; enable JavaScript for this stepper and the recorded-frame selector.
					</p></noscript
				>
			</section>
			<section id="representations">
				<div class="eyebrow">06 / The same information, in different forms</div>
				<h2>What exactly crosses the boundary?</h2>
				<div class="table-wrap">
					<table>
						<thead><tr><th>Where</th><th>Original form</th><th>What it means</th></tr></thead><tbody
						>
							<tr
								><td>Python declaration</td><td><code>count: int = 0</code></td><td
									>Typed state field and default. A class reference becomes a Var expression when
									used in a component.</td
								></tr
							>
							<tr
								><td>Python session instance</td><td><code>self.count == 1</code></td><td
									>Actual Python integer for this token.</td
								></tr
							>
							<tr
								><td>Browser DOM event</td><td><code>event.target.value === "Lin"</code></td><td
									>JavaScript string extracted from the input. The whole DOM/React event object is
									not sent.</td
								></tr
							>
							<tr
								><td>Browser event object</td><td
									><code
										>&#123;name: LAB + ".rename", payload: &#123;value: "Lin"&#125;, router_data:
										…&#125;</code
									></td
								><td>Handler identifier, named arguments, and browser routing information.</td></tr
							>
							<tr
								><td>Socket.IO frame</td><td><code>42/_event,["event",&#123;…&#125;]</code></td><td
									>Engine.IO message type 4 + Socket.IO EVENT type 2 + namespace + JSON array.</td
								></tr
							>
							<tr
								><td>Python deserialization</td><td
									><code>Event(name=…, payload=&#123;"value": "Lin"&#125;, router_data=…)</code></td
								><td
									>Socket.IO decodes JSON to a dict. EventNamespace builds an Event and enriches
									routing metadata. Defaults supply omitted fields.</td
								></tr
							>
							<tr
								><td>Python handler call</td><td><code>rename(value="Lin")</code></td><td
									>The event argument binds to the annotated parameter; self is the resolved session
									state.</td
								></tr
							>
							<tr
								><td>Python update object</td><td
									><code
										>StateUpdate(delta=&#123;LAB: &#123;"name_rx_state_": "Lin",
										"greeting_rx_state_": "Hello, Lin!"&#125;&#125;)</code
									></td
								><td>Dirty public fields plus affected computed fields.</td></tr
							>
							<tr
								><td>Browser state after merge</td><td
									><code>&#123;…oldState, …delta[LAB]&#125;</code></td
								><td>JavaScript strings/numbers, then React text nodes and DOM changes.</td></tr
							>
						</tbody>
					</table>
				</div>
				<p>
					<code>LAB</code> in shortened explanations means
					<code>reflex___state____state.flow_lab___flow_lab____lab_state</code>. Actual captures use
					the full name. Object key order has no semantic meaning.
				</p>
				<div class="grid">
					<div>
						<h3>Actual rename request payload</h3>
						<pre><code
								>&#123;
  "name": "reflex___state____state.flow_lab___flow_lab____lab_state.rename",
  "payload": &#123;"value": "Lin"&#125;,
  "router_data": &#123;"pathname": "/", "asPath": "/"&#125;
&#125;</code
							></pre>
					</div>
					<div>
						<h3>Actual rename response payload</h3>
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
					<strong>No token in this normal event body.</strong> This checkout sends the token when
					connecting. The backend resolves it from the socket SID. <code>increment</code> also omits
					an empty payload. The StateUpdate serializer omits empty fields, so these responses have
					no empty <code>events</code> list and no <code>final: true</code>.
				</p>
				<h3>Raw text frame, before Socket.IO unwraps it</h3>
				<pre><code
						>42/_event,["event",&#123;"name":"reflex___state____state.flow_lab___flow_lab____lab_state.rename","payload":&#123;"value":"Lin"&#125;,"router_data":&#123;"pathname":"/","asPath":"/"&#125;&#125;]</code
					></pre>
				<p>
					This is WebSocket <em>application frame text</em>, not the TCP/TLS bytes. The
					<code>42</code>
					prefix is protocol framing, not a count. The namespace is <code>/_event</code>; the named
					Socket.IO event is <code>"event"</code>. They are different things. Engine.IO handshake
					and heartbeat packets are additional traffic. The configured default transport is
					WebSocket, not a mandatory polling-then-upgrade sequence; polling can be configured
					separately. In deployment, HTTPS/WSS adds transport encryption without changing this
					logical payload.
				</p>
				<h3>Python types do not travel as Python objects</h3>
				<p>
					For this app: Python <code>int</code> becomes a JSON number and then a JS number;
					<code>str</code>
					becomes a JSON/JS string; <code>bool</code> becomes JSON true/false; <code>None</code> becomes
					null. Lists become arrays, mappings become objects after supported serialization. No pickle
					or executable Python is sent to the browser. More complex values require Reflex serializers;
					dates, models, custom classes, and large numbers should be checked against their specific serializer
					and JavaScript representation. Python annotations alone do not guarantee a lossless network
					representation.
				</p>
				<p>
					A JSON dump stored inside a JSON capture file has escaped quotes such as <code
						>\"name\"</code
					>. That outer escaping belongs to the <em>capture file's string</em>; the actual WebSocket
					text above has ordinary quotes.
				</p>
			</section>
			<section id="capture">
				<div class="eyebrow">07 / Evidence from the working app</div>
				<h2>Read the real conversation</h2>
				<p>
					Captured with headless Chromium against the running app: initial Home load → increment →
					rename to Lin → Details → refresh. These are actual <code>/_event</code> frames, not generated
					by the simulation. Volatile client IDs and WebSocket keys are replaced with labeled placeholders.
					Vite's separate hot-reload connection is excluded. Expand the complete transcript for a no-JavaScript
					view.
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
				<details>
					<summary>Complete sanitized frame transcript</summary>
					<pre class="packet"><code
							>[
  &#123;
    &quot;direction&quot;: &quot;server → browser&quot;,
    &quot;data&quot;: &quot;0&#123;\&quot;sid\&quot;:\&quot;&lt;SOCKET_ID_1&gt;\&quot;,\&quot;upgrades\&quot;:[],\&quot;pingTimeout\&quot;:120000,\&quot;pingInterval\&quot;:25000,\&quot;maxPayload\&quot;:1000000&#125;&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;browser → server&quot;,
    &quot;data&quot;: &quot;40/_event,&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;server → browser&quot;,
    &quot;data&quot;: &quot;40/_event,&#123;\&quot;sid\&quot;:\&quot;&lt;SOCKET_ID_2&gt;\&quot;&#125;&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;browser → server&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;name\&quot;:\&quot;reflex___state____state.hydrate\&quot;,\&quot;router_data\&quot;:&#123;\&quot;pathname\&quot;:\&quot;/\&quot;,\&quot;asPath\&quot;:\&quot;/\&quot;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;browser → server&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;name\&quot;:\&quot;reflex___state____state.reflex___state____on_load_internal_state.on_load_internal\&quot;,\&quot;router_data\&quot;:&#123;\&quot;pathname\&quot;:\&quot;/\&quot;,\&quot;asPath\&quot;:\&quot;/\&quot;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;server → browser&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;delta\&quot;:&#123;\&quot;reflex___state____state\&quot;:&#123;\&quot;is_hydrated_rx_state_\&quot;:false,\&quot;router_headers_rx_state_\&quot;:&#123;\&quot;host\&quot;:\&quot;localhost:8037\&quot;,\&quot;origin\&quot;:\&quot;http://localhost:3037\&quot;,\&quot;upgrade\&quot;:\&quot;websocket\&quot;,\&quot;connection\&quot;:\&quot;Upgrade\&quot;,\&quot;cookie\&quot;:\&quot;\&quot;,\&quot;pragma\&quot;:\&quot;no-cache\&quot;,\&quot;cache_control\&quot;:\&quot;no-cache\&quot;,\&quot;user_agent\&quot;:\&quot;Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/151.0.7922.34 Safari/537.36\&quot;,\&quot;sec_websocket_version\&quot;:\&quot;13\&quot;,\&quot;sec_websocket_key\&quot;:\&quot;&lt;SOCKET_KEY_3&gt;\&quot;,\&quot;sec_websocket_extensions\&quot;:\&quot;permessage-deflate; client_max_window_bits\&quot;,\&quot;accept_encoding\&quot;:\&quot;gzip, deflate, br, zstd\&quot;,\&quot;accept_language\&quot;:\&quot;\&quot;,\&quot;raw_headers\&quot;:&#123;\&quot;accept-encoding\&quot;:\&quot;gzip, deflate, br, zstd\&quot;,\&quot;asgi-scope-client\&quot;:\&quot;127.0.0.1\&quot;,\&quot;cache-control\&quot;:\&quot;no-cache\&quot;,\&quot;connection\&quot;:\&quot;Upgrade\&quot;,\&quot;host\&quot;:\&quot;localhost:8037\&quot;,\&quot;origin\&quot;:\&quot;http://localhost:3037\&quot;,\&quot;pragma\&quot;:\&quot;no-cache\&quot;,\&quot;sec-websocket-extensions\&quot;:\&quot;permessage-deflate; client_max_window_bits\&quot;,\&quot;sec-websocket-key\&quot;:\&quot;&lt;SOCKET_KEY_3&gt;\&quot;,\&quot;sec-websocket-protocol\&quot;:\&quot;0.9.10.post41.dev0+9c270ca6c\&quot;,\&quot;sec-websocket-version\&quot;:\&quot;13\&quot;,\&quot;upgrade\&quot;:\&quot;websocket\&quot;,\&quot;user-agent\&quot;:\&quot;Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/151.0.7922.34 Safari/537.36\&quot;&#125;&#125;,\&quot;router_page_rx_state_\&quot;:&#123;\&quot;host\&quot;:\&quot;http://localhost:3037\&quot;,\&quot;path\&quot;:\&quot;/index\&quot;,\&quot;raw_path\&quot;:\&quot;/\&quot;,\&quot;full_path\&quot;:\&quot;http://localhost:3037/index\&quot;,\&quot;full_raw_path\&quot;:\&quot;http://localhost:3037/\&quot;,\&quot;params\&quot;:&#123;&#125;&#125;,\&quot;router_route_id_rx_state_\&quot;:\&quot;/index\&quot;,\&quot;router_session_rx_state_\&quot;:&#123;\&quot;client_token\&quot;:\&quot;&lt;CLIENT_TOKEN_4&gt;\&quot;,\&quot;client_ip\&quot;:\&quot;127.0.0.1\&quot;,\&quot;session_id\&quot;:\&quot;&lt;SOCKET_ID_2&gt;\&quot;&#125;,\&quot;router_url_rx_state_\&quot;:&#123;\&quot;scheme\&quot;:\&quot;http\&quot;,\&quot;netloc\&quot;:\&quot;localhost:3037\&quot;,\&quot;origin\&quot;:\&quot;http://localhost:3037\&quot;,\&quot;path\&quot;:\&quot;/\&quot;,\&quot;query\&quot;:\&quot;\&quot;,\&quot;query_parameters\&quot;:&#123;&#125;,\&quot;fragment\&quot;:\&quot;\&quot;,\&quot;href\&quot;:\&quot;http://localhost:3037/\&quot;&#125;&#125;,\&quot;reflex___state____state.reflex___state____on_load_internal_state\&quot;:&#123;&#125;,\&quot;reflex___state____state.flow_lab___flow_lab____lab_state\&quot;:&#123;\&quot;count_rx_state_\&quot;:0,\&quot;doubled_rx_state_\&quot;:0,\&quot;greeting_rx_state_\&quot;:\&quot;Hello, Ada!\&quot;,\&quot;name_rx_state_\&quot;:\&quot;Ada\&quot;,\&quot;page_rx_state_\&quot;:\&quot;Not loaded\&quot;,\&quot;visits_rx_state_\&quot;:0&#125;,\&quot;reflex___state____state.reflex___istate___shared____shared_state_base_internal\&quot;:&#123;&#125;,\&quot;reflex___state____state.reflex___state____frontend_event_exception_state\&quot;:&#123;&#125;,\&quot;reflex___state____state.reflex___state____update_vars_internal_state\&quot;:&#123;&#125;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;server → browser&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;delta\&quot;:&#123;\&quot;reflex___state____state\&quot;:&#123;\&quot;is_hydrated_rx_state_\&quot;:false&#125;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;server → browser&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;delta\&quot;:&#123;\&quot;reflex___state____state.flow_lab___flow_lab____lab_state\&quot;:&#123;\&quot;page_rx_state_\&quot;:\&quot;Home\&quot;,\&quot;visits_rx_state_\&quot;:1&#125;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;server → browser&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;delta\&quot;:&#123;\&quot;reflex___state____state\&quot;:&#123;\&quot;is_hydrated_rx_state_\&quot;:true&#125;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;browser → server&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;name\&quot;:\&quot;reflex___state____state.flow_lab___flow_lab____lab_state.increment\&quot;,\&quot;router_data\&quot;:&#123;\&quot;pathname\&quot;:\&quot;/\&quot;,\&quot;asPath\&quot;:\&quot;/\&quot;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;server → browser&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;delta\&quot;:&#123;\&quot;reflex___state____state.flow_lab___flow_lab____lab_state\&quot;:&#123;\&quot;doubled_rx_state_\&quot;:2,\&quot;count_rx_state_\&quot;:1&#125;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;browser → server&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;name\&quot;:\&quot;reflex___state____state.flow_lab___flow_lab____lab_state.rename\&quot;,\&quot;payload\&quot;:&#123;\&quot;value\&quot;:\&quot;Lin\&quot;&#125;,\&quot;router_data\&quot;:&#123;\&quot;pathname\&quot;:\&quot;/\&quot;,\&quot;asPath\&quot;:\&quot;/\&quot;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;server → browser&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;delta\&quot;:&#123;\&quot;reflex___state____state.flow_lab___flow_lab____lab_state\&quot;:&#123;\&quot;name_rx_state_\&quot;:\&quot;Lin\&quot;,\&quot;greeting_rx_state_\&quot;:\&quot;Hello, Lin!\&quot;&#125;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;browser → server&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;name\&quot;:\&quot;reflex___state____state.reflex___state____on_load_internal_state.on_load_internal\&quot;,\&quot;router_data\&quot;:&#123;\&quot;pathname\&quot;:\&quot;/details\&quot;,\&quot;asPath\&quot;:\&quot;/details\&quot;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;server → browser&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;delta\&quot;:&#123;\&quot;reflex___state____state\&quot;:&#123;\&quot;is_hydrated_rx_state_\&quot;:false,\&quot;router_route_id_rx_state_\&quot;:\&quot;/details\&quot;,\&quot;router_page_rx_state_\&quot;:&#123;\&quot;host\&quot;:\&quot;http://localhost:3037\&quot;,\&quot;path\&quot;:\&quot;/details\&quot;,\&quot;raw_path\&quot;:\&quot;/details\&quot;,\&quot;full_path\&quot;:\&quot;http://localhost:3037/details\&quot;,\&quot;full_raw_path\&quot;:\&quot;http://localhost:3037/details\&quot;,\&quot;params\&quot;:&#123;&#125;&#125;,\&quot;router_url_rx_state_\&quot;:&#123;\&quot;scheme\&quot;:\&quot;http\&quot;,\&quot;netloc\&quot;:\&quot;localhost:3037\&quot;,\&quot;origin\&quot;:\&quot;http://localhost:3037\&quot;,\&quot;path\&quot;:\&quot;/details\&quot;,\&quot;query\&quot;:\&quot;\&quot;,\&quot;query_parameters\&quot;:&#123;&#125;,\&quot;fragment\&quot;:\&quot;\&quot;,\&quot;href\&quot;:\&quot;http://localhost:3037/details\&quot;&#125;&#125;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;server → browser&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;delta\&quot;:&#123;\&quot;reflex___state____state.flow_lab___flow_lab____lab_state\&quot;:&#123;\&quot;page_rx_state_\&quot;:\&quot;Details\&quot;,\&quot;visits_rx_state_\&quot;:2&#125;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;server → browser&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;delta\&quot;:&#123;\&quot;reflex___state____state\&quot;:&#123;\&quot;is_hydrated_rx_state_\&quot;:true&#125;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;browser → server&quot;,
    &quot;data&quot;: &quot;41/_event,&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;server → browser&quot;,
    &quot;data&quot;: &quot;0&#123;\&quot;sid\&quot;:\&quot;&lt;SOCKET_ID_5&gt;\&quot;,\&quot;upgrades\&quot;:[],\&quot;pingTimeout\&quot;:120000,\&quot;pingInterval\&quot;:25000,\&quot;maxPayload\&quot;:1000000&#125;&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;browser → server&quot;,
    &quot;data&quot;: &quot;40/_event,&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;server → browser&quot;,
    &quot;data&quot;: &quot;40/_event,&#123;\&quot;sid\&quot;:\&quot;&lt;SOCKET_ID_6&gt;\&quot;&#125;&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;browser → server&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;name\&quot;:\&quot;reflex___state____state.hydrate\&quot;,\&quot;router_data\&quot;:&#123;\&quot;pathname\&quot;:\&quot;/details\&quot;,\&quot;asPath\&quot;:\&quot;/details\&quot;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;browser → server&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;name\&quot;:\&quot;reflex___state____state.reflex___state____on_load_internal_state.on_load_internal\&quot;,\&quot;router_data\&quot;:&#123;\&quot;pathname\&quot;:\&quot;/details\&quot;,\&quot;asPath\&quot;:\&quot;/details\&quot;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;server → browser&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;delta\&quot;:&#123;\&quot;reflex___state____state\&quot;:&#123;\&quot;is_hydrated_rx_state_\&quot;:false,\&quot;router_headers_rx_state_\&quot;:&#123;\&quot;host\&quot;:\&quot;localhost:8037\&quot;,\&quot;origin\&quot;:\&quot;http://localhost:3037\&quot;,\&quot;upgrade\&quot;:\&quot;websocket\&quot;,\&quot;connection\&quot;:\&quot;Upgrade\&quot;,\&quot;cookie\&quot;:\&quot;\&quot;,\&quot;pragma\&quot;:\&quot;no-cache\&quot;,\&quot;cache_control\&quot;:\&quot;no-cache\&quot;,\&quot;user_agent\&quot;:\&quot;Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/151.0.7922.34 Safari/537.36\&quot;,\&quot;sec_websocket_version\&quot;:\&quot;13\&quot;,\&quot;sec_websocket_key\&quot;:\&quot;&lt;SOCKET_KEY_7&gt;\&quot;,\&quot;sec_websocket_extensions\&quot;:\&quot;permessage-deflate; client_max_window_bits\&quot;,\&quot;accept_encoding\&quot;:\&quot;gzip, deflate, br, zstd\&quot;,\&quot;accept_language\&quot;:\&quot;\&quot;,\&quot;raw_headers\&quot;:&#123;\&quot;accept-encoding\&quot;:\&quot;gzip, deflate, br, zstd\&quot;,\&quot;asgi-scope-client\&quot;:\&quot;127.0.0.1\&quot;,\&quot;cache-control\&quot;:\&quot;no-cache\&quot;,\&quot;connection\&quot;:\&quot;Upgrade\&quot;,\&quot;host\&quot;:\&quot;localhost:8037\&quot;,\&quot;origin\&quot;:\&quot;http://localhost:3037\&quot;,\&quot;pragma\&quot;:\&quot;no-cache\&quot;,\&quot;sec-websocket-extensions\&quot;:\&quot;permessage-deflate; client_max_window_bits\&quot;,\&quot;sec-websocket-key\&quot;:\&quot;&lt;SOCKET_KEY_7&gt;\&quot;,\&quot;sec-websocket-protocol\&quot;:\&quot;0.9.10.post41.dev0+9c270ca6c\&quot;,\&quot;sec-websocket-version\&quot;:\&quot;13\&quot;,\&quot;upgrade\&quot;:\&quot;websocket\&quot;,\&quot;user-agent\&quot;:\&quot;Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/151.0.7922.34 Safari/537.36\&quot;&#125;&#125;,\&quot;router_page_rx_state_\&quot;:&#123;\&quot;host\&quot;:\&quot;http://localhost:3037\&quot;,\&quot;path\&quot;:\&quot;/details\&quot;,\&quot;raw_path\&quot;:\&quot;/details\&quot;,\&quot;full_path\&quot;:\&quot;http://localhost:3037/details\&quot;,\&quot;full_raw_path\&quot;:\&quot;http://localhost:3037/details\&quot;,\&quot;params\&quot;:&#123;&#125;&#125;,\&quot;router_route_id_rx_state_\&quot;:\&quot;/details\&quot;,\&quot;router_session_rx_state_\&quot;:&#123;\&quot;client_token\&quot;:\&quot;&lt;CLIENT_TOKEN_4&gt;\&quot;,\&quot;client_ip\&quot;:\&quot;127.0.0.1\&quot;,\&quot;session_id\&quot;:\&quot;&lt;SOCKET_ID_6&gt;\&quot;&#125;,\&quot;router_url_rx_state_\&quot;:&#123;\&quot;scheme\&quot;:\&quot;http\&quot;,\&quot;netloc\&quot;:\&quot;localhost:3037\&quot;,\&quot;origin\&quot;:\&quot;http://localhost:3037\&quot;,\&quot;path\&quot;:\&quot;/details\&quot;,\&quot;query\&quot;:\&quot;\&quot;,\&quot;query_parameters\&quot;:&#123;&#125;,\&quot;fragment\&quot;:\&quot;\&quot;,\&quot;href\&quot;:\&quot;http://localhost:3037/details\&quot;&#125;&#125;,\&quot;reflex___state____state.reflex___state____on_load_internal_state\&quot;:&#123;&#125;,\&quot;reflex___state____state.flow_lab___flow_lab____lab_state\&quot;:&#123;\&quot;count_rx_state_\&quot;:1,\&quot;doubled_rx_state_\&quot;:2,\&quot;greeting_rx_state_\&quot;:\&quot;Hello, Lin!\&quot;,\&quot;name_rx_state_\&quot;:\&quot;Lin\&quot;,\&quot;page_rx_state_\&quot;:\&quot;Details\&quot;,\&quot;visits_rx_state_\&quot;:2&#125;,\&quot;reflex___state____state.reflex___istate___shared____shared_state_base_internal\&quot;:&#123;&#125;,\&quot;reflex___state____state.reflex___state____frontend_event_exception_state\&quot;:&#123;&#125;,\&quot;reflex___state____state.reflex___state____update_vars_internal_state\&quot;:&#123;&#125;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;server → browser&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;delta\&quot;:&#123;\&quot;reflex___state____state\&quot;:&#123;\&quot;is_hydrated_rx_state_\&quot;:false&#125;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;server → browser&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;delta\&quot;:&#123;\&quot;reflex___state____state.flow_lab___flow_lab____lab_state\&quot;:&#123;\&quot;page_rx_state_\&quot;:\&quot;Details\&quot;,\&quot;visits_rx_state_\&quot;:3&#125;&#125;&#125;]&quot;
  &#125;,
  &#123;
    &quot;direction&quot;: &quot;server → browser&quot;,
    &quot;data&quot;: &quot;42/_event,[\&quot;event\&quot;,&#123;\&quot;delta\&quot;:&#123;\&quot;reflex___state____state\&quot;:&#123;\&quot;is_hydrated_rx_state_\&quot;:true&#125;&#125;&#125;]&quot;
  &#125;
]</code
						></pre>
				</details>
				<p>
					The first hydrate sends count 0/name Ada. Increment sends only count and doubled. Rename
					sends only name and greeting. Navigation sends router changes, page/visits, and hydration
					status. After refresh, a new connection hydrates count 1/name Lin from the retained
					session, then Details on-load increments visits from 2 to 3.
				</p>
			</section>
			<section id="server">
				<div class="eyebrow">08 / Inside the kitchen</div>
				<h2>From event name to Python mutation</h2>
				<ol>
					<li>
						<strong>Connection context:</strong> <code>EventNamespace.on_event</code> finds the token
						associated with the SID. An event from an unassociated socket is not processed as a normal
						session event.
					</li>
					<li>
						<strong>Decode and enrich:</strong> parse the incoming mapping into an Event, merge connection
						metadata such as headers/IP, normalize query data, resolve the route, and attach server-known
						client identity.
					</li>
					<li>
						<strong>Queue:</strong> <code>event_processor.enqueue(token, event)</code> schedules the
						registered handler. This checkout has backend event queues and event futures. It is not the
						older “browser waits for final=true” protocol.
					</li>
					<li>
						<strong>Resolve state and lock:</strong> the BaseState event processor obtains the relevant
						state through the state manager. Foreground state handlers run with the modification context
						protecting that client's state. Different tokens can be processed independently; this is
						not a single global counter shared by all visitors.
					</li>
					<li>
						<strong>Middleware and handler:</strong> update route variables, allow preprocessing,
						resolve the event target and arguments, and call the handler.
						<code>self.count += 1</code>
						updates the actual session integer; <code>_handled += 1</code> updates backend-only bookkeeping.
					</li>
					<li>
						<strong>Dirty tracking:</strong> state assignment marks fields dirty. Computed
						dependency tracking invalidates <code>doubled</code> when count changes.
						<code>get_delta()</code> collects dirty public base variables and computed variables, adds
						the field marker, and recurses through dirty substates.
					</li>
					<li>
						<strong>Resolve and emit:</strong> compute/resolve delta values, apply the relevant postprocessing,
						and emit StateUpdate to the socket belonging to that token. Dirty tracking is cleaned at
						the framework's flush boundaries. The state manager retains/persists state under its chosen
						policy.
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
					<strong>Why doesn't <code>_handled</code> appear?</strong> Underscore backend variables are
					excluded from the public state delta. The app still sends the visible effect, such as the new
					count. Excluding a field does not protect values you explicitly return through other public
					fields or responses. Keep secrets out of public state and build-time defaults.
				</p>
				<p>
					<strong>Why does a computed field change without an assignment?</strong>
					<code>@rx.var</code>
					records a dependency on the fields read by its Python getter. A changed dependency invalidates
					the cached computation. The new result is sent as data. JavaScript is not executing the Python
					<code>doubled</code> getter.
				</p>
				<p>
					The sample contains simple atomic handlers. A real database write belongs in server-side
					logic but has its own database transaction: the Reflex state lock is not a database
					transaction, nor is a state manager a substitute for permanent application storage.
				</p>
			</section>
			<section id="render">
				<div class="eyebrow">09 / Back in the browser</div>
				<h2>A delta changes state; React changes the DOM</h2>
				<pre><code
						>// The runtime reducer in this checkout:
export const applyDelta = (state, delta) =&gt; &#123;
  return &#123; ...state, ...delta &#125;;
&#125;;

// Conceptual call for the counter reply:
dispatch[LAB](&#123; count_rx_state_: 1, doubled_rx_state_: 2 &#125;);</code
					></pre>
				<p>
					The socket callback verifies that the delta's substate names have registered dispatch
					functions. It dispatches each substate update into its reducer, synchronizes configured
					browser-storage fields, and handles any frontend command events. An unknown substate
					signals a stale/mismatched frontend/backend build and is reported as a client error.
				</p>
				<p>
					The merge is <strong>shallow at the substate field level</strong>. Omitted fields keep
					their previous values. A changed list/dict field is generally sent as its serialized field
					value here; this is not an arbitrary JSON Patch protocol and does not carry instructions
					such as “insert DOM node 7”. React consumes the updated context, evaluates affected
					components, reconciles elements, and commits the required DOM updates. The browser then
					performs any necessary style/layout/paint work.
				</p>
				<p>
					For the counter button, Python decides the new value; the screen waits for the server
					delta. For an input, the browser naturally has local keystroke behavior, and Reflex's
					input components can manage/debounce that local value before sending updates. Do not infer
					that every visible keystroke waits for a server response, or that every key generates
					exactly one packet. The captured test filled the input with <code>Lin</code> and observed one
					rename event.
				</p>
				<p>
					Changing state is not recompilation. The page function, stylesheet generation, and JS
					bundling do not repeat for each counter event. In development, editing source code may
					trigger recompilation/hot reload; Vite's development WebSocket is separate from the Reflex
					state socket.
				</p>
			</section>
			<section id="routing">
				<div class="eyebrow">10 / A new URL, the same session</div>
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
				<ol>
					<li>
						The client router handles a normal same-app link. It updates browser history/location
						and selects the route component. Route modules/assets may be fetched if not already
						available.
					</li>
					<li>
						The event-loop navigation effect marks the local root state as not hydrated and queues
						on-load processing with the new router data.
					</li>
					<li>
						The server normalizes the route and updates router state. It selects the registered <code
							>enter_details</code
						> handler, followed by setting is_hydrated true.
					</li>
					<li>
						The server emits router and page/visits deltas. Count and name are unchanged and remain
						available to the Details component. The new page can render before its on-load work
						completes; use hydration/loading state when that matters.
					</li>
				</ol>
				<div class="table-wrap">
					<table>
						<thead
							><tr><th>Action</th><th>Document / connection</th><th>State / on-load</th></tr></thead
						><tbody>
							<tr
								><td>Home → Details link</td><td
									>Client navigation; normally same document and socket.</td
								><td>No ordinary full hydrate. on_load_internal runs; same LabState.</td></tr
							>
							<tr
								><td>Refresh /details</td><td
									>New document and connection; generated defaults are initialized again.</td
								><td
									>Token usually survives in the same tab's sessionStorage. Full hydrate restores
									retained state, then on-load runs again.</td
								></tr
							>
							<tr
								><td>Direct visit /details</td><td
									>Frontend host must serve the route/SPA fallback, then load route JS.</td
								><td>Hydrate first; Details on-load then runs. A new token gets defaults.</td></tr
							>
							<tr
								><td>Back / forward</td><td
									>Normally React Router history navigation within the live app; a full-document
									history restore can involve browser page cache/reconnection.</td
								><td
									>Normal route navigation invokes on-load; count/name remain in the token's state.</td
								></tr
							>
							<tr
								><td>Query change</td><td>Same route can receive different search data.</td><td
									>The navigation effect checks pathname + search. Query data accompanies the event.
									Example: /details?tab=activity.</td
								></tr
							>
							<tr
								><td>Hash-only anchor</td><td>Often scrolls inside the document.</td><td
									>The current effect skips on-load when pathname/search match and the location has
									a hash. Do not assume every URL character change triggers on-load.</td
								></tr
							>
							<tr
								><td>External link</td><td>Leaves the app or opens another tab/document.</td><td
									>No ordinary same-app on-load round trip. The guide link opens a standalone
									document.</td
								></tr
							>
						</tbody>
					</table>
				</div>
				<h3>Query and dynamic-route example (not a third page in this app)</h3>
				<pre><code
						>// /details?tab=activity#top, on a later event:
"router_data": &#123;
  "pathname": "/details",
  "asPath": "/details?tab=activity#top",
  "query": &#123;"tab": "activity"&#125;
&#125;</code
					></pre>
				<p>
					The browser extracts the query string and merges dynamic route parameters. A route such as <code
						>/items/[item_id]</code
					> has a route pattern and a concrete URL; the server uses both to resolve the page and expose
					router information. Browser query values begin as strings, not trusted typed database identifiers.
					Validate and authorize them in server logic. This simple query extraction uses Object.fromEntries,
					so repeated query keys should not be assumed to become lists automatically.
				</p>
				<p>
					Rapid navigation can supersede an unfinished prior on-load chain: this checkout marks <code
						>on_load_internal</code
					>
					with <code>supersedes=True</code>. That helps avoid stale page-load work winning the race.
					It cannot undo external side effects already completed by your handler.
				</p>
			</section>
			<section id="sessions">
				<div class="eyebrow">11 / Where does the data live?</div>
				<h2>Browser copy, session state, and durable records are different</h2>
				<MotionFigure spec={diagrams[5]} {captures} {playback} />

				<div class="grid">
					<div class="card">
						<h3>Browser</h3>
						<ul>
							<li>DOM: visible output and native input state.</li>
							<li>React contexts: a copy of public state fields.</li>
							<li>sessionStorage: this runtime's client token; survives refresh in the tab.</li>
							<li>Optional configured Cookie / LocalStorage / SessionStorage fields.</li>
						</ul>
					</div>
					<div class="card">
						<h3>Server</h3>
						<ul>
							<li>State manager: authoritative Python session state.</li>
							<li>Backend-only variables and event handlers.</li>
							<li>Optional Redis coordination and persistence policies.</li>
							<li>Optional database: durable domain records under your app's control.</li>
						</ul>
					</div>
				</div>
				<p>
					The default configured state-manager mode in this checkout is <strong>disk</strong>.
					Memory and Redis implementations also exist; configuring Redis can select Redis when the
					mode was not explicitly set. Storage lifetime, eviction, expiration, and restarts affect
					whether an existing token finds existing state. Refresh retaining the count in our capture
					demonstrates this run, not an unconditional durability guarantee.
				</p>
				<p>
					Two independent browser sessions generally have separate tokens and counts. Duplicating a
					tab can copy browser sessionStorage, so this implementation also detects duplicate tokens
					and can send <code>new_token</code>. A token identifies a UI session; it is not proof of a
					user's identity or authorization. Shared-state features are explicit exceptions to the
					ordinary per-token model.
				</p>
				<p>
					For fields declared with browser storage, generated code reads configured values and sends <code
						>update_vars_internal</code
					> on initial load/navigation when values exist. The server applies those values, and subsequent
					deltas can update storage. This example intentionally uses ordinary state fields so you can
					see what the session manager alone does. React context itself disappears on a full page reload.
				</p>
				<p>
					Public state is inspectable by the visitor. A field does not become private merely because
					no component displays it. Public snapshots may include fields used elsewhere. Use
					backend-only fields for server-only data, and enforce authorization inside handlers before
					performing protected work.
				</p>
			</section>
			<section id="advanced">
				<div class="eyebrow">12 / Beyond this tiny app</div>
				<h2>Where the other framework pieces fit</h2>
				<p>
					These are extensions of the model, not behaviors all exercised by this app. Follow their
					source/docs when using them; the captured packets above only prove the sample's path.
				</p>
				<div class="table-wrap">
					<table>
						<thead
							><tr><th>Feature</th><th>Where it fits</th><th>What changes in the flow</th></tr
							></thead
						><tbody>
							<tr
								><td>Yield / returned events</td><td>Server event processing</td><td
									>A handler can chain registered server handlers or request frontend actions. A
									yield can flush current state before continuing; several updates can belong to one
									action.</td
								></tr
							>
							<tr
								><td>Background tasks</td><td>Server scheduler</td><td
									>Long-lived work can run outside the ordinary locked foreground handler. Use the
									framework's state modification context, typically async with self, for protected
									writes. A Python async function alone does not make blocking work nonblocking.</td
								></tr
							>
							<tr
								><td>Client-only actions</td><td>Browser event dispatcher</td><td
									>Redirects, scripts, focus, and similar frontend commands can run locally. Not
									every Reflex event must invoke Python. A server handler can request these commands
									too.</td
								></tr
							>
							<tr
								><td>Forms</td><td>DOM → event payload</td><td
									>Submit gathers named input values into a payload. A form can send several fields
									together instead of one input change at a time. Handler validation still matters.</td
								></tr
							>
							<tr
								><td>Uploads</td><td>HTTP endpoint + event processing</td><td
									>Files use multipart HTTP/upload handling rather than squeezing file objects into
									ordinary JSON socket events. The runtime also has REST event paths; don't
									generalize the counter's transport to every API.</td
								></tr
							>
							<tr
								><td>Middleware / error handling</td><td>Around event execution and updates</td><td
									>Can inspect/alter processing or return updates; configured exception handlers
									determine recovery. A failing handler is not evidence its external side effects
									were rolled back.</td
								></tr
							>
							<tr
								><td>rx.Model / database integration</td><td>Python business logic</td><td
									>Query/commit database rows in the server. Copy safe result data into public state
									to show it. Database contents are not automatically sent just because a model
									exists.</td
								></tr
							>
							<tr
								><td>Components / props / style</td><td>Compile + React runtime</td><td
									>Python wrappers declare React components, imports, event triggers, and prop
									serialization. Styles and responsive rules become browser CSS/props. Third-party
									components can have additional internal JS state.</td
								></tr
							>
							<tr
								><td>Custom serializers / custom JS</td><td>Boundary adapters</td><td
									>Translate supported Python data into frontend values or wrap custom browser
									components. Verify both type and runtime representation rather than assuming
									arbitrary Python objects can cross.</td
								></tr
							>
							<tr
								><td>Static / stateless pages</td><td>Compiler + frontend</td><td
									>A fully stateless app can avoid a state socket. It still needs its browser
									assets. The stateful app in this guide does need the Python backend.</td
								></tr
							>
							<tr
								><td>Prerender / SEO / metadata</td><td>Build and document generation</td><td
									>Route metadata and prerender options affect initial HTML and crawlers. They do
									not make a build-time snapshot personalized to a future visitor.</td
								></tr
							>
							<tr
								><td>Deployment / proxies / scaling</td><td>Serving and state infrastructure</td><td
									>Configure frontend/API origins, asset paths, and WebSocket forwarding. Multiple
									backend instances need appropriate state/socket coordination; independent memory
									state is not shared across processes.</td
								></tr
							>
							<tr
								><td>Reconnect / offline</td><td>Browser event loop + socket</td><td
									>The runtime attempts reconnection and rehydration. Do not treat a broken
									connection as an exactly-once delivery guarantee; make important side effects
									retry-safe where your application requires it.</td
								></tr
							>
						</tbody>
					</table>
				</div>
			</section>
			<section id="debug">
				<div class="eyebrow">13 / Verify with your own eyes</div>
				<h2>Turn the browser into your packet viewer</h2>
				<ol>
					<li>
						Run the app, open the browser developer tools, and select <strong>Network</strong>.
						Enable Preserve log, then refresh.
					</li>
					<li>
						Inspect the document request for <code>/</code>. Its Response is actual HTML. Compare
						View Source with the Elements panel: Elements shows the DOM after JavaScript may have
						changed it.
					</li>
					<li>
						Inspect JavaScript/CSS requests. In development, modules and the Vite runtime appear
						separately; production bundles look different.
					</li>
					<li>
						Filter to WebSocket. Select the backend <code>/_event</code> connection, not Vite's hot-reload
						socket. Its URL includes the token query and Engine.IO parameters. In this local example,
						the backend port is 8037.
					</li>
					<li>
						Open Messages/Frames. Find hydrate and on_load_internal; then click Add one. Compare the
						request without a payload to the reply with count and doubled.
					</li>
					<li>
						Change the name to Lin. The request payload contains a string under value. The reply
						contains name and greeting; there is no Python source and no full HTML page.
					</li>
					<li>
						Click Details. Watch pathname/asPath, router deltas, visits, and is_hydrated. Confirm
						the count remains.
					</li>
					<li>
						Refresh on Details. See a new connection and a full snapshot of the retained session.
						Compare this to opening a fresh independent browser context, which starts from defaults.
					</li>
				</ol>
				<div class="callout">
					<strong>Useful breakpoints:</strong> <code>applyEvent</code> before socket.emit;
					<code>EventNamespace.on_event</code>
					after Event creation; <code>LabState.increment</code>; <code>BaseState.get_delta</code>;
					the socket.on("event") callback; and <code>applyDelta</code>.
				</div>
				<h3>Common wrong mental models</h3>
				<ul>
					<li>
						<strong>“Python runs in the browser.”</strong> This compiled app runs JavaScript/React in
						the browser and Python on the server.
					</li>
					<li>
						<strong>“The server sends HTML for every click.”</strong> The counter's handler sends a state
						delta; React handles the DOM.
					</li>
					<li>
						<strong>“The browser sends the new counter.”</strong> The button sends a handler name. Python
						computes the increment from server state.
					</li>
					<li>
						<strong>“All fields are sent every time.”</strong> Hydration sends a full public snapshot;
						normal changes usually send dirty fields plus dependent computed values.
					</li>
					<li>
						<strong>“A route is a new Python state.”</strong> Both pages share the token's LabState.
						Page on-load is a separate event chain.
					</li>
					<li>
						<strong>“Hydration means the user is authenticated.”</strong> It means state synchronization/on-load
						completed; authentication is separate.
					</li>
				</ul>
			</section>
			<section id="sources">
				<div class="eyebrow">14 / Follow the actual implementation</div>
				<h2>A map back to the repository</h2>
				<p>
					Paths are relative to the repository root. Symbol names are more durable than line
					numbers. The guide reflects the checked-out revision at creation; generated names and
					event scheduling may change in future versions.
				</p>
				<ul class="source-list">
					<li>
						<code>examples/flow_lab/flow_lab/flow_lab.py</code> — all sample handlers and pages.
					</li>
					<li>
						<code>reflex/app.py</code> — App.add_page, App._compile, EventNamespace.on_connect / on_event
						/ emit_update / link_token_to_sid.
					</li>
					<li>
						<code>reflex/compiler/compiler.py</code> — compile_app, _compile_page, _compile_contexts.
					</li>
					<li>
						<code>reflex/compiler/utils.py</code> — compile_state, serialization of compiler defaults.
					</li>
					<li>
						<code>packages/reflex-base/src/reflex_base/compiler/templates.py</code> — generated contexts,
						initialEvents, onLoadInternalEvent.
					</li>
					<li>
						<code>packages/reflex-base/src/reflex_base/.templates/web/utils/state.js</code> — getToken,
						ReflexEvent, applyEvent, connect, useEventLoop, applyDelta, client-storage synchronization,
						navigation effect.
					</li>
					<li>
						<code>packages/reflex-base/src/reflex_base/.templates/web/app/entry.client.js</code> — React
						hydrateRoot entry point.
					</li>
					<li>
						<code>packages/reflex-base/src/reflex_base/.templates/web/react-router.config.js</code> —
						default ssr:false.
					</li>
					<li>
						<code>reflex/state.py</code> — BaseState.dict / get_delta, State.hydrate, OnLoadInternalState.on_load_internal,
						StateUpdate and serialize_state_update.
					</li>
					<li>
						<code>packages/reflex-base/src/reflex_base/event/processor/event_processor.py</code> — queueing,
						event futures, emitted updates, superseding chains.
					</li>
					<li>
						<code>packages/reflex-base/src/reflex_base/event/processor/base_state_processor.py</code
						> — state resolution, locking, middleware, handler execution, yielded deltas.
					</li>
					<li>
						<code>reflex/istate/manager/&#123;__init__,memory,disk,redis&#125;.py</code> — session state
						backends.
					</li>
					<li>
						<code>packages/reflex-base/src/reflex_base/config.py</code> — transport and state-manager
						defaults.
					</li>
				</ul>
				<p class="small">
					The legacy HydrateMiddleware implementation also exists in the repository, but this guide
					follows the current registered State.hydrate event and the actual captured runtime.
					Finding a file named “hydrate” is not enough to establish which code path the app uses.
				</p>
			</section>
		</main>
		<footer>
			<p><a href="/blog">← All articles</a></p>
			Built to read slowly, inspect directly, and compare against real code. Start with the sample app;
			then follow one request all the way around.
		</footer>
	</div>
</div>
