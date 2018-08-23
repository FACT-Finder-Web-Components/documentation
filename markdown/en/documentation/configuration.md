## Configuration

---
This chapter describes the bare minimum configuration necessary to search and retrieve results from FACT-Finder.

````html
<body>
    <ff-communication url="http://web-components.fact-finder.de/FACT-Finder-7.2"
                      version="7.2"
                      channel="bergfreunde-co-uk"
                      search-immediate>
    </ff-communication>
````

**IMPORTANT**

**The `<ff-communication></ff-communication>` element has to be the first FF Web Component in DOM order!**

[Read Why](documentation/ready-events)

We recommend putting the `ff-communication` element right after the `body` tag. This way no one can mess up the order.

It's advisable to add a comment explaining this requirement.

### Used attributes

---
#### **url**
Specify the FACT-Finder endpoint. Please note the context name `/FACT-Finder-7.2` it's not sufficient to provide the toplevel domain like `http://web-components.fact-finder.de/` will result in an error.
**NOTE**
Make sure you are using the same protocol for the `url` attribute and webapp. 

Using `<ff-communication url="http://web-components.fact-finder.de/FACT-Finder-7.2" ...>` on a page hosted via **HTTPS** (like https://example-shop.com) will result in an error ().

---

#### **version**
Specify the FACT-Finder version. E.g. 7.2, 7.3 and so forth...

---

#### **channel** 
Specify the channel name which is used for the search. You can check which channels are available at the FACT-Finder UI.

---

#### **search-immediate**
`search-immediate` ensures that a search is automatically triggered when web components are loaded successfully. The search request triggered is using the current http parameters, if no parameters are present it uses `*` as query (search for all products) in conjunction with the parameters provided by the ff-communication element. 

**NOTE**

You don't want the `search-immediate` to be present on your landing (home) page (e.g. https://example-shop.com) cause this would imply that a search is triggered every time a user enters your shop. Normally you want to use the search-immediate only on category pages (https://example-shop.com/clothes/jackets) and the search result page (https://example-shop.com/serach?query=adidas).   

