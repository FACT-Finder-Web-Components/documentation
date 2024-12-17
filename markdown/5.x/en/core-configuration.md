This article looks at the initialization and re-configuration at runtime of the Web Components application.
It expands on the [API Overview](/api/5.x/core-overview).


## Initialization of the Web Components application

The initialization of the Web Components application happens during the `ffCoreReady` event.
The event occurs **exactly once** on the `document` object after the library's core finishes its initialization.

Call the `init` function and pass it a _Config_ object with all parameters your application requires.
See [Type Definitions](/api/5.x/type-definitions) for all available config fields.

The following example shows the **minimum setup**:

```js
document.addEventListener(`ffCoreReady`, ({ factfinder, init, initialSearch }) => {
    init({
        ff: {
            url: `https://your-instance.fact-finder.com/fact-finder`,
            channel: `your-channel`,
            apiKey: `your.apiKey`,
        },
    });
});
```

The config object is divided into three sections: `ff`, `ffParams`, and `appConfig`.


### `ff` - The essentials

The `ff` section must always be specified.
It is essential to establish a connection to the FactFinder API.

It has three required fields.

```js
ff: {
    url: `https://your-instance.fact-finder.com/fact-finder`,
    channel: `your-channel`,
    apiKey: `your.apiKey`,
}
```


#### API Key / Authentication

Web Components uses API keys to authenticate with the FactFinder REST API.
You have to create an API key first and then provide it here to your Web Components application.
Refer to your FactFinder documentation for details on how to generate API keys.


### `ffParams` - Parameters for FactFinder requests

The `ffParams` section defines parameters that are relevant to various endpoints of the FactFinder REST API.
Once they are specified here, they will be added to all request types that accept them.

The `ffParams` section itself as well as each of its fields are optional.

```js
document.addEventListener(`ffCoreReady`, ({ factfinder, init, initialSearch }) => {
    init({
        ff: { ... },  // Section omitted for brevity.

        ffParams: {
            purchaserId: `optional string`,
            sid: `optional string`,
            userId: `optional string`
        },
    });
});
```


#### Session ID

If `sid` is empty and Web Components is unable to determine a session ID from the environment, a new random session ID will be generated and preserved across page loads.
Usually, you never have to set it.
You only need to set it if you want to force a particular session ID.


### `appConfig` - Application behavior

The `appConfig` section defines parameters that control how the client-side Web Components application behaves.
None of these parameters are sent to FactFinder.

The `appConfig` section itself and all of its fields are optional.
You only need to specify the fields you want to set.

The following example shows all available fields and their _default_ values.

```js
document.addEventListener(`ffCoreReady`, ({ factfinder, init, initialSearch }) => {
    init({
        ff: { ... },  // Section omitted for brevity.

        appConfig: {
            autoFetch: `SSR_ONLY`,       // Enum. Other allowed values: "ALWAYS_ON", "ALWAYS_OFF"
            categoryPage: undefined,     // Array of Filter
            dataBindingTags: undefined,  // Two-element array of String
            debug: false,                // Boolean
            fieldRoles: undefined,       // Object
            formatting: undefined,       // Object { locale, formatOptions }
            sandboxMode: false,          // Boolean
        },
    });
});
```


#### Auto fetching

The `autoFetch` parameter controls how Web Components elements behave when they are added to the DOM.
More generally, it affects all subscribers (predefined and custom) to the response pipeline.

When auto-fetching is active, subscribers to the response pipeline will be invoked immediately on registration and receive the last search result.

It takes one of three allowed values: `SSR_ONLY` (default), `ALWAYS_ON` and `ALWAYS_OFF`.
(They are case-sensitive.)

With `SSR_ONLY`, auto-fetching is not active from the beginning.
It becomes active when you use either `factfinder.response.dispatch.ssrSearch` or `factfinder.response.dispatch.ssrNavigation`.
Auto-fetching will remain active until a search or navigation request is triggered.
Use these when integrating [Server Side Rendering](/documentation/5.x/server-side-rendering).

`ALWAYS_ON` permanently sets auto-fetching to active while `ALWAYS_OFF` sets it inactive.


#### Category page

This property takes an array of _Filter_ objects as defined by the FactFinder API.
When this property is set, Web Components considers the current page to be a category page and behaves accordingly.

Examples of this behavior are:
- usage of the `/navigation` API endpoint instead of `/search`
- specified category filters are fixed in the `ff-asn` element and cannot be deselected
- click tracking events send the category path instead of the (non-existing) search query.

See [Category Pages](/documentation/5.x/category-pages) for details on usage.


#### Data binding tags

The `dataBindingTags` property allows you to specify different tags for the HTML data bindings.
This may be necessary to avoid conflicts when you are using Web Components together with a third party rendering framework that uses the same data binding tags.

Default tags:

```html
<ff-record>{{regular}}</ff-record>
<ff-record>{{{unescapedHtml}}}</ff-record>
```

Custom tags:

`dataBindingTags` takes an array of **two** string elements.
They must be different or the template engine will not be able to interpret the templates correctly.
Make sure to choose tags that do not occur anywhere else.

```js
init({
    appConfig: {
        dataBindingTags: [`[[`, `]]`],
    },
});
```
```html
<ff-record>[[regular]]</ff-record>
<ff-record>[[{unescapedHtml}]]</ff-record>
```

When using _unescaped HTML binding_, your template must use the custom tags plus a pair of **single** braces `{`,`}`.


#### Debug

A boolean value to define whether Web Components shall run in _debug_ or _live_ mode.

_Debug mode_ does not catch exceptions but instead lets them propagate as they occur.
After an error, the Web Components application will be in an **invalid state**.

There is also more logging.

It is advisable (but not required) to use this mode during development to find errors quickly.

_Live mode_ is the default setting.
It will catch errors and skip to the next operation in order to keep the application running without becoming unusable.
Errors will be logged to the browser's console, so it is still possible to detect and locate errors.

Be aware that even in _live mode_ errors may cause data corruption that put the application into a nonsensical state.
The most important aim of _live mode_ is to prevent system level exceptions that halt the browser's whole execution process.


#### Field Roles

By setting this property you can tell Web Components the field role mapping without waiting for a response from FactFinder.
Here you can override the field roles defined in FactFinder.

If unset, the first response with field roles from FactFinder will set it.

While most scenarios don't require this value to be set, it is still advisable to always do so to avoid unexpectedly encountering situations that do require this value.

You do need to set it when you want to issue requests that rely on the field roles, but you don't want to first invoke a search request.
This is typically limited to checkout-tracking requests.


#### Formatting / localization

With the `formatting` option you can define how the built-in formatters in the HTML templates behave.

For detailed explanation, see [Formatting](/documentation/5.x/formatting).

`formatting` takes an object with two properties `locale` and `formatOptions`.
These are the same values that you would pass to the platform-native `Intl.NumberFormat(locales, options)` constructor.
See [MDN for details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat).

Example:

```js
init({
    appConfig: {
        formatting: {
            locale: `en-GB`,
            formatOptions: {
                style: `currency`,
                currency: `GBP`,
            },
        },
    },
});
```


#### Sandbox mode

> Caution!
>
> Before you consider using sandbox mode, be sure to thoroughly study the [Sandbox Mode documentation](/documentation/5.x/sandbox-mode).

When `sandboxMode` is `true`, Web Components will not interact with the browser environment but instead invoke relevant listeners to notify you whenever Web Components _would_ have manipulated the environment.
From within these listeners you are free to invoke actions as your individual integration requires.

Sandbox mode is typically used in single-page-applications but may also provide the required flexibility whenever Web Components' history management conflicts with your integration.


## Re-configuration at runtime

The `factfinder.config` namespace allows you to interact with the application's configuration **at runtime**.

The involved data structures are the same as in the initialization described above.


### Get current config

`get` takes no arguments and returns a **copy** of the application's configuration.
Manipulating the returned object has no effect on the application's actual configuration.
The object has the same structure as the one you pass to `init` during initialization.
It is of type _Config_ (see [Type Definitions](/api/5.x/type-definitions)).

```js
factfinder.config.get()
```


### Set FF params

`setFFParams` updates the `ffParams` section of the configuration.
You only need to specify the fields you want to update.

```js
// All fields are optional.
factfinder.config.setFFParams({
    purchaserId,  // String (pass `undefined` to unset value)
    sid,          // String (pass `undefined` to unset value)
    userId,       // String (pass `undefined` to unset value)
});
```


### Set application config

`setAppConfig` updates the `appConfig` section of the configuration.
You only need to specify the fields you want to update.

```js
// All fields are optional.
factfinder.config.setAppConfig({
    autoFetch,        // String enum
    categoryPage,     // Array of _Filter_ objects as defined by the FF API (pass `undefined` to unset value)
    dataBindingTags,  // Array of String (pass `undefined` to unset value)
    debug,            // Boolean
    fieldRoles,       // Object (pass `undefined` to unset value)
    formatting: {     // Object (pass `undefined` to unset value)
        locale,
        formatOptions,
    },
    sandboxMode,      // Boolean
});
```
