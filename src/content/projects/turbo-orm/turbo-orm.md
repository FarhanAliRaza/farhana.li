---
title: 'turbo-orm: True Async ORM for Django'
slug: 'turbo-orm'
description: 'An experimental async ORM layer for Django with genuine async database I/O. Uses psycopg3 async cursors and connection pooling while reusing the Django Query object for SQL generation, so the chainable queryset API stays familiar.'
date: '2026-01-12'
tags: ['Python', 'Django', 'Async', 'PostgreSQL', 'psycopg3', 'ORM', 'Open Source']
published: true
github: 'https://github.com/FarhanAliRaza/turbo-orm'
---

The async ORM methods in Django still run queries in a thread. turbo-orm does the I/O asynchronously with psycopg3 async cursors and a `psycopg_pool` connection pool, while leaning on the Django Query object so SQL generation is identical to the regular ORM.

```python
class User(models.Model):
    username = models.CharField(max_length=150)
    objects = AsyncManager()

users = await User.objects.filter(is_active=True).order_by("-id")[:10].alist()
user = await User.objects.aget(id=1)
```

Built on top of `django-async-backend`. The API is still moving, so treat it as experimental.
