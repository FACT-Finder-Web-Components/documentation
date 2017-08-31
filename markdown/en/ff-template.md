# Template 1
With an `ff-template` element you can see how the data binding for the ff-webcomponents works and use a model to update the view.

Set a **data** object for a template to store your data. With the "**{{}}**" mustache syntax you can access the data inside of that object:

```html
<script>
    function setTemplate1() {
        var template1 = document.querySelector("#demoTemplate1");
        template1.data = {test: "This is my Test Data"};
    }
</script>
<p>Set simple data into a Template</p>
<button onclick="setTemplate1()">Set simple Data</button>
<ff-template id="demoTemplate1">
    {{test}}
</ff-template>
```

# Template 2
You can also set a more complex model and access the data in it with the mustache syntax.

```html
<script>
    function setTemplate2() {
        var tmp = document.querySelector("#demoTemplate2");
        tmp.data = {
            product: {
                name:"Super awsome Product",
                description:"This Product is super awsome! Go buy it!",
                info:{
                    rating:5,
                    price: 100,
                    currency: "€"
                }
            }
        };
    }
</script>
<p>Set complex data into a Template</p>
<button onclick="setTemplate2()">Set complex Data </button>
<ff-template id="demoTemplate2">
    <h2>Name: {{product.name}}</h2>
    <p>{{product.description}}</p>
    <strong>{{product.info.price}} {{product.info.currency}}</strong>
    <p>Rating: {{product.info.rating}}/5</p>

</ff-template>
```

# Template 3
If you have raw HTML in the data, e.g. configured in the FF-Backend as result for a campaign or campaign feedback, then you can let the renderer insert the raw html with 3 x { instead of 2 times.

```html
<script>
    function setTemplate3() {
        var tmp = document.querySelector("#demoTemplate3");
        tmp.data = {
            product: {
                name:"Super awsome Product",
                description:"This Product is super awsome! Go buy it!",
                info:{
                    rating:5,
                    price: 100,
                    currency: "€"
                },
                image: "<img src='' width='200' height='200'>"
            }
        };
    }
</script>
<p>Render HTML with a Template</p>
<button onclick="setTemplate3()">Set HTML Data</button>
<ff-template id="demoTemplate3">
    <h2>Name: {{product.name}}</h2>
    <p>{{product.description}}</p>
    <strong>{{product.info.price}} {{product.info.currency}}</strong>
    <p>Rating: {{product.info.rating}}/5</p>
    <!-- This prints the value of product.image as string-->
    {{product.image}}
    <!-- This renders the value of product.image as HTML-->
    {{{product.image}}}
</ff-template>
```

# Template 4
The `ff-template` element has the attribute 'scope'. When you set it to "result" the data inserted as a model for this template is the search result from a search request.

Configure the connection to the FF-Search backend and a default query.

```html
<ff-communication url="http://web-components.fact-finder.de/FACT-Finder7.1-Demoshop"
                  version="7.1"
                  default-query="tasche"
                  channel="bergfreunde-de"
                  search-immediate>
</ff-communication>
<p>Access the values in from the Searchresult</p>
<input is="ff-searchbox">
<button is="ff-searchbutton">Search</button>

<ff-template id="demoTemplate4" scope="result">
    <h2>Search Result:</h2>
    <p>resultCount: {{resultCount}}</p>
    <p>searchTime: {{searchTime}}</p>
</ff-template>
```