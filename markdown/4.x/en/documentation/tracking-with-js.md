## Tracking with JavaScript

Instead of using the built-in tracking, you are also able to use WebComponents' JavaScript API to send your tracking events.

> Important
>
> This documentation is NOT a comprehensive FactFinder Tracking Documentation.
> Please refer to the [official FactFinder Documentation](https://doku.fact-finder.de/endoc/latest/fact-finder-integration/tracking-interface-integration) to read more about the tracking itself.

The `Tracking` namespace contains the relevant tracking methods.
All contained methods take one object as a parameter.

You can access it like this:
```Javascript
const track = factfinder.communication.Tracking;
```


### Retrieving necessary information

Some information is provided by FactFinder Web Components and/or FactFinder.


#### sid

You can retrieve the current FactFinder Web Components **sid** by calling this helper function: 

```js
factfinder.common.localStorage.getItem("ff_sid");
```

> Notes
>
> You should always rely on this function for Safari private mode compatibility!


#### id 

The **id** parameter has to match the field value of the field configured as `trackingProductNumber ` [field role](/documentation/4.x/field-roles).


#### masterId

The **masterId** parameter has to match the field value of the field configured as `masterArticleNumber` [field role](/documentation/4.x/field-roles).


#### channel

The channel parameter is a property of the `<ff-communication>` element.
You can access it like this:

```javascript
const channel = document.querySelector("ff-communication").channel;
```
or using the global JS property `factfinder.communication.globalSearchParameter.channel`.

For more explanation please refer to the [FactFinder Tracking Documentation](https://doku.fact-finder.de/endoc/latest/fact-finder-integration/tracking-interface-integration).


### Tracking Examples

You can use the tracking object like this:

```javascript
//Example click tracking event
track.click({
    query: "backpack",
    channel: "bergfreunde-co-uk",
    page: 1,
    sid: "pMHk05ycO0A6SyrlCKqfcGX0lkj0zH",
    id: "381-0017-b_xs",
    pos: 1,
    origPos: 16,
    origPageSize: 12,
    pageSize: 24,
    simi: 96.9,
    masterId: "4985b3dfbe3912ae2d729070fd660",
    title: "Skylotec - 32.0 Bag - Backpack climbing harness combination"
});
```

```javascript
track.cart({
    channel: "bergfreunde-co-uk",
    sid: "VqneWatI3sYNaCMmeNqRPGxcUTQag2",
    id: "010-0242-0318",
    price: 95.95,
    masterId: "9478a3507589b60ff7a6234a901298ec",
    count: 5
});
```

```javascript
track.checkout({
    channel: "bergfreunde-co-uk",
    sid: "VqneWatI3sYNaCMmeNqRPGxcUTQag2",
    id: "010-0242-0318",
    price: 95.95,
    masterId: "9478a3507589b60ff7a6234a901298ec",
    count: 99
});
```

> Note
>
> During the checkout tracking each product has to be tracked separately.
> Passing an array of entries to the checkout tracking function is currently not supported.

### Retrieve product information via FactFinder Web Components

If you can't access the necessary field using your shop-system's API, you can query FactFinder for product information.

```javascript
const recordId = '105-1687-0512';
const track = factfinder.communication.Tracking;
const trackingHelper = factfinder.communication.Util.trackingHelper;

factfinder.communication.EventAggregator.addFFEvent({
    type: 'getRecords',
    recordId,
    idType: 'id',
    success: ([product]) => track.cart({
        id: trackingHelper.getTrackingProductId(product),
        masterId: trackingHelper.getMasterArticleNumber(product),
        price: trackingHelper.getPrice(product),
        count: 1,  // change as required
    })
});
```

> Hint
>
> We recommend the use of `trackingHelper` to access fields that are defined as [field roles](/documentation/4.x/field-roles).

You can, however, also access the fields of `record` directly.
If you do so, be aware that the **price fields** from your data feed may have been **localized** according to your [currency settings](/documentation/4.x/currency-guide).
Once they are localized **strings**, they cannot be used for tracking requests anymore because these requests require **numeric** price values.

Web Components preserves these unmodified price values in separate properties which are added to `record`.
For example, a price field named `Price` would be localized and its original numeric value would be stored in a new property `__ORIG_PRICE__`.

The names of the additional properties are generated from the original field name.
The original value of a field named `Old_Price` would be stored in `__ORIG_OLD_PRICE__`.

The following will likely result in an error because `Old_Price` may have been modified into a localized string:
```js
track.cart({
    price: product.record.Old_Price,
});
```

The original numeric value that can be used for tracking can be accessed directly like this:
```js
track.cart({
    price: product.record.__ORIG_OLD_PRICE__,
});
```
