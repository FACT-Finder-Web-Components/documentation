This article gives an overview of the Web Components JavaScript API.
It touches on all parts of the API and occurring types without going too deep into each topic.
Links to detailed articles on particular topics are provided where necessary.


## Terminology

### Ecosystem

The distinction between _FactFinder_ and _Web Components_ has been a source of confusion in the past.
It is important to understand this distinction to be able to provide the correct context during support processes.

_FactFinder_ refers to the product discovery engine and its REST API that is running on the **server**.

_(FactFinder) Web Components_ refers to the JavaScript library that runs **client-side** in the browser.

This documentation focuses on the _Web Components_ JavaScript library.


### Data Structures and other types

Web Components uses the data structures from the **FactFinder REST API**.
Therefore, these data structures are documented only superficially here.
For full details please refer to your FactFinder documentation.

It is advisable to familiarize yourself with those API terms as they appear frequently throughout the documentation and during support threads.

The explanation provided here shall help you better identify the location of where and how these types are defined for whenever you need to look up details.

The following are some examples of data types that are **explicitly defined** by the FactFinder REST API.
You will find them in the definitions of responses and POST requests.
(POST requests are used for search, navigation, suggest and tracking.)

- _SearchParams_
- _NavigationParams_
- _Filter_
- _Result_
- _PredictiveBasketResult_
- _ClickEvent_

The FactFinder REST API also has several endpoints that are only accessible through GET requests (Web Components takes care of choosing the right HTTP method).
The definitions of these endpoints don't define a dedicated data structure for their parameters, but instead they provide a list of parameters.
In the Web Components context these parameter lists are translated into **pseudo-types**.
These names do not appear in the REST API documentation.

- _CampaignProductParams_
- _PredictiveBasketParams_
- _RecordsParams_
- _FieldRoles_

Then, Web Components introduces some data types that only live within the Web Components library context.
While some may contain data that is relevant to the REST API, others are entirely for operational purposes in the front-end.

- _SearchOptions_
- _RequestOptions_
- _Subscriber_
- _CancellableSubscriber_
- _RequestInfoSearch_

Also, there are a few types that describe behavior.

- _Required_
- _Optional_


See [Type definitions](/api/5.x/type-definitions) for details.


## Characteristics of the API

Some characteristics of the API are
- strict input validation
- predictable types

Input validation rejects invalid data formats at the entry level of the request and therefore prevents unnecessary network traffic.
Data violations are reported in the browser console with details about what exactly caused the violation.

The types of parameters and return values are, with only a few exceptions, always the same for a given function.
This shall ensure data predictability and reduce the necessity to examine data before acting on it as was necessary in older versions' catch-all type of functions.


## API Access

To access the Web Components JavaScript API you subscribe to the `ffCoreReady` event which is emitted on `document` as soon the Web Components core is ready to use.

```js
document.addEventListener(`ffCoreReady`, ({ factfinder, init, initialSearch }) => {

});
```

Note that this event is emitted **only once**.
Make sure to add the event listener **before** the Web Components library finishes loading.

The event handler receives an event object with three additional properties.

- `factfinder`
  - A reference to the Web Components API, also called _Core_.
- `init`
  - A function that **must be called exactly once** before the event handler returns and before `initialSearch` is invoked.
    It takes various parameters to initialize the Web Components application.
    Failing to call it correctly results in the Web Components library to throw an exception.
- `initialSearch`
  - A function to invoke the initial search request.
    It invokes either a _Search_ or a _Navigation_ request depending on whether the application is configured for regular search result pages or category pages.
    Always use this function for the initial search request as it handles the browser history differently from regular search requests.

See [Initialization of the Web Components application](/api/5.x/core-configuration) for details on usage and available options.

After the `ffCoreReady` event, the `factfinder` reference will also be available globally on the `window` object.

```js
window.factfinder
```


## Core API

The core's structure is as follows:

