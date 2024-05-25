## Template Engine

---
All `{{data-bindings}}` used in FactFinder Web Components refer to the underlying JSON response returned by FactFinder.

You can take a look at all available bindings by opening your browser's **Dev Tools** (__press F12 key__) and navigating to the **Network** tab.
Filtering by **XHR** makes things easier.

> Important
>
> For backward compatibility the response received from FactFinder NG is transformed into the pre-NG format.
> While it is mostly identical, you cannot reliably refer to the response reported by the browser to lookup your data bindings.
> Instead, inspect the actual data that arrives at the elements.

To inspect the incoming data, go to your browser's console and register a [topic listener](/api/4.x/core-result-dispatcher) at the `ResultDispatcher`.
The most interesting topics here are probably `result` and `suggest`.

![Register topic listener](/images/templateEngine/register-topic-listener.PNG "Register topic listener")

Next trigger a search (through e.g. the search box or the filters), and the response data as delivered to the elements will be printed.
From here you can inspect it for the required data bindings.

![Inspect result](/images/templateEngine/inspect-result.PNG "Inspect result")

Every element with a visual component is bound to one of these objects.
For example the `ff-record-list` element is bound to the `records` array and `ff-record` elements are bound to one array element each. The `ff-asn` element receives `groups`.

> Note
>
> The template engine HTML escapes the content of those data bindings.
> If you want the data to be interpreted as HTML, use triple curly braces like `{{{data-binding}}}`.

### Danger of Cross Site Scripting (XSS)

Be aware that any JavaScript included in your `{{{data-binding}}}` will be executed if put in triple curly braces.

This is potentially dangerous where values from the URL are inserted.
An example is the [Breadcrumb Trail](/api/4.x/ff-breadcrumb-trail) with `{{{text}}}` for items of type `search`.
Following a malicious URL could result in unwanted code running in the user's browser.

### Data Binding Example

By expanding the records array and one of its items we can take a look at the fields returned by
FactFinder.
In this specific example product data is stored in a record object.
All fields returned in this object are imported during the data feed process.
The fields to be returned can be configured in the FactFinder UI.

![record_json.PNG](/images/templateEngine/record_json.PNG "slots")

Consider the following data-binding example to see how to access the data.
```html
<ff-record-list>
    <ff-record>
        <div>Title: {{record.Title}}</div>
        <div>position: {{position}}</div>
    </ff-record>
</ff-record-list>
```

## Underlying Engine (mustache.js)

---
FactFinder Web Components uses **mustache.js** as the engine to resolve its HTML templates.
Please refer to the official documentation for available features and their usage:

[https://github.com/janl/mustache.js/](https://github.com/janl/mustache.js/#mustachejs---logic-less-mustache-templates-with-javascript)

For example, you can render parts of your template conditionally by using [this syntax](https://github.com/janl/mustache.js/#false-values-or-empty-lists):

```html
<ff-record>
    <div>{{record.Title}}</div>
    {{#record.isOnSale}}
        <div>Special discount: {{record.Discount}}</div>
    {{/record.isOnSale}}
</ff-record>
```

In the example above, only when `record.isOnSale` holds a truthy value will the contained `div` with _"Special discount"_ be rendered.

As **mustache.js** does not offer logic in templates, your data must adhere to a certain format in some situations.
If the data to be displayed is not provided in the required format, use [ResultDispatcher.addCallback()](/api/4.x/core-result-dispatcher) to modify it accordingly.

### Clashes with Third Party Frameworks' Data Binding

Most front-end frameworks provide their own data binding syntax.
As it stands, `{{ }}` seems to be the most popular choice for these data bindings.

This often leads to conflicts when you are embedding FactFinder Web Components in third party frameworks.
Typically, your framework resolves all data bindings _before_ the resulting HTML is accessible to Web Components.

> Important
>
> Make sure that your framework renders the Web Components HTML templates with intact data bindings.

To combat such conflicts your framework might offer a way to render parts of your template verbatim.

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
You can do so by setting the `mustache-delimiters` attribute on [ff-communication](/api/4.x/ff-communication#tab=api) accordingly.
For example:

```html
<ff-communication
    mustache-delimiters="[[,]]"
></ff-communication>
```

This allows you to define your HTML templates like this:

```html
<ff-template>
    <div>Regular binding: [[name]]</div>
    <div>HTML binding: [[{html}]]</div>
</ff-template>
```
