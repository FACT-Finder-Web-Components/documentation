## Bare BCT

By using a bare element, we tell the BCT to default everything. This means that the separator, which is displayed between the `ff-breadcrumb-trail-items`, defaults to < and the `ff-breadcrumb-trail-item` innerHTML defaults to the {{description}} data binding

```html
<ff-breadcrumb-trail></ff-breadcrumb-trail>
```

## Changing the separator appearance

By annotating an HTML element with the [data-separator] attribute we tell the `ff-breadcrumb-trail` to use this element as the separator template.

```html
<ff-breadcrumb-trail>
    <span data-separator>+</span>
</ff-breadcrumb-trail>
```

## Changing the item appearance

By annotating the `ff-breadcrumb-trail-item` with the [type] attribute you can use this item as default template for that specific BCT type.

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

## API Reference
## `ff-breadcrumb-trail`
### Properties
| Name | Description |
| ---- | ----------- |
|**bread-crumb-trail-items**&nbsp;(Object) (default:empty)|The breadcrumb data from FACT-Finder.|

### Events
| Name | Description |
| ---- | ----------- |
|**dom-updated**|This event is triggered when the element has received new data and the template for the element and all sub elements was punched out.|

## `ff-breadcrumb-trail-item`
### Properties
| Name | Description |
| ---- | ----------- |
|**bread-crumb-trail-item**&nbsp;(Object) (default:empty)|The Breadcrumb data from FACT-Finder.|
|**type**&nbsp;(String) **Options**:&nbsp;search,&nbsp;filter,&nbsp;all,&nbsp;advisor (default: search)|Determines, which kind of breadcrumb is present.|

### Methods
| Name | Description |
| ---- | ----------- |
|**clone**|Allows the cloning of elements including all properties, behaviors, private fields, states and HTML templates.|
