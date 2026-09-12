---
title: 'django-bolt: The Fastest Python Web Framework, Built on Django'
slug: 'django-bolt'
description: 'A Rust-powered API framework for Django. An Actix Web HTTP server bridged to Python handlers with PyO3 and serialized with msgspec, hitting 300K+ requests per second while keeping the Django ORM, Admin, auth, and every third-party app working unchanged. 1,600+ GitHub stars and 100K+ downloads.'
date: '2025-09-20'
tags:
  [
    'Rust',
    'Python',
    'Django',
    'Actix Web',
    'Tokio',
    'PyO3',
    'msgspec',
    'Open Source',
    'Performance'
  ]
published: true
order: 1
github: 'https://github.com/dj-bolt/django-bolt'
demo: 'https://bolt.farhana.li/'
---

## TL;DR

django-bolt is a fully typed API framework for Django with a Rust engine underneath. HTTP parsing, routing, auth, guards, CORS, rate limiting, and compression run in Rust without touching the GIL. Your handlers stay plain Python and everything you already use in Django keeps working: models, `settings.py`, `INSTALLED_APPS`, Django Admin, middleware, signals, and third-party packages.

No gunicorn or uvicorn required. It runs from `python manage.py runbolt`.

```python
from django_bolt import BoltAPI

api = BoltAPI()

@api.get("/hello/{name}")
async def hello(name: str):
    return {"message": f"Hello, {name}!"}
```

## Why I built it

Django is the framework I reach for on every project, but the moment an API needs real throughput the conversation turns to rewriting in something else. I wanted to remove that trade-off. The goal was Django REST Framework or Django Ninja ergonomics with a server fast enough that the framework is never the bottleneck.

## Numbers

- **300K+ requests per second** on a single 12-core desktop (8 processes, 100 concurrent connections, loopback).
- Ahead of FastAPI and Robyn on JSON payloads, and ahead of Bun-based JavaScript frameworks such as Elysia and Hono in the same benchmark.
- 2.8x faster than FastAPI and 12x faster than Django Ninja on JSON endpoints in the [public benchmark suite](https://github.com/FarhanAliRaza/fastapi-vs-litestar-vs-django-bolt-vs-django-ninja-benchmarks).

## How it works

- **Rust HTTP layer.** Requests are accepted by [Actix Web](https://actix.rs/) on a [Tokio](https://tokio.rs/) runtime. Routing, header parsing, and middleware-style concerns like CORS and rate limiting run entirely in Rust.
- **PyO3 bridge.** Matched routes hand off to Python handlers through [PyO3](https://pyo3.rs/). Getting past the 40K RPS ceiling meant solving the Python-Rust copy bottleneck: the bridge passes pointers instead of copying request data across the boundary.
- **msgspec serialization.** Type hints on handlers drive extraction and validation for path, query, header, cookie, form, and body parameters. Responses are serialized with [msgspec](https://jcristharif.com/msgspec/), which is a large part of the win over DRF serializers.
- **100% Django.** There is no parallel ORM or settings system. You can migrate one endpoint at a time from DRF and leave the rest of the project untouched.

## Adoption

The project has more than 1,600 stars on GitHub and over 100,000 downloads. It has its own documentation site, a Discord community, and a video tutorial, and I maintain it as the primary open source project I work on.
