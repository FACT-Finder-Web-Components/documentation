## Ready Events
There are 2 essential events emmited on the main document.

**IMPORTANT**

Both EventListeners have to be declared before our scripts are loaded or you could miss the event **and your code is never executed**!

### ffReady
This event is fired if our core library has loaded and is fully functional.

**What does that mean?**

All our elements are utilizing the same Core functions described in our [ff-core.d.ts](https://github.com/FACT-Finder-Web-Components/ff-web-components/blob/master/dist/ff-core.d.ts) file or in our [Core API](https://web-components.fact-finder.de/api/core-result-dispatcher) documentation.

Sometimes you want or have to change the data before all our elements being notified. This is where `ffReady` callback kicks in.

If you are listening to the `ffReady` event it's guaranteed that your callback is invoked before all element callbacks are going to be invoked.

**Example usage**
```html
<script>
    document.addEventListener("ffReady", function () {
        //add eventlistener as described in https://web-components.fact-finder.de/api/core-result-dispatcher
    });
</script>
<link rel="import" href="pathToHtmlImport/elements.build.with_dependencies.html">
```

### WebComponentsReady
The `WebComponentsReady` event is fired if all custom elements are ready to use.

**What does that mean?**

All `Custom Elements` are unknown to the browser until our Javascript is loaded and each custom element is picked up and upgraded to an real `Custom Element` (Web Component).

This means all functions, attributes and behaviors are not working until an element is upgraded.

Let's consider the following case:
```html
<script>
    //WRONG
    document.addEventListener("ffReady", function () {
            //the core is ready lets search
            factfinder.communication.FFCommunicationEventAggregatgor.addFFEvent({
                type: "search",
                query: "some query"
            });
    });
</script>
```

**This will actually result in an error.**

As described above the `ffReady` event indicates the core library is ready but not the elements itself. At the time the search is executed `<ff-communication></ff-communication>` element isn't initialized and therefore no communication information is available.

Instead we want to use the `WebComponentsReady` to have all custom elements upgraded:
```html
<script>
    //CORRECT
    document.addEventListener("WebComponentsReady", function () {
        //the core is ready lets search
        factfinder.communication.FFCommunicationEventAggregatgor.addFFEvent({
            type: "search",
            query: "some query"
        });
    });
</script>
<link rel="import" href="pathToHtmlImport/elements.build.with_dependencies.html">
```

**NOTE**

Basically you can set the necessary communication information at `ffReady` time in the js itself. However dispatching of data needs to be postponed until `WebComponentsReady` to ensure all elements are upgraded and listening on data.

### Element Order
Even without using `ffReady` to trigger a search you stumble across an error message like:

_Required search params are not available: [url(globalSearchParameter): ""], [url(event): "undefined"], [channel: ""], [version:"NaN"]_

If you are sure the message is not related to a custom js snippet it's possibly related to the order of elements.

**IMPORTANT**

**The `<ff-communication></ff-communication>` element has to be the first FF Web Component in DOM order!**

**What does that mean?**

Let me show you a wrong example:

```html
<!--WRONG-->
<ff-recommendation record-id="1234">
    <!-- ff-record-list ....-->
</ff-recommendation>

<ff-communication url="https://some.ff.url" channel="aChannel" version="7.2"></ff-communication>
```

The `ff-recommendation` element is responsible for querying the FACT-Finder recommendation API. At the time the element is _upgraded_ and sends its request, the 'ff-communication' hasn't published all it's configuration and therefore the request can't even be sent because no _URL_ and _CHANNEL_ information are available.

To fix this issue you have to place the `ff-communication` element before the `ff-recommendation` element:
```html
<!--CORRECT-->
<ff-communication url="https://some.ff.url" channel="aChannel" version="7.2"></ff-communication>

<ff-recommendation record-id="1234">
    <!-- ff-record-list ....-->
</ff-recommendation>
```

**NOTE**
We recommend putting the `ff-communication` element right after the `body` tag. This way no one can mess up the order.

It's advisable to add a comment explaining this requirement.