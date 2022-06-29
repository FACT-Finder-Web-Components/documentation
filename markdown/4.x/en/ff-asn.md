## Using the After Search Navigation
You can use the ASN by adding one line to your HTML code.
```html
<ff-asn></ff-asn>
```
Doing so will cause the ASN to use default HTML templates for all filters. You can customize the ASN's appearance by providing your own templates for its elements.


## Adding a filter group
```html
<ff-asn>
    <ff-asn-group></ff-asn-group>
</ff-asn>
```
To customize filter groups you add `ff-asn-group` elements. However, adding an empty `ff-asn-group` as in the example above has no effect. You will likely want to specify your own HTML template as shown in the following sections.


## Changing the group caption
If you want to change the group caption, you can annotate an HTML element with the `slot="groupCaption"` attribute.
You can access the group's name through `{{group.name}}`.
Here is an example of how a custom group caption could be implemented:
```html
<ff-asn-group>
    <div slot="groupCaption" class="groupCaption">
        {{group.name}}<span class="filterArrowDown">&nbsp;</span>
    </div>
</ff-asn-group>
```
> Note
>
> The group caption will always be displayed at the top of the `ff-asn-group`.
> No other elements are altered in any way.


## Structuring the filter group

After Search Navigation groups offer various parts to interact with.
They are marked with the `data-container` attribute.

There are two containers to hold the group's filter items.
- `data-container="detailedLinks"`
- `data-container="hiddenLinks"`

**detailedLinks** are the filter items which should be displayed immediately when the group receives data.

**hiddenLinks** are the filter items which should stay hidden until they are needed.

> Hint
>
> You can configure how many items shall appear for each filter group through your FACT-Finder UI.

For further interaction there are:
- `data-container="showMore"`
- `data-container="showLess"`
- `data-container="removeFilter"`

These three elements are optional.
If you don't define them in your template, they will be generated automatically.

**showMore** provides a clickable element to expand the **hiddenLinks**.
It is only visible when there actually are **hiddenLinks** and these are not already expanded.

**showLess** provides the opposite function by collapsing expanded **hiddenLinks**.

**removeFilter** allows you to deselect all filters of the ASN group.
It only appears when there are selected filters that can be deselected.
That means that if there are only _implicitly_ selected or _fixed_ filters, the **removeFilter** element will not appear.

```html
<ff-asn-group>
    <div data-container="detailedLinks">
        <div data-content="detailedLinks">
            <!-- always visible items will be added here -->
        </div>
    </div>
    <div data-container="showMore">
        <!-- The "showMore" container will only be rendered if there are "hiddenLinks" in the FACT-Finder response.
             It disappears after being clicked and reappears after "showLess" was clicked. -->
        <span class="text">Show More</span>
    </div>

    <!-- The "hiddenLinks" and "showLess" containers are only rendered after "showMore" was clicked.
         They disappear after "showLess" was clicked. -->
    
    <div data-container="hiddenLinks">
        <div data-content="hiddenLinks">
            <!-- hidden items will be added here -->
        </div>
    </div>
    <div data-container="showLess">
        <span class="text">Show Less</span>
    </div>

    <div data-container="removeFilter">
        <span class="text">Reset filter group</span>
    </div>
</ff-asn-group>
```

> Note
>
> You can change the animation duration by changing the CSS `transition-duration` property of `ff-asn-group .ffw-wrapper`.


## Adding a filter element template
A filter group typically contains many elements. This could be for instance all colors or all manufacturers that apply to the current search result. You can customize the appearance of these entries by inserting the `ff-asn-group-element` into the related `ff-asn-group`.

The `ff-asn-group-element` provides two **slots** to distinguish between selected and unselected elements. Their content may be freely specified.

```html
<ff-asn-group>
    <ff-asn-group-element>
        <div slot="selected">
            <span class="filterCheckboxSelected"></span>
            <span class="filterName">{{element.name}} {{group.unit}}</span>
        </div>
        <div slot="unselected">
            <span class="filterCheckboxUnselected"></span>
            <span class="filterName">{{element.name}} {{group.unit}}</span>
        </div>
    </ff-asn-group-element>
</ff-asn-group>
```
The position of the `ff-asn-group-element` inside the `ff-asn-group` does not matter. After initialization the element is removed from the DOM and saved for later usage.

