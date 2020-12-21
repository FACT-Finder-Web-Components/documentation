## Implementing custom components 

---
FACT-Finder Web Components API can be used to implement custom components in any web framework.
In a typical scenario, we can use [EventAggregator's](/api/4.x/core-event-aggregator) `addFFEvent()` to query FACT-Finder and [ResultDispatcher's](/api/4.x/core-result-dispatcher) `subscribe()` to receive its response. 
Below you will find two examples following this approach implementing a product carousel component, one in VueJS and one as a native custom element.

### VueJS

The source code is available [here](https://github.com/FACT-Finder-Web-Components/demos/blob/release/4.x/custom-components/vuejs-carousel/carousel.js).
Let's take a closer look at the parts where FACT-Finder Web Components API is utilized:

#### 1. `addFFEvent`

We call `addFFEvent()` in the `mounted` hook to trigger FACT-Finder search when the component renders for the first time:
```javascript
eventAggregator.addFFEvent({
    type: 'search',
    query: carousel.query,
    topics: function () {
        return ['carousel-' + carousel._uid];
    }
});
```
* `type: 'search'` indicates that we want to perform a regular search
* `query` is populated from the component prop
* `topics` function defines to which topic the results will be dispatched. In this case, we want this topic to be unique for each component instance. Otherwise, other carousels would interfere with each other

> Note
>
> When designing a production-ready component, it is advisable to implement a `query` prop watcher to react to its possible changes with consecutive search requests.

#### 2. `subscribe`

We subscribe to the same topic also in the `mounted` hook:
```javascript
carousel.subscriptionKey = resultDispatcher.subscribe('carousel-' + carousel._uid, function (response) {
    carousel.records = response.searchResult.records.map(function (record) {
        return record.record;
    });
});
```
Here we extract all the information we need from the response and store it in component data alongside with the subscription key returned by `subscribe()`.

#### 3. `unsubscribe`

Before destroying the component we unsubscribe using the previously stored subscription key:
```javascript
if (carousel.subscriptionKey) {
    resultDispatcher.unsubscribe('carousel-' + carousel._uid, carousel.subscriptionKey);
}
```

### Native custom element

The source code is available [here](https://github.com/FACT-Finder-Web-Components/demos/blob/release/4.x/custom-components/native-carousel/carousel.js).
The usage of FACT-Finder Web Components API here is very similar to the usage in the VueJS example.

#### 1. `addFFEvent`

`addFFEvent()` call is almost identical:
```javascript
eventAggregator.addFFEvent({
    type: 'search',
    query: query,
    topics: function () {
        return ['carousel-' + uid];
    }
});
```
Here we invoke it in the `attributeChangedCallback` meaning whenever a new value of the `query` attribute is set, we trigger a new search.

#### 2. `subscribe`

We subscribe in the `connectedCallback`:
```javascript
element._subscriptionKey = resultDispatcher.subscribe('carousel-' + element._uid, handleRecords(element));
...
function handleRecords(element) {
    return function(response) {
        element._records = response.searchResult.records;
        element._carouselContainer.innerHTML = element._records.map(renderProduct).join('');
    };
}
```
Just like in the previous example, we store the subscription key and returned records. 
As we are not using any automatic renderer we have to perform the rendering here.

#### 3. `unsubscribe`

We unsubscribe in the `disconnectedCallback`:
```javascript
resultDispatcher.unsubscribe('carousel-' + element._uid, element._subscriptionKey);
```
