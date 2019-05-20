## Template Engine

---
All `{{data-bindings}}` used in FACT-Finder Web Components refer to the underlying JSON response returned by
FACT-Finder.

You can take a look at all available bindings by opening your browsers **Dev Tools** (__Press F12
Key__) and navigating to the **Network** tab. Filtering by **XHR** makes things easier.
 
Now invoke the search, two xhr requests will appear. The second one is the one we are looking for. Click the request URL,
 a second window on the right will appear. Navigate to the **Preview** tab to see the data as a JSON tree.
 
![dev_tools_json7.PNG](/images/templateEngine/dev_tools_json7.PNG "slots")

Every element with an visual component is bound to one or more of these objects. For example the ff-record
element is bound to an item in the records array.

**Note** the content of those data bindings gets escaped. If you do not want that, e.g. when your data contains HTML which should be displayed, you can use triple braces like `{{{data-binding}}}`. **Be aware** that any JavaScript included in your `data-binding` will be executed if put in triple braces.

### Data Binding Example

---
By expanding the records array and one of it's items we can take a look at the fields returned by
FACT-Finder. In this specific example product data is stored in an record object. All fields returned in
this object are imported during the data feed process. You can configure which fields are returned in the
FACT-Finder backend.

![record_json.PNG](/images/templateEngine/record_json.PNG "slots")

Take a look at the following data-binding example to see how to access the data.
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
 For a bit more flexibility you can rely on some of it's functionality.

You could do an **if** by using [this](https://github.com/janl/mustache.js/#false-values-or-empty-lists) syntax. 
If the data is not formatted correctly, use the 
[ResultDispatcher](/api/1.x/core-result-dispatcher)
 to modify it accordingly.