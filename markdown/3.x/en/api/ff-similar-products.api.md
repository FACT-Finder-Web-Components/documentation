## `ff-similar-products`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **record-id**&nbsp;(Number) (default: empty) | The record ID of the product, for which similar products are returned. This also works for multiple products. In this case the record IDs have to be separated with `,`. |
| **id-type**&nbsp;(String) **Options**: &nbsp;"id", &nbsp;"productNumber" (default: undefined) | This attribute determines the type of `record-id`. It is mandatory when using FactFinder NG. |
| **max-results**&nbsp;(Number) (default: 4) | The maximum amount of returned similar products. |

### Methods
| Name | Description |
| ---- | ----------- |
| **getSimilarProducts()** | Calls up the similar products again. |
