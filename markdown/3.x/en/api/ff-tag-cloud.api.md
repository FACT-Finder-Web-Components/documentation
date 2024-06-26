## `ff-tag-cloud`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **min-font-size**&nbsp;(Number) (default: 10) | Specifies the font-size for the least searched word. |
| **max-font-size**&nbsp;(Number) (default: 20) | Specifies the font-size for the most searched word. |
| **unit**&nbsp;(String)(default: "px") | Specifies the unit of the font-size. |
| **gradient-color-start**&nbsp;(String) (default: "#294884") | Specifies the start color for the gradient of the searched words. |
| **gradient-color-end** &nbsp;(String) (default: "#20b6e8") | Specifies the end color for the gradient of the searched words. |
| **word-count**&nbsp;(Number) (default: 30) | Specifies the number of searched words to display. |
| **disable-auto**&nbsp;(Boolean) (default: false) | Specifies whether the tag cloud entries should be automatically fetched on `connectedCallback` or not. |

### Events
| Name | Description |
| ---- | ----------- |
| **entry-clicked** | Fired when a tag cloud entry is clicked and before the search for that entry is triggered. The event contains a reference to this element where you can set the property `ffPreventDefault` to skip its default action: Search for the clicked word. The event also contains an object with all the tag cloud entry information: 1. query: The searched word. 2. count: The number of searches for that word. 3. params: The search parameters to execute a FactFinder search for that word. |
| **before-search** | Fired directly before the search for the tag cloud entry is executed. |
| **dom-updated** | Fired every time the tag cloud element is re rendered. |

### Methods
| Name | Description |
| ---- | ----------- |
| **getTagCloud()**| Manually obtains the tag cloud entries from FactFinder. Useful when `disable-auto` is set and one wants to display the entries on a certain action. |