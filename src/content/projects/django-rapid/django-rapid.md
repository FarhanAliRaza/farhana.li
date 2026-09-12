---
title: 'django-rapid: msgspec Serialization and Validation for Django'
slug: 'django-rapid'
description: 'Fast JSON serialization and request validation for Django views using msgspec. A FastAPI-style decorator and Schema class that replace DRF serializers on hot endpoints and cut serialization overhead.'
date: '2025-09-23'
tags: ['Python', 'Django', 'msgspec', 'JSON', 'API', 'Performance', 'Open Source']
published: true
github: 'https://github.com/FarhanAliRaza/django-rapid'
---

django-rapid grew out of production work where DRF serializers were the dominant cost on busy endpoints. It swaps them for msgspec, with a decorator that validates the request body against a schema and serializes the return value.

```python
@validate(UserIn, response_schema=UserOut)
def create_user(request):
    data = request.validated_data
    return User.objects.create_user(data.username, data.email, data.password)
```

It works with function views and class-based `APIView`s, and you can adopt it one endpoint at a time. The ideas here later fed directly into django-bolt.
