## Give feedback to the search quality
With the `ff-search-feedback` you can offer customers the option to rate the search experience. The element offers two `slot` insertion points:
    
* **caption**
    * Use it to display the caption of the element. The whole slot is a clickable area which will slide out on click and slide in the content slot instead.
* **content**
    * Use it to place the necessary elements to rate the search.
        
The content slot must include two HTMLElements whose purpose is to give the search quality a positive or negative rating.
Any HTMLElement is possible.
All you need to do is to add the attribute `data-positive` or `data-negative` to the corresponding elements.
The `ff-search-feedback` element will listen for click events on those HTMLElements, and it will change its internal state.
Please note:

The default value of the rating is positive.
So it will be positive if the user doesn't select any of the options.

A rating can also contain a user's feedback text.
For this you need to include **any** HTMLElement which has a **value** property.
You need to add the attribute `data-message` on that HTMLElement.

To send the feedback to FACT-Finder you need to include another HTMLElement with the attribute `data-send` which triggers the request when clicked.

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

Last but not least, you have the option to add the attribute `data-toggle` to any HTMLElement, which should toggle the `opened` property of the `ff-search-feedback`.
