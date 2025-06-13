## For Developers

When you are integrating FactFinder with Web Components, there are multiple resources that provide essential information.
This page lists these most commonly needed resources along with tips and tricks and other workflow examples.

> Attention
>
> Study this page and the listed resources carefully to increase your chances of a smooth and successful integration.


### Disambiguation

There is often confusion about the difference between _FactFinder_ and _FactFinder Web Components_.

_FactFinder_ is the product discovery engine that runs **on the server**, has its own UI, and provides the REST API.

_FactFinder Web Components_, typically shortened to just _Web Components_, is the **front-end library** that provides HTML building blocks and a JavaScript interface to simplify both communication with _FactFinder_ and visualization of its responses.

In the front-end application, _Web Components_ creates a global object `factfinder` for you to access the JavaScript interface.
It is called `factfinder` because _Web Components_ is part of the _FactFinder_ ecosystem.
This reference does not point to _FactFinder_ itself, but to the _Web Components_ library.

Whenever we talk about the product discovery engine running on the server, we say _FactFinder_.

When we talk about the front-end JavaScript library, we say _Web Components_ (even though the JavaScript reference is called `factfinder`).


### Essential Documentation

> Important
>
> Keep the following pieces of documentation nearby whenever you are working with Web Components.
> You will need these very frequently.


#### REST API documentation

Even though Web Components deals with the communication between front-end and FactFinder's REST API, you still need a thorough understanding of the data structures that are defined by it.
Web Components does not abstract or otherwise modify these data structures in a significant way and they are not documented on this site.

If you are unsure where to find your REST API documentation, please contact your FactFinder consultant.


##### Special emphasis on `SearchParams`

`SearchParams` is the most important data structure defined by the FactFinder REST API.
It is required for every search request and appears numerous times in search and other types of responses.

Every time you want to customize a search request (e.g. add a custom filter), you will have to work with `SearchParams`.
Take some time to get a good understanding of this data structure.

Web Components takes care of the default processing and provides a small number of tools to work with `SearchParams`.
But the customization options are almost limitless and only you know what exactly your application needs.


#### Core API

Before you start building your Web Components application, study the pages of the Core API subsection of the documentation's API section.
It is advisable to take in this information **before** you start integrating.

The [API Overview](/api/5.x/core-overview) will give you a good understanding of Web Components' JavaScript API which should be a solid foundation to plan your application.
All parts of the API are explained here.
Also, the embedded listing of the entire API structure is an important resource to consult frequently when you are building your application.

The [Request Pipelines](/api/5.x/request-pipelines) contain several diagrams visualizing the flow of data and events through the Web Components application.
Every single customization to the Web Components data flow requires knowledge of the request/response pipelines.
These diagrams help you make the right decisions about which pipeline hook to use or which flag to toggle.

The [Configuration](/api/5.x/core-configuration) is probably most important during the initial phase of your Web Components integration.
It is essential to get started.
At later stages of development, you are probably going to visit this page less frequently.

The [Type Definitions](/api/5.x/type-definitions) provide indispensable information on the types used throughout the Web Components API.
There are too many type to remember so it is best to come back to this page frequently.


#### Pipeline Diagrams

The importance of the [Request Pipelines](/api/5.x/request-pipelines) cannot be emphasized enough.
Familiarize yourself with every single fork and entry point of the data pipelines.
Without understanding these, there is basically no chance of a successful Web Components integration.

The diagrams contain references to the related API.
These work hand in hand with the [API Overview](/api/5.x/core-overview) and the [Type Definitions](/api/5.x/type-definitions).


#### Migration Guide

If you are migrating from version `4.x`, the [Migration Guide](/documentation/5.x/upgrade-guide) is a must-have.
It provides you with the essentials of the new version condensed in a single page.


### Tips to aid the development of your application

#### Demos

See the Demos repository on GitHub to find examples of how to set up each component of the Web Components library.
Also, there are several examples of common customizations.
Browse through them for inspiration.

https://github.com/FACT-Finder-Web-Components/demos


#### Playground Page

It can be helpful to set up a playground page to familiarize yourself with Web Components and experiment.
Each of the examples in the Demos repository is a great starting point for such a page.

The `ff-record-list` demo is very suitable.
It is not too complex and yet provides good visual feed back already.

https://github.com/FACT-Finder-Web-Components/demos/blob/release/5.x/ff-record-list/index.html

Make sure to change the FactFinder config to your instance of FactFinder so you can work with your own dataset.


#### Browser Console

The browser console is of course an invaluable tool during development and debugging.
You can test requests and see how FactFinder responds, or generally explore the Web Components API and try things out.

Whenever your Web Components application is not behaving as expected, always check the browser console first for errors and warnings.


#### Debug Mode

