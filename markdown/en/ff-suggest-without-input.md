## Prepare input tag
You can also mix the <b>ff-webcomponents</b> with normal HTML tags, but you need to implement part
of the functionality yourself.

In this example, we use a simple HTML `input` tag and add custom `oninput` and `onblur` functions.
```html
<h3>Type in your search to open the suggest menu.</h3>
<input placeholder="Search..."
       oninput="raiseSuggestEvent(this)"
       onblur="hideSuggest()"/>
```

## ff-suggest
Add a normal `ff-suggest`. We trigger Suggest with custom code in the next step.
```html
<ff-suggest layout="list">

    <!-- You can define different elements which are displayed in the Suggestbox -->
    <section id="searchContainer" class="searchTermContainer">
        <div data-container="searchTerm">
            <p class="containerCaption">Suchvorschläge</p>
            <ff-suggest-item type="searchTerm">
                <span>{{{name}}}</span>
            </ff-suggest-item>
        </div>

        <div data-container="category">
            <p class="containerCaption">Kategorievorschläge</p>
            <ff-suggest-item type="category">
                <span>{{{name}}}</span>
            </ff-suggest-item>
        </div>

        <div data-container="brand">
            <p class="containerCaption">Marken</p>
            <ff-suggest-item type="brand">
                <span>{{{name}}}</span>
            </ff-suggest-item>
        </div>
    </section>

    <section id="productContainer" class="productsContainer">
        <div data-container="productName">
            <p class="containerCaption">Vorgeschlagene Produkte</p>
            <div>
                <ff-suggest-item type="productName" onclick="changeSearchTerm(this)">
                    <img data-image>
                    <div class="product-center">
                        <div class="product-name">{{{name}}}</div>
                        <div>Shipping</div>
                        <div>Rating</div>
                    </div>
                    <!-- Price and availability-->
                    <div class="product-right">
                        <div class="product-price">{{attributes.Price}}€</div>
                        <div class="product-availabilitytext">{{attributes.availabilitytext}}</div>
                    </div>
                </ff-suggest-item>
            </div>
        </div>
    </section>
</ff-suggest>
```

## Trigger the Suggest
The `oninput` attribute on the `input` tag executes the `raiseSuggestEvent()` function.
In this function, we take the input value and set it as <b>currentFFSearchBoxValue</b> in the
`factfinder.communication.globalElementValues` module.

Next we fire a FFEvent to the `factfinder.communication.FFCommunicationEventAggregator`.

The event of the <b>suggest</b> type and as query we take the input value from the `input`  tag.
```js
// Calls the FACT-Finder suggest event.
function raiseSuggestEvent(e) {
    var inputValue = e.value;
    if (inputValue && inputValue.length >= 2) {
        // this value is set to indicate if the current input value belongs to the received suggest response
        // e.g. suggest request takes 100ms while the user is deleting all chars in the input field
        // input field is empty but suggest data is now arriving.
        // The suggest needs to know if this data belong to the current input value (which is currently
        // empty string and therefore does not)
        factfinder.communication.globalElementValues.currentFFSearchBoxValue = inputValue;
        factfinder.communication.FFCommunicationEventAggregator.addFFEvent({
            type: "suggest",
            query: inputValue
        });
    } else {
        hideSuggest();
    }
}
```

## On blur
To hide the Suggest we dispatch an empty Suggest result to the `factfinder.communication.ResultDispatcher`
```js
// The dispatch event call empties the suggest box and hides it.
function hideSuggest() {
    factfinder.communication.ResultDispatcher.dispatchSuggest(undefined);
}
```

## Set searchTerm
In the `ff-suggest` example above we used a custom `onclick` function on a `ff-suggest-item`.
In this function we take the suggestion id to set the current search term for the `input`.
```js
// Changes the term within the search box to the selected suggest item.
function changeSearchTerm(e) {
    var searchInput = e.suggestion.attributes.id;
    document.querySelector("input").value = searchInput;
}

```