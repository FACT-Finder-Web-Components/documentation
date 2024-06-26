## `ff-asn`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **align**&nbsp;(String) **Options**:&nbsp;"vertical",&nbsp;"horizontal" (default: "vertical") | The alignment of the After Search Navigation. |
| **asn-groups**&nbsp;(Array) | The data for all filter groups/facets. |
| **searchable-from**&nbsp;(Number) (default: Infinity) | The minimum number of filters in a group to render search field. The value refers to the sum of **detailed and hidden links**. |
| **subscribe**&nbsp;(String) **Options**:&nbsp;"true",&nbsp;"false" (default: "true") | Defines if component should automatically subscribe to `asn` event and use ASN data retrieved from FactFinder. |
| **topic**&nbsp;(String) | Defines if the component should subscribe to a custom topic instead of the default one. Please note that in this case you need to manually dispatch ASN data. For more information regarding the data's structure, please refer to **Dispatching data manually** in the [ff-asn documentation](/api/3.x/ff-asn#tab=docs). |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |

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
| **select-box**&nbsp;(String) **Options**:&nbsp;"true",&nbsp;"false" (default: "false") | Use this when the hiddenLinks should be an HTML select element |
| **disable-auto-expand**&nbsp;(Boolean) | Prevents group from being automatically expanded when it contains any active filters. |
| **not-searchable**&nbsp;(Boolean) (default: false) | Prevents group from being searchable even if it satisfies `searchable-from` condition.  |

### Methods
| Name | Description |
| ---- | ----------- |
| **toggle(animate?: Boolean)** | Toggles the asn-group |
| **show(animate?: Boolean)** | Opens the asn-group |
| **hide(animate?: Boolean)** | Closes the asn-group |
| **showDetailedLinksContainer(animate?: Boolean)** | Opens the detailedLink container. Parameter `animate: Boolean` is optional. |
| **hideDetailedLinksContainer(animate?: Boolean)** | Close the detailedLink container. Parameter `animate: Boolean` is optional. |
| **toggleDetailedLinksContainer(animate?: Boolean)** | Toggle the detailedLink container. Parameter `animate: Boolean` is optional. |
| **showHiddenLinksContainer(animate?: Boolean)** | Opens the hiddenLink container. Parameter `animate: Boolean` is optional. |
| **hideHiddenLinksContainer(animate?: Boolean)** | Close the hiddenLink container. Parameter `animate: Boolean` is optional. |
| **toggleHiddenLinksContainer(animate?: Boolean)** |Toggle the hiddenLink container. Parameter `animate: Boolean` is optional. |

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
| **toggle(animate?: Boolean)** | Toggles the asn-group-slider |
| **show(animate?: Boolean)** | Opens the asn-group-slider |
| **hide(animate?: Boolean)** | Closes the asn-group-slider |

## `ff-slider`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **step-size**&nbsp;(Number) | Determines step size used when the slider is dragged. |
| **selected-min-value**&nbsp;(Number)| The currently selected minimum value. Cannot be less than `absolute-min-value`. |
| **selected-max-value**&nbsp;(Number)| The currently selected maximum value. Cannot be more than `absolute-max-value`. |
| **submit-on-release**&nbsp;(Boolean) **Options**:&nbsp;true,&nbsp;false (default: true) | If this is set to true, a filter request is made immediately upon releasing the slider button. |
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
| **disable-input-fields**&nbsp;(String) **Options**:&nbsp;"true",&nbsp;"false" (default: "false") | If this attribute is set to false, the input fields accept values. If set to true, the fields are disabled by setting the `disabled` attribute on them. Then they cannot be focused. |
| **submit-on-input**&nbsp;(String) **Options**:&nbsp;"true",&nbsp;"false" (default: "false") | If this is set to true, a filter request is made immediately upon key stroke instead of waiting for an ENTER key press. |
| **unit**&nbsp;(String) | The unit of measurement. E.g. € |

## `ff-asn-remove-all-filter`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **show-always**&nbsp;(Boolean) |  Defines if the element is only visible when at least one removable filter is set, or always. |
| **remove-params**&nbsp;(Boolean) | Setting this attribute removes all parameters (except the search query) from the resetting request. When not set, only parameters that were applied by the ASN (recognizable by the `filter*` prefix) are removed. Other parameters like `products-per-page`, `sort` and custom parameters will be unaffected. |
| **keep-category-path**&nbsp;(Boolean) | Setting this property preserves the category filters. |
