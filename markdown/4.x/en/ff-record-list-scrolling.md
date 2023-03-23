## Overview

The `ff-record-list-scrolling` element is a variation of the `ff-record-list` element.
See [ff-record-list](/api/4.x/ff-record-list) for basics.

The list expands as soon as you approach its end without waiting for the next data to arrive.
This lets you scroll smoothly over multiple pages both up and down without interruption.

You can limit the auto-expansion and instead have "Load more" buttons appear to continue advancing one at a time.


## Setup

### Turn off personalization

To get reliable search results it is best to turn off **personalization**.
If personalization is active, interaction with the search result, such as clicking on products, affects ranking and pages loaded thereafter are no longer consistent with the initial search request.
This manifests itself with duplicate or missing products.

Basic setting:

```html
<ff-communication
    use-personalization="false"
></ff-communication>
```

To ensure all requests return without personalized results:

```js
document.addEventListener(`ffReady`, ({ factfinder }) => {
    factfinder.communication.EventAggregator.addBeforeDispatchingCallback(event => {
        event.usePersonalization = false;
    });
});
```


### Do not use `search-immediate`

`ff-record-list-scrolling` requires a special approach to triggering the initial search.
Therefore, you should not use the `search-immediate` attribute on `ff-communication`.
Instead, the search must be triggered with JavaScript.

```html
<ff-communication
    search-immediate  <!-- Do not use this attribute! -->
></ff-communication>
```


### Prevent `page` parameter from appearing in the URL

`ff-record-list-scrolling` does not update the `page` parameter in the URL when scrolling.
Therefore, it is best to remove it altogether and avoid it going stale.

Note however that the `page` parameter is still read from the URL on page entry.
So you can start the result from any page you like. 

```js
document.addEventListener(`ffReady`, ({ factfinder }) => {
    factfinder.communication.EventAggregator.addBeforeHistoryPushCallback((res, event, url) => {
        const newUrl = url.replace(/page=[^&]+&?/, ``);
        factfinder.communication.Util.pushParameterToHistory(res, newUrl, event);
        return false;
    });
});
```


### HTML templates

`ff-record-list-scrolling` gives you the option to define custom HTML templates for the records and the "Show more" buttons at the top and bottom of the list.

They are defined through `template` elements with a `data-role` attribute set to the relevant value.
These values are `record`, `showNext` and `showPrev`.


#### Record template

The `<template data-role="record">` element that contains the `ff-record` template is **required**.
If you don't specify it, an error will be raised.
Inspect your browser's console to see if the record template is defined incorrectly.

This record template will be used for both placeholder records and populated records.

`ff-record` elements inside `ff-record-list-scrolling` receive some special information that is available in the `_inf` property.
It contains:

```
_inf: {
    page: number,          // The number of the page the record belongs to.
    placeholder: boolean,  // `true` when the element is in placeholder mode.
}
```

Example:

```html
<ff-record-list-scrolling>
    <template data-role="record">
        <ff-record>
            <a data-anchor="/product/{{record.ArticleNumber}}"
               data-redirect="/product/{{record.ArticleNumber}}" data-redirect-target="_self">
                <div class="record-img">
                    {{#_inf.placeholder}}
                    <img data-image="/static/loading.gif">
                    {{/_inf.placeholder}}
                    {{^_inf.placeholder}}
                    <img data-image="/static/images/{{record.ImageName}}">
                    {{/_inf.placeholder}}
                </div>
                <div class="record-product-info">
                    <h3 class="record-product-name" title="{{record.Title}}">
                        ({{_inf.page}})
                        {{#_inf.placeholder}}Loading... please wait for a moment{{/_inf.placeholder}}
                        {{^_inf.placeholder}}{{record.Title}}{{/_inf.placeholder}}
                    </h3>
                    <div class="record-product-brand">-> {{record.Manufacturer}}</div>
                    <div class="record-product-price">-> {{record.Price}}</div>
                </div>
            </a>
        </ff-record>
    </template>
</ff-record-list-scrolling>
```

> Tip
>
> If you are using an image for placeholders, prefetch it to have it shown immediately. 
> ```html
> <link rel="prefetch" href="/static/loading.gif">
> ```


#### Show next/prev button templates

When you limit the number of pages that shall be loaded "infinitely," a "Show more" button will appear once you reach the limit and there are more results available.

Defining the templates is optional.
The template at the top of the list takes `data-role="showPrev"` while the template at the bottom takes `data-role="showNext"`.

Inside the template you place the `data-show` attribute with a value of either `prev` or `next` on an element that shall be the clickable button.

