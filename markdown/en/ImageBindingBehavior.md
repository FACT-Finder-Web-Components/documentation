### Which components do support image binding
The following components support image binding: `ff-suggest-item`, `ff-asn-group-element`

### Understanding the image binding
Per default `src="{{image}}"` will be added to all children of an image binding element, which have a `data-image` attribute.
**Note** that we take care for you, that the `src` attribute is not added before the data binding is available.
 Specifying `src="{{image}}"` directly in the template could lead to invalid requests.
 
For example the following suggest would show the image, which is defined for the suggested product in your FACT-Finder:
```html
<ff-suggest>
    <section class="productsContainer">
        <ff-suggest-item type="productName">
            <img width="100" height="100" data-image />
        </ff-suggest-item>
    </section>
</ff-suggest>
``` 

You can overwrite the default binding through providing a value for the `data-image` attribute. For example: 
```html
<img width="100" height="100" data-image="http://your-custom-image-server/{{attributes.articleNr}}" />
```

See the [API tab](/api/ImageBindingBehavior#tab=api) for further supported attributes on image binding elements.