```js
factfinder: {
    request: {
        campaignPage:         (Required CampaignPageParams, Optional RequestOptions) => Promise CampaignsResult,
        campaignProduct:      (Required CampaignProductParams, Optional RequestOptions) => Promise CampaignsResult,
        campaignShoppingCart: (Required CampaignShoppingCartParams, Optional RequestOptions) => Promise CampaignsResult,
        navigation:           (Required NavigationParams, Optional NavigationOptions) => Promise Result,
        navigationCategory:   (Required NavigationCategoryParams, Optional RequestOptions) => Promise CategoryNavigation,
        predictiveBasket:     (Required PredictiveBasketParams, Optional RequestOptions) => Promise PredictiveBasketResult,
        recommendation:       (Required RecommendationParams, Optional RequestOptions) => Promise RecommendationResultWithFieldRoles,
        records:              (Required RecordsParams, Optional RequestOptions) => Promise FlatRecordsResult,
        search:               (Required SearchParams, Optional SearchOptions) => Promise Result,
        similar:              (Required SimilarParams, Optional RequestOptions) => Promise SimilarProductsWithFieldRoles,
        suggest:              (Required SuggestParams, Optional RequestOptions) => Promise SuggestionResult,
        before: {
            campaignPage:         (CancellableSubscriber RequestInfoCampaignPage) => SubscriberID,
            campaignProduct:      (CancellableSubscriber RequestInfoCampaignProduct) => SubscriberID,
            campaignShoppingCart: (CancellableSubscriber RequestInfoCampaignShoppingCart) => SubscriberID,
            compare:              (CancellableSubscriber RequestInfoCompare) => SubscriberID,
            navigation:           (CancellableSubscriber RequestInfoNavigation) => SubscriberID,
            navigationCategory:   (CancellableSubscriber RequestInfoNavigationCategory) => SubscriberID,
            predictiveBasket:     (CancellableSubscriber RequestInfoPredictiveBasket) => SubscriberID,
            recommendation:       (CancellableSubscriber RequestInfoRecommendation) => SubscriberID,
            records:              (CancellableSubscriber RequestInfoRecords) => SubscriberID,
            search:               (CancellableSubscriber RequestInfoSearch) => SubscriberID,
            similar:              (CancellableSubscriber RequestInfoSimilar) => SubscriberID,
            suggest:              (CancellableSubscriber RequestInfoSuggest) => SubscriberID,
        },
    },
    response: {
        subscribeCampaignPage:         (Subscriber CampaignsResult RequestInfoCampaignPage) => SubscriberID,
        subscribeCampaignProduct:      (Subscriber CampaignsResult RequestInfoCampaignProduct) => SubscriberID,
        subscribeCampaignRedirect:     (CancellableSubscriber ({ campaign: Campaign,
                                                                 result: Result,
                                                                 requestInfo: Optional (RequestInfoNavigation | RequestInfoSearch)
                                                              })) => SubscriberID,
        subscribeCampaignShoppingCart: (Subscriber CampaignsResult RequestInfoCampaignShoppingCart) => SubscriberID,
        subscribeNavigation:           (Subscriber Result (Optional RequestInfoNavigation)) => SubscriberID,
        subscribeNavigationCategory:   (Subscriber CategoryNavigation RequestInfoNavigationCategory) => SubscriberID,
        subscribePredictiveBasket:     (Subscriber PredictiveBasketResult RequestInfoPredictiveBasket) => SubscriberID,
        subscribeRecommendation:       (Subscriber RecommendationResultWithFieldRoles RequestInfoRecommendation) => SubscriberID,
        subscribeRecords:              (Subscriber FlatRecordsResult RequestInfoRecords) => SubscriberID,
        subscribeSearch:               (Subscriber Result (Optional RequestInfoSearch)) => SubscriberID,
        subscribeSimilar:              (Subscriber SimilarProductsWithFieldRoles RequestInfoSimilar) => SubscriberID,
        subscribeSuggest:              (Subscriber SuggestionResult (Optional RequestInfoSuggest)) => SubscriberID,
        subscribeSearchAndNavigation:  (Subscriber Result (RequestInfoNavigation | RequestInfoSearch)) => SubscriberID,
        unsubscribe:                   (SubscriberID) => Boolean,
        transformCampaignPage:         (Transformer CampaignsResult RequestInfoCampaignPage) => undefined,
        transformCampaignProduct:      (Transformer CampaignsResult RequestInfoCampaignProduct) => undefined,
        transformCampaignShoppingCart: (Transformer CampaignsResult RequestInfoCampaignShoppingCart) => undefined,
        transformCompare:              (Transformer CompareResult RequestInfoCompare) => undefined,
        transformNavigation:           (Transformer Result (Optional RequestInfoNavigation)) => undefined,
        transformNavigationCategory:   (Transformer CategoryNavigation RequestInfoNavigationCategory) => undefined,
        transformPredictiveBasket:     (Transformer PredictiveBasketResult RequestInfoPredictiveBasket) => undefined,
        transformRecommendation:       (Transformer RecommendationResultWithFieldRoles RequestInfoRecommendation) => undefined,
        transformRecords:              (Transformer FlatRecordsResult RequestInfoRecords) => undefined,
        transformSearch:               (Transformer Result (Optional RequestInfoSearch)) => undefined,
        transformSimilar:              (Transformer SimilarProductsWithFieldRoles RequestInfoSimilar) => undefined,
        transformSuggest:              (Transformer SuggestionResult (Optional RequestInfoSuggest)) => undefined,
        dispatch: {
            navigation:                (Result, Optional RequestInfoNavigation) => Result,
            navigationBeforeTransform: (Result, Optional RequestInfoNavigation) => Result,
            search:                    (Result, Optional RequestInfoSearch) => Result,
            searchBeforeTransform:     (Result, Optional RequestInfoSearch) => Result,
            suggest:                   (SuggestionResult, Optional RequestInfoSuggest) => SuggestionResult,
            ssrNavigation:             (Result, Optional RequestInfoNavigation) => Result,
            ssrSearch:                 (Result, Optional RequestInfoSearch) => Result,
        },
    },
    tracking: {
        cart:                (Required (NonEmptyArray CartOrCheckoutEvent), Optional RequestOptions) => Promise undefined,
        checkout:            (Required (NonEmptyArray CartOrCheckoutEvent), Optional RequestOptions) => Promise undefined,
        click:               (Required (NonEmptyArray ClickEvent), Optional RequestOptions) => Promise undefined,
        landingPageClick:    (Required (NonEmptyArray LandingPageClickEvent), Optional RequestOptions) => Promise undefined,
        login:               (Required (NonEmptyArray LoginEvent), Optional RequestOptions) => Promise undefined,
        predbasketClick:     (Required (NonEmptyArray PredBasketClickEvent), Optional RequestOptions) => Promise undefined,
        recommendationClick: (Required (NonEmptyArray RecommendationClickEvent), Optional RequestOptions) => Promise undefined,
        before: {
            cart:                (CancellableSubscriber RequestInfoTrackCartOrCheckout) => SubscriberID,
            checkout:            (CancellableSubscriber RequestInfoTrackCartOrCheckout) => SubscriberID,
            click:               (CancellableSubscriber RequestInfoTrackClick) => SubscriberID,
            landingPageClick:    (CancellableSubscriber RequestInfoTrackLandingPageClick) => SubscriberID,
            login:               (CancellableSubscriber RequestInfoTrackLogin) => SubscriberID,
            predbasketClick:     (CancellableSubscriber RequestInfoTrackPredBasketClick) => SubscriberID,
            recommendationClick: (CancellableSubscriber RequestInfoTrackRecommendationClick) => SubscriberID,
         },
    },
    config: {
        get:          () => Config,
        setFFParams:  (Required ConfigFFParams) => undefined,
        setAppConfig: (Required ConfigAppConfig) => undefined,
    },
    notifications: {
        addSuggestClickListener:    (CancellableSubscriber Origin) => undefined,
        setSuggestDetailListener:   (Subscriber Origin) => undefined,
        setSuggestUnmappedListener: (Subscriber Origin) => undefined,
    },
    routing: {
        setNavigateListener:        ((url, origin) => Boolean) => undefined,
        setUrlParamOptionsListener: (() => UrlParamMappingOptions) => undefined,
        sandboxed: {
            restoreHistory:               (historyPayload) => undefined,
            setHistoryWriteListener:      (historyPayload => undefined) => undefined,
            setSessionReadWriteListeners: ({ read, write }) => undefined,
        },
    },
    utils: {
        env: {
            searchParamsFromUrl: (options) => SearchParams,
        },
        filterBuilders: {
            categoryFilter: (name, path) => Filter,
            filter:         (name, values) => Filter,
        },
        formatters: {
            add: (name, fn) => undefined,
        },
        toNavigationParams: (SearchParams) => NavigationParams,
    },
    version: String,
}
```

