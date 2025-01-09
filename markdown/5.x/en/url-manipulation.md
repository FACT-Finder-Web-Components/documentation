## Overview

Whenever a search request happens, Web Components writes the used search parameters to the URL and creates an entry in the browser history.
This allows you to share the URL to a specific search with others and to navigate back and forth through the browser history.

Web Components has defaults that automatically convert FactFinder _SearchParams_ to and from a URL query string and there is usually no requirement for you to interject unless you choose to.

If you wish to customize the conversion, you have to do so in **both** parsing and writing the URL.
If you customize only one direction, parameter formats will not be recognizable by Web Components' default conversion rules.

The relevant two API contact points are:
- `factfinder.routing.setUrlParamOptionsListener(() => UrlParamMappingOptions)`
- `factfinder.utils.env.searchParamsFromUrl(parsingOptions)`


### Working with defaults

If you work with the default conversion, the only thing you will likely need is a method to translate the URL to _SearchParams_ to be able to initiate a page's initial search request.
For this, there is the `factfinder.utils.env.searchParamsFromUrl()` helper that returns a valid _SearchParams_ object.
The translation from _SearchParams_ to URL params is handled automatically by Web Components.

```js
document.addEventListener(`ffCoreReady`, ({ factfinder, init, initialSearch }) => {
    init({ ... });

    const searchParams = factfinder.utils.env.searchParamsFromUrl();

    initialSearch(searchParams);
});
```


#### `customParameters` are not processed by default

The FactFinder _SearchParams_ object has a `customParameters` field.
As these parameters are usually irrelevant to FactFinder and they are too generic to reasonably auto-translate them to URL parameters, Web Components ignores this field by default.
If you must have `customParameters`, you can always manually add them to the _SearchParams_ as well as you can customize the URL generation process to include them.


## SearchParams to URL params

When the response pipeline of a **search** or **navigation** request reaches the point where Web Components is about to write the latest _SearchParams_ to the URL, the `setUrlParamOptionsListener` [pipeline hook](/api/5.x/request-pipelines) is called.
The listener's return value is a _UrlParamMappingOptions_ object with various options to manipulate the resulting URL.

Registering this listener is optional.
Typically, it is registered once during app initialization.
All options are also optional.
Specifying an option overrides the default value (as opposed to append to it).

```js
document.addEventListener(`ffCoreReady`, ({ factfinder, init, initialSearch }) => {
    init({ ... });

    // Registering the listener with its default options.
    factfinder.routing.setUrlParamOptionsListener(() => ({
        allow: [],
        block: [`activeAbTests`, `followSearch`, `purchaserId`],
        blockFilters: [],
        keyMapping: {},
        order: [`query`, `filters`, `sortItems`],
        postStringifier: undefined,
        stringifiers: {},
    }));
});
```


### UrlParamMappingOptions

#### allow

`allow` specifies a list of search parameter names (as they appear on the _SearchParams_ object used for the current request pipeline) that shall be considered for stringification.
Search parameters that are not listed are discarded and will not appear in the URL.

If the list is empty, all parameters are considered.


#### block

`block` is a list of parameter names (as they appear on a _SearchParams_ object) that shall not appear in the URL.


#### blockFilters

`blockFilters` works like `block` but targets individual filters from the `filters` search parameter.
It takes a list of **filter names**.

This option can be useful if your URL path already contains a part of the filters.
Frequently, this is the category filter.
In this case, you don't want the category filter to appear again in the URL's query string.

```js
// URL with category filter: https://yourshop.com/powertools/woodworking?filter=input:230V

factfinder.routing.setUrlParamOptionsListener(() => ({
    // Assuming your category filter's field name is 'Category'.
    blockFilters: [`Category`],
}));
```


#### keyMapping

