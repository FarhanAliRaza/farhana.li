---
title: 'Django Playground: Full-Stack Django in the Browser via WebAssembly'
slug: 'django-repl'
description: 'A browser-based Django IDE that runs Python entirely in WebAssembly using Pyodide. Features a worker pool architecture for instant code execution, IndexedDB snapshot caching for fast startup, virtual filesystem with SQLite, and full Django WSGI simulation - all without any backend server.'
date: '2025-11-01'
tags:
  [
    'Django',
    'WebAssembly',
    'Pyodide',
    'SvelteKit',
    'Svelte 5',
    'TypeScript',
    'Web Workers',
    'IndexedDB',
    'CodeMirror',
    'Browser IDE'
  ]
published: true
demo: 'https://django.farhana.li/'
---

## TL;DR

Django Playground is an experimental browser-based IDE that lets you write, edit, and run full Django applications entirely in the browser. No backend server required - Python runs via WebAssembly (Pyodide), Django executes through a simulated WSGI handler, and SQLite persists in a virtual filesystem. The system uses a worker pool architecture to eliminate Python module cache pollution between code changes.

**Key Innovation**: Worker pool with snapshot caching - pre-warmed Web Workers restore from IndexedDB snapshots in ~2 seconds vs ~10 seconds for fresh Django installation.

## Tech Stack

### Frontend

- **Framework**: SvelteKit 2 with Svelte 5 (runes for reactive state)
- **Code Editor**: CodeMirror 6 with Python syntax highlighting
- **UI Components**: Custom components + shadcn
- **Styling**: Tailwind CSS v4
- **Type Safety**: TypeScript 5.9
- **Testing**: Vitest (unit) + Playwright (E2E)

### Python Runtime

- **WebAssembly Runtime**: Pyodide 0.29.0 (Python 3.13)
- **Package Manager**: Micropip (installs Django in browser)
- **Database**: SQLite3 (in-memory virtual filesystem)
- **Web Framework**: Django (full WSGI execution)

### Browser APIs

- **Execution**: Web Workers (isolated Python execution)
- **Caching**: IndexedDB (Pyodide + Django snapshot storage)
- **Communication**: postMessage (worker to main thread)
- **Rendering**: Sandboxed iframe (Django HTML output)

## Project Overview

### The Problem

Learning Django typically requires setting up a local development environment - installing Python, pip, virtualenv, Django, and configuring a database. This creates friction for beginners and makes it impossible to quickly experiment with Django concepts without access to a development machine.

Existing solutions fall short:

- **Online IDEs**: Require backend servers, have latency, and cost money to run
- **Docker-based solutions**: Still require local installation and resources
- **Tutorial sandboxes**: Limited functionality, can't run full Django apps
- **Repl.it / CodeSandbox**: Server-side execution with cold start delays

### The Solution

Django Playground runs everything client-side:

