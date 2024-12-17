## Your First Search

---

In this article we will be looking at how to initiate a search request with `initialSearch` and then display the result using the `ff-record-list` element.

We recommend using the [ff-record-list demo](https://github.com/FACT-Finder-Web-Components/demos/blob/release/5.x/ff-record-list/index.html) to follow along and to familiarize yourself with FactFinder Web Components.


### Configure and Search

In case you skipped previous sections please read more about the configuration [here](/documentation/5.x/quick-configuration).

First, call `init` with adjusted `url`, `channel` and `apiKey` parameters.

```js
document.addEventListener(`ffCoreReady`, ({ factfinder, init, initialSearch }) => {
    init({
        ff: {
            url: `https://your-instance.fact-finder.com/fact-finder`,
            channel: `your-channel`,
            apiKey: `your.apiKey`,
        },
    });

    // Call `initialSearch` with a `query` that is suitable to your product range.
    initialSearch({ query: `backpack` });
});
```


To initiate the first search, call `initialSearch`.
This function takes one or two parameters.

The first is either a _SearchParams_ or a _NavigationParams_ object that is **required**.
They are defined in FactFinder's REST API documentation.

The second parameter is an **optional** _SearchOptions_ or _NavigationOptions_ object.
Their fields are documented in [Type Definitions](/api/5.x/type-definitions).

Depending on whether the application is configured to be a category page or a regular search page, `initialSearch` will invoke either a `search` or `navigation` request from the `factfinder.request` namespace.

Make sure to always use this function for the initial search request as it provides different handling of the browser history than a regular search request.

Example:

```js
initialSearch({ query: `deck chair` }, { userId: `user123` });
```

You can always pass a _SearchParams_ object to `initialSearch`, even when the application is configured to category page.
In such a case, `initialSearch` will internally convert the _SearchParams_ to _NavigationParams_.


### Change Template Strings

The data used to display product information is provided by the data import file you specified in the FactFinder UI.

**This product data is returned in a one-to-one manner.**
This means that a field named `Price` in your import file will also appear as `Price` (case-sensitive) in the HTTP response's JSON and subsequently in your HTML templates.

Products matching the search term are returned in the `hits` list of the response JSON.
For details about the data structure, please refer to your FactFinder API documentation.

The `ff-record-list` element receives the list of `hits` unmodified as returned from FactFinder.

You can inspect every request to and response from FactFinder in the browser's network tab.
This is very helpful to understand the available data structure and build your HTML templates.

The `ff-record-list` element takes one `ff-record` HTML **template**.
For each entry in the response's `hits` list, `ff-record-list` will render a product item based on the `ff-record` template.

Each `ff-record` element receives one entry from the `hits` list.
You can access the hit's values by using the double curly braces syntax, e.g. `{{variantValues.0.Title}}`.

```html
<ff-record-list unresolved>
    <template data-role="record">
        <ff-record>
            <div class="record-img">
                <img data-image="https://your.image-store.base/path/{{variantValues.0.ImageURL}}">
            </div>
            <div class="record-product-info">
                <h3 class="record-product-name">
                    {{variantValues.0.Title}}
                </h3>
                <div class="record-product-brand">{{variantValues.0.Manufacturer}}</div>
                <div class="record-product-price">{{variantValues.0.Price}}</div>
            </div>
        </ff-record>
    </template>
</ff-record-list>
```

Note that `variantValues` is a list itself, and you have to specify an index in order to access a specific element.
In the data binding syntax an index is specified like a regular field name `.0` (as opposed to `[0]` in JavaScript).

Hits also have, for example, a `masterValues` field which is not a list and its child values are accessed as usual.
E.g. if `Title` was to appear in `masterValues`, it would be `{{masterValues.Title}}`.


### Further Reading

[ff-record](/api/5.x/ff-record-list#tab=docs) for more details on available features.

[Template Engine documentation](/documentation/5.x/template-engine) for more details on the curly brace syntax and general templating options.