`keyMapping` is an object with which you can specify how URL parameters shall be renamed.
The _keys_ in the object are the **default names** as Web Components would write them to the URL (these are the names that are defined in the parameter list of the related GET request of `/search` or `/navigation`).
The _values_ are the parameter names as you want them to **actually appear** in the URL.

Without mapping:

```js
// SearchParams
// { query: "atlantis" , location: { latitude: 30.8, longitude: -42.8 } }

factfinder.routing.setUrlParamOptionsListener(() => ({
    keyMapping: {},
}));

// URL: ?query=atlantis&latitude=30.8&longitude=-42.8
```

With mapping:

```js
// SearchParams
// { query: "atlantis" , location: { latitude: 30.8, longitude: -42.8 } }

factfinder.routing.setUrlParamOptionsListener(() => ({
    keyMapping: {
        query: `q`,
        latitude: `lat`,
        longitude: `lon`,
    },
}));

// URL: ?q=atlantis&lat=30.8&lon=-42.8
```

> Important
>
> The `keyMapping` here is the same as in the _parsing options_ of the counterpart `factfinder.utils.env.searchParamsFromUrl(parsingOptions)`.
>
> Always use the same mapping object!

```js
const keyMapping = { query: `q` };

factfinder.routing.setUrlParamOptionsListener(() => ({ keyMapping }));

initialSearch(factfinder.utils.env.searchParamsFromUrl({ keyMapping }));
```

Mapping happens **after** stringification (including the post-stringifier).


#### order

`order` is a list of _SearchParams_ keys that specifies which parameters shall appear **first** and in which order in the URL.
Parameters that are not specified will appear in alphabetical order after the specified parameters.

```js
// searchParams:
// { page: 2, query: "chisel" }

factfinder.routing.setUrlParamOptionsListener(() => ({ order: [`query`] }));

// URL: ?query=chisel&page=2
```


#### postStringifier

`postStringifier` takes a function that receives an array of ordered and stringified key/value pairs and returns an array of the same format.
The post-stringifier is called after all other operations (except key mapping) are complete.

Each key/value pair the post-stringifier receives represents one URL parameter as it is about to be written to the browser's URL.

```js
// query: jacket
// filters: size=L, features=waterproof

factfinder.routing.setUrlParamOptionsListener(() => ({
    postStringifier: pairs => {
        // Current contents of `pairs`:
        // [
        //   { key: "query", value: "jacket" },
        //   { key: "filter", value: "size:L" },
        //   { key: "filter", value: "features:waterproof" },
        // ]

        // Manipulate `pairs` as required. E.g. filter, reorder, add additional pairs, etc.
        pairs.unshift({ key: `custom`, value: `pole-position` });

        // Return the manipulated `pairs` array or a new array with the same format.
        return pairs;
    },
}));

// URL: ?custom=pole-position&query=jacket&filter=size:L&filter=features:waterproof
```


#### stringifiers

`stringifiers` allows you to define custom stringifiers.
It is the counterpart to `searchParamsFromUrl`'s `preparsers`.
It takes an object with _SearchParams_ keys and the stringifier functions.

The following example shows how one could merge the two-component `location` parameter into one.
Instead of producing two URL parameters `latitude` and `longitude`, it will only output one `loc` parameter.

The section on `searchParamsFromUrl` contains an example on the reverse action.

```js
// searchParams:
// { query: "atlantis" , location: { latitude: 30.8, longitude: -42.8 } }

factfinder.routing.setUrlParamOptionsListener(() => ({

    keyMapping: { latitude: `loc` },

    stringifiers: {
        location: (addParam, location) => {
            // All stringifiers receive two arguments.
            // An `addParam` function and the SearchParams value that is to be stringified.
            // - `addParam(value, key?)` is a function that takes the stringified value and an optional output key.
            // - `location` is the value from the _SearchParams_ object that is to be stringified.

            const value = `${location.latitude}:${location.longitude}`;

            // Using `latitude` as a temporary output. It will later be renamed by the `keyMapping`.
            const key = `latitude`;

            // `key` is optional. If you don't specify it, the related _SearchParams_ key is used.
            // In this case: "location"
            addParam(value, key);

            // You can call `addParam` as many times as you require.

            // If you wanted to produce the same result as the default `location` stringifier,
            // you would call `addParam` once for each location component.

            // addParam(location.latitude, `latitude`);
            // addParam(location.longitude, `longitude`);
        },
    },
}));

// URL: ?query=atlantis&loc=30.8:-42.8
```


