## Overview
With the `ff-compare` element you can display a set of records with additional information and styling on fields which are different.

Inside the `ff-compare` tag you should define a `ff-record-list` to display and style the compared products.
This `ff-record-list` does not listen to the default search result and gets its records from the compare service.

```html
<ff-compare>
    <ff-record-list>
        <ff-record>
            // implement record presentation here
        </ff-record>
    </ff-record-list>
</ff-compare>
```

## Attributes

### max-results

The `max-results` attribute sets how many records should be dispatched to the `ff-record-list` (defaults to 4).

```html
<ff-compare max-results="6">
    <ff-record-list>
        <ff-record>
            // implement record presentation here
        </ff-record>
    </ff-record-list>
</ff-compare>
```

### record-id

Set a list of record IDs as the `record-id` attribute to trigger the compare service.
Usually you want to set the record IDs after a selection of records and then set the IDs via JavaScript.
This is also shown in the example below.

```html
<ff-compare record-id="1001,1002,1003">
    <ff-record-list>
        <ff-record>
            // implement record presentation here
        </ff-record>
    </ff-record-list>
</ff-compare>

<script>
    // alternatively via JavaScript
    function compare() {
        document.querySelector("ff-compare").recordId = [1001,1002,1003];
    }
</script>
```

### subscribe

With the `subscribe` attribute you can define if `ff-compare` should listen to the compare service (defaults to `true`).

```html
<ff-compare subscribe="false">
    <ff-record-list>
        <ff-record>
            // implement record presentation here
        </ff-record>
    </ff-record-list>
</ff-compare>
```

### auto-compare

The `auto-compare` attribute defines if the compare service should be triggered automatically when the record IDs are set.
By default it is set to `true` but there may be use cases where you want to trigger the compare service manually.
Use the `compareRecords` method in such instances.

```html
<ff-compare auto-compare="false">
    <ff-record-list>
        <ff-record>
            // implement record presentation here
        </ff-record>
    </ff-record-list>
</ff-compare>

<script>
    // alternatively via JavaScript
    function compare() {
        const myRecordIds = [1001,1002,1003];
        const compareElement = document.querySelector("ff-compare");

        // does NOT trigger the compare service
        compareElement.recordId = myRecordIds;

        // triggers the compare service
        compareElement.compareRecords(myRecordIds);
    }
</script>
```

### Styling

To display the comparison information you have multiple options:

#### Comparing attributes

Normally, you would use a `ff-record-list` inside a `ff-compare` element.
Now you can add the attribute `data-attribute="fieldName"` to an HTML Element inside the `ff-record-list`.

After the comparison, each field with a difference will be marked with the CSS class `ffw-compare-diff` on the corresponding HTML Element.
Or, when the fields are identical, it will add the `ffw-compare-equal` class.
If the compare service has no results for that given field, all `ffw-compare-*` CSS classes will be removed.

```html
<style>
    .ffw-compare-diff {
        color: red;
    }
</style>

<ff-compare>
    <ff-record-list>
        <ff-record>
            <h2>{{record.Title}}</h2>
            <!-- Will add: class="ffw-compare-diff" on the <div> with 'data-attribute' -->
            <div data-attribute="Price">Price: {{record.Price}}</div>
        </ff-record>
    </ff-record-list>
</ff-compare>
```

#### Mustache rendering

Another way to use the comparison information is to render different HTML Elements based on the result of the comparison.
This information is added as property `diff` to the dispatched records in the `ff-record-list`.
You can use the [mustache.js](https://github.com/janl/mustache.js/#inverted-sections) annotation like this:

```html
<ff-compare>
    <ff-record-list>
        <ff-record>
            <h2>{{record.Title}}</h2>
            <!-- With the data-attribute -->
            {{#diff.Price}}
                <div style="color:red">Price: {{record.Price}}</div>
            {{/diff.Price}}
            {{^diff.Price}}
                <div style="color:green">Price: {{record.Price}}</div>
            {{/diff.Price}}
        </ff-record>
    </ff-record-list>
</ff-compare>
```
