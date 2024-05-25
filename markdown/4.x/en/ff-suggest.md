## `ff-searchbox` properties for Suggest

The search box has two attributes which affect the `ff-suggest`:

With the `suggest-onfocus` attribute, you can define if the Suggest opens when the `ff-searchbox` gains focus.
Possible values are `"true"` and `"false"` (default is `"false"`).

With the `hide-suggest-onblur` attribute, you can define if the Suggest
will be closed when the `ff-searchbox` loses focus.
Possible values are `"true"` and `"false"` (default is `"true"`).

> Important
>
> Using `hide-suggest-onblur="true"` is **no longer recommended** as this approach regularly causes problems on mobile devices and, under some circumstances, on desktop devices.
> You should use `hide-suggest-onblur="false"` and `ff-suggest`'s `hide-onblur="true"` instead.
> More info below.

The `ff-suggest` is triggered when at least two characters are in the search box.

```html
<ff-searchbox suggest-onfocus="false" hide-suggest-onblur="false">
    <input placeholder="Search..." />
</ff-searchbox>
```

For more information on `ff-searchbox`, see
[Searchbox Example](/api/4.x/ff-searchbox#tab=docs)

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

## Adding a Suggest container

You need to annotate an element with the `data-container="suggestType"`
attribute for each suggest type configured in the FactFinder backend.

The `ff-suggest` element hides the annotated container if no suggestions
are found for this type.

In addition, you need to add a `ff-suggest-item` element inside the
container. All received suggestions of this `"suggestType"` are inserted
at this position and will be an exact copy of this element. `ff-suggest-item` supports [image binding](/api/4.x/ImageBindingBehavior#tab=docs).

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

See [Template Engine](/documentation/4.x/template-engine) for more details.

### Rendered HTML

Container templates provided inside the `ff-suggest` tag will be rendered inside several additional `div` elements.

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

            window.open("https://www.your-shop.example" + articleNr, "_blank");
        }
    });
</script>
```

## On-Click redirect
The expected behavior after clicking on an `ff-suggest-item` element of type `productName` is a redirection to the clicked product's page.
However, `ff-suggest` supports this functionality only if a `deeplink` field is available in the clicked item's attributes data.
The `deeplink` field is populated with the data from the data feed export column configured with the `Deeplink` field role.

> Note
>
> `ff-suggest` redirects both absolute and relative URLs.

If no `deeplink` is provided for an item of type `productName`, then `ff-suggest` will try to obtain its value by emitting an additional request.
Depending on the used FactFinder version it will be a search request (versions lower than `7.3`), or a records API call (versions `7.3` and up).
Then `ff-suggest` will try to redirect the user once more, this time using the data received from the response to the mentioned request.

If the clicked item is not of type `productName`, a standard search request will be issued to FactFinder with an additional parameter `queryFromSuggest` which is unique to `ff-suggest` and may be used to identify search requests issued by this element.

To prevent the built-in behavior, please set `ffPreventDefault` to `true` on a specific suggest item before the default event listener reacts to the `click` event.
See the **"Overriding default click action"** section above for more information and example usage of how to set that flag.


## Closing the Suggest popup

In order to automatically close the Suggest's popup when appropriate, you best set the attribute `hide-onblur="true"`.
This adds a click listener to the page's `document` object.
The Suggest's popup will close whenever you click outside the popup **and** outside the `ff-searchbox` that triggered the Suggest.

Take care to not prevent the click event from bubbling up to the `document` or the popup will not close.

> Important
>
> Make sure to always set `ff-searchbox`'s `hide-suggest-onblur` to `"false"` when using this feature.
> It will otherwise cause undefined behavior.

`ff-searchbox`'s `hide-suggest-onblur="true"` is the old approach to closing the Suggest's popup that is no longer recommended because it does not work with touch devices and long clicks.
For backward compatibility, however, it remains available.

Both approaches cause the Suggest to disappear when there are less than two characters in the search box or when you press the ESC key.

This is the **recommended setup**:

```html
<ff-searchbox hide-suggest-onblur="false"></ff-searchbox>
<ff-suggest hide-onblur="true"></ff-suggest>
```
