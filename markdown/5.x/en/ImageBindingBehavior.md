### Which components support image binding?

The following components support image binding:
- `ff-record`
- `ff-suggest-item`
- `ff-asn-group-element`


 ### Understanding image binding

By default, `src="{{image}}"` will be added to all children of an image binding element that have a `data-image` attribute.

> Note
>
> The `src` attribute will only be added once data binding is available.
> Using `src="{{image}}"` directly in the template could lead to invalid requests.

For example, this `ff-suggest` would show the suggested product's image:

```html
<ff-suggest>
    <section class="productsContainer">
        <ff-suggest-item type="productName">
            <img width="100" height="100" data-image />
        </ff-suggest-item>
    </section>
</ff-suggest>
```

You can overwrite the default binding by providing a value for the `data-image` attribute.

```html
<img width="100" height="100" data-image="https://your-custom-image-server/{{attributes.articleNr}}" />
```

See the [API tab](/api/5.x/ImageBindingBehavior#tab=api) for further supported attributes on image binding elements.
