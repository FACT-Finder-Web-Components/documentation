With the ff-record and `ff-record-list` element you can design a template for each record.
You can access different record information such as name, price, rating etc... with the mustache-syntax `{{record.xxx}}`.
The possible values a record can have are defined in the FF-backend and are the field names from the imported feed.

# Using the After Search Navigation
You can use the asn by just adding one line to your HTML code.
```html
<ff-asn></ff-asn>
```
If you do so, the ASN will look pretty much like nothing. So let's style it.

# Adding a filter group
```html
<ff-asn>
    <ff-asn-group></ff-asn-group>
</ff-asn>
```
Adding a bare `ff-asn-group` does not change the styles but it lets us control how different kinds of `ff-asn-groups` should look.

# Styling filter groups by [filter-style]
If you set the ``[filter-style]` attribute properly the `ff-asn-group` acts as default template for all groups, which match that filter style.
```html
<ff-asn>
    <!-- Acts as a template for all TREE configured filter groups-->
    <ff-asn-group filter-style="TREE"></ff-asn-group>

    <!-- Acts as a template for all MULTISELECT configured filter groups-->
    <ff-asn-group filter-style="MULTISELECT"></ff-asn-group>
</ff-asn>
```

# Styling slider groups
The only exception is the ff-asn-group-slider. To style slider groups you need to use the ff-asn-group-slider element.

```html
<ff-asn-group-slider></ff-asn-group-slider>
```
**NOTE**: The `[for-group]` attribute has a higher priority than the `[filter-style]` attribute. This allows overriding certain groups, even if you have a default template for that `[filter-style]`

A slider can have a `[data-container="groupCaption"]` attribute but instead of detailedLinks and hiddenLinks the slider group accepts a `ff-slider-control` and/or an `ff-slider` element.

The `ff-slider-control` can have two `input` elements annotated with the `[data-control="1/2"]` attribute. The input elements automatically react on user input (enter key pressed) and start to filter. You can change the behavior of the controls by using the appropriate attributes. See documentation: [ff-slider-control](http://web-components.fact-finder.de/documentation/ff-asn#ff-slider-control)

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

        <ff-slider step-size="1" current-min-value="0" style="width: 150px;">
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

# Styling filter groups by [for-group]
If you set the `[filter-style]` attribute properly the `ff-asn-group` acts as default template for all groups which match that filter style.
```html
<ff-asn>
    <!-- Acts as a template for a specific group called category -->
    <ff-asn-group for-group="Category"></ff-asn-group>
</ff-asn>
```

# Changing the group caption
If you want to change the group caption you can annotate an HTML element with the `[data-container="groupCaption"]` attribute. By doing so you can change the style and appearance.
```html
<ff-asn-group>
    <div data-container="groupCaption" class="groupCaption">
        {{group.name}}<span class="filterArrowDown">&nbsp;</span>
    </div>
</ff-asn-group>
```
**NOTE**: The group caption will always be displayed at the top of the ff-asn-group. No other elements are altered in any way.

# Adding a Filter Element Template
By annotating two different html elements with the `[data-selected]` and the `[data-unselected]` attribute you are telling the `ff-asn-group-element` which HTML template to use if the filter is selected or not.

The position of the `ff-asn-group-element` inside the `ff-asn-group` does not matter. The element is removed from the dom and saved for later usage.

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
The `{{data-binding}}` for the `ff-asn-group-element` allows accessing both scopes - the `{{element}}` scope and the `{{group}}` scope. This is especially important if you want to display the unit which is configured on the server side.

# Adding filter elements
A common After Search Navigation group consists of two basic parts. The detailedLinks and the hiddenLinks.
The detailedLinks are the amount of filter items which should be displayed immediately when the group receives data.
The hiddenLinks instead are the filter items which should stay hidden until they are needed. You can configure these numbers in the FACT-Finder backend.

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
By annotating an HTML element with the `[data-container="hiddenLinks"]` attribute, we are telling the group element that this is the HTML container for the detailedLinks. To allow more flexibility regarding HTML usage and styling you need to tell the group where exactly to place the filter elements. You can do so by annotating an HTML element with the [data-content="detailedLinks"] attribute.

If you are using both, the `[data-container="detailedLinks"]` and `[data-container="hiddenLinks"]`, you can add the collapse functionality by yourself. Just add the `[data-container="showMore"]` and `[data-container="showLess"]`.

**NOTE**: You can change the animation duration by changing the CSS transition-duration property. Cause the elements themselves are transitioned we recommend adding padding and margin not the container elements themselves.

# Remove all filter
Sometimes you want to reset the filter and go back to your search result for the query. For this case we have an extra element which you can place anywhere. This element will trigger a new search request with the current search query.

The `ff-asn-remove-all-filter` element has a few properties:

## show-always
With the `show-always` property you can define if the element is only visible when some filters are set, or always. Default is 'false'

## remove-params
The `remove-params` property defines whether the 'reset request' should only contain a search with the current search query or if the reset request should keep the current parameters like 'products-per-page' and 'sort' and only remove the parameters which starts with 'filter*'.

```html
<ff-asn-remove-all-filter remove-params show-always>
    Reset Filter