```html
<ff-record-list-scrolling>
    <template data-role="showPrev">
        <div>Click here for previous page <button data-show="prev">Show</button></div>
    </template>
    <template data-role="showNext">
        <div>Click here for next page <button data-show="next">Show</button></div>
    </template>
</ff-record-list-scrolling>
```

If you don't define button templates, they will be rendered as:

```html
<!-- At the top of the list -->
<button data-show="prev">Show more</button>

<!-- At the bottom of the list -->
<button data-show="next">Show more</button>
```


### Styling

Records must have a fixed height for reliable scrolling results.

Make sure to test your styling with placeholders and regular records.


### Triggering the initial search and restoring the last scroll position

When you are entering a page for the first time, there is not much to consider regarding how to trigger the initial search.
You trigger the search as usual and the search result will start at the first page.

However, when you are coming back from e.g. the product detail page (PDP), you usually want to restore the last scroll position.
To do so, you have to provide the details of the last scroll position when you left to the PDP.

Web Components stores this information in the browser's `history.state.scrollInfo` when you click on a record in `ff-record-list-scrolling`.

```js
document.addEventListener(`ffCommunicationReady`, ({ factfinder, searchImmediate }) => {

    // The condition of whether to trigger searchImmediate or not depends on your environment.
    if (shouldTriggerSearchImmediate()) {
        
        if (isReturningFromPDP()) {
            // Usually, the browser tries to restore the last scroll position automatically.
            // This can lead to incorrect results on dynamically rendered pages.
            history.scrollRestoration = `manual`;

            // Triggers a search request with the parameters before you went off to the PDP.
            searchImmediate(history.state.scrollInfo.searchParams);
            
            // Tell `ff-record-list-scrolling` to restore the scroll position according to the provided info once the element receives data from a search request.
            factfinder.elements.InfiniteScrolling.restoreScrollPosition(history.state.scrollInfo);
        }
        else {
            searchImmediate();
        }
    }
});
```

`isReturningFromPDP()` is a condition that you have to develop yourself in accordance with your environment.
A condition that may work in some environments could look like this:

```js
function isReturningFromPDP() {
    return !!history.state?.scrollInfo;
}
```


#### Storing custom scroll info

When you click on an `ff-record` element and `ff-record-list-scrolling` is about to save the current scroll position, it emits an `ffHistoryReplace` event on the `document` object.
The event's `detail` property contains the scroll info that is about to be stored in `history.state.scrollInfo`.

You can prevent Web Components from storing the scroll info by calling `event.preventDefault()`.
This gives you the option to store the data in a different location.

```js
document.addEventListener(`ffHistoryReplace`, event => {
    // `event.detail` contains the scroll info
    
    // Call `event.preventDefault()` if you want to handle storing the scroll info yourself.
});
```


### Parameters

#### `max-pages`

Defines the **number** of additional pages that are loaded in the infinite manner.
When the number of pages is reached, a "Load more" is displayed to load subsequent pages one by one.

This parameter applies to both scrolling down and scrolling up.

Default value is `Infinity`.


#### `max-pages-prev`

Same as `max-pages` except that it only applies to _scrolling up_.

Default value is equal to `max-pages`.


#### `request-delay`

Defines the delay in **milliseconds** before the contents of a page are requested.
When the list expands on scrolling, it first shows placeholders.
These placeholders must be in the viewport for `request-delay` milliseconds before the search request for those placeholders is issued.

This allows you to quickly scroll over pages without needlessly sending search requests.

Default is `1000`, i.e. one second.


#### `resize-debounce`

The amount of time in **milliseconds** that the list uses after `resize` events to correct its scroll position.
If this value is too small, the list might lose track of its last scroll position and scroll to a wrong position.

Default is `50`.


#### `trigger-margin`

Defines the height of the scroll container's trigger margin in **pixels**.
If an end of the list is scrolled to within this margin, the list expands.
There are two margins.
One at the bottom of the scroll container and one at the top.
Both margins start at their respective edge of the scroll container and extend away from it to ensure the list expands before the list's end is reached and scrolling gets interrupted.

Default is `200`.


#### `scroll-container`

The **selector** to the scroll container.

Default is `window`.


#### `scroll-behavior`

One of `auto`, `smooth` and `instant`.
This behavior is used whenever the list corrects its scroll position.
`ff-record-list-scrolling` uses the `scrollBy` API ([window.scrollBy() on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy)).

Default is `auto`.


#### `ssr`

A **boolean** attribute that, when set, enables server side rendering mode for `ff-record-list-scrolling`.

See [Server Side Rending](/documentation/4.x/server-side-rendering)

Default is _unset_, i.e. SSR is disabled.
