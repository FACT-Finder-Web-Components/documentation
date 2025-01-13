## Adding a Pushed Products campaign

Pushed products can be displayed by placing an `ff-record-list` inside an `ff-campaign-pushed-products` element.
The `ff-campaign-pushed-products` element scans **search results** for applicable campaigns and populates the nested `ff-record-list`.

For more information on how to customize the product visualization please refer to the [ff-record-list](/api/5.x/ff-record-list).

```html
<ff-campaign-pushed-products>
    <!-- Optional additional HTML. -->
    <span class="productCampaignCaption">Product Campaign</span>

    <!-- Set `subscribe` to false as this record list will not be listening to search requests directly. -->
    <ff-record-list subscribe="false">
        <template data-role="record">
            <ff-record>
                <img data-image="{{variantValues.0.ImageName}}">
                <div>
                    <a href="https://www.your.shop/{{variantValues.0.Deeplink}}">
                        {{variantValues.0.Title}}
                    </a>
                    <div>Price: <strong>{{$ variantValues.0.Price}}</strong></div>
                </div>
            </ff-record>
        </template>
    </ff-record-list>
</ff-campaign-pushed-products>
```


### Display results from stand-alone campaign triggers

By default, `ff-campaign-pushed-products` only displays campaigns that are part of a **search result**.
However, there is the option to trigger campaigns independent of searches.
These are _landing page_, _product_ and _shopping cart_ campaigns.

In order to display these kind of campaigns, you have to add a corresponding attribute.
The element will then only respond to the specified trigger and no longer react to search results.

| Attribute | Triggered by element |
| --------- | -------------------- |
| `is-landing-page-campaign` | `ff-campaign-landing-page` |
| `is-product-campaign` | `ff-campaign-product` |
| `is-shopping-cart-campaign` | `ff-campaign-shopping-cart` |

Note that only one attribute at a time is allowed.

```html
<ff-campaign-pushed-products is-landing-page-campaign>
    <ff-record-list subscribe="false">
        <template data-role="record">
            <ff-record>...</ff-record>
        </template>
    </ff-record-list>
</ff-campaign-pushed-products>

<ff-campaign-landing-page page-id="home"></ff-campaign-landing-page>
```
