## `ff-paging-dropdown`
___

### Properties
| Name | Description |
| ---- | ----------- |
| **pages**&nbsp;(Array) | An array of page numbers that are displayed. Can only be set through JavaScript. |
| **show-selected**&nbsp;(Boolean) |  If this attribute is present, regardless of its value, the currently selected paging-item is shown in the drop down container. |
| **collapse-onblur**&nbsp;(String) (default: `"true"`) |  If this attribute is `"true"`, the element is automatically closed when it loses focus. |
| **opened**&nbsp;(Boolean) | Indicates if this element is opened by default or not. |

### Methods
| Name | Description |
| ---- | ----------- |
| **expand()** | Expands the dropdown element. |
| **collapse()** | Collapses the dropdown element. |
| **toggle(expand?: Boolean)**| Opens or closes the element depending on the current state. |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out.|

## `ff-paging-select`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **pages**&nbsp;(Array) | An array of page numbers that are displayed. Can only be set through JavaScript. |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out.|
