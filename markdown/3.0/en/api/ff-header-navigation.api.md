## `ff-header-navigation`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **group-count** (Number) (default:10) | Number of `groups` from layer 2 shown inside the hover container. |
| **group-size** (Number) (default:4) | Limits number of `links` inside a `group` rendered. |
| **hide-empty-groups** (String) **Options**: "true", "false" (default:"true") | Hides all `group` (layer 2) elements with no `links` (layer 3). |
| **fetch-initial** (String) **Options**: "true", "false" (default:"true") | If true, the navigation data will be requested on the first attachment to the DOM. |
| **mouseenterDelay** (Number) (default:600) | Delays the mouse enter event by the passed amount in milliseconds |
| **mouseleaveDelay** (Number) (default:200) | Delays the mouse leave event by the passed amount in milliseconds |

### Methods
| Name | Description |
| ---- | ----------- |
| **fetch()** | Triggers a new fetch of the navigation data. |

### Mixins
| Name | Description |
| ---- | ----------- |
| **--nav-element-a** | Is applied to the anchor element inside each of the navigation's elements. |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |
