## Upgrade from version 3.x to 4.0.0

This article describes all breaking changes in the `4.0.0` release.
Each change is marked with the estimated chance you are actually affected by it, and the estimated effort required to adjust your implementation.

It is worth pointing out that **all but one change** have either a **low chance of affecting you** and/or require **very little effort** to adjust.

The change with the highest chance to have a noticeable impact is probably the removal of the **Single Hit Redirect** feature.
See below for details.


### Preparation for 4.x migration

Before you install `4.0.0`, make sure your application is using the latest `3.x` release.
Most deprecated features that will affect your implementation emit **deprecation warnings**.

Address those deprecation warnings with the help of this guide or by referring to the **4.0 Milestone** on GitHub:  
https://github.com/FACT-Finder-Web-Components/ff-web-components/milestone/1

Once your implementation emits no more deprecation warnings, upgrade to `4.0.0`.
Only the changes that do not emit deprecation warnings are left to address **IF** they affect you at all.


### Overview of changes and estimated severity

| Breaking change | Chance of being affected | Required effort to fix | Deprecated since | Emits deprecation message |
| --------------- | ------------------------ | ---------------------- | --- | --- |
| Require `version` attribute | Close to zero | Close to zero | N/A | No |
| Require `api` attribute | Medium | Close to zero | N/A | No |
| Renaming of `ff-searchbox` attribute `hidesuggest-onblur` | Low | Very Low | `3.12.1` | Yes |
| Removal of attribute `stamp-always` from `ff-record-list` and `ff-record` | Low | Very low | `3.14.1` | Yes |
| Localisation of response to `getRecords` event type | Low | Very low | N/A | No |
| Renaming of `FFCommunicationEventAggregator` | High | Very low | `3.10.0` | Yes |
| Removal of `search` event from `ff-slider` | Low | Low | `3.15.3` | No |
| Make `ff-asn-group[for-group]` target `associatedFieldName` | Very high | Low | N/A | No |
| Introduction of `is-landing-page-campaign` attribute | Medium | Very Low | N/A | No |
| Removal of `records` property from `ff-checkout-tracking` | Very low | High | `3.15.0` | Yes |
| Removal of `clone()` from `ff-breadcrumb-trail-item` | Close to zero | N/A | ` 3.2.0` | Yes |
| Removal of `clone()` from `ff-single-word-search-record` | Close to zero | N/A | ` 3.15.0` | Yes |
| Removal of Single Hit Redirect | Medium | High | `3.14.1` | Yes |


### Detailed description of changes

#### Require `version` attribute

> Note
>
> This change only affects you if you do not already specify the `version` attribute.

| Chance of being affected | Required effort to fix | Deprecated since |
| ------------------------ | ---------------------- | ---------------- |
| Close to zero            | Close to zero          | N/A              |

Original issue:  
https://github.com/FACT-Finder-Web-Components/ff-web-components/issues/49

WebComponents requires configuring the targeted FactFinder version.
This is usually done through the `ff-communication` element:
```html
<ff-communication version="7.3">
```

The default value of `7.2` has become outdated and very uncommon.
It seems no longer reasonable to define a default version at all as it becomes outdated fairly frequently.

From `4.0.0` there will be no default value anymore and `version` must be specified explicitly.
WebComponents will throw an error if it fails to detect a version.

##### HTML

Before:
```html
<ff-communication></ff-communication>
```

Now:
```html
<ff-communication version="7.2"></ff-communication>
```

---

#### Require `api` attribute

> Note
>
> This change only affects you if you do not already specify the `api` attribute.

| Chance of being affected | Required effort to fix | Deprecated since |
| ------------------------ | ---------------------- | ---------------- |
| Medium                   | Close to zero          | N/A              |

Original issue:  
https://github.com/FACT-Finder-Web-Components/ff-web-components/issues/50

WebComponents requires configuring the targeted FactFinder version.
If the version is set to `ng`, the `api` attribute becomes relevant because FactFinder NG updates its API from time to time.

