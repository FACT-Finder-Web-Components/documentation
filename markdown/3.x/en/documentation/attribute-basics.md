## Attributes

---
Every element can have attributes of various types. These types are `Boolean`, `String`, `Object`, `Array`. Understanding their differences is important as this is a common source of error.

## Difference between Boolean and String

### Boolean

---

For attributes of type `Boolean` only their presence on the HTML element is relevant. Their assigned value is ignored. The presence of a boolean attribute on an element represents the `true` value, and the absence of the attribute represents the `false` value.

```html
<ff-asn-group opened></ff-asn-group>
<ff-asn-group opened="false"></ff-asn-group>
``` 

In both cases `opened` evaluates to `true` regardless of a value being assigned or not.
In order to have it evaluate to `false` simply omit the attribute altogether.

```html
<ff-asn-group></ff-asn-group> <!-- opened evaluates to false -->
``` 

### String

---
Attributes of type `String` typically have several possible values defined. Only these values will be accepted while others will be ignored. A value can be case-sensitive depending on the implementation.

```html
<ff-searchbox use-suggest="false"> <!-- evaluates to false -->
<ff-searchbox use-suggest="true"> <!-- evaluates to true -->
``` 

See the API section of an element for an overview of possible values. For example [`ff-searchbox`](/api/3.x/ff-searchbox#tab=api).

## Object/Array

`Object` attributes are somehow different from other attributes. As mentioned in [element basics](/documentation/3.x/communication) all elements are data driven.

For example the `ff-record-list` has a `records` property of type `Array`. What you now could possibly do is something like this:

```javascript
document.querySelector("ff-record-list").records = [ {
        id: "record1",
        record: {
            Title: "Record One",
            price: 15.99
        }
    }, {
        id: "record2",
        record: {
            Title: "Record Two",
            price: 100000.99
        }
    }]
``` 

This would trigger the `ff-record-list` element to render its contained `ff-record` elements with the specified data.
