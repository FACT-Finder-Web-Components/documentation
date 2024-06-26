## Extending the input
The `ff-searchbox` extends a normal `<input>`. Simply add the attribute
`is="ff-searchbox"` to a standard `<input>` element. On ENTER a search
query is fired with the current value.
```html
<input is="ff-searchbox" />
```

### Placeholder
Because the `ff-searchbox` is an extension to a normal `<input>` you can
use all the standard attributes of `<input>` such as `placeholder`.
```html
<input is="ff-searchbox" placeholder="Search..."/>
```

### Select input value on click
With the `select-onclick` attribute you can define whether the value
should be selected when the search box gets focus. *(default is false)*
```html
<input is="ff-searchbox" select-onclick="true"/>
```

## Adding Suggest
If you want a suggest functionality on your page you can set the
`use-suggest` attribute to **true** *(default is true)*. You also need
to implement the `ff-suggest` tag on your page. For more information
take a look at the [Suggest Example](/api/1.x/ff-suggest). The suggest will
only trigger when at least 2 characters are in the input field.
```html
<input is="ff-searchbox" use-sugest="true"/>
```

### On Focus
With the property `suggest-onfocus` set to **true**, the suggest will
open when the user clicks into the input or the input gets focus.
```html
<input is="ff-searchbox" suggest-onfocus="true" />
```

### Hiding Suggest
Usually, you want the suggest to disappear once the user clicks
somewhere else. With the attribute `hidesuggest-onblur` set to **false**
the suggest will only disappear when less than 2 characters are in the
input or when the ESC Key is pressed.
```html
<input is="ff-searchbox" hidesuggest-onblur="false" />
```

## Button extension
The `ff-searchbutton` is an extension of a normal `button`. With the
attribute `is="ff-searchbutton"` it becomes a special button which
connects to the search box and sends a search request to FactFinder.
```html
<button is="ff-searchbutton" >Search</button>
```
