---
title: 'How i built fastest python web framework (Faster than fast api) aka django-bolt'
slug: 'building-fastest-python-webframework'
description: ''
date: '2025-09-11'
tags:
  [
    'gsoc',
    'gsoc-2025',
    'django',
    'open-source',
    'django-template-partials',
    'django-6.0',
    'django-tempalte-system'
  ]
published: false
---


I vibe engineered (NOT VIBECODED. More details below) the fastest python api web frameowrk on top of Django and Rust actix web framework. On naive benchmarks it is faster then popular web frameworks like fast api, litestar and amazingly it has native support for all (most of) django features.

My journey started with Django in 2019. I learned it as my first web framework. So have special place in my heart for Django. I contributed to django as Google summer of Code contributor in 2025 and before that i contributed to djangopackages.org through Djangonaut Space. So through these interactions the fear of alien nature of big opensource project faded away. So i thought i could build something too. AI coding also helped because in old days (2019 for me, have to search everythign on the internet it was alot of work). Now i have a "Senior Engineer" at my finger print. Senior Engineer is in Quotes, because this senior engineer have quirks (Foreshaddowing).


As a Gen Z i want my things fast. Boomer say "DB query speed matter". As i am learning i agree too. But i like my things fast. So that was the mission i want to get fast results in stupid json benchmarks but with django features that i love. 

I learned Go and thought maybe rebuild django in Golang because i liked the language. But that was very big and daunting task implementing everything in Go. So next best thing i found Pyo3 that allows Rust to interact with Python. There were alot of examples of this in the community too (Robyn, Pydantic). 

Robyn proved the concepts that i was guessing. So end goal was kind of clear. Handle HTTP request in Rust and call python when needed.  I was not thinking of it as a i ll build a usable web framework But community liked the idea and now i have spent about 6 months of my time on this project. So here it begins.


## So it begins. 

My first public commit was on Sept 19 2025. I was trying to build single file django api web framework something like django nano. But pretty early decided against it because i was fighting two thing Django and Rust Side for 1 file api web framework.

## Django bootstrap

For orms we need 