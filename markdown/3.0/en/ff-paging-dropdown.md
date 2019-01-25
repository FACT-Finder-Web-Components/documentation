## Overview
The `ff-paging-dropdown` acts like the `ff-paging` element, but is displayed as a dropdown.

You can access the value of a paging item with the **{{caption}}** syntax.

**Note:** If you want to configure the number of possible pages shown in the dropdown, refer to your
FACT-Finder-UI backend -> Basic Settings -> Result listing -> Paging (Number of Links)

```html
<ff-paging-dropdown>
    <ff-paging-item>{{caption}}</ff-paging-item>
</ff-paging-dropdown>
```

### show-selected

When the attribute `show-selected` is set on the `ff-paging-dropdown`, the dropdown contains the currently selected element.

```html
<ff-paging-dropdown show-selected>
    <ff-paging-item>{{caption}}</ff-paging-item>
</ff-paging-dropdown>
```

## paging-item

In difference to an `ff-paging` element the `ff-paging-dropdown` accepts only one `ff-paging-item` as a template for all generated pages. 


```html
<ff-paging-dropdown show-selected>
    <ff-paging-item>{{caption}}</ff-paging-item>
</ff-paging-dropdown>
```

### Rendered HTML

When setup like in the example above, the rendered HTML could look like this.

```html
<ff-paging-dropdown show-selected="" tabindex="999" class="">
    <ff-paging-item class="ffw-selected" type="pageLink">
        <div class="ffw-page-item-container ffw-cursor">1</div>
    </ff-paging-item>
    <div class="ffw-paging-dropdown-container ffw-paging-dropdown-closed">
        <ff-paging-item class="ffw-selected" type="pageLink">
            <div class="ffw-page-item-container ffw-cursor">1</div>
        </ff-paging-item>
        <ff-paging-item class="" type="pageLink">
            <div class="ffw-page-item-container ffw-cursor">2</div>
        </ff-paging-item>
        <ff-paging-item class="" type="pageLink">
            <div class="ffw-page-item-container ffw-cursor">3</div>
        </ff-paging-item>
    </div>
</ff-paging-dropdown>
```