## Tracking with JavaScript

Instead of using the built-in tracking you are also able to use our
JavaScript-API to send your tracking events.

___
**IMPORTANT**

**This documentation is NOT a comprehensive [FACT-Finder Tracking Documentation](https://doku.fact-finder.de/endoc/latest/fact-finder-integration/tracking-interface-integration). Please refer to the official FACT-Finder documentation to read more about the tracking itself.**
___ 

 

The [`Tracking12`](https://github.com/FACT-Finder-Web-Components/ff-web-components/blob/master/dist/ff-core.d.ts#L747) class contains the relevant tracking 
methods all of which take one object as a parameter.

You can create instances like:
```Javascript
const track = new factfinder.communication.Tracking12();
```

 

**INFO**

For more technical information about this class or to get code completion support in many IDEs take a look
at our [ff-core.d.ts](https://github.com/FACT-Finder-Web-Components/ff-web-components/blob/master/dist/ff-core.d.ts) at [Github](https://github.com/FACT-Finder-Web-Components).

### Retrieving necessary information
Some information is provided by Web Components and/or FACT-Finder.


#### sid
You can retrieve the current FACT-Finder Web Components **sid** by calling this helper function: 

`factfinder.common.localStorage.getItem("ff_sid");`

**NOTE** You should always rely on this function for Safari private mode compatibility!


#### id 
The **id** parameter has to match the field value of the field configured as `trackingProductNumber ` [field role](https://web-components.fact-finder.de/documentation/field-roles).


#### masterId
The **masterId** parameter has to match the field value of the field configured as `masterArticleNumber` [field role](https://web-components.fact-finder.de/documentation/field-roles).


#### channel
The channel parameter is a property of the `<ff-communication>` element.
You can access it like this:
```javascript
const channel = document.querySelector("ff-communication").channel;
```
or using the global JS property `factfinder.communication.globalSearchParameter.channel`.

For more explanation please refer to the [FACT-Finder Tracking Documentation](https://doku.fact-finder.de/endoc/latest/fact-finder-integration/tracking-interface-integration).


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
    title: "Skylotec - 32.0 Bag - Backpack climbing harness combination",
    event: "click"
});
```

```javascript
track.cart({
    channel: "bergfreunde-co-uk",
    sid: "VqneWatI3sYNaCMmeNqRPGxcUTQag2",
    id: "010-0242-0318",
    price: 95.95,
    masterId: "9478a3507589b60ff7a6234a901298ec",
    count: 5,
    event: "cart"
});

track.checkout({
    channel: "bergfreunde-co-uk",
    sid: "VqneWatI3sYNaCMmeNqRPGxcUTQag2",
    id: "010-0242-0318",
    price: 95.95,
    masterId: "9478a3507589b60ff7a6234a901298ec",
    count: 99,
    event: "cart"
});
```

### Retrieve product information via Web Components
If you can't access the necessary field using your shop-system's API,
you can query FACT-Finder for product information.

```html
<script>
        var Polymer = Polymer || {};
        Polymer.dom = 'shady';
        
        document.addEventListener("WebComponentsReady", function () {
            var trackingHelper = factfinder.communication.Util.trackingHelper;
            var track = new factfinder.communication.Tracking12();

            factfinder.communication.ResultDispatcher.subscribe("productDetail", function (product) {
                if (product) {
                    // Retrieve field values based on field roles
                    var masterId = trackingHelper.getMasterArticleNumber(product);
                    var id = trackingHelper.getTrackingProductId(product);
                    var channel = factfinder.communication.globalSearchParameter.channel;
                    var sid = factfinder.common.localStorage.getItem("ff_sid");
                    
                    //track some information e.g. a checkout
                    track.checkout({
                        channel: channel
                        sid: sid,
                        id: id,
                        price: 95.95,
                        masterId: masterId,
                        count: 99
                    });
                    
                } else {
                    console.log("not found");
                }
            });

            factfinder.communication.FFCommunicationEventAggregator.addFFEvent({
                                                                                   type: "productDetail",
                                                                                   id: "a333c0c6f62671727535b2542e168"
                                                                               });
        })
    </script>
    <script src="my-field-roles.js"></script>
    <script src="../bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    <link rel="import" href="../bower_components/ff-web-components/dist/elements.build_with_dependencies.html">
```