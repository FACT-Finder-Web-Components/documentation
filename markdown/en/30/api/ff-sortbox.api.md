## `ff-sortbox`
___
### Properties
| Name | Description |
| ---- | ----------- |
|**items** (Array) (default:empty)|The data from FACT-Finder.|
|**opened** (String) *Options* true, false (default: false)| Determines if the sort box is opened.|
|**show-selected** (String) *Options* true, false (default: false)|Determines if the currently selected sortings is also shown inside the sort box.|
|**show-selected-first** (String) *Options* true, false (default: false)| Determines of the currently selected show-selected element is displayed on top of the list or at its actual position.|
|**collapse-onblur** (String) *Options* true, false (default: false)| Determines if the element is automatically closed when it loses focus.|

### Methods
| Name | Description |
| ---- | ----------- |
|**toggle(forceHide?)**| Opens or closes the element based on its current state.|
|**show()**| Opens the dropdown element.|
|**hide()**|  Closes the dropdown element.|

### Mixins
| Name | Description |
| ---- | ----------- |
|**--sort-item-container**|  Applied to the container of the `ff-sortbox-item` element.|

### Events
| Name | Description |
| ---- | ----------- |
|**dom-updated** |  This event is triggered when the element has received new data and the template for the element and all sub elements was punched out.|

## `ff-sortbox-item`
___
### Properties
| Name | Description |
| ---- | ----------- |
|**sort-item** (Object) (default:empty)|The data from FACT-Finder.|

### Events
| Name | Description |
| ---- | ----------- |
|**dom-updated** |  This event is triggered when the element has received new data and the template for the element and all sub elements was punched out.|