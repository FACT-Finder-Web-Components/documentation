## `ff-communication`
___
### Properties

_(`*` - required, `†` - conditionally required)_

| Name | Description |
|----|-----------|
| **url**`*`&nbsp;(String) | **(Should always be defined first)** Your FactFinder URL. Please note that the URL has to contain the FactFinder context name like: `https://web-components.fact-finder.de/FACT-Finder` |
| **version**`*`&nbsp;(String) | **(Should always be defined second)** Your FactFinder version. Only major and minor version like `ng` or `7.3`. |
| **api**`†`&nbsp;(String) | **(Should always be defined third)** Only relevant when `version="ng"`. The version of your FactFinder NG REST API. Allowed values are `v5`, `v4`, `v3` and `v2`. |
| **channel**`*`&nbsp;(String) | **(Should always be defined fourth)** Your channel name. Has to be the same as the channel name configured in the FactFinder backend. |
| **search-immediate**&nbsp;(Boolean) | If this property is present, FactFinder Web Components will start searching as soon as they are loaded. For this to work, a `default-query` needs to be set with a correct value or to be not set at all (see `default-query` description). |
| **use-url-parameters**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "true") | If set to false, FactFinder parameters are not pushed to the URL unless explicitly whitelisted. Note that this attribute has no effect when `only-search-params` is set. |
| **default-query**&nbsp; (String) (default: '*') | Whenever a search is performed without a search query, this value will be used as default search term. This attribute will not accept empty or whitespace-only strings as its value. |
| **only-search-params**&nbsp;(Boolean) | If set, only current search related parameters are pushed to the URL, i.e. `query`, `filter`, `sort`, `page` and `productsPerPage`. This can be used in conjunction with `parameter-whitelist`. Note that setting this attribute overrides the behavior of `use-url-parameters`. |
| **parameter-whitelist**&nbsp; (String) (default: '') | Comma separated values; if set, only specified parameters are pushed to the URL. E.g. `parameter-whitelist="query,page"`. |
| **category-page**&nbsp;(String)&nbsp;(default: empty) | Only relevant when `version="ng"`. _The parameter string has to be URL-plus-encoded._ Takes a filter string for a category that shall not be removable by users. Required to implement [Category Pages](/documentation/4.x/category-pages). |
| **add-params**&nbsp;(String)&nbsp;(default: empty) | _The parameter string has to be URL-plus-encoded._ With this property you can deliver standard parameters which will then be attached to the search request. Example: `add-params="param1=abcd,param2=xyz"` |
| **add-tracking-params**&nbsp;(String)&nbsp;(default: empty) | With this property you can deliver standard parameters, which are attached to every tracking request. Example: `add-tracking-params="param1=abcd,param2=xyz"` |
| **keep-filters**&nbsp;(Boolean) **Options**: &nbsp;true, &nbsp;false (default: false) | With this property you can determine, if filters, which were set before the search (e.g. via ASN), should be kept or discarded. |
| **keep-url-params**&nbsp;(String)&nbsp;(default: empty) | Comma separated values; specifies the URL parameters that should be included in requests to FactFinder. If this is set to `all`, every URL parameter will be used. *This is particularly useful if you want to keep your own custom URL parameters whilst hiding the FactFinder URL parameters with* `use-url-parameters="false"` |
| **use-asn**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "true") | Determines if the the ASN is returned. Can be set to `"false"` to increase performance, if the ASN is not required. |
| **use-found-words**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "false") | FactFinder is capable of returning the words which lead to finding a set of records. The determination of these words is performance heavy. It is therefore deactivated by default. true = words are created, false = words are not created. |
| **use-campaigns**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "true") | Use this parameter, if you want to prevent the campaign manager from checking if there is a campaign for this search request. true = campaigns are analyzed and returned, , false = campaigns are ignored. |
| **generate-advisor-tree**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "false") | Is used with "advisor campaigns". Please refer to the campaign manager documentation. true = the whole question-answer-tree is returned with the advisor campaign, false = only the currently active questions and their answers are returned. |
| **disable-cache**&nbsp;(String) **Options**: &nbsp;"true",&nbsp;"false" (default: "false") | Controls the usage of search result caches. true = cache is ignored, false cache is used. |
| **use-personalization**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "true") | Allows activating/deactivating of request personalization. true = the search result is personalized if the personalization module is active and all other requirements are met; false = the search result is not personalized. |
| **use-semantic-enhancer**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "true") | Allows activating/deactivating of the semantic enrichment of requests. true = the search result is semantically enriched if the enhanced module is activated and all other requirements are met, false = the search result is not semantically enriched. |
| **use-aso**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "true") | Allows activating/deactivating of automated search optimization. true = the search result is automatically optimized. false = the search result is not optimized. |
| **use-browser-history**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "true")| If set to true, the search history is pushed to the browser history, even without using URL parameter. |
| **user-id**&nbsp;(String) (default: '') | As soon as this attribute is set, a login tracking request is sent to FactFinder. The `user-id` is then added to all requests that accept it. (The use of this attribute is **no longer recommended**. See better approach at [Login Tracking](/documentation/4.x/login-tracking)) |
| **purchaser-id**&nbsp;(String) (default: empty) | The purchaser ID is for Customer Specific Pricing and is added to all requests to FactFinder that support it. |
| **market-id**&nbsp;(String) (default: empty) | Comma separated values; only show products that have values for these market IDs. |
| **sid**&nbsp;(String) | A session identifier used in every request sent to FactFinder. We recommend not to set this attribute manually as it is generated automatically by Web Components. If for some reason you have to overwrite it, please note that it must be **exactly 30 characters long**. |
| **use-seo**&nbsp;(String)**Options**: &nbsp;"true", &nbsp;"false" (default: "false") |If set to true, FactFinder Web Components will use the FactFinder SEO API. Set this only to true if the module is active in FactFinder. |
| **seo-prefix**&nbsp;(String)&nbsp;(default: "") | The seo-prefix is used to show a piece of path between your domain the actual seo-path. E.g. domain.com/prefix/seoPath |
| **search-url**&nbsp;(String) | Define a custom URL for the Search Service. Example: `search-url="http://www.myproxy.de/services"` Omit the `Search.ff` in the url. |
| **suggest-url**&nbsp;(String) | Define a custom URL for the Suggest Service. Example: `suggest-url="http://www.myproxy.de/services"` Omit the `Suggest.ff` in the URL. |
| **recommendation-url**&nbsp;(String) | Define a custom URL for the Recommender Service. Example: `recommendation-url="http://www.myproxy.de/services"` Omit the `Recommender.ff` in the URL. |
| **tag-cloud-url**&nbsp;(String) | Define a custom URL for the TagCloud Service. Example: `tag-cloud-url="http://www.myproxy.de/services"` Omit the `TagCloud.ff` in the URL. |
| **tracking-url**&nbsp;(String) | Define a custom URL for the Tracking Service. Example: `tracking-url="http://www.myproxy.de/services"` Omit the `Tracking.ff` in the URL. |
| **campaign-url**&nbsp;(String) | Define a custom URL for the ProductCampaign Service. Example: `campaign-url="http://www.myproxy.de/services"` Omit the `ProductCampaign.ff` in the URL. |
| **compare-url**&nbsp;(String) | Define a custom URL for the Compare Service. Example: `compare-url="http://www.myproxy.de/services"` Omit the `Compare.ff` in the URL. |
| **similar-records-url**&nbsp;(String) | Define a custom URL for the SimilarRecords.ff Service. Example: `similar-records-url="http://www.myproxy.de/services"` Omit the `SimilarRecords.ff` in the URL. |
| **get-records-url**&nbsp;(String) | Define a custom URL for the records API Service. Example: `get-records-url="http://www.myproxy.de/services"` |
| **ignore-page**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "false") | If you want to omit the page parameter on pagination requests just set this attribute to true. Normally you want to use this attribute in conjunction with the `ff-record-list` `lazy-load` functionality. |
| **currency-code**&nbsp;(String) | [Currency Guide](/documentation/4.x/currency-guide) |
| **currency-country-code**&nbsp;(String) | [Currency Guide](/documentation/4.x/currency-guide) |
| **currency-fields**&nbsp;(String) | [Currency Guide](/documentation/4.x/currency-guide) |
| **currency-min-digits**&nbsp;(String) | [Currency Guide](/documentation/4.x/currency-guide) |
| **currency-max-digits**&nbsp;(String) | [Currency Guide](/documentation/4.x/currency-guide) |
| **add-unit-to-filter-elements**&nbsp;(Boolean) `true` if present, else `false` | [Currency Guide](/documentation/4.x/currency-guide) |
| **sort-url-parameters-alphabetically**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "false") | Sorts all query parameters and their values alphabetically. _This can be used for SEO._ |
| **use-filter-url**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "false") | Push `categoryPath` to URL path |
| **filter-url-prefix**&nbsp;(String) (default: "") | Prefix `use-filter-url` e.g. `filter-url-prefix="categories"` -> `www.myshop.com/categories/cat1/cat2?query=...`  |
| **mustache-delimiters**&nbsp;(String) (default: "{{,}}") | Delimiters used by mustache.js [template engine](/documentation/4.x/template-engine), separated by a comma |

### Events
| Name | Description |
| ---- | ----------- |
| **ffCommunicationReady** | Emitted on the `document` object once `ff-communication` connects to the DOM. The `event` object passed to the event handler has property `factfinder` (same as global reference) and function `searchImmediate` (to manually invoke the search request that would otherwise be triggered by the `search-immediate` attribute). |
