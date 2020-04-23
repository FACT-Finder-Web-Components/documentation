The **EventAggregator** (`factfinder.communication.EventAggregator`) is used to query the FACT-Finder API with an event based approach. You can also hook into the communication pipeline.

## Fire Events       
To send queries to FACT-Finder, you need to fire events via the `addFFEvent()` function. Internally, the same method is used for all elements which communicate with FACT-Finder.

### `addFFEvent(event)`
Each event has a `type` which defines what API on FACT-Finder is called and which other properties it operates on.

**NOTE**: Each property which is not a function or an object is translated to an http request parameter with a few exceptions:

*  type 
*  url 
*  fail 
*  always 
*  success 
*  cancel
*  searchImmediate


`fail`, `always` and `success` are expected to be a function which is
executed at the appropriate time. The `type` property tells the EventAggregator how to handle
the event. The `url` property is reserved for internal usage.
 
#### List of all event types
* [search](search)
* [navigation](navigation)
* navigation-search
* [filter](filter)
* [bct (breadcrumb trail)](breadcrumb-trail)
* [suggest](suggest)
* [sort](sort)
* [ppp (products per page)](products-per-page)
* [paging (pagination)](paging)
* [recommendation](recommendation)
* [productCampaign](productcampaign)
* [shoppingCartCampaign](shoppingcartcampaign)
* productDetail
* [similarProducts](similarproducts)
* [advisor](advisor)
* [pageCampaigns](pagecampaigns)
* [compare](compare)
* [tagCloud](tagcloud)

## Hooking into the pipeline

### `addBeforeDispatchingCallback(fn):string;`
Adds a callback which executes before each event (e.g. `search`, `suggest`, `recommendation`, etc.) is sent.
The callback receives an event object enriched with basic data (e.g. `sid`) and, if available, a
`type` property which corresponds to the event types of `EventAggregator.addFFEvent(event)`.
        
If you want to intercept a search request for example, you could do:
```html
<script>
    document.addEventListener("ffReady", function (event) {
        const eventAggregator = event.eventAggregator;
        eventAggregator.addBeforeDispatchingCallback(function (event) {
            if (event.type === "search") {
                event["newConditionalHttpParam"] = "someValue";
            }
        });
    });
</script>
<script defer src="pathToFFWebComponents/dist/bundle.js"></script>
```

### `removeBeforeDispatchingCallback(key):boolean;`
Removes a registered callback identified by its `key`
```html
<script>
    document.addEventListener("ffReady", function (event) {
        const eventAggregator = event.eventAggregator;
        const key = eventAggregator.addBeforeDispatchingCallback(function (event) {
            if (event.type === "search") {
                event["newConditionalHttpParam"] = "someValue";
            }
        });
        
        // remove the callback
        factfinder.communication.EventAggregator.removeBeforeDispatchingCallback(key);
    });
</script>
<script defer src="pathToFFWebComponents/dist/bundle.js"></script>
```

## Examples

### Custom Topics
You can also fire an event which will then only dispatch to a list of custom defined topics.
To do so add a function which returns an array of topics to the event in the `topics` property.

Now you can register/subscribe a callback to the ResultDispatcher with that topic and get the result for that event type.
```html
<script>
    factfinder.communication.EventAggregator.addFFEvent({
        type: "search",
        // other "search" type settings
        topics: function() {
            return ["myCustomSearch", "mySpecialElement"];
        }
    });

    const key = factfinder.communication.ResultDispatcher.subscribe("myCustomSearch", function (resultData) {
        // process the result
    });

    const key2 = factfinder.communication.ResultDispatcher.addCallback("mySpecialElement", function (resultData) {
        // process the result
    });
</script>
```

### search
```html
<script>
    factfinder.communication.EventAggregator.addFFEvent({
        type: "search",
        query: <query:String>
    });


    factfinder.communication.EventAggregator.addFFEvent({
         type: "search",
         query: "trousers"
    });
</script>
```

### navigation
```html
<script>
    factfinder.communication.EventAggregator.addFFEvent({
        type: "navigation",
        // This defines how many pages with the first fetch to the service should be retrieved.(default is 2)
        firstFetch: <firstFetch:Number>,
        // This defines how many pages per fetch after the first one should be retrieved.(min/default is 1)
        fetchSize: <fetchSize:Number>,
        // This defines up to which page the pages should be fetched.(max/default is 10)
        maxFetch: <maxFetch:Number>,
        // This defines the delay in milliseconds between each fetch. (default is 0, this means right after the data is received the next fetch call will be executed)
        fetchTime: <fetchTime:Number>
    });

    /**
     *  EXAMPLE:
     *
     *  This will trigger the navigation fetch mechanism where 4 calls will be executed.
     *  Call 1: retrieve page 1-3
     *  Wait: 100ms
     *  Call 2: retrieve page 4+5
     *  Wait: 100ms
     *  Call 3: retrieve page 6+7
     *  Wait: 100ms
     *  Call 4: retrieve page 8
     *
     */
    factfinder.communication.EventAggregator.addFFEvent({
        type: "navigation",
        firstFetch: 3,
        fetchSize: 2,
        maxFetch: 8,
        fetchTime: 100
    });
</script>
```

