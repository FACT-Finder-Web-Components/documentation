## Overview

With the sort box element you can change the order in which products are displayed.
There are two kinds of sort boxes.

- `ff-sortbox-select` is a native HTML `select` element
- `ff-sortbox` is a custom-built dropdown element

Both can be used with or without customization.

Sort box elements are populated with the `sortItems` portion from the FactFinder search response.
Inside the HTML template of the sort box item you therefore have access to all those data fields (_DescribedSortItem_).


## Native HTML select (`ff-sortbox-select`)

The `ff-sortbox-select` element displays a native HTML `select` element.

Minimal setup:
```html
<ff-sortbox-select></ff-sortbox-select>
```

Specifying a custom `option` template:
```html
<ff-sortbox-select>
    <option>{{description}}</option>
</ff-sortbox-select>
```

Specifying custom `select` and `option` templates:
```html
<ff-sortbox-select>
    <select class="example-class">
        <option>Sort by: {{description}}</option>
    </select>
</ff-sortbox-select>
```


### Rendered HTML

When set up like in the last example above, the rendered HTML could look like this.

```html
<ff-sortbox-select>
    <select class="example-class">
        <option>Sort by: Title A-Z</option>
        <option>Sort by: Title Z-A</option>
        <option>Sort by: Relevance</option>
    </select>
</ff-sortbox-select>
```


## Custom-built dropdown (`ff-sortbox`)

The `ff-sortbox` element is a custom-built dropdown.
If you do not define any `ff-sortbox-item` templates, items will default to `<ff-sortbox-item>{{description}}</ff-sortbox-item>`.

```html
<ff-sortbox></ff-sortbox>

<!-- Equivalent to: -->
<ff-sortbox>
    <ff-sortbox-item>{{description}}</ff-sortbox-item>
</ff-sortbox>
```

If you do specify `ff-sortbox-item` templates, you may define an individual template for each item in the `sortItems` list of the FactFinder response.
FactFinder provides each item with a `name` and a `order` field.
When you combine them, you get a unique identifier that use can use in the `key` attribute of the `ff-sortbox-item` template.

Note that you don't have to specify templates for all sort item types.
Only define those that you wish to deviate from the default.

Available keys are as follows:

| Key | Description |
| --- | --- |
| default.template | This is the fallback template for all options that have no other template defined. |
| Relevancy.desc | FactFinder always returns an option to sort by relevance. |
| _{name from FactFinder response}_.asc | An option as specified in FactFinder in **ascending** order. (e.g. `Price.asc`, `Title.asc`) |
| _{name from FactFinder response}_.desc | An option as specified in FactFinder in **descending** order. (e.g. `Discount.desc`, `Title.desc`) |

Inside the `ff-sortbox-item` you can access the sort option name with `{{description}}`.

```html
<ff-sortbox>
    <!--
    "default.template" is a pseudo key used to specify a default template for all sort box items.
    -->
    <ff-sortbox-item key="default.template" class="customCssClass">
        <span>Default Style: {{description}}</span>
    </ff-sortbox-item>

    <!-- Override relevance layout. -->
    <ff-sortbox-item key="Relevancy.desc">Relevance</ff-sortbox-item>

    <!--
    Other keys depend on your data returned by FactFinder. Their format is always "FIELDNAME.ORDER".
    -->
    <ff-sortbox-item key="Price.asc">
        <span style="font-size: 18px">Overridden for: {{description}}</span>
    </ff-sortbox-item>

    <ff-sortbox-item key="Rating.desc">
        <span><em>Overridden for: {{description}}</em></span>
    </ff-sortbox-item>
</ff-sortbox>
```


### show-selected / show-selected-first

By default, the selected sort option will disappear from the dropdown list and appear in the static container of the element.
Setting the `show-selected` attribute the selected option remains part of the available options in the dropdown list.

When `show-selected` is set, you can additionally set `show-selected-first` to make the selected option appear as the first item in the dropdown.
Without `show-selected` the setting of `show-selected-first` has no effect.


### collapse-onblur

When the element loses focus, the dropdown will collapse.
To make it remain expanded set the `collapse-onblur="false"` attribute.

```html
<ff-sortbox collapse-onblur="false"></ff-sortbox>
```


### Rendered HTML

When set up like in the example above, the rendered HTML could look like this.

```html
<ff-sortbox collapse-onblur="false" tabindex="1" opened>
    <div class="ffw-selected-container">
        <ff-sortbox-item key="Relevancy.desc" class="ffw-selected" style="display: block;">Relevance</ff-sortbox-item>
    </div>

    <div class="ffw-dropdown-container" style="overflow: hidden; height: auto;" opened>
        <ff-sortbox-item key="Price.asc" style="display: block;">Lowest price</ff-sortbox-item>

        <ff-sortbox-item key="Price.desc" style="display: block;">Highest price</ff-sortbox-item>

        <ff-sortbox-item key="Discount_Percent.asc" style="display: block;">Discount asc</ff-sortbox-item>

        <ff-sortbox-item key="Discount_Percent.desc" style="display: block;">Discount desc</ff-sortbox-item>
    </div>
</ff-sortbox>
```
