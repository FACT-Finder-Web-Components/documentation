## `ff-recommendation`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **product-number** (String, comma-separated list) (default: empty) | A comma-separated list based on which recommendations are returned. |
| **max-results** (Number) (default: empty) | The maximum amount of returned product recommendations. |
| **use-personalization** (String) **Options**: "true", "false" (default: "true") | When set to "false", the recommendations will be loaded without the personalisation feature. |

### Methods
| Name | Description |
| ---- | ----------- |
| **getRecommendations()** | Refreshes the recommendations based on the current `product-number` value. |
