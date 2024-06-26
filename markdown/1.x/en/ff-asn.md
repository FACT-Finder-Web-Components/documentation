## Using the After Search Navigation
You can use the ASN by adding just one line to your HTML code.
```html
<ff-asn></ff-asn>
```
If you do so, the ASN will look pretty much like nothing. So let's style it.

## Adding a filter group
```html
<ff-asn>
    <ff-asn-group></ff-asn-group>
</ff-asn>
```
Adding a bare `ff-asn-group` does not change the styles but it lets us
control how different kinds of `ff-asn-groups` should look.

## Styling filter groups by [filter-style]
If you set the `[filter-style]` attribute properly, the `ff-asn-group`
acts as the default template for all groups that match this `[filter-style]`.
```html
<ff-asn>
    <!-- Acts as a template for all TREE configured filter groups-->
    <ff-asn-group filter-style="TREE"></ff-asn-group>

    <!-- Acts as a template for all MULTISELECT configured filter groups-->
    <ff-asn-group filter-style="MULTISELECT"></ff-asn-group>
</ff-asn>
```

## Using native select box

In version 1.2.7 we introduced native select-box support for `ff-asn-group`.
Additionally, the `<option>` element supports data binding when using
`<ff-asn-group select-box="true">`. You can supply your own template
by annotating it with the `data-template` attribute.

```html
<ff-asn-group for-group="xxx" select-box="true">
        ...
        <div data-container="detailedLinks">
            <div data-content="detailedLinks"></div>
        </div>

        <select data-container="hiddenLinks">
            <option>more ...</option>
            <!--
                 This template is optional. If you don't supply one, it defaults to:
                 <option>{{element.name}} {{group.unit}} ({{element.recordCount}})</option>
            -->
            <option data-template>My Template {{element.name}} {{group.unit}}</option>
        </select>
        ...
</ff-asn-group>
```

## Styling slider groups
The only exception is the `ff-asn-group-slider`. To style slider groups
you need to use the `ff-asn-group-slider` element.

```html
<ff-asn-group-slider></ff-asn-group-slider>
```
**NOTE**: The `[for-group]` attribute has a higher priority than the
`[filter-style]` attribute. This allows overriding certain groups, even
if you have a default template for that `[filter-style]`

A slider can have a `[data-container="groupCaption"]` attribute but
instead of detailedLinks and hiddenLinks the slider group accepts a
`ff-slider-control` and/or an `ff-slider` element.

