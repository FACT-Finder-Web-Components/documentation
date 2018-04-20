## `ff-record-list`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **subscribe**&nbsp;(String) **Options**:&nbsp;true,&nbsp;false (default: true) | If this is set to false the element no longer listens to events and therefore does not receive new data. This is useful if you want to dispatch your own data to the element. |
| **records**&nbsp;(Array)    | An Array of Objects containing the record data returned by FACT-Finder.|
| **is-recommendation** (Boolean)| Indicates if this record-list is placed inside a ff-recommendation element. This attribute is set automatically by the ff-recommendation element and used for tracking purposes.|
| **infinite-scrolling** (Boolean) | When present, the record list will load the next page when the bottom of the record list comes in view.|
| **infinite-debounce-delay** (Number) (default:32) | Sets the delay for when the next page should be loaded after the bottom is reached. This prevents loading multiple pages at once because it triggers to fast. The number is in milliseconds. |
| **infinite-scroll-margin** (Number) (default: 0) |  Sets the margin of the page loading trigger element. This value can be positive or negative and is in 'px'. Is only applied when infinite-scroll is `true` |
| **is-recommendation** (Boolean) | Indicates if this record-list is placed inside a ff-recommendation element. This attribute is set automatically by the ff-recommendation element and used for tracking purposes. |
| **stamp-always** (Boolean) | ff-record are always reused and in addition if the new record set doesn't differ by oldRecord.id === newRecord.id dom is not updated. Add this attribute to disable this behavior. Using this attribute on ff-record-list will ensure all stamped ff-record will have this attribute added |

###Methods
| Name | Description |
| ---- | ----------- |
| **loadNextPage()** | Load the next page. Automatically used if infinite-scrolling is active |

### Events
| Name | Description |
| ---- | ----------- |
| **dom-updated** |  This event is triggered when the element has received new data and the template for the element and all sub elements was punched out. |

## `ff-record`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **record-data** (Object) |  The record object returned by FACT-Finder. |
| **is-recommendation** (Boolean)| Indicates if this record-list is placed inside a ff-recommendation element. This attribute is set automatically by the ff-recommendation element and used for tracking purposes.|
| **add-cart-click** (Boolean)|  [Tracking Guide](/guides/tracking-guide) |
| **add-checkout-click** (Boolean)|  [Tracking Guide](/guides/tracking-guide) |
| **stamp-always** (Boolean) | ff-record are always reused and in addition if the new record set doesn't differ by oldRecord.id === newRecord.id dom is not updated. Add this attribute to disable this behavior. Using this attribute on ff-record-list will ensure all stamped ff-record will have this attribute added |

### Directives
| Name | Description |
| ---- | ----------- |
| **data-redirect** |  Forwards to the product details page if a valid url is provided. This attributes takes the URL of the product detail page and can be used in conjunction with the data-binding e.g. `<div data-redirect="{{record.YourProductUrlFieldname}}"></div>` |
| **data-redirect-target** | Indicates the target for the `[data-redirect]` attribute. Can take all [w3c compliant values](https://www.w3schools.com/TAGS/att_a_target.asp).|
| **data-track** | Triggers a tracking request if the annotated element is clicked. |
| **data-image** | Annotate a `<img>` tag with this attribute. Can be used in Conjunction with the {{data-binding}} e.g. `<img data-image="{{record.YourImageUrlFieldname}}" />`|
| **data-anchor** | Annotate a `<a>` tag with this attribute. Can be used in Conjunction with the {{data-binding}} e.g. `<a data-anchor="www.myshop.de/{{record.YourImageUrlFieldname}}" />`. This will resolve in a proper href attribute for that anchor. |
| **disable-overwrite** | Add this to the ff-record-tag to disable the default blocking of the anchor-tag behavior when clicked. Use this only when you don't want to track these clicks. Otherwise use the 'data-redirect' directive. This will enable tracking of the clicked anchor. |




