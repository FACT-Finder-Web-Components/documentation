## Setup the communication
Add the `ff-communication` tag to every page that uses
**FACT-Finder Web Components**. This element is used to define certain
parameters for the communication between FACT-Finder Web Components and FACT-Finder
and their behavior. You need to configure the location of your
FACT-Finder Server and the target channel by setting the `url` and
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
`url`, `channel` and `version` are mandatory parameters and should be explicitly set to make the the components work
correctly.

**NOTE**: Although `version` defaults to `7.2` when not set, it is recommended to set it as default value may change with feature releases.

For more information, see the [API reference](/api/3.x/ff-communication#tab=api).

### Single hit redirect deprecation
Due to limitations this functionality brings with it, it will be removed in future releases.
In order to prevent infinite redirection after getting back from product page to search result page with only one record, an internal `ff-no-redirect` flag
is toggled after the first time the single hit redirect works. With this flag toggled on Web Components will not redirect on the next search, even if there is only one record
returned back from the FACT-Finder. This approach assumes that the next search is the one, sent after getting back to the search result page. However, there is no guarantee that next search will be that one.
If for instance user includes`ff-searchbox` element on the product page, the next search could also be issued from here. Single hit redirect in this case will not work, because of `ff-no-redirect` flag is toggled
on and in result user will land on the search result page. After that, the `ff-no-redirect` flag is turned off, and the next search request will be redirected, as expected.

The other reason is that e-commerce platforms using Web Components are, in the most situations, not SPA (SPA stands for Single page application). That force developers to manage routing
on application frontend to provide redirection, for instance from home page to search result page. For more details about routing, please refer to [Routing in non-SPA websites](documentation/3.x/routing).
Although its easy to detect wheter triggered event is a search type or not, its impossible to detect if given request will return one or more records in the response on this level. Because of that, the redirection
to the search result page always need to be done before Web Components redirects to the product page, if they have to.
