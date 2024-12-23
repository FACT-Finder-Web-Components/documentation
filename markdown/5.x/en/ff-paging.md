## Overview

With the `ff-paging` element, you can build a custom paging for your search results.
A paging may contain several `ff-paging-set` elements and each `ff-paging-set` element contains several `ff-paging-item` elements.

You can access the page number a paging item represents with the `{{page}}` syntax.

```html
<ff-paging id="paging2">
    <ff-paging-item type="currentLink -2">{{page}}</ff-paging-item>
    <ff-paging-item type="currentLink -1">{{page}}</ff-paging-item>
    <ff-paging-item type="currentLink" style="font-weight: bold;">{{page}}</ff-paging-item>
    <ff-paging-item type="currentLink +1">{{page}}</ff-paging-item>
    <ff-paging-item type="currentLink +2">{{page}}</ff-paging-item>
</ff-paging>
```


### show-only

When the attribute `show-only` is present, the paging does not react to clicks.

```html
<ff-paging show-only>
    //...
</ff-paging>
```


## paging-set

Define different `ff-paging-set` elements based on which page you are on right now.

The `state` attribute is evaluated as a boolean expression.
When its value is `true`, the `ff-paging-set` is visible.

The possible variables to build the expressions are `currentPage` , `pageCount` and numeric values.

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


## paging-item

You can style the different `ff-paging-item` elements and define which links you want to display in a given paging-set.

This might look cumbersome and bloated, but it gives a very defined and in-depth way to design your paging element.

You have to set a `type` attribute in the `ff-paging-item` where you select a "page".
This is an expression built from the possible values below:

- **firstLink** : points to the first page.
- **lastLink** : points to the last page.
- **nextLink** : points to the next page if available. (currentPage +1)
  - _Usually this link is displayed as an arrow or something similar._
- **previousLink** : points to the previous page if available. (currentPage -1)
  - _Usually this link is displayed as an arrow or something similar._
- **currentLink** : points to the current page. You can add or subtract to define a specific page like `currentLink+2` or `currentLink-1`

> Note
>
> The `ff-paging-item` will only be visible when the expression resolves to a valid page!

The paging-item also has a `show-only` attribute and works like the `show-only` on the paging itself.

Side Note: Between the `ff-paging-items` you can add some placeholders like '...'.
They will always be visible.


### Rendered HTML

The template you provide in `ff-paging-item` tag will be rendered inside a wrapping `div`:

```html
<!-- Currently selected item -->
<ff-paging-item type="currentLink" class="ffw-selected">
	<div class="ffw-page-item-container ffw-cursor">1</div>
</ff-paging-item>

<!-- Regular visible and clickable item -->
<ff-paging-item type="currentLink +1" class="">
	<div class="ffw-page-item-container ffw-cursor">2</div>
</ff-paging-item>
```


## Example implementation

```html
<ff-paging id="paging3" class="paging3">
    <ff-paging-set id="p3set1" state="currentPage <= 3">
        <ff-paging-item type="previousLink">{{page}}</ff-paging-item>

        <ff-paging-item type="currentLink -2">{{page}}</ff-paging-item>
        <ff-paging-item type="currentLink -1">{{page}}</ff-paging-item>
        <ff-paging-item type="currentLink" style="font-weight: bold;">{{page}}</ff-paging-item>
        <ff-paging-item type="currentLink +1">{{page}}</ff-paging-item>
        ...
        <ff-paging-item type="nextLink">{{page}}</ff-paging-item>
        <ff-paging-item type="lastLink">last</ff-paging-item>
    </ff-paging-set>

    <ff-paging-set id="p3set2" state="currentPage > 3 && pageCount-currentPage >= 3">
        <ff-paging-item type="firstLink">{{page}}</ff-paging-item>

        <ff-paging-item type="previousLink">{{page}}</ff-paging-item>
        ...
        <ff-paging-item type="currentLink -1">{{page}}</ff-paging-item>
        <ff-paging-item type="currentLink" style="font-weight: bold;">{{page}}</ff-paging-item>
        <ff-paging-item type="currentLink +1">{{page}}</ff-paging-item>
        ...
        <ff-paging-item type="nextLink">{{page}}</ff-paging-item>

        <ff-paging-item type="lastLink">{{page}}</ff-paging-item>
    </ff-paging-set>

    <ff-paging-set id="p3set3" state="pageCount-currentPage < 3 && currentPage > 3">
        <ff-paging-item type="firstLink">first</ff-paging-item>
        <ff-paging-item type="previousLink">{{page}}</ff-paging-item>
        ...
        <ff-paging-item type="currentLink -1">{{page}}</ff-paging-item>
        <ff-paging-item type="currentLink" style="font-weight: bold;">{{page}}</ff-paging-item>
        <ff-paging-item type="currentLink +1">{{page}}</ff-paging-item>
        <ff-paging-item type="currentLink +2">{{page}}</ff-paging-item>

        <ff-paging-item type="nextLink">{{page}}</ff-paging-item>
    </ff-paging-set>
</ff-paging>
```
