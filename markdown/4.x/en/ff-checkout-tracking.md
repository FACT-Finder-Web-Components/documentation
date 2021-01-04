## Checkout Tracking

The `ff-checkout-tracking` element sends out a checkout tracking request
for each `ff-checkout-tracking-item` in its DOM. These elements are supposed
to be generated on server side after the checkout is completed.
Each product needs its own `ff-checkout-tracking-item` with its respective
`record-id`. Optionally you can also provide a `count` and a `price` attribute.

The `count` attribute specifies how many items of the product were bought. It defaults to 1.

The `price` attribute specifies the price of the bought item. If this attribute is not present, it will be inferred from the clicked item and the configured [fieldRoles](/documentation/4.x/field-roles).

The `channel` attribute specifies the channel to which a tracking request should be sent. If this attribute is not present, the default value configured in `ff-communication` will be used.


```HTML
<ff-checkout-tracking>
    <ff-checkout-tracking-item record-id="10321926" count="5" channel="NEW_CHANNEL"></ff-checkout-tracking-item>
    <ff-checkout-tracking-item record-id="10321938" count="3" price="9.99"></ff-checkout-tracking-item>
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

> Note
>
> The `ff-checkout-tracking` element depends on FACT-Finder's Record API.
> The element won't work unless your FACT-Finder version supports this API.

### Setting field roles is required

> Important
>
> Usually the `fieldRoles` property is set automatically after receiving a search response.
> Checkout pages typically don't issue search requests before the checkout tracking happens.
> Therefore, at the time of tracking, the field role configuration is unknown to Web Components, and it must be set manually.

To have `ff-checkout-tracking` resolve the correct fields for tracking on your detail page, you have to set the `fieldRoles` property manually like so:

```html
<script>
document.addEventListener("ffReady", function (event) {
    const factfinder = event.factfinder;
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
</script>
```

See the article on [field roles](/documentation/4.x/field-roles) for more details.

> Note
>
> You have to replace the right-hand side (e.g. "BrandFieldName") with your own values.
> If you can't find a way to retrieve the `fieldRoles` via the FACT-Finder UI, you can trigger a search on a page that uses FACT-Finder Web Components and your FACT-Finder instance.
> Afterwards, open the browser's Dev Tools, navigate to the Console Tab and enter: `factfinder.communication.fieldRoles`
