## Server Side Rendering

Server Side Rendering (SSR) is a technique which enables pre-rendering a whole page's HTML on the server side before sending it back to the client.
There are a couple of benefits in using this approach:
* HTML content is available to web crawlers for scanning which is important for SEO
* Unified performance, conditioned by the application server, not the user's web browser

With SSR, an application server responds with a page that is viewable but not yet functional.
Then the client side part of the application renders the HTML once again making it fully functional for the user.
Opposite to SSR stands CSR (client side rendering) which is the standard way of running web applications.
With this approach the server returns raw HTML, often containing framework-specific tags, which should not be visible to the user.
Then the client side application renders the fully viewable page.
However, the rendered result is not available to scanning bots as they only scan the HTML returned by the server.
This might be an issue where an application renders business critical content (e.g. an e-shop rendering products) and has the effect that search engines will never index such applications properly as they have no chance to detect what the real and full page content is.

To ensure that users can properly promote their websites on the Internet, Web Components' `ff-record-list` has been enhanced with SSR capability.
The paragraphs below will show you how to implement SSR in your application.
Please keep in mind that the server side part is not a full tutorial, just a set of hints.
The variety of technologies makes it impossible to fully describe each step in implementing such a solution.


### Server Side

#### Sending a search request

In order to render records on the server side, the server side part of your application needs to query the FactFinder REST API to retrieve relevant product data.

When you are pre-rendering products for a regular **search result page**, you typically query the `/search` endpoint.
For a **category page**, or similar, you typically query the `/navigation` endpoint.


#### Pre-rendering

With the response from the request above, you need to prepare a specific view object representing a page to be output.
At this stage, records fetched from FactFinder should be converted into `ff-record` elements.
To do so, you may want to use a template engine which hydrates raw templates with real data.
Web Components uses the _Handlebars_ [template engine](/documentation/5.x/template-engine) which is based on _mustache.js_, so it may be the easiest to use its server side counterpart.

Example libraries (the whole list of libraries can be found at [mustache.github.io](https://mustache.github.io/)):
* java: https://github.com/spullara/mustache.java
* PHP: https://github.com/bobthecow/mustache.php

> Note
>
> You are not limited to _mustache_.
> You can use any template engine your platform supports.
> The advantage of using _mustache_ here is that you can use the same templates as in Web Components.


#### Sending the response

The response to the browser contains the pre-rendered HTML and the raw response ready to be used by Web Components.
The most convenient way to make the response available to use by Web Components is to store it as JSON in a variable.

```html
<script>
    const rawResponse = JSON.parse(RESPONSE_TEXT);
</script>
```

> Note
>
> `RESPONSE_TEXT` in the example above represents the response text received from FactFinder.
> The way it is passed to a variable depends on the used framework.

This step concludes the server side part.
It does not exhaust the subject though.

At this point, `ff-record-list` should look the same as if it was rendered on the client side (with the difference of not being fully interactive).
It should be considered as a mock and must be replaced with another instance - this time rendered by Web Components.


### Client Side

#### HTML setup

First, the `ff-record-list` element needs the `ssr` attribute.
The pre-rendered `ff-record` elements go directly inside the `ff-record-list` element.

```html
<ff-record-list ssr>
    <!-- Put pre-rendered records here. -->
</ff-record-list>
```


##### Record template

As the pre-rendered `ff-record` elements do not contain data bindings, Web Components cannot use them as a template to render new records.
Therefore, the `ff-record` template must be specified separately.

```html
<ff-record-list ssr>
    <template data-role="record">
        <!-- Put the `ff-record` element template here. --->
    </template>
</ff-record-list>
```

See the `ff-record-list` [documentation](/api/5.x/ff-record-list#tab=docs) for more details about its template.


##### Record insertion point

The `ff-record` template doubles as marker where `ff-record-list` inserts new records.
When `ff-record-list` updates, already rendered `ff-record` elements will be reused.
If there aren't enough `ff-record` elements to be reused for the new result, they will be created and inserted at the `ff-record` template's location.

Therefore, it is important to always place the insertion marker **after** the pre-rendered records, otherwise the order in which records are rendered may get compromised.

```html
<ff-record-list ssr>
    <!-- Pre-rendered records from server-side request. -->
    <ff-record class="someClass">Product title 1</ff-record>
    <ff-record class="someClass">Product title 2</ff-record>

    <!-- Always add the ff-record template AFTER the records. -->
    <template data-role="record">
        <ff-record class="someClass">{{variantValues.0.Title}}</ff-record>
    </template>
</ff-record-list>
```


##### Example

Here is a schematic example of the complete HTML setup.

```html
<ff-record-list ssr>
    <div>Custom HTML before records.</div>

    <ff-record class="someClass">Product title 1</ff-record>
    <ff-record class="someClass">Product title 2</ff-record>
    <ff-record class="someClass">Product title 3</ff-record>
    <ff-record class="someClass">Product title 4</ff-record>

    <template data-role="record">
        <ff-record class="someClass">{{variantValues.0.Title}}</ff-record>
    </template>

    <div>Custom HTML after records.</div>
</ff-record-list>
```


#### Dispatching the response

After setting up the HTML, the only thing left to do is dispatch the response to Web Components using the `response.dispatch` API.
See [Response API](/api/5.x/core-response) for details regarding this utility.

Dispatching the response via `dispatch.ssrSearch(Result)` or `dispatch.ssrNavigation(Result)` will trigger `ff-record-list` to replace pre-rendered records with the actual ones.

Whether to use `dispatch.ssrSearch(Result)` or `dispatch.ssrNavigation(Result)` depends on the page type you are dispatching data for.
This call must match the request type you used on the server side (see above).

```html
<script type="text/javascript">
    document.addEventListener(`ffCoreReady`, ({ factfinder, init, initialSearch }) => {
        const result = JSON.parse(RESPONSE_TEXT);

        factfinder.response.dispatch.ssrSearch(result);
        // Or `ssrNavigation` if you are on a category page.
        // factfinder.response.dispatch.ssrNavigation(result);
    });
</script>
```


#### No initial search required

Dispatching the raw response replaces the initial search request that is typically triggered through the `initialSearch` function of the `ffCoreReady` event handler.

```js
document.addEventListener(`ffCoreReady`, ({ factfinder, init, initialSearch }) => {
    init({ ... });
    factfinder.response.dispatch.ssrSearch(result);

    // `initialSearch` is not required when dispatching an SSR result.
});
```
