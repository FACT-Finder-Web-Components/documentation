## Routing in non-SPA websites
---

This guide covers the recommended approach to handle redirects between different pages of an online shop that doesn't use a single-page application on the frontend layer.

### Redirect to the search page

In order to redirect all search events triggered on the homepage or other non-search pages to the product listing page, the following script should be placed above the FACT-Finder Web Components import tag:
```javascript
document.addEventListener("ffReady", function (event) {
    const factfinder = event.factfinder;
    const eventAggregator = event.eventAggregator;
    eventAggregator.addBeforeDispatchingCallback(function (event) {
        const isSearchEvent = event.type === "search" || event.type === "navigation-search";
        if (isSearchEvent && !isSearchPage()) {
            event.cancel(); // prevents the request from being sent before redirecting
            
            // we don't need these to appear in the redirect URL, they will be populated automatically
            ["channel", "version", "sid", "dispatchId"].forEach(function (param) { 
                delete event[param];
            });

            const dict = factfinder.common.encodeDict(event);
            const params = factfinder.common.dictToParameterString(dict);
            window.location.href = SEARCH_URL + params;
        }
    });
});
```

`SEARCH_URL` variable should contain the search URL __without__ `?` and any parameters.

`&& !isSearchPage()` condition is only required if the script is also included in the actual search page to prevent redirect loops. A simple implementation of the `isSearchPage()` function could be:
```javascript
function isSearchPage() {
    return window.location.href.indexOf(SEARCH_URL) !== -1;
}
```

> Note
>
> Please do not use `search-immediate` on non-search pages, or you will be immediately redirected to the search page.
> If for some reason you need to use this parameter on non-search pages, you can prevent being continuously redirected by using the `cancel` method of the event issued this way.
> You can check if the event is 'immediate' by checking its property `searchImmediate`.

```javascript
document.addEventListener("ffReady", function (event) {
    const eventAggregator = event.eventAggregator;
    eventAggregator.addBeforeDispatchingCallback(function (event) {
        if (event.searchImmediate) {
            event.cancel(); // prevents issuing requests to FACT-Finder and following redirect
        }
    })
});
```


#### `before-search` event

`before-search` event is emitted by `ff-searchbox` whenever `ff-searchbox` issues a request. In its listener, you have the opportunity to respond to only selected search requests, as ASN, paging, sorting etc. will not trigger this event.

For example, if you wish to redirect only searches that are triggered by entering a new query in the searchbox, you could use the following code:
```javascript
ffSearchBoxElem.addEventListener("before-search", function (event) {
    window.location.href = SEARCH_URL + "?query=" + event.detail.query;
});
```

### Redirect to the product details page

Due to tracking purposes, the redirect should happen through the `data-redirect` attribute inside the ff-record component. For the concrete example see the `Redirecting to product page` section of the [Record List documentation](/api/4.x/ff-record-list).
