## Overview
This element lets the user set the number of products shown per page. The available options are
predefined in the FACT-Finder backend. We provide three different kinds of elements you can choose from.
The `ff-products-per-page-select` is a native HTML `select` element. The `ff-products-per-page` is a
custom-built dropdown element. And `ff-products-per-page-list` shows all options in a horizontal list next to each other.
All three elements can be used with or without additional customization.

## Native HTML select
The code below will display a native HTML `select`. The template specified through the `data-template` attribute is optional.
It will default to `<option>{{value}}</option>` if not present.

```html
<ff-products-per-page-select>
    <option data-template>Show {{value}} Products</option>
</ff-products-per-page-select>
```

## Custom-built dropdown
Adding `<ff-products-per-page-dropdown></ff-products-per-page-dropdown>` to your page works right out of the box.

You can style the items of the dropdown with the `ff-products-per-page-item` inside a dropdown element.
You can access the value for the item with the _mustache.js_ syntax `{{value}}`.

The `show-selected="true"` property on a dropdown adds the selected option to the dropdown options.

```html
<ff-products-per-page-dropdown show-selected="true">
    <ff-products-per-page-item>
        <div style="color: blue; font-weight: bold">{{value}}&nbsp;Produkte</div>
    </ff-products-per-page-item>
</ff-products-per-page-dropdown>
```

### Collapse-onblur
With the `collapse-onblur="true"` attribute set, the dropdown collapses when it loses focus. The default value is "false".

```html
<ff-products-per-page-dropdown collapse-onblur="true"></ff-products-per-page-dropdown>
```

## Products-per-page as List
You can also display a Products per Page handle like a list with the `ff-products-per-page-list`.

```html
<ff-products-per-page-list></ff-products-per-page-list>
```
