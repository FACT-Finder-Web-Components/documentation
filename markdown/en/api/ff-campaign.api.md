## `ff-campaign-advisor`
___
### Properties
| Name | Description |
| ---- | ----------- |
|**name**&nbsp;(String) (default: empty)| Binds the element to a campaign name defined in the FACT-Finder backend. |
|**not**&nbsp;(String) (default: empty) | Determines, that the element is not triggered for the named campaign (campaign name from the FACT-Finder backend). |

### Events
| Name | Description |
| ---- | ----------- |
|**dom-updated**| This event is triggered when the element has received new data and the template for the element and all sub elements was punched out. |

## `ff-campaign-advisor-answer`
___
### Properties
| Name | Description |
| ---- | ----------- |
|**answer**&nbsp;(Object) (default: empty)| Binds the element to a campaign name defined in the FACT-Finder backend. |

### Events
| Name | Description |
| ---- | ----------- |
|**dom-updated**| This event is triggered when the element has received new data and the template for the element and all sub elements was punched out. |

## `ff-campaign-advisor-question`
___
### Properties
| Name | Description |
| ---- | ----------- |
|**question**&nbsp;(Object) (default: empty)| The required data from FACT-Finder. |

## `ff-campaign-feedbacktext`
___
### Properties
| Name | Description |
| ---- | ----------- |
|**label**&nbsp;(String) (default: empty)| Binds the element to a campaign label defined in the FACT-Finder backend. |
|**is-product-campaign**&nbsp;(Boolean) | If this attribute is present, regardless of its value, the `ff-campaign-feedbacktext` is only considered for product campaigns retrieved by [ff-campaign-product](http://web-components.fact-finder.de/documentation/ff-campaign-product) |
|**is-shopping-cart-campaign**&nbsp;(Boolean) | If this attribute is present, regardless of its value, the `ff-campaign-feedbacktext` is only considered for shopping cart campaigns retrieved by [ff-campaign-shopping-cart](http://web-components.fact-finder.de/documentation/ff-campaign-shopping-cart) |

### Events
| Name | Description |
| ---- | ----------- |
|**dom-updated**| This event is triggered when the element has received new data and the template for the element and all sub elements was punched out. |