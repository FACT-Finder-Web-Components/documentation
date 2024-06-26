## Overview
This element lets the user set the number of products shown per page. The available options are
predefined in the FactFinder backend. We provide three different kinds of elements you can choose from.
The `ff-products-per-page-select` is a native HTML `select` element. The `ff-products-per-page` is a
custom-built dropdown element. And `ff-products-per-page-list` shows all options in a horizontal list next to each other.
All three elements can be used with or without additional customization.

## Native HTML select
The code below will display a native HTML `select`. The template specified through the `data-template` attribute is optional.
It will default to `<option>{{value}}</option>` if not present.

```html
<ff-products-per-page-select>
    <option data-template>Show {{value}} products per page</option>
</ff-products-per-page-select>
```

### Rendered HTML
When setup like in the example above, the rendered HTML could look like this.

```html
<ff-products-per-page-select>
    <select>
        <option>Show 12 products per page</option>
        <option>Show 24 products per page</option>
    </select>
</ff-products-per-page-select>
```

## Custom-built dropdown
The `ff-products-per-page-dropdown` is a custom-built dropdown. If no `ff-products-per-page-item` is provided as template, it will default to `<ff-products-per-page-item>{{value}}</ff-products-per-page-item>`.

```html
<ff-products-per-page-dropdown>
    <ff-products-per-page-item>
        <div style="color: blue; font-weight: bold">Show 12 products per page</div>
    </ff-products-per-page-item>
</ff-products-per-page-dropdown>
```

### Rendered HTML
When setup like in the example above, the rendered HTML could look like this.

```html
<ff-products-per-page-dropdown>
    <ff-products-per-page-item class="selected">
        <div style="color: blue; font-weight: bold">Show 12 products per page</div>
    </ff-products-per-page-item>
    <div class="ff-ppp-dropdown-container ff-ppp-dropdown-closed">
        <ff-products-per-page-item>
            <div style="color: blue; font-weight: bold">Show 24 products per page</div>
        </ff-products-per-page-item>
    </div>
</ff-products-per-page-dropdown>
```

## Products-per-page as list
You can also display a products per page handle like a list with the `ff-products-per-page-list`. If no `ff-products-per-page-item` is provided as template, it will default to `<ff-products-per-page-item>{{value}}</ff-products-per-page-item>`.

```html
<ff-products-per-page-list>
    <ff-products-per-page-item>{{value}}</ff-products-per-page-item>
</ff-products-per-page-list>
```

### Rendered HTML
When setup like in the example above, the rendered HTML could look like this.

```html
<ff-products-per-page-list>
    <ff-products-per-page-item class="selected">12</ff-products-per-page-item>
    <ff-products-per-page-item>24</ff-products-per-page-item>
</ff-products-per-page-list>
```
