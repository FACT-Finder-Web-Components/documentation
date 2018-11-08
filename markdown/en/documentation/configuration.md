## Configuration

---
This chapter describes the minimal configuration necessary to search and retrieve results from FACT-Finder. You can configure the communication via the custom element `ff-communication` or directly via JavaScript.

### A minimal configuration consists of the following settings:

#### **URL**
Specify the FACT-Finder endpoint. Please note the context name `/FACT-Finder-7.2`. It is not sufficient to provide the top-level domain like `http://web-components.fact-finder.de/` which will result in an error.

**Note:** Make sure you are using the same protocol (http://, https://) for the `url` setting and webapp. Using `url="http://web-components.fact-finder.de/FACT-Finder-7.2"` on a page hosted via **HTTPS** will result in an error.

---

#### **version**
Specify the FACT-Finder version. E.g. `7.2` or  `7.3`.

---

#### **channel** 
Specify the name of the channel which is used for the search. You can find the available channels in the FACT-Finder UI.

---

## Web Components Approach
```html
<body>
    <ff-communication url="http://web-components.fact-finder.de/FACT-Finder-7.2"
                      version="7.2"
                      channel="bergfreunde-co-uk"
                      search-immediate>
    </ff-communication>
```

**IMPORTANT**

**The** `ff-communication` **element must be the first FF Web Component in DOM order!**

[Read Why](documentation/ready-events)

We recommend placing the `ff-communication` element immediately after the `body` tag to reduce the risk of accidental reordering. Furthermore we advise to add a comment explaining this requirement. For example:
```html
<!-- The ff-communication element sets up the FF Web Components and must not be moved!
     All other FF Web Components must be placed hereafter. -->
```

#### **search-immediate**
The `search-immediate` attribute ensures, that a search is automatically triggered as soon as `ff-communication` was successfully attached to the DOM. The triggered search request uses the current URL parameters in conjunction with the settings provided by `ff-communication`-attributes. If no search query is provided through the URL or an attribute `*` will be used as default (search for all products). 

**NOTE**

You don't want the `search-immediate` attribute to be present on your landing (home) page because this would trigger a search every time a user enters your shop. Usually you only want to use it on category pages and the search result page.


## JavaScript Approach
While `ff-communication` provides a declarative way to configure the communication, it is also possible to do so directly via JavaScript as followed:

```js
document.addEventListener("ffReady", () => { // "ffReady"-event ensures global factfinder object to exist
    factfinder.communication.globalSearchParameter.url = "http://web-components.fact-finder.de/FACT-Finder-7.2";
    factfinder.communication.globalSearchParameter.version = "7.2";
    factfinder.communication.globalSearchParameter.channel = "bergfreunde-co-uk";
    
    /* after this minimal configuration, a search can be triggered manual e.g. through */
    factfinder.communication.FFCommunicationEventAggregator.addFFEvent({
         type: "search",
         query: "*"
    });
});
``` 

**NOTE**

To prevent FACT-Finder Web Components from missing a factfinder response, before they are loaded, dispatching of results to subscribers is cached and deferred until all components are ready to receive the response. As soon as FACT-Finder Web Components have finished loading `ff-communication` calls `factfinder.communication.ResultDispatcher.startDispatching()`. If `ff-communication` is not used, `factfinder.communication.ResultDispatcher.startDispatching()` has to be called manually in JavaScript.

Also we discourage the direct use of custom JavaScript configuration and strongly recommend to configure everything through FACT-Finder Web Components, you might take a closer look at [ff-core.d.ts](https://github.com/FACT-Finder-Web-Components/ff-web-components/blob/master/dist/ff-core.d.ts). Every configuration can also be done using JavaScript.