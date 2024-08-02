## `ff-similar-products`
___
### Properties

_(`*` - required)_

| Name | Description |
| ---- | ----------- |
| **product-id**`*`&nbsp;(String) | The ID of the product for which similar products are returned. |
| **id-type**`*`&nbsp;(String) **Options**: &nbsp;"id", &nbsp;"productNumber" | This attribute determines the type of `product-id`. |
| **max-results**&nbsp;(Number) (default: empty) | The maximum amount of returned similar products. |

### Methods
| Name | Description |
| ---- | ----------- |
| **getSimilarProducts()** | Refreshes the similar products based on the current `product-id` value. |

