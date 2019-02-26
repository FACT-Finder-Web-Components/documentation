## Overview

Starting with FACT-Finder version 7.3 and FACT-Finder Web Components version 1.2.16 _feedback text campaigns_ can be configured as _teaser_. For enabling this behavior in FACT-Finder Web Components you only have to include the `ff-product-teaser-campaign-processor` middleware into your `ff-communication` element as follows:

```html
<ff-communication>
    <ff-middleware>
        <ff-product-teaser-campaign-processor></ff-product-teaser-campaign-processor>
    </ff-middleware>
</ff-communication>
```

This will insert all _teaser feedback text campaigns_ into `searchResult.records` at the configured positions. Hence a rendered `ff-record-list` will contain for each _teaser feedback text campaign_ a `ff-record` element with an attribute `is-teaser` and as inner HTML the in FACT-Finder deposited text.