## Overview
With the ff-record and `ff-record-list` element you can design a template for each record.
You can access different record information such as name, price, rating etc... with the mustache-syntax `{{record.xxx}}`.
The possible values a record can have are defined in the FF-backend and are the field names from the imported feed.

## Adding the image
To display the image you can use the `[data-image]` attribute. Just add as attribute value the `{{data-binding}}` according to
your data feed. In the example above the image url field is named ImageName.
In Addition you can add an error image which is displayed if the data-image can't be loaded.
Add the error image by annotating the img tag with the `[data-image-onerror="urlToErrorImage"]`.

```html
<ff-record-list>
    <ff-record>
        <img data-image="{{record.ImageName}}" data-image-onerror="shop123.com/error.png">
        <span>{{record.Title}}</span>
    </ff-record>
</ff-record-list>
```

## Redirecting to product page
To redirect to your product you should always rely on the [data-redirect] attribute. You can specify the target with the [data-redirect-target] attribute with all html compliant target values `(_blank|_self|_parent|_top|framename)`
**NOTE**: The `[data-redirect]` attribute combines the **redirect** and the **tracking** request.

```html
<ff-record-list>
    <ff-record>
        <div data-redirect="{{record.Deeplink}}"
             data-redirect-target="_blank">
            <img data-image="{{record.ImageName}}">
            <span>{{record.Title}}</span>
        </div>
    </ff-record>
</ff-record-list>
```

## Adding links
If you want to add links to your product, use the `data-anchor` attribute instead of href.
This attribute will set up the `href` attribute with the correct injected data from the record,
when you use the mustache annotation to select fields from said record.
By default, the normal `href` behavior is disabled with an overwritten onClick method.
To use the normal href behavior add the `disable-overwrite` to the ff-record.

**NOTE**: `disable-overwrite` tracking wont work with that

```html
<ff-record-list>
    <ff-record>
        <div>
            <a data-redirect="{{record.Deeplink}}"
               data-redirect-target="_blank"
               data-anchor="https://www.myshop.de{{record.Deeplink}}" >
                Shop
            </a>

            <img data-image="{{record.ImageName}}">
            <span>{{record.Title}}</span>
        </div>
    </ff-record>
</ff-record-list>
```

## Adding tracking
To add tracking requests to your `ff-record` element you can use the `data-track` attribute.
This might be useful if you don't want to redirect to a product detail page but track the user click anyway.

```html
<ff-record-list>
    <ff-record>
        <div data-track>Dont redirect but track.</div>

        <div data-redirect="{{record.Deeplink}}"
             data-redirect-target="_blank">
            <img data-image="{{record.ImageName}}">
            <span>{{record.Title}}</span>
        </div>
    </ff-record>
</ff-record-list>
```

## Cart and checkout tracking
If you want to add cart and/or checkout tracking to your search result page you can enable the tracking functionality by add one or both of `[add-checkout-click]`, `[add-cart-click]` to the ff-record element.
This will enable additional information for the data-track attribute. For checkout tracking you can add `[data-track="checkoutClick"]` or for cart tracking `[data-track="cartClick"]` to any ancestor.

```html
<ff-record-list>
    <ff-record add-cart-click add-checkout-click>
        <div data-track="cartClick">Dont redirect but track a cart click</div>
        <div data-track="checkoutClick">One click checkout</div>

        <div data-redirect="{{record.Deeplink}}"
             data-redirect-target="_blank">
            <img data-image="{{record.ImageName}}">
            <span>{{record.Title}}</span>
        </div>
    </ff-record>
</ff-record-list>
```

To track how many products are put into the cart or checked out, you need to add the attribute `[data-track-count]` to an element.
If you want to read the count from the textContent property, you need to set the attribute value, e.g. `[data-track-count="textContent"]`. You can use any other value for the attribute. For example "innerHTML" or "value". The data-track-count will try to read the count value from your given property. Without, it will try and read the value from the element prototype. If the element has no value property it will default to 1.

```html
<ff-record-list>
    <ff-record add-cart-click add-checkout-click>
        <div data-track="cartClick">Dont redirect but track a cart click</div>
        <div data-track="checkoutClick">One click checkout</div>

        <!-- tracking count from a textContent -->
        <div data-track-count="textContent">2</div>
        <!-- OR default to read the value property -->
        <input data-track-count type="number" value="2"/>

        ...

    </ff-record>
</ff-record-list>
```

## Infinite Scrolling
You can also make the `ff-record-list` load the next page automatically when the bottom of the record-list gets into view. Just add the attribute `[infinite-scrolling]` to the element.

With the attribute `[infinite-debounce-delay]`, you can set a delay for when the page should be loaded after it hits the bottom (in milliseconds). This prevents the page from loading twice, or too fast.

You can also define the margin for the page load trigger with the `[infinite-scroll-margin]` attribute. This is applied to the trigger element in 'px'

Note: When you manually load a page, e.g. from an URL with the 3rd page set in its search result, this will not scroll back to page 1 and 2. You have no option to load the first two pages anymore.

We recommend using higher values for `[infinite-debounce-delay]` and `infinite-scroll-margin` like:

```html
<ff-record-list infinite-scrolling
                infinite-debounce-delay="300"
                infinite-scroll-margin="-700">
    <ff-record>
        <img data-image={{record.ImageName}} data-image-onerror="../img_not_found.gif">
        <div data-track>
            <span id="title">{{record.Title}}</span>
            <div>Price: <strong>{{record.Price}} €</strong></div>
        </div>
    </ff-record>
</ff-record-list>
```