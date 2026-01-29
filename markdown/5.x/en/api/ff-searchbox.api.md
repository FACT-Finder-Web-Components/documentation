## `ff-searchbox`
___
### Properties
| Name | Description |
|------|-------------|
| **popular-searches**&nbsp;(Boolean) | Setting this attribute activates the Popular Searches feature. |
| **suggest-onfocus**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "false") | If this property is set to `"true"`, a FactFinder Suggest recommendation is displayed as soon as the search box is in focus. |
| **select-onclick**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "false") | Determines if the contents of the search box should be selected if the inside of the box is clicked. |
| **use-suggest**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "true") | Determines if a request should be sent to the suggest interface as soon as a user starts typing a search term. |
| **suggest-delay** &nbsp;(Number) (default: 350) | Triggers a suggest request only after the delay expired and no more input is set. When the input field changes within the delay time frame, the delay will reset. |
| **show-asterisk-query**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "false") | Determines if a single asterisk query ("`*`") should be displayed in the component's input field. Does not affect value typed in the field by the user. |
| **value**&nbsp;(String) (default: empty) | Gets or sets the value of the nested HTML `input` element. This property is only accessible through JavaScript. Setting `value` triggers an `input` **event** on the `input` **element**. Therefore, suggestions whill show if they are enabled. |


### Methods
| Name | Description |
| ---- |-------------|
| **search()** | Initiates a search with the current search text. |
| **resetInput(selector = 'input')** | Tells `ff-searchbox` which nested element it shall use as its `input`. |

## `ff-searchbutton`
___
### Properties
| Name | Description |
|------|-------------|
| **for**&nbsp;(String) | Specify the `id` of an `ff-searchbox` element to link the button to that search box. |


### Methods
| Name | Description |
| ---- |-------------|
| **resetButton(selector = 'button')** | Tells `ff-searchbutton` which nested element it shall use as its `button`. |
