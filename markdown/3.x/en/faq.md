## General

#### Question:
I want to use FACT-Finder Web Components with Angular, but data binding used in the components conflicts with Angular's `{{ }}` binding. Can you fix it?
#### Answer:
Default binding delimiters can be changed via `ff-communication`'s `mustache-delimiters` attribute. For more information please check the `Underlying Engine (Mustache)` section of the [Template Engine documentation](/documentation/3.x/template-engine).

---
#### Question:
SEO Crawlers are indexing https://shop.com/{{data.binding}} URLs which results in a 404.
#### Answer:
Please use our `data-*` attributes for images and redirecting.

**For anchors use:**
```html
<ff-record-list>
    <ff-record>
        <div>
            <a data-redirect="{{record.Deeplink}}"
               data-redirect-target="_blank"
               data-anchor="https://www.myshop.de{{record.Deeplink}}">
                Shop
            </a>
```

**Note**

For successful tracking it is necessary to use the `data-redirect` attribute. If you don't use the `data-redirect` attribute, the browser may redirect before the tracking request succeeds.

**For images use:**
```html
<img data-image="{{record.ImageName}}">
```
---

#### Question:
"Show more" in `ff-asn-group` is always shown even if there are no more elements to show.  

#### Answer:
`<div data-container="showMore">` is probably located inside the `<div data-container="detailedLinks">` container. 
Currently, we have a HTML structure limitation which forces us to place the `<div data-container="showMore">` container outside.

**Correct**
```html
    <div data-container="detailedLinks">
        <div data-content="detailedLinks">
            <!-- always visible items will be added here -->
        </div>
    </div>
    <div data-container="showMore">
        <!-- The "showMore" container will only be rendered if there are "hiddenLinks" in the FACT-Finder response.
             It disappears after being clicked and reappears after "showLess" was clicked. -->
        <span class="text">Show More</span>
    </div>
```
---
#### Question:
Hit highlighting in `ff-suggest` or `ff-asn-group` displays as raw HTML.
How do I make it render correctly?
#### Answer:
The most common reason for this behaviour is that double curly braces `{{ }}` are used in the custom template.
This causes text to be rendered as-is.
To make the highlighting markup be interpreted as HTML use triple curly braces `{{{ }}}`.  
See [Adding a suggest container](/api/3.x/ff-suggest) in the `ff-suggest` documentation or the [Template Engine documentation](/documentation/3.x/template-engine).

---

#### Question:
Our polyfills seem to be clashing with the WebComponents polyfills.
#### Answer:
One option is to use a polyfill that is compatible with the WebComponents polyfill.

 A polyfill clash may not always be obvious at first.
 Errors that could hint at such a clash may involve `Symbol.iterator` or `Promise`.
 For detailed information on which features the WebComponents polyfill implements, refer to the official [GitHub repository](https://github.com/webcomponents/polyfills).  
If this doesn't seem to solve the issue, please contact us for a custom solution.

---

## Errors

#### Error: 

`could not invoke subscriber function [undefined] for topic [records]. error: TypeError: Cannot read property 'insertAll' of undefined Line 2 Bundle.js`

#### Solution:
Add missing `defer` attribute on bundle.js like described [here](/documentation/3.x/include-scripts): `<script defer src="../dist/bundle.js"></script>`
