## Setup the communication
Add the `ff-communication` tag to every page that uses **FACT-Finder Web Components**.
This element is used to define certain parameters for the communication between FACT-Finder Web Components and FACT-Finder and their behavior.
You need to configure the location of your FACT-Finder Server and the target channel by setting the `url` and `channel` HTML attributes.

The `ff-communication` element has more attributes.
One example is the `default-query` attribute used to define a default search term that is always used on page load.
When using the `search-immediate` attribute, which requires no parameter, the search query is fired once the page has finished loading.

The following code-example shows the aforementioned configuration.

```html
<ff-communication
        url="https://web-components.fact-finder.de/FACT-Finder"
        version="ng"
        api="v5"
        channel="bergfreunde-co-uk"
        default-query="backpack"
        search-immediate
></ff-communication>
```
`url`, `version` and `channel` are mandatory parameters and should be explicitly set to make the components work correctly.
In addition, if you are using FACT-Finder NG, you also have to specify the API version of your FACT-Finder in the `api` attribute.

For more information, see the [API reference](/api/4.x/ff-communication#tab=api).


### Order of attributes is important

Browsers may differ in the order they process an element's attributes.
Some attributes depend on others and may cause incorrect behaviour or even errors if defined in the wrong order.

To ensure correct configuration across browsers, the first attributes you define on `ff-communication` should always be:

- `url`
- `version`
- `api` (can omit if using FACT-Finder older than NG)
- `channel`
