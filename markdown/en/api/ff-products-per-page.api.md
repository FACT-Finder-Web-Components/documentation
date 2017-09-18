## `ff-products-per-page-dropdown`
___
### Properties
| Name | Description |
| ---- | ----------- |
|**show-selected** (String) **Options**: true, false (default:false)| Determines if the currently selected ff-products-per-page-item-element should also be shown in the list from which it was selected.|
|**opened** (String) **Options**: true, false (default:false)|  Is automatically set when the dropdown menu is opened. Can be used for styling.|
|**collapse-onblur** (String) **Options**: true, false (default:false)|Determines if the element is automatically closed when the element loses focus.|

### Mixins
| Name | Description |
| ---- | ----------- |
|**--dropdown-item-container**|Is applied to the container of the products-per-page element within the 'dropdown' view.|

### Methods
| Name | Description |
| ---- | ----------- |
|**toggle()**|Opens or closes the element depending on the current state.|
|**show()**|Opens the dropdown element.|
|**hide()**|Closes the dropdown element.|

### Events
| Name | Description |
| ---- | ----------- |
|**dom-updated**|  This event is triggered when the element has received new data and the template for the element and all sub elements was punched out.|

## `ff-products-per-page-list`
___
### Events
| Name | Description |
| ---- | ----------- |
|**dom-updated**|  This event is triggered when the element has received new data and the template for the element and all sub elements was punched out.|

## `ff-products-per-page-item`
___
### Properties
| Name | Description |
| ---- | ----------- |
|**products-per-page-item** (Object) (default:empty)|The required data object from FACT-Finder.|

### Methods
| Name | Description |
| ---- | ----------- |
|**clone()**|Allows the cloning of elements including all properties, elements, behaviors, private fields, states and HTML templates.|