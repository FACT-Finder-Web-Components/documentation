## `ff-similar-products`
___
### Properties

_(`*` - required, `†` - conditionally required)_

| Name | Description |
| ---- | ----------- |
| **record-id**`*`&nbsp;(Number) | The record ID of the product, for which similar products are returned. This also works for multiple products. In this case the record IDs have to be separated with `,`. |
| **id-type**`†`&nbsp;(String) **Options**: &nbsp;"id", &nbsp;"productNumber" | This attribute determines the type of `record-id`. It is mandatory when using FactFinder NG. |
| **max-results**&nbsp;(Number) (default: 4) | The maximum amount of returned similar products. |

### Methods
| Name | Description |
| ---- | ----------- |
| **getSimilarProducts()** | Calls up the similar products again. |