- **Zero Setup**: Open a URL and start coding Django immediately
- **Full Django**: Not a subset - actual Django with ORM, migrations, templates, admin
- **Instant Execution**: Worker pool eliminates cold starts after initial load
- **Offline Capable**: Once loaded, works without internet connection
- **Shareable**: Encode entire projects in URL for instant sharing

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              SvelteKit Application                          │ │
│  │                                                             │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐   │ │
│  │  │  FileTree   │  │   Editor    │  │     Output       │   │ │
│  │  │             │  │ (CodeMirror)│  │ (iframe sandbox) │   │ │
│  │  └─────────────┘  └─────────────┘  └──────────────────┘   │ │
│  │         │                │                   │             │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │           Svelte 5 Stores (Runes)                    │ │ │
│  │  │  WorkspaceState │ ExecutionState │ PathState         │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────┬───────────────────────────────┘ │
│                                │                                  │
│                     ┌──────────▼───────────┐                     │
│                     │    Worker Pool       │                     │
│                     │   (3 Web Workers)    │                     │
│                     └──────────┬───────────┘                     │
│                                │                                  │
│    ┌───────────────────────────┼───────────────────────────┐    │
│    │                           │                           │    │
│    ▼                           ▼                           ▼    │
│ ┌──────────┐            ┌──────────┐            ┌──────────┐   │
│ │ Worker 0 │            │ Worker 1 │            │ Worker 2 │   │
│ │ (Active) │            │ (Ready)  │            │ (Warming)│   │
│ └────┬─────┘            └──────────┘            └──────────┘   │
│      │                                                          │
│      ▼                                                          │
│ ┌─────────────────────────────────────────────────────────┐    │
│ │              Pyodide (Python 3.13 + WASM)               │    │
│ │                                                         │    │
│ │  ┌─────────────────────────────────────────────────┐   │    │
│ │  │                    Django                        │   │    │
│ │  │                                                  │   │    │
│ │  │  ┌────────────────────────────────────────────┐ │   │    │
│ │  │  │         Virtual Filesystem                 │ │   │    │
│ │  │  │  /myproject/settings.py                    │ │   │    │
│ │  │  │  /myapp/views.py, models.py, urls.py       │ │   │    │
│ │  │  │  /templates/*.html                         │ │   │    │
│ │  │  │  /db.sqlite3 (in-memory)                   │ │   │    │
│ │  │  └────────────────────────────────────────────┘ │   │    │
│ │  │                                                  │   │    │
│ │  │  ┌────────────────────────────────────────────┐ │   │    │
│ │  │  │    WSGI Handler (StaticFilesHandler)       │ │   │    │
│ │  │  │    Simulates HTTP request/response         │ │   │    │
│ │  │  └────────────────────────────────────────────┘ │   │    │
│ │  └─────────────────────────────────────────────────┘   │    │
│ └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│ ┌─────────────────────────────────────────────────────────┐    │
│ │           IndexedDB (Snapshot Cache)                    │    │
│ │  Compressed tar.gz of Pyodide + Django site-packages    │    │
│ └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Core Features

### 1. Live Code Editor with File Management

The editor integrates CodeMirror 6 with Python syntax highlighting and a hierarchical file tree. Users can create, rename, and delete files just like a real IDE. Changes are debounced (300ms) to prevent excessive re-renders while typing.

The workspace state tracks all files in memory, organized by path. The file tree component renders directories first, then files, with inline editing for new file creation.

### 2. Full Django Execution via WSGI Simulation

When you click "Run", the system doesn't just execute Python - it simulates a complete HTTP request/response cycle through Django's WSGI interface:

```python
environ = {
    'REQUEST_METHOD': 'GET',
    'PATH_INFO': '/about/',
    'QUERY_STRING': 'foo=bar',
    'SERVER_NAME': 'localhost',
    'wsgi.input': BytesIO(body_bytes),
    'HTTP_COOKIE': 'sessionid=xyz',
}
handler = StaticFilesHandler(WSGIHandler())
response = handler(environ, start_response)
```

This means Django's full middleware stack, URL routing, view execution, and template rendering all work exactly as they would on a real server.

### 3. Worker Pool Architecture

The most interesting engineering decision: instead of reusing a single Web Worker, the system maintains a pool of 3 pre-warmed workers and swaps to fresh ones on each code change.

**Why?** Python's module system caches imports. When you modify `views.py` and re-run, Python might still use the cached version. Traditional solutions like `importlib.reload()` are unreliable with Django's interconnected modules.

**The solution:**

1. First worker initializes Pyodide + Django, creates IndexedDB snapshot
2. Background workers restore from snapshot (fast)
3. On code change: swap to fresh "ready" worker
4. Transfer database state via postMessage
5. Terminate old worker, spawn replacement in background

Worker states: `warming` → `ready` → `busy` → `transferring`

### 4. IndexedDB Snapshot Caching

Installing Django via micropip takes ~10 seconds on first load. The snapshot system caches the initialized state:

1. After first worker installs Django, compress `site-packages` to tar.gz
2. Store compressed archive + metadata in IndexedDB
3. Subsequent workers restore from cache (~2 seconds)
4. Cache key based on Pyodide + Django versions

This provides near-instant startup after the first visit while automatically invalidating when versions change.

### 5. Database Persistence Across Worker Swaps

SQLite database lives at `/db.sqlite3` in Pyodide's virtual filesystem. When swapping workers:

1. Old worker: read database file as `Uint8Array`
2. Transfer binary via `postMessage` (structured clone)
3. New worker: write `Uint8Array` back to filesystem

This preserves all ORM data, user accounts, and migrations across code changes.

### 6. Session Cookies in localStorage

Django sessions require cookies, but Web Workers can't access document.cookie. The solution:

1. Intercept `Set-Cookie` headers from Django responses
2. Store cookies in localStorage via custom `CookieStorage` class
3. Inject cookies into WSGI environ for subsequent requests

This enables Django's session middleware, authentication, and CSRF protection to work correctly.

### 7. Static File Inlining

The iframe sandbox blocks external file requests for security. Static files (CSS/JS) are inlined:

1. Parse HTML for `<link href="/static/*">` and `<script src="/static/*">`
2. Fetch each file through Django's StaticFilesHandler
3. Replace `<link>` with `<style>` content and `<script src>` with inline scripts
4. All processing happens in a single batch Python call

### 8. URL-Based Project Sharing

Entire projects can be encoded into shareable URLs:

1. Serialize all files to JSON
2. Compress using browser's CompressionStream API
3. Base64 encode and append to URL hash
4. Recipients load URL and project auto-restores

Security consideration: Fresh projects auto-run, but shared projects require manual "Run" click to prevent malicious code execution.

## Project Structure

```
src/
├── routes/
│   ├── +page.svelte              # Main playground UI
│   └── +layout.svelte            # App layout
│
├── lib/
│   ├── components/
│   │   ├── Editor.svelte         # CodeMirror integration
│   │   ├── FileTree.svelte       # File explorer
│   │   ├── Output.svelte         # Preview iframe + console
│   │   ├── Console.svelte        # Logs and action buttons
│   │   ├── AddressBar.svelte     # Django URL navigation
│   │   └── ui/                   # shadcn-style components
│   │
│   ├── stores/
│   │   ├── workspace.svelte.ts   # File state management
│   │   ├── execution.svelte.ts   # Run state, logs, cookies
│   │   └── path-state.svelte.ts  # Current Django URL
│   │
│   ├── workers/
│   │   ├── python-executor.ts    # Main worker entry point
│   │   ├── pyodide-manager.ts    # Pyodide init + Django install
│   │   ├── filesystem.ts         # Virtual FS operations
│   │   ├── snapshot-manager.ts   # IndexedDB caching
│   │   ├── django/
│   │   │   ├── executor.ts       # WSGI request handling
│   │   │   └── management.ts     # migrate, makemigrations
│   │   └── handlers/
│   │       └── message-handlers.ts
│   │
│   ├── worker-pool.ts            # Pool management logic
│   └── types/index.ts            # TypeScript interfaces
```

## Key Technical Challenges & Solutions

### Challenge 1: Python Module Cache Pollution

**Problem**: After modifying a Python file and re-running, the old code still executes because Python caches imported modules in `sys.modules`.

**Solution**: Worker swap architecture. Instead of trying to invalidate Python's module cache (which is fragile with Django's interconnected imports), swap to an entirely fresh worker with clean state. The worker pool ensures a ready worker is always available.

### Challenge 2: Slow Initial Load Time

**Problem**: Installing Django via micropip requires downloading and extracting ~10MB of packages, taking 8-12 seconds.

**Solution**: IndexedDB snapshot caching. After first installation, compress the entire `site-packages` directory to tar.gz and store in IndexedDB. Subsequent loads restore from cache in ~2 seconds. Version-aware cache keys ensure automatic invalidation.

### Challenge 3: Form Submissions and Navigation

**Problem**: Clicking links or submitting forms in the iframe would try to navigate, breaking the sandbox.

**Solution**: Iframe uses srcdoc with injected JavaScript that:

- Intercepts all `<a>` clicks and `<form>` submissions
- Sends path/method/data back to parent via postMessage
- Parent re-executes Django with new request parameters

### Challenge 4: Database State Loss on Worker Swap

**Problem**: Swapping to fresh workers would lose all database data (users, migrations, ORM objects).

**Solution**: Database transfer protocol:

1. Before swap: read `/db.sqlite3` as Uint8Array from old worker
2. Transfer via postMessage (uses structured cloning for efficiency)
3. After swap: write Uint8Array to new worker's filesystem
4. Django reconnects to existing database seamlessly

### Challenge 5: Static Files in Sandboxed Iframe

**Problem**: Iframe with srcdoc can't make requests to load CSS/JS files.

**Solution**: Static file inlining processor that:

1. Parses response HTML for static file references
2. Fetches each file through Django's StaticFilesHandler
3. Inlines CSS into `<style>` tags, JS into `<script>` tags
4. Returns self-contained HTML

## Performance Optimizations

### Worker Pool

- **3 concurrent workers**: One active, others warming in background
- **Speculative warming**: Start preparing next worker immediately after swap
- **State machine**: Clear transitions between warming/ready/busy/transferring

### Snapshot Caching

- **Compressed storage**: tar.gz reduces IndexedDB usage by ~70%
- **Lazy restoration**: Only restore site-packages, not full Pyodide state
- **Version-aware keys**: Automatic invalidation on Pyodide/Django updates

### UI Responsiveness

- **Debounced saves**: 300ms debounce on editor changes
- **Svelte 5 runes**: Fine-grained reactivity without store boilerplate
- **Derived state**: File tree computed from flat file map

### Memory Management

- **Worker termination**: Old workers fully terminated after swap
- **No memory leaks**: Clean message handler cleanup
- **Efficient transfers**: Uint8Array for binary data (no serialization overhead)

## Svelte 5 Patterns

The codebase uses Svelte 5's new runes API for state management:

```typescript
class WorkspaceState {
	files = $state<Record<string, string>>({ ...defaultFiles });
	currentFile = $state<string>('myapp/views.py');

	// Computed property - automatically updates when files change
	fileTree = $derived.by(() => {
		return buildTreeFromFiles(this.files);
	});

	updateFile(path: string, content: string) {
		this.files[path] = content;
	}
}

export const workspaceState = new WorkspaceState();
```

This pattern provides:

- Class-based encapsulation for related state
- `$state` for reactive primitives
- `$derived.by` for computed values
- No boilerplate stores or subscriptions

## Data Flow: Running Django Code

```
User edits myapp/views.py
        │
        ▼
Editor.svelte detects change (debounced 300ms)
        │
        ▼
workspaceState.updateFile('myapp/views.py', newContent)
        │
        ▼
User clicks "Run" button
        │
        ▼
+page.svelte calls workerPool.execute(files, path)
        │
        ▼
WorkerPool selects ready worker, marks as busy
        │
        ▼
postMessage({type: 'execute', files, path})
        │
        ▼
Web Worker receives message
        │
        ▼
writeFilesToVirtualFS(files)  // Write all Python files
        │
        ▼
executeDjangoView(path)
        │
        ▼
Python executes in Pyodide:
  - django.setup() with settings
  - Create WSGI environ dict
  - StaticFilesHandler(WSGIHandler())(environ, start_response)
  - Capture HTML output
        │
        ▼
postMessage({type: 'result', html, status, cookies})
        │
        ▼
Main thread receives result
        │
        ▼
executionState.setResult(html, cookies, logs)
        │
        ▼
Output.svelte reactively updates
        │
        ▼
iframe.srcdoc = processedHtml (with inlined static files)
        │
        ▼
User sees rendered Django page
```

## Lessons Learned

### Worker Swapping > Module Reloading

Initially tried `importlib.reload()` and various cache-clearing approaches. All failed with Django's complex module dependencies. Worker swapping is more resource-intensive but 100% reliable.

### IndexedDB for Large Binary Data

localStorage has a 5MB limit. IndexedDB handles the ~15MB compressed snapshots without issues and provides async access that doesn't block the main thread.

### Svelte 5 Runes Simplify State

The class-based state pattern with `$state` and `$derived` eliminated most of the boilerplate from Svelte 4 stores while providing better TypeScript integration.

### WSGI Simulation is Surprisingly Complete

Django's WSGI interface is well-documented and the environ dict is straightforward to construct. Most Django features "just work" once the WSGI layer is properly simulated.

### Iframe Sandboxing Requires Careful Design

Security restrictions on sandboxed iframes required creative solutions for static files, navigation, and form submissions. The postMessage bridge pattern handles all these cases cleanly.

## Limitations

- **Complex ORM queries**: Some edge cases with advanced QuerySet operations
- **File uploads**: Not yet implemented (would require FileReader API bridge)
- **External packages**: Only pure-Python packages work (no C extensions)
- **Memory constraints**: Large databases may hit browser memory limits
- **No real networking**: Can't make HTTP requests from Django code

## Conclusion

Django Playground demonstrates that modern browser APIs (WebAssembly, Web Workers, IndexedDB) are powerful enough to run full web frameworks entirely client-side. The worker pool architecture solves Python's module caching problem elegantly, while snapshot caching provides fast subsequent loads.

The project serves as both a learning tool for Django beginners and a proof-of-concept for browser-based development environments. All the complexity of Python, Django, and SQLite runs in your browser tab with zero server infrastructure.
