## Overview
Products per page lets the user set how many products per page he wants to look at. The available options are
predefined in the FACT-Finder backend. We provide three different kinds of element you can choose from.
The `ff-products-per-page-select` is a native HTML `select` element. The `ff-products-per-page` is a
custom build dropdown element. `ff-products-per-page-list` shows all options as list next to each other.
All three can be used out of the box or customized to your special needs.

## Native HTML select
The code below will display a native HTML `select`. The template specified through the `data-template` attribute is optional.
It will default to `<option>{{value}}</option>` if not present.

```html
<ff-products-per-page-select>
    <option data-template>Show {{value}} Products</option>
</ff-products-per-page-select>
```

## Custom build dropdown
Adding `<ff-products-per-page-dropdown></ff-products-per-page-dropdown>` to your page works right out of the box.

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

### Collapse-onblur
With the `collapse-onblur="true"` attribute set, the dropdown collapses when you click somewhere else (default is "false").

```html
<ff-products-per-page-dropdown collapse-onblur="true"></ff-products-per-page-dropdown>
```

## Products-per-page as List
You can also display a Products per Page handle like a list with the `ff-products-per-page-list`.

```html
<ff-products-per-page-list></ff-products-per-page-list>
```
