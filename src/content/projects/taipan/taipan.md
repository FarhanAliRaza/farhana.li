---
title: 'taipan: Run Python Anywhere in a Single Binary'
slug: 'taipan'
description: 'A single self-contained executable with CPython 3.14 embedded, written in Zig. Runs Python files and PEP 723 scripts with inline dependencies on machines with no Python installed, with roughly 10ms warm starts, and compiles scripts into standalone executables.'
date: '2026-07-13'
tags: ['Zig', 'Python', 'CPython', 'CLI', 'PEP 723', 'Tooling', 'Open Source']
published: true
github: 'https://github.com/FarhanAliRaza/taipan'
---

taipan is a ~31 MB executable with a full CPython interpreter inside. Drop it on a machine with nothing installed and `taipan script.py` just works, including scripts that declare dependencies inline with PEP 723.

- **No Python required.** The interpreter ships in the binary.
- **Inline dependencies.** PEP 723 blocks are installed with `uv` and cached, one install per dependency set.
- **~10 ms warm starts**, about 3x faster than `uv run`.
- **Standalone executables.** `taipan build` bundles a script, or a whole package and its console script, into one file that runs offline.
- Linux, macOS, and Windows.

`sys.argv`, `__file__`, exit codes, tracebacks, threads, and every `multiprocessing` start method behave exactly as they would under a regular CPython.
