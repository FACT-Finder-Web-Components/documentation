## Ready Events
There are two essential events emitted on the main document.

**IMPORTANT**

Both EventListeners have to be declared before our scripts are loaded or you could miss the event **and your code is never executed**!

### ffReady
This event is fired if our core library has loaded and is fully functional.

**What does that mean?**

All our elements are utilizing the same Core functions described in our [ff-core.d.ts](https://github.com/FACT-Finder-Web-Components/ff-web-components/blob/master/dist/ff-core.d.ts) file or in our [Core API](/api/3.x/core-result-dispatcher) documentation.

Sometimes you want or have to change the data before all our elements being notified. This is where `ffReady` callback kicks in.

If you are listening to the `ffReady` event, it is guaranteed that your callback is invoked before all element callbacks are going to be invoked.
In this case, an `event` object will have three additional parameters passed.
* factfinder - reference to global `factfinder` object
* eventAggregator - reference to `factfinder.communication.EventAggregator`
* resultDispatcher - reference to `factfinder.communication.ResultDispatcher`

**NOTE:**
 Variable `factfinder` is also always available from the global scope.

**Example usage**
```html
<script>
    document.addEventListener("ffReady", function (event) {
        // event.factfinder       === factfinder
        // event.eventAggregator  === factfinder.communication.EventAggregator
        // event.resultDispatcher === factfinder.communication.ResultDispatcher

        const factfinder       = event.factfinder;
        const eventAggregator  = event.eventAggregator;
        const resultDispatcher = event.resultDispatcher;
        //add eventlistener as described in https://web-components.fact-finder.de/api/core-result-dispatcher
    });
</script>
<script defer src="pathToFFWebComponents/dist/bundle.js"></script>
```

If you run your code in browsers which natively support ES6 or use JS code transpilers, you can use destructuring to simplify the syntax.
```html
<script>
    document.addEventListener("ffReady", function ({factfinder, eventAggregator, resultDispatcher}) {
        //add eventlistener as described in https://web-components.fact-finder.de/api/core-result-dispatcher
    });
</script>
<script defer src="pathToFFWebComponents/dist/bundle.js"></script>
```
You can even destructure nested objects to select only those properties you need in your event handler.
```html
<script>
    document.addEventListener("ffReady", function ({factfinder: {communication: {EventAggregator: {addFFEvent}}}}) {
        addFFEvent({
            type: "search",
            query: "some query"
        });
        //add eventlistener as described in https://web-components.fact-finder.de/api/core-result-dispatcher
    });
</script>
<script defer src="pathToFFWebComponents/dist/bundle.js"></script>
```
**NOTE:**
Internet Explorer does not support destructuring assignment. Do not use it unless your code is transpiled before deployment.
You can find more information in the documentation: [Destructuring assignment](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

### WebComponentsReady
The `WebComponentsReady` event is fired if all FactFinder Web Components are ready to use.

**What does that mean?**

All FactFinder Web Components are unknown to the browser until the JavaScript is loaded and each Web Component is registered and upgraded.

This means all functions, attributes and behaviors are not working until an element is upgraded.

Let's consider the following case:
```html
<script>
    //WRONG
    document.addEventListener("ffReady", function (event) {
        const eventAggregator  = event.eventAggregator;
            //the core is ready, let's search
            eventAggregator.addFFEvent({
                type: "search",
                query: "some query"
            });
    });
</script>
```

**This will actually result in an error.**

As described above the `ffReady` event indicates the core library is ready but not the elements itself. At the time the search is executed `<ff-communication></ff-communication>` element isn't initialized and therefore no communication information is available.

Instead we want to use the `WebComponentsReady` to wait until all FactFinder Web Components are upgraded:
```html
<script>
    //CORRECT
    document.addEventListener("WebComponentsReady", function () {
        //the core is ready, let's search
        factfinder.communication.EventAggregator.addFFEvent({
            type: "search",
            query: "some query"
        });
    });
</script>
<script defer src="pathToFFWebComponents/dist/bundle.js"></script>
```

**NOTE**

Basically you can set the necessary communication information at `ffReady` time in the js itself and fire events to factfinder earlier.

    **Caution**
        Version <= 1.2.11:
        This will lead to lost updates in cases where FactFinder's response arrives before all components have been upgraded.
        
        Version >= 1.2.12:
        The dispatching of FactFinder responses to all subscribers is cached and postponed until all components have been upgraded. So there will be no lost updates anymore. Be aware that currently added _callbacks_ are invoked through `factfinder.communication.ResultDispatcher.addCallback` as soon as the FactFinder response arrives. In case any of the callbacks have side-effects other than manipulating the response, this might lead to unexpected behavior.


### Element Order
Even without using `ffReady` to trigger a search you stumble across an error message like:

_Required search params are not available: [url(globalSearchParameter): ""], [url(event): "undefined"], [channel: ""], [version:"NaN"]_

If you are sure the message is not related to a custom js snippet, it is possibly related to the order of elements.

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

The `ff-recommendation` element is responsible for querying the FactFinder recommendation API. At the time the element is _upgraded_ and sends its request, the 'ff-communication' hasn't published all its configuration and therefore the request can't even be sent because no _URL_ and _CHANNEL_ information are available.

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

It is advisable to add a comment explaining this requirement.
