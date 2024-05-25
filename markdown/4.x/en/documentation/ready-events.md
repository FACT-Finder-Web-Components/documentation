## Ready Events

There are up to three essential events emitted on the main `document`.

> Important
>
> Each event listener has to be declared before the Web Components scripts are loaded, or you could miss the event, **and your code is never executed**!


### ffReady

This event is fired when the Web Components **core library** has loaded and is fully functional.
The Web Components DOM elements, however, have not yet finished initializing and will likely not respond to interaction.

Subscribe to this event whenever you need to register event handlers to manipulate the **request/response pipeline** or to generally **configure** the Web Components application through JavaScript.
This is likely the most frequently used of the ready-events.

All elements are utilizing the same Core functions described in [ff-core.d.ts](https://github.com/FACT-Finder-Web-Components/ff-web-components/blob/master/dist/ff-core.d.ts) or in the [Core API](/api/4.x/core-result-dispatcher) documentation.

The event handler receives an `event` object with three additional properties:

- `factfinder` - reference to the global `factfinder` object
- `eventAggregator` - reference to `factfinder.communication.EventAggregator`
- `resultDispatcher` - reference to `factfinder.communication.ResultDispatcher`

> Note
>
> The `factfinder` reference is also always available from the global scope.

**Example usage**
```html
<script>
    document.addEventListener("ffReady", event => {
        // event.factfinder       === window.factfinder
        // event.eventAggregator  === window.factfinder.communication.EventAggregator
        // event.resultDispatcher === window.factfinder.communication.ResultDispatcher

        const factfinder       = event.factfinder;
        const eventAggregator  = event.eventAggregator;
        const resultDispatcher = event.resultDispatcher;

        // Add event listeners and configuration as required.
    });
</script>
<script defer src="pathToFFWebComponents/dist/bundle.js"></script>
```

You can use destructuring to access these properties directly.

```html
<script>
    document.addEventListener("ffReady", ({ factfinder, eventAggregator, resultDispatcher }) => {
        // Add event listeners and configuration as required.
    });
</script>
<script defer src="pathToFFWebComponents/dist/bundle.js"></script>
```


### ffCommunicationReady

This event is emitted only when the `ff-communication` element is in the DOM.
It fires once `ff-communication` finishes connecting to the DOM and propagated its configuration to the Web Components application state.

Especially, because the timing of `ffReady` and `WebComponentsReady` may vary depending on a browser's loading speed or whether the page is loaded in the background, `ffCommunicationReady` is the **safest choice** for actions directly involving the DOM elements.

`ffCommunicationReady` is emitted at the moment `ff-communication` would send the initial search request when the `search-immediate` attribute is set.
As you typically want to set up some configuration when you subscribe to this event, it is recommended to not set the `search-immediate` attribute on `ff-communication` but instead initiate the first search request yourself.

The `event` object passed to the event handler has two additional properties:

- `factfinder` - reference to the global `factfinder` object
- `searchImmediate` - a function that invokes the same request as the `search-immediate` attribute would

```js
document.addEventListener("ffCommunicationReady", event => {
    // The same object as `window.factfinder`.
    const factfinder = event.factfinder;

    // A reference to the function that would be called automatically when using the `search-immediate` attribute.
    const searchImmediate = event.searchImmediate;

    // `searchImmediate` takes no arguments.
    // searchImmediate();
});
```

Also see [ff-communication](/api/4.x/ff-communication).


### WebComponentsReady

The `WebComponentsReady` event is fired when all FactFinder Web Components are ready to use.

All FactFinder Web Components are unknown to the browser until the JavaScript is loaded and each Web Component is registered and upgraded.
This means no functions, attributes or behaviors are working until an element is upgraded.

> Caution
>
> While `WebComponentsReady` works reliably in almost all scenarios, there may be some edge cases when `WebComponentsReady` fires before all DOM elements have finished initializing.
> In those cases it may be safer to use `ffCommunicationReady` instead.

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

As described above, the `ffReady` event indicates the core library is ready but not the elements.
At the time the search is executed, the `ff-communication` element isn't initialized yet and therefore no communication information is available.

Instead, we want to use the `WebComponentsReady` to wait until all FactFinder Web Components are upgraded:
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
> Actually, you can set the necessary communication information in the `ffReady` handler yourself with JavaScript and fire events to FactFinder earlier.

Be aware that the dispatching of FactFinder responses to all subscribers is cached and postponed until all components have been upgraded.
Current added _callbacks_ are invoked through `factfinder.communication.ResultDispatcher.addCallback` as soon as the FactFinder response arrives.
In case any of the callbacks has side effects other than manipulating the response, this might lead to unexpected behavior.


### Element Order

Even without using `ffReady` to trigger a search you may stumble across an error message like:

`Required search params are not available: [url(globalSearchParameter): ""], [url(event): "undefined"], [channel: ""], [version:"NaN"]`

If you are sure the message is not related to custom JavaScript code, it is possibly related to the order of elements.

> Important
>
> The `ff-communication` element has to be the first FF Web Component in DOM order!

Here is a wrong example:

```html
<!--WRONG-->
<ff-recommendation record-id="1234">
    <!-- ff-record-list ....-->
</ff-recommendation>

<ff-communication url="https://some.ff.url" channel="aChannel" version="ng" api="v5"></ff-communication>
```

The `ff-recommendation` element is responsible for querying the FactFinder recommendation API.
At the time the element is _upgraded_ and sends its request, `ff-communication` hasn't registered all its configuration and therefore the request can't even be sent because no _URL_ and _CHANNEL_ information are available yet.

To fix this issue you have to place the `ff-communication` element before the `ff-recommendation` element:
```html
<!--CORRECT-->
<ff-communication url="https://some.ff.url" channel="aChannel" version="ng" api="v5"></ff-communication>

<ff-recommendation record-id="1234">
    <!-- ff-record-list ....-->
</ff-recommendation>
```

> Note
>
> We recommend putting the `ff-communication` element immediately after the opening `body` tag.
> This should prevent accidental misplacement of elements.

It is advisable to add a comment explaining this requirement.
