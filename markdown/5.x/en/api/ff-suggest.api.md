## `ff-suggest`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **layout**&nbsp;(String) **Options**:&nbsp;"list", "block" (default: "list")| Determines how the individual sections are displayed. Either as block or as vertical list. |
| **suggest-items**&nbsp;(Array) | The data from FACT-Finder. |
| **hide-onblur**&nbsp;(String) **Options**:&nbsp;"true",&nbsp;"false" (default: "false") | When `"true"`, attaches a click listener to `document`. Clicks outside the Suggest and the related search box close the Suggest popup. Setting to `"true"` is recommended. |

### Events
| Name | Description |
| ---- | ----------- |
| **suggest-item-clicked** | Is triggered when the `ff-suggest-item` is clicked on. |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |

## `ff-suggest-item`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **type**(String)&nbsp;**Options:** "product", "brand", "search", "category", "all" (default: "all") | The suggest type as it corresponds to your suggest type configuration in the FACT-Finder backend. |
| **suggestion** | The data from FACT-Finder for one item. |

### Events
| Name | Description |
| ---- | ----------- |
| **item-clicked** | Is triggered when the `ff-suggest-item` is clicked on. |
| **before-search** | Is triggered before a search is executed through this element. |
