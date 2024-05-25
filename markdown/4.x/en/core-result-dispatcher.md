You can subscribe to the ResultDispatcher for raw data or to change the
result before it is dispatched. This is indeed what all
data related FactFinder Web Components do. They subscribe to
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
Remove a callback for a topic (ex:`asn`) with the `key` from the registered callback.
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

### `dispatchSSR(response, topics)`
___
Manually dispatches a **response** to Web Components.
This method is useful when there is a need to dispatch a FactFinder response received in a way other than by Web Components AJAX request.
That will be the case especially when implementing [Server Side Rendering](/documentation/4.x/server-side-rendering).

Argument `topics` is optional - skipping it causes the response to be dispatched to all default topics.
It updates all subscribed elements.
With the `topics` argument passed, only the part of the response related to the passed topic will be dispatched (e.g. using `suggest` will cause an update only on elements which subscribe to the `suggest` topic - by default `ff-suggest`).

> Tip
>
> It is possible to pass multiple topics in an array.

```html
<script type="text/javascript">
  document.addEventListener("ffCommunicationReady", function ({ factfinder }) {
      factfinder.communication.ResultDispatcher.dispatchSSR(responseToDispatch);
  });
</script>
```

> Note
>
> Make sure you put the `dispatchSSR` call inside an `ffCommunicationReady` listener.
> This guarantees all `ff-communication` attributes (e.g. `version`) will be reflected as communication parameters.

## Auto Fetching

By its nature, the ResultDispatcher communicates with Web Components in a publish-subscribe fashion.
While this architecture has multiple advantages, like loose coupling and dynamic targeting, it comes with a caveat.
Web Components that are dynamically attached to DOM by JS might subscribe too late to receive the data sent out by the ResultDispatcher after receiving a FactFinder response.
In certain setups, where the elements are rendered in parallel with the FactFinder request sequence, this might also lead to race conditions causing inconsistent HTML outputs.

As one of the options to overcome this issue, FactFinder Web Components features the Auto Fetching mode. 
With Auto Fetching enabled, the ResultDispatcher will feed the newly subscribed Web Components with the latest data, even if they subscribe after a regular dispatch cycle.

To globally enable Auto Fetching, set the `globalCommunicationParameter.autoFetch` configuration parameter to `AlwaysOn`:
```javascript
document.addEventListener("ffReady", ({ factfinder }) => {
    factfinder.communication.globalCommunicationParameter.autoFetch = factfinder.enums.AutoFetch.AlwaysOn;
});
```

> Mind the consequences
>
> In some SPA shops, Auto Fetching might cause outdated data to be rendered once the components are replaced when navigating between pages.

### SSR

The default value for Auto Fetching is `SsrOnly`. 
It means Auto Fetching is enabled by default after an SSR-driven dispatch occurs.
Auto Fetching stops automatically once a user interaction-based dispatch occurs.
That allows heavily-optimized web apps to render just the record list first and dynamically render non-SEO critical components later on, without having to worry about missed dispatches.
This behavior can be turned off by setting the Auto Fetching parameter to `AlwaysOff`:

```javascript
document.addEventListener("ffReady", ({ factfinder }) => {
    factfinder.communication.globalCommunicationParameter.autoFetch = factfinder.enums.AutoFetch.AlwaysOff;
});
```
