## Predictive Basket

The `ff-predictive-basket` element allows for easy integration with the FACT-Finder Predictive Basket feature.
To use it, you need a version of FACT-Finder **NG** and WebComponents `3.15.5` or higher.

### Subject to Change

_Note that this feature is at an experimental stage and changes may occur._

Due to being subject to change, the Predictive Basket feature is **not available** by default in WebComponents.
It must be **activated** by configuring two values on **page load** as follows:

```js
document.addEventListener("ffReady", ({ factfinder }) => {
  factfinder.communication.globalSearchParameter.version = "ng";
  factfinder.__experimental.predictiveBasket.enable = true;
});
```

If this is not configured, the `ff-predictive-basket` element will throw errors on attempting to use it.

### The Predictive Basket Element

The following listing shows the newly introduced element.
The element itself does not have a visual component and must be used in combination with an `ff-record-list` in the same manner as `ff-recommendation`.
See further below for more details.

```html
<ff-predictive-basket user-id="123456"
                      max-results="10"
                      blacklist="art-id1,art-id2">
    <!-- requires ff-record-list here to work -->
</ff-predictive-basket>
```

Once the element is correctly initialized, it will automatically issue a request to FACT-Finder and display the result through the nested `ff-record-list`.
This will happen only once per page load.
If you need to refresh the displayed data, refer to the `getPredictions()` method below.

#### Attributes

Attribute | Required | Type | Default | JS property
--------- | -------- | ---- | ------- | -----------
user-id   | yes      | String | _(none)_ | `userId`

The ID of the user for whom products shall be predicted.
Setting this attribute will cause the element to issue a request once it is initialized.
Additionally, changing `userId` will also automatically issue a new request.

If the user ID is not specified, no request to FACT-Finder will be issued.
Instead, an error will be logged to the browser's console.

---

Attribute | Required | Type | Default | JS property
--------- | -------- | ---- | ------- | -----------
max-results | optional | Number |  _(unlimited)_* | `maxResults`

The maximum amount of products to be returned from FACT-Finder.
To receive all predictions, omit this attribute or set its value to `-1`.

_(*) Default value is inherited from the FACT-Finder API._

---

Attribute | Required | Type | Default | JS property
--------- | -------- | ---- | ------- | -----------
blacklist | optional | String (comma-separated list) | _(empty)_ | `blacklist`

With the `blacklist` attribute, you can specify one or more product IDs that shall not be returned from FACT-Finder.
This may be useful if you, for example, don't want products to appear in the predictions once the user has placed them in their shopping cart.

#### Methods

##### `predictiveBasketElement.getPredictions()`

This method issues a request to FACT-Finder with the currently set values.


### Example Setup

#### HTML
```html
<ff-predictive-basket user-id="123456" max-results="10" blacklist="art-id1,art-id2">
    <ff-record-list subscribe="false">
        <ff-record>
            <img data-image="{{record.image}}" data-image-onerror="../img_not_found.gif">
            <div>
                <a data-anchor="{{record.deeplink}}" data-redirect="{{record.deeplink}}">
                    {{record.name}}
                </a>
                <div>Price: <strong>{{record.price}}</strong></div>
            </div>
        </ff-record>
    </ff-record-list>
</ff-predictive-basket>
```

#### Manual update with `blacklist`
```js
function onUpdate() {
    const predBasket = document.querySelector("ff-predictive-basket");
    predBasket.blacklist = "blacklisted-id-001,blacklisted-id-002,blacklisted-id-003";
    predBasket.getPredictions();
}
```
