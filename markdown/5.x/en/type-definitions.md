This article lists types and data structures used in the Web Components library.


## Types and data structures from the FactFinder REST API

These types are already documented in FactFinder and are not covered any further here.
Consult your FactFinder documentation for details.

It is also advisable to familiarize yourself with those API terms and explore the REST API.
This should help you greatly in finding your way around the FactFinder/Web Components ecosystem.


### Explicitly defined data structures

The following are some examples of data types that are **explicitly defined** by the FactFinder REST API.
You will find them in the definitions of responses and POST requests.

POST requests are used for search, navigation, suggest and tracking.
Note that Web Components takes care of choosing the correct HTTP method.

- _SearchParams_
- _NavigationParams_
- _Filter_
- _Result_
- _PredictiveBasketResult_
- _ClickEvent_


### Pseudo-types derived from the REST API

Pseudo-types are not explicitly defined by the REST API.
The names defined here do not appear in the REST API documentation.

Typically, they are a collection of request parameters to GET requests.
You can look up their contents in the definitions of the related endpoints.
In the Web Components context these parameter lists are translated into the following pseudo-types:

- _CampaignPageParams_
- _CampaignProductParams_
- _CampaignShoppingCartParams_
- _CompareParams_
- _NavigationCategoryParams_
- _PredictiveBasketParams_
- _RecommendationParams_
- _RecordsParams_
- _SimilarParams_

Another pseudo-type is:

- _FieldRoles_

Its fields are not fixed.
You configure them in your FactFinder UI.


## Types and data structures defined by Web Components

Web Components introduces some types that only live within the Web Components library context.
While some may contain data that is relevant to the REST API, others are entirely for operational purposes in the front-end.

Some examples:

- _SearchOptions_
- _RequestOptions_
- _Subscriber_
- _CancellableSubscriber_
- _RequestInfoSearch_

Also, there are a few types that describe behavior.

- _Required_
- _Optional_


## Definitions

Required fields or fields that are always present are marked with `*`.


### Subscriber

```
Subscriber a b
(a, b) => void
```

A function that takes two parameters and does not return anything.
It is intended to be used by data consumers.

The first parameter is of type `a`.  
The second parameter is of type `b`.

Example:

`Subscriber CampaignsResult RequestInfoCampaignPage`
- `a` will be `CampaignsResult`
- `b` will be `RequestInfoCampaignPage`

```js
(campaignsResult, requestInfoCampaignPage) => {

}
```


### CancellableSubscriber

```
CancellableSubscriber a
(a) => Boolean
```

A function that takes a parameter of type `a` and returns a `Boolean`.
It can interrupt the pipeline process when `false` is returned.

Example:

`CancellableSubscriber RequestInfoSearch`
- `a` will be `RequestInfoSearch`

```js
(requestInfoSearch) => {
    return false;
}
```


### Transformer

```
Transformer a b
(a, b) => a
```

A function that takes two parameters and returns a value of the same type as the first parameter.
It is used to modify response data before it is dispatched to consumers.

The first parameter is of type `a`.  
The second parameter is of type `b`.  
Return type is `a`.

Example:

`Transformer PredictiveBasketResult RequestInfoPredictiveBasket`
- `a` will be `PredictiveBasketResult`
- `b` will be `RequestInfoPredictiveBasket`
- `return` type will be `PredictiveBasketResult`

```js
(predictiveBasketResult, requestInfoPredictiveBasket) => {
    return predictiveBasketResult;
}
```


### RequestOptions

```
RequestOptions
{
    headers:            Headers,  // Platform-native 'Headers' object (see MDN).
    channel:            String,   // The FF channel which the request shall target. Changing it does not affect global config.
    origin:             Origin,   // Information provided by the request invoker.
    requestOnly:        Boolean,  // If true, no subscribers (public and internal) or transformers are invoked. See pipeline diagram.
    skipBeforeHandlers: Boolean,  // If true, no before-handlers (e.g. before.search) are invoked.
}
```

All fields are optional and may be omitted.


### SearchOptions

```
SearchOptions
{
    searchControlParams: SearchControlParams,  // See FactFinder REST API.
    sid:                 SessionID,
    userId:              String,
    userInput:           String,

    requestOptions: RequestOptions,
    initial:        Boolean,         // If true, the request replaces browser history state instead of pushing a new entry.
                                       // Necessary for the first request after navigating to the result page.
                                       // Will be true if request was triggered by `initialSearch` during `ffCoreReady` event.
    withoutHistory: Boolean,         // If true, the request does not manipulate the browser history.
}
```

All fields are optional and may be omitted.


### NavigationOptions

```
NavigationOptions
{
    searchControlParams: SearchControlParams,  // See FactFinder REST API.
    sid:                 SessionID,
    userId:              String,

    requestOptions: RequestOptions,
    initial:        Boolean,         // If true, the request replaces browser history state instead of pushing a new entry.
                                       // Necessary for the first request after navigating to the result page.
                                       // Will be true if request was triggered by `initialSearch` during `ffCoreReady` event.
    withoutHistory: Boolean,         // If true, the request does not manipulate the browser history.
}
```

All fields are optional and may be omitted.


### Config

