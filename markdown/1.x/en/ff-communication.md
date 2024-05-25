## Setup the communication
Add the `ff-communication` tag to every page that uses
**FactFinder Webcomponents**. This element is used to define certain
parameters for the communication between FactFinder Web Components and FactFinder
and their behavior. You need to configure the location of your
FactFinder Server and the target channel by setting the `url` and
`channel` HTML attributes.

The `ff-communication` element has more attributes. One example is the
`default-query` attribute used to define a default search term that is
always used on pageload. When using the `search-immediate` attribute,
which requires no parameter, the search query is fired once the page has
finished loading.

The following code-example shows the aforementioned configuration.

```html
<ff-communication url="http://web-components.fact-finder.de/FACT-Finder7.3-Demoshop"
                  version="7.3"
                  default-query="backpack"
                  channel="bergfreunde-co-uk"
                  search-immediate>
</ff-communication>
```

`url`, `channel` and `version` are mandatory parameters and should be explicitly set to make the components work
correctly.

For more information, see the [API reference](/api/1.x/ff-communication#tab=api).