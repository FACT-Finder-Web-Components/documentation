## Overview

Products Per Page is a family of three elements that allow you to set the number of products to be shown on a page.

- `ff-products-per-page-select` is a native HTML `select` element
- `ff-products-per-page-dropdown` is a custom-built dropdown element
- `ff-products-per-page-list` shows a list with all options always visible

All three elements can be used with or without additional customization.


### Defining available options

All three elements have a `values` attribute that must be set.
With this attribute you specify which page sizes shall be available in the element.

```html
<ff-products-per-page-list values="20,40,80,160"></ff-products-per-page-list>
```

Make sure to specify a value that is equal to the default page size that you configure in the FactFinder UI.
If FactFinder returns a page size that is not in the `values` attribute, an additional list item will be created.


## Native HTML select (`ff-products-per-page-select`)

The code below will display a native HTML `select`.
You can optionally specify an `option` template.
If not specified, it will default to `<option>{{value}}</option>`.

```html
<ff-products-per-page-select values="12,24,36">
    <option>Show {{value}} products per page</option>
</ff-products-per-page-select>
```


### Rendered HTML

When set up like in the example above, the rendered HTML could look like this.

```html
<ff-products-per-page-select values="12,24,36">
    <select>
        <option>Show 12 products per page</option>
        <option>Show 24 products per page</option>
        <option>Show 36 products per page</option>
    </select>
</ff-products-per-page-select>
```


## Custom-built dropdown (`ff-products-per-page-dropdown`)

The `ff-products-per-page-dropdown` is a custom-built dropdown.
If no `ff-products-per-page-item` is provided as template, it will default to `<ff-products-per-page-item>{{value}}</ff-products-per-page-item>`.

```html
<ff-products-per-page-dropdown values="12,24,36">
    <ff-products-per-page-item>
        <div>Show {{value}} products per page</div>
    </ff-products-per-page-item>
</ff-products-per-page-dropdown>
```


### Rendered HTML

When set up like in the example above, the rendered HTML could look like this.

```html
<ff-products-per-page-dropdown values="12,24,36">
    <ff-products-per-page-item class="ffw-selected">
        <div>Show 12 products per page</div>
    </ff-products-per-page-item>
    <div class="ffw-ppp-dropdown-container ffw-ppp-dropdown-closed">
        <ff-products-per-page-item>
            <div>Show 24 products per page</div>
        </ff-products-per-page-item>
        <ff-products-per-page-item>
            <div>Show 36 products per page</div>
        </ff-products-per-page-item>
    </div>
</ff-products-per-page-dropdown>
```


## Products per page as list (`ff-products-per-page-list`)

You can also display a products per page in the fashion of a radio button list with the `ff-products-per-page-list`.
If no `ff-products-per-page-item` is provided as template, it will default to `<ff-products-per-page-item>{{value}}</ff-products-per-page-item>`.

```html
<ff-products-per-page-list values="12,24,36">
    <ff-products-per-page-item>{{value}} per page</ff-products-per-page-item>
</ff-products-per-page-list>
```


### Rendered HTML

When set up like in the example above, the rendered HTML could look like this.

```html
<ff-products-per-page-list values="12,24,36">
    <ff-products-per-page-item class="ffw-selected">12 per page</ff-products-per-page-item>
    <ff-products-per-page-item>24 per page</ff-products-per-page-item>
    <ff-products-per-page-item>36 per page</ff-products-per-page-item>
</ff-products-per-page-list>
```
