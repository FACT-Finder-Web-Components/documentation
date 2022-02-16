## Category Pages

---

Category pages play a special role in a web shop.
From an implementer's perspective, however, they are basically regular search result pages with pre-applied category filters.

Typically, you arrive at a category page after using the shop's navigation.
This has a few implications regarding how to communicate with the FACT-Finder API.
Responses to navigation and search requests can be configured separately.
This has the effect that seemingly identical requests may receive different responses depending on whether they target the **navigation** or the **search** API.

This article explores the tools offered by FACT-Finder Web Components to correctly implement category pages.

> Hint
>
> In principle the implementation of category pages is the same for all scenarios.
> Details vary depending on whether you are using **FACT-Finder NG** or prior, or whether your app architecture is **dynamic pages** or **single-page application**.


### Implementation in general

Your category page corresponds to a certain filter string.
This filter string must be passed to Web Components' configuration where it is processed into pre-defined filters.

These filters will then be applied to all search requests (searching, filtering, paging, sorting, etc.).

Lastly, to present your visitors a category page with results you set the `search-immediate` attribute on `ff-communication`.
Without `search-immediate` the page will remain empty.


#### FACT-Finder NG

When you are using FACT-Finder NG, you implement category pages with the `category-page` attribute on `ff-communication`.
You pass it the filter string that corresponds to your relevant category page.
These filters are _fixed_, and cannot be removed by users while they are on the current category page.

The filter string looks like a string you would pass to `add-params`.
Note that it is **case-sensitive**.

Assuming your category facet is called `Category` a basic setup could look like this example:
```html
<ff-communication
    url="your.fact-finder.instance"
    version="ng"
    api="v4"

    category-page="filter=Category%3AEquipment"
    add-params="filter=Properties%3AWaterproof"

    search-immediate
></ff-communication>
```

Attributes `category-page` and `add-params` can be used together.

> Important
>
> `category-page` depends on other configuration values.
> Make sure to define `url`, `version`, `api` and `channel` _before_ `category-page`.
> Also see [ff-communication](/api/4.x/ff-communication) for order of attributes.

> Note
>
> `category-page` only works with category filters.
> Other types of filters are not supported.


##### JavaScript configuration

If you prefer to configure Web Components through JavaScript instead of HTML, you can find the corresponding property in `factfinder.communication.globalCommunicationParameter.categoryPage`.

Example:
```js
document.addEventListener(`ffReady`, ({ factfinder }) => {
    factfinder.communication.globalCommunicationParameter.categoryPage = `filter=Category%3AEquipment`;
});
```


##### Encoding

> Important
>
> It is extremely important to encode the `category-page` value correctly.
> Failing to do so will result in wrong requests, incorrect recognition of fixed filters and other undefined behavior.

The filter string passed to `category-page` requires a special **two-step encoding pattern**.
Special purpose characters (`%`, `+`, `/`) inside each part of the category path must be encoded first.
Then, the whole filter string must be _"URL-plus"_ encoded.
This means regular URL encoding with spaces converted to `+` characters.

The result is that the above-mentioned special purpose characters are double encoded when they shall be interpreted literally.

_This two-step encoding is necessary because a category path's levels are separated by `/`.
However, `/` can also appear as part of a filter name (e.g. `3/4 length`).
Encoding literal `/` allows FACT-Finder to distinguish them from category path separators.  
`+` characters must be double encoded or FACT-Finder would interpret them as spaces.  
Lastly, due to this double encoding, `%` must be double encoded, too, or the decoding process would fail as `%` alone would be misinterpreted as a not yet decoded value._


###### Example

The following is an example routine that you can use outside your shop application to produce the correct filter string.
The resulting string is then set as the `category-page` value.

```js
const categoryFieldName = `Category`;
const pathToBeEncoded = [`Outdoor clothing`, `100% cotton + wool`, `3/4 sleeve`];

const encodedParts = pathToBeEncoded.map(part => part.replaceAll(`%`, `%25`).replaceAll(`+`, `%2B`).replaceAll(`/`, `%2F`));
const unencodedFilterString = categoryFieldName + `:` + encodedParts.join(`/`);
const filterString = `filter=` + encodeURIComponent(unencodedFilterString).replaceAll(`%20`, `+`);

console.log(filterString);
// filter=Category%3AOutdoor+clothing%2F100%2525+cotton+%252B+wool%2F3%252F4+sleeve
```


