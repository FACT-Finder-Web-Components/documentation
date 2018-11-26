## Overview
You can choose from two different kinds of sortboxes. The `ff-sortbox-select` is a native HTML `select` element. 
The `ff-sortbox` is a custom-built dropdown element. Both can be used with or without customization.

## Native HTML select
The code below will display a native HTML `select`. The template specified through the `data-template` attribute is 
optional. It will default to `<option>{{description}}</option>` if not present.

```html
<ff-sortbox-select>
    <option data-template>Sort by: {{description}}</option>
</ff-sortbox-select>
```

## Custom-built dropdown
Simply adding `<ff-sortbox></ff-sortbox>` to your page will add a custom-built HTML dropdown containing all criteria
defined in the FACT-Finder backend. With the `key` attribute you can define different templates for these options.

Use `"default.template"` as the key to define a default template for all options.

You can also define a special template for a specific option, for example `"Price.asc"`. The key is assembled from
the sort option name and the sort direction (asc/desc).

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

### Show-selected/show-selected-first
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