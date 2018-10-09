## Tracking

---
This guide covers the integration of all necessary events.

### Click Tracking

---
The Click-Tracking for products, recommendations and campaigns is integrated in the same way.

The `ff-record-list` element detects automatically if the product which are displayed belong to campaigns, recommendations or the search result. So their is no need to distinguish between recommendation click, campaign click or common product click.


#### Tracking with `data-redirect`
The `[data-redirect]` attribute redirects the user on click to the product detail page. While without using the `[data-redirect]` attribute the browser may reloads the page to fast for the tracking request to succeed we added the tracking behavior to this directive.
````html
<ff-record-list>
    <ff-record>
        <div data-redirect="{{record.Deeplink}}"
             data-redirect-target="_blank">
            <img data-image="{{record.ImageName}}">
            <span>{{record.Title}}</span>
        </div>
    </ff-record>
</ff-record-list>
````

### Cart/Checkout Tracking on search result page

---
Sometimes you'll want your users to be able to add an item directly to the cart from within the search result page or implement a One-Click-Buy option.

If you want to add cart and/or checkout tracking to your search result page you can enable the tracking functionality by add one or both of `[add-checkout-click]`, `[add-cart-click]` to the ff-record element.
This will enable additional information for the data-track attribute. For checkout tracking you can add `[data-track="checkoutClick"]` or for cart tracking `[data-track="cartClick"]` to any ancestor.

```html
<ff-record-list>
    <ff-record add-cart-click add-checkout-click>
        <div data-track="cartClick">Dont redirect but track a cart click</div>
        <div data-track="checkoutClick">One click checkout</div>

        <div data-redirect="{{record.Deeplink}}"
             data-redirect-target="_blank">
            <img data-image="{{record.ImageName}}">
            <span>{{record.Title}}</span>
        </div>
    </ff-record>
</ff-record-list>
```

To track how many products are put into the cart or checked out, you need to add the attribute `[data-track-count]` to an element.
If you want to read the count from the textContent property, you need to set the attribute value, e.g. `[data-track-count="textContent"]`. You can use any other value for the attribute. For example "innerHTML" or "value". The data-track-count will try to read the count value from your given property. Without, it will try and read the value from the element prototype. If the element has no value property it will default to 1.

```html
<ff-record-list>
    <ff-record add-cart-click add-checkout-click>
        <div data-track="cartClick">Dont redirect but track a cart click</div>
        <div data-track="checkoutClick">One click checkout</div>

        <!-- tracking count from a textContent -->
        <div data-track-count="textContent">2</div>
        <!-- OR default to read the value property -->
        <input data-track-count type="number" value="2"/>

        ...

    </ff-record>
</ff-record-list>
```

### Login Tracking

---
The `<ff-communication>` element provides a `user-id` attribute. When setting this attribute a login request is sent automatically to FACT-Finder a soon as the page has loaded.

<ff-communication user-id="YourShopUserId">

In case a user is not logged in just leave it empty. **Never use a FakeId or something similar!** 

### Checkout Tracking

---
The `ff-checkout-tracking` element will send a checkout tracking request for each `ff-checkout-tracking-item` in it's DOM. This element is ment to be generated on server side after the checkout happened. For each product bought, you have to add an own `ff-checkout-tracking-item` with the according record-id and count. E.g. in the example below 5 items of product 10321926 were bought. 

The tracking requests will be sent immediately after the element is parsed or, if you generate it in the javascript code, when it's appeneded to the DOM. 
```html
<ff-checkout-tracking>
   <ff-checkout-tracking-item record-id="10321926" count="5"></ff-checkout-tracking-item>
   <ff-checkout-tracking-item record-id="10321938" count="3"></ff-checkout-tracking-item>
   <ff-checkout-tracking-item record-id="10321943" count="1"></ff-checkout-tracking-item>
</ff-checkout-tracking>
```
If you want to prevent the auto requests you can disable them with the Boolean attribute `disable-auto-tracking`:
```html
<ff-checkout-tracking disable-auto-tracking>
   <ff-checkout-tracking-item record-id="10321926" count="5"></ff-checkout-tracking-item>
   <ff-checkout-tracking-item record-id="10321938" count="3"></ff-checkout-tracking-item>
   <ff-checkout-tracking-item record-id="10321943" count="1"></ff-checkout-tracking-item>
</ff-checkout-tracking>
```
If you do so, you can poke around with the child elements and invoke the `checkoutTrackingElement.trackCheckoutItems();` function manually.

**NOTE:** the `<ff-checkout-tracking>` element relies on the FACT-Finder Record API. If this API is not supported by your FACT-Finder Version it won't work

To have the new element resolve the correct field for tracking on your detail page, you have to set the fieldRoles property manually (normally the fieldRoles property is set by receiving a search response from a search request) like: 
```
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
**NOTE:** You have the replace the right hand side (like `BrandFieldName`) with your own values. If can't find a way to retrieve the field roles via the FACT-Finder UI, you can open a Web Components search page, trigger a search with your own FACT-Finder and afterwards open the Browser Dev Tools, navigate to the `console`  tab and type: `factfinder.communication.fieldRoles` -> Hit enter