You can set the Web Components application to debug mode.
Exceptions in your custom pipeline subscribers will not be caught but instead bubble up as they occur.
This can help identify problems sooner because the application will not continue after an error.
In live mode, the default, exceptions are caught to try to prevent disruption of the user experience.

See more at [Configuration](/api/5.x/core-configuration).


### Example workflow

#### General

Here is a general example of which resources to consult when you want to manipulate the data flow of the Web Components application:

1. See [Request Pipelines](/api/5.x/request-pipelines)
2. Find suitable pipeline hook, entry point, etc.
3. Go to [API Overview](/api/5.x/core-overview) for exact API and type signature
4. Look up relevant (Web Components) data structures at [Type Definitions](/api/5.x/type-definitions)
5. Look up relevant (FactFinder) data structures at your FactFinder REST API documentation
6. Implement your customization


#### Concrete

And here is a more concrete example.
Suppose you want to add a custom filter to a request that is issued by Web Components after user interaction.

1. Check [Request Pipelines](/api/5.x/request-pipelines) for suitable pipeline hook
2. Find `request.before` pipeline hook
3. Go to [API Overview](/api/5.x/core-overview) for required parameters
   - Find `request.before.search`
   - Identify type signature: `(CancellableSubscriber RequestInfoSearch) => SubscriberID`
4. Go to [Type Definitions](/api/5.x/type-definitions)
   - Look up `CancellableSubscriber`
   - Look up `RequestInfoSearch`
5. `RequestInfoSearch` contains FactFinder type `SearchParams`, therefore go to your FactFinder REST API documentation to look up `SearchParams`
6. Build filter object
   - Potentially using `utils.filterBuilders`
   - See [API Overview](/api/5.x/core-overview)
7. Add filter object to `SearchParams` object in `RequestInfoSearch` parameter

```js
factfinder.request.before.search(requestInfoSearch => {
    const { searchParams } = requestInfoSearch;

    // Inspect what `searchParams` currently looks like.
    console.log(searchParams);
    debugger;

    searchParams.filters = searchParams.filters || [];

    // This example assumes that the 'Size' filter does not already exist in `filters`.
    // If it does, the custom filter value has to be added to the existing 'Filter' object.
    searchParams.filters.push(factfinder.utils.filterBuilders.filter(`Size`, `L`));
});
```

Even this small example had to make assumptions about what the `SearchParams` object actually looks like at runtime.
This shows how important it is that you have a good understanding of the `SearchParams` object.


### Common patterns

#### Get a reference to the last search result

When you need to manually issue a FactFinder request based on the current search state, it is helpful to have the last search result stored in a convenient place.

Web Components does not offer this feature directly but you can implement it yourself quite easily.

```js
let lastResult;
factfinder.response.subscribeSearchAndNavigation(result => { lastResult = result; });
```

`lastResult` could be a global variable that you can access at any time.
Where it eventually resides in your application is a decision only you can make.

`subscribeSearchAndNavigation` is a convenient pipeline hook that triggers on both `/search` and `/navigation` responses.
With this hook you don't need to distinguish between the two request types that almost never occur together on a single page.
It allows you to use the same code block on search result and category pages.


### How to read the Web Components version number?

The version number of the Web Components library is composed of three segments with the following pattern:

`breaking.feature.fix`

Additional to bugfixes, `fix` also includes improvements.

Note that `breaking` changes can have a very wide range of impact.
It can be as trivial is fixing a typo in the public API, but it can also mean a complete replacement of the entire API.
Always check the [Release Notes](https://github.com/FACT-Finder-Web-Components/ff-web-components/releases) and migration guides to see how much, or whether at all, a breaking change affects you.

Also note that this version number only applies to the Web Components library.
Other components of the FactFinder ecosystem, such as the shop platform plugins, have their own version numbers that may follow different rule sets.


### FactFinder and Web Components compatibility

Web Components supports the latest version of FactFinder at the time of its release.
Your FactFinder instance is typically always up to date, and it is very unlikely that your Web Components version is ever ahead of your FactFinder version.
Even if it is, there are usually no issues to be expected.

However, it can happen, although rare, that a FactFinder update adds parameters to the REST API that your current Web Components version does not recognize.
In this case, Web Components might throw an error during data validation.

If this happens, inspect the error message and see the [Web Components Changelog](https://github.com/FACT-Finder-Web-Components/ff-web-components/releases) whether a fix is already available.

> Even better
>
> Always keep your Web Components version up to date.
> The recent release frequency has been about once a month.


### Best Practices

There is only one best practice:
Keep your Web Components version up to date.

Experience has shown that no two integrations are alike.
Each integration has its individual requirements and constraints.
There are no plug-and-play code snippets that work for a majority of environments.

Consider yourself the first person to build something the way you are about to build it.

Explore.
Try things out.
You know your application and environment better than anybody else.