> Note
>
> At various locations you will encounter an `origin` parameter.
> Its value can be anything including `undefined`.
>
> If a request is invoked by a Web Components DOM-element, `origin` will be a reference to that DOM-element.
> If you invoke a request manually, it will be `undefined` by default, and you have the option to set it to anything you deem suitable.
>
> This parameter can help you identify the source of a request and implement appropriate behavior.


### Request

Functions in this namespace reflect the relevant FactFinder REST API endpoints.
They are used to invoke requests to FactFinder which first travel through the [request pipeline](/api/5.x/request-pipelines) before being emitted over the network.
The pipeline offers various hooks for customizations.

The functions' first parameter is an object with all parameters as the FactFinder REST API defines for the specific endpoint.
You can look up available parameters in your REST API documentation.

The second parameter is optional and is used to define various options to the request pipeline's behavior.

All functions in this namespace return a `Promise` that resolves to the relevant FactFinder result after the request/response pipeline completes.
Note that this `Promise` rejects on server responses that are not `200`.
This is different from the `Promise` returned by the platform-native `fetch`.


#### 'before' pipeline hooks

The `request.before` sub-namespace offers pipeline hooks to register subscribers that are called before the related request is issued to FactFinder.
This can be useful for adding additional data to the request, for diverting the request to a different target, or even for cancelling the request.

