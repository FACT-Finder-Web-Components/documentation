## Configuration

---
This chapter describes the minimal configuration necessary to search and retrieve results from FACT-Finder.
You can configure the communication via the custom element `ff-communication` or directly via JavaScript.

### A minimal configuration consists of the following settings:

#### **URL**
Specify the FACT-Finder endpoint.
Please note the context name `/FACT-Finder`.
It is not sufficient to provide the top-level domain like `https://web-components.fact-finder.de/` which will result in an error.

> Note
>
> Make sure you are using the same protocol (`http://`, `https://`) for the `url` setting and webapp.
> Using `url="http://web-components.fact-finder.de/FACT-Finder"` on a page hosted via **HTTPS** will result in an error.

---

#### **version**
Specify the FACT-Finder version. E.g. `ng` or  `7.3`.

---

#### **api**
When using FACT-Finder **NG**, specify the FACT-Finder **API** version. E.g. `v5`, `v4`, `v3` or `v2`.

---

#### **channel**
Specify the name of the channel which is used for the search.
You can find the available channels in your FACT-Finder UI.

---

## FACT-Finder Web Components Approach
```html
<body>
    <ff-communication url="https://web-components.fact-finder.de/FACT-Finder"
                      version="ng"
                      api="v5"
                      channel="bergfreunde-co-uk"
                      search-immediate
    ></ff-communication>
```

> Important
>
> The `ff-communication` element must be the first FACT-Finder Web Component in DOM order!

[Read why](/documentation/4.x/ready-events).

We recommend placing the `ff-communication` element immediately after the `body` tag to reduce the risk of accidental reordering.
Furthermore, we advise to add a comment explaining this requirement.
For example:
```html
<!-- The ff-communication element sets up the FF FACT-Finder Web Components and must not be moved!
     All other FACT-Finder Web Components must be placed hereafter. -->
```

#### **search-immediate**
The `search-immediate` attribute ensures, that a search is automatically triggered as soon as `ff-communication` was successfully attached to the DOM.
The triggered search request uses the current URL parameters in conjunction with the settings provided by `ff-communication` attributes.
If no search query is provided through the URL or an attribute, `*` will be used as default (search for all products).

> Note
>
> You don't want the `search-immediate` attribute to be present on your landing (home) page because this would trigger a search every time a user enters your shop.
> Usually you only want to use it on category pages and on the search result page.


## JavaScript Approach
While `ff-communication` provides a declarative way to configure the communication, it is also possible to do so directly via JavaScript as follows:

```js
document.addEventListener("ffReady", function (event) { // "ffReady" event ensures global factfinder object exists
    const factfinder = event.factfinder;
    const eventAggregator = event.eventAggregator;

    factfinder.communication.globalSearchParameter.url = "https://web-components.fact-finder.de/FACT-Finder";
    factfinder.communication.globalSearchParameter.version = "ng";
    factfinder.communication.globalCommunicationParameter.ngApi = "v5";
    factfinder.communication.globalSearchParameter.channel = "bergfreunde-co-uk";

    /* after this minimal configuration, a search can be triggered manually e.g. through */
    eventAggregator.addFFEvent({
         type: "search",
         query: "*"
    });
});
```

Although the entire configuration can be done using JavaScript, we discourage direct use of custom JavaScript to do so and strongly recommend configuring everything through FACT-Finder Web Components.

> Caution
>
> Web Components' JavaScript API has been stable for a while and changes are introduced very carefully.
> Nevertheless, there is no guarantee for its stability, and therefore it is not documented any further.
> Future versions are planned to put more focus on JavaScript approaches.
