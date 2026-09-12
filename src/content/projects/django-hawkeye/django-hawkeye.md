---
title: 'django-hawkeye: BM25 Full-Text Search for Django on PostgreSQL'
slug: 'django-hawkeye'
description: 'A lightweight Elasticsearch alternative for Django. Adds BM25-ranked full-text search using the PostgreSQL pg_textsearch extension, with a one-mixin API and no external services to run. Works as a retrieval layer for RAG.'
date: '2025-12-19'
tags: ['Python', 'Django', 'PostgreSQL', 'BM25', 'Search', 'RAG', 'Open Source']
published: true
github: 'https://github.com/FarhanAliRaza/django-hawkeye'
---

Most Django projects that need "good enough" search end up running Elasticsearch for it. django-hawkeye gives you BM25 relevance ranking, the same algorithm Elasticsearch uses, directly inside PostgreSQL 17 through the `pg_textsearch` extension.

```python
class Article(BM25Searchable, models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()

    class Meta:
        indexes = [BM25Index(fields=["content"], name="article_bm25_idx")]

Article.search("query")
```

The extension is enabled through a normal Django migration, so there is nothing extra to deploy. It also makes a solid retrieval layer for Retrieval Augmented Generation without adding a vector database.
