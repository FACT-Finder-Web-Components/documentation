## Attributes

---
Every element can have attributes from a different type.
These types include `Boolean`, `String`, `Object`, `Array`. There are slight differences between which leads to common mistakes.

## Difference Boolean and String
There is big difference between Boolean and String attributes.

### Boolean

---
If an attribute is from type `Boolean` it ignores its value. The real attribute value results to `true` if the attribute is present on the element regardless of its value.

````html
<ff-communication add-unit-to-filter-groups="false"></ff-communication> // true because it's a boolean attribute
```` 

The only way to set the this attribute to false is removing it entirely.
````html
<ff-communication></ff-communication> // add-unit-to-filter-groups is false because it's not present on the element
```` 

### String

---
If an attribute is from type `String` it accepts only values it expects. The value can be case-sensitive depending on implementation. Normally all valid values are documented in the API section of an element. 
E.g. `<ff-communication use-url-parameter="false">` is correct because its [API documentation](api/ff-searchbox) states: `use-url-parameter (String) Options:  true,  false (default: true)`

````html
// value is false and therefore **no** url parameters are pushed to the history when a search request succeeds.
<ff-communication use-url-parameter="false">

// value is true and therefore url parameters are pushed to the history when a search request succeeds. 
<ff-communication use-url-parameter="true">  
```` 

The only way to set the this attribute to false is removing it entirely.
````html
<ff-communication></ff-communication> // add-unit-to-filter-groups is false because it's not present on the element
```` 

## Object/Array
`Object` attributes are somehow different than every other attributes.
As mentioned in [element basics](documentation/communication) all elements are data driven.

For example the `ff-record-list` has an `records` property of type `Array`. 
What you now could possibly do is something like this:

````javascript
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
```` 

And the `ff-record-list` element would start to render and do its job.