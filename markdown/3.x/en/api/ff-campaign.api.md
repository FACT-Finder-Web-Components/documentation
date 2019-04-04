## `ff-campaign-advisor`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **name**&nbsp;(String) (default: "") | Binds the element to a campaign name defined in the FACT-Finder backend. |
| **not**&nbsp;(String) (default: empty) | Takes a campaign name (as defined in FACT-Finder backend) as parameter. This element won't trigger for the passed campaign. |

### Events
| Name | Description |
| ---- | ----------- |
|**dom-updated**| This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |

## `ff-campaign-advisor-answer`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **answer**&nbsp;(Object) (default: empty) | Binds the element to a campaign name defined in the FACT-Finder backend. |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |

## `ff-campaign-advisor-question`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **question**&nbsp;(Object) (default: empty) | The required data from FACT-Finder. |

## `ff-campaign-feedbacktext`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **label**&nbsp;(String) (default: "") | Binds the element to a campaign label defined in the FACT-Finder backend. |
| **is-product-campaign**&nbsp;(Boolean) | If this attribute is present, regardless of its value, the `ff-campaign-feedbacktext` is only considered for product campaigns retrieved by [ff-campaign-product](/documentation/3.x/ff-campaign-product) |
| **is-shopping-cart-campaign**&nbsp;(Boolean) | If this attribute is present, regardless of its value, the `ff-campaign-feedbacktext` is only considered for shopping cart campaigns retrieved by [ff-campaign-shopping-cart](/documentation/3.x/ff-campaign-shopping-cart) |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |
