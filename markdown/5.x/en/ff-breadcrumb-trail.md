## Default templates

When using the element without custom HTML templates, `ff-breadcrumb-trail` uses default templates.
This means that the separator, which is displayed between the `ff-breadcrumb-trail-items`, defaults to `>` and the `ff-breadcrumb-trail-item`'s `innerHTML` defaults to the `{{item.text}}` data binding.

```html
<ff-breadcrumb-trail></ff-breadcrumb-trail>
```


## Data format

The `ff-breadcrumb-trail` element reads the `breadCrumbTrail` list from the search response and renders `ff-breadcrumb-trail-item` elements from it.
Because the breadcrumb trail is closely related to `facets`, `ff-breadcrumb-trail-item` elements receive a data object composed of `item` and `facet` which can be accessed in its HTML template.

Note that the `facet` property is only populated in `ff-breadcrumb-trail-item` elements of type `filter`.

```html
<!-- Data structure
{
    facet: Facet,
    item: BreadCrumbTrailItem,
}
-->
<ff-breadcrumb-trail>
  <ff-breadcrumb-trail-item type="filter">{{facet.name}}: {{item.text}}</ff-breadcrumb-trail-item>
  <ff-breadcrumb-trail-item type="search">Facet is undefined: {{facet}}</ff-breadcrumb-trail-item>
</ff-breadcrumb-trail>
```


## Changing the separator appearance

By annotating an HTML element with the `data-separator` attribute we tell `ff-breadcrumb-trail` to use this element as the separator template.

```html
<ff-breadcrumb-trail>
    <span data-separator>+</span>
</ff-breadcrumb-trail>
```


## Changing the item appearance

By annotating the `ff-breadcrumb-trail-item` with the `type` attribute you can use this item as the default template for that specific breadcrumb trail type.

```html
<style>
    .searchItem {
        color: red;
        cursor: crosshair;
    }

    .filterItem {
        color: blue;
    }

    .advisorItem {
        color: green;
    }
</style>
<ff-breadcrumb-trail>
    <!-- The search item is the content of the search query-->
    <ff-breadcrumb-trail-item type="search">
        <span class="searchItem">{{item.text}}</span>
    </ff-breadcrumb-trail-item>

    <!-- Filter items are set by the URL or over the ASN-->
    <ff-breadcrumb-trail-item type="filter">
        <span class="filterItem"><strong>{{item.text}}</strong></span>
    </ff-breadcrumb-trail-item>

    <!-- Advisor items are included in the breadcrumb when an advisor-campaign is selected-->
    <ff-breadcrumb-trail-item type="advisor">
        <div class="advisorItem">{{{item.text}}}</div>
    </ff-breadcrumb-trail-item>
</ff-breadcrumb-trail>
```


## Beware of Cross Site Scripting (XSS)

In the breadcrumb trail templates you should prefer to use double curly braces `{{ }}` for data binding.
Using triple curly braces `{{{ }}}` makes the template engine interpret the contents as actual HTML which may run unwanted JavaScript.

This is particularly dangerous when applied to the breadcrumb trail item of type `search`.
The search term is often derived from the URL's `query` parameter.
Sharing a link with a maliciously crafted `query` parameter could cause users who click it to unintentionally run 3rd party code which might attempt to e.g. steal the user's session credentials.

Please see [Template Engine](/documentation/5.x/template-engine) for details on data binding.
