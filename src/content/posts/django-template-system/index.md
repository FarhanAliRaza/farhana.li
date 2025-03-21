---
title: 'How django template system works'
slug: 'djang-template-system'
description: 'How django template system works'
date: '2024-02-08'
tags: ['svelte5', 'vibeocding', 'personal', 'prompt engineering']
published: false
---

I was workign on a [django ticket](https://code.djangoproject.com/ticket/28050) then started to analyze how django tempalte system works.

It works like how a simple compiler would work. I implemented a compiler before for a programming language i implmented [Urdu Programming language](https://github.com/FarhanAliRaza/URDU-PROGRAMMING-LANGUAGE). So i found the working to be quite similar to that.

Django template system is really big and have alot of features but i will focus on basics that i interacted with.

A template string or form a file

template string -> Lexer.tokenize() -> Tokens for example TokenType.TEXT, VAR, BLOCK

lists of tokens -> Parser Class -> Parser.parse() -> Compiled template [List of Node Objects]

Node - VariableNode - variable renderign

IfNode, ForNode plugins can define their own nodes

Node.render(context) -> string of rendered node

Usage
Template class
TemplateSyntaxError if template is not right

> > > c = template.Context({'test':True, 'varvalue': 'Hello'})
> > > t.render(c)
> > > '<html><h1>Hello</h1></html>'
> > > c = template.Context({'test':False, 'varvalue': 'Hello'})
> > > t.render(c)
> > > '<html></html>'
> > > """
