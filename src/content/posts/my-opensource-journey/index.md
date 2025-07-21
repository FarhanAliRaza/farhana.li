---
title: 'From Not Knowing Programming Was a Job to GSoC and Contributing to Django Core'
slug: 'my-opensource-journey'
description: "My unlikely journey from a small town where I'd never met a programmer, through discovering coding via a Bollywood hacking movie, to contributing to Django's core framework during Google Summer of Code 2025. A story about community, growth, and finding your path in open source."
date: '2025-07-21'
tags:
  [
    'gsoc',
    'djangonaut-space',
    'django',
    'open-source',
    'template-partials',
    'community',
    'personal-growth',
    'django-core',
    'web-development'
  ]
published: true
---

_From not knowing programming was a job to contributing to Django's core_

As I write this, I've just passed my midterm evaluations for Google Summer of Code 2025, and I can't help but reflect on how far I've come. Not just in the past few months, but from the very beginning of this unlikely journey that led me to contribute to one of the world's largest Python web frameworks.

## Where It All Began

I come from a place where I didn't even know software engineering was a job. I'd never met a programmer and had no idea people actually built the technology around us. In my world, this career path simply didn't exist.

As a kid, I was that annoying child who took apart every toy to see how it worked. My parents were not amused! This curiosity made me dream of becoming a mechanical engineer, then later an aeronautical engineer. I was going to build rockets and planes!

But life had other plans. Due to some circumstances (story for another time), I ended up doing pre-medical in high school. There I was, stuck with biology and chemistry, when everything changed in 11th grade through the most unexpected source: a Bollywood movie about hacking!

That movie opened up a whole new world. I went down the hacking rabbit hole and discovered this thing called "coding." I tried Python first but it was impossibly hard. I had zero computer science background. HTML and CSS, though? That was magical! I could type something and immediately see it happen on the screen ([Thanks to Head First book for making it fun](https://paulinoposada.github.io/web/websites/paulino/books/technical/head_first_html.pdf)). That instant feedback was addictive.

After pre-med, I shocked everyone by deciding to pursue computer science. When I told my father, his response was priceless: "Do you want to become a computer operator?" He was genuinely thinking of the people who operate computers for government clerks. 😄

Looking back, it's absolutely wild. From not knowing programming was even a career to now contributing to Django, one of the world's largest Python web frameworks.

## My GSoC Project

I'm working on [bringing django-template-partials into Django core](https://summerofcode.withgoogle.com/programs/2025/projects/YqdTk30V), essentially adding built-in support for reusable template fragments. This means Django developers will soon be able to define small, reusable pieces of templates within the same file using `{% partialdef name %}...{% endpartialdef %}` and render them with `{% partial name %}`.

Why does this matter? It's perfect for component-based design and partial page updates, especially when working with HTMX for dynamic, interactive web apps. Instead of creating separate template files for every small component, you can define them inline and reuse them efficiently.

You can follow my progress in [this pull request](https://github.com/django/django/pull/19643) where I'm implementing these new template tags and enhancing Django's template loading system to support syntax like `template_name#partial_name` for loading specific fragments directly.

### Technical Challenges

The technical challenges have been fascinating. Diving deep into Django's template engine internals has been like exploring a complex machine. What I found most challenging initially was understanding the difference between parse time and render time. I had to figure out when different parts of the code actually run and what the consequences are. It's one thing to use Django templates, but it's entirely different to understand how the sausage is made!

I've also had a lot of fun learning more about Git.

I'll dive deeper into the technical details in a separate blog post!

## The Path to GSoC

My journey didn't start with GSoC. Before applying, I had already dipped my toes into Django's waters with a couple of merged pull requests. But the real game-changer was joining [Djangonaut Space](https://github.com/djangonaut-space/program).

Through Djangonaut Space, I contributed 14 pull requests to [djangopackages.org](https://djangopackages.org). There I learned something invaluable: **open source isn't just about code, it's about community**. The technical skills were just the beginning. Understanding how communities work, how to communicate effectively, and how to collaborate respectfully turned out to be just as important.

My experience was so positive that I came back as a session organizer, which taught me even more about fostering inclusive environments and helping newcomers find their place in open source.

## Personal Growth: The Unexpected Lessons

GSoC has been as much about personal development as professional growth. Here are the most important lessons I've learned about myself and working with others during GSoC and Djangonaut Space:

### Don't Take Code Reviews Personally

This was a hard one for me initially. When maintainers pointed out issues in my code, my first instinct was to feel defensive. But I learned that **there's something wrong with your code, not with you**. Every piece of feedback has a reason behind it. Whether it's maintaining consistency, preventing bugs, or improving performance. Embracing this mindset transformed code reviews from stressful experiences into learning opportunities.

### The Art of Listening

Due to my ADHD, I have a tendency to cut people off during meetings. I became painfully aware of this during team calls. I'm actively working on this, learning to let others finish their thoughts and take initiative. It's taught me that good collaboration isn't just about contributing ideas. It's about creating space for others to contribute theirs.

### Respect the Volunteer Spirit

One of the most humbling realizations has been that **everybody works in their free time for open source, for free**. This isn't their day job. It's their passion project. You can't demand things. You ask respectfully, you wait patiently, and you appreciate every bit of time people give to help you grow.

### Community Makes Everything Possible

Technical excellence alone doesn't make a project successful. **Community does**. The welcoming environment in Django, the willingness of maintainers to mentor newcomers, and the collaborative spirit of contributors is what makes the framework thrive. Being part of this community has shown me what sustainable open source looks like.

### Patience in Large Organizations

Working with a mature project like Django has taught me that **things take time, and that's okay**. There are processes, considerations for backward compatibility, extensive testing requirements, and multiple stakeholders. What might seem like a simple change often has far-reaching implications that need careful consideration.

### Ask for Help, but Try First

The balance between independence and asking for help is delicate. I've learned to exhaust my own problem-solving attempts before reaching out. But I also don't struggle in silence for too long. The Django community is incredibly helpful, but they appreciate when you've done your homework first.

## Looking Forward

As I head into the second half of my GSoC project, I'm carrying these lessons with me. The technical work continues to challenge me, but I now have a better framework for approaching both the code and the collaboration.

To anyone considering applying for GSoC or getting involved in open source: start with the community first. The technical skills will come. But understanding how to work with others, communicate effectively, and contribute respectfully will serve you throughout your entire career.

The template partials feature I'm building this summer will hopefully make Django more suitable for modern web development patterns. Especially for developers building interactive applications with HTMX and component-based architectures. But the person I'm becoming through this process will hopefully make the open-source community a little bit better too.

---

_You can follow my GSoC progress on [my project page](https://summerofcode.withgoogle.com/programs/2025/projects/YqdTk30V) and check out my ongoing work in [this PR](https://github.com/django/django/pull/19643). If you're interested in contributing to Django or getting involved in open source, I highly recommend checking out [Djangonaut Space](https://github.com/djangonaut-space/program) for a welcoming introduction to the community._
