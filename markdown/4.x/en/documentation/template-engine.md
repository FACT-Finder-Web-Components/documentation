## Template Engine

---
All `{{data-bindings}}` used in FACT-Finder Web Components refer to the underlying JSON response returned by FACT-Finder.

You can take a look at all available bindings by opening your browsers **Dev Tools** (__Press F12 Key__) and navigating to the **Network** tab.
Filtering by **XHR** makes things easier.

> Important
>
> For backward compatibility the response received from FACT-Finder NG is transformed into the pre-NG format.
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
FACT-Finder.
In this specific example product data is stored in a record object.
All fields returned in this object are imported during the data feed process.
The fields to be returned can be configured in the FACT-Finder UI.

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

## Underlying Engine (Mustache)

---
All bindings are resolved by the underlying template engine [mustache.js](https://github.com/janl/mustache.js/#mustachejs---logic-less-mustache-templates-with-javascript).
 For a bit more flexibility you can rely on some of its functionalities.

For example, you can render parts of the template conditionally by using [this syntax](https://github.com/janl/mustache.js/#false-values-or-empty-lists).
If the data is not formatted correctly, use the [ResultDispatcher](/api/4.x/core-result-dispatcher) to modify it accordingly.

You can also change mustache.js default delimiters via `ff-communication`'s `mustache-delimiters` attribute in scenarios where double curly braces are already in use by your framework.
For example, setting it to `[[,]]` will allow you to bind the data as follows:
```html
<ff-template>
    <div>Regular binding: [[foo]]</div>
    <div>HTML binding: [[{htmlFoo}]]</div>
</ff-template>
```
