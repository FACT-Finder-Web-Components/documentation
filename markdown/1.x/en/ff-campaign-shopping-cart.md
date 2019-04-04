## Display Shopping Cart Campaigns
With the `ff-campaign-shopping-cart` you can retrieve shopping cart campaigns for a given set of record (product) ids. This element is meant to be used in conjunction with [`ff-campaign-pushed-products`](/api/1.x/ff-campaign-pushed-products) and [`ff-campaign-feedbacktext`](/api/1.x/ff-campaign-feedbacktext) and the `[is-shopping-cart-campaign]` attribute.

```html
<ff-campaign-shopping-cart record-id="123456"></ff-campaign-shopping-cart>

<ff-campaign-feedbacktext is-shopping-cart-campaign label="above-shopping-cart">
    {{{text}}}
</ff-campaign-feedbacktext>

<ff-campaign-pushed-products is-shopping-cart-campaign>
    <ff-record-list>
        <ff-record>
            <span>{{record.Title}}</span>
        </ff-record>
    </ff-record-list>
</ff-campaign-pushed-products>
```