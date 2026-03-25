## Overview

The Recently Viewed component enables you to display the products that a user has visited most recently.

It works entirely in the **browser** using `localStorage` and therefore requires no special backend setup.
**Click tracking**, etc.,  is built-in as you are used to from other components.

```html
<ff-recently-viewed>
    <ff-record-list>
        ...
    </ff-record-list>
</ff-recently-viewed>
```

The component:

- Shows entries in the order they were visited, starting from the most recent.
- Removes duplicates.
- Does not show the product currently being viewed.
- Displays up to four items by default.
- Allows you to configure the number of displayed items on a per-component basis.


## Integration

The integration of Recently Viewed consists of **two parts**.
A JavaScript part to **record** the user's view history and to configure the feature.
And the HTML part to **visualize** the most recently viewed products.

We also have to distinguish whether we are on a product's detail page or on any other page.


### A brief overview of the involved parts

On the product detail page:

- (Optional) Configuration (JS API).
- Record product currently being viewed (JS API).
- (Optional) HTML element for visualization (with special flag for product page).

Any other page (optional):
- HTML element for visualization (without special flag).


### The product detail page

#### The JavaScript part

On the product page we add the product details to the Recently Viewed history by calling `factfinder.components.recentlyViewed.addEntry(flatRecord)`.
`flatRecord` is a plain object of keys and values that represent the product data.
The FactFinder API calls this format `FlatRecord`.

```js
document.addEventListener(`ffCoreReady`, ({ factfinder, init }) => {
    // Web Components initialization as usual.
    init({
        ff: { ... },  // Your FactFinder instance configuration.

        appConfig: {
            fieldRoles: { ... },  // Field roles are required for tracking.
        },
    });

    // Configuration is optional. If not provided, default values are as shown below.
    factfinder.components.recentlyViewed.config({

        // Maximum number of items stored in history.
        maxLength: 12,

        // Storage target. "local" for `localStorage`, "session" for `sessionStorage`.
        storage: `local`,
    });

    // The data provided here will become accessible in ff-recently-viewed's HTML template.
    factfinder.components.recentlyViewed.addEntry({
        // Field names must align with your datafeed.
        Title: `The Product`,
        ArticleNumber: `123-456`,
        Price: 1.99,
        ...
    });
});
```


##### Adding the current product

Calling `addEntry` adds the entry to the top of the history, removes duplicates, and remembers it as the "currently viewed" item for the current page context.
It also discards items from the history that exceed `maxLength`.

If you have an `ff-recently-viewed` element in the product page, the newly added item will not appear in the list yet.
Only if you navigate to another page that doesn't call `addEntry` or calls it with a different product.


##### Configuration

The call to `config` offers you two options.

`maxLength` defines the maximum number of entries the Recently Viewed history can store.
When the limit is exceeded, the oldest entries are automatically discarded.

- **Default**: `12` (applies if not explicitly set)
- **Required for**: `addEntry()` operations
- **Not required for**: Reading the history

Only set `maxLength` if you are adding entries. Reading the history does not depend on this value.

> `maxLength` does not control the number of items shown in `ff-recently-viewed`.
> That value is set individually per `ff-recently-viewed` instance.
> Ensure `maxLength` is no less than the largest item count used across all instances.

`storage` defines whether the Recently Viewed history is stored in the browser's `localStorage` or `sessionStorage`.
Use values `"local"` or `"session"` accordingly.
**Default** is `localStorage`.

Unless you choose to use `sessionStorage`, you never have to set this value.
If you do, you have to configure it on every page that uses Recently Viewed because the configuration itself is not preserved across page contexts.
Changing it does **not** move a previously recorded history to the new storage.


#### The HTML part

To visualize the Recently Viewed products, you use the `ff-recently-viewed` element.
The integration in product and non-product pages differs only in the use of the `wait-for-update` attribute.

This attribute tells `ff-recently-viewed` to wait for the `addEntry` call so it may correctly identify the currently viewed product and exclude it from visualization.

```html
<!-- [wait-for-update] is required on the product page. It prevents a race condition with the JS API. -->
<ff-recently-viewed wait-for-update>

    <!-- You may define additional HTML that is shown together with the history. -->
    <h3>Recently viewed:</h3>

    <ff-record-list subscribe="false">
        <template data-role="record">
            <ff-record>
                ...
            </ff-record>
        </template>
    </ff-record-list>
</ff-recently-viewed>
```

For details on how to set up the nested record list, see [ff-record-list](/api/5.x/ff-record-list).


### Non-product detail pages

On non-product pages you typically only need the `ff-recently-viewed` element.

```html
<!-- [max-results] is optional. Its default value is 4. -->
<ff-recently-viewed max-results="6">
    <ff-record-list subscribe="false">
        <template data-role="record">
            <ff-record>
                ...
            </ff-record>
        </template>
    </ff-record-list>
</ff-recently-viewed>
```

The `max-results` attribute allows you to configure up to how many items this particular component shall display.
You can have multiple `ff-recently-viewed` elements in the page, each with a different `max-results` setting.


## Remember to define field roles

For the tracking from `ff-recently-viewed` (or any other component) to work, the Web Components application must know your FactFinder's field roles configuration.

While the field roles do appear in search, suggest and other types of responses, these responses have to be triggered before Web Components can pick them up.
Certain pages such as the product detail page, the shopping cart page, etc., do not typically interact with FactFinder before a user clicks on a recently viewed product.

It is therefore **best practice** to always specify them explicitly during initialization.

```js
document.addEventListener(`ffCoreReady`, ({ factfinder, init }) => {
    init({
        ff: { ... },  // Your FactFinder instance configuration.

        appConfig: {
            fieldRoles: { ... },  // Always explicitly define field roles.
        },
    });
});
```


## JavaScript API

The related JavaScript API can be found in the `factfinder.components.recentlyViewed` namespace.

Several elements have already been mentioned above.
Revisit those sections for detailed descriptions.


### `config(options)`

Calling `config` is optional and only required if you want to override the default values.

`options` has two optional fields:

| Name        | Type    | Default   | Description                                                             |
|-------------|---------|-----------|-------------------------------------------------------------------------|
| `maxLength` | Integer | `12`      | Maximum number of items stored in history.                              |
| `storage`   | String  | `"local"` | Either `"local"` or `"session"` for `localStorage` or `sessionStorage`. |


### `addEntry(flatRecord)`

Call `addEntry` on product pages.
`flatRecord` corresponds to the `FlatRecord` data type defined in the FactFinder API specification.
It is a flat object where the keys are the product's field names from your data feed, and the values are the related values.

Adding an entry removes duplicates and places the added entry to the top of the view history.
Calling `addEntry` also marks the added entry as the current entry allowing it to be excluded from visualization.
Always call it with every product page load.
There is no need to distinguish first-time visits and page reloads.


### `getEntries() => [Object]`

Returns an array of all stored entries.
It does **not** return the entry most recently added via `addEntry` within the current page session.

You only need this function if you want to visualize the view history yourself.


### `getEntriesAfterUpdate() => Promise<[Object]>`

The same as `getEntries` but it returns a _Promise_ that resolves once `addEntry` was called.
It is only required on product pages.

This function is necessary during page loading in order to avoid race conditions when the call order of `addEntry` and `getEntries` cannot be guaranteed.
If `getEntries` is called before `addEntry`, the _current_ entry cannot be determined and all entries would be returned and subsequently displayed.

You only need this function if you want to visualize the view history yourself.


### `clear()`

Clears the view history.
Note that visual components are not automatically updated.
