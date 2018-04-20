## Currencies and Number Format

---
This guide covers everything to add `Currency Symbols` and `Number Formatting` like `£49.99 or 49,99 €` across all web components and related parts.

### (TLDR;)Complete Example Configuration

---
This configurations adds the currency and all the number formatting to every price:

#### German Number Format
````html
<ff-communication currency-code="EUR"
                  currency-country-code="de-DE"
                  add-unit-to-filter-groups>
</ff-communication>
```` 

#### English Number Format
````html
<ff-communication currency-code="GBP"
                  currency-country-code="en-GB"
                  add-unit-to-filter-groups>
</ff-communication>
````

#### Format Discount Prices
````html
<ff-communication currency-code="EUR"
                  currency-country-code="de-DE"
                  currency-fields="discountPriceFieldName"
                  add-unit-to-filter-groups>
</ff-communication>
````

#### Change Digits
````html
<ff-communication currency-code="EUR"
                  currency-country-code="de-DE"
                  currency-max-digits="5"
                  currency-min-digits="1"
                  add-unit-to-filter-groups>
</ff-communication>
````

### Under the hood

---
Web Components are using the [`Number.toLocaleString()`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) function to format all price strings. If you want to format prices not covered by our attributes you can always use this function like:
````javascript
var currencyCode = factfinder.communication.globalCommunicationParameter.currencyCode;
var currencyCountryCode = factfinder.communication.globalCommunicationParameter.currencyCountryCode;

parseFloat(priceStr).toLocaleString(currencyCountryCode, {
                        style: 'currency',
                        currency: currencyCode,
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2
                    });
````


### Browser Support
Please take a look at [browser compatibility table](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString). If you encounter some platforms where prices aren't formatted at all or in a wrong way please use a [polyfill](https://github.com/willsp/polyfill-Number.toLocaleString-with-Locales) to enable currency formatting.  

We made good experience with this one [(Link)](https://github.com/willsp/polyfill-Number.toLocaleString-with-Locales) in terms of size an reliability.

### Attributes

---
#### **currency-code (String)**
This attribute takes the `ISO 4217` ([Complete List](https://en.wikipedia.org/wiki/ISO_4217)) code for currencies. 

**Example Usage**
`<ff-communication currency-code="EUR">`

---
#### **currency-country-code (String)**
This attribute takes the `BCP 47` ([Complete List](https://tools.ietf.org/html/bcp47)) locale code for currencies. 

**Example Usage**
`<ff-communication currency-country-code="de-DE">` other common codes are: `en-GB`, `en-US`, `de-CH`

Most of the time `de-DE` and `en-GB` are covering everything needed. 

---
#### **currency-fields (String)**
If you are importing multiple price fields like discount prices or something similar it's not sufficient to specify only the `currency-country-code` and the `currency-code`. In order to format additional price fields you have to tell web components which fields should be processed. You can do that by setting the `currency-fields` attribute accordingly.  

**Example Usage**
`<ff-communication currency-fields="discountPrice">`

---
#### **currency-min-digits (String)**
Specify the minimum number of digits. Defaults to `2`.

**Example Usage**
`<ff-communication currency-min-digits="1">`

---
#### **currency-max-digits (String)**
Specify the maximum number of digits for all prices. Defaults to `2`.

**Example Usage**
`<ff-communication currency-max-digits="4">`

---
#### **add-unit-to-filter-groups (Boolean)**
If present, the unit formatting takes place for all filter groups and it's filters. Note that this is a `Boolean` attribute and is therefore ignoring its value. Read more about [attributes](todo) 

**Example Usage**
`<ff-communication add-unit-to-filter-groups>`

---   