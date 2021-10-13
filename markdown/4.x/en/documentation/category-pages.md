## Category Pages

---

Category pages play a special role in a web shop.
From an implementer's perspective, however, they are basically a regular search result page with pre-applied category filters.

Typically, you arrive at a category page after using the shop's navigation.
This has a few implications regarding how to communicate with the FACT-Finder API.
Responses to navigation requests and search requests can be configured separately.
This has the effect that seemingly identical requests may receive different responses depending on whether they target the navigation or the search API.

This article explores the tools offered by FACT-Finder Web Components to correctly implement category pages.



[comment]: <> (important for endpoints /search /navigation)



### Implementation

#### Hybrid applications (NO-SPA)
If you are running standard application where each request comes through a server and generate new HTML document you will probably want to stay with the navigation offered by a given platform.
It is because Web Components navigation elements are not aware of the internal application routing and don't know which page user should be redirected to.
Built-in navigation will guarantee that any form of routing configuration will be persisted.
From the Web Components perspective such a setup requires a user to manually set the `category-page` attribute on `ff-communication`.
In addition, a FACT-Finder request needs to be initiated automatically, right after user lands on a given category page.
To achieve that a `search-immediate` attribute should be set on `ff-communication`.




#### FACT-Finder NG

When you are using FACT-Finder NG, you implement category pages with the `category-page` attribute on `ff-communication`.
You pass it the filter string that corresponds to your relevant category page.
These filters are _fixed_, and cannot be removed by users while they are on the current category page.

The filter string looks like a string you would pass to `add-params`.

Example:
```html
<ff-communication
    url="your.fact-finder.instance"
    version="ng"
    api="v4"

    category-page="filter=Category%3AEquipment"
    add-params="filter=Properties%3AWaterproof"
    
    search-immediate
></ff-communication>
```

Attributes `category-page` and `add-params` can be used together.

> Note
>
> `category-page` only works with category filters.
> Other types of filters are not supported.


##### JavaScript configuration

If you prefer to configure Web Components through JavaScript instead of HTML, you will find the corresponding property in `factfinder.communication.globalCommunicationParameter.categoryPage`.

Example:
```js
document.addEventListener(`ffReady`, ({ factfinder }) => {
    factfinder.communication.globalCommunicationParameter.categoryPage = `filter=Category%3AEquipment`;
});
```


##### Encoding

Values of the filter string must be _"URL-plus"_ encoded.
This means regular URL encoding with spaces converted to `+` characters.

Example:

Plain: `Category:Ausrüstung/Bücher & Karten`

Encoded: `Category%3AAusr%C3%BCstung%2FB%C3%BCcher+%26+Karten`

> Known issue
>
> Encoded hex-values must be upper-case or filter handling will not work.
> Compare `%3A` and `%3a` for `:`.
>
> Good: `category-page="filter=Category%3AEquipment"`
>
> Bad: `category-page="filter=Category%3aEquipment"`



---
TODO

fixed elements get `[fixed]` attribute, implicit gets `[implicit]` for neat styling


---

```
category-page="filter=Category%3AAusr%C3%BCstung%2FB%C3%BCcher+%26+Karten"
categoryPage = 'filter=Category%3AOutdoor+clothing%2FOutdoor+trousers%2FShorts+%26+3%252F4+length+trousers';
```





fixed filters not removable by user

works with category filters only

---


#### Pre-NG

add-params="navigation=true,filter=category...."


encoding:
7.3 -> url encoded


example:

7.3

add-params="navigation=true,filterCategoryROOT=Outdoor%20clothing,filterCategoryROOT/Outdoor%20clothing=Headwear"

7.2

add-params="navigation=true,filterCategoryROOT=Outdoor%20clothing,filterCategoryROOT/Outdoor%20clothing=Headwear"




#### todo


works in hybrid setups

remember to redirect from searchbox


needs custom code in SPAs for enter/exit nav-mode




[comment]: <> (deprecate asn-remove-all[keep-category-path])



