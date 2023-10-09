## Wrapping input element with ff-searchbox
The `ff-searchbox` wraps a regular HTML `<input>` element. Simply place
`<input>` between `<ff-searchbox>` tags. On ENTER a search query to FACT-Finder
is fired with the current input value.
```html
<ff-searchbox>
    <input />
</ff-searchbox>
```

### Placeholder
Because the `ff-searchbox` does not limit features of HTML it wraps, 
you can use all the standard attributes of `<input>` such as `placeholder`.
```html
<ff-searchbox>
    <input placeholder="Search..." />
</ff-searchbox>
```

### Select input value on click
With the `select-onclick` attribute you can define whether the value
should be selected when the search box gets focus. *(default is `"false"`)*
```html
<ff-searchbox select-onclick="true">
    <input />
</ff-searchbox>

```

## Adding Suggest
If you want a Suggest functionality on your page you can set the
`use-suggest` attribute to `"true"` *(default is `"true"`)*. You also need
to implement the `ff-suggest` tag on your page. For more information
take a look at the [Suggest Example](/api/4.x/ff-suggest). The Suggest will
only trigger when at least 2 characters are typed in the input field.
```html
<ff-searchbox use-suggest="true">
    <input />
</ff-searchbox>
```

### On Focus
With the property `suggest-onfocus` set to `"true"`, the Suggest will
open when the user clicks into the input or the input gets focus.
```html
<ff-searchbox suggest-onfocus="true">
    <input />
</ff-searchbox>
```

### Hiding Suggest
Usually, you want the Suggest to disappear once the user clicks somewhere else.
This happens with the default settings.

The default settings are **no longer recommended**, however.

Instead, you should prefer to set `ff-searchbox`'s `hide-suggest-onblur` attribute to `"false"` and set `ff-suggest`'s `hide-onblur` to `"true"`.

See [ff-suggest](/api/4.x/ff-suggest) for more details.

```html
<ff-searchbox hide-suggest-onblur="false"></ff-searchbox>
```

## Wrapping button element with ff-searchbutton
The `ff-searchbutton` wraps a regular HTML `<button>` element. Surrounded
with `<ff-searchbutton>` tag it becomes a special button which connects
to the search box and sends a search request to FACT-Finder.
```html
<ff-searchbutton>
    <button>Search</button>
</ff-searchbutton>
```
