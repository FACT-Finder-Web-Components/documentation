## Your First Search

---
We recommend to use the [ff-record-list demo](https://github.com/FACT-Finder-Web-Components/demos/blob/master/ff-record-list/index.html) as a starting point.

This lightweight demo has only `39 lines of html code` (already including boilerplate) and is therefore predestinated to get you up and running while not overwhelming you. 

If you want a **quick overview** about all possible features and features already included in the demo please refer to the [API documentation](api/ff-record-list) of the ff-record-list element.

The following sections will cover all necessary steps to adjust the demo to fit your setup.

### Change Configuration

---
In case you skipped previous sections please read more about the configuration [here](documentation/configuration).

What you definitely want to change first is the `url`, `channel` and the `version` attribute. If you dont know the channel name or your FACT-Finder version please refer to the FACT-Finder UI.

````html
<ff-communication url="http://your-ff.fact-finder.de/ContextName"
                  version="yourFFVersion"
                  default-query="bagpack"
                  channel="YourChannel"
                  search-immediate>
</ff-communication>
````

In most cases the `default-query` backpack won't make sense for your shop. If you know a good query like `trousers` if you are selling clothes you can change the `default-query`. If not just remove the attribute entirely and it will default to an `*` which is the shorthand for searching for every product.


### Change Template Strings

--- 
The data used to display product information is provided by the csv file you've used to teach FACT-Finder about your product data. 

**This product data is returned in a 1:1 manner meaning a field named `price` in the csv file will appear in the JSON `record` property as `price`(case sensitive).**

You have to change all `data-bindings` (e.g. `{{record.Title}}` -> `{{record.productNameField}}`) to match the field names provided by your csv file. 

If you want to read more about the `Template Engine` refer to the [Template Engine documentation](documentation/template-engine)




 