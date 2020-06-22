## Single Hit Redirect

As is mentioned in `ff-communication` [API reference](/api/3.x/ff-communication#tab=api) built-in single hit redirect feature due to its limitation is now deprecated and will be removed in future releases.
However, user is still able to implement similar mechanism using Core API.
By definition single hit redirect is a mechanism which redirects user to record page only if he did the exact search i.e. asked for a specific product by providing its identifier.

Built-in mechanism checks the `resultArticleNumberStatus` property of search result object in order to determine if response contains only one record returned with 100% search similarity.
That level of similarity is only possible to achieve if user search for the product using its number which in most cases is the only one way to determine if exact search takes place. 
Here is the full condition used in built-in single hit redirect mechanism.
`result.resultArticleNumberStatus === 'resultsFound' && result.records && result.records.length === 1`

**NOTE** Value `resultFound` is returned only when user searches for a product by passing its number as a search phrase.
 Product number is the field which has a role `displayProductNumber`.
 For more information about field roles, see the [FieldRoles](/documentation/3.x/field-roles).
 Although it is not necessary to check the `result.resultArticleNumberStatus` we highly recommend checking that value to avoid redirecting to the record that is not necessarily the one, user was looking for.

```html
<script>
        document.addEventListener('ffReady', function () {
            factfinder.communication.ResultDispatcher.subscribe('result', function(result) {
                if (result.resultArticleNumberStatus === 'resultsFound' 
                    && result.records 
                    && result.records.length === 1) {
                        const record = result.records[0].record;
                        window.location.href = record.Deeplink; //field name might be different. Check your feed file 
                }       
        });
    });
</script> 
```
**NOTE**  Example above wil not working fully. Please continue with the article to learn more about the single hit redirect insights.


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
     if (factfinder.common.localStorage.getItem('ff_redirect_on') !== '0') {
        if (result.resultArticleNumberStatus === 'resultsFound' 
            && result.records 
            && result.records.length === 1) {
                factfinder.common.localStorage.setItem('ff_redirect_on', 0); 
                // redirect user
        }   
      } else {
            factfinder.common.localStorage.setItem('ff_redirect_on', 1); 
      }   
 ```

### Search from different locations
The solution above works in general, but it has one flaw which might be fine-tuned, especially if used application framework is dedicated for creating non-SPA applications.
Since `ff_redirect_on` flag is already set to `0`, next exact search will not be redirected.
This might not be desired behaviour, because next search might be called from the page user is currently on so setting only one flag will not cover this case.
What could help is to set an additional flag that says which page the `ff_redirect_on` flag was set to `0`, and to prevent redirection only if the current location is identical to the one stored in the warehouse, which means that the user has returned to the previous page.
  
 ```javascript
if (factfinder.common.localStorage.getItem('ff_redirect_referer') !== window.location.href) {
    factfinder.common.localStorage.setItem('ff_redirect_referer', window.location.href);
} else {                    
    factfinder.common.localStorage.setItem('ff_redirect_referer', undefined); 
}   
 ```

**NOTE** The above example uses `window.location.href`. It is a framework agnostic solution and may not work in more complicated cases. Please check the routing scope of the framework or libraries you are using to best adapt the algorithm to detect the return to the redirecting page.

Full example below.
Please keep in mind that on specific pages you might need to use different conditions in order to cover all edge cases.
That script should be placed in every document the `ff-searchbox` element is used in.
 ```html
 <script>
         document.addEventListener("WebComponentsReady", function () {
             factfinder.communication.ResultDispatcher.subscribe('result', function(result) {
                 if (factfinder.common.localStorage.getItem('ff_redirect_on') !== '0' 
                    || factfinder.common.localStorage.getItem('ff_redirect_referer') !== window.location.href) {
                        if (result.resultArticleNumberStatus === 'resultsFound' 
                                && result.records 
                                && result.records.length === 1) {
                                    factfinder.common.localStorage.setItem('ff_redirect_on', 0); 
                                    factfinder.common.localStorage.setItem('ff_redirect_referer', window.location.href);
                                    const record = result.records[0].record;
                                    window.location.href = record.Deeplink; //field name might be different. Check your feed file 
                          }   
                     } else {
                        factfinder.common.localStorage.setItem('ff_redirect_on', 1); 
                        factfinder.common.localStorage.setItem('ff_redirect_referer', undefined); 
                    }   
         });
     });
 </script> 
 ```
