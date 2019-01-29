## Overview
Paging for `ff-record-list` can be included through the `ff-paging-dropdown` or the `ff-paging` element.


## ff-paging

With the `ff-paging` element, you can build a custom paging for your search results. A paging may
contain a few `ff-paging-set` elements and each `ff-paging-set` element contains a few
`ff-paging-item` elements.

You can access the value of a paging item with the `{{caption}}`  syntax.
```html
<ff-paging id="paging2">
    <ff-paging-item type="currentLink -2">{{caption}}</ff-paging-item>
    <ff-paging-item type="currentLink -1">{{caption}}</ff-paging-item>
    <ff-paging-item type="currentLink" style="font-weight: bold;">{{caption}}</ff-paging-item>
    <ff-paging-item type="currentLink +1">{{caption}}</ff-paging-item>
    <ff-paging-item type="currentLink +2">{{caption}}</ff-paging-item>
</ff-paging>
```

### paging-set

Define different `ff-paging-set` elements based on which page you are on right now.

The `state` attribute is evaluated as a boolean expression. When its value is `true`, the
`ff-paging-set` is visible.

The possible variables to build the expressions are `currentPage` , `pageCount`  and numeric
values.
```html
<ff-paging >
    <ff-paging-set  state="currentPage <= 3">
        ...
    </ff-paging-set>

    <ff-paging-set state="currentPage > 3 && pageCount-currentPage >= 3">
        ...
    </ff-paging-set>

    <ff-paging-set state="pageCount-currentPage < 3  && currentPage > 3">
        ...
    </ff-paging-set>
</ff-paging>
```

### paging-item

You can style the different `ff-paging-item` elements and define which links you want to
display in a given paging-set.

This might look cumbersome and bloated, but it gives a very defined and in-depth way to design your
paging  element.

You have to set a `type` attribute in the `ff-paging-item` where you select a "page". This is an expression built from the possible values below:

* **pageLink**  (default) 
* **firstLink** : points to the first page. 
* **lastLink** : points to the last page. 
* **nextLink** : points to the next page if available. (currentPage +1)
    * _Usually this link is displayed as an arrow or something similar._ 
* **previousLink** : points to the previous page if available. (currentPage -1)
    * _Usually this link is displayed as an arrow or something similar._ 
* **currentLink** : points to the current page. You can add or subtract to define a specific page like `currentLink+2` or `currentLink-1`

**Note**: The `ff-paging-item` will only be visible, when the expression validates for a page!

Each element has a `{{caption}}` property which you can define in the FACT-Finder backend.
Mostly used to design the first- / last- / next- /previous- link elements.

The paging-item also has a `show-only` attribute and works like the `show-only` on the
paging itself.

Side Note: Between the `ff-paging-items` you can add some placeholders like '...'. They
will always be visible.

### Rendered HTML

The template you provide in `ff-paging-item` tag will be rendered inside a wrapping `div`:

```html
<!--currently selected item-->
<ff-paging-item type="currentLink" class="ffw-selected" show-only="false">
	<div class="ffw-page-item-container ffw-cursor">1</div>
</ff-paging-item>

<!--regular visible and clickable item-->
<ff-paging-item type="currentLink +1" class="" show-only="false">
	<div class="ffw-page-item-container ffw-cursor">2</div>
</ff-paging-item>
```

### Example implementation

```html
<ff-paging id="paging3" class="paging3">
    <ff-paging-set id="p3set1" state="currentPage <= 3">
        <ff-paging-item type="previousLink">{{caption}}</ff-paging-item>

        <ff-paging-item type="currentLink -2">{{caption}}</ff-paging-item>
        <ff-paging-item type="currentLink -1">{{caption}}</ff-paging-item>
        <ff-paging-item type="currentLink" style="font-weight: bold;">{{caption}}</ff-paging-item>
        <ff-paging-item type="currentLink +1">{{caption}}</ff-paging-item>
        ...
        <ff-paging-item type="nextLink">{{caption}}</ff-paging-item>
        <ff-paging-item type="lastLink">last</ff-paging-item>


    </ff-paging-set>

    <ff-paging-set id="p3set2" state="currentPage > 3 && pageCount-currentPage >= 3">
        <ff-paging-item type="firstLink">{{caption}}</ff-paging-item>

        <ff-paging-item type="previousLink">{{caption}}</ff-paging-item>
        ...
        <ff-paging-item type="currentLink -1">{{caption}}</ff-paging-item>
        <ff-paging-item type="currentLink" style="font-weight: bold;">{{caption}}</ff-paging-item>
        <ff-paging-item type="currentLink +1">{{caption}}</ff-paging-item>
        ...
        <ff-paging-item type="nextLink">{{caption}}</ff-paging-item>

        <ff-paging-item type="lastLink">{{caption}}</ff-paging-item>
    </ff-paging-set>

    <ff-paging-set id="p3set3" state="pageCount-currentPage < 3 && currentPage > 3">
        <ff-paging-item type="firstLink">first</ff-paging-item>
        <ff-paging-item type="previousLink">{{caption}}</ff-paging-item>
        ...
        <ff-paging-item type="currentLink -1">{{caption}}</ff-paging-item>
        <ff-paging-item type="currentLink" style="font-weight: bold;">{{caption}}</ff-paging-item>
        <ff-paging-item type="currentLink +1">{{caption}}</ff-paging-item>
        <ff-paging-item type="currentLink +2">{{caption}}</ff-paging-item>

        <ff-paging-item type="nextLink">{{caption}}</ff-paging-item>
    </ff-paging-set>
</ff-paging>
```


## ff-paging-dropdown
The `ff-paging-dropdown` element creates a custom-built dropdown.

**Note:** If you want to configure the number of possible pages shown in the dropdown, refer to your
FACT-Finder-UI backend -> Basic Settings -> Result listing -> Paging (Number of Links)

### ff-paging-item
In difference to a `ff-paging` element the `ff-paging-dropdown` accepts only one `ff-paging-item` as a template for all generated pages. You can access the value of a paging item with the `{{caption}}` syntax.

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