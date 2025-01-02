## ff-paging-dropdown

The `ff-paging-dropdown` acts like the `ff-paging` element, but is displayed as a dropdown.

```html
<ff-paging-dropdown></ff-paging-dropdown>
```

> Note
>
> `ff-paging-dropdown` displays the current page number plus up to four pages each before and after the currently selected page.


### show-selected

When the attribute `show-selected` is set on the `ff-paging-dropdown`, the dropdown contains the currently selected element.

```html
<ff-paging-dropdown show-selected></ff-paging-dropdown>
```


### paging-item

Different to an `ff-paging` element, `ff-paging-dropdown` accepts only one `ff-paging-item` as a template for all generated pages.

You can access the value of a paging item with the **{{page}}** syntax.

```html
<ff-paging-dropdown show-selected>
    <ff-paging-item>{{page}}</ff-paging-item>
</ff-paging-dropdown>
```


### Rendered HTML

When set up like in the example above, the rendered HTML could look like this.

```html
<ff-paging-dropdown show-selected="" tabindex="999" class="">
    <ff-paging-item class="">
        <div class="ffw-page-item-container ffw-cursor">1</div>
    </ff-paging-item>
    <div class="ffw-paging-dropdown-container ffw-paging-dropdown-closed">
        <ff-paging-item class="" type="currentLink">
            <div class="ffw-page-item-container ffw-cursor ffw-selected">1</div>
        </ff-paging-item>
        <ff-paging-item class="">
            <div class="ffw-page-item-container ffw-cursor">2</div>
        </ff-paging-item>
        <ff-paging-item class="">
            <div class="ffw-page-item-container ffw-cursor">3</div>
        </ff-paging-item>
    </div>
</ff-paging-dropdown>
```


## ff-paging-select

If you wish to use a native HTML `select` to render paging dropdown, you can use `ff-paging-select` element.

It works without providing any custom templates.
However, you can still define your own `select` and/or `option`.

> Note
>
> `ff-paging-select` displays the current page number plus up to four pages each before and after the currently selected page.

The most basic setup:
```html
<ff-paging-select></ff-paging-select>
```

Will act like:
```html
<ff-paging-select>
    <select>
        <option>{{page}}</option>
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
    <option>Page {{page}}</option>
</ff-paging-select>
```

Or both of them:
```html
<ff-paging-select>
    <select class="user-class">
        <option>Page {{page}}</option>
    </select>
</ff-paging-select>
```


### Rendered HTML

Suppose the current search result is for _page 2_, the last example above will produce the following HTML:
```html
<ff-paging-select>
    <select class="user-class">
        <option>Page 1</option>
        <option>Page 2</option>
        <option>Page 3</option>
        <option>Page 4</option>
        <option>Page 5</option>
        <option>Page 6</option>
    </select>
</ff-paging-select>
```
