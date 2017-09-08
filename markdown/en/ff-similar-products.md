## Basics
With the `ff-similar-products` element, you can display a record-list of products which are similar to another product.
 
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
    var similarProductsElement = document.querySelector("ff-similar-products");
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

## API Reference
## ff-similar-products
### Properties
| Name | Description |
| ---- | ----------- |
|**record-id**&nbsp;(String) (default: empty)| The record ID of the product for which similar products are returned. This also works for multiple products. In this case the record IDs have to be separated with\",\". |
|**max-results**&nbsp; (Number) (default: 4)| The maximum amount of returned similar products. |

### Methods
| Name | Description |
| ---- | ----------- |
|**getSimilarProducts()**| Calls up the product recommendations again. |
