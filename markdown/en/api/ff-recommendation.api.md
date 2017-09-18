## API Reference
## ff-recommendation
### Properties
| Name | Description |
| ---- | ----------- |
|**record-id** (String) (default:empty)| The record ID of the product for which recommendations are returned. Recommendations can also be given for multiple products. In this case the record IDs have to be separated with ",".|
|**max-results** (Number) (default:4)| The maximum amount of returned product recommendations.|
|**use-perso** (String) **Options**: true, false (default:false)| When set to 'true', the recommendations will be loaded with the personalisation feature. This will overwrite the global 'use-perso' settings from the `ff-communication`.|
|**subscribe** (String) **Options**: true, false (default:false)|  If this is set to `false` the element no longer listens to events and therefore does not receive new data. This is useful if you want to dispatch your own data to the element.|

### Methods

| Name | Description |
| ---- | ----------- |
|**getRecommendations()**|Calls up the product recommendations again.|