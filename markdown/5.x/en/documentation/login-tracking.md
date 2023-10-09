## Login Tracking

---

This page discusses the **requirements** and **challenges** that need to be considered for a successful integration of login tracking with Web Components.
It also explores some options for the configuration.

The key parameter in login tracking is the shop visitor's **_user ID_** managed by your **shop system**.
When you configure Web Components with this _user ID_, it will be added to subsequent requests (e.g. _search_ or _recommendations_) to FACT-Finder which produces more **personalized results**.

> Hint
>
> It is good practice to anonymize the user ID for data protection.

**Requirements**:

- Your page must detect whether the user is logged in or not
- User ID must be passed to Web Components
- Login data must be cleared from browser when user logs out

**Challenges**:

- The login tracking request must happen before the first search request (`search-immediate`)
- Rendering the user ID directly into HTML is to be avoided for security reasons
- Keeping the login status of server and client in sync


### The building blocks

Some required parts depend on whether you configure Web Components through the `ff-communication` element or through JavaScript.
The following parts are required in **both** scenarios:

- `factfinder.communication.sessionManager.setLoginData(userId)`
  - Sets the `userId` on Web Components and `localStorage`, so it will be included in subsequent requests.
    On page load, Web Components will automatically try to read the `userId` from `localStorage`.
- `factfinder.communication.sessionManager.clearLoginData()`
  - Clears the `userId` from Web Components and `localStorage`.
- `factfinder.communication.sessionManager.clearAllSessionData()`
  - Clears login data and additionally the _session ID_.
- `factfinder.communication.Tracking.loginWithConfig()`
  - Sends a _login_ tracking request with the current Web Components configuration.

If you use `ff-communication`, you additionally need:

- `ffCommunicationReady` event

Integrations _without_ `ff-communication` use:

- `ffReady` event
- `factfinder.communication.EventAggregator.addFFEvent(event)`

Lastly, your _shop server_ has to keep track of the user's login status and pass the information to the client.
Typically, this happens through:

- browser cookies

or

- client-side AJAX requests

> Note
>
> We recommend the use of **cookies** because they are sooner available to the client than the results of AJAX requests.
> This enables you to send the initial search request earlier and reduces waiting times for the shop visitor.


### The Challenges

**Login tracking**, setting the _user ID_ in particular, and `search-immediate` are two competing concepts.
If you use `ff-communication`'s `search-immediate` attribute, the first search request will be sent as soon as `ff-communication` finishes initializing.
The _user ID_, however, must be set before the first request happens in order to include the `userId` parameter in the request.

Using the `search-immediate` attribute thus leaves no choice other than rendering the _user ID_ directly into the `user-id` HTML attribute of `ff-communication`.
However, this is usually not acceptable as the HTML output, along with the _user ID_, may get cached and served to other clients.

This makes the `search-immediate` attribute **unsuitable** to combine with login tracking.
It is best to send the initial search request **manually** after configuring the _user ID_.

Apart from setting the _user ID_ you also have to **unset** it again.
Web Components stores the _user ID_ in the browser's `localStorage` so it remains available after navigating to another page and can be included in requests.
When the user logs out, the _user ID_ shall no longer be included and the session shall be reset.

There are four things your **shop system** should communicate to each page with Web Components:

- user is logged in
  - to allow _user ID_ be included in requests
- user has just logged in
  - to signal that a login tracking request shall be sent
- user is logged out
  - to clear the _user ID_ and no longer send it with requests
- user has just logged out
  - to clear the _session ID_ and allow for a new session to start


### Integration

This section shows a schematic example of how you can integrate login tracking with cookies for communicating from the shop system to the client.

Whether you use `ff-communication` or a JavaScript based approach to configure your application, the fundamental flow of information remains the same.

The cookie names in this example are suggestions.
They are not reserved names by the Web Components library.
You can choose whatever names you find suitable.


#### Configuration with `ff-communication`

This listing represents a server-side HTML template.

```html
<script>
    // This event is emitted when `ff-communication` finished initializing.
    document.addEventListener(`ffCommunicationReady`, ({ factfinder, searchImmediate }) => {

        const getCookie = key => document.cookie
                .split(`; `)
                .find(kv => kv.startsWith(`${key}=`))
                ?.split(`=`)[1];

        const userId = getCookie(`shop_userId`);

        // If `userId` is present, the user is logged in.
        if (userId) {
            // Setting `userId` everytime is not strictly necessary but has no bad side effect either.
            // It ensures correct application state.
            factfinder.communication.sessionManager.setLoginData(userId);

            // This cookie must only be sent once after the user logged in.
            // It is used here to send the tracking request.
            const hasJustLoggedIn = getCookie(`shop_hasJustLoggedIn`);

            if (hasJustLoggedIn) {
                factfinder.communication.Tracking.loginWithConfig();
            }
        } else {
            // This cookie must only be sent once after the user logged out.
            const hasJustLoggedOut = getCookie(`shop_hasJustLoggedOut`);

            if (hasJustLoggedOut) {
                // Caution! `clearAllSessionData` clears the session ID which starts a new FACT-Finder Analytics session.
                // Avoid calling it on each page because non-logged-in sessions shall persist.
                factfinder.communication.sessionManager.clearAllSessionData();
            } else {
                // Calling `clearLoginData` even if user is logged out to ensure clean application state.
                factfinder.communication.sessionManager.clearLoginData();
            }
        }

        // Server-side HTML templating. The syntax is likely to be different in your environment.
        // Call `searchImmediate` only on appropriate pages.
        // This `searchImmediate` is the same that `ff-communication` would call.
    <% if (searchImmediate) { %>
        searchImmediate();
    <% } %>

    });
</script>

<body>
    <ff-communication
          url="..."
          channel="..."
          version="..."
          api="..."
          ...
    ></ff-communication>
</body>
```


#### Configuration with JavaScript

If you don't use `ff-communication`, the `ffCommunicationReady` event is not available.
Instead, you use `ffReady`.

This listing only shows the differences to the `ff-communication` approach which are:
- configuration of Web Components
- initiating the initial search

```html
<script>
    document.addEventListener(`ffReady`, ({ factfinder }) => {
        // Configure Web Components with JavaScript through:
        // - factfinder.communication.globalSearchParameter
        // - factfinder.communication.globalCommunicationParameter


        // Session managing and tracking related code like in previous listing.
        // ...
        // ...


    <% if (searchImmediate) { %>
        factfinder.communication.EventAggregator.addFFEvent({
            type: `search`,
            query: `*`,
            searchImmediate: true,
        });
    <% } %>

    });
</script>
```
