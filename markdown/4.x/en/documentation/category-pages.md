## Category Pages

---

Category pages play a special role in a web shop.
From an implementer's perspective, however, they are basically regular search result pages with pre-applied category filters.

Typically, you arrive at a category page after using the shop's navigation.
This has a few implications regarding how to communicate with the FACT-Finder API.
Responses to navigation requests and search requests can be configured separately.
This has the effect that seemingly identical requests may receive different responses depending on whether they target the **navigation** or the **search** API.

This article explores the tools offered by FACT-Finder Web Components to correctly implement category pages.

> Hint
>
> In principle the implementation of category pages is the same for all scenarios.
> Details vary depending on whether you are using **FACT-Finder NG** or prior, or whether your app architecture is **dynamic pages** or **single-page application**.


### Implementation in a nutshell

Your category page corresponds to a certain filter string.
This filter string must be passed to Web Components' configuration where it is processed into pre-defined filters.

These filters will then be applied to all search requests.

Lastly, to present your visitors a category page with results you set the `search-immediate` attribute on `ff-communication`.
Without `search-immediate` the page will remain empty.


#### FACT-Finder NG

When you are using FACT-Finder NG, you implement category pages with the `category-page` attribute on `ff-communication`.
You pass it the filter string that corresponds to your relevant category page.
These filters are _fixed_, and cannot be removed by users while they are on the current category page.

The filter string looks like a string you would pass to `add-params`.
Assuming your category facet is called `Category` a basic setup could look like this:

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

If you prefer to configure Web Components through JavaScript instead of HTML, you can find the corresponding property in `factfinder.communication.globalCommunicationParameter.categoryPage`.

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

Plain:`Category:Outdoor clothing/Outdoor trousers/Shorts & 3%2F4 length trousers`

Encoded: `Category%3AOutdoor+clothing%2FOutdoor+trousers%2FShorts+%26+3%252F4+length+trousers`

Note that the `/` in `3/4 length trousers` has to be encoded even in the plaintext because it would otherwise be recognised as a category separator.

> Known issue
>
> Encoded hex-values must be upper-case or filter handling will not work.
> Compare `%3A` and `%3a` for `:`.
>
> Good: `category-page="filter=Category%3AEquipment"`
>
> Bad: `category-page="filter=Category%3aEquipment"`


##### Styling

Filter elements are presented in `ff-asn-group-element` elements.
Depending on if and how a filter was selected, `ff-asn-group-element` renders relevant attributes.
These give you the opportunity to style your filters accordingly and give users hints about possible interactions.

| Selection type     | Rendered attributes |
|--------------------|---------------------|
| selected, fixed    | `selcted fixed`     |
| selected, explicit | `selected`          |
| selected, implicit | `selected implicit` |
| unselected         | _(none)_            |

_Fixed_ filters are those defined in `category-page`.
_Fixed_ and _implicit_ filters cannot be deselected.

_Explicit_ refers to filters that were directly selected by the user.

Example output (shortened):
```html
<ff-asn-group for-group="Category">
    <ff-asn-group-element selected fixed>Level 0</ff-asn-group-element>
    <ff-asn-group-element selected>Level 1</ff-asn-group-element>
    <ff-asn-group-element selected implicit>Level 2</ff-asn-group-element>
    <ff-asn-group-element>Level 3</ff-asn-group-element>
</ff-asn-group>
```


#### Pre-NG

Setups using FACT-Finder versions prior to NG don't have the `category-page` attribute available and therefore have to use a different configuration.
You use the `add-params` attribute with your category filters and the additional `navigation=true` filter.

Example:
```html
<ff-communication
        url="your.fact-finder.instance"
        version="7.3"

        add-params="navigation=true,filterCategoryROOT=Outdoor+clothing,filterCategoryROOT/Outdoor+clothing=Outdoor+trousers"

        search-immediate
></ff-communication>
```

Note that the pre-selected filters here are not fixed and can be deselected by users.


### Application types

Navigation and stuff are important


#### Dynamic pages

The most common app type for web shops is dynamic pages.
Each request runs through the server which generates a new HTML document.

If you are using this kind of application, you will probably want to stay with the navigation provided by your platform.
Web Components' navigation elements are not aware of the internal application routing and don't know which page to redirect to.
The built-in navigation guarantees that routing is handled correctly.


**TODO**

render HTML with `category-page` (NG) or `add-params` (pre-NG)

remember to use `search-immediate`

remember to redirect from searchbox


#### Single-page application

needs custom code in SPAs for enter/exit nav-mode

see demoshop for requirements




[comment]: <> (deprecate asn-remove-all[keep-category-path])