## URL params to SearchParams

Converting URL params to _SearchParams_ is done on page load in order to produce the initial search request based on the current URL params.
It must be done manually in the `ffCoreReady` event handler.

```js
document.addEventListener(`ffCoreReady`, ({ factfinder, init, initialSearch }) => {
    const searchParams = factfinder.utils.env.searchParamsFromUrl(parsingOptions);

    initialSearch(searchParams);
});
```


### Parsing options

`searchParamsFromUrl` converts the query string from the current URL to a valid _SearchParams_ object that you can use to issue a **search** request.

> Hint
>
> If you need a _NavigationParams_ object, you can use the `factfinder.utils.toNavigationParams(searchParams)` conversion function.

All options to `searchParamsFromUrl` are _optional_.

```js
const searchParams = factfinder.utils.env.searchParamsFromUrl({
    block,              // array of strings
    categoryFieldName,  // string
    keyMapping,         // object
    preparsers,         // object
});
```


#### block

`block` is an array of strings where you can specify search parameters that shall not appear in the _SearchParams_ object.
Note that these are the parameter names as they appear in the resulting _SearchParams_ object and not as they appear in the URL.

```js
// URL: ?query=atlantis&latitude=30.8&longitude=-42.8

factfinder.utils.env.searchParamsFromUrl();
// { query: "atlantis" , location: { latitude: 30.8, longitude: -42.8 } }

factfinder.utils.env.searchParamsFromUrl({ block: [`location`] });
// { query: "atlantis" }
```


#### categoryFieldName

`categoryFieldName` is the field name of your category facet.
While technically optional, **you should always specify it** because the category filter must be constructed in a different format than regular filters.
Web Components can't discern from URL parameters alone which filter is a category filter and which is not.

You can find the correct field name in your data feed or, in a search response, in the category facet object's `associatedFieldName` field.

```js
factfinder.utils.env.searchParamsFromUrl({ categoryFieldName: `Category` });
```


#### keyMapping

`keyMapping` is an object with which you can specify how URL parameters have been renamed.
The _keys_ in the object are the **default names** as Web Components would write them to the URL.
The _values_ are the parameter names as they **actually appear** in the URL.

```js
// URL: ?q=atlantis&lat=30.8&lon=-42.8

factfinder.utils.env.searchParamsFromUrl({ keyMapping: { query: `q`, latitude: `lat`, longitude: `lon` } });
// { query: "atlantis" , location: { latitude: 30.8, longitude: -42.8 } }
```

> Important
>
> Always use the same mapping object that you do for `factfinder.routing.setUrlParamOptionsListener`.

If you do not specify `keyMapping`, the following default mapping is used.
All other parameters appear as they are in the _SearchParams_ object.

```js
{
    activeAbTests: [`activeAbTest`],
    filters: [`filter`, `substringFilter`],
    location: [`latitude`, `longitude`],
    marketIds: [`marketId`],
    sortItems: [`sort`],
}
```


#### preparsers

`preparsers` takes an object that lets you define functions to process URL parameters before they are converted to _SearchParams_.
This is necessary when you are using URL parameters in a format that Web Components doesn't understand.
The preparsers must translate them back into the Web Components-compatible format.

The _keys_ of the object that you pass to `preparsers` are the same as those in a _SearchParams_ object.
The _values_ are each a function that receives a list of matched parameters.
Only the preparser for the `filter` parameter receives a second argument - the `categoryFieldName`.
The function then returns an array of key/value pairs.


