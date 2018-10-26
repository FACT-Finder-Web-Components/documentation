## Overview
The simplest way of using a sortbox, is to simply use the default settings.
This will display all sort options defined in the FACT-Finder backend as a dropdown.
```html
<ff-sortbox></ff-sortbox>
```

If you want the dropdown of the sortbox to collapse when you click outside of it, add the attribute
` collapse-onblur="true"` to it.
```html
<ff-sortbox collapse-onblur="true"></ff-sortbox>
```

## Custom templates
With the `key` property on a `ff-sortbox-item`, you can define different
templates for the sortbox keys.

Use "default.template" as the key to define a template for all keys.
You can also define a special template for a specific key, for example <b>Price.asc</b>.

The key is assembled from the sort option name and the sort direction (asc/desc).
Inside the `ff-sortbox-item`, you can access the sort option name with `{{description}}`.
```html
<ff-sortbox collapse-onblur="true">
    <!--
    key "default.template" is a pseudo key used to specify a default template for all sortbox items
    -->
    <ff-sortbox-item key="default.template">
        <span style="font-size: 15px">Default Style: {{description}}</span>
    </ff-sortbox-item>

    <!--
    this key is related to data returned by FACT-Finder its always FIELDNAME.ORDER
    except for relevance its "null.desc"
    -->
    <ff-sortbox-item key="Price.asc">
        <span style="font-size: 18px">Overridden for: {{description}}</span>
    </ff-sortbox-item>

    <!--override relevance layout -->
    <ff-sortbox-item key="null.desc">
        Relevance
    </ff-sortbox-item>
</ff-sortbox>
```

## Show-selected/show-selected-first
With the `show-selected="true"` property, the selected sort option is part of the
available options in the dropdown list (default is false).

And with the `show-selected-first="true"` property, the selected item is the first in the dropdown.

To realize a sortbox as shown above, you need to hide the "selected" item and add a custom clickhandler on the sortbox to toggle the dropdown.
    
Example shown below:
```html
<div style="display: inline-block">
    <div class="sortBoxCaption" onclick="toggleSortbox('#sortbox3');">
        Sort items..
    </div>
    <ff-sortbox show-selected="true" show-selected-first="true" id="sortbox3"></ff-sortbox>
</div>

<!-- custom click handler-->
<script>
    function toggleSortbox(selector) {
        document.querySelector(selector).toggle();
    }
</script>

<!-- A way to display the sortbox as a clickable Button -->
<style>
    .sortBoxCaption {
        margin: 0;
        padding: 10px;
        cursor: pointer;
        border: 1px solid black;
        display: inline-block;
        font-weight: bold;
    }

    #sortbox3 {
        border: none;
        display: block;
        margin-top: -1px;
        margin-left: 1px;
    }

    /*hide the currently selected sortbox item*/
    #sortbox3 ff-sortbox-item.selected {
        display: none !important;
    }

    #sortbox3 ff-sortbox-item.showSelected {
        background-color: lightgray;
    }
</style>
```