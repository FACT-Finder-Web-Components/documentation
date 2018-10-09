## `ff-searchbox` properties for Suggest

The search box has 2 attributes which affect the `ff-suggest`:

With the `suggest-onfocus` attribute, you can define if the suggest opens
when the `ff-searchbox` gains focus. Values are boolean (default is
`false`).

With the `hidesuggest-onblur` attribute, you can define if the suggest
will be closed when the `ff-searchbox` loses focus. Values are boolean
(default is `true`).

The `ff-suggest` is triggered when at least 2 characters are in the
search box.

```html
<input is="ff-searchbox"
       placeholder="Search..."
       suggest-onfocus="false"
       hidesuggest-onblur="true"/>
```

For more information on `ff-searchbox`, see
[Searchbox Example](api/ff-searchbox#tab=doc)

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
attribute for each suggest type configured in the FACT-Finder backend.

The `ff-suggest` element hides the annotated container if no suggestions
are found for this type.

In addition you need to add a `ff-suggest-item` element inside the
container. All received suggestions of this `"suggestType"` are inserted
at this position and will be an exact copy of this element.

Repeat this process for all configured `"suggestTypes"`.

```html 
<ff-suggest>
    <section>
        <div data-container="suggestType">
            <span>Suggestions for suggestType</span>
            <div>
                <!--ff-suggest-items are always added at the original postion of the template-->
                <ff-suggest-item type="suggestType">
                    <span>{{{name}}}</span>
                </ff-suggest-item>
            </div>
        </div>
    </section>
</ff-suggest>
```

**Note** the triple curly braces in `<span>{{{name}}}</span>`, which
enable the rendering of HTML code inserted via Polymer's data binding.
`ff-suggest` inserts HTML here and the matched string from your search
box is wrapped in a `<span class="query">` tag to allow you to highlight
the matched text through CSS. If you used the regular double curly
braces and typed "back" in the search box, the HTML source code would be
shown as a plain text: `<span class="query">Back</span>packs`
rather than the rendered: "**Back**packs".

See [Template Engine](documentation/template-engine) for more details.

## Add Keyboard Support

Keyboard arrow key support is enabled by default. When a
`ff-suggest-item` is selected using the arrow keys, the class
`ff-highlight-suggest-item` is added to its class list. So you simply
need to add CSS rules to highlight the selected item.

```html
<style>
    ff-suggest-item.ff-highlight-suggest-item {
        background-color: lightgray;
    }
</style>
```

## Changing the layout (block/list)

With the "layout" attribute you can define a basic layout of the suggest
items.

Setting the **block** value results in a layout, where all section child
elements are displayed horizontally.

Setting the **list** (default) value results in a layout where all
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
"suggest-item-clicked" event.

See the following example:

```html 
<ff-suggest>
    //content...
</ff-suggest>

<script>
    document.querySelector("ff-suggest").addEventListener("suggest-item-clicked", function (e) {
        //reference to the html element
        var ffSuggestItem = e.detail.element;
        //reference to data
        var suggestionData = e.detail.suggestion;

        //check if the ffSuggestItem matches the desired type for which you want to override the action
        if (suggestionData.type === "productName") {
            //configure in the FACT-Finder backend which fields should be returned in the attributes property!
            var articleNr = ffSuggestItem.attributes["articleNr"];
            window.open("http://www.your-shop.example/"+articleNr, "_blank");

            //tell the suggest-item to skip its default action;
            ffSuggestItem.ffPreventDefault = true;
        }
    });
</script>
```

## Capture record on suggest `productName` click and redirect to detail page

Listen for the `suggest-product-record` event and capture the record of
the clicked suggest item.

Take a look at the following example:

```html
<ff-suggest>
    //content...
</ff-suggest>

<script>
    document.querySelector("ff-suggest").addEventListener("suggest-product-record", function (event) {
        var record = event.detail.record;

        // Implied that the product detail page uses the `ff-record` element to display the product information's,
        // we set the recordData attribute to the record obtained after the suggest "productName" click
        document.querySelector("detailPage ff-record").recordData = record;
    });
</script>
```
