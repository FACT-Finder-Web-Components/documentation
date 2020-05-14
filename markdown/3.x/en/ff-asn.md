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
If you want to change the group caption, you can annotate an HTML element with the `[slot="groupCaption"]` attribute. You can access the group's name through `{{group.name}}`. Here is an example of how a custom group caption could be implemented:
```html
<ff-asn-group>
    <div slot="groupCaption" class="groupCaption">
        {{group.name}}<span class="filterArrowDown">&nbsp;</span>
    </div>
</ff-asn-group>
```
**NOTE**: The group caption will always be displayed at the top of the `ff-asn-group`. No other elements are altered in any way.


## Structuring the filter group
A common After Search Navigation group consists of two basic parts. The **detailedLinks** and the **hiddenLinks**. The **detailedLinks** are the filter items which should be displayed immediately when the group receives data. The **hiddenLinks** instead are the filter items which should stay hidden until they are needed. In FACT-Finder you can configure how many items shall appear for each type.

You can define the structure of your custom filter group through certain predefined attributes.

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
</ff-asn-group>
```

**NOTE**: You can change the animation duration by changing the CSS
`transition-duration` property of `ff-asn-group .ffw-wrapper`.


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

The `{{data-binding}}` for the `ff-asn-group-element` allows accessing both scopes - the `{{element}}` scope and the `{{group}}` scope. This is especially important if you want to display the unit which is configured on the server side. In addition, `ff-asn-group-element` does support [image binding](/api/3.x/ImageBindingBehavior#tab=docs).


## Restricting filter group templates to filter-style
If you set the `[filter-style]` attribute, the `ff-asn-group` acts as the default template for all groups that match this **filter-style**.
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
By setting the `[for-group]` attribute you can apply a template to a single group identified by its name.
```html
<ff-asn>
    <!-- Acts as a template for a specific group called "Category" -->
    <ff-asn-group for-group="Category"></ff-asn-group>
</ff-asn>
```

**NOTE**: The `[for-group]` attribute has a higher priority than the `[filter-style]` attribute. This allows overriding certain groups even if you have a default template for that `[filter-style]`.


## Using native select box
If you require a native `select` element for the **hiddenLinks** instead of the "show more/show less" implementation, you can add the `select-box="true"` attribute to the `ff-asn-group` and add a `select` element with the attribute `data-container="hiddenLinks"`.

Note that you should also supply an `option` element that acts as a placeholder. This element typically reads "_More..._" and is initially shown before the `select` dropdown was opened for the first time.

You may optionally define a template for the regular `option` elements. It supports data binding as usual. Make sure to mark it with the `data-template` attribute.

```html
<ff-asn-group for-group="YourGroupName" select-box="true">
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


## Styling slider groups
Slider groups are handled in a different way. To style them you need to use the `ff-asn-group-slider` element.

```html
<ff-asn-group-slider></ff-asn-group-slider>
```

A slider can have a `[slot="groupCaption"]` attribute, a `[data-container="removeFilter"]` element and an `ff-slider-control` element.

If no templates are provided for the `ff-slider-control`, the templates default to the example below. If you want to customize the templates, you must provide an `ff-slider` and an `input` element with attribute `data-control='1'` as well as one with `data-control='2'`. 

The input elements automatically react to user input ('Enter' key pressed) and start filtering. You can change the behavior of the controls by using the appropriate attributes as described in `ff-slider-control` section's [API documentation](/api/3.x/ff-asn#tab=api)

```html
<ff-asn-group-slider>
    <div slot="groupCaption" class="groupCaption">
        {{group.name}}<span class="filterArrowDown">&nbsp;</span>
    </div>

    <ff-slider-control submit-on-input="true">
       <div>
           <ff-slider step-size="1" submit-on-release="true">
               <div slot="slider1"></div>
               <div slot="slider2"></div>
           </ff-slider>
           <div style="display: flex; justify-content: space-around; align-items: center">
               <input data-control="1" style="width: 60px;">
               <span style="width: 20px; height: 2px; background-color: black; display: inline-block"></span>
               <input data-control="2" style="width: 60px;">
            </div>
       </div>
       
       <div data-container="removeFilter">Reset Filter</div>
    </ff-slider-control>
</ff-asn-group-slider>
```


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
Sometimes you may want to reset all filters at once and go back to the original search result. For this case there is an dedicated element which you can place anywhere on your page. This element will trigger a new search request with the current search query.

The `ff-asn-remove-all-filter` element has the following properties:

### show-always
With the `show-always` property you can define if the element is only visible when at least one removable filter is set, or always.  
The default value is `false`.

### remove-params
Setting this attribute removes all parameters (except the search query) from the resetting request. When not set, only parameters that were applied by the ASN (recognizable by the `filter*` prefix) are removed. Other parameters like `products-per-page`, `sort` and custom parameters will be unaffected. 
The default value is `false`.

### keep-category-path
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
If you wish to exclude some groups from being searchable regardless of the number of filters, you can set the `non-searchable` attribute on such an `ff-asn-group` element.

### Search field template

The default search field template is
```html
<div slot="filterSearch"><input></div>
```
However it can be changed by providing own content for `filterSearch` slot in `ff-asn-group` template. 
This template has to contain exactly one `input` element.

### Example

#### Setup
```html
<ff-asn searchable-from="31">
    <ff-asn-group for-group="Manufacturer">
        <div slot="filterSearch" class="customGroup1"><input></div>
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
                [redacted]
            </div>
        </div>
    </ff-asn-group>
    <ff-asn-group for-group="Usage" not-searchable>
        <div class="ffw-asn-group-container">
            <div class="ffw-wrapper">
                <!-- no [slot="filterSearch"] container due to [not-searchable] attribute -->
                [redacted]
            </div>
        </div>
    </ff-asn-group>
```

## Dispatching data manually
If you need to manually dispatch data, for instance when the component is subscribed to a custom topic, you can use `ResultDispatcher` to achieve that.
ASN component requires `groups` property content of FACT-Finder response to be passed. Any additional preparation is not needed. 

```js
function dispatchAsnCustomTopic() {
    factfinder.communication.ResultDispatcher.dispatch(
        factfinder.communication.EventAggregator.currentSearchResult.groups,
        {},
        'customTopic'
    );
}
```
