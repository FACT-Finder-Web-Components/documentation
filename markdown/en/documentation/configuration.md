## Configuration

---
This chapter describes the minimum configuration necessary to search and retrieve results from FACT-Finder.

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

We recommend placing the `ff-communication` element immediately after the `body` tag to reduce the risk of accidental reordering.

It is advisable to add a comment explaining this requirement. For example:
```html
<!-- The ff-communication element sets up the FF Web Components and must not be moved!
     All other FF Web Components must be placed hereafter. -->
```

### Attributes

---
#### **url**
Specify the FACT-Finder endpoint. Please note the context name `/FACT-Finder-7.2`. It is not sufficient to provide the top-level domain like `http://web-components.fact-finder.de/` which will result in an error.

**Note:** Make sure you are using the same protocol (http://, https://) for the `url` attribute and webapp. 

Using `<ff-communication url="http://web-components.fact-finder.de/FACT-Finder-7.2" ...>` on a page hosted via **HTTPS** will result in an error.

---

#### **version**
Specify the FACT-Finder version. E.g. 7.2, 7.3 and so forth.

---

#### **channel** 
Specify the channel name which is used for the search. You can check which channels are available at the FACT-Finder UI.

---

#### **search-immediate**
`search-immediate` ensures that a search is automatically triggered when web components are loaded successfully. The triggered search request uses the current URL parameters. If no parameters are present, it uses `*` as query (search for all products) in conjunction with the parameters provided by the `ff-communication` element. 

**NOTE**

You don't want the `search-immediate` attribute to be present on your landing (home) page because this would trigger a search every time a user enters your shop. Usually you want to use it only on category pages and the search result page.
