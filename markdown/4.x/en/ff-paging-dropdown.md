## Overview
The `ff-paging-dropdown` acts like the `ff-paging` element, but is displayed as a dropdown.

You can access the value of a paging item with the **{{caption}}** syntax.

> Note
>
> If you want to configure the number of possible pages shown in the dropdown, refer to your FACT-Finder UI -> Basic Settings -> Result listing -> Paging (Number of Links)

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

## ff-paging-select

If you wish to use a native HTML `select` to render paging dropdown, you can use `ff-paging-select` element.

It can work without providing any custom templates, however you can define your own `select` and/or `option`.

The most basic setup:
```html
<ff-paging-select></ff-paging-select>
```

Will act like:
```html
<ff-paging-select>
    <select>
        <option>{{caption}}</option>
    </select>
</ff-paging-select>
```

You may customize only the `select` element:
```html
<ff-paging-select>
    <select class="user-class"></select>
</ff-paging-select>
```

Or just the `option`:
```html
<ff-paging-select>
    <option>Page {{caption}}</option>
</ff-paging-select>
```

Or both of them:
```html
<ff-paging-select>
    <select class="user-class">
        <option>Page {{caption}}</option>
    </select>
</ff-paging-select>
```

### Rendered HTML

Assuming FACT-Finder is set to display 5 links, the latest example will produce the following HTML:
```html
<ff-paging-select>
    <select class="user-class">
        <option>Page 1</option>
        <option>Page 2</option>
        <option>Page 3</option>
        <option>Page 4</option>
        <option>Page 5</option>
    </select>
</ff-paging-select>
```