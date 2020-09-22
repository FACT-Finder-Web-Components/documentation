## Single Hit Redirect

As is mentioned in the `ff-communication` [API reference](/api/3.x/ff-communication#tab=api), the built-in single hit redirect feature, due to its limitations, is now deprecated and will be removed in a future release.
However, you are still able to implement a similar mechanism using the Core API.
By definition single hit redirect is a mechanism which redirects users to a record page only if they did an exact search i.e. asked for a specific product by providing its identifier.

The built-in mechanism checks the `resultArticleNumberStatus` property of the search result object in order to determine if the response contains only one record returned with 100% search similarity.
This level of similarity is only possible to achieve if the user searches for the product using its product number.
In most cases is the only one way to determine if an exact search took place.
Here is the full condition used in the built-in single hit redirect mechanism.
`result.resultArticleNumberStatus === 'resultsFound' && result.records && result.records.length === 1`

**NOTE** The value `resultsFound` is returned only when the user searched for a product by passing its product number as a search phrase.
Product number is the field which has the role `displayProductNumber`.
For more information about field roles, see [FieldRoles](/documentation/3.x/field-roles).
Although it is not necessary to check `result.resultArticleNumberStatus`, we highly recommend checking that value to avoid redirecting to a record that is not necessarily the one, the user was looking for.

```html
<script>
    document.addEventListener('ffReady', function () {
        factfinder.communication.ResultDispatcher.subscribe('result', function(result) {
            if (result.resultArticleNumberStatus === 'resultsFound' && result.records && result.records.length === 1) {
                const record = result.records[0].record;
                window.location.href = record.Deeplink; //field name might be different. Check your feed file 
            }       
        });
    });
</script> 
```
**NOTE** The example above is not a full solution. Please continue with the article for more insights into single hit redirect.


### NG compatibility
For Web Components versions up to `3.15.1`, the field `resultArticleNumberStatus` is not available when using FACT-Finder NG.
Please use `articleNumberSearch` instead.
Please keep in mind that this field stores boolean values. 

  ```javascript
 if (result.articleNumberSearch && result.records && result.records.length === 1) {
    //redirect user
}      
```

**NOTE** All other examples in this article use `resultArticleNumberStatus`. 


### Preventing redirection after getting back from record page
If `search-immediate` is enabled, users might find themselves in a situation where they are unable to go back to the search result page, as the single hit redirect will keep redirecting them to the record page.
In order to prevent this some information has to be stored and passed between documents. This information is intended to inform the single hit redirect mechanism to stop redirecting users when they got back from the record page they were just redirected to.
The easiest way to implement such a guard is to store a boolean flag after detecting an exact search.
This flag should be set or unset, depending on whether it is in the storage.

 ```javascript
 if (localStorage.getItem('ff_redirect_on') !== '0') {
    if (result.resultArticleNumberStatus === 'resultsFound' 
        && result.records 
        && result.records.length === 1) {
            localStorage.setItem('ff_redirect_on', 0); 
            // redirect user
    }   
} else {
    localStorage.setItem('ff_redirect_on', 1); 
}   
 ```

### Search from different locations
The solution above works in general, but it has one flaw which may have to be fine-tuned, especially if your application framework is dedicated to creating non-SPA applications.
Since the `ff_redirect_on` flag is already set to `0`, the next exact search will not be redirected.
This might not be desired behavior, because the next search might be called from the page the user is currently on.
Setting only one flag will not cover this case.
What could help is to set an additional value that stores which page the `ff_redirect_on` flag was set to `0`.
It can be used to only prevent redirection if the current location is identical to the one stored in this value.
The two locations being identical would mean that the user has returned to the previous page.
  
 ```javascript
if (localStorage.getItem('ff_redirect_referer') !== window.location.href) {
    localStorage.setItem('ff_redirect_referer', window.location.href);
} else {                    
    localStorage.setItem('ff_redirect_referer', undefined); 
}   
 ```

**NOTE** The above example uses `window.location.href`. It is a framework agnostic solution and may not work in more complicated cases. Please check the routing scope of the framework or libraries you are using to best adapt the algorithm to detect the return to the redirecting page.

Full example below.
Please keep in mind that on specific pages you might need to use different conditions in order to cover all edge cases.
The following script should be placed in every document the `ff-searchbox` element is used in.
 ```html
<script>
    document.addEventListener('ffReady', function () {
         factfinder.communication.ResultDispatcher.subscribe('result', function(result) {
            const redirectOn = localStorage.getItem('ff_redirect_on');
            const refererUrl = localStorage.getItem('ff_redirect_referer');

            if (redirectOn !== '0' || refererUrl !== window.location.href) {                 
                if (result.resultArticleNumberStatus === 'resultsFound' && result.records && result.records.length === 1) {
                    localStorage.setItem('ff_redirect_on', 0); 
                    localStorage.setItem('ff_redirect_referer', window.location.href);
                    const record = result.records[0].record;
                    window.location.href = record.Deeplink; //field name might be different. Check your feed file 
                }  
            } else {
                localStorage.setItem('ff_redirect_on', 1); 
                localStorage.setItem('ff_redirect_referer', undefined); 
            }   
        });
    });
</script> 
 ```
