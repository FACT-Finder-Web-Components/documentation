## `ff-paging`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **paging** (Object) (default:empty) | The paging data from FACT-Finder. |
| **show-only** (String) **Options**: "true", "false" (default: "false") | Determines if pages should only be displayed but not be clickable. |


### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out.|

## `ff-paging-set`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **state** (String) (default: "all") | This property sets the condition under which the `ff-paging-set` element will become _active_. This is achieved by setting the numbers behind `currentPage` - for the currently selected page - and `pageCount` - for the amount of pages - through any calculation to the desired value. The condition is then based on this value (e.g. `currentPage > 3 && pageCount - currentPage >= 3`). |
| **is-active** (Boolean) **Options**: true, false (default: true) | Determines if the paging set is currently active. |
| **paging** (Object) (default:empty) | The data from FACT-Finder. |

### Methods
| Name | Description |
| ---- | ----------- |
| **hideSelf** | Hides the paging set.|
| **showSelf** | Shows the paging set.|

## `ff-paging-item`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **type** (String)&nbsp;**Options**:&nbsp;"currentLink", "firstLink", "lastLink", "nextLink", "previousLink", "pageLink" (default: "pageLink") | Using this property you can configure and style different pages and navigation elements of the paging. See documentation above. |
| **paging-item**&nbsp;(Object)&nbsp;(default: empty) |  The paging item data from FACT-Finder. |
| **show-only**&nbsp;(String)&nbsp;**Options**: "true", "false" (default: empty) | Determines if pages should only be displayed but not be clickable. |


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
