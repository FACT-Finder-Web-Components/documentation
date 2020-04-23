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
Due to the feature's limitations described below, it will be removed in a future version.

In order to prevent infinite redirection after getting back from a product page to the search results page, an internal `ff-no-redirect` flag is toggled after the first redirection takes place.
With this flag toggled Web Components will not redirect the next search, even if there is only one record returned back from FACT-Finder.
However, the next search will not necessarily be the one that was issued after returning to the search results page.
If the user provides an `ff-searchbox` component on the product page, the next search could also be issued from there.
Single hit redirect in this case will not work because the `ff-no-redirect` flag is toggled on and as a result the user will land on the search result page.
After that, the `ff-no-redirect` flag is turned off, and the next search request will be redirected, as expected.

The other reason is that e-commerce platforms using Web Components are, in most cases, not an SPA (single page application).
This kind of application requires developers to manage routing in the application's frontend to provide redirection to a search result page.
For more details about routing, please refer to [Routing in non-SPA websites](documentation/3.x/routing).
Although it is easy to detect whether a triggered event is a search or not, it is impossible to detect at this level if a given request will return one or more records in the response.
Because of that, if search is triggered on page different than search result page (e.g. from home page), user need be redirected to a search result page first and only after that the Web Components redirects to product page, if they have to.
