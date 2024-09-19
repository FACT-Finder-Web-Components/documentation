## Overview

`ff-template` is a generic element that is not tied to a specific API endpoint.
Instead, you define yourself which type of response it shall receive.
You also have the option to not subscribe it to the response pipeline at all but pass custom data to it for rendering.

Note that the available data bindings depend on the response type the element is receiving.


## Subscribing to an endpoint

Set the `scope` attribute to make `ff-template` subscribe to the specified endpoint.

```html
<ff-template scope="SearchAndNavigation">{{totalHits}} results found.</ff-template>
```

Available values for `scope` are:

- `CampaignPage`
- `CampaignProduct`
- `CampaignShoppingCart`
- `Compare`
- `Navigation`
- `NavigationCategory`
- `PredictiveBasket`
- `Recommendation`
- `Records`
- `Search`
- `Similar`
- `Suggest`
- `SearchAndNavigation` (special scope)

These values mirror the supported FactFinder API endpoints.
They are also available for subscribing in the `factfinder.response` namespace.
Only `CampaignRedirect` is not available to `ff-template`.

There is a special scope `SearchAndNavigation`.
This makes `ff-template` simultaneously listen to _Search_ and _Navigation_ responses.
Both endpoints have a very similar purpose, and they return the same data structure.
With this scope you can use one HTML template for search result pages and category pages.

> Hint
>
> `SearchAndNavigation` is likely the most useful scope.


## Passing custom data without subscribing

`ff-template` has a `data` property which you can access through JavaScript.
This property takes any type of data.

```html
<script>
    function populateTemplates() {
        const text = `This is some text.`;

        const ffTemplate1 = document.querySelector(`#demoTemplate1`);
        const ffTemplate2 = document.querySelector(`#demoTemplate2`);
        const ffTemplate3 = document.querySelector(`#demoTemplate3`);

        ffTemplate1.data = text;
        ffTemplate2.data = { text };
        ffTemplate3.data = { nested: { text } };
    }
</script>

<button onclick="populateTemplates()">Set data</button>

<ff-template id="demoTemplate1">
    Direct access of 'data' property: {{.}}
</ff-template>

<ff-template id="demoTemplate2">
    Accessing object member: {{text}}
</ff-template>

<ff-template id="demoTemplate3">
    Accessing nested data: {{nested.text}}
</ff-template>
```
