---
title: 'Vibecoding my personal site '
slug: 'vibecoding-personal-site'
description: 'Discover how I built my personal website using Sveltekit, MDSvex, and AI tools like Cursor Agent and Claude 3.7 Sonnet. Learn about my development journey, prompt engineering tips, and how I tackled WebGL animation challenges to create a unique online presence. Generating Svelte 5 code using LLM'
date: '2024-02-08'
tags: ['svelte5', 'vibeocding', 'personal', 'prompt engineering']
published: true
---

I was planning to build my personal site for so long. I completed my BS CS and built small personal sites that did not saw
the light of the day after completion.
My issue was i wanted something unique and beautiful.

## Why build a site?

- I am a big fan [Paul Graham](https://www.paulgraham.com/) so i wanted to learn to write for a long time now. So i want my site to have easier writting system (that i have to implement. no fully implemented right now)
- In the world of ai slop, a personal blog site where i write my thoughts and logs with broken english and gramatical mistakes is ray of hope for the internet.
- Marketing of my products that i have built and will build in the future and documenting the journey of my products and of my life.
- Train our ai overlords

## Tech Stack

I wanted to write my blogs in markdown format. Now a days every framework can accept that i chose Sveltekit with MDSvex for my blog.

- Sveltekit
- MDSvex
- Tailwind CSS

## Journey

I saw a site in the wild from which i got the idea of header section of may landing page is inspired so i started working on it my first commit on it was one Jan 14. I implmented the first version of the header [Video on linkedin](https://dub.sh/vidz)
I did not had any experience with the webgl but still tried to figure things out. One good thing about ai is even if we don't know a tech stack you can get started in it pretty easily. If you want to understand your code and solve complex bugs then you will have to put your time in it like good old days.

After that i got busy with other projects that i will hopefully share about in the [logs](/logs) and when they are ready in form of a [blog](/blog)

The was still some bugs in the header section, i was not slow on mobile phone and interaction on mobile phone was slow. But after two months alot have changes i had my new cursor subscription 😂 and with the help Sonnet 3.7, i started to solve bugs one by one .

### Prompt Engineering Tip

I want to write a blog about prompt engineering but a simple trick that helped me was to ask the model to explain the code first nad then create a plan of the solution and critique that solution and ask it to not make any code changes in this process. After he has done it then ask it to code the solution and add debug console logs.

So a prompt might look like this (for a complicated bug or solution)

**Real Example**

> on mobile phone the animation @ShapeRenderer.ts @shaders.ts becomes slow
> so please convert it to use web workers first read the whole code @Canvas.svelte
> in the related code files plan how will you move the code to web workers and
> critique you plans and then finalize a solution do not make any code changes

This works very well for me. Another problem that is common is how to generate svelte 5 code with ai.

#### Svelte 5 code generation with ai

1. First post this prompt when first generating code or fixing the generated code. [Svelte 5 Prompt](https://github.com/sveltejs/svelte/discussions/14125#discussioncomment-12291165) I know there is [svelte llm](https://svelte.dev/docs/svelte/llms.txt) but it is too long i think. The short prompt that i provided can get the job done
1. Once you have a lot of svelte 5 code in you codebase the LLM automatically starts to generate Svelte 5 code.

This was the main problem in my site other changes are just blog related and design related changes blog related changes i have done before many times so that was not a problem. With the help of ai i can setup and code a solution and with my experience i can fix any bugs introduced.

There are still some bugs that i have to fix . But this project will continue for a long time i think. Site will imrpve and so will my writting hopefully :)

If you want to see the code [Github](https://github.com/FarhanAliRaza/portfolio)
