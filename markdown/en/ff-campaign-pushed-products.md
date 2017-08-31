# Adding a Pushed Products campaign
Adding a Pushed Products campaign is as simple as adding the products to your search result page. Just add a valid `ff-record-list` to the `ff-campaign-pushed-products` element. For more information on how to customize the product visualization please refer to the [ff-record-list](http://web-components.fact-finder.de/documentation/ff-record-list).

```html
<ff-campaign-pushed-products>
    <span id="productCampaignCaption">Product Campaign</span>
    <ff-record-list>
        <!-- in this demo a click on the product sets the recommendation product-->
        <ff-record>
            <img data-image="{{record.ImageName}}">
            <!--<img data-image>-->
            <div>
                <a href="https://www.bergfreunde.de/{{record.Deeplink}}" data-action="redirect">
                    {{record.Title}}
                </a>
                <div>Price: <strong>{{record.Price}} €</strong></div>
            </div>
        </ff-record>
    </ff-record-list>
</ff-campaign-pushed-products>
```

# Adding a (Product) Pushed Product campaign
To make your `ff-campaign-pushed-products` react to product detail campaigns just add the `[is-product-campaign]` attribute.

```html
<ff-campaign-pushed-products is-product-campaign>
    <span id="productCampaignCaption">Product Campaign</span>
    <ff-record-list>
        <!-- in this demo a click on the product sets the recommendation product-->
        <ff-record>
            <img data-image="{{record.ImageName}}">
            <!--<img data-image>-->
            <div>
                <a href="https://www.bergfreunde.de/{{record.Deeplink}}" data-action="redirect">
                    {{record.Title}}
                </a>
                <div>Price: <strong>{{record.Price}} €</strong></div>
            </div>
        </ff-record>
    </ff-record-list>
</ff-campaign-pushed-products>
```

# API Reference
## ff-campaign-pushed-products
### Properties
| Name | Description |
| ---- | ----------- |
|**name**&nbsp;(String) (default: empty)| Binds the campaign to a campaign name defined in the FACT-Finder backend. |
|**is-product-campaign**&nbsp;(Boolean) | If this attribute is present, regardless of its value, the `ff-campaign-pushed-products` is only considered for product campaigns retrieved by [ff-campaign-shopping-cart](http://web-components.fact-finder.de/documentation/ff-campaign-shopping-cart) |
|**is-shopping-cart-campaign**&nbsp;(Boolean) | If this attribute is present, regardless of its value, the `ff-campaign-pushed-products` is only considered for shopping cart campaigns retrieved by [ff-campaign-shopping-cart](http://web-components.fact-finder.de/documentation/ff-campaign-shopping-cart) |