##### Styling

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


#### Pre-NG

Setups using FACT-Finder versions prior to NG don't have the `category-page` attribute available and therefore have to use a different configuration.
You use the `add-params` attribute with your category filters and the additional `navigation=true` filter.

Example:
```html
<ff-communication
        url="your.fact-finder.instance"
        version="7.3"
        add-params="navigation=true,filterCategoryROOT=Outdoor+clothing,filterCategoryROOT%2FOutdoor+clothing=100%25+cotton+%2B+wool,filterCategoryROOT%2FOutdoor+clothing%2F100%2525+cotton+%252B+wool=3%2F4+sleeve"

        search-immediate
></ff-communication>
```

Note that the pre-selected filters here are not fixed and can be deselected by users.


##### Encoding

Each level of category filter requires a key/value pair.

_Keys_ require the same two-step encoding pattern like in FACT-Finder NG.
Special purpose characters must be encoded individually, then the parts joined with `/` before being _"URL-plus"_ encoded as a whole.

```
before: ["filterCategoryROOT", "Outdoor clothing", "100% cotton + wool"]
after:  "filterCategoryROOT%2FOutdoor+clothing%2F100%2525+cotton+%252B+wool"
```

_Values_ are only _"URL-plus"_ encoded.

```
before: "3/4 sleeve"
after:  "3%2F4+sleeve"
```

Please see _"Encoding"_ in _"FACT-Finder NG"_ for more details.


### Application types

This section describes the requirements specific to the application types _dynamic pages_ and _single-page application_.

The tasks to handle are _entering_ and _exiting a category page_ and _managing browser history_.

Depending on the application type _entering a category_ page and _browser history management_ may not require additional attention.
_Exiting a category page_, however, always needs an individual implementation.


#### Dynamic pages

The most common application type for web shops is dynamic pages.
Each request runs through the server generating a new HTML document.

If you are using this kind of application, you will probably want to stay with the navigation provided by your platform.
Web Components' navigation elements are not aware of the internal application routing and don't know which page to redirect to.
The built-in navigation guarantees that routing is handled correctly.


##### Rendering category pages

Dynamic pages do not require additional setup to the already described earlier in this article.

In your category page's HTML-document render an `ff-communication` element with the attribute `category-page` (NG) or `add-params` (pre-NG) and the relevant filter string.
To trigger the initial search add the `search-immediate` attribute.


##### Leaving category pages

You likely have a search box on your category pages.
If this is `ff-searchbox` and you invoke a search through it, you will be presented the result on the current category page.
`ff-searchbox` does not redirect by default.
However, you typically want to redirect to a generic search result page because your category page's URL is probably unsuitable for a global search result.

The redirect before search must be implemented manually.
In principle, it is done like this:

