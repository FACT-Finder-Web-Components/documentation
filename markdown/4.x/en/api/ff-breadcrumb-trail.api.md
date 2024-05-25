## `ff-breadcrumb-trail`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **bread-crumb-trail-items**&nbsp;(Array) (default:empty) | The breadcrumb data from FactFinder. |
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
| **bread-crumb-trail-item**&nbsp;(Object) (default:empty) | The Breadcrumb data from FactFinder. |
| **type**&nbsp;(String) **Options**:&nbsp;"search",&nbsp;"filter",&nbsp;"all",&nbsp;"advisor" (default: "search") | Determines, which kind of breadcrumb is present.|
