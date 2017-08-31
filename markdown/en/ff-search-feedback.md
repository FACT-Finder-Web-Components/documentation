## Give feedback to the search quality
With the `ff-search-feedback` you can offer customers the option to rate the search experience. The element offers two `slot` insertion points:
    
* **caption**
    * Use it to display the caption of the element. The whole slot is a clickable area which will slide out on click and slide in the content slot instead.
* **content**
    * Use it to place the necessary elements to rate the search.
        
The content slot <b>must</b> include two HTMLElements whose purpose is to give the search quality a positive or
negative rating. Any HTMLElement is possible, all you need to do is to add the attribute `[data-positive]` and `[data-negative]`
to the corresponding elements. The `ff-search-feedback` element will then listen for tab events on those HTMLElements and changes its internal state. Please note:

The default value of the rating is positive. So it will be positive if the user doesn't select any of the tabs.

A rating can also contain a user's feedback text. For this you need to include <b>any</b> HTMLElement which has a
<b>value</b> property. You need to add the attribute `[data-message]` on that HTMLElement.

To send the feedback to FACT-Finder you need to include another HTMLElement with the attribute
`[data-send]` which triggers the request on tab.

```html
<ff-search-feedback align="right" style="position: fixed; top: 40%" unresolved reset-on-toggle reset-on-send>
    <div slot="caption">
        <span>Feedback</span>
    </div>
    <div slot="content">
        <p>Did you find what you were looking for?</p>
        <fieldset>
            <input type="radio" id="pos" name="positive" value="positive" checked data-positive>
            <label for="pos"> Yes</label><br>
            <input type="radio" id="neg" name="positive" value="negative" data-negative>
            <label for="neg"> No</label><br>
            <textarea rows="4" cols="15" maxlength="150" data-message></textarea>
        </fieldset>
        <button data-send>Rate</button>
        <button data-toggle>Cancel</button>
    </div>
</ff-search-feedback>
```

Last but not least, you have the option to add the attribute `[data-toggle]` to any HTMLElement, which should toggle the opened property of the `ff-search-feedback`

# API Reference
## ff-search-feedback

### Properties
| Name | Description |
| ---- | ----------- |
|**opened** (Boolean) (default: false) --notify --reflectToAttribute|Controls which slot 'caption' on false or 'content' on true is visible on page.|
|**align**  (String) (default: left)| The absolute alignment of the element, possible values: 'left' or 'right'|
|**hidden** (Boolean) (default: true) --readOnly --reflectToAttribute|  Controls the visibility of the element: hidden on true, visible on false. Please note: Use hide() or show() to change the visibility as the property is readOnly.|
|**positive**  (String) (default: true) --notify|  Holds the state of the rating: "true" for a positive rating, "false" for a negative rating. The client needs to ensure that its state of the HTMLElements with the attribute [data-positive] and [data-negative] is synchronized with this property. One possibility would be to use an event listener on "positive-changed". **Please note**: [data-toggle] will reset positive to "true" if "resetOnToggle" is true and the element switches from opened true to opened false. [data-send] will reset positive to "true" if "resetOnSend" is true|
|**reset-on-toggle** (Boolean) (default: false)|  If true: resets positive to "true" and sets the value of the HTMLElement data-message to an empty string when pressing [data-toggle] switches the element from opened true to opened false. This can be used when you want to provide a cancel button in the content area which clears the user input on toggle.|
|**reset-on-send** (Boolean) (default: false)|  If true: resets positive to "true", hidden to true and sets the value of the HTMLElement data-message to an empty string when pressing [data-send] leads to a successful FACT-Finder request (event successful is fired).|
|**dont-show-on-result-changed** (Boolean) (default: false)| If true: doesn't shows the element if the result changes and the element is in hidden state.|

### Methods
| Name | Description |
| ---- | ----------- |
|**hide()**| Hides the element and sets the opened property to "false". Useful in cases you want to hide the element on detail page click.|
|**show()**|  Shows the element with it's former state. Useful in cases you hide the element on detail page click and want to show it again after navigating back on a SPA.|
|**reset()**|  Resets positive back to "true" and sets the value of the HTMLElement data-message to an empty string. Useful in cases where "resetOnToggle" or "resetOnSend" is not used.|

### Events
| Name | Description |
| ---- | ----------- |
|**open-changed**| Fired when the element gets hidden or the [data-toggle] element is clicked.|
|**positive-changed**| Fired when the positive property changes.|
|**successful**| Fired when the feedback tracking request to FACT-Finder was successful.|
|**failed**| Fired when the feedback tracking request to FACT-Finder failed.|

### Directives
| Name | Description |
| ---- | ----------- |
|**data-positive**| Sets the rating to positive if the annotated HTMLElement is tabbed.|
|**data-negative**| Sets the rating to negative if the annotated HTMLElement is tabbed.|
|**data-message**| Sets the rating text to the value of the annotated HTMLElement's value property.|
|**data-send**| Submits the feedback to FACT-Finder if the annotated HTMLElement is tabbed.|
|**data-toggle**| Toggles the opened property of the element if the annotated HTMLElement is tabbed.|
