## Routing in non-SPA websites

This guide covers the recommended approach to handle redirects between different pages of an online shop that doesn't use a single-page application on the frontend layer.

### Redirect to the search page

In order to redirect all search events triggered on the homepage or other non-search pages to the product listing page the following script should be placed above the Web-Components import tag:
```javascript
document.addEventListener("ffReady", function () {
    factfinder.communication.FFCommunicationEventAggregator.addBeforeDispatchingCallback(function (event) {
        var isSearchEvent = event.type === "search" || event.type === "navigation-search";
        if (isSearchEvent && !isSearchPage()) {
            delete event.type; // prevents the request from being sent before redirecting

            // extra decoding is required for category suggestions 
            Object.keys(event).forEach(function (key) {
                if (key.indexOf("ROOT") !== -1) {
                    event[key] = decodeURIComponent(event[key]);
                }
            });

            var params = factfinder.common.dictToParameterString(event);
            window.location.href = SEARCH_URL + params;
        }
    });
});
```

`SEARCH_URL` variable should contain the search URL __without__ the `?` and any parameters.

`&& !isSearchPage()` condition is only required if the script is also included in the actual search page to prevent redirect loops. A simple implementation of the `isSearchPage()` function could be:
```javascript
function isSearchPage() {
    return window.location.href.indexOf(SEARCH_URL) !== -1;
}
```

#### NOTE

Please do not use `search-immediate` on non-search pages or you will be immediately redirected to the search page.

### Redirect to the product details page

Due to tracking purposes, the redirect should happen through the `data-redirect` attribute inside the ff-record component. For the concrete example see the `Redirecting to product page` section of the [Record List documentation](/api/3.x/ff-record-list).
