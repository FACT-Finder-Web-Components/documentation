## Tracking Edge Cases

### Discount Prices
If your shop offers discount prices you need to change the returned data in order to track the discount price instead of the normal price.

<br>
#### The Problem
FACT-Finder is using `Field Roles` to identify the which should be used for specific things.

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
What web components do you when they are going to prepare a tracking request is resolving the field roles using the product data.

So in case of discount price field they would look up the wrong field. 

<br>
#### Using discount prices for tracking requests
Let's consider the following scenario:

Your product data contains 2 price fields `price` and `discountPrice`. The `discountPrice` field contains `null` if no discount price is available. The field role looks like this `"price": "price"`
So basically what we have to do is writing the discount price into the price field for a proper tracking. In order to keep our `<ff-record-list>` templates simple for mental sanity we are going to introduce a new field for displaying the price. Let's call this field `origPrice`.
```javascript
    document.addEventListener("ffReady", function () {
        factfinder.communication.ResultDispatcher.subscribe("records", function (records) {
            records.forEach(function (product) {
                product.record.origPrice = product.record.price;
                if (product.record.discountPrice === null) {
                    product.record.price = product.record.discountPrice;
                }
            });                           
        });
    });
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

