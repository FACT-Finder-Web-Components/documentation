## Overview
With the `ff-compare` element, you can display a set of records with additional information and styling on
fields which are different.

Inside the `ff-compare` tag, you should define a `ff-record-list` to display and style the compared products.
This `ff-record-list` does not listen to the default search result and gets its records from the compare service.

```html
<ff-compare>
    <ff-record-list>
        <ff-record>
            //implement record presentation here.
        </ff-record>
    </ff-record-list>
</ff-compare>
```

## Attributes

### max-results

The `max-results` attribute sets how many Records should be dispatched to the `ff-record-list`. (defaults to 4).

```html
<ff-compare max-results="6">
    <ff-record-list>
        <ff-record>
            //implement record presentation here.
        </ff-record>
    </ff-record-list>
</ff-compare>
```

### record-id

Set a list of record IDs as the `record-id` attribute to trigger the compare service. Usually you want
to set the record IDs after a selection of records and the set the IDs via JavaScript. This is also shown in the
example bellow.

```html
<ff-compare record-id="1001,1002,1003">
    <ff-record-list>
        <ff-record>
            //implement record presentation here.
        </ff-record>
    </ff-record-list>
</ff-compare>

<script>
    //alternativ via JavaScript
    function compare(){
        document.querySelector("ff-compare").recordIds = [1001,1002,1003];
    }
</script>
```

### subscribe

With the `subscribe` attribute, you can define if the `ff-compare` should listen to the compare service (defaults to true).

```html
<ff-compare subscribe="false">
    <ff-record-list>
        <ff-record>
            //implement record presentation here.
        </ff-record>
    </ff-record-list>
</ff-compare>
```

### auto-compare

The `auto-compare` attribute defines, if the compare service should be triggered automatically when the
record IDs are set. This is `true"` as default. But there are Use cases where you want to manually
trigger the compare service.

```html
<ff-compare auto-compare="false">
    <ff-record-list>
        <ff-record>
            //implement record presentation here.
        </ff-record>
    </ff-record-list>
</ff-compare>

<script>
    //alternativ via JavaScript
    function compare(){
        const myRecordIds = [1001,1002,1003];
        const compareElement = document.querySelector("ff-compare");

        //dose NOT triggere the compare service
        compareElement.recordIds = myRecordIds;

        //triggeres the compare service
        compareElement.compareRecords(myRecordIds);
    }
</script>
```

### Styling

To display the compare information, you have multiple options:

#### `[data-attribute]`

Normally, you always use a `ff-record-list` inside a `ff-compare` element.
Now you can add the attribute `data-attribute="fieldName"` to an HTML Element inside the `ff-record-list`.


After the comparison, each different field will add the css class **ff-compare-diff** to the
corresponding HTML Element. Or it will add the css class **ff-compare-same** when the fields are identical.
If the compare service has no results for that given field, all **ff-compare-*** css will be removed.

```html
<style>
    .ff-compare-diff {
        color: red;
    }
</style>
<ff-compare>
    <ff-record-list>
        <ff-record>
            <h2>{{record.Title}}</h2>
            <!-- Will add: class="ff-compare-diff on the <div> with teh data-attribute"-->
            <div data-attribute="Price">Price: {{record.Price}}</div>
        </ff-record>
    </ff-record-list>
</ff-compare>
```

#### Mustach rendering

Another way to use the compare information is to render different HTML Elements based on the result of the compare.
The information is added to the dispatched Records in the ff-record-list so that you can use the
[Mustache](http://mustache.github.io/) annotation like this:

```html
<ff-compare>
    <ff-record-list>
        <ff-record>
            <h2>{{record.Title}}</h2>
            <!-- With the data-attribute -->
            {{#diff.Price.true}}
                <div style="color:red">Price: {{record.Price}}</div>
            {{/diff.Price.true}}
            {{#diff.Price.false}}
                <div style="color:green">Price: {{record.Price}}</div>
            {{/diff.Price.false}}
        </ff-record>
    </ff-record-list>
</ff-compare>
```