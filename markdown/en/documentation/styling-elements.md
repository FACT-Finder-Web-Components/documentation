## Style Encapsulated HTML

---
Web Components can be styled via CSS like regular HTML. Some elements have an internal HTML structure. Because of the style encapsulation of shadow DOM those elements can no longer be reached as usual. Because the [/deep/ and ::shadow](https://blog.polymer-project.org/announcements/2015/12/01/deprecating-deep/) style rules are deprecated, [custom properties and mixins](https://www.polymer-project.org/1.0/docs/devguide/styling.html) have been introduced in order to pass on styles across the borders of shadow DOM.

You can find all mixins and custom properties in the documentation or the HTML files of the individual elements.

Example for the internal HTML structure of the [`ff-paging-item`](api/ff-paging#tab=docs):
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

In order to style the `<div>` inside this element the [`---paging-item-cursor-mixin`](ff-paging#tab=api) was introduced. To overwrite the default styles the following code can be used:
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

---
In browsers where Web Components are not natively supported you might encounter ugly flashing of unstyled content while the page is loading. To prevent this just annotate all elements that have a visual component and are shown immediately on page load with the `unresolved` attribute.
```html
<ff-record-list unresolved></ff-record-list>
```
Also add the following CSS rule on top of the page before the appearance of your custom elements:

The full example would look like this: 
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

**Note:** This behavior was released with version 1.0.8 and is therefore not supported in 1.0.0!

To check if you are already using version 1.0.8, go to your browser's console and type `factfinder.communication.version`. If `undefined` is returned, it means you are not using 1.0.8.
