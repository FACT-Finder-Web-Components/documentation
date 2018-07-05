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
