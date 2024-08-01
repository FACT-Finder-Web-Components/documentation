## Template Engine

All `{{data-bindings}}` used in FactFinder Web Components refer to the underlying JSON response returned by FactFinder.

You can inspect the response data by opening your browser's **Dev Tools** (__press F12 key__) and navigating to the **Network** tab.
Filter by **Fetch/XHR** to find relevant requests more easily.
Requests to FactFinder and their response data will appear here.

Elements with a visual component (and a few others) pick the relevant portion of this data for rendering.
For example, the `ff-record-list` element takes the `hits` list from a search result and renders `ff-record` elements each supplied with one item from the `hits` list.
The `ff-asn` element takes the list of `facets` and generates its child elements from it.


### Danger of Cross Site Scripting (XSS)

The template engine HTML-escapes the content of data bindings.
If you want the data to be interpreted as HTML, use triple curly braces like `{{{data-binding}}}`.

> Note
>
> Be aware that any JavaScript included in your `{{{data-binding}}}` will be executed if put in triple curly braces.

This is potentially dangerous where values from the URL are inserted.
An example is the [Breadcrumb Trail](/api/5.x/ff-breadcrumb-trail) with `{{{item.text}}}` for items of type `search`.
Opening a malicious URL could result in unwanted code running in the user's browser.


### Data Binding Example

By expanding the `hits` array and one of its items in a search response, we can take a look at the fields returned by FactFinder.
The `hits` array holds a collection of `SearchRecord` objects.
(Note that this is the name defined by the FactFinder API. It does not appear in the response data.)
This is the product data.

All fields returned in these objects' `masterValues` and `variantValues` are imported from your data feed.
The fields to be returned can be configured in the FactFinder UI.

![Search response](/images/templateEngine/search-response-v5.png "search response")

Consider the following data-binding example to see how to access the data.

```html
<ff-record-list>
    <template data-role="record">
        <ff-record>
            <div>Title: {{variantValues.0.Title}}</div>
            <div>position: {{position}}</div>
        </ff-record>
    </template>
</ff-record-list>
```


## Underlying Template Engine

FactFinder Web Components uses **handlebars** as the engine to resolve its HTML templates.
Please refer to the official documentation for available features and their usage:

[https://handlebarsjs.com/](https://handlebarsjs.com/)

For example, you can render parts of your template conditionally by using [this syntax](https://handlebarsjs.com/guide/block-helpers.html#conditionals):

```html
<ff-record>
    <div>{{variantValues.0.Title}}</div>
    {{#if variantValues.0.Discount_Percent}}
        <div>Special discount: {{variantValues.0.Discount_Percent}}%</div>
    {{/if}}
</ff-record>
```

In the example above, only when `variantValues.0.Discount_Percent` holds a truthy value will the contained `div` with _"Special discount"_ be rendered.

As **handlebars** does not offer logic in templates, your data must adhere to a certain format in some situations.
If the data to be displayed is not provided in the required format, use the [Transform API](/api/5.x/core-response) to modify it accordingly.


### Clashes with third party frameworks' data binding

Most front-end frameworks provide their own data binding syntax.
As it stands, `{{ }}` seems to be the most popular choice for these data bindings.

This often leads to conflicts when you are embedding FactFinder Web Components in third party frameworks.
Typically, your framework resolves all data bindings _before_ the resulting HTML is accessible to Web Components.

> Important
>
> Make sure that your framework renders the Web Components HTML templates with intact data bindings.

To prevent such conflicts your framework might offer a way to render parts of your template verbatim.

An example with JSX syntax:

```jsx
return (
    <ff-template>
        <div>Regular binding: {'{{name}}'}</div>
        <div>HTML binding: {'{{{html}}}'}</div>
    </ff-template>
);
```

Another method that can provide a viable solution is to define custom delimiters to be used by Web Components' template engine.
You can do so by setting the `dataBindingTags` in the [Configuration](/api/5.x/core-configuration).
For example:

```js
document.addEventListener(`ffCoreReady`, ({ factfinder, init, initialSearch }) => {
    init({
        ff: {
            url: `https://your-instance.fact-finder.com/fact-finder`,
            channel: `your-channel`,
            apiKey: `your.apiKey`,
        },
        appConfig: {
            dataBindingTags: [`[[`, `]]`],
        },
    });
});
```

This allows you to define your HTML templates like this:

```html
<ff-template>
    <div>Regular binding: [[name]]</div>
    <div>HTML binding: [[{html}]]</div>
</ff-template>
```
