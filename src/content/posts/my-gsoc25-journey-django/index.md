---
title: 'My GSoC 2025 Journey: Bringing Template Partials to Django Core'
slug: 'my-gsoc25-journey-django'
description: 'How I spent my Google Summer of Code 2025 bringing django-template-partials into Django core, featuring architecture mysteries, regex nightmares, and the elegant solution that was hiding in plain sight all along.'
date: '2025-09-11'
tags:
  [
    'gsoc',
    'gsoc-2025',
    'django',
    'open-source',
    'django-template-partials',
    'django-6.0',
    'django-template-system'
  ]
published: true
---

**Organization:** [Django Software Foundation](https://www.djangoproject.com/)  
**Project:** [Django Templates - Bring django-template-partials into core](https://summerofcode.withgoogle.com/programs/2025/projects/YqdTk30V)

## TLDR

My GSoC project brought the popular django-template-partials package directly into Django core. We added new template tags to define and render partials, plus support for loading specific fragments using a template#fragment syntax. The template loading system was extended to make everything work seamlessly across includes and other loading functions.

**The PRs that made it happen:**

- [#19643: Add partial support to Django](https://github.com/django/django/pull/19643)
- [#19750: Fix interaction issues with comment and verbatim tags](https://github.com/django/django/pull/19750)
- [Refactored loader and partials handling to support Django 5.1+ extra_data](https://github.com/carltongibson/django-template-partials/pull/72)

And a few other small PRs.

## Community Bonding Period

I was already part of the Django gang through [Djangonaut Space](https://djangonaut.space/) 🚀. So, I dove straight into the code like a kid in a candy store.

Weekly meetings with my absolutely amazing mentor Carlton Gibson ([noumenal.es](https://noumenal.es/)) kept me on track.

## The Coding Journey (The Fun Part 🤓)

### Act 1: The Naive Beginning

Oh, sweet summer child that I was! 😇 I thought I had it all figured out. After studying Django's template system and the `django-template-partials` package, I was like: "Easy peasy! Just move the partials storage from `template.origin` to the `Template.extra_data`! copy pasta and 💥 Done... "

My [first PR](https://github.com/carltongibson/django-template-partials/pull/72) was basically:

```python
  # Old way (stored on the Origin object)
  partial_contents = template.origin.partial_contents
  # New way
  extra_data = getattr(template, "extra_data")
  partial_contents = extra_data.get("partials", {})

```

Narrator: _It was not, in fact, that simple._ 🤦

### Act 2: Reality Hits Like a Ton of Bricks 🧱

Remember when I said it would be mostly copy-pasting? HAHAHA. _laughs in debugging_

First surprise: Partials defined AFTER they're used? Yeah, that's a thing people do. Who knew? 🤷 Solution: [Lazy loading](https://github.com/FarhanAliRaza/django/blob/6bd7bc83e66bd7779628aef237a241f264a49080/django/utils/datastructures.py#L350C1-L365C56) to the rescue!

Second surprise: _Parse time vs render time_. Didn't even think about this when writing my proposal! 🤦 I spent a lot of my early coding time on problems caused by it.

### Django's Template System: Crash Course 📚

Let me paint you a picture of how Django templates actually work:

1. **The Lexer** 🔍: Takes your beautiful template string and chops it into tokens (TEXT, VAR, BLOCK - like a word salad)
2. **The Parser** 🎭: Gobbles up those tokens and spits out a compiled template (basically a list of Node objects)
3. **The Nodes** 🌳: VariableNode, IfNode, ForNode, PartialNode, PartialDefNode, etc. (These actually render the HTML for the browser using the context)
4. **The Engine** 🚂: The conductor that makes everything work together
5. **The Loaders** 📦: These bad boys fetch template strings from the filesystem, memory, or cache
6. **The Backends** 🎨: Django Template Language, Jinja2... pick your poison! (These provide the tags and syntax sugar for HTML. They are really [DSLs](https://en.wikipedia.org/wiki/Domain-specific_language))

Our mission? Sneak partials into the Django backend (the one everyone uses by default).

So some of our code runs at parse time to save the partials into `Template.extra_data` as `TemplateProxy` and then at render time we render those partials with the context.

### Act 3: Code goes where? 🗺️

We put our partial loading logic in `django.template.backends.django.DjangoTemplates extends BaseEngine`. Seemed logical, right? WRONG!

The `include` tag was like "Nah, I don't see your partials, bro." 🙈

After much head-scratching, probably too much coffee ☕, and help from my mentor, we found the answer.

Instead of the backend, we needed the engine! 🤯 Once we moved it to `django.template.engine.Engine`, everything clicked. Magic! ✨

In `django-template-partials`, partial loading works through loaders.

### Act 4: The Source Finding Saga (This Is Where It Gets Wild) 🎢

Picture this challenge: You have a full template like this beauty:

```
{% extends 'partial_base.html' %}
this is here just to prevent stupid formatter from reformatting
this newline (Thanks for reading anyway)
{% partialdef extra-content %} Extra Content {%endpartialdef %}
{% block main %} Main Content {% endblock %}
```

And you need to extract JUST the partial part. Sounds simple? _laughs nervously_

#### The Evolution of Chaos:

**Attempt #1:** "Let's use regex!"
_Writes regex_
_It works!_
😎

**Attempt #2:** "Oh wait, what about nested partials?"
_Regex grows more complex_
_Still works!_
😅

**Attempt #3:** "WAIT, WHAT IF THE PARTIAL IS IN A COMMENT??"
Jacob Walls (Django Fellow) found this.
_Regex becomes sentient and tries to escape_
😭

The regex solution had become an absolute monster. It was ugly, complex, and I'm pretty sure it was plotting against me.

#### The Plot Twist Nobody Saw Coming 🎬

Then, in a moment of pure debugging desperation, I discovered something beautiful. Django's parser ALREADY tracks token positions!

```python
# IT WAS THERE ALL ALONG!
pos_open = getattr(token, "position", None)
source_start = pos_open[0] if isinstance(pos_open, tuple) else None

pos_close = getattr(endpartial, "position", None)
source_end = pos_close[1] if isinstance(pos_close, tuple) else None
```

Instead of my Frankenstein's monster of a regex, we could just:

```python
full_source[self._source_start : self._source_end]
```

🤯 MIND. BLOWN. 🤯

The simplest solution was hiding in plain sight! No regex wrestling, no string gymnastics, just pure, elegant position tracking. And the best part? It only mattered in debug mode anyway!

_Chef's kiss_ 👨‍🍳💋

### Act 5: The Testing Marathon 🏃‍♂️

Django has 18,000+ tests. EIGHTEEN THOUSAND! That's not a codebase, that's a fortress! 🏰

I wrote tests for every edge case I could imagine. Then I wrote tests for edge cases I couldn't imagine (the reviewers pointed those out). Then I wrote tests for the tests (okay, not really, but you get the idea).

## What I Actually Learned (Besides Django Internals) 🎓

- **Simple > Complex**: That position tracking solution? _Chef's kiss_
- **EAFP - Easier to Ask For Forgiveness Than Permission**: Handle the exception instead of checking first (thanks again to my mentor)
- **Tests are your friends**: who knew?
- **Community reviews make everything better**: Even when they point out 188 things to fix 😅
- **Sometimes you need to be wrong**: To find the right solution
- **Coffee consumption**: Directly proportional to debugging complexity ☕📈

## The Dream Team

This adventure wouldn't have been possible without these absolute legends:

- **Carlton Gibson** ([noumenal.es](https://noumenal.es/)) - My amazing mentor and debugging partner 🧙‍♂️
- **Natalia Bidart** [GitHub](https://github.com/nessita) - Django Fellow who caught my testing gaps like a ninja 🥷
- **Nick Pope** [GitHub](https://github.com/ngnpope) - The reviewer who probably knows Django better than Django knows itself 🔍
- **Jacob Walls** [GitHub](https://github.com/jacobtylerwalls) - Django Fellow who found that comment bug and made me question reality 🐛
- **GSoC and Django Software Foundation** - For letting me break things in the name of science! 🧪

## The Epic Conclusion 🎭

Come Django 6.0, template partials will be RIGHT THERE in core!

This GSoC journey transformed me from "I'll just change where partials are stored" to "Let me tell you about Django's template architecture while standing on one foot and juggling." I now unironically enjoy writing tests (send help), and I've seen enough edge cases to last a lifetime.

The best part? Every bug, every wrong turn, every "wait, that's not how it works?" moment taught me something. Sometimes the most elegant solutions are hiding right under your nose, pretending to be token positions.

Who knew that a summer of code could be this much of a rollercoaster? 🎢

---

_Want to see template partials in action? Check out Django 6.0 when it drops! Want to contribute? Join us at [github.com/django/django](https://github.com/django/django) - we have cookies!_ 🍪

_Check out Djangonaut Space and [apply for session 5](https://djangonaut.space/sessions/). They are great people. I am one of them, so 🕺_

_P.S. - The regex is still out there somewhere, probably plotting its revenge. If you see any suspicious regular expressions, please report them immediately._ 👀
