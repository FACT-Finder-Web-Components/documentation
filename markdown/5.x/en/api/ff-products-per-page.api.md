## `ff-products-per-page-select`
___

### Properties

| Name | Description |
| ---- | ----------- |
| **values** (String) (_required_) | A comma-separated list of page sizes. |

### Events

| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |


## `ff-products-per-page-dropdown`
___

### Properties

| Name | Description |
| ---- | ----------- |
| **values** (String) (_required_) | A comma-separated list of page sizes. |
| **show-selected** (Boolean) | Determines if the currently selected `ff-products-per-page-item` element should also be shown in the list from which it was selected. |
| **opened** (Boolean) | _(Not intended for manual use.)_ Is set automatically when the drop down menu is opened. Can be used for styling. |
| **collapse-onblur** (String) **Options**: "true", "false" (default: "true") | Determines if the element is automatically closed when the element loses focus. |

### Methods

| Name | Description |
| ---- | ----------- |
| **toggle(expand?: Boolean)** | Opens or closes the element depending on the current state. |
| **expand()** | Expands the dropdown element. |
| **collapse()** | Collapses the dropdown element. |

### Events

| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |


## `ff-products-per-page-list`
___

### Properties

| Name | Description |
| ---- | ----------- |
| **values** (String) (_required_) | A comma-separated list of page sizes. |

### Events

| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |
