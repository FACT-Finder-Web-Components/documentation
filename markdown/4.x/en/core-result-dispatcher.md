You can subscribe to the ResultDispatcher for raw data or to change the
result before it is dispatched. This is indeed what all
data related FACT-Finder Web Components do. They subscribe to
ResultDispatcher to get notified when new data is available.

The ResultDispatcher is in the module:
`factfinder.communication.ResultDispatcher`

If you want to trigger your own communication events checkout the
documentation for
[`EventAggregator`](/api/4.x/core-event-aggregator#tab=docs).

## API
Here are all functions you can use with the **ResultDispatcher** 

### `subscribe(topic, fn, ctx)`
___
The function supplied in `fn` is invoked with data for the subscribed
`topic` when new data is available. The parameter `ctx` is optional

#### All available topics
* `result`
* `campaign` - special
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
* `tagCloud`

These **topics** are dispatched in the current execution order.
For example the `campaigns` are dispatched before the `asn`, but it is
**not** recommended to rely on this order.

```html
<script>
    // listen for ffReady before HTML import is loaded or you'll miss the event
    document.addEventListener("ffReady", function (event) {
        const resultDispatcher = event.resultDispatcher;
        resultDispatcher.subscribe("result", function (resultData, event) {
            // process the result and/or the event
        });
    });
</script>
<script defer src="pathToFFWebComponents/dist/bundle.js"></script>
```    

### `unsubscribe(topic, key)`
___
Unsubscribe during runtime from a specific topic
```html
<script>
    //listen for ffReady before HTML import is loaded or you'll miss the event
    document.addEventListener("ffReady", function (event) {
        const resultDispatcher = event.resultDispatcher;
        const key = resultDispatcher.subscribe("result", function (resultData, event) {
            // process the result and/or the event
        });

        resultDispatcher.unsubscribe("result", key);
    });
</script>
<script defer src="pathToFFWebComponents/dist/bundle.js"></script>
```

### `addCallback(topic, fn, context)`
___
This is similar to `subscribe()` but it is guaranteed to be executed
**before** `subscribe()`.
```html
<script>
    // listen for ffReady before HTML import is loaded or you'll miss the event
    document.addEventListener("ffReady", function (event) {
        const resultDispatcher = event.resultDispatcher;
        const key = resultDispatcher.addCallback("asn", function (asnData) {
            // process ASN data
        });
    });
</script>
<script defer src="pathToFFWebComponents/dist/bundle.js"></script>
```

### `removeCallback(topic, key)`
___
Remove a callback for a topic (ex:`asn`) with the **key** from the
registered callback.
```html
<script>
    // listen for ffReady before HTML import is loaded or you'll miss the event
    document.addEventListener("ffReady", function (event) {
        const resultDispatcher = event.resultDispatcher;
        const key = resultDispatcher.addCallback("asn", function (asnData) {
            // process ASN data
        });

        factfinder.communication.ResultDispatcher.removeCallback("asn", key);
    });
</script>
<script defer src="pathToFFWebComponents/dist/bundle.js"></script>
```

### `dispatchRaw(response, topics)`
___
Manually dispatches a response to the Web Components.
Topics argument is optional - skipping it causes the response will be dispatched as standard search result.

```html
<script type="text/javascript">
  document.addEventListener('WebComponentsReady', function () {
      factfinder.communication.ResultDispatcher.dispatchRaw(responseToDispatch);
  });
</script>
```
**Note**: Make sure you put `dispatchRaw` call inside `WebComponentsReady` listener.
That guarantees all attributes set for `ff-communication` (e.g. `version`) will be reflected as communication parameters.
