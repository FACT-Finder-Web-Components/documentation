## Overview

With the `ff-similar-products` element you can display a list of products which are similar to a specified product.

Inside the `ff-similar-products` element you define an `ff-record-list` to display the similar products.

```html
<ff-similar-products>
    <div class="similarProductsHeader">Similar Products</div>

    <ff-record-list subscribe="false">
        <template data-role="record">
            <ff-record>
                <img data-image>
                <div>
                    <a href="https://your.shop/{{variantValues.0.Deeplink}}">
                        {{variantValues.0.Title}}
                    </a>
                    <div>Price: <strong>{{$ variantValues.0.Price}}</strong></div>
                </div>
            </ff-record>
        </template>
    </ff-record-list>
</ff-similar-products>
```


## Attributes

### product-id and id-type

When the `product-id` attribute is set, and every time it changes, `ff-similar-products` queries the FactFinder API for products similar to the one specified.

The `id-type` attribute defines what type of ID `product-id` specifies.
There are two possible values:
- `productNumber`
- `id`

Both attributes are required in order to invoke a valid request to FactFinder.

```html
<ff-similar-products product-id="123456789" id-type="productNumber">
    <!-- ... -->
</ff-similar-products>
```

```js
const similarProductsElement = document.querySelector(`ff-similar-products`);
similarProductsElement.idType = `id`;
similarProductsElement.productId = `567891234`;
```


### max-results

The `max-results` attribute defines how many records the FactFinder API shall return at most.
The default value is empty and the FactFinder API will return as many records as its own default value is set to.

```html
<ff-similar-products max-results="4">
   <!-- ... -->
</ff-similar-products>
```