See the [pipeline diagram](/api/5.x/request-pipelines) for the exact moment the subscribers are invoked during the request process.

Subscribers in this namespace are of type `CancellableSubscriber`.
They are a callback function that receives one argument, a _RequestInfo_ object, of the type mentioned above.
It is an object composed of the parameters received when the request was invoked.
These are the request parameters (e.g. `SearchParams` for `search` requests, `CampaignPageParams` for `campaignPage` requests) and the request options, both supplemented with global default values when applicable.

Examples:
```js
factfinder.request.before.campaignPage(({ campaignPageParams, requestOptions }) => { ... })
factfinder.request.before.navigation(({ navigationParams, navigationOptions }) => { ... })
factfinder.request.before.predictiveBasket(({ predictiveBasketParams, requestOptions }) => { ... })
factfinder.request.before.search(({ searchParams, searchOptions }) => { ... })
```

When the `CancellableSubscriber` returns `false`, the request pipeline halts and no request is emitted.
This is useful when setting up **page redirects** because, here, the result of the FactFinder request from the issuing page would be discarded anyway.
It is also useful if you need to interrupt the automatic pipeline processing and resume later manually.


### Response

Functions in this namespace are used to interact with the response part of the pipeline after the request returns from FactFinder.
They enable you to manipulate and consume the FactFinder response.


#### Subscribers

The subscribers are invoked after all data manipulation is done and after the Web Components received their data.
They are intended to be data outlets for **rendering components and other data consumers**.
See the [pipeline diagrams](/api/5.x/request-pipelines) for a visualization of when the subscribers are invoked.

You can register as many subscribers as you like.
Subscribers are called in the order they were registered.
Return values of subscribers are discarded.

`subscribe<Endpoint>` functions (e.g. `subscribeSearch` or `subscribeSuggest`) take a _subscriber function_ and return the subscriber's auto-generated ID.

