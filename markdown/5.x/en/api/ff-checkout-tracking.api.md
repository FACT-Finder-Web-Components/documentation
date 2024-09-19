## `ff-checkout-tracking`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **disable-auto-tracking**&nbsp;(Boolean) (default: false) | Controls whether the element automatically sends a tracking request upon its initialization. |

### Methods
| Name | Description |
| ---- | ----------- |
| **trackCheckoutItems()** | Dispatches a tracking checkout event for each of its `ff-checkout-tracking-item` children. |


## `ff-checkout-tracking-item`
___
### Properties

_(`*` - required)_

| Name | Description |
| ---- | ----------- |
| **product-number**`*`&nbsp;(String) | The item's ID. |
| **campaign**&nbsp;(String) (default: empty) | The ID of the campaign through which the item was selected (if applicable).|
| **channel**&nbsp;(String) (default: empty) | The channel to send the tracking request to. If omitted, the default value configured in the global configuration is used.|
| **count**&nbsp;(Number) (default: `1`) | Number of pieces of this item that were bought. |
| **master-id**&nbsp;(String) (default: empty) | The item's master ID. If omitted, Web Components will query this value from the `/records` API. |
| **price**&nbsp;(Number) (default: empty) | The item's price. If omitted, Web Components will query this value from the `/records` API. |
| **title**&nbsp;(String) (default: empty) | The item's title. If omitted, Web Components will query this value from the `/records` API. |
