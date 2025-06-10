## Overview

With the `ff-record-list` and `ff-record` elements you can design a template for each record.
You can access different record information such as name, price, rating etc... with the mustache-syntax `{{variantValues.0.xxx}}`.
The possible values a record can have are defined in the FactFinder backend and are the field names from your data import.


## Define the record template

Every `ff-record-list` element must define an `ff-record` template that will be used to display search results.
You define this template with a `template` element that has the attribute `data-role="record"`.

```html
<ff-record-list>
  <div>Text before records</div>

  <template data-role="record">
    <ff-record>
      <div>Title: {{variantValues.0.Title}}</div>
      <div>Brand: {{variantValues.0.Brand}}</div>
    </ff-record>
  </template>

  <div>Text after records</div>
</ff-record-list>
```

The `template` element also acts as the insertion point for new records.
This allows you to define additional HTML inside the record list before and after the products.


### Data format

The data format that is available in the HTML templates for `ff-record` varies depending on the data source.
See your _FactFinder API documentation_ for details.

For **search result** data `ff-record` elements are populated with `SearchRecord`.
```html
<ff-record-list>
    <template data-role="record">
        <ff-record>{{variantValues.0.Title}} at {{position}}</ff-record>
    </template>
</ff-record-list>
```

Records from a dedicated **campaign** (pushed products) use `RecordWithId`.
```html
<ff-campaign-pushed-products is-landing-page-campaign>
    <ff-record-list>
        <template data-role="record">
            <ff-record>{{variantValues.0.Title}}</ff-record>  <!-- `position` not available -->
        </template>
    </ff-record-list>
</ff-campaign-pushed-products>
```

Records from a **Predictive Basket** result use `TypedFlatRecord`.
```html
<ff-predictive-basket>
    <ff-record-list>
        <template data-role="record">
            <ff-record>{{values.Title}}</ff-record>
        </template>
    </ff-record-list>
</ff-predictive-basket>
```


### When the template clashes with 3rd party frameworks

3rd party rendering frameworks might also use the `template` element to define their templates.
It can happen that those frameworks 'steal' the template from Web Components and leave a broken `ff-record-list`.

There are two fallback methods to define the `ff-record` template.
While the wrapping `template` tag is replaced, the template's body remains the same.
Your rendering framework might accept one of these approaches.


#### Via `script` tag

```html
<ff-record-list>
    <script type="text/ff-compat-template" data-role="record">
        <ff-record>...</ff-record>
    </script>
</ff-record-list>
```


#### Via comment

```html
<ff-record-list>
    <div data-compat-template-role="record">
        <!--
        <ff-record>...</ff-record>
        -->
    </div>
</ff-record-list>
```


## Adding an image

To display an image you use the `data-image` attribute.
Add the `{{data-binding}}` according to your data feed as attribute value.
In the example below, the image URL field is named _ImageName_.

In addition, you can add an error image which is displayed if the image at `data-image` can't be loaded.
Add the error image by annotating the `img` tag with `data-image-onerror="urlToErrorImage"`.

You might also want to add the `alt` attribute in case the image can't be displayed.

```html
<ff-record-list>
    <template data-role="record">
        <ff-record>
            <img data-image="{{variantValues.0.ImageName}}"
                 data-image-onerror="shop123.com/error.png"
                 alt="{{variantValues.0.Title}}"
            >
            <span>{{variantValues.0.Title}}</span>
        </ff-record>
    </template>
</ff-record-list>
```


## Redirecting to product page

To redirect to your product page you should always rely on the `data-redirect` attribute.
You can specify the target with the `data-redirect-target` attribute with all HTML compliant target values `(_blank|_self|_parent|_top|framename)`.

> Note
>
> The `data-redirect` attribute combines the **redirect** and the **tracking request**.

```html
<ff-record-list>
    <template data-role="record">
        <ff-record>
            <div data-redirect="{{variantValues.0.Deeplink}}"
                 data-redirect-target="_blank">
                <img data-image="{{variantValues.0.ImageName}}">
                <span>{{variantValues.0.Title}}</span>
            </div>
        </ff-record>
    </template>
</ff-record-list>
```


