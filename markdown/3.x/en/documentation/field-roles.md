## FieldRoles

This section describes an essential part of the integration
of FACT-Finder using FACT-Finder Web Components. FACT-Finder and FACT-Finder
FACT-Finder Web Components _depend_ on a proper definition of these roles. A missing
 definition can result in unexpected behaviors that might look like bugs.

Certain fields/columns in FACT-Finder's product database can have special
meanings. E.g. a _price_ field. Many of FACT-Finder's features, such as
Tracking require knowledge of these special meanings. Since every customer
might use custom _field names_ there needs to be a mapping between the
_meaning_ of a field and its _field name_.
We call these meanings `fieldRoles`. During the set-up process of a new
channel in the FACT-Finder-UI you assign a field to each one of the
`fieldRoles`.

These are the `fieldRoles`:

- `brand` – name of manufacturer.
- `campaignProductNumber` – product number, that are used to reference the
product in the campaign manager.
- `deeplink` – URL of the product page.
- `description` – product description.
- `displayProductNumber` – The displayed product number.
- `ean` – EAN
- `imageUrl` – product image-URL.
- `price` – price field.
- `productName` – product name.
- `trackingProductNumber` – product number used in tracking
- `masterArticleNumber` – product number of the main product if product
variants are used

**IMPORTANT:** During set-up of a channel in the FACT-Finder-UI you have
to assign each of the `fieldRoles` listed above to one field/column in
your product database.

This means in order for FACT-Finder and FACT-Finder Web Components to process your
data properly you also need to provide a mapping of `fieldRoles` to
`field names` in your front-end before you request data via FACT-Finder Web Components
from any API except the search API.

More specifically, to use the following elements it is mandatory to define
the `fieldRoles` property on client-side:

- `<ff-recommendation>`
- `<ff-similar-products>`
- `<ff-communication currency-code ...>`
- `<ff-suggest>`
- `<ff-checkout-tracking>`
- `<ff-tag-cloud>`
- `<ff-campaign-pushed-products>` (Tracking) loaded via
`<ff-campaign-landing-page>`, `<ff-campaign-products>` or `<ff-campaign-shopping-cart>`

**In other words:** You might have a field called `prix` that contains the
product's price in your product database. During set-up you assign the
role `price` to your field `prix` in the FACT-Finder-UI. In order to use the [Currency Attributes](/documentation/3.x/currency-guide) on your product detail page, you have to map `price` to
`prix` in the `factfinder.communication.fieldRoles` property in your
front-end.

**NOTICE:** The `fieldRoles` are configured in the FACT-Finder-UI during
the set-up process. It is essential the roles you define in the browser
match the ones defined in FACT-Finder.

#### How to define `fieldRoles` on the FACT-Finder Web Components side

You need to do this when the `ffReady` event is dispatched so
`ff-communication` knows the correct mapping before your API-Requests are
sent. `fieldRoles` is a property of `factfinder.communication`.

Here is an **example** of how your product database might look after
the set-up.


| id | campaignId | masterId | RRP   | image      | name               |
|----|------------|----------|-------|------------|--------------------|
| 1  | 21         |          | 14.45 | http://... | Nerf Gun           |
| 2  | 22         |          | 19.99 | http://... | Ergonomic Keyboard |
| 3  | 23         |          | 12.5  | http://... | Rubber Duck        |

This is how you set the `fieldRoles`:

**IMPORTANT**

Both EventListeners have to be declared before our scripts are loaded or you could miss the event **and your code is never executed**!

```html
<script>
    document.addEventListener("ffReady", function (event) {
        const factfinder = event.factfinder;
        factfinder.communication.fieldRoles = {
            campaignProductNumber: "campaignId",
            imageUrl: "image",
            masterArticleNumber: "masterId",
            price: "RRP",
            productName: "name"
        };
    });
</script>
<link rel="import" href="pathToHtmlImport/elements.build.with_dependencies.html">
```

**NOTICE:** We omitted some roles in this example but
_you always have to set all_ `fieldRoles` in the back- as well as
front-end.


#### How to look up your `fieldRoles`

As we mentioned above, the search API can be queried without providing
the `fieldRoles` property. This is because a response from the search API
contains the `fieldRoles` property as it is defined in FACT-Finder.

You can simply query the search API and look at the response JSON to find
the `fieldRoles` property. Then you can use that object in your front-end
assignment fo the `factfinder.communication.fieldRoles` property.

**Example:**

You can check-out the
[record-list demo](https://github.com/FACT-Finder-Web-Components/demos/blob/release/3.x/ff-record-list/index.html)
and adjust the `ff-communication`-parameters to match your set-up and
use the search-box in the demo to submit any search query. In your
dev-tools' network tab you can look at the JSON-response under
`searchResult.fieldRoles` to find the `fieldRoles` you will need.


#### Integration Checklist:
1. All `fieldRoles` are defined properly. The value in your definition has
to match the field's name in your product database. This is case sensitive.
2. You define the `fieldRoles` when the `ffReady` event is fired.
3. You define the `fieldRoles` before you do a request. This _should_
always be the case if you followed #2.

