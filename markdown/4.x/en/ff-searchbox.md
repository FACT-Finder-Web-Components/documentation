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
If you want a suggest functionality on your page you can set the
`use-suggest` attribute to `"true"` *(default is `"true"`)*. You also need
to implement the `ff-suggest` tag on your page. For more information
take a look at the [Suggest Example](/api/4.x/ff-suggest). The suggest will
only trigger when at least 2 characters are typed in the input field.
```html
<ff-searchbox use-suggest="true">
    <input />
</ff-searchbox>
```

### On Focus
With the property `suggest-onfocus` set to `"true"`, the suggest will
open when the user clicks into the input or the input gets focus.
```html
<ff-searchbox suggest-onfocus="true">
    <input />
</ff-searchbox>
```

### Hiding Suggest
Usually, you want the suggest to disappear once the user clicks
somewhere else. With the attribute `hide-suggest-onblur` set to `"false"`
the suggest will only disappear when less than 2 characters are in the
input or when the ESC Key is pressed.
```html
<ff-searchbox hide-suggest-onblur="false">
    <input />
</ff-searchbox>
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
