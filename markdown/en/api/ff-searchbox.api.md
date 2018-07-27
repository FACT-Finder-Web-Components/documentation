## `ff-searchbox`
___
### Properties
| Name | Description |
| ---- | ----------- |
|**suggest-onfocus**&nbsp;(String) **Options**: &nbsp;true, &nbsp;false (default: false)| If this property is set to true a FACT-Finder Suggest recommendation is displayed as soon as the search box is in focus.|
|**hidesuggest-onblur**&nbsp; (String) **Options**: &nbsp;true, &nbsp;false (default: true)| Determines if Suggest recommendations are hidden as soon as the cursor leaves the input field. This property is intended for development and styling purposes.|
|**select-onclick**&nbsp;(String) **Options**: &nbsp;true, &nbsp;false (default: false)| Determines if the contents of the search box should be selected if the inside of the box is clicked.|
|**use-suggest**&nbsp;(String) **Options**: &nbsp;true, &nbsp;false (default: false)| Determines if a request should be sent to the suggest interface as soon as a user starts typing in a search term.|
|**suggest-delay** &nbsp;(Number) (default: 0) | Triggers a suggest request only after the delay expired and no more input is set. When the input field changes in the delay time frame the delay will be reset.|

### Events
| Name | Description |
| ---- | ----------- |
|**before-search**| Is triggered by a search and sends the current search event object. This way the object can be edited prior to the search, e.g. in order to send additonal URL parameters.|

### Methods
| Name | Description |
| ---- | ----------- |
|**search**| Initializes a search.|

## `ff-searchbutton`
___


