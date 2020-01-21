## `ff-communication`
___
### Properties
| Name | Description |
|----|-----------|
| **url**&nbsp;(String) &nbsp;(default: empty) | Your FACT-Finder URL. Please note that the URL has to contain the FACT-Finder context name like: http://web-components.fact-finder.de/FACT-Finder-7.2/ |
| **version**&nbsp;(String)&nbsp;(default: 7.2) | Your FACT-Finder version. Only major and minor version like "7.2" |
| **channel**&nbsp;(String)&nbsp;(default: empty) | Your channel name. Has to be the same as the channel name configured in the FACT-Finder backend. |
| **search-immediate**&nbsp;(Boolean) | If this property is present, FACT-Finder Web Components will start searching as soon as they are loaded. |
| **use-url-parameter**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "true") | If set to false, FACT-Finder parameters are not pushed to the URL unless explicitly whitelisted. Note that this attribute has no effect when `only-search-params` is set. |
| **use-cache**&nbsp;(Boolean) **Options**: &nbsp;true, &nbsp;false (default: false)| This value determines, if the browser should cache previous search requests or not. Some browsers support this feature and therefore speed up the search for repeated requests. |
| **default-query**&nbsp; (String) (default: '*') | Determines which search term should is used by default if no search term provided in as http parameter or in a search event object. |
| **only-search-params**&nbsp;(Boolean) | If set, only current search related parameters are pushed to the URL, i.e. `query`, `filter`, `sort`, `page` and `productsPerPage`. This can be used in conjunction with `parameter-whitelist`. Note that setting this attribute overrides the behaviour of `use-url-parameter`. |
| **parameter-whitelist**&nbsp; (String) (default: '') | Comma separated values; if set, only specified parameters are pushed to the URL. E.g. `parameter-whitelist="query,page"`. |
| **default-query**&nbsp; (String) (default: '') | As soon as this attribute is set, a Login tracking request is sent to FACT-Finder. |
| **add-params**&nbsp;(String)&nbsp;(default: empty) | _The parameter string has to be URL-encoded._ With this property you can deliver standard parameters which will then be attached to the search request. Example: `add-params="param1=abcd,param2=xyz"` |
| **add-tracking-params**&nbsp;(String)&nbsp;(default: empty) | With this property you can deliver standard parameters, which are attached to every tracking request. Example: `add-tracking-params="param1=abcd,param2=xyz"` |
| **keep-filters**&nbsp;(Boolean) **Options**: &nbsp;true, &nbsp;false (default: false) | With this property you can determine, if filters, which were set before the search (e.g. via ASN), should be kept or discarded. |
| **keep-url-params**&nbsp;(String)&nbsp;(default: empty) | Comma separated values; specifies the URL parameters that should be included in requests to FACT-Finder. If this is set to `all`, every URL parameter will be used. *This is particularly useful if you want to keep your own custom URL parameters whilst hiding the FACT-Finder URL parameters with* `use-url-parameter="false"` |
| **use-asn**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "true") | Determines if the the ASN is returned. Can be set to `"false"` to increase performance, if the ASN is not required. |
| **use-found-words**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "false") | FACT-Finder is capable of returning the words which lead to finding a set of records. The determination of these words is performance heavy. It is therefore deactivated by default. true = words are created, false = words are not created. |
| **use-campaigns**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "true") | Use this parameter, if you want to prevent the campaign manager from checking if there is a campaign for this search request. true = campaigns are analyzed and returned, , false = campaigns are ignored. |
| **generate-advisor-tree**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "false") | Is used with "advisor campaigns". Please refer to the campaign manager documentation. true = the whole question-answer-tree is returned with the advisor campaign, false = only the currently active questions and their answers are returned. |
| **disable-cache**&nbsp;(String) **Options**: &nbsp;"true",&nbsp;"false" (default: "false") | Controls the usage of search result caches. true = cache is ignored, false cache is used. |
| **use-personalization**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "true") | Allows activating/deactivating of request personalization. true = the search result is personalized if the personalization module is active and all other requirements are met; false = the search result is not personalized. |
| **use-semantic-enhancer**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "true") | Allows activating/deactivating of the semantic enrichment of requests. true = the search result is semantically enriched if the enhanced module is activated and all other requirements are met, false = the search result is not semantically enriched. |
| **use-aso**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "true") | Allows activating/deactivating of automated search optimization. true = the search result is automatically optimized. false = the search result is not optimized. |
| **use-browser-history**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "true")| If set to true, the search history is pushed to the browser history, even without using URL parameter. |
| **sid**&nbsp;(String) **any** | If set, the value provided in this property is used in every request as FACT-Finder session id parameter (sid). |
| **use-seo**&nbsp;(String)**Options**: &nbsp;"true", &nbsp;"false" (default: "false") |If set to true, FACT-Finder Web Components will use the FACT-Finder SEO API. Set this only to true if the module is active in FACT-Finder. |
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
| **currency-code**&nbsp;(String) | [Currency Guide](/documentation/3.x/currency-guide) |
| **currency-country-code**&nbsp;(String) | [Currency Guide](/documentation/3.x/currency-guide) |
| **currency-fields**&nbsp;(String) | [Currency Guide](/documentation/3.x/currency-guide) |
| **currency-min-digits**&nbsp;(String) | [Currency Guide](/documentation/3.x/currency-guide) |
| **currency-max-digits**&nbsp;(String) | [Currency Guide](/documentation/3.x/currency-guide) |
| **add-unit-to-filter-elements**&nbsp;(Boolean) `true` if present, else `false` | [Currency Guide](/documentation/3.x/currency-guide) |
| **disable-single-hit-redirect**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "false") | Disables the automatic redirect to the product detail page if only one record is found |
| **single-hit-redirect-base-path**&nbsp;(String) | Use this as an absolute base path if deeplinks are relative |
| **sort-url-parameters-alphabetically**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "false") | Sorts all query parameters and their values alphabetically. _This can be used for SEO._ |
| **use-filter-url**&nbsp;(String) **Options**: &nbsp;"true", &nbsp;"false" (default: "false") | Push `categoryPath` to URL path |
| **filter-url-prefix**&nbsp;(String) (default: "") | Prefix `use-filter-url` e.g. `filter-url-prefix="categories"` -> `www.myshop.com/categories/cat1/cat2?query=...`  |
| **mustache-delimiters**&nbsp;(String) (default: "{{,}}") | Delimiters used by mustache.js [template engine](/documentation/3.x/template-engine), separated by a comma |