This is usually done through the `ff-communication` element:
```html
<ff-communication version="ng" api="v3">`
```

It seems no longer reasonable to define a default API at all as it becomes outdated fairly frequently.

From `4.0.0` there will be no default value anymore and `api` must be specified explicitly when `version="ng"`.
WebComponents will throw an error if it fails to detect a value.

##### HTML

Before:
```html
<ff-communication version="ng"></ff-communication>
```

Now:
```html
<ff-communication version="ng" api="v4"></ff-communication>
```

---

#### Renaming of `ff-searchbox` attribute `hidesuggest-onblur`

| Chance of being affected | Required effort to fix | Deprecated since |
| ------------------------ | ---------------------- | ---------------- |
| Low                      | Very Low               | `3.12.1`         |

Original issue:  
https://github.com/FACT-Finder-Web-Components/ff-web-components/issues/37

Hyphenation/capitalisation of attribute `hidesuggest-onblur` and its corresponding JavaScript property are incorrect.
New spellings were introduced together with the deprecation of the old spellings in `3.12.1`.

From `4.0.0` the old spelling will no longer be available.
If you are already using the new spellings, this breaking change will not affect you.

##### HTML

Before:
```html
<ff-searchbox hidesuggest-onblur="false"></ff-searchbox>
```

Now:
```html
<ff-searchbox hide-suggest-onblur="false"></ff-searchbox>
```

##### JavaScript

Before:
```js
document.querySelector("ff-searchbox").hidesuggestOnblur = false;
```

Now:
```js
document.querySelector("ff-searchbox").hideSuggestOnblur = false;
```

---

#### Removal of attribute `stamp-always` from `ff-record-list` and `ff-record`

| Chance of being affected | Required effort to fix | Deprecated since |
| ------------------------ | ---------------------- | ---------------- |
| Low                      | Very low               | `3.14.1`         |

Original issue:  
https://github.com/FACT-Finder-Web-Components/ff-web-components/issues/38

Attribute `stamp-always` on elements `ff-record-list` and `ff-record` is no longer required.  
https://web-components.fact-finder.de/api/3.x/ff-record-list#tab=api

This attribute has no effect anymore.
It was made redundant by a more sophisticated algorithm to detect changes in record data.
Therefore, it requires no replacement.

> Note
>
> As `stamp-always` already has no effect anymore, its removal is technically **not a breaking change**, but it may render implementations that build around it redundant.

Unless you have custom logic or styling attached to `stamp-always`, you can safely remove it.

##### HTML

Before:
```html
<ff-record-list stamp-always>
    <ff-record stamp-always></ff-record>
</ff-record-list>
```

After:
```html
<ff-record-list>
    <ff-record></ff-record>
