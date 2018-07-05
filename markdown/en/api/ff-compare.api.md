## `ff-compare`
___
### Properties
| Name | Description |
| ---- | ----------- |
|**record-id** (Array) |The record Id's of the products to compare.|
|**max-results** (Number) (default:4)|The maximum amount of dispatched records.|
|**subscribe** (String) **Options**: true, false (default:true)| If this is set to `false` the element no longer listens to events and therefore does not receive new data. This is useful if you want to dispatch your own data to the element.|
|**auto-compare** (String) **Options**: true, false (default:false)|When set to true, the request to the compare service will be automaticaly triggered when the attribute 'record-id' are changed.|

### Methods
| Name | Description |
| ---- | ----------- |
|**compareRecords(recordIds)**|This method triggers a request to the Compare Service with the given id's.|