## The basics

The `ff-suggest` element can render both regular suggestions and Popular Searches.
This article focuses on the setup for regular suggestions.

See the [Popular Searches](/api/5.x/popular-searches) article for details.


### Templating concept

The suggestions template is defined through a `template` element with the `data-role="suggestions"` attribute.

It only accepts `section` elements at the root level.
(This is due to legacy constraints.
A future version will remove this requirement.)

```html
<ff-suggest>
    <template data-role="suggestions">
        <section>
            <!--content-->
        </section>
        <section>
            <!--content-->
        </section>
    </template>
</ff-suggest>
```


## Adding a Suggest container

You need to annotate an element with the `data-container="suggestType"` attribute for each suggest type configured in the FactFinder UI.

The `ff-suggest` element hides the annotated container if no suggestions are found for this type.

In addition, you need to add an `ff-suggest-item` element inside the container.
All received suggestions of this `"suggestType"` are inserted at this position and will be an exact copy of this element.
`ff-suggest-item` supports [image binding](/api/5.x/ImageBindingBehavior#tab=docs).

Repeat this process for all configured `"suggestTypes"`.

```html
<ff-suggest>
    <template data-role="suggestions">
        <section>
            <div data-container="suggestType">
                <span>Suggestions for suggestType</span>
                <div>
                    <!--ff-suggest-items are always added at the original position of the template-->
                    <ff-suggest-item type="suggestType">
                        <div>{{{name}}}</div>
                        <img width="100" height="100" data-image />
                    </ff-suggest-item>
                </div>
            </div>
        </section>
    </template>
</ff-suggest>
```


### Hit highlighting

Note the triple curly braces in `<span>{{{name}}}</span>`, which enable the rendering of HTML code in the template engine.
`ff-suggest` inserts HTML here, and the matched string from your search box is wrapped in a `<span class="ffw-query">` tag to allow you to highlight the matched text through CSS.
If you used the regular double curly braces and typed "back" in the search box, the HTML source code would be shown as plain text: `<span class="ffw-query">Back</span>packs` rather than the rendered: "**Back**packs".

See [Template Engine](/documentation/5.x/template-engine) for more details.


### Rendered HTML

Container templates provided inside the `ff-suggest` tag will be rendered inside several additional `div` elements.

For example, consider the following HTML **setup**.

```html
<ff-suggest>
    <template data-role="suggestions">
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
    </template>
</ff-suggest>
```

Suppose there are two suggestions of `suggestType`.
This will result in the following HTML **output**.

```html
<ff-suggest layout="list">
    <div style="position:relative;width:100%">
        <div class="ffw-suggestContainerWrapper">
            <div class="ffw-suggestContainer ffw-listLayout">
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


### When the template clashes with 3rd party frameworks

3rd party rendering frameworks might also use the `template` element to define their templates.
It can happen that those frameworks 'steal' the template from Web Components and leave a broken `ff-suggest`.

There are two fallback methods to define the templates for `suggestions` and `popularSearches`.
While the wrapping `template` tag is replaced, the template's body remains the same.
Your rendering framework might accept one these approaches.


#### Via `script` tag

```html
<ff-suggest>
    <script type="text/ff-compat-template" data-role="suggestions">
        <section>...</section>
    </script>
</ff-suggest>
```


#### Via comment

```html
<ff-suggest>
    <div data-compat-template-role="suggestions">
        <!--
        <section>...</section>
        -->
    </div>
</ff-suggest>
```


## `ff-searchbox` properties for Suggest

The `ff-searchbox` element has two attributes which affect `ff-suggest`.

The `use-suggest` attribute determines whether `ff-searchbox` sends _Suggest_ requests on input.

With the `suggest-onfocus` attribute, you can define if the _Suggest_ opens when the `ff-searchbox` gains focus.
Possible values are `"true"` and `"false"` (default is `"false"`).

```html
<ff-searchbox suggest-onfocus="true">
    <input placeholder="Search..." />
</ff-searchbox>
```

For more information see the [ff-searchbox](/api/5.x/ff-searchbox#tab=docs) page.


## Add Keyboard Support

Keyboard arrow key support is enabled by default.
When a `ff-suggest-item` is selected using the arrow keys, the class `ffw-highlight-suggest-item` is added to its class list.
So you simply need to add CSS rules to highlight the selected item.

```html
<style>
    ff-suggest-item.ffw-highlight-suggest-item {
        background-color: lightgray;
    }
</style>
```


## Overriding the default click action

To override the action that happens on click/tap, you can use the `notifications` API of the Web Components core.

```js
factfinder.notifications.addSuggestClickListener(listener);
```

This is the first station in the _Suggest_ click pipeline.
In the listener you can perform any task you require and then decide whether you want to resume the pipeline or interrupt it.

You can subscribe multiple listeners.
To interrupt the pipeline it is enough if one listener returns `false`.
Note that returning `false` does not prevent subsequent listeners from being invoked.
Each click will always invoke **all listeners**.

```html
<ff-suggest>
    <!-- content -->
</ff-suggest>

<script>
    document.addEventListener(`ffCoreReady`, ({ factfinder, init, initialSearch }) => {
        // init

        factfinder.notifications.addSuggestClickListener(origin => {
            // `origin` is a reference to the `ff-suggest-item` DOM element that has been clicked.
            // `origin.suggestion` therefore holds a reference to the visualized `ResultSuggestion` as defined by the FactFinder REST API.

            // Perform required tasks.

            // Optionally, return `false` to interrupt the pipeline.
            // return false;
        });
    });
</script>
```

If you are initiating a page navigation from the click-listener, always return `false` to interrupt the pipeline.
This prevents potentially conflicting operations by Web Components as well as unnecessarily invoked requests to FactFinder.


## Navigate on click

The expected behavior after clicking on an `ff-suggest-item` element of type `productName` is a navigation to the clicked product's detail page.
`ff-suggest` automatically performs this action if the suggestion data contains a `deeplink` field.
The `deeplink` field is populated with the data from your data feed export column configured with the `Deeplink` field role.

If no `deeplink` is provided for an item of type `productName`, the pipeline will skip this step.
See the _Suggest_ click pipeline diagram for a visualization of the exact data flow.


## Closing the Suggest popup

The _Suggest_'s popup automatically closes when the element detects a click that happened outside the popup **and** outside the `ff-searchbox` that triggered the _Suggest_.
(Note that custom search boxes are not recognized and clicking into them closes the popup because they are considered "outside".)

It does so by adding a click listener to the page's `document` object.
Take care to not prevent the click event from bubbling up to the `document` or the popup will not close.

You can **prevent** automatic closing by setting the `hide-onblur` attribute to `"false"`.

```html
<ff-suggest hide-onblur="false"></ff-suggest>
```
