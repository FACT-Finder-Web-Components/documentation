## `ff-suggest`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **layout**&nbsp;(String) **Options**:&nbsp;"list", "block" (default: "list")| Determines how the individual sections are displayed. Either as block or as vertical list. |
| **suggest-items**&nbsp;(Array) | The data from FACT-Finder. |

### Events
| Name | Description |
| ---- | ----------- |
| **suggest-item-clicked** | Is triggered when the `ff-suggest-item` is clicked on. |
| **suggest-product-record** | Is fired if a click on a `ff-suggest-item` of type `"productName"` occurred. The event detail contains the whole record of the clicked product, you can use this information to display a product detail page. **Important:** Only available in with a FACT-Finder version 7.3 and above using the new REST API. |
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
