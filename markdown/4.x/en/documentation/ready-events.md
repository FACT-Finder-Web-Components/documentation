## Ready Events

There are two essential events emitted on the main document.

> Important
>
> Both event listeners have to be declared before the Web Components scripts are loaded, or you could miss the event, **and your code is never executed**!

### ffReady
This event is fired if our core library has loaded and is fully functional.

**What does that mean?**

All our elements are utilizing the same Core functions described in our [ff-core.d.ts](https://github.com/FACT-Finder-Web-Components/ff-web-components/blob/master/dist/ff-core.d.ts) file or in our [Core API](/api/4.x/core-result-dispatcher) documentation.

Sometimes you want or have to change the data before all our elements being notified. This is where `ffReady` callback kicks in.

If you are listening to the `ffReady` event, it is guaranteed that your callback is invoked before all element callbacks are going to be invoked.
In this case, an `event` object will have three additional parameters passed.
* factfinder - reference to global `factfinder` object
* eventAggregator - reference to `factfinder.communication.EventAggregator`
* resultDispatcher - reference to `factfinder.communication.ResultDispatcher`

> Note
>
> The `factfinder` reference is also always available from the global scope.

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

        // Add event listener as described in https://web-components.fact-finder.de/api/core-result-dispatcher
    });
</script>
<script defer src="pathToFFWebComponents/dist/bundle.js"></script>
```

If you run your code in browsers which natively support ES6 or use JS code transpilers, you can use destructuring to simplify the syntax.
```html
<script>
    document.addEventListener("ffReady", function ({factfinder, eventAggregator, resultDispatcher}) {
        // Add event listener as described in https://web-components.fact-finder.de/api/core-result-dispatcher
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
        // Add event listener as described in https://web-components.fact-finder.de/api/core-result-dispatcher
    });
</script>
<script defer src="pathToFFWebComponents/dist/bundle.js"></script>
```

> Note
>
> Internet Explorer does not support destructuring assignments.
> Do not use it unless your code is transpiled before deployment.
> You can find more information in the JavaScript documentation: [Destructuring assignment](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

### WebComponentsReady

The `WebComponentsReady` event is fired if all FACT-Finder Web Components are ready to use.

**What does that mean?**

All FACT-Finder Web Components are unknown to the browser until the JavaScript is loaded and each Web Component is registered and upgraded.

This means all functions, attributes and behaviors are not working until an element is upgraded.

Let's consider the following case:
```html
<script>
    //WRONG
    document.addEventListener("ffReady", function (event) {
        const eventAggregator  = event.eventAggregator;
            // The core is ready. Let's search!
            eventAggregator.addFFEvent({
                type: "search",
                query: "some query"
            });
    });
</script>
```

**This will actually result in an error.**

As described above the `ffReady` event indicates the core library is ready but not the elements.
At the time the search is executed, the `ff-communication` element isn't initialized yet and therefore no communication information is available.

Instead, we want to use the `WebComponentsReady` to wait until all FACT-Finder Web Components are upgraded:
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

> Note
>
> Actually, you can set the necessary communication information in the `ffReady` handler yourself with JavaScript and fire events to FACT-Finder earlier.

Be aware that the dispatching of FACT-Finder responses to all subscribers is cached and postponed until all components have been upgraded.
Current added _callbacks_ are invoked through `factfinder.communication.ResultDispatcher.addCallback` as soon as the FACT-Finder response arrives.
In case any of the callbacks has side effects other than manipulating the response, this might lead to unexpected behavior.


### Element Order
Even without using `ffReady` to trigger a search you may stumble across an error message like:

`Required search params are not available: [url(globalSearchParameter): ""], [url(event): "undefined"], [channel: ""], [version:"NaN"]`

If you are sure the message is not related to custom JavaScript code, it is possibly related to the order of elements.

> Important
>
> The `ff-communication` element has to be the first FF Web Component in DOM order!

**What does that mean?**

Let me show you a wrong example:

```html
<!--WRONG-->
<ff-recommendation record-id="1234">
    <!-- ff-record-list ....-->
</ff-recommendation>

<ff-communication url="https://some.ff.url" channel="aChannel" version="ng" api="v4"></ff-communication>
```

The `ff-recommendation` element is responsible for querying the FACT-Finder recommendation API.
At the time the element is _upgraded_ and sends its request, `ff-communication` hasn't registered all its configuration and therefore the request can't even be sent because no _URL_ and _CHANNEL_ information are available.

To fix this issue you have to place the `ff-communication` element before the `ff-recommendation` element:
```html
<!--CORRECT-->
<ff-communication url="https://some.ff.url" channel="aChannel" version="ng" api="v4"></ff-communication>

<ff-recommendation record-id="1234">
    <!-- ff-record-list ....-->
</ff-recommendation>
```

> Note
>
> We recommend putting the `ff-communication` element immediately after the opening `body` tag.
> This should prevent accidental misplacement of elements.

It is advisable to add a comment explaining this requirement.
