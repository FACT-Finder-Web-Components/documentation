## `ff-sortbox-select`
___

### Properties

| Name | Description |
| ---- | ----------- |
| **items** (Array) | The data from FactFinder. Can only be set through JavaScript.|

### Events

| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |


## `ff-sortbox`
___

### Properties

| Name | Description |
| ---- | ----------- |
| **items** (Array) | The data from FactFinder. Can only be set through JavaScript.|
| **opened** (Boolean) | Determines if the sort box is opened. |
| **show-selected** (Boolean) | Determines if the currently selected sort option is also shown inside the dropdown. |
| **show-selected-first** (Boolean) | Determines if the currently selected sort option is displayed at the top of the dropdown list or at its actual position. To take effect `show-selected` must be set. |
| **collapse-onblur** (String) *Options* "true", "false" (default: "true") | Determines if the element's dropdown is automatically closed when it loses focus. |

### Methods

| Name | Description |
| ---- | ----------- |
| **toggle(expand?: Boolean)** | Opens or closes the element based on its current state. |
| **expand()** | Expands the dropdown element. |
| **collapse()** | Collapses the dropdown element. |

### Events

| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |


## `ff-sortbox-item`
___

### Properties

| Name | Description |
| ---- | ----------- |
| **sortItem** (Object) | The data from FactFinder. Only available through JavaScript. |
| **key** (String) | Set to define which FactFinder sort item the template is for. Its value must follow the pattern `{sort item 'name'}.{sort item 'order'}`, e.g.: `Price.asc`. |

### Events

| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |
