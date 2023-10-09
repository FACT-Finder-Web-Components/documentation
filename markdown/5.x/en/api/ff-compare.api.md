## `ff-compare`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **record-id** (Array) | The record IDs of the products to compare. |
| **max-results** (Number) (default:4) | The maximum amount of dispatched records. |
| **subscribe** (String) **Options**: "true", "false" (default:"true") | If set to `"false"` the element no longer listens to events and therefore does not receive new data. This is useful if you want to dispatch your own data to the element. |
| **auto-compare** (String) **Options**: "true", "false" (default:"false") | If set to `"true"`, the request to the compare service will be automatically triggered when the attribute `record-id` is changed. |

### Methods
| Name | Description |
| ---- | ----------- |
| **compareRecords(recordIds)** | This method triggers a request to the Compare Service with the given `recordIds`. |