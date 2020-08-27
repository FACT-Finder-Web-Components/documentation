## General

#### Question:
Which version is the documentation referring to?
#### Answer:
Latest.

---

#### Question:
Can I contribute to the future development of WebComponents?

#### Answer:
Yes. Although the Web Components codebase is closed, you can still discuss and propose issues, changes and features at [GitHub issues](https://github.com/FACT-Finder-Web-Components/ff-web-components/issues).
We are grateful for any feedback, so do not hesitate to ask questions or express concerns whenever you find something worth sharing.

---

#### Question:
Can I see upcoming breaking changes and proposals?

#### Answer:
Yes, at [GitHub issues](https://github.com/FACT-Finder-Web-Components/ff-web-components/issues).
You should have no troubles in finding them as all issues are tagged accordingly.
Do not hesitate to propose your own ideas or functionalities you would like us to provide in the future.
Please note that with no voices against, breaking changes will be applied according to the specified version.

---

#### Question:
Which browsers do FACT-Finder WebComponents support?

#### Answer:
FACT-Finder WebComponents utilises the official [Web Components polyfill](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs#browser-support) which guarantees support for _Chrome_, _Firefox_, _Edge_, _Safari 9+_, _IE11+_, _Chrome Android_ and _Mobile Safari_.
We test against the latest version of each of these.

---

#### Question:
I want to use FACT-Finder Web Components with Angular, but data binding used in the components conflicts with Angular's `{{ }}` binding. Can you fix it?
#### Answer:
You can add Angular's `ngNonBindable` attribute to the parent element to prevent Angular from parsing double curly braces. If you have to keep both Angular and FACT-Finder WebComponents bindings within the same element, you can use: 
```html
<ff-record> 
    {{Angular Binding}}
    <ng-container ngNonBindable>
        {{FF Binding}}
    </ng-container>
</ff-record>
```
The `<ng-container>` tag will not be rendered in the DOM.

Alternatively, you can change the default FACT-Finder Web Components binding delimiters via `ff-communication`'s `mustache-delimiters` attribute. For more information please check the `Underlying Engine (Mustache)` section of the [Template Engine documentation](/documentation/4.x/template-engine). Please note that binding HTML still requires an additional pair of curly brackets, what will cause an Angular error. You can utilize `ngNonBindable` to handle this issue as well:
```html
<ng-container ngNonBindable>
    {{{FF HTML Binding}}}
</ng-container>
```
In this case, please use triple curly braces, no matter the custom delimiters you chose.

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
See [Adding a suggest container](/api/4.x/ff-suggest) in the `ff-suggest` documentation or the [Template Engine documentation](/documentation/4.x/template-engine).

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

`Access to XMLHttpRequest at 'https://my.fact-finder.de/FACT-Finder/Search.ff?query=*&channel=my_channel' has been
blocked by CORS policy: Response to preflight request doesn't pass access control check: Redirect is not allowed for a
preflight request.`

#### Solution:
In order to use our Web Components library, **please contact our [Service Desk (service-desk@fact-finder.de)][1] for activation**!

---

#### Error: 

`could not invoke subscriber function [undefined] for topic [records]. error: TypeError: Cannot read property 'insertAll' of undefined Line 2 Bundle.js`

#### Solution:
Add missing `defer` attribute on bundle.js like described [here](/documentation/4.x/include-scripts): `<script defer src="../dist/bundle.js"></script>`

[1]: mailto:service-desk@fact-finder.de?subject=Web%20Components%20Activation
