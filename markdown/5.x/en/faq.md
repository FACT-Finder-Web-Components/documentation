## General

This page lists common questions and problems and their solutions.

---

#### Question:

Which version is the documentation referring to?

#### Answer:

Latest.
Always make sure you are using the latest version before opening inquiries.

---

#### Question:

Can I contribute to the future development of FactFinder Web Components?

#### Answer:

You can discuss and propose issues, changes, and features at [GitHub issues](https://github.com/FACT-Finder-Web-Components/ff-web-components/issues).
We are grateful for any feedback, so do not hesitate to ask questions or express concerns whenever you find something worth sharing.

---

#### Question:

Which browsers do FactFinder Web Components support?

#### Answer:

FactFinder Web Components utilizes the Web Components Web API.
Although some browsers may not support this standard in full, FactFinder Web Components only requires a basic set of functionalities of the standard which is supported by basically all browsers.

If you, however, notice compatibility issues, you have the option to use the official [Web Components polyfill](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs#browser-support) which is provided with the FactFinder Web Components bundle.
It guarantees support for _Chrome_, _Firefox_, _Edge_, _Safari 9+_, _Chrome Android_ and _Mobile Safari_.

See [Setup with polyfill](/documentation/5.x/include-scripts) for instruction on how to integrate with the polyfill.

---

#### Question:

How can I find out which data is available in a Web Component's HTML template?

#### Answer:

Each FactFinder Web Component has a property that holds the data it is displaying.
You can access its contents from the browser console.

Some examples:

```js
document.querySelector("ff-record-list").records
document.querySelector("ff-record").recordData
document.querySelector("ff-asn-group").group
document.querySelector("ff-breadcrumb-trail-item").breadCrumbIrailItem
```

Note that most browsers support the shortcut selector `$0` which references the element that is currently selected in the browser's dev tools' _Elements_ tab.
E.g.:

```js
$0.pagingItem
```

See the _API_ tab of each element's page for available properties.

---

#### Question:

How frequently do you release breaking changes?

#### Answer:

No more than once every six months.

Find the release date of the last `x.0.0` release and add six months to determine when a breaking release becomes possible.

Breaking changes are released as the need arises.
Typically, this is much less frequent than six months.
Emergency fixes that introduce breaking changes may be exempted.

---

#### Problem:

I want to use FactFinder Web Components with another front end framework, but data bindings (`{{ }}`) in templates collide.

#### Answer:

Typically, front end frameworks provide options to skip resolving particular data bindings.
In Angular, for example, there should be the `ngNonBindable` attribute to prevent Angular from parsing double curly braces.
Consult your framework's documentation for relevant information.

Alternatively, you can change the default data binding symbols that FactFinder Web Components uses.
See the [Template Engine documentation](/documentation/5.x/template-engine) article for details.

---

#### Question:

How to avoid crawlers indexing unresolved URLs `<a href="https://shop.com/{{data.binding}}">` which results in a 404?

#### Answer:

Please use our `data-*` attributes for images and redirecting.

**For anchors use:**
```html
<ff-record-list>
    <template data-role="record">
        <ff-record>
            <div>
                <a data-redirect="{{record.variantValues.0.Deeplink}}"
                   data-redirect-target="_blank"
                   data-anchor="https://www.myshop.de{{record.variantValues.0.Deeplink}}">
                    Shop
                </a>
```

**Note**

For successful tracking it is necessary to use the `data-redirect` attribute.
If you don't use the `data-redirect` attribute, the browser may redirect before the tracking request succeeds.

**For images use:**
```html
<img data-image="{{record.variantValues.0.ImageName}}">
```

---

#### Problem:

"Show more" in `ff-asn-group` is always shown even if there are no more elements to show.

#### Answer:

`<div data-container="showMore">` is probably located inside the `<div data-container="detailedLinks">` container.
Currently, we have an HTML structure limitation which forces us to place the `<div data-container="showMore">` container outside.

**Correct**
```html
<div data-container="detailedLinks">
    <div data-content="detailedLinks">
        <!-- always visible items will be added here -->
    </div>
</div>
<div data-container="showMore">
    <!-- The "showMore" container will only be rendered if there are "hiddenLinks" in the FactFinder response.
         It disappears after being clicked and reappears after "showLess" was clicked. -->
    <span class="text">Show More</span>
</div>
```

---

#### Question:

Hit highlighting in `ff-suggest` or `ff-asn-group` displays as raw HTML.
How do I make it render correctly?

#### Answer:

The most common reason for this behavior is that double curly braces `{{ }}` are used in the custom template.
This causes text to be rendered as-is.
To make the highlighting markup be interpreted as HTML use triple curly braces `{{{ }}}`.

See [Hit highlighting](/api/5.x/ff-suggest) in the `ff-suggest` documentation or the [Template Engine documentation](/documentation/5.x/template-engine).
