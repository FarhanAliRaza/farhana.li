---
title: 'claude-context-local: Local Code Search MCP for Coding Agents'
slug: 'claude-context-local'
description: 'An MCP server that turns an entire codebase into searchable context for Claude Code and other coding agents. Embeddings are built and stored locally, with Merkle-tree change detection so re-indexing only touches files that changed. No API cost.'
date: '2025-09-06'
tags: ['Python', 'MCP', 'Claude Code', 'Embeddings', 'Code Search', 'AI Agents', 'Open Source']
published: true
github: 'https://github.com/FarhanAliRaza/claude-context-local'
---

Coding agents work best when they can find the right file quickly. claude-context-local indexes a repository into local embeddings and exposes semantic search over it through the Model Context Protocol, so an agent can ask for "the code that handles retry logic" instead of grepping by guesswork.

- Runs entirely on your machine. Embeddings are generated and stored locally, so there is no per-query API cost and no code leaves the box.
- Uses a Merkle tree over the file tree to detect changes, so incremental re-indexing is fast.
- Works with Claude Code out of the box and with any MCP-capable agent.

It is my most-starred standalone repository with more than 230 stars.
