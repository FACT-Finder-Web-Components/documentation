## `ff-breadcrumb-trail`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **bread-crumb-trail-items**&nbsp;(Array) (default:empty) | The breadcrumb data from FACT-Finder. |
| **show-asterisk-query**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "false") | Determines if an `ff-breadcrumb-trail-item` of type `search` is displayed for a single asterisk query ("*"). |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |

## `ff-breadcrumb-trail-item`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **bread-crumb-trail-item**&nbsp;(Object) (default:empty) | The Breadcrumb data from FACT-Finder. |
| **type**&nbsp;(String) **Options**:&nbsp;"search",&nbsp;"filter",&nbsp;"all",&nbsp;"advisor" (default: "search") | Determines, which kind of breadcrumb is present.|

### Methods
| Name | Description |
| ---- | ----------- |
| `(DEPRECATED)`**clone** | Return a deep copy of the contained elements including all properties, behaviors, private fields, states and HTML templates. |
