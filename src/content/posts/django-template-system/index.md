---
title: 'How django template system works'
slug: 'djang-template-system'
description: 'How django template system works'
date: '2024-02-08'
tags: ['svelte5', 'vibeocding', 'personal', 'prompt engineering']
published: false
---

I was working on a [Django ticket](https://code.djangoproject.com/ticket/28050) and started to analyze how the Django template system works.

It works like a simple compiler. I had built a compiler before for a programming language I implemented, the [Urdu Programming Language](https://github.com/FarhanAliRaza/URDU-PROGRAMMING-LANGUAGE), so the design felt quite familiar.

The Django template system is really big and has a lot of features, but I will focus on the basics I interacted with.

A template string, or one loaded from a file:

template string -> Lexer.tokenize() -> Tokens for example TokenType.TEXT, VAR, BLOCK

lists of tokens -> Parser Class -> Parser.parse() -> Compiled template [List of Node Objects]

Node - VariableNode - variable rendering

IfNode, ForNode plugins can define their own nodes

Node.render(context) -> string of rendered node

Usage
Template class
TemplateSyntaxError if template is not right
```
> > > c = template.Context({'test':True, 'varvalue': 'Hello'})
> > > t.render(c)
> > > '<html><h1>Hello</h1></html>'
> > > c = template.Context({'test':False, 'varvalue': 'Hello'})
> > > t.render(c)
> > > '<html></html>'
> > > """
```