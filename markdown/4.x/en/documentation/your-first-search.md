## Your First Search

---
We recommend using the [ff-record-list demo](https://github.com/FACT-Finder-Web-Components/demos/blob/release/4.x/ff-record-list/index.html) as a starting point. It is lightweight and therefore ideal to get familiar with FACT-Finder Web Components.

If you want a **quick overview** about all possible features, please refer to [`ff-record-list`](/api/4.x/ff-record-list#tab=docs) in the API documentation.

The following sections cover all necessary steps to adjust the demo to fit your setup.

### Change Configuration

---
In case you skipped previous sections please read more about the configuration [here](/documentation/4.x/configuration).

First, you want to change the `url`, `channel`, `version` and possibly the `api` attributes.
If you don't know the channel name or FACT-Finder version, please refer to your FACT-Finder UI.

```html
<ff-communication url="http://your-ff.fact-finder.de/ContextName"
                  version="yourFFVersion"
                  api="yourFFAPIVersion"
                  default-query="backpack"
                  channel="YourChannel"
                  search-immediate>
</ff-communication>
```

In most cases the `default-query="backpack"` won't make sense for your shop. Simply change it to a term suitable to your product range. If you don't want to specify a default query term, just remove the attribute entirely and it will default to `*` which is the shorthand for searching for all products.


### Change Template Strings

---
The data used to display product information is provided by the CSV file you specified in the FACT-Finder UI to teach FACT-Finder about your product data.

**This product data is returned in a one-to-one manner.** This means that a field named `Price` in the CSV file will also appear as `Price` (case sensitive) in the `searchResult.records[index].record` property of the HTTP response's JSON.

The same `record` object is also available in several FACT-Finder Web Components. You can insert its values into your custom HTML using the double curly braces syntax `{{record.Title}}`. Here is an example using the [`ff-record`](/api/4.x/ff-record-list#tab=docs) element:

```html
<ff-record>
    <img data-image="{{record.ImageName}}" data-image-onerror="shop123.com/error.png">
    <span>{{record.Title}}</span>
    <span>{{record.Price}}</span>
</ff-record>
```

See the [Template Engine documentation](/documentation/4.x/template-engine) for more details on this topic.
