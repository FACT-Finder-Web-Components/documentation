## Style Encapsulated HTML
Web Components can by styled via CSS like regular HTML. Some elements have an internal HTML structure.
Because of the style encapsulation of Shadow DOM those elements can no longer be reached as usual.
Because the [/deep/ and ::shadow](https://blog.polymer-project.org/announcements/2015/12/01/deprecating-deep/) 
style rules are deprecated, [custom properties and mixins](https://www.polymer-project.org/1.0/docs/devguide/styling.html)
have been introduced in order to pass on styles across the borders of Shadow DOM.
You can find all mixins and custom properties in the documentation or the html files of the individual elements.

Example for the internal HTML structure of the ff-paging-item:
```html
<dom-module id="ff-paging-item">
    <style>
        :host {
            display: inline-block;
        }

        .cursor {
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            @apply(--paging-item-cursor-mixin);
        }
    </style>
    <template>
        <div id="pageItemContainer" class="cursor">
            <content>&nbsp;</content>
        </div>
    </template>
</dom-module>
```

In order to style the div inside this element the `---paging-item-cursor-mixin` was introduced.
To overwrite the default styles the following code can be used:
```html
<style is="custom-style">
    ff-paging-item {
        --paging-item-cursor-mixin: {
            cursor: crosshair;
            border: 1px solid black;
        };
    }
</style>
<ff-paging-item></ff-paging-item>
```

It is important, that the style element possesses the property &quot;is&quot; with the value &quot;custom-style&quot;.

## Prevent FOUC (Flash Of Unstyled Content)
In browsers where web components are not natively supported you might encounter ugly flash of unstyled content on page load. 
To prevent this we added a __remove unresolved attribute behavior__ to all elements with an visual component (e.g. ff-record-list, ff-asn and so on).
Just annotate all elements which are shown immediately on page load with the __\[unresolved\]__  attribute. 
In Addition add the following CSS rule on top of the page before the appearance of your  custom elements:
```html
<style>
    [unresolved] {
        opacity: 0;
    }
</style>
```

Full example would look like: 
```html
<style>
    [unresolved] {
        opacity: 0;
    }
</style>

<ff-record-list unresolved>
    ...
</ff-record-list>
```

**NOTE:** This behavior was released with version 1.0.8 and is therefore not supported in 1.0.0!


To check if you are already using version 1.0.8 type: `factfinder.communication.version` in your browser console -> undefined means you are not using 1.0.8