```js
document.querySelector(`#mutual-parent-of-searchbox-and-searchbutton`).addEventListener(`before-search`, (event) => {
    event.preventDefault();
    window.location.href = `/your-search-result-page.html?query=${event.detail.query}`;
})
```

The `before-search` event is emitted by both `ff-searchbox` and `ff-searchbutton`.
This event bubbles, so you can catch it with a single event listener on a mutual parent.

`event.preventDefault()` cancels the request to FACT-Finder.
It is not needed on the original page.
Instead, you have to carry over the search query to the redirect destination and re-trigger the search request there.

The actual URL you are redirecting to depends on your application's individual requirements.


#### Single-page application

> Caution
>
> This section only considers the setup with FACT-Finder NG.
> Furthermore, the presented implementation is merely an abstract example to convey the concept.
> It must be adjusted to your application's requirements.
>
> The code listings assume the presence of some state management tool such as Redux.

SPAs require a more involved setup because Web Components must be detached completely from URL and browser history manipulation.
Then, Web Components and your SPA's routing must be connected.
The connection points are outlined in this section.

Web Components holds some inner state to distinguish whether it is in _search mode_ or in _navigation mode_.
This is important to target the correct FACT-Finder API and to create the correct behavior by the HTML elements.
The switching between these two modes must be synchronized with your SPA's state.

Using Web Components' navigation elements (`ff-navigation` and `ff-header-navigation`) makes the setup easier.
Navigating through one of these elements puts Web Components automatically into _navigation mode_ (or _category page mode_).


##### Sandbox mode

The first step is to detach Web Components from URL and browser history.
This is done by enabling the _sandbox mode_:

```js
document.addEventListener(`ffReady`, ({ factfinder }) => {
    factfinder.__experimental.sandboxMode.enable = true;
});
```

When _sandbox mode_ is enabled, Web Components emits an `ffUrlWrite` event on `document` whenever it would usually manipulate the URL.
This is important for handling the browser history.


##### Entering and exiting _navigation mode_

The moment Web Components wants to enter or exit _navigation mode_ is captured with `addBeforeDispatchingCallback`.
By analyzing the provided event's `type` property you distinguish between entering and exiting.

A `navigation-search` event means that _navigation mode_ is about to be entered.
It is emitted when the navigation elements (`ff-navigation` and `ff-header-navigation`) receive a click or when a relevant event is invoked manually via [addFFEvent](/api/4.x/core-event-aggregator).

```js
factfinder.communication.EventAggregator.addBeforeDispatchingCallback((event) => {
    if (event.type === `navigation-search`) {
        // Entering navigation mode.

        const fixedFilters = factfinder.common.fixedEncodeURIComponent(event.filter[0]).replaceAll(`%20`, `+`);
        const categoryPage = `filter=${fixedFilters}`;

        // Update your data store with the new categoryPage value.
        // When this event was triggered by the navigation elements, 'categoryPage' will be set automatically.
        // If triggered manually, 'categoryPage' must be set manually.
        // For simplicity and to avoid confusion you might want to set it in both cases.
        store.dispatch(updateCategoryPage(categoryPage, factfinder.communication.globalCommunicationParameter));
    }
    else if (event.type === `search` && factfinder.communication.globalCommunicationParameter.categoryPage) {
        // Exiting navigation mode.

        // A default search request shall cause the application to exit navigation mode. This is done by
        // unsetting 'categoryPage'.
        // Web Components doesn't clear 'factfinder.communication.globalCommunicationParameter.categoryPage'
        // automatically, So it must be done manually here.
        store.dispatch(updateCategoryPage(``, factfinder.communication.globalCommunicationParameter));
    }
});
```

Depending on your application it may be necessary to also set `category-page` on `ff-communication`.

```js
<ff-communication
    category-page="${store.categoryPage}"
></ff-communication>
```


##### Handling of browser history

The connection points to handle browser history are the Web Components event `ffUrlWrite` and the native `popstate`.
As Web Components cannot detect browser navigation when _sandbox mode_ is enabled, you have to manually synchronize.

```js
document.addEventListener(`ffUrlWrite`, historyResultCallback);
window.addEventListener(`popstate`, popstateHandler);
```

New history entries are dealt with in the `ffUrlWrite` event handler.
It is invoked after a search request to FACT-Finder returns.
Suggest or tracking requests do not trigger this event.

```js
export const historyResultCallback = (event) => {
    const { page } = store.getState().app;
    const result = JSON.parse(JSON.stringify(event.historyState.searchResult));
    const currentSearchResult = factfinder.communication.EventAggregator.currentSearchResult;

    // Some types of search result don't contain groups or breadcrumb data. E.g. sorting and paging.
    // Add the last available data so it isn't lost while navigating the browser history.
    result.groups = result.groups.length > 0 ? result.groups : currentSearchResult.groups;
    result.breadCrumbTrailItems = result.breadCrumbTrailItems.length > 0
        ? result.breadCrumbTrailItems
        : currentSearchResult.breadCrumbTrailItems;

    // Manual history handling may only be relevant when on search-like pages.
    // Your application's page handling is probably different.
    if (page === `search`) {
        const { categoryPage } = store.getState().app;

        history.replaceState({
                result,
                page,
                categoryPage,
            },
            location.pathname.slice(1),
            isBrowserHistoryDisabled ? `` : location.pathname
        );
    }
};
```

When navigating back in the browser history, `currentSearchResult` has to be restored, the data from that history frame has to be re-dispatched and `categoryPage` has to be set.

```js
export const popstateHandler = (stateEvent) => {
    const { result, categoryPage} = stateEvent.state;

    if (result) {
        factfinder.communication.EventAggregator.currentSearchResult = stateEvent.state.result;
        factfinder.communication.ResultDispatcher.dispatchResult(stateEvent.state.result, null);

        store.dispatch(updateCategoryPage(categoryPage, factfinder.communication.globalCommunicationParameter))
    }
};
```
