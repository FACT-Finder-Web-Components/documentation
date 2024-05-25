## Middleware

Starting from version `1.2.13` FactFinder Web Components support the concept of middleware. You can register and configure pre-defined modules to manipulate the data being exchanged between FactFinder Web Components and FactFinder.
Middleware modules can be registered through FactFinder Web Components themselves or directly through JavaScript.

## FactFinder Web Components Approach

To register middleware modules using FactFinder Web Components place the `ff-middleware` element directly inside the `ff-communication` element. It is a container for all modules that shall be configured.

```html
<ff-communication url="..."
                  version="..."
                  channel="...">
    <ff-middleware></ff-middleware>
</ff-communication>
```

Be sure to make `ff-middleware` an immediate child node of `ff-communication` like in the example or it will cause an error in the application. This is to ensure correct registration of modules.

## JavaScript Approach

In order to configure middleware using JavaScript you attach an event handler to the `ffReady` event. Modules are registered by calling `use()` of the desired middleware namespace.

```javascript
window.addEventListener("ffReady", function () {
    factfinder.middleware.response.use(module);
});
```

Inside the `factfinder.middleware` namespace you have the option to choose for which part of data exchange you want to register a middleware module. In this example it is `response`. That means after a request to FactFinder returns, but before it is emitted by the [ResultDispatcher](/api/1.x/core-result-dispatcher#tab=docs) to its listeners (including the FactFinder Web Components on the page), the specified module is applied to the response manipulating it in the way configured.

## Available Modules

All modules can be registered through FactFinder Web Components or through JavaScript. When using FactFinder Web Components, as with `ff-middleware` and `ff-communication`, modules must be placed immediately inside the `ff-middelware` element, or an error will occur. Again, this is to ensure correct registration with the application.

### Response

Modules in this namespace are aimed at manipulating response data. They are located in `factfinder.middleware.response` and are registered with `factfinder.middleware.response.use()`.

#### MultiAttributeParsing

This module is used to parse _multi-attribute fields_ and make their values more easily accessible. FactFinder returns multi-attribute fields as a string:

```javascript
"|Size=M|Material=Cotton|Material=Synthetic fibres|Weight~~g=80|Recommended use=Leisure"
```

In this format you cannot use individual values immediately. You need to parse this string and translate it to a more accessible format. `MultiAttributeParsing` will parse the multi-attribute string according to the specified configuration and generate a plain JavaScript object.

```json
{
    "Size": [
        { "value": "M", "unit": undefined }
    ],
    "Material": [
        { "value": "Cotton", "unit": undefined },
        { "value": "Synthetic fibres", "unit": undefined }
    ],
    "Weight": [
        { "value": "80", "unit": "g" }
    ],
    "Recommended use": [
        { "value": "Leisure", "unit": undefined }
    ]
}
```

To render the parsed data format you need the mustache syntax for non-empty lists. See the [mustache.js documentation](https://github.com/janl/mustache.js#non-empty-lists) for further details.

Assuming there is a multi-attribute field called `MultiFilter` and its value was replaced by the parsed object, usage could look like this:

```html
<ff-record-list>
    <ff-record>
        <img data-image={{record.ImageName}}
             data-image-onerror="../img_not_found.gif">

        <div>
            <div>{{record.Title}}</span>
            <div>Price: <strong>{{record.Price}}</strong></div>

            <div>Recommended use:
                {{#record.MultiFilter.Recommended use}}<span>{{value}}</span>{{/record.MultiFilter.Recommended use}}</div>
            <div>Material:
                {{#record.MultiFilter.Material}}<span>{{value}}</span>{{/record.MultiFilter.Material}}</div>
            <div>Weight:
                {{#record.MultiFilter.Weight}}<span>{{value}} {{unit}}</span>{{/record.MultiFilter.Properties}}</div>
        </div>
    </ff-record>
</ff-record-list>
```

_Note that mustache allows spaces in names as seen in_ `Recommended use`.

Registration of `MultiAttributeParsing` using either FactFinder Web Components or JavaScript is done as follows.

FactFinder Web Components:
```html
<ff-communication>
    <ff-middleware>
        <ff-multi-attribute-parsing
                src-property="MultiFilter"
                store-in-property="MultiFilter"
                keep-original-in-property="OriginalMultiFilter"
                entry-separator="|"
                key-value-separator="="
        ></ff-multi-attribute-parsing>
    </ff-middleware>
</ff-communication>
```

JavaScript:
```javascript
window.addEventListener("ffReady", function () {
    factfinder.middleware.response.use(factfinder.middleware.response.MultiAttributeParsing({
        srcProperty: "MultiFilter",
        storeInProperty: "MultiFilter",
        keepOriginalInProperty: "OriginalMultiFilter",
        entrySeparator: "|",
        keyValueSeparator: "="
    }));
});
```

See the [API tab](/api/1.x/ff-middleware#tab=api) for more details on configuration options.

#### ProductTeaserCampaignProcessor

Starting with FactFinder version 7.3.5-42 and FactFinder Web Components version 1.2.16 _feedback text campaigns_ can be configured as _teaser_.

Applying this module will insert all _teaser feedback text campaigns_ into `searchResult.records` at the configured positions. Hence, for each _teaser feedback text campaign_, a rendered `ff-record-list` will contain an `ff-record` element with an `is-teaser` attribute and its inner HTML set to the text specified in FactFinder.

Configuration with FactFinder Web Components:
```html
<ff-communication>
    <ff-middleware>
        <ff-product-teaser-campaign-processor></ff-product-teaser-campaign-processor>
    </ff-middleware>
</ff-communication>
```

JavaScript:
```javascript
window.addEventListener("ffReady", function () {
    factfinder.middleware.response.use(
        factfinder.middleware.response.ProductTeaserCampaignProcessor()
    );
});
```