```
Config
{
    ff*: {
        apiKey*:  ApiKey,
        channel*: String,
        url*:     String,
    },
    ffParams:  ConfigFFParams,
    appConfig: ConfigAppConfig,
}
```


### ConfigFFParams

These parameters are sent to FactFinder with all requests that accept them.

```
ConfigFFParams
{
    purchaserId: String,     // Pass `undefined` to unset current value.
    sid:         SessionID,  // Pass `undefined` to unset current value.
    userId:      String,     // Pass `undefined` to unset current value.
}
```

All fields may be set to `undefined`.
Doing so will unset the value currently stored in the config state.


### ConfigAppConfig

These parameters control the behavior of the Web Components application.

```
ConfigAppConfig
{
    autoFetch:       String,        // Allowed values: "SSR_ONLY" (default), "ALWAYS_ON", "ALWAYS_OFF"
    categoryPage:    Array Filter,  // Pass `undefined` to unset current value.
    dataBindingTags: Array String,  // Must be a two-element array. Pass `undefined` to unset current value.
    debug:           Boolean,       // Debug mode. (Default: false)
    fieldRoles:      FieldRoles,    // Pass `undefined` to unset current value.
    formatting: {                   // Pass `undefined` to unset current value.
        locale:        String,
        formatOptions: Object,      // Same options as in platform-native `Intl.NumberFormat(locales, options)`.
    },
    sandboxMode:     Boolean,       // Default: false
}
```

`categoryPage` is an array of FactFinder REST API `Filter` objects.


### RequestInfo types (search-like requests)

```
RequestInfoCampaignPage
{
    campaignPageParams*: CampaignPageParams,
    requestOptions:      RequestOptions,
}
```

```
RequestInfoCampaignProduct
{
    campaignProductParams*: CampaignProductParams,
    requestOptions: RequestOptions,
}
```

```
RequestInfoCampaignShoppingCart
{
    campaignShoppingCartParams*: CampaignShoppingCartParams,
    requestOptions: RequestOptions,
}
```

```
RequestInfoCompare
{
    compareParams*: CompareParams,
    requestOptions: RequestOptions,
}
```

```
RequestInfoNavigation
{
    navigationParams*: NavigationParams,
    navigationOptions: NavigationOptions,
}
```

```
RequestInfoNavigationCategory
{
    navigationCategoryParams*: NavigationCategoryParams,
    requestOptions: RequestOptions,
}
```

```
RequestInfoPredictiveBasket
{
    predictiveBasketParams*: PredictiveBasketParams,
    requestOptions: RequestOptions,
}
```

```
RequestInfoRecommendation
{
    recommendationParams*: RecommendationParams,
    requestOptions: RequestOptions,
}
```

```
RequestInfoRecords
{
    recordsParams*: RecordsParams,
    requestOptions: RequestOptions,
}
```

```
RequestInfoSearch
{
    searchParams*: SearchParams,
    searchOptions: SearchOptions,
}
```

```
RequestInfoSimilar
{
    similarParams*: SimilarParams,
    requestOptions: RequestOptions,
}
```

```
RequestInfoSuggest
{
    suggestParams*: SuggestParams,
    requestOptions: RequestOptions,
}
```


### RequestInfo types (tracking requests)

```
RequestInfoTrackCartOrCheckout
{
    events*: Array CartOrCheckoutEvent,
    requestOptions: RequestOptions,
}
```

```
RequestInfoTrackClick
{
    events*: Array ClickEvent,
    requestOptions: RequestOptions,
}
```

```
RequestInfoTrackLandingPageClick
{
    events*: Array LandingPageClickEvent,
    requestOptions: RequestOptions,
}
```

```
RequestInfoTrackLogin
{
    events*: Array LoginEvent,
    requestOptions: RequestOptions,
}
```

```
RequestInfoTrackPredBasketClick
{
    events*: Array PredBasketClickEvent,
    requestOptions: RequestOptions,
}
```

```
RequestInfoTrackRecommendationClick
{
    events*: Array RecommendationClickEvent,
    requestOptions: RequestOptions,
}
```


### Miscellaneous types

#### ApiKey

```
ApiKey
String
```

An ordinary string.


#### SessionID

```
SessionID
String
```

An ordinary string.


#### SubscriberID

```
SubscriberID
String
```

An ordinary string.


#### NonEmptyArray

```
NonEmptyArray a
[a]
```

An array that must have at least one element of type `a`.

Example:

`NonEmptyArray ClickEvent`
- all elements must be of type `ClickEvent`


#### Required and Optional

```
Required a
```

```
Optional a
```

These two type modifiers appear in parameter lists.
If a parameter is marked as `Required`, it must be provided or an error will occur.
A parameter marked as `Optional` may be omitted.

For example the signature of the `request.search` function:

`(Required SearchParams, Optional SearchOptions) => Promise Result`
- `searchParams` must always be passed
- `searchOptions` can be omitted


#### Origin

The `Origin` type can by anything.
It is used by request invokers to provide information about where the request is coming from to later steps of the request/response pipeline.

If a request is invoked by a Web Components element, the origin will be a reference to the DOM-element that invoked the request.
If you invoke requests manually, it will be absent by default, but you a free to set it to whatever value you require.

The origin is helpful to implement behavior depending on where a request originated.
