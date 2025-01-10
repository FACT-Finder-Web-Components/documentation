## Formatting and Localization

Formatting happens at the display level in the Web Components' HTML templates.
It is done by adding a formatter function to your regular data bindings.
These formatters only affect the visual output and leave the original data unchanged.
Formatters are ordinary functions and may take multiple parameters or none at all.

There are several pre-defined formatters, but you also have the option to define your own.

Unformatted:

```html
<ff-record>{{variantValues.0.Price}}</ff-record>
```

Formatted with `$`, the pre-defined price formatter function.

```html
<ff-record>{{$ variantValues.0.Price}}</ff-record>

<!-- With a second parameter to override default formatting precision to zero decimals. -->
<ff-record>{{$ variantValues.0.Price 0}}</ff-record>
```

Formatters can be used in all data bindings.


### Setup

The formatters use the web platform's native localization API.
See [documentation at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
For them to work correctly, you have to configure your required locale.

During app initialization, you configure _locale_ and _formatting options_ in `appConfig`'s `formatting` parameter.
This is an object with two properties `locale` and `formatOptions`.
These are the same values that you would pass to the platform-native `Intl.NumberFormat(locales, options)` constructor.
See [MDN for details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat).

Example:

```js
document.addEventListener(`ffCoreReady`, ({ factfinder, init, initialSearch }) => {
    init({
        appConfig: {
            formatting: {
                locale: `en-GB`,
                formatOptions: {
                    style: `currency`,
                    currency: `GBP`,
                },
            },
        },
    });
});
```


### Built-in formatters

Web Components offers several default formatters for currency and generic decimal numbers, but you may also specify your own in case the default formatters don't satisfy your requirements (see further below).

The following are the built-in formatters:

- `$` (number, fractionDigits): Formats its first parameter according to the **currency** configuration.
  The second parameter is optional and allows you to override your global settings for the number of decimal places.
  ```html
  <ff-record>
    <span>{{$ variantValues.0.Old_price 0}}</span>
    <span>{{$ variantValues.0.Price}}</span>
  </ff-record>
  ```

- `$dec` (number, fractionDigits): Formats **numbers** according to your _locale_ settings without any units.
  The second parameter is optional.
  ```html
  <ff-record>Tolerance: {{$dec variantValues.0.Tolerance 3}} mm</ff-record>
  ```

- `$bctFilter`: This **currency** formatter takes no arguments and only works in `ff-breadcrumb-trail-item` elements with `type="filter"`.
  It takes its input automatically from the HTML template context.
  This specialized formatter is necessary because of the special data structure provided in the `ff-breadcrumb-trail-item` template context.

  **Important!**
  It formats only items that are related to facets with a `unit` set.
  You configure a facet's `unit` in your FactFinder UI, it must be identical to the currency unit that your Web Components formatting configuration produces.
  If your `formatOptions` are configured to render a `€` symbol, your `unit` settings in the FactFinder UI must also be `€` for this particular facet.
  ```html
  <ff-breadcrumb-trail-item type="filter">{{$bctFilter}}</ff-breadcrumb-trail-item>
  ```
  If `$bctFilter` cannot detect how to format the received value, it will simply output the unformatted value.
  You can therefore use it safely even when the breadcrumb trail item displays a non-currency filter value.

- `$facetElement`: This **currency** formatter takes no arguments and only works in `ff-filter-cloud` and `ff-asn-group-element`.
  It formats eligible numeric values that it receives from the HTML template context.
  Ineligible values are output unchanged.

  **Important!**
  Like `$bctFilter` it only formats values related to a facet with its `unit` set to the currency symbol that your `formatOptions` produce.

  ```html
  <ff-filter-cloud>
    <span data-template="filter">[x] {{facet.name}}: {{$facetElement}}</span>
  </ff-filter-cloud>

  <ff-asn>
    <ff-asn-group for-group="price">
      <ff-asn-group-element>
        <div slot="unselected">{{$facetElement}} ({{element.totalHits}})</div>
        <div slot="selected">{{$facetElement}}</div>
      </ff-asn-group-element>
    </ff-asn-group>
  </ff-asn>
  ```


### Custom formatters

If the default formatters don't meet your requirements, you have the option to define your own formatters.
Use the `factfinder.utils.formatters.add(name, fn)` method to register them.
(Note that you cannot overwrite existing formatters.)

The function that you pass as the second argument receives all values that are passed to it from the HTML template.
The `this` keyword will be a reference of the data object available in the HTML template context.
(Use the `function` keyword instead of an arrow function if you want to use `this`.)

```js
factfinder.utils.formatters.add(`allCaps`, function(str) {
    return str.toUpperCase();
});
```

```html
<ff-record>{{allCaps variantValues.0.Title}}</ff-record>
```

If you use the `allCaps` formatter inside `ff-record` like in the example above, then inside the `allCaps` _function_ the `this` keyword would point to the _Record_ object that you can also access inside the `ff-record` HTML template itself.


#### Reminder to explore

Remember that you can always place a `debugger` statement in your custom formatter functions and investigate the received parameters.

```js
factfinder.utils.formatters.add(`allCaps`, function(str) {
    debugger
    // Inspect parameters, `this`, `arguments`, etc.

    return str.toUpperCase();
});
```


#### Alternative approach

As an alternative to custom formatters, you can also use the `factfinder.response.transform___` API to directly manipulate data fields and display them without any further formatting.

There are scenarios, however, where the unmodified original data is required by other actions such as tracking.
Use this approach with care.
Generally, it is best to avoid cosmetic tweaks to business data.