`factfinder.response.unsubscribe(subscriberID)` lets you remove a subscriber by passing its subscriber ID that you received when registering it.

Subscriber functions, when invoked by the response pipeline, receive two parameters:
- The first is the FactFinder result data of the type specified above.
- The second is the _RequestInfo_ object that is also available to the `request.before` subscribers.

```js
factfinder.response.subscribeSuggest((suggestionResult, requestInfo) => {
  // suggestionResult: is `SuggestionResult` from the FactFinder REST API

  // requestInfo: contains the endpoint-specific params object
  // and the `requestOptions` object that were used to invoke the request.
  // {
  //   suggestParams,  // This would be `campaignPageParams`, `recommendationParams`, etc. for other endopints.
  //   requestOptions,
  // }
});
```


##### Special cases

The _RequestInfo_ object for subscribers to `/search` or `/navigation` consists of the REST API's `SearchRequest` or `NavigationRequest` object respectively, minus their `params` field but instead with a `requestOptions` field like in subscribers to other endpoints.

```js
factfinder.response.subscribeSearch((result, requestInfoSearch) => {
  // result: is `Result` from the FactFinder REST API

  // requestInfoSearch:
  // {
  //   searchParams,
  //   searchOptions: {
  //     searchControlParams,
  //     sid,
  //     userId,
  //     userInput,
  //
  //     requestOptions,
  //   },
  // }
});
```

Another special case is the `factfinder.response.subscribeSearchAndNavigation` subscription.
Depending on whether the `/search` or the `/navigation` endpoint was queried, the second argument to the subscriber is either `RequestInfoSearch` or `RequestInfoNavigation`.
Also important to note is that subscribers to `subscribeSearch` and `subscribeNavigation` will be invoked **before** those subscribed to `subscribeSearchAndNavigation`.

And lastly, subscribers to `factfinder.response.subscribeCampaignRedirect` also receive different arguments.
See type definition above.

> Pro tip!
>
> Remember, you can always inspect the arguments to subscribers by logging them to the browser's console or by setting a breakpoint.

```js
factfinder.response.subscribeSearchAndNavigation((...args) => {
  console.log(...args);
  debugger;
});
```


#### Transformers

Transformers are used to manipulate a FactFinder result **before** it is dispatched to the Web Components.
They receive the endpoint's result and a _RequestInfo_ object as specified in the type definition above.

Like regular subscribers, you can register as many transformers as you like.
They are called in the order they were registered.

Note however, that transformers must return the manipulated result, or an error will be emitted.
The returned result from a transformer will be passed to the next transformer.

See the [pipeline diagram](/api/5.x/request-pipelines) for the exact moment in the response pipeline when transformers are invoked.

Examples:

```js
factfinder.response.transformSearch((result, requestInfoSearch) => {
    const manipulatedResult = manipulateResult(result);
    return manipulatedResult;
});
```

```js
factfinder.response.transformPredictiveBasket((predictiveBasketResult, requestInfoPredictiveBasket) => {
    const manipulatedResult = manipulateResult(predictiveBasketResult);
    return manipulatedResult;
});
```


#### Dispatching manually

You can manually invoke the response pipeline by sending data through the [various entry points](/api/5.x/request-pipelines) in the `response.dispatch` namespace.

Functions in this namespace take the data to be dispatched and an optional `RequestInfo` object.
This object would usually be produced on the request side of the pipeline.
Provide it if there is information necessary to the steps in the response pipeline.

Data dispatched this way goes through the same process as data that is coming directly from FactFinder.
All eligible subscribers will be invoked.
The Web Components application does not distinguish between manually and automatically dispatched responses.

The `response.dispatch.search` function, for example, invokes the response pipeline to the `/search` API endpoint.

For _Server Side Rendering_, use `response.dispatch.ssrSearch` for dispatching your SSR result on search result pages and `response.dispatch.ssrNavigation` on category pages.
These two functions will cause DOM elements to receive their relevant data whenever they connect to the DOM without having to consider rendering delays.


### Tracking

Functions in the `tracking` namespace communicate with their respective API endpoint.
They take an array of tracking events and a request options object.
The array must have at least one element or an error will be thrown.

