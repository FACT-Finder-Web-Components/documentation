## Overview

The `ff-searchbox` element provides a text `input` element that can invoke search requests.
It offers various additional features compared to the native HTML `input` element.
Also, there are options to link it with `ff-searchbutton` and `ff-suggest`.

Most basic usage:

```html
<ff-searchbox></ff-searchbox>
```

This setup will render a default `input` element inside and invoke a search request when ENTER is pressed.

By default, it will also send _Suggest_ requests when typing.
(In order to display the suggestions, an additional [ff-suggest](/api/5.x/ff-suggest) element is required.)


### Custom `input` element

You can define your own `input` element with required attributes etc., by placing it into the body of `ff-searchbox`.

```html
<ff-searchbox>
    <input placeholder="Search..." />
</ff-searchbox>
```


### Linking with `ff-searchbutton`

In addition to initiating the search by pressing the ENTER key, you can offer clickable buttons with the `ff-searchbutton` element.

`ff-searchbutton` relies on the current value in `ff-searchbox`.
As a page may have multiple search boxes and search buttons, each button needs to know which search box's current value it shall use to invoke a search request from.
Therefore, it is necessary to link these two elements explicitly.
There are two options to establish this link.

> Note
>
> Unlike `ff-searchbox`, you always have to specify a `button` element in the `ff-searchbutton`'s body.


#### Linking by nesting

By nesting the `ff-searchbutton` inside an `ff-searchbox`, the elements automatically detect their relation.

```html
<ff-searchbox>
    <input type="search">
    <ff-searchbutton><button>Search</button></ff-searchbutton>
</ff-searchbox>
```


#### Linking via attributes

Similar to the native HTML elements `label` and `input` you can define the `id` attribute on `ff-searchbox` and the `for` attribute on `ff-searchbutton` and give them the same value.
With this approach the elements' locations in the DOM are irrelevant.

```html
<div>
    <ff-searchbox id="ffSearchBox">
        <input type="search">
    </ff-searchbox>
</div>
<div>
    <ff-searchbutton for="ffSearchBox">
        <button>Search</button>
    </ff-searchbutton>
</div>
```


### Select input value on click

With the `select-onclick` attribute you can define whether the current text should be selected when the search box gets focus.
*(default is `"false"`)*

```html
<ff-searchbox select-onclick="true">
    <input />
</ff-searchbox>
```


## Adding Suggest

By default, `ff-searchbox` sends a _Suggest_ request every time its text changes and there are at least two characters.

To display the suggestions an `ff-suggest` element is required.
Please see [_Suggest_](/api/5.x/ff-suggest) for information on how to integrate the element.

If you do **not** wish `ff-searchbox` to query suggestions, you can turn this behavior off by setting the `use-suggest` attribute to `"false"`.

```html
<ff-searchbox use-suggest="false"></ff-searchbox>
```


### On Focus

With the property `suggest-onfocus` set to `"true"`, the _Suggest_ will open when the user clicks into the input or the input gets focus.

```html
<ff-searchbox suggest-onfocus="true"></ff-searchbox>
```


## Adding Popular Searches

To activate the Popular Searches feature you set the `popular-searches` attribute.

```html
<ff-searchbox popular-searches></ff-searchbox>
```

See the [Popular Searches](/api/5.x/popular-searches) article for details.