The `{{data-binding}}` for the `ff-asn-group-element` allows accessing both scopes - the `{{element}}` scope and the `{{group}}` scope. This is especially important if you want to display the unit which is configured on the server side. In addition, `ff-asn-group-element` does support [image binding](/api/4.x/ImageBindingBehavior#tab=docs).


## Restricting filter group templates to filter-style
If you set the `filter-style` attribute, the `ff-asn-group` acts as the default template for all groups that match this **filter-style**.
```html
<ff-asn>
    <!-- Acts as a template for all TREE configured filter groups -->
    <ff-asn-group filter-style="TREE"></ff-asn-group>

    <!-- Acts as a template for all MULTISELECT configured filter groups -->
    <ff-asn-group filter-style="MULTISELECT"></ff-asn-group>

    <!-- Acts as a template for all DEFAULT configured filter groups -->
    <ff-asn-group filter-style="DEFAULT"></ff-asn-group>
</ff-asn>
```


## Defining filter group templates for individual groups
By setting the `for-group` attribute you can apply a template to a single group identified by its source field name (associatedFieldName).
```html
<ff-asn>
    <!-- Acts as a template for a specific group called "Category" -->
    <ff-asn-group for-group="Category"></ff-asn-group>
</ff-asn>
```

> Note
>
> The `for-group` attribute has a higher priority than the `filter-style` attribute.
> This allows overriding certain groups even if you have a default template for that `filter-style`.


## Using native select box
If you require a native `select` element for the **hiddenLinks** instead of the "show more/show less" implementation, you can add the `select-box="true"` attribute to the `ff-asn-group` and add a `select` element with the attribute `data-container="hiddenLinks"`.

Note that you should also supply an `option` element that acts as a placeholder. This element typically reads "_More..._" and is initially shown before the `select` dropdown was opened for the first time.

You may optionally define a template for the regular `option` elements. It supports data binding as usual. Make sure to mark it with the `data-template` attribute.

```html
<ff-asn-group for-group="YourFieldName" select-box="true">
        <div data-container="detailedLinks">
            <div data-content="detailedLinks"></div>
        </div>

        <select data-container="hiddenLinks">
            <!-- The placeholder element. If none is provided, it will default to this: -->
            <option disabled hidden selected>More...</option>

            <!-- This template is optional. If you don't supply one, it defaults to:
                 <option data-template>{{element.name}} {{group.unit}} ({{element.recordCount}})</option> -->
            <option data-template>My Template {{element.name}} {{group.unit}}</option>
        </select>
</ff-asn-group>
```


## Sliders

FACT-Finder Web Components offer two kinds of sliders with different ways to interact.
Sliders use their own ASN group element: `ff-asn-group-slider`.
Both types of sliders require the same basic setup.

```html
<ff-asn>
    <ff-asn-group-slider>
        <div slot="groupCaption">
            <span>{{group.name}}</span>
        </div>

        <div data-container="removeFilter">
            <span>Reset Filter</span>
        </div>

        <ff-slider-control submit-on-input="true">
            <div>
                <input data-control='1'>  <!-- input for min value -->
                <input data-control='2'>  <!-- input for max value -->
            </div>

            <!-- EITHER: One Touch Slider -->
            <ff-slider-one-touch></ff-slider-one-touch>

            <!-- OR: Classic slider -->
            <ff-slider>
                <div slot="slider1"></div>
                <div slot="slider2"></div>
            </ff-slider>

        </ff-slider-control>
    </ff-asn-group-slider>
</ff-asn>
```

Instead of detailed and hidden links, `ff-asn-group-slider` requires an `ff-slider-control` element.
Here you define how the input fields for the upper and lower values shall be displayed and how they shall behave.
You also specify whether you want to use the _One Touch Slider_ or the classic slider.

### One Touch Slider

![One Touch Slider](/images/elements/asn-one-touch-slider.gif)

```html
<ff-slider-one-touch></ff-slider-one-touch>
```

The One Touch Slider is special in that it allows you to control both min and max values at the same time.
This has the effect that you need only a single request to FACT-Finder to select your desired value range.
Nevertheless, this slider still allows you to move the min and max handles individually for the classic slider experience.

The One Touch Slider takes no further HTML template.
It relies heavily on CSS and inline styling.
To find suitable CSS rules for customization please inspect the rendered HTML from an official or self-made demo.

CSS classes involved in the One Touch Slider are:
`ffw-triangle`,
`ffw-slider-button-left`,
`ffw-slider-button-right`,
`ffw-line`,
`ffw-selected-range`
`ffw-no-transition`,
`ffw-active`.

Also see [default-styles.css](https://github.com/FACT-Finder-Web-Components/ff-web-components/blob/release/4.x/dist/default-styles.css) in the Web Components distribution for further details.

> Note
>
> The `default-styles.css` file is only provided as a human-readable reference.
> This file is not used by Web Components and changes to it will have no effect.
> These style rules are bundled separately with the Web Components JavaScript library.

### Classic slider

![Classic slider](/images/elements/asn-slider.png)

```html
<ff-slider>
    <div slot="slider1"></div>
    <div slot="slider2"></div>
</ff-slider>
```

The classic slider allows you to manipulate one handle at a time.
Each change issues a filter request to FACT-Finder.

The `ff-slider` takes two elements with a `slot` attribute.
These elements are used as the min and max handles.

Additional HTML in the template will be discarded.


## Rendered HTML
The following is a listing of possible HTML that is rendered by `ff-asn`. Notice the CSS classes starting with `ffw-`. These are applied automatically and shall provide you an easy way to apply custom style rules.

```html
<ff-asn align="vertical">
    <ff-asn-group for-group="Color" opened filter-style="DEFAULT">
        <div data-container="groupCaption">
            <div slot="groupCaption" class="groupCaption">Color</div>
        </div>
        <div class="ffw-asn-group-container">
            <div class="ffw-wrapper" opened>
                <div data-container="detailedLinks">
                    <div data-content="detailedLinks">
                        <ff-asn-group-element selected="false">
                            <div class="ffw-asn-unselected">
                                <div slot="unselected"><span>Blue</span></div>
                            </div>
                        </ff-asn-group-element>
                        <ff-asn-group-element selected="false">
                            <div class="ffw-asn-unselected">
                                <div slot="unselected"><span>Red</span></div>
                            </div>
                        </ff-asn-group-element>
                    </div>
                </div>
            </div>
        </div>
    </ff-asn-group>

    <ff-asn-group-slider opened filter-style="SLIDER" for-group="Price">
        <div data-container="groupCaption" class="cursor">
            <div slot="groupCaption" class="groupCaption">Price</div>
        </div>
        <div class="ffw-container">
            <div class="ffw-wrapper">
                <ff-slider-control submit-on-input="true" style="opacity: 1;">
                    <div class="ffw-sliderSection">
                        <ff-slider step-size="1" submit-on-release="true">
                            <div style="position:relative;width:100%;height:100%" class="ffw-sliderBar">
                                <div class="ffw-slider1 ffw-sliderWrapper" style="position: absolute !important; left: 0; top: 0;" id="slider1-1">
                                    <div slot="slider1" class="sliderBtn cursorPointer"></div>
                                </div>
                                <div class="ffw-slider2 ffw-sliderWrapper" style="position: absolute !important; left: 188px; top: 0;" id="slider2-1">
                                    <div slot="slider2" class="sliderBtn cursorPointer"></div>
                                </div>
                            </div>
                        </ff-slider>
                        <div style="display: flex;justify-content: space-around;align-items: center">
                            <input data-control="1" style="width: 60px;">
                            <span style=" width: 20px; height: 2px; background-color: black;display: inline-block"></span>
                            <input data-control="2" style="width: 60px;">
                        </div>
                        <div class="resetFilter" data-container="removeFilter" style="display: none;">Reset Filter</div>
                    </div>
                </ff-slider-control>
            </div>
        </div>
    </ff-asn-group-slider>

    <ff-asn-group for-group="Manufacturer" opened filter-style="MULTISELECT">
        <div data-container="groupCaption">
            <div slot="groupCaption" class="groupCaption">Manufacturer</div>
        </div>
        <div class="ffw-asn-group-container">
            <div class="ffw-wrapper" opened>
                <div data-container="detailedLinks">
                    <div data-content="detailedLinks">
                        <ff-asn-group-element selected="true">
                            <div class="ffw-asn-selected">
                                <div slot="selected"><span>Lowa</span></div>
                            </div>
                        </ff-asn-group-element>
                        <ff-asn-group-element selected="false">
                            <div class="ffw-asn-unselected">
                                <div slot="unselected"><span>AKU</span></div>
                            </div>
                        </ff-asn-group-element>
                    </div>
                </div>
                <div data-container="showMore" opened>Show More</div>

                <div data-container="hiddenLinks" style="height: 0; overflow: hidden;">
                    <div data-content="hiddenLinks">
                        <ff-asn-group-element selected="false">
                            <div class="ffw-asn-unselected">
                                <div slot="unselected"><span>Bogs</span></div>
                            </div>
                        </ff-asn-group-element>
                        <ff-asn-group-element selected="false">
                            <div class="ffw-asn-unselected">
                                <div slot="unselected"><span>Castelli</span></div>
                            </div>
                        </ff-asn-group-element>
                    </div>
                </div>
                <div data-container="showLess" style="overflow: hidden; height: 0;">Show Less</div>

                <div class="resetFilter" data-container="removeFilter">Reset Filter</div>
            </div>
        </div>
    </ff-asn-group>
</ff-asn>
```



## Remove all filters
Sometimes you may want to reset all filters at once and go back to the original search result.
For this case there is a dedicated element which you can place anywhere on your page.
This element will trigger a new search request with the current search query.

The `ff-asn-remove-all-filter` element has the following properties:

### show-always
With the `show-always` property you can define whether the element is always visible or only when at least one removable filter is set.  
The default value is `false`.

### remove-params
Setting this attribute removes all parameters (except the search query) from the resetting request. When not set, only parameters that were applied by the ASN (recognizable by the `filter*` prefix) are removed. Other parameters like `products-per-page`, `sort` and custom parameters will be unaffected. 
The default value is `false`.

### keep-category-path
> Deprecated
>
> This attribute is deprecated and no longer required.
> To implement category pages use `<ff-communication category-page="...">` instead.
> See [Category Pages](/documentation/4.x/category-pages) for details.

Setting the `keep-category-path` property preserves the category filters.
The default value is `false`.

```html
<ff-asn-remove-all-filter remove-params show-always keep-category-path>
    Reset Filters
</ff-asn-remove-all-filter>
```

## Searchable ASN groups

When the number of available filters in the ASN group is large, you may want to render a search field inside the group to allow the user to narrow down displayed filters.

To enable this feature you have to set the minimum number of filters required to render the search field in a given group. This is done by setting the `searchable-from` attribute on the `ff-asn` element.
If you wish to exclude some groups from being searchable regardless of the number of filters, you can set the `not-searchable` attribute on such an `ff-asn-group` element.

### Search field template

The default search field template is
```html
<div slot="filterSearch"><input></div>
```
However, it can be changed by providing own content for the `filterSearch` slot in the `ff-asn-group` template.
This template has to contain exactly one `input` element.

### Hit highlighting

The searchable ASN groups feature comes with hit highlighting.
Strings that match the search term will be wrapped with a `<span class="ffw-query">` element to allow you to apply appropriate styling.
In order to tell the template engine to interpret the HTML instead of render it as plain text you have to use triple curly braces for the group element's name.
See [Template Engine](/documentation/4.x/template-engine) for details.

```html
<div slot="selected"><span>{{{element.name}}}</span></div>
```

### Example

Suppose you type `art` into _Manufacturer_'s search box.

#### Setup
```html
<ff-asn searchable-from="31">
    <ff-asn-group for-group="Manufacturer">
        <div slot="filterSearch" class="customGroup1"><input></div>
        <ff-asn-group-element>
            <div slot="selected">
                <span>{{{element.name}}}</span>
            </div>
            <div slot="unselected">
                <span>{{{element.name}}}</span>
            </div>
        </ff-asn-group-element>
    </ff-asn-group>
    <ff-asn-group for-group="Usage" not-searchable>
        <div slot="filterSearch" class="customGroup2"><input></div>
    </ff-asn-group>
</ff-asn>
```

#### Rendered HTML
```html
<ff-asn searchable-from="31">
    <ff-asn-group for-group="Manufacturer">
        <div class="ffw-asn-group-container">
            <div class="ffw-wrapper">
                <div slot="filterSearch" class="customGroup1"><input></div>
                <div class="ffw-asn-group-searchable-results">
                    <ff-asn-group-element>
                        <div class="ffw-asn-unselected">
                            <div slot="unselected">
                                <span>Sm<span class="ffw-query">art</span>wool</span>
                            </div>
                        </div>
                    </ff-asn-group-element>
                    ...
                </div>
            </div>
        </div>
    </ff-asn-group>
    <ff-asn-group for-group="Usage" not-searchable>
        <div class="ffw-asn-group-container">
            <div class="ffw-wrapper">
                <!-- no [slot="filterSearch"] container due to [not-searchable] attribute -->
                ...
            </div>
        </div>
    </ff-asn-group>
```

## Dispatching data manually
If you need to manually dispatch data, for instance when the component is subscribed to a custom topic, you can use `ResultDispatcher` to achieve that.
The ASN component requires the `groups` property's content of the FACT-Finder response to be passed.
No additional preparation is needed. 

```js
function dispatchAsnCustomTopic() {
    factfinder.communication.ResultDispatcher.dispatch(
        factfinder.communication.EventAggregator.currentSearchResult.groups,
        {},
        'customTopic'
    );
}
```
