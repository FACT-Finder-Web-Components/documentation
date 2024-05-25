## Tracking Edge Cases
---

### Discount Prices
If your shop offers discount prices you need to change the returned data in order to track the discount price instead of the normal price.

#### The Problem
FactFinder is using `Field Roles` to identify the field which should be used for specific actions.

**Example Field Roles**
```javascript
{
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
}
```

Reading through the field roles we can see that the field `PriceField` contains the price.
FactFinder Web components are resolving fields when they prepare a tracking request or something else that requires knowledge about specific parts of your data. 

So in case of a discount price field, they would look up the wrong field because discountPrice != price. 

#### Using discount prices for tracking requests
Let's consider the following scenario:

Your product data contains 2 price fields `price` and `discountPrice`. The `discountPrice` field contains `null` if no discount price is available. The field role looks like `"price": "price"`
So basically what we have to do is writing the discount price into the price field for a proper tracking. In order to keep our `<ff-record-list>` templates simple for mental sanity we are going to introduce a new field for displaying the price. Let's call this field `origPrice` (or displayPrice).
```html
<script>
    document.addEventListener("ffReady", function (event) {
        const resultDispatcher = event.resultDispatcher;
        resultDispatcher.subscribe("records", function (records) {
            records.forEach(function (product) {
                product.record.origPrice = product.record.price;
                if (product.record.discountPrice !== null) {
                    product.record.price = product.record.discountPrice;
                }
            });                           
        });
    });
</script>
```

The Template could look like:

```html
<ff-record-list>
    <ff-record>
        <span class="price">{{record.origPrice}}</span>
        {{#record.discountPrice}}
            <span class="discountStyle">{{record.discountPrice}}</span>
        {{/record.discountPrice}}
    </ff-record>
</ff-record-list>
```

