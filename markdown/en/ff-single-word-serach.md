# Basics
With the `ff-single-word-search` element, you can split a search into separate words. Each word and its search results are rendered in a `ff-single-word-search-record` element.

This element has no additional attributes. In addition, this element is only shown when the search request has more than one word!

Each word in your search is rendered by a `ff-single-word-search-record`. Inside this record, you can access the single word with the `{{word}}` syntax.

Furthermore, you can access the record counts for each word and a list of products which would be found by a search for this word. You can use these example products from a record-list inside the `ff-single-word-search-record` element.

Define the `data-search="singleWord"` attribute to trigger a search for just that word.

```html
<ff-single-word-search>
    <!-- Define a Header if you fancy-->
    <h1>
        <span id="singleWordSearchCaption">For a part of your search following products could be found:</span>
    </h1>

    <!-- Design the look of your single-word-search -->
    <ff-single-word-search-record>
        <!-- Define the data-search="singleWord" attribute to trigger a search for just that word -->
        <!--
             Also use the recordCount propertie of the word ony inside
             the element with the data-search="singleWord" attribute!
         -->
        <h1 data-search="singleWord">{{word}} ({{recordCount}}) </h1>

        <!-- Use a normal recordlist to display the found records -->
        <ff-record-list>
            <ff-record>
                <img data-image="{{record.ImageName}}">
                <div class="title">{{record.Title}}</div>
                <div class="price">{{record.Price}} &euro;</div>
            </ff-record>
        </ff-record-list>
    </ff-single-word-search-record>
</ff-single-word-search>
```

# API Reference
## ff-single-word-search
### Properties
| Name | Description |
| ---- | ----------- |

### Events
| Name | Description |
| ---- | ----------- |
|**dom-updated**| Fired every time the element is re rendered. |

## ff-single-word-search-record
### Properties
| Name | Description |
| ---- | ----------- |
| **word**&nbsp;(Object) | The data from FACT-Finder. | 

### Methods
| Name | Description |
| ---- | ----------- |
|**clone()**| Allows the cloning of elements including all attributes, behaviors, private fields, states and HTML templates. |