##### Pre-parser examples

Here are two examples of possible `preparsers`.
A simple one (`articleNumberSearch`) and a more complex one (`location`).
Details are discussed after the example.

You can find the reverse action of the `location` example in the `setUrlParamOptionsListener` section.

```js
// URL: ?ans=A&loc=30.8:-42.8

const searchParams = factfinder.utils.env.searchParamsFromUrl({

    // Translates 'ans' from the URL to 'articleNumberSearch'
    // and 'loc' to 'latitude'.
    keyMapping: { articleNumberSearch: `ans`, latitude: `loc` },

    preparsers: {
        // `matchedEntries` has the format: [{ key: "keyAfterMapping", values: ["value1", "value2"] }]
        articleNumberSearch: (matchedEntries) => {
            const singleEntry = matchedEntries[0];
            const val = singleEntry.values[0].toUpperCase();
            singleEntry.values[0] = val === `A` ? `ALWAYS` : val === `N` ? `NEVER` : `DETECT`;

            // Must return an array in the same format as `matchedEntries`.
            return [singleEntry];
        },

        location: (matchedEntries) => {
            const entry = matchedEntries.find(({ key }) => key === `latitude`);
            const [lat, lon] = entry.values[0].split(`:`);

            // The `location` parser expects both `latitude` and `longitude` parameters.
            return [
                { key: `latitude`, values: [lat] },
                { key: `longitude`, values: [lon] },
            ];
        },
    },
});

// searchParams:
// {
//   articleNumberSearch: "ALWAYS",
//   location: { latitude: 30.8, longitude: -42.8 }
// }
```


##### Details of the `articleNumberSearch` example.

In the URL, the parameter appears as `ans=A`.

The presupposition is that the name `articleNumberSearch` is too long for a pleasing appearance in the URL and you shortened it.
Likewise, the possible values defined by FactFinder (`ALWAYS`, `NEVER`, `DETECT`) are too long and are shortened, too.

As Web Components does not know the parameter `ans`, it has to be mapped to one of the known parameters.
This happens in `keyMapping: { articleNumberSearch: 'ans' }`.

With the mapping defined, all URL parameters with the key `ans` will be passed to the `articleNumberSearch` preparser.
The preparser then converts the customized value `A` to the FactFinder-defined `ALWAYS`.

```js
articleNumberSearch: (matchedEntries) => {
    // matchedEntries === [{ key: "articleNumberSearch", values: ["A"] }]

    // Translate values to expected format (see above).

    // Return modified `matchedEntries` or a new array with the same format (see above).
}
```


##### Details of the `location` example

In the URL, the parameter appears as `loc=30.8:-42.8`.

`location` normally appears as two parameters (`latitude`, `longitude`) in the URL.
In this example, we only use a single parameter with a custom format.

The internal parser for `location` requires both `latitude` and `longitude` parameters in order to produce a valid `location` object.
As we only have a single parameter in the URL, simple key mapping is insufficient, and we must split the custom value into its components.

First, `keyMapping: { latitude: 'loc' }` translates the custom `loc` to the known `latitude` which causes the `location` parser to be invoked.
However, this is incomplete data because the `longitude` parameter is missing.
The `location` **preparser** must then convert the custom value and add the missing parameter.

```js
preparser: {
    location: (matchedEntries) => {
        // matchedEntries === [{ key: "latitude", values: ["30.8:-42.8"] } }]

        const entry = matchedEntries.find(entry => entry.key === `latitude`);
        // entry === { key: "latitude", values: ["30.8:-42.8"] } }

        // Splitting the custom value into its components.
        const [lat, lon] = entry.values[0].split(`:`);

        // Return an array with the entries required by Web Components' parser.
        return [
            { key: `latitude`, values: [lat] },
            { key: `longitude`, values: [lon] },
        ];
    },
}
```
