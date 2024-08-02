## Overview

With the `ff-recommendation` you can display a set of records which are presented to users based on their search history and their last purchased products as well as their product views.
The recommendation service learns the shopping behavior for each user and creates a list of records which can be displayed to them.

Inside the `ff-recommendation` element you define an `ff-record-list` to display the recommended products.
This `ff-record-list` does not listen to the default search result and gets its records from the recommendation service.

```html
<ff-recommendation>
    <div class="recommendationHeader">Recommendations</div>

    <ff-record-list subscribe="false">
        <template data-role="record">
            <ff-record>
                <img data-image="{{variantValues.0.ImageName}}">
                <div>
                    <a href="https://your.shop/{{variantValues.0.Deeplink}}">
                        {{variantValues.0.Title}}
                    </a>
                    <div>Price: <strong>{{$ variantValues.0.Price}}</strong></div>
                </div>
            </ff-record>
        </template>
    </ff-record-list>
</ff-recommendation>
```

> Important
>
> Although `ff-recommendation` tries to find a nested `ff-record-list` and change its `subscribe` property to `false`, it should be set explicitly to `false` in HTML code to prevent console warnings and avoid race conditions.


## Attributes

### max-results

The `max-results` attribute defines how many records should be loaded.
By default, this value is empty and the element displays as many records as FactFinder returns.

```html
<ff-recommendation max-results="4">
    <!-- ... -->
</ff-recommendation>
```


### product-number

`product-number` takes the value that is labeled with the `productNumber` **field role**.

This attribute takes a list of comma-separated values.
Once set, `ff-recommendation` queries FactFinder for a list of recommendations based on the specified product numbers.

The displayed recommendations are refreshed every time the `product-number` HTML attribute or the corresponding `productNumber` JavaScript property are changed. 

```html
<ff-recommendation product-number="123456789">
    <!-- ... -->
</ff-recommendation>
```

```js
const recommendationElement = document.querySelector(`ff-recommendation`);
recommendationElement.productNumber = `123456789`;
```


### use-personalization

With the `use-personalization` attribute you can define whether the recommendations should use the personalization feature.
The default value is `true`.

```html
<ff-recommendation use-personalization="false">
    <!-- ... -->
</ff-recommendation>
```
