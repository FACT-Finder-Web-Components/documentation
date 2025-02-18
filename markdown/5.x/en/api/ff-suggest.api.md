## `ff-suggest`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **suggest-items**&nbsp;(Array) | The data from FactFinder. |
| **hide-onblur**&nbsp;(String) **Options**:&nbsp;"true",&nbsp;"false" (default: "true") | When `"true"`, clicks outside the Suggest and the related search box close the Suggest popup. |
| **request-mapping-search**&nbsp;(String, comma-separated list) (default: "searchTerm") | A list of suggest types that shall invoke a **search** request. |
| **request-mapping-navigation**&nbsp;(String, comma-separated list) (default: "category,brand") | A list of suggest types that shall invoke a **navigation** request. |
| **request-mapping-detail**&nbsp;(String, comma-separated list) (default: "productName") | A list of suggest types that shall invoke the _suggest-detail-listener_ from the `factfinder.notifications` API. |
| **for-searchbox**&nbsp;(String, comma-separated list) (default: empty) | A list of `ff-searchbox` id's to which `ff-suggest` shall react to. If empty, `ff-suggest` will react to all _Suggest_ requests. |


## `ff-suggest-item`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **type**&nbsp;(String) **Options:** "product", "brand", "search", "category", "all" (default: "all") | The suggest type as it corresponds to your suggest type configuration in the FactFinder UI. |
| **suggestion** | The item's data from FactFinder. |
