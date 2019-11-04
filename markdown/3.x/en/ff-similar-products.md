## Overview
With the `ff-similar-products` element, you can display a record-list of products which are similar to another product.

**IMPORTANT** [fieldRoles](/documentation/3.x/field-roles) have to be [defined](/documentation/3.0/field-roles)
first in order for `ff-recommendation` to work.

In this element, you should use a `ff-record-list` to let the `ff-similar-products` inject the records returned from the similar-products service.

```html
<ff-similar-products>
    <div class="similarProductsHeader">
        Similar Products
    </div>

    <ff-record-list>
        <ff-record>
            <img data-image>
            <div>
                <a href="https://www.bergfreunde.de/{{record.Deeplink}}" data-action="redirect">
                    {{record.Title}}
                </a>
                <div>Price: <strong>{{record.Price}} €</strong></div>
            </div>
        </ff-record>
    </ff-record-list>
</ff-similar-products>
```

## Attributes
### record-id
Set this to trigger a call to the similar-products service for that specific record.
```html
<script>
    const similarProductsElement = document.querySelector("ff-similar-products");
    //Triggers thesimilarProducts service
    similarProductsElement.recordId = "123456789";
</script>

//or use markup
<ff-similar-products max-results="4" record-id="123456789">
   //...
</ff-similar-products>
```

### max-results
The max-results attribute defines, how many records should be loaded (defaults to 4).
```html
<script>
<ff-similar-products max-results="4">
   //...
</ff-similar-products>
</script>
```
