## `ff-search-feedback`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **opened**&nbsp;(Boolean)&nbsp;(default: false) | Controls which slot 'caption' on `false`, or 'content' on `true` is visible on page. |
| **align**&nbsp;(String)&nbsp;**Options:** "left", "right" (default: "left")| The absolute alignment of the element. |
| **hidden**&nbsp;(Boolean)&nbsp;(default: true) | Controls the visibility of the element: hidden on `true`, visible on `false`. _Please note_ Use `hide()` or `show()` to change the visibility, as the property is `readOnly`. |
| **positive**&nbsp;(String)&nbsp;(default: "true") | Holds the state of the rating: `"true"` for a positive rating, `"false"` for a negative rating. The client needs to ensure that its state of the HTML elements with the attribute `[data-positive]` and `[data-negative]` are synchronized with this property. One possibility would be to use an event listener on `"positive-changed"`. **Please note**: `[data-toggle]` will reset `positive` to `"true"` if `resetOnToggle` is `true` and the element switches from `opened` `true` to `opened` `false`. `[data-send]` will reset `positive` to `"true"` if `resetOnSend` is `true`. |
| **reset-on-toggle**&nbsp;(Boolean)&nbsp;(default: false) | If `true`, resets `positive` to `"true"` and sets the value of the HTML element `data-message` to an empty string when pressing `[data-toggle]` switches the element from `opened` `true` to `opened` `false`. This can be used when you want to provide a cancel button in the content area which clears the user input on toggle.. |
| **reset-on-send**&nbsp;(Boolean)&nbsp;(default: false)|  If `true` resets positive to `true`, hidden to `true` and sets the value of the HTMLElement `data-message` to an empty string. When pressing [data-send], leads to a successful FACT-Finder request (event successful is fired). |
| **dont-show-on-result-changed**&nbsp;(Boolean) (default: false)| If `true` does not show the element if the result changes and the element is in `hidden` state. |

### Methods
| Name | Description |
| ---- | ----------- |
| **hide()** | Hides the element and sets the opened property to "false". Useful in cases you want to hide the element on detail page click. |
| **show()** | Shows the element with it's former state. Useful in cases you hide the element on detail page click and want to show it again after navigating back on a SPA. |
| **reset()** | Resets positive back to "true" and sets the value of the HTMLElement data-message to an empty string. Useful in cases where "resetOnToggle" or "resetOnSend" is not used. |

### Events
| Name | Description |
| ---- | ----------- |
| **open-changed** | Fired when the element gets hidden or the [data-toggle] element is clicked. |
| **positive-changed** | Fired when the positive property changes. |
| **successful** | Fired when the feedback tracking request to FACT-Finder was successful. |
| **failed** | Fired when the feedback tracking request to FACT-Finder failed. |

### Directives
| Name | Description |
| ---- | ----------- |
| **data-positive** | Sets the rating to positive if the annotated HTMLElement is tabbed. |
| **data-negative** | Sets the rating to negative if the annotated HTMLElement is tabbed. |
| **data-message** | Sets the rating text to the value of the annotated HTMLElement's value property. |
| **data-send** | Submits the feedback to FACT-Finder if the annotated HTMLElement is tabbed. |
| **data-toggle** | Toggles the opened property of the element if the annotated HTMLElement is tabbed. |
