## Category Pages

Category pages play a special role in a web shop.
From an implementer's perspective, however, they are basically regular search result pages with pre-applied category filters.

Typically, you arrive at a category page after using the shop's navigation.
This has a few implications regarding how to communicate with the FactFinder API.
Responses to navigation and search requests can be configured separately in the FactFinder UI.
This has the effect that seemingly identical requests may receive different responses depending on whether they target the `/navigation` or the `/search` API.

This article explores the tools offered by FactFinder Web Components to correctly implement category pages.


### Implementation in general

Your category page corresponds to a certain category _path_.
This category path must be passed to Web Components' configuration where it is processed into pre-defined filters.

These filters will then be applied to all search requests (searching, filtering, paging, sorting, etc.).

Lastly, to present your visitors a category page with results, you trigger the initial search request as you would typically do on a regular search result page.


#### Setup

Category pages are typically set up during the initialization phase of the Web Components application.
During the `ffCoreReady` event, you set the `appConfig.categoryPage` property to the filter that represents the current category page.

Setting the `categoryPage` property will make Web Components target FactFinder's `/navigation` REST API endpoint instead of `/search`.
Also, the specified filters will be considered _fixed_, and users will not be able to remove them.

The `categoryPage` property expects an array of _Filter_ objects in the format they are defined by the FactFinder REST API.
As this format is rather complex, there are helpers in the `factfinder.utils.filterBuilders` namespace.
Find them in the [API Overview](/api/5.x/core-overview) for details.

Assuming your category's field name in the data feed is called `Category` a basic setup could look like this example:

```js
document.addEventListener(`ffCoreReady`, ({ factfinder, init, initialSearch }) => {
    const categoryFieldName = `Category`;
    const initOptions = {
        ff: {
            url: `https://your-instance.fact-finder.com/fact-finder`,
            channel: `your-channel`,
            apiKey: `your.apiKey`,
        },
        appConfig: {
            categoryPage: [factfinder.utils.filterBuilders.categoryFilter(
                categoryFieldName,
                [`Clothing`, `Jeans`, `3/4 length`]
            )],
        },
    };

    // Prevent category filters from appearing in the URL's search parameters.
    factfinder.routing.setUrlParamOptionsListener(() => ({
        blockFilters: [categoryFieldName],
    }));

    init(initOptions);

    // The configured category filter must be passed to the initial search request.
    initialSearch({
        filters: initOptions.appConfig.categoryPage,
    });
});
```


#### Brand pages

You are not restricted to use a category filter in the `categoryPage` option.
In fact, you can specify any filter that you want to build a dedicated page for.

Brand pages are a common use case.
Here, you would use `filterBuilders.filter(name, values)` instead of `filterBuilders.categoryFilter(name, path)`.

Example:

```js
init({
    ff: { ... },
    appConfig: {
        categoryPage: [
            factfinder.utils.filterBuilders.filter(`Brand`, `FactFinder Merch`),
        ],
    },
});
```


#### Styling

The category page setup affects the [ASN](/api/5.x/ff-asn) element.
Filter elements are presented in `ff-asn-group-element` elements.
Depending on if and how a filter was selected, `ff-asn-group-element` renders relevant attributes.
These give you the opportunity to style your filters accordingly and to give users visual clues about possible interactions.

| Selection type     | Rendered attributes |
|--------------------|---------------------|
| selected, fixed    | `selected fixed`    |
| selected, explicit | `selected`          |
| selected, implicit | `selected implicit` |
| unselected         | _(none)_            |

_Fixed_ filters are those defined in `category-page`.
_Fixed_ and _implicit_ filters cannot be deselected.

_Explicit_ refers to filters that were directly selected by the user.

Example output (shortened):
```html
<ff-asn-group for-group="Category">
    <ff-asn-group-element selected fixed>    Level 0 </ff-asn-group-element>
    <ff-asn-group-element selected>          Level 1 </ff-asn-group-element>
    <ff-asn-group-element selected implicit> Level 2 </ff-asn-group-element>
    <ff-asn-group-element>                   Level 3 </ff-asn-group-element>
</ff-asn-group>
```


### Handling page navigation

This section describes the requirements to handle the tasks of _entering_ and _exiting a category page_.

_Entering a category page_ is usually dealt with during application initialization as described above and does not require additional attention.
_Exiting a category page_, however, always needs an individual implementation.

Your shop system most likely offers a navigation component that is aware of your shop's URL structure.
In this case you will probably want to stay with the built-in navigation.
Web Components' navigation elements are not aware of the internal application routing and don't know which page to redirect to.
Your shop system's navigation guarantees that routing is handled correctly.


#### Rendering category pages

In your category page's HTML-document call the `init` function with the `categoryPage` option set to the relevant filter string.
To trigger the initial search call `initialSearch` with the configured category filter.


#### Leaving category pages

You likely have a search box on your category pages.
If this is `ff-searchbox` and you invoke a search through it, the result will appear on the current category page.
`ff-searchbox` does not redirect automatically.
However, you typically want to redirect to a generic search result page because your category page's URL is probably unsuitable for a global search result.

The redirect before search must be implemented manually.
In principle, it is done like this:

```js
factfinder.request.before.search(requestInfoSearch => {
    const { searchParams, searchOptions } = requestInfoSearch;

    // If the search request was invoked by `ff-searchbox` or `ff-searchbutton`, `searchOptions.requestOptions.origin` will be a reference to the `ff-searchbox` element.
    if (searchOptions.requestOptions?.origin?.tagName === `FF-SEARCHBOX`) {
        window.location.href = `/your-search-result-page?query=${searchParams.query}`;

        // Cancel the pipeline to avoid sending a search request to FactFinder before the redirect is complete.
        return false;
    }
});
```

`return false` cancels the request to FactFinder.
It is not needed on the original page.
Instead, you have to carry the search query over to the redirect destination and re-trigger the search request there.

The actual URL you are redirecting to depends on your application's individual requirements.
