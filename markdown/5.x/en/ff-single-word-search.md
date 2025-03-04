## Overview

With the `ff-single-word-search` element, you can split a search result into separate words.
It is only shown when the search request has more than one word.

Each word and its search results are rendered by a `ff-single-word-search-record` element.
Inside this element, you can access the `SingleWordSearchResult` data object that was received from FactFinder.
This includes, among others, _hit count_ and the _products_ found by the word.
See your FactFinder REST API documentation for details.

Inside the `ff-single-word-search-record` element, you can use an `ff-record-list` element to render the found products.
Also, you can set the `data-search="singleWord"` attribute on any element to attach a click listener which triggers a search for the current word.

```html
<ff-single-word-search>

    <!-- Define a Header if needed. -->
    <h1>
        <span id="singleWordSearchCaption">For a part of your search following products could be found:</span>
    </h1>

    <!-- Design the look of your single-word-search. -->
    <ff-single-word-search-record>

        <!-- Set the data-search="singleWord" attribute to trigger a search by clicking the element. -->
        <!-- `word` and `totalHits` are from the SingleWordSearchResult data object. -->
        <h2 data-search="singleWord">{{word}} ({{totalHits}}) </h2>

        <!-- Use a regular ff-record-list to display the found records. -->
        <ff-record-list>
            <template data-role="record">
                <ff-record>
                    <img data-image="{{variantValues.0.ImageName}}">
                    <div class="title">{{variantValues.0.Title}}</div>
                    <div class="price">{{$ variantValues.0.Price}}</div>
                </ff-record>
            </template>
        </ff-record-list>
    </ff-single-word-search-record>
</ff-single-word-search>
```
