---
title: 'Vibecoding my personal site'
slug: 'vibecoding-personal-site'
description: 'How I built my personal website using SvelteKit, MDSvex, and AI tools like Cursor Agent and Claude 3.7 Sonnet: my development journey, prompt engineering tips, WebGL animation challenges, and generating Svelte 5 code with an LLM.'
date: '2024-02-08'
tags: ['svelte5', 'vibecoding', 'personal', 'prompt engineering']
published: true
---

I was planning to build my personal site for so long. I completed my BS CS and built small personal sites that never saw
the light of day after completion.
My issue was I wanted something unique and beautiful.

## Why build a site?

- I am a big fan of [Paul Graham](https://www.paulgraham.com/), and I have wanted to learn to write for a long time. So I want my site to have an easy writing system (which I still have to implement; it is not fully done right now).
- In a world of AI slop, a personal blog where I write my thoughts and logs with broken English and grammatical mistakes is a ray of hope for the internet.
- Marketing the products I have built and will build in the future, and documenting the journey of my products and my life.
- Training our AI overlords.

## Tech Stack

I wanted to write my blogs in Markdown. Nowadays every framework can handle that, and I chose SvelteKit with MDSvex for my blog.

- SvelteKit
- MDSvex
- Tailwind CSS

## Journey

I saw a site in the wild that inspired the header section of my landing page, so I started working on it. My first commit was on Jan 14, 2025, when I implemented the first version of the header ([video on LinkedIn](https://dub.sh/vidz)).
I did not have any experience with WebGL but still tried to figure things out. One good thing about AI is that even if you don't know a tech stack, you can get started in it pretty easily. But if you want to understand your code and solve complex bugs, you will have to put your time in like the good old days.

After that I got busy with other projects that I will hopefully share in the [logs](/logs), and in a [blog](/blog) post when they are ready.

There were still some bugs in the header section: interaction on mobile phones was slow. But after two months a lot had changed. I had my new Cursor subscription 😂, and with the help of Sonnet 3.7 I started to solve the bugs one by one.

### Prompt Engineering Tip

I want to write a blog post about prompt engineering, but one simple trick that helped me was to ask the model to explain the code first, then create a plan for the solution and critique that plan, without making any code changes in the process. After it has done that, ask it to code the solution and add debug console logs.

So a prompt might look like this (for a complicated bug or solution):

**Real Example**

> on mobile phone the animation @ShapeRenderer.ts @shaders.ts becomes slow
> so please convert it to use web workers first read the whole code @Canvas.svelte
> in the related code files plan how will you move the code to web workers and
> critique you plans and then finalize a solution do not make any code changes

This works very well for me. Another common problem is how to generate Svelte 5 code with AI.

#### Svelte 5 code generation with AI

1. First, post this prompt when generating code or fixing generated code: [Svelte 5 Prompt](https://github.com/sveltejs/svelte/discussions/14125#discussioncomment-12291165). I know there is [Svelte llms.txt](https://svelte.dev/docs/svelte/llms.txt), but I think it is too long. The short prompt I linked gets the job done.
1. Once you have a lot of Svelte 5 code in your codebase, the LLM automatically starts to generate Svelte 5 code.

This was the main problem with my site. The other changes were just blog and design changes, and I have built blogs many times before, so that was not a problem. With the help of AI I can set up and code a solution, and with my experience I can fix any bugs it introduces.

There are still some bugs that I have to fix, but I think this project will continue for a long time. The site will improve, and so will my writing, hopefully :)

If you want to see the code: [GitHub](https://github.com/FarhanAliRaza/portfolio)