</ff-record-list>
```

---

#### Localisation of response to `getRecords` event type

| Chance of being affected | Required effort to fix | Deprecated since |
| ------------------------ | ---------------------- | ---------------- |
| Low                      | Very low               | N/A              |

Original issue:  
https://github.com/FACT-Finder-Web-Components/ff-web-components/issues/52

The response to the `getRecords` event type wasn't localised like other result types.
The _price_ field was left unchanged even though [currency settings](https://web-components.fact-finder.de/documentation/3.x/currency-guide) were provided.
This had the potential to cause problems when implementing product detail pages with this event type.

Fields that are specified as price fields will be localised from now on.
The unmodified value will be supplied as a new property named `__ORIG_PRICE__`.

> Note
>
> The name `__ORIG_PRICE__` is generated from the original field's name.
> If the original field was called `OldPrice`, the field with the unmodified value would be called `__ORIG_OLDPRICE__`.

This may affect some implementations.
Most likely [Tracking implementations with JS](https://web-components.fact-finder.de/documentation/3.x/tracking-with-js) that aren't utilising the `getPrice` tracking helper.

##### JavaScript

Before:
```js
factfinder.communication.EventAggregator.addFFEvent({
    type: 'getRecords',
    recordId: id,
    success: ([product]) => factfinder.communication.Tracking.cart({
        id,
        price: product.record.Price,  // previously unlocalised Price field
        count: 1,
    })
});
```

Now:
```js
factfinder.communication.EventAggregator.addFFEvent({
    type: 'getRecords',
    recordId: id,
    success: ([product]) => factfinder.communication.Tracking.cart({
        id,
        price: product.record.__ORIG_PRICE__,  // new unlocalised Price field (direct field access)
        count: 1,
    })
});
```

---

#### Renaming of `FFCommunicationEventAggregator`

| Chance of being affected | Required effort to fix | Deprecated since |
| ------------------------ | ---------------------- | ---------------- |
| High                     | Very low               | `3.10.0`         |

Original issue:  
https://github.com/FACT-Finder-Web-Components/ff-web-components/issues/36

`FFCommunicationEventAggregator` is unnecessarily long and unwieldy.
For example `factfinder.communication.FFCommunicationEventAggregator`.

The new shortened version (`EventAggregator`) has been available since `3.10.0`.

From `4.0.0`, the long version `FFCommunicationEventAggregator` will no longer be available.
If you are not using JavaScript for your WebComponents implementation, or you are already using the new spelling, this change will not affect you.

##### JavaScript

Before:
```js
factfinder.communication.FFCommunicationEventAggregator.addFFEvent(event);
```

Now:
```js
factfinder.communication.EventAggregator.addFFEvent(event);
```

---

#### Removal of `search` event from `ff-slider`

| Chance of being affected | Required effort to fix | Deprecated since |
| ------------------------ | ---------------------- | ---------------- |
| Low                      | Low                    | `3.15.3`         |

Original issue:  
https://github.com/FACT-Finder-Web-Components/ff-web-components/issues/41

`ff-slider` emitted an event of type `search` on input.
This was inconsistent with other ASN group elements which emit `filter` events.

Since `3.15.3`, `ff-slider` additionally emits the `filter` event.

From `4.0.0`, `ff-slider` will no longer emit the `search` event.
If you are not using event listeners related to slider or if you are already listening to `filter`, this change will not affect you.

##### JavaScript

Before:
```js
factfinder.communication.EventAggregator.addBeforeDispatchingCallback(event => {
    if (event.type === "filter") {
        // event is emitted by an ASN filter request but not by a slider request
    }
    if (event.type === "search") {
        // detect whether event's origin is slider
    }
});
```

Now:
```js
factfinder.communication.EventAggregator.addBeforeDispatchingCallback(event => {
    if (event.type === "filter") {
        // event is emitted by all ASN filter requests including slider
    }
});
```

---

#### Make `ff-asn-group[for-group]` target `associatedFieldName`

| Chance of being affected | Required effort to fix | Deprecated since |
| ------------------------ | ---------------------- | ---------------- |
| Very high                | Low                    | N/A              |

Original issue:  
https://github.com/FACT-Finder-Web-Components/ff-web-components/issues/35

Previously, the specified value had to match the group's display name.
This was problematic in multi-language environments (often realised through multiple FactFinder channels) because display names likely differ across channels.
For each language and ASN group you had to configure a separate template.
Typically, the only difference however would have been the `for-group` value.

The `associatedFieldName` is consistent across channels.
Therefore, from `4.0.0`, `ff-asn-group`'s `for-group` attribute references the connected filter group's `associatedFieldName`.
Multiple definitions of a template are no longer necessary.

Inspect your FactFinder configuration to find out what the relevant `associatedFieldName` is for each filter group.

##### HTML

Before (actual values depend on your data):
```html
<ff-asn>
    <ff-asn-group for-group="Hersteller"></ff-asn-group>
</ff-asn>
```

Now:
```html
<ff-asn>
    <ff-asn-group for-group="Manufacturer"></ff-asn-group>
