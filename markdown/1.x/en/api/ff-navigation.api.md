## `ff-navigation`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **layout**&nbsp;(String) **Options**:&nbsp;"vertical",&nbsp;"horizontal" (default: "horizontal") | Defines the layout of the Navigation. |
| **flyout**&nbsp;(String) **Options**:&nbsp;"true",&nbsp;"false" (default: "true") | Defines if the sub-elements should fly out or should expand inside the parent. |
| **mobile**&nbsp;(String) **Options**:&nbsp;"true",&nbsp;"false" (default: "false") | If true, the navigation element will be visible. |
| **fetch-initial**&nbsp;(String) **Options**:&nbsp;"true",&nbsp;"false" (default: "true") | If true, the navigation data will be requested on the first attachment to the DOM. |
| **first-fetch**&nbsp;(Number) (default: 2) | Defines up to which start level the navigation data for the initial loading should be requested. **Note**: Navigation data may be up to 1MB and can take its time to load. The first impression for the user when he needs to wait for the initial page load may be not so pleasant. |
| **fetch-size**&nbsp;(Number) (default: 1) | Defines how many level of the following navigation data should be loaded in subsequent requests. Fewer level -> more requests and inversely more level -> more data per request. |
| **max-fetch**&nbsp;(Number) (default: 10) | Defines up to which level of the navigation hierarchy the data should be loaded. |
| **fetch-time**&nbsp;(Number) (default: 100) | Defines the time between navigation requests in milliseconds. |

### Methods
| Name | Description |
| ---- | ----------- |
| **fetch()** | Triggers a new fetching of the navigation data.|
| **updateLayout()** | Rearranges the `layout` according to the layout property. This will recalculate the `direction` properties of all child elements.|

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |

## `ff-navigation-item`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **element**&nbsp;(Object) | The data Element, which defines a category in the Navigation Tree. |
| **direction**&nbsp;(String) **Options**:&nbsp;"left",&nbsp;"right",&nbsp;"down" (default: "right") | Defines, in which direction the sub-elements should be expanded. |
| **cluster-level**&nbsp;(Number) (default: 0) | This is set internally and reflects as an attribute to give the user a possibility to style this element based on its cluster level. Also this is used to select the elements into the right shadow-DOM container. Do not modify this yourself. |
| **type**&nbsp;(String) **Options**:&nbsp;"default",&nbsp;"header",&nbsp;"parent",&nbsp;"level" (default: "default") | This defines which template is used for the element. |
| **has-subelements**&nbsp;(Boolean) (default: false) | This is set internally and reflects as an HTML attribute. Indicates whether this element has at least one sub-element. |
| **flyout**&nbsp;(String) (default: "true") | If `"true"` the sub-elements will expand outside of the parent element according to the `direction`. If `"false"`, the sub-elements will be expanded inside of the parent element. This is used in mobile mode. |
| **selected**&nbsp;(Boolean) (default: false) | This attribute is set in the mobile mode when an element is selected. This can be used to style the selected element. |
