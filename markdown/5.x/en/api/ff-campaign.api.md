## `ff-campaign-feedbacktext`
___

### Properties

| Name | Description |
| ---- | ----------- |
| **label**&nbsp;(String) (default: "") | Binds the element to a campaign label defined in the FactFinder UI. |
| **is-landing-page-campaign**&nbsp;(Boolean) | If this attribute is present, `ff-campaign-feedbacktext` only displays landing page campaigns retrieved by [ff-campaign-landing-page](/api/5.x/ff-campaign-landing-page). |
| **is-product-campaign**&nbsp;(Boolean) | If this attribute is present, `ff-campaign-feedbacktext` only displays product campaigns retrieved by [ff-campaign-product](/api/5.x/ff-campaign-product). |
| **is-shopping-cart-campaign**&nbsp;(Boolean) | If this attribute is present, `ff-campaign-feedbacktext` only displays shopping cart campaigns retrieved by [ff-campaign-shopping-cart](/api/5.x/ff-campaign-shopping-cart). |

### Events

| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |


## `ff-campaign-advisor`
___

### Properties

| Name | Description |
| ---- | ----------- |
| **name**&nbsp;(String) (default: "") | Comma-separated list of campaign names as defined in the FactFinder UI. Restricts the element to the specified campaigns. |
| **not**&nbsp;(String) (default: empty) | Takes a comma-separated list of campaign names (as defined in the FactFinder UI). This element won't trigger for the specified campaigns. |

### Events

| Name | Description |
| ---- | ----------- |
|**dom-updated**| This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |
