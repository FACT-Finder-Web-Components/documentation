## Overview

With the Popular Searches feature you can display the most common search queries when a user clicks into the search box.
Clicking on a suggested search query issues a search request on the current page.

As this feature is a variation of Suggest, it is integrated into the [ff-suggest](/api/5.x/ff-suggest) element.
One `ff-suggest` element can render both types of response.

![Popular Searches](/images/elements/popular-searches.png)


## Setup

To use the Popular Searches feature you need an `ff-searchbox` and an `ff-suggest` element.
The minimum setup is to add the `popular-searches` attribute to `ff-searchbox`.

```html
<ff-searchbox popular-searches></ff-searchbox>
<ff-suggest></ff-suggest>
```

If there is no custom template in `ff-suggest` defined for Popular Searches, a default template is used.


### Custom template

A custom HTML template is defined with a `template` element that has the `data-role="popularSearches"` attribute.
There are no structural restrictions to the HTML you can provide.

The actual Popular Searches results are defined through an element annotated with the `data-template` attribute.
This element will be replicated for all suggested entries returned by FactFinder at the location it sits in the template.

Each `data-template` element has access to a _PopularSearch_ object as it is defined by the FactFinder REST API.

```html
<ff-suggest>
    <template data-role="popularSearches">
        <h3>Popular Searches</h3>
        <div data-template>{{name}}</div>
    </template>

    <template data-role="suggestions">
        ...
    </template>
</ff-suggest>
```


#### HTML output

With a template as shown above, the output might look like the following.
Note that the wrapper elements with classes `ffw-suggestContainerWrapper` and `ffw-suggestContainer` are present for both Popular Searches and regular suggestions.

```html
<ff-suggest>
    <div style="position:relative;width:100%">
        <div class="ffw-suggestContainerWrapper">
            <div class="ffw-suggestContainer">
                <h3>Popular Searches</h3>
                <div data-template>sale</div>
                <div data-template>backpack</div>
                <div data-template>trousers</div>
                <div data-template>jacket</div>
                <div data-template>hat</div>
                <div data-template>boots</div>
            </div>
        </div>
    </div>
</ff-suggest>
```


### Reacting to click events

Similar to listening to click events on suggest items, you can listen for Popular Searches clicks through the `factfinder.notifications` API.

`addPopularSearchClickListener` takes a listener function that receives an object with two fields.

- `origin` - A reference to the `ff-suggest` element the click happened in.
- `popularSearch` - The _PopularSearch_ data object that the clicked item is based on.

```js
factfinder.notifications.addPopularSearchClickListener(({ origin, popularSearch }) => {
    alert(`Navigate to: ${popularSearch.name}`);

    // If you want to navigate to another page, return `false`.
    // This interrupts the request pipeline and prevents the unnecessary search request on the current page.
    window.location = `/search?query=${popularSearch.name}`;
    return false;
});
```


### Caching

Changes in the Popular Searches result are very infrequent and don't need a new request on every click into the search box.
Therefore, after `ff-searchbox` receives the Popular Searches result, it stores it and redispatches it to the response pipeline on subsequent clicks.
This limits the number of requests to the Popular Searches API to one per page per `ff-searchbox`.

Note however, that `ff-searchbox` elements operate unaware of other elements in the DOM and do not share the cached result.

Also note that if you change the FactFinder channel during runtime, the cached Popular Searches result in `ff-searchbox` will not get updated.

Lastly, when `ff-searchbox` dispatches a cached result to the response pipeline, it will do so with a generic _RequestInfo_ object.
Usually, this is not a problem but you should be aware of it in case you modify the request options with `factfinder.request.before.popularSearches` during the initial Popular Searches request.


### Conflict with `suggest-onfocus`

The `suggest-onfocus="true"` attribute on `ff-searchbox` provides a similar behavior as `popular-searches` does.
When you use both features at the same time, `suggest-onfocus` takes precedence and regular suggestions are displayed.
However, Popular Searches are still displayed whenever the condition for `suggest-onfocus` is not met.
