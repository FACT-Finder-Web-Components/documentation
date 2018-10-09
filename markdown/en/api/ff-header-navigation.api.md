## `ff-header-navigation`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **group-count** (Number) (default:10) | You can decide how many 'groups' from layer 2 are shown inside the hover container. |
| **group-size** (Number) (default:4) | Limits how many 'links' inside a 'group' are rendered. |
| **hide-empty-groups** (String) **Options**: true, false (default:true) | Hides all 'group' (layer 2) elements which has no 'links' (layer 3). |
| **fetch-initial** (String) **Options**: true, false (default:true) | If true (default), the navigation data will be requested on the first attachment to the DOM. |

### Methods
| Name | Description |
| ---- | ----------- |
| **fetch()** | Triggers a new fetching of the navigation data. |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for the element and all sub elements was punched out. |