</ff-asn>
```

---

#### Introduction of `is-landing-page-campaign` attribute

| Chance of being affected | Required effort to fix | Deprecated since |
| ------------------------ | ---------------------- | ---------------- |
| Medium                   | Very Low               | N/A              |

Elements `ff-campaign-pushed-products` and `ff-campaign-feedbacktext` received a new attribute `is-landing-page-campaign`.
The elements used to receive landing page campaign data without this attribute.
It is now required.

##### HTML

Before:
```html
<ff-campaign-feedbacktext label="...">{{{text}}</ff-campaign-feedbacktext>
<ff-campaign-pushed-products>
    <ff-record-list>...</ff-record-list>
</ff-campaign-pushed-products>

<ff-campaign-landing-page page-id="home"></ff-campaign-landing-page>
```

Now:
```html
<ff-campaign-feedbacktext label="..." is-landing-page-campaign>{{{text}}</ff-campaign-feedbacktext>
<ff-campaign-pushed-products is-landing-page-campaign>
    <ff-record-list>...</ff-record-list>
</ff-campaign-pushed-products>

<ff-campaign-landing-page page-id="home"></ff-campaign-landing-page>
```

---

#### Removal of `records` property from `ff-checkout-tracking`

| Chance of being affected | Required effort to fix | Deprecated since |
| ------------------------ | ---------------------- | ---------------- |
| Very low                 | High                   | `3.15.0`         |

Original issue:  
https://github.com/FACT-Finder-Web-Components/ff-web-components/issues/39


The `records` property is redundant because it requires JavaScript to be used.
If you need to manually do checkout tracking, please refer to [Tracking with JavaScript](/documentation/4.x/tracking-with-js).

The purpose of the `ff-checkout-tracking` element is to facilitate tracking without the use of JavaScript.
The `records` property contradicts this purpose and from `4.0.0` it is no longer available.

Because of its conflicting nature, it is very unlikely that your WebComponents implementation makes use of.
Hence, you are most certainly not affected by this change.

If, however, your implementation builds around the `records` property, reimplementation may require a potentially large amount of consideration.
Of course, this highly depends on your actual implementation and is difficult to estimate.

##### JavaScript

```js
// 'records' property no longer available.
document.querySelector("ff-checkout-tracking").records
```

---

#### Removal of `clone()` from `ff-breadcrumb-trail-item`

| Chance of being affected | Required effort to fix | Deprecated since |
| ------------------------ | ---------------------- | ---------------- |
| Close to zero            | N/A                    | ` 3.2.0`         |

Original issue:  
https://github.com/FACT-Finder-Web-Components/ff-web-components/issues/44

`clone()` is no longer required and from `4.0.0` it is no longer available.

##### JavaScript

```js
// 'clone' method no longer available.
document.querySelector("ff-breadcrumb-trail-item").clone()
```

---

#### Removal of `clone()` from `ff-single-word-search-record`

| Chance of being affected | Required effort to fix | Deprecated since |
| ------------------------ | ---------------------- | ---------------- |
| Close to zero            | N/A                    | ` 3.15.0`        |

Original issue:  
https://github.com/FACT-Finder-Web-Components/ff-web-components/issues/47

`clone()` is no longer required and from `4.0.0` it is no longer available.

##### JavaScript

```js
// 'clone' method no longer available.
document.querySelector("ff-single-word-search-record").clone()
```

---

#### Removal of Single Hit Redirect

| Chance of being affected | Required effort to fix | Deprecated since |
| ------------------------ | ---------------------- | ---------------- |
| Medium                   | High                   | `3.14.1`         |

Original issue:  
https://github.com/FACT-Finder-Web-Components/ff-web-components/issues/40

Single Hit Redirect has been having problems with distinguishing between cases where it should and where it should not redirect.
This usually resulted in either repeatedly redirecting after pressing the browser's back button or not redirecting at all.

This feature is too specific to individual requirements in order to offer a generic solution.
See details in the [3.x documentation](/api/3.x/ff-communication#tab=docs).

A [guide](/documentation/3.x/single-hit-redirect) and a [demo](https://github.com/FACT-Finder-Web-Components/demos/tree/release/3.x/single-hit-redirect) of a possible manual implementation are available.

From `4.0.0`, Single Hit Redirect is no longer available.

The following attributes of `ff-communication` are redundant and can safely be removed.
```html
<ff-communication
    disable-single-hit-redirect
    single-hit-redirect-base-path
></ff-communication>
```

Simultaneously, the above attributes' JavaScript counterparts are no longer available either.
```js
// Both properties no longer available.
document.querySelector("ff-communication").disableSingleHitRedirect
document.querySelector("ff-communication").singleHitRedirectBasePath
```
