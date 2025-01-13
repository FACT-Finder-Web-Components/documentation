## Display Shopping Cart Campaigns

With the `ff-campaign-shopping-cart` element you can invoke shopping cart campaigns for a given set of product IDs.

This element is only a trigger without a visual component.
Use [ff-campaign-feedbacktext](/api/5.x/ff-campaign) and [ff-campaign-pushed-products](/api/5.x/ff-campaign-pushed-products) and their `is-shopping-cart-campaign` attribute for visualization.

```html
<ff-campaign-shopping-cart product-id="prod-1,prod-2,prod-3"></ff-campaign-shopping-cart>

<ff-campaign-feedbacktext is-shopping-cart-campaign label="above-shopping-cart">
    {{{text}}}
</ff-campaign-feedbacktext>

<ff-campaign-pushed-products is-shopping-cart-campaign>
    <ff-record-list subscribe="false">
        <template data-role="record">
            <ff-record>...</ff-record>
        </template>
    </ff-record-list>
</ff-campaign-pushed-products>
```
