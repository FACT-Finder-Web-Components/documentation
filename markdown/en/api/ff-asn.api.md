## API Reference
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