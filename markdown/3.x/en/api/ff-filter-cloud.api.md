## `ff-filter-cloud`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **blacklist** (String) (default: undefined) | A comma separated list of asn group names which should not appear in the list of selected filters. Changing this attribute has no effect until the next search request to FACT-Finder. This attribute cannot be used in conjunction with the whitelist attribute. Doing so will cause an exception to be thrown. |
| **order** (String) **Options**: "alphabetical", "fact-finder", "user-selection" (default: "fact-finder") | Sorts the filter elements: in alphabetical order, in the order provided by FACT-Finder (configurable in the FACT-Finder UI) or in the order the user has clicked them. |
| **whitelist** (String) (default: undefined) | A comma separated list of asn group names which should exclusively appear in the list of selected filters. Changing this attribute has no effect until the next search request to FACT-Finder. This attribute cannot be used in conjunction with the blacklist attribute. Doing so will cause an exception to be thrown. |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |
