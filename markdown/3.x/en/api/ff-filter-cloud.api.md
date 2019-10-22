## `ff-filter-cloud`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **blacklist** (String) (default: undefined) | A comma separated list of asn group names which should not appear in the list of selected filters. Changing this value causes ff-filter-cloud to update. It will not issue a request to FACT-Finder. This attribute cannot be used in conjunction with the whitelist attribute. Doing so will cause an error and the component will not render itself. |
| **order** (String) **Options**: "alphabetical", "fact-finder", "user-selection" (default: "fact-finder") | Sorts the filter elements: in alphabetical order, in the order provided by FACT-Finder (configurable in the FACT-Finder UI) or in the order the user has clicked them. Changing this value causes ff-filter-cloud to update. It will not issue a request to FACT-Finder. Setting a value other than listed in the Options column causes an error and the component will not render itself. |
| **whitelist** (String) (default: undefined) | A comma separated list of asn group names which should exclusively appear in the list of selected filters. Changing this value causes `ff-filter-cloud` to update. It will not issue a request to FACT-Finder. This attribute cannot be used in conjunction with the `blacklist` attribute. Doing so will cause an error and the component will not render itself. |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |
