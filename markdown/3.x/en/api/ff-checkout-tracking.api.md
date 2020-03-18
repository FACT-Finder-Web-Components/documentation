## `ff-checkout-tracking`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **disable-auto-tracking**&nbsp;(Boolean) (default: false) | Controls whether the element sends a tracking request upon its rendering. |
| **records**&nbsp;(Array) | The records returned from FACT-Finder. |

### Methods
| Name | Description |
| ---- | ----------- |
| **trackCheckoutItems** | Dispatches a tracking checkout event for each of its `ff-checkout-tracking-item` children. |


## `ff-checkout-tracking-item`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **record-id**&nbsp;(String) (default: empty) | The item's ID used for tracking in FACT-Finder. |
| **count**&nbsp;(String) (default: "1") | Number of pieces of this item that were bought. |
| **price**&nbsp;(String) | Price of the item bought. If omitted, it will be inferred from the clicked item and the configured [fieldRoles](/documentation/3.x/field-roles). |
| **channel**&nbsp;(String) | Channel used to send a tracking request. If omitted, the default value configured in `ff-communication` will be used.
