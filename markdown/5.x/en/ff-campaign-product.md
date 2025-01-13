## Adding a Product Campaign

With the `ff-campaign-product` element you can invoke product campaigns that you defined in your FactFinder UI.
Typically, this element is placed in the product detail page.

```html
<ff-campaign-product product-id="12345" id-type="productNumber"></ff-campaign-product>
```

The `product-id` specifies the product ID to which a campaign shall be invoked.
The optional `id-type` defines what type of ID is being referenced.
It can be set to either `productNumber` (default) or `id`.
These values are defined by the FactFinder REST API's `/campaign/{channel}/product` endpoint.

While the element triggers the campaign, it doesn't display anything.
**Visualization** of the triggered campaign is done through the elements `ff-campaign-feedbacktext` and `ff-campaign-pushed-products`.
In order to display product campaigns they must be given the `is-product-campaign` attribute.

```html
<ff-campaign-product product-id="1234"></ff-campaign-product>

<ff-campaign-feedbacktext is-product-campaign label="your-label">
    {{{text}}}
</ff-campaign-feedbacktext>

<ff-campaign-pushed-products is-product-campaign>
    <ff-record-list subscribe="false">
        <template data-role="record">
            <ff-record>...</ff-record>
        </template>
    </ff-record-list>
</ff-campaign-pushed-products>
```

For more information see [Adding Feedback campaigns](/api/5.x/ff-campaign) and [Pushed Products](/api/5.x/ff-campaign-pushed-products).
