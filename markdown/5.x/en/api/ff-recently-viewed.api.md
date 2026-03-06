## `ff-recently-viewed`
___
### Properties

_(`*` - required)_

| Name | Description |
| ---- | ----------- |
| **max-results**&nbsp;(Number) (default: `4`) | The maximum number of displayed items. |
| **wait-for-update**&nbsp;(Boolean) | Set this attribute when the element is on a **product detail page**. It makes the element wait for the page's `addEntry()` call to identify the currently viewed item and exclude it from display. |

### Methods
| Name | Description |
| ---- | ----------- |
| **getRecentlyViewed()** | Refreshes the recently viewed products. Necessary when you e.g. clear the history without reloading the page. |
