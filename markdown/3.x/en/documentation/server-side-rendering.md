## Server Side Rendering

Server Side Rendering (SSR) is currently a trending technique, which means pre-rendering whole page HTML on a server side before sending it back to the client.
There is a couple of benefits from using that approach:
* HTML content is available for web browser crawlers for scanning which is important part of a SEO
* Unified performance, conditioned by the application server, not the used web browser

With SSR, an application server sends in response page viewable but not functional.
Then the client side part of the application render the HTML once again content, making it fully functional for the end user. 
In an opposite to SSR, stands CSR which is the standard way of running web applications.
With this approach, server returns raw HTML, often containing framework-specific tags, which should not been visible to the end user.
Then the client side part render for the first time, fully viewable page, but the rendered result is not available for scanning bots as they only scan the HTML returned by the server.
That might be an issue, where an application renders content critical from its point of view (e.g e-shop rendering products).
In that case web browsers will never index such application properly as they have no chance to detect what is the real and full page content. 
 
To ensure that users can properly promote their websites on the Internet, Web Components  element `ff-record-list` have been enhanced with the possibility of SSR.
The paragraphs below will show you how to implement SSR in your application.
Please keep in mind that the server side part is not full tutorial, just an set of hints.
The variety of technologies makes it impossible to fully describe step by step how to implement such a solution.  

### Server Side 
#### Sending Search Request
In order to render records at the server side, application needs to send a `search` request to FACT-Finder to get a records data it will work with.

#### Pre-rendering
With given response, you need to prepare a specific view object representing a page to be outputted. 
At this stage, records fetched from the FACT-Finder should be converted into `ff-record` elements.
To do so, you will need to use template engine which will hydrate raw template with a real data.
Web Components uses mustache.js [template engine](/documentation/3.x/template-engine) so you can use it server side counterpart.

Example libraries (whole list of libraries you can find at [mustache.github.io](https://mustache.github.io/)):
* java: https://github.com/spullara/mustache.java
* PHP: https://github.com/bobthecow/mustache.php

**Note**: You are not just limited to mustache. You can use any template engine, your platform supports. The advantage of using mustache here is that you can use the same templates as in with Web Components.  

#### Sending the response
Pre-rendered HTML should be returned in response to the browser. This step concludes the server side.
It does not exhaust the subject though.
`ff-record-list` in given form, should look the same as if it were rendered on client side, however is not fully interactive.
It should be considered as mock and should be replaced with the another instance - this time rendered by the Web Components.   

### Client Side
To implement SSR on the client side you have to adjust `ff-record-list`.
Set the `ssr` property of the `ff-record-list` element to true.
```html
 <ff-record-list ssr>
 <!-- put fully pre-rendered records here -->
 </ff-record-list>
```
Define the `ff-record` template which `ff-record-list` will use to rendering new records once it start to work.

**Note**: While using SSR, the outputted HTML for `ff-record` will not contain any `mustache.js` expressions hence it will not be able to be used to render new records. 
```html
    <template data-role="record">
        <!--put `ff-record` element template here  --->
    </template>
```  
Check the `ff-record-list` [Documentation](/api/3.x/ff-record-list#tab=docs) for more template details about its template.  

After doing this, you have just to trigger `search` event with the same query used on a server side.
You can achieve this either by using [EventAggregator](/api/3.x/core-event-aggregator) or by setting `search-immediate` attribute on `ff-communication`.
This will trigger `ff-record-list` to replace pre-rendered records with the actual ones. 