## Adding links

If you want to add links to your product, use the `data-anchor` attribute instead of `href`.
This attribute will set up the `href` attribute with the correct data from the record when you use the mustache annotation.

By default, the normal `href` behavior is disabled with an overwritten onClick method.
To use the normal href behavior add the `disable-overwrite` to the `ff-record`.

> Note
>
> When using `disable-overwrite`, automatic tracking will be deactivated.

```html
<ff-record-list>
    <template data-role="record">
        <ff-record>
            <div>
                <a data-redirect="{{variantValues.0.Deeplink}}"
                   data-redirect-target="_blank"
                   data-anchor="https://www.myshop.de{{variantValues.0.Deeplink}}">
                    Shop
                </a>
    
                <img data-image="{{variantValues.0.ImageName}}">
                <span>{{variantValues.0.Title}}</span>
            </div>
        </ff-record>
    </template>
</ff-record-list>
```


## Adding tracking

To add tracking requests to your `ff-record` element you can use the `data-track` attribute.
This might be useful if you don't want to redirect to a product detail page but track the user click anyway.

```html
<ff-record-list>
    <template data-role="record">
        <ff-record>
            <div data-track>Don't redirect but track.</div>
    
            <div data-redirect="{{variantValues.0.Deeplink}}"
                 data-redirect-target="_blank">
                <img data-image="{{variantValues.0.ImageName}}">
                <span>{{variantValues.0.Title}}</span>
            </div>
        </ff-record>
    </template>
</ff-record-list>
```


## Cart and checkout tracking

If you want to add cart and/or checkout tracking to your search result page, you can enable the tracking functionality by adding one or both of the `add-checkout-click` and `add-cart-click` attributes to the `ff-record` element.
This will enable additional information for the `data-track` attribute.
For checkout tracking you can add `data-track="checkoutClick"` or for cart tracking `data-track="cartClick"` to any descendant element.

```html
<ff-record-list>
    <template data-role="record">
        <ff-record add-cart-click add-checkout-click>
            <div data-track="cartClick">Don't redirect but track a cart click</div>
            <div data-track="checkoutClick">One click checkout</div>
    
            <div data-redirect="{{variantValues.0.Deeplink}}"
                 data-redirect-target="_blank">
                <img data-image="{{variantValues.0.ImageName}}">
                <span>{{variantValues.0.Title}}</span>
            </div>
        </ff-record>
    </template>
</ff-record-list>
```

To track how many products are put into the cart or checked out, you need to add the attribute `data-track-count` to an element.
If you want to read the count from the element's `textContent` property, you need to set the attribute value, e.g. `data-track-count="textContent"`.
You can use any other value for the attribute.
For example `innerHTML` or `value`.
The `data-track-count` attribute will try to read the count value from your given property.
Without, it will try to read the value from the element prototype.
If the element has no value property, it will default to `1`.

```html
<ff-record-list>
    <template data-role="record">
        <ff-record add-cart-click add-checkout-click>
            <div data-track="cartClick">Don't redirect but track a cart click</div>
            <div data-track="checkoutClick">One click checkout</div>
    
            <!-- Tracking count from a `textContent` -->
            <div data-track-count="textContent">2</div>
            <!-- OR default to read the value property -->
            <input data-track-count type="number" value="2"/>
    
            ...
    
        </ff-record>
    </template>
</ff-record-list>
```


## Server Side Rendering

`ff-record-list` supports Server Side Rendering when using the `ssr` attribute.

```html
<ff-record-list ssr>
    ...
</ff-record-list>
```

In SSR mode, make sure to position the `ff-record` template **after** the server-side rendered records because it is also the insertion point for new records.
If you place the template before the server-side rendered records, the display order will eventually get compromised.

```html
<ff-record-list ssr>
  <!-- Do not place the record template here. -->

  <ff-record>Product A</ff-record>
  <ff-record>Product B</ff-record>
  <ff-record>Product C</ff-record>

  <template data-role="record">
    <ff-record>{{variantValues.0.Title}}</ff-record>
  </template>
</ff-record-list>
```


For integration details see the [SSR page](/documentation/5.x/server-side-rendering).
