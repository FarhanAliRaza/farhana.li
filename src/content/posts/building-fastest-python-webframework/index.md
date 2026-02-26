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

For the ORM to work, Django needs to be bootstrapped — its environment configured and initialized. I decided to use a management command to run my Django build server, which handles bootstrapping automatically. It turned out to be a lucky choice. I didn't have to think about it at the time, and it was only later, when I paid closer attention, that I realized why the ORM was just working without any explicit setup.


## Sync vs async.
{{ACtually read code for this}}
 First of all, I just wanted to prove like this thing can work. So I I told Claude to build a kind of a MVP of the framework in which it used sync calls from it just called the function from Python from the actix. Actix like layer, in full sync mode, and like I first 
At this point, I was getting about twenty seven Thousand requests per second using four workers. 
But like that kind of proved the concept, and it was much faster than the Django simple Django views.

But for simple database, database endpoints, it sync does not perform as well because. Because first I was testing with just simple JSON endpoints, that that is why it was performing very well. But for database endpoints, it does not perform very well.

So the mission was: I want to have the async functionality like async calling of the views, but that proved to be a very big refactor of the first proof of concept. The issue kind of was like for handling async: I have to do handle Tokyo on the right side and and do something about how like I want to call Python asynchronously.It was not the first design, but the thing that I landed was: I should have a event loop, Python event loop, that I should store at registration time and use it to call the Python functions from the right side.

The async event loop was not the first solution I explored, I explored subinterpreters, using threads or stuff like that. I liked subinterpreters, but it was not ready to be used with Python three. Its port was not there yet. Because for some reason I was very afraid of Gill, because in my mind like Gill was a killer of performance. So I decided to use a event loop, and then use the forking of process of the servers in actix, and that will give me kind of scalability of different workers, with each having their own event loop, so there will be less GIL contention. At this point, I was making a mistake of having, like, more than one actix thread and having one event loop to handle both of those actix threads. But after that, I realized like, the portal net will always be the Python code, not the Rust code, so we are not getting any help by increasing the actix threads, for a given worker. So after some time, I just fixed that to one actix thread per one Python event loop.

### LEarning 
Python is the bottleneck in most of the cases (Forshaddowing)

Py-Spy Candle Graphs 
I was getting like high number of R P S. I wanted more.So what I did, I used Py Spy and other tools to see where we are spending our time. So what I saw that we were creating a new email loop on like every every new request. So I changed that to have one email loop at registration time.And then just reusing it.

### Learning #1
That was the learning that at that point, what I learned was, I should have maximum number of work That I should do at registration time instead of the hot path. 


During my testing, I realized like most of the time, my API spends is on serialization, or the query time. So I wanted to optimize the serialization time. I did not test a lot of libraries at the time. Only I only knew of Pythonic and msgspec. And or other or JSON, but I decided to go with msgspec just because of performance reasons and. Also because Lightstar used msgspec and they were examples of using that in a web framework.
That serialization library alone gave me a lot of performance boost against other Frameworks.Building of the serialisation layer upon of, msgspec is another story, that we will discuss later.

### Learning #2
Learning from this experience was use, fast libraries, like messy spec. From using this learning, I I then used python mutipart library for form parsing That I then replaced it with, rust side form parsing, but that comes very late.

At this moment, I was getting about 44435.36 requests per second, with four workers. Remember, this was without any like proper framework functionality. This was just calling the view function from Rust. We did not had any middlewares and any overhead of the framework.


## Benchmarking
Because my goal was just to have an experimental project, benchmarking was part of, it to show its potential. So I benchmarked at every little change to see what is affected and what is not. For benchmarking, first I used a B Apache benchmarking. I just created example views of JSON, database queries and stuff like that, and I made it a one command thing. Like I run one command, I will get, the after result and the before result, so I know if my performance is increasing or decreasing.

### Learning #3
This was my learning. My year before. Optimizing, we should always measure what we are optimizing. Without measuring, we don't know what part needs optimization, and we are just blindly guessing.

