## Tracking

---
This guide covers the Web Components part of the tracking integration. 
For a comprehensive tracking overview please additionally refer to the official [FactFinder Tracking Documentation](https://doku.fact-finder.de/endoc/latest/fact-finder-integration/tracking-interface-integration).

### Click Tracking

---
The integration of Click Tracking for products, recommendations and campaigns is the same.

The `ff-record-list` element detects automatically if the displayed products belong to campaigns, recommendations or the search result. So there is no need to distinguish between recommendation click, campaign click or common product click.

> Note
>
> Click tracking for `ff-campaign-landing-page` requires at least `api="v4"`.
> See the `ff-communication` [API tab](/api/4.x/ff-communication#tab=api) for more details about the `api` attribute.
      
      
#### Tracking with `data-redirect`
The `[data-redirect]` attribute redirects the user on click to the product detail page. We added the tracking behavior to this directive as page reloads may be too fast for tracking requests to succeed when not using the `[data-redirect]` attribute.
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

If you want to use anchor tags (`a`), you additionally have to use the `data-anchor` attribute.
See [Adding links](/api/4.x/ff-record-list) on `ff-record-list` for details.

### Cart/Checkout Tracking on search result page

---
Sometimes you'll want your users to be able to add an item directly to the cart from within the search result page or implement a One-Click-Buy option.

If you want to add cart and/or checkout tracking to your search result page, you can enable the tracking functionality by adding one or both of `[add-checkout-click]` and `[add-cart-click]` to the `ff-record` element.
This will enable additional information for the `data-track` attribute. For checkout tracking you can add `[data-track="checkoutClick"]` or for cart tracking `[data-track="cartClick"]` to any ancestor.

```html
<ff-record-list>
    <ff-record add-cart-click add-checkout-click>
        <div data-track="cartClick">Don't redirect but track a cart click</div>
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
If you want to read the count from the `textContent` property, you need to set the attribute value, e.g. `[data-track-count="textContent"]`. You can use any other value for the attribute. For example `innerHTML` or `value`. The `data-track-count` will try to read the count value from your given property. Without, it will try to read the value from the element prototype. If the element has no `value` property, it will default to `1`.

```html
<ff-record-list>
    <ff-record add-cart-click add-checkout-click>
        <div data-track="cartClick">Don't redirect but track a cart click</div>
        <div data-track="checkoutClick">One click checkout</div>

        <!-- tracking count from a textContent -->
        <div data-track-count="textContent">2</div>
        <!-- OR default to read the value property -->
        <input data-track-count type="number" value="2"/>

        ...

    </ff-record>
</ff-record-list>
```


### Cart Tracking on a product page
It is also necessary to track products that are added to cart from your product pages. For more information on how to do this, please refer to [Tracking with JavaScript](/documentation/4.x/tracking-with-js)

### Login Tracking

---
To integrate login tracking there are, generally speaking, two approaches.
Both involve setting a _user ID_ on Web Components which then adds it to subsequent requests such as _search_ or _recommendations_ for more personalized results.

**Always anonymize the user ID for data protection!**

For simple setups you can set the `user-id` attribute on the `ff-communication` element whenever a user is logged in to your shop platform.
When the `user-id` attribute is set, a login tracking request is sent automatically and Web Components stores the _user ID_ in the browser's storage.
If the same _user ID_ is set again (even on other pages), another login tracking request will **not** be sent.

Note however that this approach is generally **not recommended** out of privacy concerns, and because it doesn't reliably track re-logins.

```html
<ff-communication user-id="AnonymizedShopUserId">
```

The other approach is more involved but gives you more control over when exactly login events shall be tracked.
It does not make use of `user-id` and `search-immediate` attributes of `ff-communication`.
Instead, they must be set via JavaScript and the initial search request must be triggered manually.
The shop's server will be more involved, too.

For a detailed guide to login tracking see [Login Tracking](/documentation/4.x/login-tracking).


### Checkout Tracking

---
The `ff-checkout-tracking` element will send a checkout tracking request for each `ff-checkout-tracking-item` in its DOM. This element is meant to be generated on the server side after the checkout happened. For each product bought, you have to add an own `ff-checkout-tracking-item` with the according record-id and count. E.g. in the example below, five items of product _10321926_ were bought. 

The tracking requests will be sent immediately after the element is parsed or, if you generate it in JavaScript code, when it is appended to the DOM.
```html
<ff-checkout-tracking>
   <ff-checkout-tracking-item record-id="10321926" count="5"></ff-checkout-tracking-item>
   <ff-checkout-tracking-item record-id="10321938" count="3"></ff-checkout-tracking-item>
   <ff-checkout-tracking-item record-id="10321943" count="1"></ff-checkout-tracking-item>
</ff-checkout-tracking>
```
If you want to prevent the auto requests, you can disable them with the Boolean attribute `disable-auto-tracking`:
```html
<ff-checkout-tracking disable-auto-tracking>
   <ff-checkout-tracking-item record-id="10321926" count="5"></ff-checkout-tracking-item>
   <ff-checkout-tracking-item record-id="10321938" count="3"></ff-checkout-tracking-item>
   <ff-checkout-tracking-item record-id="10321943" count="1"></ff-checkout-tracking-item>
</ff-checkout-tracking>
```
If you do so, you can search for the child elements by invoking the `checkoutTrackingElement.trackCheckoutItems()` function manually.

If you want to send the tracking request to a channel different from the one configured in `ff-communication`, use the `channel` attribute.
```html
<ff-checkout-tracking disable-auto-tracking>
   <ff-checkout-tracking-item record-id="10321926" count="5" channel="NEW_CHANNEL"></ff-checkout-tracking-item>
</ff-checkout-tracking>
```

> Note
>
> The `ff-checkout-tracking` element relies on the FactFinder Record API.
> If this API is not supported by your FactFinder version, it won't work.

To have the new element resolve the correct field for tracking on your detail page, you have to set the `fieldRoles` property manually (normally, the `fieldRoles` property is set by receiving a search response from a search request) like: 

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

> Note
>
> You have to replace the right-hand side (like `BrandFieldName`) with your own values.
> If you can't find a way to retrieve the field roles via the FactFinder UI, you can open a FactFinder Web Components search page and trigger a search with your own FactFinder.
> Then, open the browser's dev tools, navigate to the `console` tab and type: `factfinder.communication.fieldRoles`.
