## Display the most searched words in a tag cloud
With the `ff-tag-cloud`, you can display the most searched words in your shop. The terms displayed in the Tag Cloud are provided by the Logfile Analysis which uses data provided by the Tracking API. Since this module is updated once per day by default, the terms appearing in the Tag Cloud will also be updated daily. Therefore, it is imperative that you integrate the Tracking API.

The maximum number of terms that can be returned may be configured by Omikron; by default it is 70. If fewer search terms exist, then a correspondingly lower number will be returned.

The Tag Cloud is usually displayed on the “not-found” page. You can combine the output from the Tag Cloud and Pushed Products from the Campaign Manager module to provide effective, useful information for visitors who end up on this page.

Basic usage:
```html
<ff-tag-cloud min-font-size="10" max-font-size="40" word-count="50" unit="px"></ff-tag-cloud>
```
**NOTE:**
Changing `word-count` when `disable-auto` is not set will trigger a tag cloud request to FACT-Finder followed by a DOM update. The default action on a click of a tag cloud child element will trigger a FACT-Finder search for that word. You can prevent this behavior by setting the `ffPreventDefault` on the `entry-clicked` event.
`word-count` is the only property which triggers request to FACT-Finder when its value is changed.

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