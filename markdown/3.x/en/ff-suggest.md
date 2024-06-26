## `ff-searchbox` properties for Suggest

The search box has 2 attributes which affect the `ff-suggest`:

With the `suggest-onfocus` attribute, you can define if the suggest
opens when the `ff-searchbox` gains focus. Values are boolean as String
(default is `"false"`).

With the `hide-suggest-onblur` attribute, you can define if the suggest
will be closed when the `ff-searchbox` loses focus. Values are boolean
as String (default is `"true"`).

The `ff-suggest` is triggered when at least 2 characters are in the
search box.

```html
<ff-searchbox suggest-onfocus="false" hide-suggest-onblur="true">
    <input placeholder="Search..." />
</ff-searchbox>
```

For more information on `ff-searchbox`, see
[Searchbox Example](/api/3.x/ff-searchbox#tab=docs)

## The basics

The `ff-suggest` element respects only `section` child elements.
The `section` elements are used for the built-in list/block layout.

```html
<ff-suggest>
    <section>
        <!--content-->
    </section>
    <section>
        <!--content-->
    </section>
</ff-suggest>
```

## Adding a suggest container

You need to annotate an element with the `data-container="suggestType"`
attribute for each suggest type configured in the FactFinder backend.

The `ff-suggest` element hides the annotated container if no suggestions
are found for this type.

In addition you need to add a `ff-suggest-item` element inside the
container. All received suggestions of this `"suggestType"` are inserted
at this position and will be an exact copy of this element. `ff-suggest-item` supports [image binding](/api/3.x/ImageBindingBehavior#tab=docs).

Repeat this process for all configured `"suggestTypes"`.

```html
<ff-suggest>
    <section>
        <div data-container="suggestType">
            <span>Suggestions for suggestType</span>
            <div>
                <!--ff-suggest-items are always added at the original postion of the template-->
                <ff-suggest-item type="suggestType">
                    <div>{{{name}}}</div>
                    <img width="100" height="100" data-image />
                </ff-suggest-item>
            </div>
        </div>
    </section>
</ff-suggest>
```

#### Hit highlighting

Note the triple curly braces in `<span>{{{name}}}</span>`, which enable the rendering of HTML code in the template engine.
`ff-suggest` inserts HTML here, and the matched string from your search box is wrapped in a `<span class="ffw-query">` tag to allow you to highlight the matched text through CSS.
If you used the regular double curly braces and typed "back" in the search box, the HTML source code would be shown as plain text: `<span class="ffw-query">Back</span>packs` rather than the rendered: "**Back**packs".

See [Template Engine](/documentation/3.x/template-engine) for more details.

### Rendered HTML

Container templates provided inside `<ff-suggest>` tag will be rendered inside
several additional wrapping `<div>` HTML elements.

For example, the following HTML provided by the user:

```html
<ff-suggest layout="block">
    <section>
        <div data-container="suggestType">
            <span>Suggestions for suggestType</span>
            <div>
                <ff-suggest-item type="suggestType">
                    <span>{{{name}}}</span>
                </ff-suggest-item>
            </div>
        </div>
    </section>
</ff-suggest>
```

for 2 suggestions of ```suggestType``` will be rendered as:

```html
<ff-suggest layout="block">
    <div style="position:relative;width:100%">
        <div class="ffw-suggestContainerWrapper">
            <div class="ffw-suggestContainer ffw-blockLayout">
                <section>
                    <div data-container="suggestType">
                        <span>Suggestions for suggestType</span>
                        <div>
                            <ff-suggest-item type="suggestType">
                                <span><span class="ffw-query">Sugg</span>estion 1</span>
                            </ff-suggest-item>
                            <ff-suggest-item type="suggestType">
                                <span><span class="ffw-query">Sugg</span>estion 2</span>
                            </ff-suggest-item>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</ff-suggest>
```

## Add Keyboard Support

Keyboard arrow key support is enabled by default. When a
`ff-suggest-item` is selected using the arrow keys, the class
`ffw-highlight-suggest-item` is added to its class list. So you simply
need to add CSS rules to highlight the selected item.

```html
<style>
    ff-suggest-item.ffw-highlight-suggest-item {
        background-color: lightgray;
    }
</style>
```

## Changing the layout (block/list)

Using the "layout" attribute you can define a basic layout for the
`ff-suggest-items`.

Setting the `block` value results in a layout, in which all section
child elements are displayed horizontally.

Setting the `list` (default) value results in a layout, in which all
section child elements are displayed vertically.

```html
<ff-suggest layout="block">
    <!--section elements are displayed horizontally-->
    <section></section>  <section></section>
</ff-suggest>

<ff-suggest layout="list">
    <!-- section elements are displayed vertically-->
    <section></section>
    <section></section>
</ff-suggest>
```

## Overriding default click action

To override the action that happens on click/tap, you can use the
event `"suggest-item-clicked"`.

See the following example:

```html
<ff-suggest>
    <!-- content -->
</ff-suggest>

<script>
    document.querySelector("ff-suggest").addEventListener("suggest-item-clicked", function (e) {
        // Reference to the clicked ff-suggest-item HTML element
        const ffSuggestItem = e.detail.element;
        // Reference to the suggest item's underlying data
        const suggestionData = e.detail.suggestion;

        // Check if the ffSuggestItem matches the desired type for which you want to override the action
        if (suggestionData.type === "productName") {
            // Tell the suggest-item to skip its default action
            ffSuggestItem.ffPreventDefault = true;

            // The fields contained in "attributes" must be configured in the FactFinder UI
            const articleNr = suggestionData.attributes["articleNr"];

            window.open("http://www.your-shop.example" + articleNr, "_blank");
        }
    });
</script>
```
