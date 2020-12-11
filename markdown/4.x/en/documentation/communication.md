## Communication

---
By default, FACT-Finder Web Components are communicating directly with FACT-Finder. This is configured in the `ff-communication` element.

All actions and requests are performed automatically for you depending on the element that was
clicked.
This means for example if the user clicked a `ff-asn-group-element`, a filter action is executed. FACT-Finder Web Components are basically data driven.
They expect a service which is capable of understanding the FACT-Finder API invocations and returning the data like FACT-Finder would return it.
See the following image:

![Folie3.PNG](/images/kommunikation/Folie3_ng.PNG)

## Change the Communication Flow

---
In some situations you don't want FACT-Finder Web Components to communicate directly with FACT-Finder.
Enriching the product data with the latest stock might be one of these use cases.

In such a case you need to take care about some simple but important things.
You can configure FACT-Finder Web Components to communicate with your shop backend by changing the `url` attribute on the `ff-communication` element.

Please see the following image for a rough overview of communication:
![Folie1.PNG](/images/kommunikation/Folie1.PNG)

### Detailed Overview of Communication

---
The following image illustrates the five steps to erich search responses with the latest data from 3rd party services.
Steps marked in __orange__ are meant to be performed by the shop.
Steps in __blue__ are meant to be performed automatically by FACT-Finder Web Components.

![Folie2.PNG](/images/kommunikation/Folie2_ng.PNG)

#### 1. AJAX Request

When the user interacts with the search result page, AJAX requests are made at certain points.
These AJAX requests need to be made to the shop system.
Change the URL settings in the `ff-communication` element.

```html
<!-- Regular setup -->
<ff-communication url="https://your.factfinder.com/FACT-Finder">
</ff-communication>

<!-- Change the URL accordingly -->
<ff-communication url="https://your.shop-endpoint.com/optional-path">
</ff-communication>
```


#### 2. Forward the HTTP Request to FACT-Finder

The request made by FACT-Finder Web Components will look something like:
```
https://your.shop-endpoint.com/optional-path/rest/v4/search/shoeshop_en?query=shoe
```

The URL follows this pattern:

```
[protocol]://[domain + port]/[Optional-Path]/[REST-Endpoint]?[HTTP-Params]
```

Basically, all your shop system needs to do is replace everything before the `REST-Endpoint` with the original FACT-Finder URL.
Taking the URLs from step one the URL changes would look like this:

```
Client to shop system:
https://your.shop-endpoint.com/optional-path/rest/v4/search/shoeshop_en?query=shoe

Shop system to FACT-Finder:
https://your.factfinder.com/FACT-Finder/rest/v4/search/shoeshop_en?query=shoe
```

#### 3. Receive JSON Response

Next, your shop system issues the request to FACT-Finder and receives the data.

#### 4. Enrich JSON Response with additional Data

Let's say you want to add the latest stock to your received records. Consider the following response:

```json
{
  "hits": [
    {
      "foundWords": [],
      "id": "f2d296767b851bcf56074343a1a805a9",
      "masterValues": [],
      "position": 1,
      "score": 106.07055,
      "variantValues": [
        {
          "title": "Shoe A",
          "price": 199.90,
          "...": "..."
        }
      ]
    }
  ]
}
```

The `variantValues` list inside the `hits` list is the correct place to add the product specific data.
Retrieve the stock data from your data source and add it to the JSON response.
The result would look like this:

```json
{
  "hits": [
    {
      "foundWords": [],
      "id": "f2d296767b851bcf56074343a1a805a9",
      "masterValues": [],
      "position": 1,
      "score": 106.07055,
      "variantValues": [
        {
          "title": "Shoe A",
          "price": 199.90,
          "STOCK": 12,
          "...": "..."
        }
      ]
    }
  ]
}
```

#### 5. Return Data to FACT-Finder Web Components

You are done with manipulating the JSON response.
Lastly, send the data back to the client where you can integrate your enriched search response.
