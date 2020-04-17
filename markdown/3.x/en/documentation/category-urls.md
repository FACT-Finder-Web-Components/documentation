## Category URLs
---

This guide covers how to build and use more SEO friendly URLs like `https://www.your-shop.com/c/shoes/sneakers` with FACT-Finder Web Components.

What we need:
- disable the URL parameters
- map the URL to a FACT-Finder request

## Parameter handling
```html
<ff-communication use-url-parameter="false"></ff-communication>
```
Disables the usage of HTTP parameters entirely.

 ```html
<ff-communication only-search-params></ff-communication>
```
`only-search-params` provides a pre-configured set of search related parameters which then are pushed to the URL, i.e. _query_, _filter_, _sort_, _page_ and _productsPerPage_. This can be used in conjunction with the attribute `parameter-whitelist`.

 ```html
<ff-communication parameter-whitelist="page,query"></ff-communication>
```
Exactly define which parameters are going to appear in the browser URL.


## Map URL to a request
The mapping is done on server side via an additional `ff-communication` attribute called `add-params`. 

`add-params` takes a comma-separated list of HTTP parameters which will be added to the FACT-Finder request. 
Consider the following configuration:

```html
<ff-communication url="https://fact-finder.de/your-ff" 
                  channel="en"
                  version="ng"
                  add-params="param1=ONE,param2=TWO"
                  search-immediate
                  default-query="shoes"></ff-communication>
```
This will result in a request that will look like: `https://fact-finder.de/your-ff/en?query=shoes&param1=ONE&param2=TWO`.
A typical use case for this feature is adding a category filter to a page, returning all products that are associated with a given category.
This way FACT-Finder will be used for product lists, facets, sorting options, paging, recommendations, etc. while letting your shop system take care of URL handling and CMS content.

## Generating `add-params` values
This is a very individual case and depends on the shop system you are using and on your data.

In general, filter parameters should be generated in a similar way as you do for the data export.
The FACT-Finder filter parameter pattern is:

| FF 7.x | FF NG |
| ------ | ----- |
| `filter{FIELD_NAME}={VALUE}` | `filter={FIELD_NAME}:{VALUE}` |
| e.g. `filterColor=blue`      | e.g. `filter=Color:blue`      |

We recommend using our [ff-asn demo](https://github.com/FACT-Finder-Web-Components/demos/tree/release/3.x/ff-asn) and the browser's dev tools to take a detailed look at parameter generation. 

For our existing modules please refer to:
- [Magento](https://github.com/FACT-Finder-Web-Components/magento1-module)
- [Magento 2](https://github.com/FACT-Finder-Web-Components/magento2-module)
- [PrestaShop](https://github.com/FACT-Finder-Web-Components/prestashop-module)
- [OXID eShop](https://github.com/FACT-Finder-Web-Components/oxid-eshop-module)
