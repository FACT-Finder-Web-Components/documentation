## Configuration

---
This chapter describes the minimum required configuration to search and retrieve results from FactFinder.
The configuration of the Web Components application is done with JavaScript.

For a detailed look at the configuration, see [Configuration](/api/5.x/core-configuration).


### A minimal configuration consists of the following components

#### Subscribe to the `ffCoreReady` event

This event signals that the Web Components core is ready for use.
Consider this event the entry point to the Web Components library.

Typically, you set up your entire Web Components application inside the event handler to this event.


#### URL

This is the location of your FactFinder instance.

Please note the context name `/fact-finder`.
It is not sufficient to provide only the top-level domain like `https://your-instance.fact-finder.com/` which will result in an error.


#### Channel

Specify the name of the channel which you want to use as the application's main source of search results.
You can find the available channels in your FactFinder UI.

At runtime, you still have the option to query other channels.


#### API key

Web Components uses API key authentication.
Consult your FactFinder documentation about how to set up API keys.


#### Initial search

Specific types of pages, such as search result and category pages, typically display relevant results without the need for user interaction.

Use this special command to automatically invoke a search request where needed.


### Example

```js
document.addEventListener(`ffCoreReady`, ({ factfinder, init, initialSearch }) => {
    init({
        ff: {
            url: `https://your-instance.fact-finder.com/fact-finder`,
            channel: `your-channel`,
            apiKey: `your.apiKey`,
        },
    });

    // Call `initialSearch` on pages that shall display search results automatically.
    initialSearch({ query: `the lost ark` });
});
```
