## Set up the communication

Add the `ff-communication` tag to every page that uses **FactFinder Web Components**.
This element is used to define certain parameters for the communication between FactFinder Web Components and FactFinder and their behavior.
You need to configure the location of your FactFinder server and the target channel by setting the `url` and `channel` HTML attributes.

The `ff-communication` element has more attributes.
One example is the `default-query` attribute used to define a default search term that is always used on page load.
When using the `search-immediate` attribute, which takes no parameter, the search query is fired once the page has finished loading.

The following code-example shows the aforementioned configuration.

```html
<ff-communication
        url="https://web-components.fact-finder.de/FACT-Finder"
        version="ng"
        api="v5"
        channel="bergfreunde-co-uk"
        default-query="backpack"
        search-immediate
></ff-communication>
```
`url`, `version` and `channel` are mandatory parameters and should be explicitly set to make the components work correctly.
In addition, if you are using **FactFinder NG**, you also have to specify the API version of your FactFinder in the `api` attribute.

For more information, see the [API reference](/api/4.x/ff-communication#tab=api).


### Order of attributes is important

Browsers may differ in the order they process an element's attributes.
Some attributes depend on others and may cause incorrect behaviour or even errors if defined in the wrong order.

To ensure correct configuration across browsers, the first attributes you define on `ff-communication` should always be:

- `url`
- `version`
- `api` (not required if using FactFinder older than NG)
- `channel`


## Ready Event

Once the `ff-communication` element connects to the DOM, it emits the `ffCommunicationReady` event on the global `document` object.

When this event fires, it is guaranteed that:
- Core of Web Components library is initialized
- Web Components polyfill is initialized
- `ff-communication`'s attributes have been processed and written to the Web Components application state
- elements are ready to receive data

This event is particularly useful when you configure your application with `ff-communication` and need an entry point after the configuration has fully propagated through the application.
It is also the only event that reliably fires after the DOM elements have finished initializing.
This is important when you want to dispatch data manually after the page loads (e.g. [SSR](/documentation/4.x/server-side-rendering)).

The `event` object passed to the event handler has two additional properties `factfinder` and `searchImmediate`.

```html
<script>
    document.addEventListener(`ffCommunicationReady`, event => {
        // The same object as `window.factfinder`.
        const factfinder = event.factfinder;

        // A reference to the function that would be called automatically when using the `search-immediate` attribute.
        const searchImmediate = event.searchImmediate;

        // `searchImmediate` takes no arguments.
        // searchImmediate();
    });
</script>
```

Make sure to subscribe to `ffCommunicationReady` **before** `ff-communication` has a chance to finish initializing.
The most reliable location to subscribe to this event is before loading the Web Components bundle itself.

`ffCommunicationReady` is one of the [Ready Events](/documentation/4.x/ready-events).
