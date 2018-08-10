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

**NOTE:** `<ff-checkout-tracking>` element depends on FACT-Finder's Record API.
The element won't work unless your FACT-Finder version supports this API.

To have the new element resolve the correct field for tracking on your
detail page, you have to set the `fieldRoles` property manually (normally
the fieldRoles property is set by receiving a search response from a
search request) like so:

```Javascript
document.addEventListener("ffReady", function () {
            factfinder.communication.fieldRoles = {
                brand: "BrandFieldName",
                campaignProductNumber: "SomeIDField",
                deeplink: "DeeplinkField",
                description: "DescriptionField",
                displayProductNumber: "SomeIDField",
                ean: "TheEanField",
                imageUrl: "ImageUrlField",
                masterArticleNumber: "MasterArticleNumberField",
                price: "PriceField",
                productName: "NameField",
                trackingProductNumber: "SomeIdField"
            };
        });
```

**NOTE:** You have to replace the right hand side (e.g. BrandFieldName)
with your own values. If you can't find a way to retrieve the `fieldRoles`
via the FACT-Finder UI, you can trigger a search on a page that uses
Web Components and your FACT-Finder instance. Afterwards open the
Browser Dev Tools, navigate to the Console Tab and enter:
`factfinder.communication.fieldRoles`