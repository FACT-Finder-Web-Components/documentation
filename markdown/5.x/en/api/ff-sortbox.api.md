## `ff-sortbox`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **items** (Array) (default: empty) | The data from FACT-Finder. Can only be set through JavaScript.|
| **opened** (Boolean) *Options* true, false (default: false) | Determines if the sort box is opened. |
| **show-selected** (String) *Options* "true", "false" (default: "false") | Determines if the currently selected sort option is also shown inside the dropdown. |
| **show-selected-first** (String) *Options* "true", "false" (default: "false") | Determines if the currently selected sort option is displayed at the top of the dropdown list or at its actual position. To take effect `show-selected` must be set to `true`. |
| **collapse-onblur** (String) *Options* "true", "false" (default: "false") | Determines if the element's dropdown is automatically closed when it loses focus. |

### Methods
| Name | Description |
| ---- | ----------- |
| **toggle(collapse?: Boolean)** | Opens or closes the element based on its current state. |
| **show()** | Opens the drop down element. |
| **hide()** | Closes the drop down element. |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |

## `ff-sortbox-item`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **sort-item** (Object) (default: empty) | The data from FACT-Finder. |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |
