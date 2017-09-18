## `ff-suggest`
___
### Properties
| Name | Description |
| ---- | ----------- |
|**layout**&nbsp;(String) **Options**:&nbsp;list, &nbsp;block (default: block)| Determines how the individual sections are displayed. Either as block or as vertical list.|
|**suggest-items** |The data from FACT-Finder.|

### Mixins
| Name | Description |
| ---- | ----------- |
|**--suggest-container**|Is applied to the container of the ff-suggest-item element.|
|**--suggest-container-wrapper**|Is applied to the surrounding container of all ff-suggest-element elements.|

### Events
| Name | Description |
| ---- | ----------- |
|**suggest-item-clicked**|Is triggered when the ff-suggest-item is clicked on.|
|**suggest-product-record**|Is fired if a click on a ff-suggest-item of type "productName" occurred. The event detail contains the whole record of the clicked product, e.g. to use the information to display a product detail page. **Important:** Only available in combination with FACT-Finder version above 7.3 where the new REST API got introduced.|
|**dom-updated**|This event is triggered when the element has received new data and the template for the element and all sub elements was punched out.|

## `ff-suggest-item`
___
### Properties
| Name | Description |
| ---- | ----------- |
|**type**(String) (default:all)|Determines how the individual sections are displayed. Either as block or as vertical list.|

### Events
| Name | Description |
| ---- | ----------- |
|**item-clicked**|Is triggered when the ff-suggest-item is clicked on.|
