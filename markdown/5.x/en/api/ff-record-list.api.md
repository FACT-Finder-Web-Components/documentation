## `ff-record-list`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **subscribe**&nbsp;(String) **Options**:&nbsp;"true",&nbsp;"false" (default: "true") | If this is set to false the element no longer listens to events and therefore does not receive new data. This is useful if you want to dispatch your own data to the element. |
| **records**&nbsp;(Array) | An Array of Objects containing the record data returned by FactFinder. |
| **ssr** (Boolean) | Enables the SSR mode for the record list. |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** | This event is triggered when the element has received new data and the template for this element and all sub elements have been punched out. |

## `ff-record`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **recordData** (Object, JavaScript only) | The record object returned by FactFinder. |
| **add-cart-click** (Boolean) |  [Tracking Guide](/guides/tracking-guide) |
| **add-checkout-click** (Boolean) |  [Tracking Guide](/guides/tracking-guide) |

### Directives
| Name | Description |
| ---- | ----------- |
| **data-redirect** | Forwards to the product details page if a valid URL is provided. This attribute takes the URL of the product detail page and can be used in conjunction with data-binding e.g. `<div data-redirect="{{variantValues.0..YourProductUrlFieldname}}"></div>` |
| **data-redirect-target** | Indicates the target for the `[data-redirect]` attribute. Can take all values that [window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#target)'s `target` parameter accepts.|
| **data-track** | Triggers a tracking request if the annotated element is clicked. |
| **data-image** | Annotate a `<img>` tag with this attribute. Can be used in Conjunction with the {{data-binding}} e.g. `<img data-image="{{variantValues.0..YourImageUrlFieldname}}" />`|
| **data-anchor** | Annotate a `<a>` tag with this attribute. Can be used in Conjunction with the {{data-binding}} e.g. `<a data-anchor="www.myshop.de/{{variantValues.0..YourImageUrlFieldname}}" />`. This will resolve in a proper href attribute for that anchor. |
| **disable-overwrite** | Add this to the `ff-record` tag to disable the default blocking of the anchor-tag behavior when clicked. Use this only when you don't want to track these clicks. Otherwise use the `data-redirect` directive. This will enable tracking of the clicked anchor. |