## Streaming and limit of AI Coding

From the start of this framework, my goal was kind of to have a proper way to stream, like AI responses, like a server sentiments. Or proper like web sockets, so I was most excited about this feature, and this feature was the most excruciatingly difficult part for me. I spent Weeks discussing with AI on how to implement this. This also showed me the limitation of AI. AI can be like world class programmer if you prompt it well, but it is limited to like if it hypothesizes something, and you kind of know in your heart that this is wrong, but it will get stuck. I spent weeks on this problem. I tested batching and saw other codebases to see what they do. I spent alot of time on this. 

### Learning
Measure correct thing. Python  is not alway the bottleneck.

### The Bridge
So what was the problem? In normal kind of view, what we do is we, kind of have one full cycle. We go to a Python function, we call it, we await it, and we get the response. But in streaming, the cycle kind of breaks. What happens is when we call a view, it returns a generator. So the generator sends a response back. For example, if we are returning from a while loop, it will return that response after, like one second, for example. So. It is not just awaiting a simple like a Python function. We have to send that response to client, and then also like have that have to await for the next response. This actually amplifies the problem of like Python Rust bridge, that is handled by Python three. Every time a new response comes, we have to cross that bridge every time.The other stupid thing I was doing was, I was measuring wrong thing for the streaming responses. I was I was measuring request per second for streaming response. That was not the thing to measure for streaming response. {{SOlution from code}}


### Vibe Coder Vs Software Engineer
- Problem
After solving the streaming part, uh, the other problem I identified when I was comparing Lightstar, Fast API and Django Bolt. I identified that for simple one B JSON, Django Bolt was outperforming like Lightstar and Fast API.At that time, but when the response is increased like for ten  B J, some response, Django Bolt was stuck on like forty thousand requests per second. No matter how many workers I added.And like, light star worth getting more than sixty thousand.So I knew in my heart that I am doing something wrong here.But when I asked AI for help.It just told me this is the price of the like five three, uh, F F five bridge, that is adding the latency for large responses, and this is like limitation of the framework. We cannot fix that.
- Process
This is where a normal vibe coder and a software engineer Differentiate themselves. I I knew in my heart like that this could not be a problem.But, ah, for actually finding the problem, I had to spend a lot of time talking with AI and.That talk, go went all in vain because it just keep saying that like this is the limitation of the framework. We cannot fix this. So, what I did what a software engineer should do.I I precisely measured everything. I married everything. Time for creating a promise.Um, converting that promise from Python to Rust.Awaiting that promise. Python side things. How the response is sending from Rust and Python.I measured everything and tested everything that I could.
- Solution
What I found was, the response sending between Python and Rust was actually like copying the memory from Python and Rust.That was a bottleneck.When I fixed that to use pointers to transfer the data from Python to Rust, that fixed that bottleneck.Now I get about ninety thousand requests per second for the same number of workers, where I I was stuck under forty thousand requests per second. {{SEe code for full understanding}}


## Testing

Another problem that it created, was the testing part because some of our code lives inside of Rust. For example, common middlewares like compression and CORS are in Rust, and some like some specific authentication also happens in Rust, and other our dispatch code is in Python.And because we were using routing as a like one cell as kind of memory type in Rust, so we can only set it once for testing. We can not reuse that because for testing we have to create a new router for every every test, and we can not reset the router in Rust.I know there may be a better solution for this, but.I do not know, yet. Please, if someone knows a better solution for this, tell me about it.So what I had to do was recreate, like most of the, hot path or the code for, the rest part in the testing module. I was copying a lot of code.That was actually slowing down the development. Also.Um, I still have not figured out, and the solution of it. Now I mostly use like, I create shared functionality wherever I can, and I share that functionality.Every new functionality I had to add in side of the rest, testing part also. So, that was kind of actually, really killing my work.It is not fully fixed yet, But how I, kind of have gotten around it is to use the Actix testing, uh, library that Actix provide and wrapping over it, so I don't have to do the whole part thing. But that still required me to, have testing data separately because, as I discussed before, the route and other stuff is a global variable. So that I had to, have separate code for some of the features.