## `ff-communication`
___
### Properties
| Name | Description |
|----|-----------|
| **url**&nbsp;(String)(default: empty) | Your FACT-Finder URL. Please note that the url has to contain the FACT-Finder context name like: http://web-components.fact-finder.de/FACT-Finder-7.2/|
| **version**&nbsp;(String) (default: empty) | Your FACT-Finder version. Only major and minor version like "7.2"|
| **channel**&nbsp;(String) (default: empty)| Your channel name. Has to be the same as the channel name configured in the FACT-Finder backend.|
| **search-immediate**&nbsp;(Boolean) | If this property is present, web components will start searching as soon as they are loaded.|
| **use-url-parameter**&nbsp;(String) **Options**: &nbsp;true, &nbsp;false (default: true)| If set to true, the http parameter of the current serach are pushed to the browser url.|
| **use-cache**&nbsp;(String) **Options**: &nbsp;true, &nbsp;false (default: false)| This value determines, if the browser should cache previous search requests or not. Some browsers support this feature and therefore speed up the search for repeated requests.|
| **default-query**&nbsp; (String) (default: '*') | Determines which search term should is used by default if no search term provided in as http parameter or in a search event object.|
| **only-search-params**&nbsp;(Boolean) | If present, parameters like 'channel' and 'sid' are omitted in the url. Can be used in conjunction with 'parameter-whitelist'.|
| **parameter-whitelist**&nbsp; (String) (default: '') | If url parameters are omitted through other attributes like use-url-parameter="false" or only-search-params you can add specific important parameters manually. Just use a comma separated list like: parameter-whitelist="param1=someValue,myParam=true" |
| **default-query**&nbsp; (String) (default: '') | As soon as this attribute is set, a Login tracking request is sent to FACT-Finder. |
| **add-params**&nbsp;(String) (default: empty)| With this property you can deliver standard parameters which will then be attached to the search request. Example: add-params="param1=abcd,param2=xyz"|
| **add-tracking-params**&nbsp;(String) (default: empty)| With this property you can deliver standard parameters which are attached to every tracking request. Example: add-tracking-params="param1=abcd,param2=xyz"|
| **keep-filters**&nbsp;(String) **Options**: &nbsp;true, &nbsp;false (default: false)| With this property you can determine, if filters which where set before the search (e.g. via ASN) should be kept or discarded.|
| **keep-url-params**&nbsp;(String) (default: empty)| Determines if parameters which are written into the URL should be kept.|
| **use-asn**&nbsp;(String) **Options**: &nbsp;true, &nbsp;false (default: true)| Determines if the the ASN is returned. Can be set to false to save performance, if the ASN is not required.|
| **use-found-words**&nbsp;(Boolean) **Options**: &nbsp;true, &nbsp;false (default: false)| For found records, FACT-Finder is capable of returning the words which lead to the find. The determination of these words costs performance. It is therefore deactivated by default. true = words are created, false = words are not created. Default is false.|
| **use-campaigns**&nbsp;(Boolean) **Options**: &nbsp;true, &nbsp;false (default: true)| Use this parameter, if you want to prevent the campaign manager from checking if there is a campaign for this search request. true = campaigns are analyzed and returned, , false = campaigns are ignored.|
| **generate-advisor-tree**&nbsp;(Boolean) **Options**: &nbsp;true, &nbsp;false (default: false)| Is used with advisor campaigns. Please refer the campaign manager documentation. true = the whole question-answer-tree is returned with the advisor campaign, false = only the currently active questions and their answers are returned. Default is false.|
| **disable-cache**&nbsp;(Boolean) **Options**: &nbsp;true,&nbsp;false (default: false)| Controlls the usage of search result caches. true = cache is ignored, false cache is used. Default is false.|
| **use-personalization**&nbsp;(Boolean) **Options**: &nbsp;true, &nbsp;false (default: true)| Allows activating/deactivating of request personalization. true = the search result is personalized if the personalization module is active and all other requirements are met; false = the search result is not personalized. Default is true.|
| **use-semantic-enhancer**&nbsp;(Boolean) **Options**: &nbsp;true, &nbsp;false (default: true)| Allows activating/deactivating of the semantic enrichment of requests. true = the search result is semantically enriched if the enhaced module is activated and all other requirements are met, false = the search result is not semantically enriched. Default value is true.|
| **use-aso**&nbsp;(Boolean) **Options**: &nbsp;true, &nbsp;false (default: true)| Allows activating/deactivating of automated search optimization. true = the search result is automatically optimized. false = the search result is not optimized. Default is true.|
| **use-browser-history**&nbsp;(Boolean) **Options**: &nbsp;true, &nbsp;false (default: true)| If set to true, the search history is pushed to the browser history, even without using url parameter.|
| **sid**&nbsp;(String) **any** | If set, the value provided in this property is used in every request as FACT-Finder session id parameter (sid).|
| **use-seo**&nbsp;(String) **Options**: &nbsp;true, &nbsp;false (default: false)|If set to true, Web Components will use the FACT-Finder SEO API. Set this only to true if the module is active in FACT-Finder.|
| **seo-prefix**&nbsp;(String)| The seo-prefix is used to show a piece of path between your domain the actual seo-path. E.g. domain.com/prefix/seoPath|
| **search-url**&nbsp;(String)| Define a custom url for the Search Service. Example: `search-url="http://www.myproxy.de/services"` Omit the `Search.ff` in the url.|
| **suggest-url**&nbsp;(String)| Define a custom url for the Suggest Service. Example: `suggest-url="http://www.myproxy.de/services"` Omit the `Suggest.ff` in the url.|
| **recommendation-url**&nbsp;(String)| Define a custom url for the Recommender Service. Example: `recommendation-url="http://www.myproxy.de/services"` Omit the `Recommender.ff` in the url.|
| **tag-cloud-url**&nbsp;(String) | Define a custom url for the TagCloud Service. Example: `tag-cloud-url="http://www.myproxy.de/services"` Omit the `TagCloud.ff` in the url.|
| **tracking-url**&nbsp;(String) | Define a custom url for the Tracking Service. Example: `tracking-url="http://www.myproxy.de/services"` Omit the `Tracking.ff` in the url.|
| **campaign-url**&nbsp;(String) | Define a custom url for the ProductCampaign Service. Example: `campaign-url="http://www.myproxy.de/services"` Omit the `ProductCampaign.ff` in the url.|
| **compare-url**&nbsp;(String) | Define a custom url for the Compare Service. Example: `compare-url="http://www.myproxy.de/services"` Omit the `Compare.ff` in the url.|
| **similar-records-url**&nbsp;(String) | Define a custom url for the SimilarRecords.ff Service. Example: `similar-records-url="http://www.myproxy.de/services"` Omit the `SimilarRecords.ff` in the url.|
| **get-records-url**&nbsp;(String) | Define a custom url for the records api Service. Example: `get-records-url="http://www.myproxy.de/services"`|
| **ignore-page**&nbsp;(String) **Options**: &nbsp;false, &nbsp;false (default: false) | If you want to omit the page parameter on pagination requests just set this attribute to true. Normally you want to use this attribute in conjunction with the ff-record-list lazy-load functionality. |
| **currency-code**&nbsp;(String) | [Currency Guide](/guides/currency-guide) |
| **currency-country-code**&nbsp;(String) | [Currency Guide](/guides/currency-guide) |
| **currency-fields**&nbsp;(String) | [Currency Guide](/guides/currency-guide) |
| **currency-min-digits**&nbsp;(String) | [Currency Guide](/guides/currency-guide) |
| **currency-max-digits**&nbsp;(String) | [Currency Guide](/guides/currency-guide) |
| **add-unit-to-filter-elements**&nbsp;(String) | [Currency Guide](/guides/currency-guide) |
| **disable-single-hit-redirect**&nbsp;(String) **Options**: &nbsp;true, &nbsp;false (default: false) | Disables the automatic redirect to the product detail page if only one record is found |
| **single-hit-redirect-base-path**&nbsp;(String) | Use this as an absolute base path if deeplinks are relative |
| **sort-url-parameters-alphabetically**&nbsp;(String) **Options**: &nbsp;true, &nbsp;false (default: false) | sorts all query parameters and its values alphabetically |
| **async-facets**&nbsp;(Boolean) | If facets are rendered before products you can use this attribute to postpone the facet rendering until products are rendered properly |
| **use-filter-url**&nbsp;(String) **Options**: &nbsp;true, &nbsp;false (default: false) | Push categoryPath to url path |
| **filter-url-prefix**&nbsp;(String) | Prefix use-filter-url e.g. filter-url-prefix="categories" -> shop.com/categories/cat1/cat2?query=...  |