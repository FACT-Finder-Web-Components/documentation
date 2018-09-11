## Tracking with JavaScript

Instead of using the built-in tracking you are also able to use our
JavaScript-API to send your tracking events.

First of all you will need to instantiate a new tracking object:
```Javascript
const track = new factfinder.communication.Tracking12();
```

The class `Tracking12` contains the relevant tracking methods all of which
take one object as a parameter. The following paragraphs describe the
minimum necessary properties that the object needs to contain.

```Javascript
const event = {
    sid : 'session1',
    id : '123',
    query : 'ring',
    pos : '2',
    origPos : '5',
    page : '1',
    pageSize : '25',
    origPageSize : '25'
};

track.click(event);
```

### Click

#### Required Information

| name         	| info 	                                                                                            |
|--------------	|-------------------------------------------------------------------------------------------------- |
| id           	| product identifier	                                                                            |
| sid          	| the user’s session identifier	                                                                    |
| query        	| The search term            	                                                                    |
| pos          	| The position of the product in the search results.    	                                        |
| origPos      	| FACT-Finder returns this value in a field (default: `__ORIG_POSITION__`) in the search result.    |
| page         	| The number of the search result page the product was displayed on                                 |
| origPageSize 	| The default number of products per search result page                                          	|

### Cart

#### Required Information

| name         	| info 	                        |
|--------------	|------------------------------	|
| id           	| product identifier            |
| sid          	| the user’s session identifier	|
| count        	| Quantity of product        	|

### Checkout

#### Required Information

| name         	| info 	                        |
|--------------	|------------------------------	|
| id           	| product identifier            |
| sid          	| the user’s session identifier	|
| count        	| Quantity of product        	|

### Login

#### Required Information

| name         	| info 	                        |
|--------------	|------------------------------	|
| userId        | user identifier            	|
| sid          	| the user’s session identifier	|

### Recommendation Click

#### Required Information

| name         	| info 	                                                            |
|--------------	|------------------------------------------------------------------	|
| id           	| product identifier                 	                            |
| sid          	| the user’s session identifier     	                            |
| mainId       	| ID of the article for which the clicked article was recommended   |

### Search Feedback

#### Required Information

| name         	| info 	                                            |
|--------------	|--------------------------------------------------	|
| id           	| product identifier     	                        |
| sid          	| the user’s session identifier    	                |
| query       	| The search term                	                |
| positive     	| `boolean` Did the customer give positive feedback	|

