## `ff-searchbox`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **suggest-onfocus**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "false") | If this property is set to true a FACT-Finder Suggest recommendation is displayed as soon as the search box is in focus. |
| **hidesuggest-onblur**&nbsp; (String) **Options**: &nbsp;"true", &nbsp;"false" (default: "true") | Determines if Suggest recommendations are hidden as soon as the cursor leaves the input field. This property is intended for development and styling purposes. |
| **select-onclick**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "false") | Determines if the contents of the search box should be selected if the inside of the box is clicked. |
| **use-suggest**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "true") | Determines if a request should be sent to the suggest interface as soon as a user starts typing in a search term. |
| **suggest-delay** &nbsp;(Number) (default: 0) | Triggers a suggest request only after the delay expired and no more input is set. When the input field changes in the delay time frame the delay will be reset. |
| **value**&nbsp;(String) (default: empty) | Gets or sets the value of related HTML `<input>` element. This property cannot be set as an attribute on `<ff-searchbox>` element. Setting value with JavaScript code triggers `input` event on `<input>` element. Therefore suggestions are shown if they are enabled. |
| **show-asterisk-query**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "false") | Determines if a single asterisk query ("*") should be displayed in the component's input field. Does not affect value typed in the field by the user. |
### Events
| Name | Description |
| ---- | ----------- |
| **before-search** | Is triggered by a search and sends the current search event object. This way the object can be edited prior to the search, e.g. in order to send additional URL parameters. |
| **before-suggest** | Is triggered by a suggest and sends the current suggest event object. This way the object can be edited prior to the suggest, e.g. in order to send additional URL parameters. |

### Methods
| Name | Description |
| ---- | ----------- |
| **search()** | Initializes a search.|
| **resetInput(selector = 'input')** | Sets the `input` reference to the nested HTML element pointed by selector. |

## `ff-searchbutton`
___
### Methods
| Name | Description |
| ---- | ----------- |
| **resetButton(selector = 'button')** | Sets the `button` reference to the nested HTML element pointed by selector. |
