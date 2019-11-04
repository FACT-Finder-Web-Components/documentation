## `ff-asn`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **align**&nbsp;(String) **Options**:&nbsp;"vertical",&nbsp;"horizontal" (default: "vertical") | The alignment of the After Search Navigation. |
| **asn-groups**&nbsp;(Array) | The data for all filter groups/facets. |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** |  This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |

## `ff-asn-group`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **opened**&nbsp;(Boolean) | Determines if the filter group is expanded. If you want to have a group opened by default: `<ff-asn-group opened>` does the trick. |
| **collapsible**&nbsp;(String)&nbsp;**Options**:&nbsp;"true",&nbsp;"false"&nbsp;(default: "true") | Determines, if the filter group is collapsible. |
| **for-group**&nbsp;(String)&nbsp;(default: "all")| Determines, which filter group the template should be applied to. If set to `"all"`, the template is applied to all groups if no other template matches the requirements. |
| **group**&nbsp;(Object) | The data for the filter group. |
| **filter-style**&nbsp;(String) | With the filter-style property it is possible to use the ff-asn-group element as a template for all groups which match the filter style. (TREE, DEFAULT, MULTISELECT, SINGLESELECT) |
| **lazy-load**&nbsp;(String) **Options**:&nbsp;"true",&nbsp;"false" (default: "true") | The lazy-load property defines if the ff-asn-elements for the hidden links container should be rendered when the asn group is dispatched or lazily just when the hiddenLinks container is opened via toggleHiddenLinksContainer() or showHiddenLinksContainer(). This improves performance for the first print and is by default set to true. |
| **select-box**&nbsp;(String) **Options**:&nbsp;"true",&nbsp;"false" (default: "false") | Use this when the hiddenLinks should be an HTML select element |
| **disable-auto-expand**&nbsp;(Boolean) | Prevents group from being automatically expanded when it contains any active filters. |

### Methods
| Name | Description |
| ---- | ----------- |
| **toggle(animate?: boolean)** | Toggles the asn-group |
| **show(animate?: boolean)** | Opens the asn-group |
| **hide(animate?: boolean)** | Closes the asn-group |
| **showDetailedLinksContainer(animate?: boolean)** | Opens the detailedLink container. Parameter `animate: boolean` is optional. |
| **hideDetailedLinksContainer(animate?: boolean)** | Close the detailedLink container. Parameter `animate: boolean` is optional. |
| **toggleDetailedLinksContainer(animate?: boolean)** | Toggle the detailedLink container. Parameter `animate: boolean` is optional. |
| **showHiddenLinksContainer(animate?: boolean)** | Opens the hiddenLink container. Parameter `animate: boolean` is optional. |
| **hideHiddenLinksContainer(animate?: boolean)** | Close the hiddenLink container. Parameter `animate: boolean` is optional. |
| **toggleHiddenLinksContainer(animate?: boolean)** |Toggle the hiddenLink container. Parameter `animate: boolean` is optional. |

## `ff-asn-group-element`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **selected**&nbsp;(String)&nbsp;**Options**:&nbsp;"true",&nbsp;"false" (default: "false") | The alignment of the After Search Navigation. |
| **element**&nbsp;(Object)&nbsp;(default: empty) | The filter data. |
| **group**&nbsp;(Object)&nbsp;(default: empty) | The filter group data. |

### Methods
| Name | Description |
| ---- | ----------- |
| **clone(group, element)** | Returns a copy of the group element with the specified group and element to provide the new context. |

## `ff-asn-group-slider`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **opened**&nbsp;(Boolean) | Determines if the filter group is expanded. If you want to have a group opened by default: `<ff-asn-group-slider opened>` does the trick. |
| **collapsible**&nbsp;(String)&nbsp;**Options**:&nbsp;"true",&nbsp;"false" (default: "true") | Determines, if the filter group is collapsible. |
| **for-group**&nbsp;(String)&nbsp;(default: "all") | Determines, which filter group the template should be applied to. If set to `"all"`, the template is applied to all groups if no other template matches the requirements. |
| **group**&nbsp;(Object) | The data for the filter group. |
| **filter-style**&nbsp;(String) | Read only property, always set to "SLIDER" |
| **disable-auto-expand**&nbsp;(Boolean) | Prevents group from being automatically expanded when it contains any active filters. |

### Methods
| Name | Description |
| ---- | ----------- |
| **toggle(animate?: boolean)** | Toggles the asn-group-slider |
| **show(animate?: boolean)** | Opens the asn-group-slider |
| **hide(animate?: boolean)** | Closes the asn-group-slider |

## `ff-slider`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **step-size**&nbsp;(Number) | Determines step size used when the slider is dragged. |
| **selected-min-value**&nbsp;(Number)| The currently selected minimum value. Cannot be less than `absolute-min-value`. |
| **selected-max-value**&nbsp;(Number)| The currently selected maximum value. Cannot be more than `absolute-max-value`. |
| **submit-on-release**&nbsp;(Boolean) **Options**&nbsp;true,&nbsp;false (default: true) | If this is set to true, a filter request is made immediately upon releasing the slider button. |
| **absolute-min-value**&nbsp;(Number) | Indicates the minimum lower end e.g. if set to 50, dragging the slider button to the most left will result in a value of 50. |
| **absolute-max-value**&nbsp;(Number) | Indicates the maximum upper end e.g. if set to 500, dragging the slider button to the most right will result in a value of 500. |
|**unit**&nbsp;(String)| The unit of measurement. E.g. € |

### Methods
| Name | Description |
| ---- | ----------- |
| **submit** | Send the filter request with the current values. |

## `ff-slider-control`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **submit-on-input**&nbsp;(String) **Options**&nbsp;"true",&nbsp;"false" (default: "false") | If this attribute is set to true, the input fields accept values. If set to false, you cannot focus the input fields. |
| **unit**&nbsp;(String) | The unit of measurement. E.g. € |
