## `ff-paging`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **paging** (Object) (default:empty) | The paging data from FactFinder. |
| **show-only** (Boolean) | Determines if page items should only be displayed and be not clickable. |


### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out.|

## `ff-paging-set`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **state** (String) (default: "all") | This property sets the condition under which the `ff-paging-set` element will become _active_. This is achieved by setting the numbers behind `currentPage` (for the currently selected page) and `pageCount` (for the total number of pages) through any calculation to the desired value. The condition is then based on this value (e.g. `currentPage > 3 && pageCount - currentPage >= 3`). |
| **isActive** (Boolean) | Determines if the paging set is currently active. |
| **paging** (Object) (default:empty) | The data from FactFinder. |

### Methods
| Name | Description |
| ---- | ----------- |
| **hideSelf()** | Hides the paging set.|
| **showSelf()** | Shows the paging set.|

## `ff-paging-item`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **type** (String)&nbsp;**Options**:&nbsp;"currentLink", "firstLink", "lastLink", "nextLink", "previousLink" (default: "currentLink") | Using this property you can configure and style different pages and navigation elements of the paging. See documentation above. |
| **show-only**&nbsp;(Boolean) | Determines if page items should only be displayed and be not clickable. |
| **page**&nbsp;(Number) | The page number the item represents. |
