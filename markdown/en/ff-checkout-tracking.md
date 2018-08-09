## Checkout Tracking

The `ff-checkout-tracking` element sends out a checkout tracking request
for each `ff-checkout-tracking-item` in its DOM. These elements are supposed
to be generated on server side after the checkout is completed.
Each product needs its own `ff-checkout-tracking-item` with its respective
`record-id` and `count`.


If you omit `count` it defaults to 1.
```HTML
<ff-checkout-tracking>
   <ff-checkout-tracking-item record-id="10321926" count="5"></ff-checkout-tracking-item>
   <ff-checkout-tracking-item record-id="10321938" count="3"></ff-checkout-tracking-item>
   <ff-checkout-tracking-item record-id="10321943" count="1"></ff-checkout-tracking-item>
</ff-checkout-tracking>
```
The tracking requests are sent immediately after the element has been parsed
or when after it is attached to the DOM via JavaScript. You can disable
this behavior by setting the property `disable-auto-tracking` like so:

```HTML
<ff-checkout-tracking disable-auto-tracking>
   ...
</ff-checkout-tracking>
```
This enables you to manipulate the children, namely the
`ff-checkout-tracking-item`s. Consequentially you have to explicitly
invoke `ff-checkout-tracking`'s function `trackCheckoutItems()`.

For instance:
```Javascript
const trackingElement = document.querySelector('ff-checkout-tracking');

// manipulating child elements

trackingElement.trackCheckoutItems();
```


