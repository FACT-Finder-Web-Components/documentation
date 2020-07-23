## Bare Breadcrumb Trail

By using a bare element, we tell `ff-breadcrumb-trail` to use default templates.
This means that the separator, which is displayed between the `ff-breadcrumb-trail-items`, defaults to `>` and the `ff-breadcrumb-trail-item` innerHTML defaults to the `{{text}}` data binding.

```html
<ff-breadcrumb-trail></ff-breadcrumb-trail>
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
        color: blue;;
    }

    .advisorItem {
        color: green;
    }
</style>
<ff-breadcrumb-trail>
    <!-- The search item is the content of the search query-->
    <ff-breadcrumb-trail-item type="search">
        <span class="searchItem">{{text}}</span>
    </ff-breadcrumb-trail-item>

    <!-- Filter items are set by the URL or over the ASN-->
    <ff-breadcrumb-trail-item type="filter">
        <span class="filterItem"><strong>{{text}}</strong></span>
    </ff-breadcrumb-trail-item>

    <!-- Advisor items are included in the breadcrumb when an advisor-campaign is selected-->
    <ff-breadcrumb-trail-item type="advisor">
        <div class="advisorItem">{{text}}</div>
    </ff-breadcrumb-trail-item>
</ff-breadcrumb-trail>
```

## Beware of Cross Site Scripting (XSS)

In the breadcrumb trail templates you should always use double curly braces `{{ }}` for data binding.
Using triple curly braces `{{{ }}}` makes the template engine interpret the contents as actual HTML which may run unwanted JavaScript.

This is particularly dangerous when applied to the breadcrumb trail item of type `search`.
The search term is often derived from the URL's `query` parameter.
Sharing a link with a maliciously crafted `query` parameter could cause users who click it to unintentionally run 3rd party code which might attempt to e.g. steal the user's session credentials.

Please see [Template Engine](/documentation/3.x/template-engine) for details on data binding.
