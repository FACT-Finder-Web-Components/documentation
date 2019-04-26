## Overview
You can choose from two different kinds of sortboxes. The `ff-sortbox-select` is a native HTML `select` element. 
The `ff-sortbox` is a custom-built dropdown element. Both can be used with or without customization.

## Native HTML select
The `ff-sortbox-select` displays a native HTML `select` element.

Minimal setup:
```
<ff-sortbox-select></ff-sortbox-select>
```

Specifying only the `option` element:
```
<ff-sortbox-select>
  <option>{{description}}</option>
</ff-sortbox-select>
```

Specifying the `select` and the `option` elements:
```
<ff-sortbox-select>
    <select class="example-class">
        <option>Sort by: {{description}}</option>
    </select>
</ff-sortbox-select>
```

### Rendered HTML

When setup like in the last example above, the rendered HTML could look like this.

```html
<ff-sortbox-select>
    <select class="example-class">
        <option>Sort by: Title A-Z</option>
        <option>Sort by: Title Z-A</option>
        <option>Sort by: Relevance</option>
    </select>
</ff-sortbox-select>
```



## Custom-built dropdown
Adding `<ff-sortbox></ff-sortbox>` to your page will add a custom-built HTML dropdown containing all criteria defined in the FACT-Finder back-end.  
Optionally, you can specify your own templates by adding `ff-sortbox-item` elements with their `key` attribute set to the relevant value. If you don't specify any templates, rendered `ff-sortbox-item`s will contain their plain text description as provided by FACT-Finder.

Available keys are as follows:

| Key | Description |
| --- | --- |
| default.template | This is the fallback template for all options that have no other template defined. |
| ff.relevance | FACT-Finder always returns an option to sort by relevance. |
| _{key from FACT-Finder response}_.asc | An option as specified in FACT-Finder in ascending order. (e.g. `Price.asc`, `Title.asc`) |
| _{key from FACT-Finder response}_.desc | An option as specified in FACT-Finder in descending order. |

Inside the `ff-sortbox-item` you can access the sort option name with `{{description}}`.

```html
<ff-sortbox>
    <!--
    "default.template" is a pseudo key used to specify a default template for all sortbox items
    -->
    <ff-sortbox-item key="default.template" class="customCssClass">
        <span>Default Style: {{description}}</span>
    </ff-sortbox-item>

    <!-- override relevance layout -->
    <ff-sortbox-item key="ff.relevance">Relevance</ff-sortbox-item>

    <!--
    other keys are related to data returned by FACT-Finder. their format is always FIELDNAME.ORDER
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

By default, the selected sort option will disappear from the dropdown list and appear in the static container of the element. Setting the `show-selected="true"` attribute the selected option remains part of the available options in the dropdown list.

When `show-selected` is set to `true`, you can additionally set `show-selected-first="true"` to make the selected option appear as the first item in the dropdown.  
Without `show-selected="true"` the setting of `show-selected-first` has no effect.

### collapse-onblur

To make the dropdown disappear when the element loses focus set the `collapse-onblur` attribute to `true`. Default is `false`.
```html
<ff-sortbox collapse-onblur="true"></ff-sortbox>
```

### Rendered HTML

When setup like in the example above, the rendered HTML could look like this.

```html
<ff-sortbox collapse-onblur="false" show-selected="true" show-selected-first="false" tabindex="1" opened>

    <div class="ffw-selected-container">
        <ff-sortbox-item key="Rating.desc" class="ffw-selected">
            <span><em>Overridden for: Rating descending</em></span></ff-sortbox-item>
    </div>

    <div class="ffw-dropdown-container">
        <ff-sortbox-item key="ff.relevance">Relevance</ff-sortbox-item>

        <ff-sortbox-item key="Price.asc">
            <span style="font-size: 18px">Overridden for: Price ascending</span></ff-sortbox-item>

        <ff-sortbox-item key="Price.desc" class="customCssClass">
            <span>Default Style: Price descending</span></ff-sortbox-item>

        <ff-sortbox-item key="Rating.asc" class="customCssClass">
            <span>Default Style: Rating ascending</span></ff-sortbox-item>

        <ff-sortbox-item key="Rating.desc" class="ffw-showSelected">
            <span><em>Overridden for: Rating descending</em></span></ff-sortbox-item>
    </div>

</ff-sortbox>
```

### Example

To implement a sortbox with fixed content in its static box you need to hide the "selected" item and attach a custom click handler to the sortbox to toggle the dropdown.

```html
<div style="display: inline-block">
    <div class="sortBoxCaption" onclick="toggleSortbox('#sortbox1');">
        Sort items..
    </div>
    <ff-sortbox id="sortbox1" show-selected="true" show-selected-first="true"></ff-sortbox>
</div>

<!-- custom click handler-->
<script>
    function toggleSortbox(selector) {
        document.querySelector(selector).toggle();
    }
</script>

<!-- a way to display the sortbox as a clickable button -->
<style>
    .sortBoxCaption {
        margin: 0;
        padding: 10px;
        cursor: pointer;
        border: 1px solid black;
        display: inline-block;
        font-weight: bold;
    }

    #sortbox1 {
        border: none;
        display: block;
        margin-top: -1px;
        margin-left: 1px;
    }

    #sortbox1 ff-sortbox-item.ffw-showSelected {
        background-color: lightgray;
    }

    /* hide the container of the currently selected sortbox item */
    #sortbox1 .ffw-selected-container {
        display: none !important;
    }
</style>
```
