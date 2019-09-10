You can subscribe to the ResultDispatcher for raw data or to change the
result before it is dispatched. This is indeed what all
data related FACT-Finder Web Components do. They subscribe to
ResultDispatcher to get notified when new data is available.

The ResultDispatcher is in the module:
`factfinder.communication.ResultDispatcher`

If you want to trigger your own communication events checkout the
documentation for
[`FFCommunicationEventAggregator`](/api/1.x/core-event-aggregator#tab=docs).

## API
Here are all functions you can use with the **ResultDispatcher** 

### `subscribe(topic, fn, ctx)`
___
The function supplied in `fn` is invoked with data for the subscribed
`topic` when new data is available. The parameter `ctx` is optional

#### All available topics
* `result`
* `campaigns` - special
* `records`
* `query`
* `suggest`
* `bct`
* `sort`
* `navigation`
* `ppp`
* `paging`
* `pagingItems`
* `asn`
* `singleWordSearch`
* `productDetail`
* `similarProducts`
* `productCampaign` - special

These **topics** are dispatched in the current execution order.
For example the `campaigns` are dispatched before the `asn`, but it is
**not** recommended to rely on this order.

```html
<script>
    // listen for ffReady before HTML import is loaded or you'll miss the event
    document.addEventListener("ffReady", function () {
        factfinder.communication.ResultDispatcher.subscribe("result", function (resultData, event) {
            // process the result and or the event
        });
    });
</script>
<link rel="import" href="pathToHtmlImport/elements.build.with_dependencies.html">
```    

### `unsubscribe(topic, key)`
___
Unsubscribe during runtime from a specific topic
```html
<script>
    //listen for ffReady before HTML import is loaded or you'll miss the event
    document.addEventListener("ffReady", function () {
        var key = factfinder.communication.ResultDispatcher.subscribe("result", function (resultData, event) {
            // process the result and or the event
        });

        factfinder.communication.ResultDispatcher.unsubscribe("result", key);
    });
</script>
<link rel="import" href="pathToHtmlImport/elements.build.with_dependencies.html">
```

### `addCallback(topic, fn, context)`
___
This is similar to `subscribe()` but it is guaranteed to be executed
**before** `subscribe()`.
```html
<script>
    // listen for ffReady before HTML import is loaded or you'll miss the event
    document.addEventListener("ffReady", function () {
        var key = factfinder.communication.ResultDispatcher.addCallback("asn", function (asnData) {
            // poke around in the asn data
        });
    });
</script>
<link rel="import" href="pathToHtmlImport/elements.build.with_dependencies.html">
```

### `removeCallback(topic, key)`
___
Remove a callback for a topic (ex:`asn`) with the **key** from the
registered callback.
```html
<script>
    // listen for ffReady before HTML import is loaded or you'll miss the event
    document.addEventListener("ffReady", function () {
        var key = factfinder.communication.ResultDispatcher.addCallback("asn", function (asnData) {
            // poke around with asn data
        });

        factfinder.communication.ResultDispatcher.removeCallback("asn", key);
    });
</script>
<link rel="import" href="pathToHtmlImport/elements.build.with_dependencies.html">
```