### filter
```html
<script>
    factfinder.communication.EventAggregator.addFFEvent({
        type: "filter",
        groupName: <groupName:String>,
        filterName: <filterName:String>
    });

    factfinder.communication.EventAggregator.addFFEvent({
        type: "filter",
        groupName: "Gender",
        filterName: "Female"
    });
</script>
```

### breadcrumb trail
```html
<script>
    scope.communication.EventAggregator.addFFEvent({
        type: "bct",
        value: <bctItem.value:String>
    });

    scope.communication.EventAggregator.addFFEvent({
        type: "bct",
        value: "arcteryx"
    });
</script>
```

### suggest
```html
<script>
    factfinder.communication.EventAggregator.addFFEvent({
        type: "suggest",
        query: <currentInput:String>
    });

    factfinder.communication.EventAggregator.addFFEvent({
        type: "suggest",
        query: "tro"
    });
</script>
```

### sort
```html
<script>
    factfinder.communication.EventAggregator.addFFEvent({
        type: "sort",
        value: <sortItem.description>
    });

    // NOTE the corresponding supplied value has to match your FACT-Finder configuration.
    // If you want to change the available values/options, change the options in the FACT-Finder UI.
    factfinder.communication.EventAggregator.addFFEvent({
        type: "sort",
        value: "Title A-Z"
    });
</script>
```

### products per page
```html
<script>
    factfinder.communication.EventAggregator.addFFEvent({
                type: "ppp",
                value: < productsPerPageItem.value >
    });

    // NOTE the corresponding supplied value has to match your FACT-Finder configuration.
    // If you want to change the available values/options, change the options in the FACT-Finder UI.
    factfinder.communication.EventAggregator.addFFEvent({
        type: "ppp",
        value: 36
    });
</script>
```

### paging
```html
<script>
    factfinder.communication.EventAggregator.addFFEvent({
        type: "paging",
        number: <productsPerPageItem.number>
    });

    factfinder.communication.EventAggregator.addFFEvent({
        type: "paging",
        number: 3
    });
</script>
```

### recommendation
```html
<script>
    factfinder.communication.EventAggregator.addFFEvent({
        type: "recommendation:" + <randomString:String>,
        id: <recordIds:String>
        maxResults: <maxResults:Number>
    });

    factfinder.communication.EventAggregator.addFFEvent({
        type: "recommendation:" + "xy21dfQ",
        id: "123456",
        maxResults: 5
    });

</script>
```

### productCampaign
```html
<script>
    factfinder.communication.EventAggregator.addFFEvent({
        type: "productCampaign",
        productNumber: <recordId:String>
    });

    factfinder.communication.EventAggregator.addFFEvent({
         type: "productCampaign",
         productNumber: "1234"
    });
</script>
```

### shoppingCartCampaign
```html
<script>
    factfinder.communication.EventAggregator.addFFEvent({
        type: "shoppingCartCampaign",
        productNumber: <recordId:String>
    });

    factfinder.communication.EventAggregator.addFFEvent({
        type: "shoppingCartCampaign",
        productNumber: "1234"
    });
</script>
```

### similarProducts
```html
<script>
    factfinder.communication.EventAggregator.addFFEvent({
        type: "similarProducts",
        id: <recordId:String>,
        maxResults: <maxResults:Number>
    });

    factfinder.communication.EventAggregator.addFFEvent({
        type: "similarProducts",
        id: "1234",
        maxResults: 5
    });
</script>
```

### advisor
```html
<script>
    factfinder.communication.EventAggregator.addFFEvent({
        type: "search",
        query: "trousers"
    });
</script>
```

### pageCampaigns
```html
<script>
    factfinder.communication.EventAggregator.addFFEvent({
        type: "pageCampaigns",
        pageId: <pageId:String>
    });

    factfinder.communication.EventAggregator.addFFEvent({
        type: "pageCampaigns",
        pageId: "home_landing_page"
    });
</script>
```

### compare
```html
<script>
    factfinder.communication.EventAggregator.addFFEvent({
        type: "compare:" + <randomString:String>,
        ids: <recordIds:String>,
        maxResults: <maxResults:Number>
    });

    factfinder.communication.EventAggregator.addFFEvent({
        type: "compare:" + "aqjn5Xf1",
        ids: "123,456,789",
        maxResults: 4
    });
</script>
```

### tagCloud
```html
<script>
    factfinder.communication.EventAggregator.addFFEvent({
        type: "tagCloud",
        wordCount: <wordCount:Number>
    });


    factfinder.communication.EventAggregator.addFFEvent({
        type: "tagCloud",
        wordCount: 15
    });
</script>
```



