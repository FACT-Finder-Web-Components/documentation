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
| **disable-auto**&nbsp;(Boolean) (default: false) | Specifies whether the tag cloud entries should be automatically fetched on `attached` or not. |

### Events
| Name | Description |
| ---- | ----------- |
| **entry-clicked** | Fired when a tag cloud entry is clicked and before the search for that entry is triggered. The event contains a reference to this element where you can set the property `ffPreventDefault` to skip its default action: Search for the clicked word. The event also contains an object with all the tag cloud entry information's: <br /> 1. query: The searched word <br /> 2. count: The number of searches for that word 3. params: The search parameters to execute a FACT-Finder search for that word. |
| **before-search** | Fired directly before the search for the tag cloud entry is executed. |
| **dom-updated** | Fired every time the tag cloud element is re rendered. |

### Methods
| Name | Description |
| ---- | ----------- |
| **getTagCloud()**| Manually obtains the tag cloud entries from FACT-Finder. Useful when `disable-auto` is set to true and one want's to display the entries on a certain action. |

### Mixins
| Name | Description |
| ---- | ----------- |
| **--tag-cloud-container**| Mixin applied to the tag cloud wrapper container. Default: `display: flex;justify-content: space-around;flex-wrap: wrap;` |
| **--tag-cloud-link**| Mixin applied to the tag cloud link. Default: `padding: 2px;` |


