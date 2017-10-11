You can subscribe to the ResultDispatcher for raw data or get a chance to play around with result
before it's dispatched. This is indeed what all data related FACT-Finder Web Components do. They
subscribe to ResultDispatcher to get notified when new data is available. If you want to trigger
your own communication events checkout the FFCommunicationEventAggregator.

## factfinder.communication.ResultDispatcher

### `ResultDispatcher.subscribe(topic, fn, ctx)`

Get notified when new data is available. If so the function supplied in `fn` is invoked with data according to the topic.
#### List of topics to subscribe for. 
This is the current execution order e.g. campaigns are dispatched before the asn is dispatched but its nor 
recommended to rely on this order. Use addCallback instead.
    
* 'result'
* 'campaigns' - special
* 'records'
* 'query'
* 'suggest'
* 'bct'
* 'sort'
* 'ppp'
* 'paging'
* 'pagingItems'
* 'asn'
* 'singleWordSearch'
* 'productDetail'
* 'productCampaign' -special
* 'singleWordSearch'
    

```html
<script>
    //listen for ffReady before html import is loaded or you'll miss the event
    document.addEventListener("ffReady", function () {
        factfinder.communication.ResultDispatcher.subscribe("result", function (resultData) {
            // process the result
        });
    });
</script>
<link rel="import" href="pathToHtmlImport/elements.build.with_dependencies.html">
```    
___

### `ResultDispatcher.unsubscribe(topic, key)`
Unsubscribe during runtime for a specific topic
```html
<script>
    //listen for ffReady before html import is loaded or you'll miss the event
    document.addEventListener("ffReady", function () {
        var key = factfinder.communication.ResultDispatcher.subscribe("result", function (resultData) {
            // process the result
        });

        factfinder.communication.ResultDispatcher.unsubscribe("result", key);
    });
</script>
<link rel="import" href="pathToHtmlImport/elements.build.with_dependencies.html">
```
___

### `ResultDispatcher.addCallback(topic, fn, context)`
__addCallback__ is similar to 'subscribe' but is guaranteed to be executed before 'subscribe'.
```html
<script>
    //listen for ffReady before html import is loaded or you'll miss the event
    document.addEventListener("ffReady", function () {
        var key = factfinder.communication.ResultDispatcher.addCallback("asn", function (asnData) {
            // poke around with asn data
        });

        //factfinder.communication.ResultDispatcher.removeCallback("asn", key);
    });
</script>
<link rel="import" href="pathToHtmlImport/elements.build.with_dependencies.html">
```
___

### `ResultDispatcher.removeCallback(topic, key)`
Remove a callback.
```html
<script>
    //listen for ffReady before html import is loaded or you'll miss the event
    document.addEventListener("ffReady", function () {
        var key = factfinder.communication.ResultDispatcher.addCallback("asn", function (asnData) {
            // poke around with asn data
        });

        factfinder.communication.ResultDispatcher.removeCallback("asn", key);
    });
</script>
<link rel="import" href="pathToHtmlImport/elements.build.with_dependencies.html">
```
