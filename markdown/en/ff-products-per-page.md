## Bare products-per-page dropdown

The `ff-products-per-page-dropdown` element works right out of the box. It grabs the settings
from the FACT-Finder backend and shows the selected page as a button, and all options in its dropdown on click.

```html
<ff-products-per-page-dropdown></ff-products-per-page-dropdown>
```

## Styling the items

You can style the items of the dropdown with the `ff-products-per-page-item` inside a dropdown element.
You can access the value for the item with the "moustache" syntax `{{value}}`.

The `show-selected="true"` property on a dropdown adds the selected option to the dropdown options.

```html
<ff-products-per-page-dropdown show-selected="true">
    <ff-products-per-page-item>
        <div style="color: blue; font-weight: bold">{{value}}&nbsp;Produkte</div>
    </ff-products-per-page-item>
</ff-products-per-page-dropdown>
```

## Collapse-onblur

With the `collapse-onblur="true"` attribute set, the dropdown collapses when you click somewhere else (default is "false").

```html
<ff-products-per-page-dropdown collapse-onblur="true"></ff-products-per-page-dropdown>
```

## Products-per-page as List

You can also display a Products per Page handle like a list with the `ff-products-per-page-list`.

```html
<ff-products-per-page-list></ff-products-per-page-list>
```

## API Reference
## ff-products-per-page-dropdown

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

## ff-products-per-page-list
### Events
| Name | Description |
| ---- | ----------- |
|**dom-updated**|  This event is triggered when the element has received new data and the template for the element and all sub elements was punched out.|

## ff-products-per-page-item

### Properties
| Name | Description |
| ---- | ----------- |
|**products-per-page-item** (Object) (default:empty)|The required data object from FACT-Finder.|

### Methods
| Name | Description |
| ---- | ----------- |
|**clone()**|Allows the cloning of elements including all properties, elements, behaviors, private fields, states and HTML templates.|