The `ff-slider-control` can have two `input` elements annotated with
the `[data-control="1/2"]` attribute. The input elements automatically
react on user input (enter key pressed) and start to filter. You can
change the behavior of the controls by using the appropriate attributes
as described in `ff-slider-control-section`'s
[API documentation](/api/1.x/ff-asn#tab=api)

```html
<!--style slider groups-->
<ff-asn-group-slider>
    <div data-container="groupCaption" class="groupCaption">
        {{group.name}}<span class="filterArrowDown">&nbsp</span>
    </div>
    <div data-container="removeFilter">Remove Filter</div>
    <ff-slider-control submit-on-input="true">
        <input data-control='1'
               style="position: absolute; width: 60px;left: 15px;">
        <input
                data-control='2' style="position: absolute; width: 60px;right: 15px;">

        <ff-slider step-size="1" style="width: 150px;">
            <div data-slider="1" class="sliderBtn"></div>
            <div data-slider="2" class="sliderBtn"></div>
            <!-- Version < 1.2.2
            <div id="slider1" class="sliderBtn"></div>
            <div id="slider2" class="sliderBtn"></div>
            -->
        </ff-slider>
    </ff-slider-control>
</ff-asn-group-slider>
```

## Styling filter groups by [filter-style]
If you set the `[filter-style]` attribute properly, the `ff-asn-group`
acts as default template for all groups which match that filter style.
```html
<ff-asn>
    <!-- Acts as a template for a specific group called category -->
    <ff-asn-group for-group="Category"></ff-asn-group>
</ff-asn>
```

## Changing the group caption
If you want to change the group caption, you can annotate an HTML element
with the `[data-container="groupCaption"]` attribute. By doing so you can
change the style and appearance.
```html
<ff-asn-group>
    <div data-container="groupCaption" class="groupCaption">
        {{group.name}}<span class="filterArrowDown">&nbsp;</span>
    </div>
</ff-asn-group>
```
**NOTE**: The group caption will always be displayed at the top of the
 `ff-asn-group`. No other elements are altered in any way.

## Adding a Filter Element Template
By annotating two different HTML elements with the `[data-selected]` and
the `[data-unselected]` attribute you are telling the `ff-asn-group-element`
which HTML template to use if the filter is selected or not.

The position of the `ff-asn-group-element` inside the `ff-asn-group` does
not matter. The element is removed from the DOM and saved for later usage.

```html
<ff-asn-group>
    <ff-asn-group-element>
        <div data-selected>
            <span class="filterCheckboxUnselected"><span class="filterCheckboxSelected"></span></span>
            <span class="filterName">{{element.name}} {{group.unit}}</span>
        </div>
        <div data-unselected>
            <span class="filterCheckboxUnselected"></span>
            <span class="filterName">{{element.name}} {{group.unit}}</span>
        </div>
    </ff-asn-group-element>
</ff-asn-group>
```
The `{{data-binding}}` for the `ff-asn-group-element` allows accessing
both scopes - the `{{element}}` scope and the `{{group}}` scope. This is
especially important if you want to display the unit which is configured
on the server side. In addition, `ff-asn-group-element` does support [image binding](api/ImageBindingBehavior#tab=docs).

## Adding filter elements
A common After Search Navigation group consists of two basic parts. The
detailedLinks and the hiddenLinks. The detailedLinks are the amount of
filter items which should be displayed immediately when the group receives
data. The hiddenLinks instead are the filter items which should stay
hidden until they are needed. You can configure these numbers in the
FactFinder backend.

Lets take a look at the example

```html
<ff-asn-group>
    <div data-container="detailedLinks">
        <!-- This where new filter elements are appended -->
        <div data-content="detailedLinks"></div>

        <div data-container="showMore">
            <span class="text">Show More</span>
        </div>
    </div>

    <div data-container="hiddenLinks">
        <!-- This where new filter elements are appended -->
        <div data-content="hiddenLinks"></div>

        <div data-container="showLess">
            <span class="text">Show Less</span>
        </div>
    </div>
</ff-asn-group>
```
By annotating an HTML element with the `[data-container="hiddenLinks"]`
attribute, we are telling the group element that this is the HTML container
for the detailedLinks. To allow more flexibility regarding HTML usage and
styling you need to tell the group where exactly to place the filter elements.
You can do so by annotating an HTML element with the `[data-content="detailedLinks"]`
attribute.

If you are using both the `[data-container="detailedLinks"]` and
`[data-container="hiddenLinks"]`, you can add the collapse functionality
yourself. Just add the `[data-container="showMore"]` and
`[data-container="showLess"]`.

**NOTE**: You can change the animation duration by changing the CSS
`transition-duration` property. Because the elements themselves are
transitioned we recommend adding padding and margin not the container
elements themselves.

## Remove all filters
Sometimes you want to reset the filter and go back to the original search
result. For this case we have an extra element which you can place
anywhere. This element will trigger a new search request with the current
search query.

The `ff-asn-remove-all-filter` element has a few properties:

### show-always
With the `show-always` property you can define if the element is only
visible when some filters are set, or always. Default is `false`

### remove-params
The `remove-params` property defines whether the 'reset request' should
only contain a search with the current search query or if the reset
request should keep the current parameters like `products-per-page` and
`sort` and only remove those parameters that start with `filter*`.

```html
<ff-asn-remove-all-filter remove-params show-always>
    Reset Filter
</ff-asn-remove-all-filter>
```
