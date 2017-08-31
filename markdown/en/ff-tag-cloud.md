# Display the most searched words in a tag cloud
With the `ff-tag-cloud`, you can display the most searched words in your shop. The terms displayed in the Tag Cloud are provided by the Logfile Analysis which uses data provided by the Tracking API. Since this module is updated once per day by default, the terms appearing in the Tag Cloud will also be updated daily. Therefore, it is imperative that you integrate the Tracking API.

The maximum number of terms that can be returned may be configured by Omikron; by default it is 70. If fewer search terms exist, then a correspondingly lower number will be returned.

The Tag Cloud is usually displayed on the “not-found” page. You can combine the output from the Tag Cloud and Pushed Products from the Campaign Manager module to provide effective, useful information for visitors who end up on this page.

Basic usage:
```html
<ff-tag-cloud min-font-size="10" max-font-size="40" word-count="50" unit="px"></ff-tag-cloud>
```
**NOTE:**
Changes to any property of the element, except `disable-auto`, will trigger a tag cloud request to FACT-Finder followed by a dom update. The default action on a click of a tag cloud child element will trigger a FACT-Finder search for that word. You can prevent this behavior by setting the `ffPreventDefault` on the `entry-clicked` event.

**Example snippet: Prevent default click event and redirect to different page:**

```html
<ff-tag-cloud id="tc" min-font-size="10" max-font-size="40" word-count="60" unit="px"></ff-tag-cloud>

<script>
    document.querySelector('#tc').addEventListener('entry-clicked', function (e) {
        event.detail.element.ffPreventDefault=true;
        window.open("index.html?" + factfinder.common.getParameterString(event.detail.entry.params), "_blank");
    });
</script>
```

# API Reference
## ff-tag-cloud
### Properties
| Name | Description |
| ---- | ----------- |
|**min-font-size**&nbsp;(Number) (default: 10)| Specifies the font-size for the least searched word. |
|**max-font-size**&nbsp;(Number) (default: 20)| Specifies the font-size for the most searched word. |
|**unit**&nbsp;(String)(default: "px")| Specifies the unit of the font-size. |
|**gradient-color-start**&nbsp;(String) (default: "#294884")| Specifies the start color for the gradient of the searched words. |
|**gradient-color-end** &nbsp;(String) (default: "#20b6e8") | Specifies the end color for the gradient of the searched words. |
|**word-count**&nbsp;(Number) (default: 30)| Specifies the number of searched words to display. |
|**disable-auto**&nbsp;(Boolean) (default: false)| Specifies weather the tag cloud entries should be automatically fetched on `attached` or not. |

### Events
| Name | Description |
| ---- | ----------- |
|**entry-clicked**| Fired when a tag cloud entry is clicked and before the search for that entry is triggered. The event contains a reference to this element where you can set the property `ffPreventDefault` to skip its default action: Search for the clicked word. The event also contains an object with all the tag cloud entry information's: <br /> 1. query: The searched word <br /> 2. count: The number of searches for that word <br /> 3. params: The search parameters to execute a FACT-Finder search for that word. |                                           
|**before-search**| Fired directly before the search for the tag cloud entry is executed. |
|**dom-updated**| Fired every time the tag cloud element is re rendered. |

### Methods
| Name | Description |
| ---- | ----------- |
|**getTagCloud()**| Manually obtains the tag cloud entries from FACT-Finder. Useful when `disable-auto` is set to true and one want's to display the entries on a certain action. |

### Mixins
| Name | Description |
| ---- | ----------- |
|**--tag-cloud-container**| Mixin applied to the tag cloud wrapper container. <br /> Default: `display: flex;justify-content: space-around;flex-wrap: wrap;` |
|**--tag-cloud-link**| Mixin applied to the tag cloud link. <br /> Default: `padding: 2px;` |

## `ff-searchbutton`
### Properties
| Name | Description |
| ---- | ----------- |
|**align**&nbsp;(Boolean) **Options**: &nbsp;vertical, &nbsp;horizontal (default: vertical)| Die Ausrichtung des Search Buttons.|


