## Checkout Tracking

> Caution
>
> Checkout tracking is best implemented on the server.
> Only the server can reliably detect the checkout event and track its exact details.
>
> To implement checkout tracking on the client-side relies on a correctly behaving client.
> However, the network response may fail, or users may close the checkout page early.
> Clients are also able to replicate and therefore manipulate checkout tracking events.
>
> **Generally, we recommend the server-side implementation of checkout tracking.**


When the `ff-checkout-tracking` element is in the page, it sends out checkout tracking requests based on the `ff-checkout-tracking-item` elements defined in its DOM.
These elements should be generated server-side after the checkout is completed.

Each product needs its own `ff-checkout-tracking-item` with its respective `product-number`.
Various other optional attributes are available.

```html
<ff-checkout-tracking>
    <ff-checkout-tracking-item product-number="10321926" count="5"></ff-checkout-tracking-item>

    <ff-checkout-tracking-item product-number="10321938"
                               count="3"

                               master-id="1032x"
                               price="9.99"
                               title="The Product's Title"

                               campaign="campaign_id"
    ></ff-checkout-tracking-item>

    <ff-checkout-tracking-item product-number="10321943"
                               count="1"

                               channel="OTHER_CHANNEL"
    ></ff-checkout-tracking-item>
</ff-checkout-tracking>
```


### Attributes

`product-number` is strictly required and must always be specified.

All other attributes are optional.

`count` will default to `1` if omitted.

While `master-id`, `price` and `title` are optional, they are still required to create a valid tracking request.
If one of these attributes is omitted, Web Components will send a separate request to the `/records` API to fetch the relevant values before sending the tracking request.
It is therefore best to always provide these values.

`campaign` can be set when the checked out product was selected through a campaign.

The `channel` attribute specifies the channel to which a tracking request should be sent.
You only need to set this attribute if you want the item to be tracked to a different channel than the one configured in the global Web Components configuration.


#### Global trackable values

`sid`, `userId` and `purchaserId` are also tracked but these are always taken from the global Web Components configuration.
Double-check that you have configured your Web Components application correctly on the checkout page.


#### Disable auto-tracking

The tracking requests are sent immediately after the element has finished initializing.
You can disable this behavior by setting the property `disable-auto-tracking` like so:

```HTML
<ff-checkout-tracking disable-auto-tracking>
    ...
</ff-checkout-tracking>
```

This enables you to manipulate the `ff-checkout-tracking-item` child elements on the client-side.
Consequentially, you will have to manually invoke `ff-checkout-tracking`'s `trackCheckoutItems()` function through JavaScript.

```js
const trackingElement = document.querySelector(`ff-checkout-tracking`);

// Manipulate child elements here.

trackingElement.trackCheckoutItems();
```


### Field roles

It is generally not necessary to configure field roles on the checkout page.
However, it is good practice to always configure them in order to avoid inconsistent behavior across your website.

If the `ff-checkout-tracking` element detects incomplete data, it will query FactFinder's `/records` API and read the field roles directly from there.
Should your client-side integration require a set of field roles different from the one configured in FactFinder, then you will have to ensure these are specified during the Web Components initialization phase.