### Django orm does not like my testing solution
So because we are, ah, kind of using a thread, inside of our testing. So whenever we update a, DB thing in our test, we cannot see those changes in our tests. That is why I have added, to use transactions, that slow down the test. So this is kind of part that is unsolved. I, I decided to go forward with like making the framework more mature and coming back to it to solve it 


## Django Views Compatibilty 

So Django built is kind of an other framework that wants to have Django admin. So what was my kind of first solution was to have a,sgi bridge. I created a simple assgi bridge, to, like, handle Django admin pages.So that user can use django admin. And to handle static files I just added A kind of proxy to handle static files in the HTML pages, but that was kind of a trick that I used at first.But now I have fixed it. I now have full static file handling inside of Rust. That if the debug mode is on It falls back to Django to find the static files. I cannot make that function work on like, depending on, off because, Django also advises against it and it is not fully secure. So what I do is, I recommend to run collect static and have a static folder in settings so my Rust side can serve those static files. Like instead of depending on Django to find static files for Django admin.Now I have full like ASCII mounting, uh functionality in Django built that can handle kind of full ASCII. You can mount fast API or Django applications.Jango admin also uses that.And this way, you can also use separate packages like Django or Loth or other packages that have like views or URL that they register through Django. So now user can have their views in Django and espose it through django bolt server same like granian.


## Middleware

I wanted to implement a simple middleware inside of Rust. So what I did was implement CORS, CORS in in Rust side. But I wanted to have control of like overriding that. So what I did was I had I implemented inside of like my dispatch function handling inside of Rust. But it was a very very bad decision because it caused a lot of pain afterwards because in in like a framework there were many return paths for a function. So I had to go and handle CORS on every one of them.So learning from this was just fucking use, middlewares.

### Learning 
Just f***ing use middlewares. Dont reinvent the wheel.


Django middleware compatibility was an important aspect of it because many packages use Django middleware. So, and there are also security middleware that I did not want to implement it inside of a Django bolt because it would have been a lot of work. So what I decided was to build a compatibility layer between Django middlewares and Django bolt. So now if a user wants to use a Django middleware inside of their Django bolt view, he can just pass a Django middleware. So our adapter layer just handles that middleware natively. For this, I had to implement kind of compatibility layer between the Django built request, that was barebone before. Now I had to implement different properties that Django middleware expect in the request. So I added that.But this way, adding more properties, it was getting kind of heavy on the request side.So what I advise there is to use setters and getters of the functionality. So what we do is we have a state dictionary that stores all the data. And the setters, when it calls the set property, it just stores the data in that dictionary. And when we want to have get the property, it just reads keys from the dictionary and. Get the data. This what we achieve from this is we don't have the overhead for all of the Django built views. We just have some overhead for the views that use Django middleware. That must be like small number of them. So it was no, it was great. I think.

Another problem with these middlewares were, I could not use like default middlewares given by the actix middlewares, because I wanted to override them inside of function using, or like decorators. So I had to implement like new middlewares, for these functionalities, so that I can override them. Compression was a great example of this. I wanted to override it for streaming. So what was happening is when during streaming the compression middleware were buffering my streaming and I was not getting the streaming responses.I may be spent few days on this bug.I could not find like why the streaming was not working.And AI, A I was not help, helping also. Because like streaming code is is somewhere else, and the middleware code is somewhere else. It did not have any idea like it should read the middleware code. Or are we using some middleware when I'm talking about streaming? So.So what help was like actually adding the console logs inside of the functions and actually seeing, what works and what does not work.And if something is not returning properly, and why it does not returning that properly, and it also helped AI to figure it out.
### Learning
What you dont know is what you dont know. Ai can not help with you at everything.



## Authentication 

