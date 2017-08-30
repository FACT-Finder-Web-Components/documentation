# Adding a Product Campaign
With the `ff-campaign-product` you can display product campaigns on the product detail page. Simply add the `ff-campaign-product` element to your product detail page and set the attribute product-id to the value of the FACT-Finder field which you configured with the role **Product number (campaign)**. Please check the Field summary menu in the FACT-Finder backend if you are unsure which field you should use. Usually you will set the attribute dynamically via JavaScript, every time the product viewed changes.

```html
<ff-campaign-product record-id="12345"></ff-campaign-product>
```

The element triggers the campaign but doesn't display anything. Depending on the configured campaign, you need to add a `ff-campaign-feedbacktext` with attribute `is-product-campaign` to display the feedback text and/or a `ff-campaign-pushed-products` with attribute `is-product-campaign` to display pushed products. For more information, see: [Campaign](http://web-components.fact-finder.de/documentation/ff-campaign) and [Pushed Products](http://web-components.fact-finder.de/documentation/ff-campaign-pushed-products).

# API Reference
## ff-product-campaign
### Properties
| Name | Description |
| ---- | ----------- |
|**record-id**&nbsp;(String) (default: empty)| If the **record-id** attribute is set, an ajax request is made to retrieve all shopping cart campaigns for the given product id/s.|
