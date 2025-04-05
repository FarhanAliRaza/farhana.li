---
title: 'Guide for etag caching in django and svelte'
slug: 'django-etag-caching-sveltekit'
description: 'Learn how to implement efficient ETag-based client-side caching in Django and SvelteKit applications to reduce bandwidth usage and improve performance for users with slow internet connections.'
date: '2024-05-04'
tags: ['djagno', 'caching', 'sveltekit', 'etag-caching']
published: true
---
I am building a school management system with a built-in AI LMS for students. However, in Pakistan, many schools are in rural areas where the internet is slow. So, I want to make the site use client-side caching heavily, but I don't want to show outdated cached data to users as well.So I implemented etag based cahing sytem in my application.

## Caching Types

There are many ways of caching, mainly **server-side** caching, where queries or html pages are cached (hopefully next blog 🤞)   
**Client-side** caching is where the result of the HTTP Response are cached on the client side.   
For my use case, I want to minimize network usage that is why client-side caching makes a lot of sense for me.

### Common Caching Methods

The most common type of caching is sending a cache header. 
`Cache-Control: public, max-age=31536000`  
This `public` indicates that this request can also be cached by intermediate proxies between client and server. `private` will only be cached inside the client browser. 

There are also more conditional caching methods, such as time-based caching, where the browser sends the `If-Modified-Since: Sat, 05 Apr 2025 17:45:57 GMT` header with the request. If the content has changed since that time, the server will respond with the new data; otherwise, the server sends the `304` HTTP code with an empty body. 

## Etag Caching

Entity tag caching works in the same way as time-based caching, but instead of sending a `If-Modified-Since` header a `If-None-Match:"15f0fff99ed5aae4edffdd6496d7131f` is sent; the server side matches the hash; if the hash is changed it sends the data if not changed, it sends back `304 ` HTTP code with empty body.

### How I implemented it

#### Django 

For the backend side, I created an ETag helper function that generates an ETag for my query.
```python
def generate_etag_for_collection(queryset, prefix=""):  
    """  
    Generate an ETag for a Django queryset using a single aggregation query.  
    Requires an indexed 'updated' field for best performance.  
    """  
     
    aggregation = queryset.aggregate(  
        count=Count('pk'),  # Use 'pk' or 'id' for counting  
        max_updated=Max('updated')  
    )  
     
    count = aggregation.get('count', 0)  
    max_timestamp_dt = aggregation.get('max_updated')

    # Convert datetime to timestamp (handle None case)  
    latest_timestamp = None  
    if max_timestamp_dt:  
        # Be mindful of timezones if your 'updated' field is timezone-aware  
        # using timestamp() handles timezone conversion to UTC epoch correctly if aware  
        latest_timestamp = max_timestamp_dt.timestamp()  
         
    # Create a unique identifier  
    etag_raw = f"{prefix}_{count}_{latest_timestamp or 'initial'}"  
    return quote_etag(etag_raw)
```


When a new entity is added or updated, the ETag changes, sending the data to the client side, that will in turn update or add to the cache on the client side.  
In django rest framework viewset i check and send the ETag header 

```python
def list(self, request, *args, **kwargs):  
        """  
        Override list method to add ETag support  
        """  
        queryset = self.filter_queryset(self.get_queryset())  
         
        # Generate ETag based on grades collection  
        etag = generate_etag_for_collection(queryset, "grades")  
         
        # Check If-None-Match header  
        if_none_match = request.META.get('HTTP_IF_NONE_MATCH')  
        if if_none_match and if_none_match == etag:  
            return Response(status=status.HTTP_304_NOT_MODIFIED)  
             
        # Continue with normal serialization if content has changed  
        serializer = self.get_serializer(queryset, many=True)  
        response = Response(serializer.data)  
        response['ETag'] = etag  
        return response
```
#### Sveltekit

On the Svelte side, I store my cache data inside the `IndexedDB` and interact with it using the `dexie` library.

This method gets the data from cache before fetching and updates the state. Then request the data in background if the HTTP code is something other than `304`, it updates the state according to the response that was sent.
```js
export async function getCachedData<T>(path: string): Promise<T | null> {  
  try {  
    // First check memory cache  
    // const cacheKey = `data_${path}`;  
    // const cachedData = getFromCache<T>(cacheKey);  
    // if (cachedData) return cachedData;  
     
    // If no Dexie, return null  
    if (!db) return null;  
     
    // Then check Dexie  
    const result = await db.data.get(path);  
    const cacheItem = result?.value as CacheItem<T> | undefined;  
     
    if (cacheItem) {  
      // Check if data is expired  
      const now = Date.now();  
      if (now - cacheItem.timestamp > CACHE_TTL) {  
        // Clean up expired data asynchronously  
        db.data.delete(path)  
          .catch(error => {  
            console.warn('Error deleting expired data:', error);  
          });  
        return null;  
      }  
       
      // Check for version mismatch  
      if (cacheItem.version !== APP_CACHE_VERSION) {  
        console.log(`Cache version mismatch for ${path}: ${cacheItem.version} !== ${APP_CACHE_VERSION}`);  
        // Clean up outdated data asynchronously  
        db.data.delete(path)  
          .catch(error => {  
            console.warn('Error deleting outdated data:', error);  
          });  
        return null;  
      }  
       
      // Save to memory cache for faster access next time  
      // saveToCache(cacheKey, cacheItem.data);  
      return cacheItem.data;  
    }  
     
    return null;  
  } catch (error) {  
    console.warn('Error accessing Dexie for data:', error);  
    return null;  
  }  
}
```
### Why not wait for HTTP 304 first? 

In my testing on 3G internet, an empty response takes about 2 seconds. So the application does not feel so snappy. I update the state before waiting for the response that may cause some flickering when data updates but i am ok with that for now.

### Edge Cases 

#### Development

During development, the data format might change and that may cause some client-side errors because client-side cached data may be missing some key. For that, I have implemented a versioning system. If there is a version mismatch, the cache data is deleted, and a new request is sent without ETag so that the server sends normal data that is then cached.

#### Performance

Most of my users have low-end Android phones. So I minimize the use of RAM for that, I don't store the cache in memory and when the component unmounts, I clear the state if it was using some global state.  


### Result 

#### Cached Result 

![Cached response showing instant data loading with ETag caching](/images/cached.gif)

As you can see in the cached response above, data loads instantly from IndexedDB without waiting for network requests. The application feels snappy even on slow connections.

#### Non-Cached Result

![Non-cached response showing normal network request loading time](/images/non-cached.gif)

In contrast, the non-cached response demonstrates the traditional loading experience, where users must wait for the full network round-trip before seeing any data.

The difference in user experience is significant, especially on slow 3G connections where the cached response provides instant feedback while the non-cached version may take several seconds to load.