</ff-asn-remove-all-filter>
```

# API Reference
## ff-asn
### Properties
| Name | Description |
| ---- | ----------- |
| **align**&nbsp;(String) **Options**:&nbsp;vertical,&nbsp;horizontal (default: vertical) | The alignment of the After Search Navigation. |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** |  This event is triggered when the element has received new data and the template for the element and all sub elements was punched out. |

## ff-asn-group
### Properties
| Name | Description |
| ---- | ----------- |
| **opened**&nbsp;(Boolean) | Determines if the filter group is expanded. If you want to have a group opened by default: `<ff-asn-group opened>` does the trick. |
| **collapsible**&nbsp;(String) **Options**:&nbsp;true,&nbsp;false (default: true) | Determines, if the filter group is collapsible. |
| **for-group**&nbsp;(String) | Determines, which filter group the template should be applied to. If all is selected, then the template is applied to all groups if no other template suits the requirements. |
| **group**&nbsp;(Object) | The data for the filter group. |
| **filter-style**&nbsp;(String) | With the filter-style property it is possible to use the ff-asn-group element as a template for all groups which match the filter style. (TREE, DEFAULT, MULTISELECT, SINGLESELECT) |
| **lazy-load**&nbsp;(String) **Options**:&nbsp;true,&nbsp;false (default: true) | The lazy-load property defines if the ff-asn-elements for the hidden links container should be rendered when the asn group is dispatched or lazily just when the hiddenLinks container is opened via toggleHiddenLinksContainer() or showHiddenLinksContainer(). This improves performance for the first print and is by default set to true. |

### Mixins
| Name | Description |
| ---- | ----------- |
| **--asn-all-links-container** | Is applied to the container of the ASN group. |
| **--ff-asn-group-container** | Is applied to the container of the ASN group.|
| **--asn-group-caption** | Is applied to the header of the ASN group. |

### Methods
| Name | Description |
| ---- | ----------- |
| **toggle(animated?)** | Toggles the asn-group |
| **show(animated?)** | Opens the asn-group |
| **hide(animated?)** | Closes the asn-group |
| **showDetailedLinksContainer(animated?)** | Opens the detailedLink container. Parameter animated:boolean is optional. |
| **hideDetailedLinksContainer(animated?)** | Close the detailedLink container. Parameter animated:boolean is optional. |
| **toggleDetailedLinksContainer(animated?)** | Toggle the detailedLink container. Parameter animated:boolean is optional. |
| **showHiddenLinksContainer(animated?)** | Opens the hiddenLink container. Parameter animated:boolean is optional. |
| **hideHiddenLinksContainer(animated?)** | Close the hiddenLink container. Parameter animated:boolean is optional. |
| **toggleHiddenLinksContainer(animated?)** |Toggle the hiddenLink container. Parameter animated:boolean is optional. |

## ff-asn-group-element
### Properties
| Name | Description |
| ---- | ----------- |
| **selected**&nbsp;(String) **Options**:&nbsp;true,&nbsp;false (default: empty) | The alignment of the After Search Navigation. |
| **element**&nbsp;(Object) (default: empty) | The filter data. |
| **group**&nbsp;(Object) (default: empty) | The filter group data. |

### Methods
| Name | Description |
| ---- | ----------- |
| **clone** | Enables cloning of elements with all properties, behaviors, private fields, staes and HTML templates. |

## ff-slider
### Properties
| Name | Description |
| ---- | ----------- |
| **step-size**&nbsp;(Number) | Determines in which steps the slider should move when dragged. |
| **selected-min-value**&nbsp;(Number)| The currently selected minimum value. Cannot be less than absolute-min-value. |
| **selected-max-value**&nbsp;(Number)| The currently selected maximum value. Cannot be less than absolute-max-value. |
| **submit-on-release**&nbsp;(Number) **Options**&nbsp;true,&nbsp;false (default: true) | If this is set to true a filter request is made immediately upon releasing the slider btn. |
| **absolute-min-value**&nbsp;(Number) | Indicates the minimum lower end e.g. if set to 50, dragging the slider btn to the most left will result in a value of 50. |
| **absolute-max-value**&nbsp;(Number) | Indicates the maximum upper end e.g. if set to 500, dragging the slider btn to the most right will result in a value of 500. |


### Methods
| Name | Description |
| ---- | ----------- |
| **submit** | Send the filter request with the current values. |

### Mixins
| Name | Description |
| ---- | ----------- |
| **--slidebar-mixin** | Used to style the path the slider buttons will follow. |

## ff-slider-control
### Properties
| Name | Description |
| ---- | ----------- |
| **submit-on-input**&nbsp;(String) **Options**&nbsp;true,&nbsp;false (default: empty) | If this attribute is set to true the input fields accept values. If set to false you cant focus the input fields. |

### Mixins
| Name | Description |
| ---- | ----------- |
| **--ff-slider-section** | Used to style the corresponding element with the id ffSlideControlSection. |
| **--ff-slide-control-section** | Used to style the corresponding element with the id ffSliderSection. |