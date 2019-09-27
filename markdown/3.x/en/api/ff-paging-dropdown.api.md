## `ff-paging-dropdown`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **items**&nbsp;(Object) (default:empty) | The paging data from FACT-Finder. Can only be set through JavaScript. |
| **show-selected**&nbsp;(Boolean) |  If this attribute is present, regardless of its value, the currently selected paging element is shown in the drop down container. |
| **collapse-onblur**&nbsp;(Boolean) |  If this attribute is present, regardless of its value, the element is automatically closed when it loses focus. |
| **opened**&nbsp;(Boolean) (default: false) | Indicates if this element is opened by default or not. |

### Methods
| Name | Description |
| ---- | ----------- |
| **show()** |  Opens the dropdown element. |
| **hide()** |  Closes the dropdown element. |
| **toggle(forcehide?: boolean)**| Opens or closes the element depending on the current state. |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out.|

## `ff-paging-select`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **pagingData**&nbsp;(Object) (default:undefined) | The paging data from FACT-Finder. Can only be set through JavaScript. |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out.|