The tracking functions return a `Promise` that resolves when the request completes.
There is no response data and no response pipeline will be triggered.
These functions are request-only.

```js
factfinder.tracking.checkout([
    { id: `123-456`, count: 2 },
    { id: `234-567`, count: 1 },
]);
```


#### 'before' pipeline hooks

The `tracking.before` sub-namespace offers functions to subscribe to the [tracking request pipeline](/api/5.x/request-pipelines) for manipulation.
The mechanics are the same as those in the `request.before` namespace.

Registered subscribers receive a _RequestInfo_ object with two properties.
- `events` - an array of the tracking event objects that were passed to the related tracking function
- `requestOptions` - an object with options to control the request pipeline (same as in `request.before` namespace)

You can cancel the request by returning `false` from a subscriber.

Example:

```js
factfinder.tracking.before.checkout(requestInfoTrackCartOrCheckout => {
    // Cancel tracking request under a certain condition.
    if (requestInfoTrackCartOrCheckout.events.length < 2) return false;

    // Manipulate `event` objects before sending them to FactFinder.
    requestInfoTrackCartOrCheckout.events.forEach(event => {
        event.count += 1;
    });
});
```


### Config

The `config` namespace is for interacting with the application's configuration **at runtime**.
The initial configuration/initialization is discussed [in this article](/api/5.x/core-configuration).

You can update parts of the application's configuration at runtime with the functions in this namespace.
The objects to pass have the same structure as their relevant counterparts on the config object during the application's initialization.

For details on the parameters' purposes, see the [Initialization of the Web Components application](/api/5.x/core-configuration) section.

`get` takes no argument and returns a **copy** of the application's configuration.
Manipulating the returned object has no effect on the application's actual configuration.
The object has the same structure as the one you pass to `init` during initialization.

```js
factfinder.config.get()
```

`setFFParams` updates the library's configuration with parameters that are relevant to multiple FactFinder API endpoints.
These parameters will appear in all requests to the FactFinder API that accept them.
The function takes an object with the following fields:

```js
// All fields are optional.
factfinder.config.setFFParams({
    purchaserId,  // String (pass `undefined` to unset value)
    sid,          // String (pass `undefined` to unset value)
    userId,       // String (pass `undefined` to unset value)
});
```

`setAppConfig` updates the library's configuration with parameters that are exclusively relevant to how the client-side application behaves.
It takes an object with the following fields:

```js
// All fields are optional.
factfinder.config.setAppConfig({
    autoFetch,        // String enum
    categoryPage,     // Array of _Filter_ objects as defined by the FF API (pass `undefined` to unset value)
    dataBindingTags,  // Array of String (pass `undefined` to unset value)
    debug,            // Boolean
    fieldRoles,       // Object (pass `undefined` to unset value)
    formatting: {     // Object (pass `undefined` to unset value)
        locale,         // String
        formatOptions,  // Same as `options` object in platform-native `Intl.NumberFormat(locales, options)`.
    },
    sandboxMode,      // Boolean
});
```


### Notifications

Some Web Components, before entering the request pipeline, go through the notifications pipeline first.
There you can register event listeners in a central location independent of the current DOM tree.

See the [pipeline diagram](/api/5.x/request-pipelines) for details.


#### Suggest-related notifications

All suggest-related listeners receive a reference to the clicked `ff-suggest-item` through their `origin` parameter.

Multiple click-listeners can be added.

```js
factfinder.notifications.addSuggestClickListener(origin => {
    // Return `false` to prevent the pending request from being sent.
    // Returning `false` does NOT prevent other click listeners from being invoked.

    // return false;
});
```

The detail-listener is invoked when a suggest-item with a type specified in `ff-suggest`'s `request-mapping-detail` attribute is clicked.

```js
factfinder.notifications.setSuggestDetailListener(origin => {

});
```

The unmapped-listener is invoked when a suggest-item is clicked whose type does not appear in any of `ff-suggest`'s `request-mapping` attributes.

