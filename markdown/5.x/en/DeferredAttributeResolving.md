## Avoid invalid requests caused by unresolved data bindings

Some attributes like image-related `src` and `srcset` cannot use data binding directly because the browser tries to immediately fetch images once it encounters them during HTML parsing.
At this time the data binding isn't resolved yet and the request to an invalid source results in an error.

```html
<ff-template>
    <!-- Causes an error while the browser is parsing HTML. -->
    <img src="{{imageURL}}">
</ff-template>
```

Eventually, `src` would be resolved and the image displayed correctly, but the initial error during HTML parsing is undesirable nonetheless.

To avoid this error, [image binding](/api/5.x/ImageBindingBehavior) should be used.
However, a limitation of _image binding_ is that it only works for the `src` attribute and only for elements `ff-record`, `ff-suggest-item` and `ff-asn-group-element`.


## A more general solution

**Deferred attribute resolving** offers a more general and flexible solution that also expands to the `ff-template` and `ff-asn-group-element` elements.

At its core it works the same as _image binding_, but it allows you to specify _any_ attribute to resolve in the deferred fashion.

This feature is available on the following elements:
- `ff-record`
- `ff-suggest-item`
- `ff-asn-group-element`
- `ff-template`

> Note
>
> Elements that use the native `<template>` tag to define their templates should not be affected by premature browser requests.
> However, there might be **web crawlers** that ignore it and try to follow the link or image source nonetheless.
> This could result in unwanted entries to the crawler's index.
>
> You might want to check what a crawler actually indexes and then decide whether you need deferred attribute resolving, or apply it always for simplicity.


### Setup

Place the `data-ffw-defer` attribute on the `ff-` element in which you want to use deferred attribute resolving.
The attribute takes a comma-separated list of all attributes you want to resolve indirectly.

```html
<ff-template data-ffw-defer="src,srcset">
    ...
</ff-template>
```

Inside the `ff-` element you place the counterpart attributes with the relevant data binding.
They follow the following pattern:

```
data-defer-[target-attribute-name]="{{data-binding}}"
```

For attributes `src` and `srcset` this would look like this:

```html
<ff-template data-ffw-defer="src,srcset">
    <picture>
        <source data-defer-srcset="{{thumbnail_S}}">
        <img data-defer-src="{{thumbnail_L}}">
    </picture>
</ff-template>
```


### Fallback in case of attribute name collisions

If you are already using attributes that follow the above naming pattern, there is an alias that is functionally identical.
It only adds `ffw-` to its name.

```
data-ffw-defer-[target-attribute-name]="{{data-binding}}"
```

You can use the regular attribute and the alias at the same time.
In this case, **only the alias** will be resolved by Web Components.

```html
<ff-template data-ffw-defer="src">
    <img data-defer-src="{{notResolved}}"
         data-ffw-defer-src="{{resolvedImageURL}}">
</ff-template>
```
