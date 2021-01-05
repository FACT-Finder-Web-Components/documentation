## Overview
With the `ff-recommendation` you can display a set of records, which are presented to the user, based
on his or her search history and his or her last purchased products or product views. The recommendation service learns
the shopping behavior for each user and creates a list record which can be displayed to him or her.

> Important
>
> [Field roles](/documentation/4.x/field-roles) have to be defined first in order for `ff-recommendation` to work.

Inside the `ff-recommendation` tag you should define a `ff-record-list` to display and style the recommended products.
This `ff-record-list` does not listen to the default search result and gets its records from the recommendation service.

```html
<ff-recommendation>
    <div class="recommendationHeader">Recommendations</div>
    <ff-record-list subscribe="false">
        <!-- in this demo a click on the product sets the recommendation product-->
        <ff-record>
            <img data-image="{{record.ImageName}}">
            <div>
                <a href="https://www.bergfreunde.de/{{record.Deeplink}}" data-action="redirect">
                    {{record.Title}}
                </a>
                <div>Price: <strong>{{record.Price}} €</strong></div>
            </div>
        </ff-record>
    </ff-record-list>
</ff-recommendation>
```

> Important
>
> Although `ff-recommendation` tries to find a nested `ff-record-list` and change its `subscribe` property to `false`, it should be set explicitly to `false` by users in HTML code to prevent console warnings and avoid race conditions.

## Attributes

### max-results

The `max-results` attribute defines how many Records should be loaded. (defaults to 4).

```html
<ff-recommendation max-results="4">
    //...
</ff-recommendation>
```

### record-id

Set the record ID to load records that are recommended for that one product. Or use a list of comma-separated record IDs.

```html
<script>
    const recommendationElement = document.querySelector("ff-recommendation");
    //This triggers the recommendation service request
    recommendationElement.recordId = "123456789";//Get a record id from a searchresult.
</script>
```

### subscribe

With the `subscribe` attribute you can define if the `ff-recommendation` should listen to the recommendation service (defaults to true).

```html
<ff-recommendation subscribe="false">
    //...
</ff-recommendation>
```

### use-perso

With the `use-perso` attribute you can define if the recommendations should use the personalisation feature. It defaults to `false`.

This will overwrite the settings from `ff-communication` for this `ff-recommendation`

```html
<ff-recommendation use-perso="true">
    //...
</ff-recommendation>
```