```js
factfinder.notifications.setSuggestUnmappedListener(origin => {

});
```

For more details see [ff-suggest](/api/5.x/ff-suggest) and its API page.


### Routing

The `routing` namespace contains various tools to deal with routing related topics.
It also contains a sub-namespace `routing.sandboxed` that, when you run Web Components in [Sandbox Mode](/documentation/5.x/sandbox-mode), enables you to manually deal with all environment interactions that Web Components would usually do automatically.

`setNavigateListener` allows you to register a listener that is invoked whenever Web Components arrives at a point where it would navigate to a new page.
For example after clicking on a product suggestion that leads to a product detail page.

You can interrupt Web Components' attempt to navigate and handle it as your environment requires.

```js
factfinder.routing.setNavigateListener((url, origin) => {
    // `url` is the URL to which Web Components is about to navigate to.
    // `origin` is a reference to the DOM-element that initiated the navigation.

    window.location.href = `/my/custom/target`;

    return false;  // To prevent navigation by Web Components.
});
```

`setUrlParamOptionsListener` lets you register a handler that provides options to Web Components for translating _SearchParams_ to a URL string.
The handler is called before Web Components updates the URL and writes to the browser history.
It receives no arguments.

An example with the available options and their default values:

```js
factfinder.routing.setUrlParamOptionsListener(() => ({
    allow: [],
    block: [`activeAbTests`, `followSearch`, `purchaserId`],
    blockFilters: [],
    keyMapping: {},
    order: [`query`, `filters`, `sortItems`],
    postStringifier: undefined,
    stringifiers: {},
}));
```

See [URL Manipulation](/api/5.x/url-manipulation) for more details.


#### Sandbox mode

The functions in the `routing.sandboxed` namespace are only relevant when the Web Components application is configured to run in sandbox mode.
A typical use case is in single-page-applications.

These functions allow you to interface Web Components' history and session management with your application.

For details, see [Sandbox Mode](/documentation/5.x/sandbox-mode).


### Utils

The `factfinder.utils` namespace offers utilities to assist in various tasks.


#### Env

With the `searchParamsFromUrl` function you can build a _SearchParams_ object from the current URL.

This helps during the loading of a search result page where the search parameters shall be taken from the URL and passed to Web Components for the initial request to FactFinder.

The function accepts several options that allow you to translate URL parameters to FactFinder parameters.
Usually, the default settings should be good enough, but when you decide to customize the URL parameters through the `routing.setUrlParamOptionsListener` feature, you will have to provide the same options here.

More on this topic in [URL Manipulation](/api/5.x/url-manipulation).


#### Filter builders

When you want to add a custom filter to a request or to configure a category page, you have to provide the filter data in the correct format.
However, the data structure for FactFinder filters is rather complex and may be tedious to do manually.

The `utils.filterBuilders` namespace gives you some helpers to build the most common type of filter only from the filter's _name_ and _value_.
This filter will be OR-type.

`filterBuilders.categoryFilter(name, path)` takes the filter `name` and the category `path` in form of an _array of strings_.

`filterBuilders.filter(name, values)` takes the filter `name` and one or more `values`.
`values` can be either an individual value or an array of values.


#### Formatters

The `utils.formatters` namespace allows you to add custom formatters to the predefined ones that are used in the HTML templates.
These are typically used for localization and currency formatting.

See the [Formatting](/documentation/5.x/formatting) article for details.


#### Other

The `toNavigationParams` function converts a _SearchParams_ object to a _NavigationParams_ object that can be used for navigation requests.

You might find this function useful if you are invoking **navigation** requests manually.
The FactFinder API only returns _SearchParams_ even from the `/navigation` endpoint.
In order to generate follow-up request (like e.g. filtering on a category page), you have to convert those _SearchParams_ because the FactFinder API will reject them otherwise.



### Version

Use `factfinder.version` to see the version of the Web Components library.

If you are using Web Components in combination with one of our shop system SDKs (e.g. Magento, Shopware), there will be another property `factfinder.sdk` which tells you the version of that SDK.