Honestly speaking, I don't like the way Django works today. What it does now is it is mostly like JWT token heavy. It only works better with JWT token. No other kind of authentication because JWT token is like your passport. It works without your framework. So what Rust can do, it can decode the JWT token and see if that is a valid login or not. So now what users do is when they have an authenticated card, the JWT token will will like validate the JWT token, see if it is valid, decode it, see expired, it is very fast compared to a Python solution because it does not even touch Python at all. But it has its limitations because we are not actually seeing the database things. So it is a concept, and I want to improve it further.Same with session authentication, session authentication. I just give that to Django session middleware. I just tell the user to use that. This helps because we have Django middleware, compatibility layer, so it just works fine with that.


## Serialization (Pydatnic vs Litestar)

I like Python syntax very much. I wanted to use it in Django bolt. But naively, I thought like, its performance is too bad for Django bolt, but it wasn't. And this decision punished me.I had to build a full syntax of Pythonic that has Django model support, and that can act as an serialization layer for a web framework. I spent a lot of days working on this, And it is still not finalized.It still needs a lot of work. The performance improvement that it gives was not worth the work it took to build all this.But at the end, it was kind of worth it because even the unoptimized code that I built for serialization still, like, kind of outperforms, uh, Pythonic way to Rust version for most of the operations not all. If I had to choose, again, maybe I will choose Msgspec again  :).

Massive spec is built for pure performance.It has few features because of that.For example, one thing it, it has a fail fast mode, so it will only tell you like one field is wrong, that does not work with the web framework because web framework require like, us to tell like these fields are missing, not one field is missing, so that I had to build on top of it learning from the litestar. 

- Type Safety?
I had to decide between type safety and actual like development productivity. That we get with a serialization layer, like maybe, Jango REST framework.JangoRest framework when we use model serializer, it kind of like creates those fields dynamically.When those fields are created dynamically, we the like IDE does not know about them and it cannot provide you like the static type safety.So I decided against it, and I created a way to To define fields manually, that is more work, but it is more statically type safe.I decided this way because, I think AI is gonna write a lot of code and writing a lot of code will not, be a problem, the actual type safety will be a problem.Other feature I like very much that I built from like my learning, was having like a subset of the parent serializer serialization, because in jungle west framework you have to define like an admin serializer for all the fields and then a normal serializer that are subset of those fields, so what I decided was to, have one class and in the config we just define like two two level of fields and just use one class to have two serializers instead of defining those two serializers separately. I had to fight alot msgspec feature to build this serialization layer and it is still in development.

{{Code example}}

### Learning
Choose libraries carefully.




## Do things in rust 

I have I don't have to tell anybody to rewrite their code in rust because people are already rewriting their code in rust. The learning was I should do maximum amount of work inside of rust. I moved my foam processing to rust that gave me a lot of performance boost. I added Type coercing to rust. Cookie parsing. And other stuff like that. Header parsing to rust.

### Learning

Do things in rust.




## Signals 

This is one of other problems that is not fully solved yet. Django signals is like a great thing that helps in a lot of things. But what happens on every request in Django? Django as call signal Django start request started signal and the request ended signal. Those request started and request ended signal actually clean up the old database connections. The amount of time spent on this signal is not very much if we compare it with a query time, so it's too little for like actual query function. But if you are not querying something, that overhead becomes a lot.For now, I have added an optional signals, support so user can enable signal if they want. Fast API or other libraries handle this using like dependency injection, but Django handle database connections kind of on request level. So that is another overhead of Django kind of.So the like functions that don't even use, uh, database queries or something like that, they also have to pay the price of those signals, because that same function is called two times on every view.And it also has an overhead of the signals, engine. The whole like thing. When I use it without Django signals, and just call the functions in place, I get about seventeen thousand requests per second on one worker. But when I pass it through the Django signals engine, I get about I think five or six thousand requests per second.I have not fully figured out the solution of it, yet, but I think there is some work needed in Django Core too.



## What has come out of it ?

