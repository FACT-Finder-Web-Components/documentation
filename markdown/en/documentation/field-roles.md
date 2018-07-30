## FieldRoles

**IMPORTANT** This section describes an essential part of the integration
of FACT-Finder using Web Components. FACT-Finder and Web Components _depend_
on a proper definition of these roles. A missing definition can result in
unexpected behaviors that might look like bugs.

Certain fields/columns in FACT-Finder's product database can have special
meanings. We call these meanings `fieldRoles`. Since every shop might
have their own _field names_ these names need to be mapped to their
corresponding _fieldRole_.

These are the defined `fieldRoles`:

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

This means in order for FACT-Finder and Web Components to know the
particular meaning of a field you need to define the _fieldRoles_ whenever
you request data from any API except the search API.

**In other words:** You might have a field called `prix` that contains the
product's price in your product database. So you need to map `price` to
`prix` in order for FACT-Finder to know that this field contains the price.

#### How to define `fieldRoles`

You need to do this when the `ffReady` event is dispatched so
`ff-communication` knows the correct mapping before your API-Requests are
sent. `fieldRoles` is a property of `factfinder.communication`.

Here is an **example** of how your product database might look:


| id | campaignId | masterId | RRP   | image      | name               |
|----|------------|----------|-------|------------|--------------------|
| 1  | 21         |          | 14.45 | http://... | Nerf Gun           |
| 2  | 22         |          | 19.99 | http://... | Ergonomic Keyboard |
| 3  | 23         |          | 12.5  | http://... | Rubber Duck        |

This is how you set the `fieldRoles`:

```Javascript
document.addEventListener("ffReady", function () {
            factfinder.communication.fieldRoles = {
                campaignProductNumber: "campaignId",
                imageUrl: "image",
                masterArticleNumber: "masterId",
                price: "RRP",
                productName: "name"
            };
        });
```

**NOTICE:** We omitted some roles in this example but
_you always have to set all_ `fieldRoles`.


#### Integration Checklist:
1. All `fieldRoles` are defined properly. The value in your definition has
to match the field's name in your product database. This is case sensitive.
2. You define the `fieldRoles` when the `ffReady` event is fired.
3. You define the `fieldRoles` before you do a request. This _should_
always be the case if you followed #2.

