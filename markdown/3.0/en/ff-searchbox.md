## Setup the communication
First, add the `ff-communication` tag to every page that uses
**FACT-Finder Web Components**. This element is used to define certain
parameters for the communication between FACT-Finder Web Components and FACT-Finder
and their behavior. You need to configure the location of your
FACT-Finder Server and the target channel by setting the `url` and
`channel` HTML attributes.

The `ff-communication` element has more attributes. One example is the
`default-query` attribute used to define a default search term that is
always used on pageload. When using the `search-immediate` attribute,
which requires no parameter, the search query is fired once the page has
finished loading.

The following code-example shows the aforementioned configuration.

```html
<ff-communication url="http://web-components.fact-finder.de/FACT-Finder7.1-Demoshop"
                  version="7.1"
                  default-query="bagpack"
                  channel="bergfreunde-co-uk"
                  search-immediate>
</ff-communication>
```
For more information, see the [API reference](/api/ff-searchbox#tab=api).

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
Because the `ff-searchbox` does not limit features o HTML it wraps, 
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
take a look at the [Suggest Example](/api/ff-suggest). The suggest will
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
somewhere else. With the attribute `hidesuggest-onblur` set to `"false"`
the suggest will only disappear when less than 2 characters are in the
input or when the ESC Key is pressed.
```html
<ff-searchbox hidesuggest-onblur="false">
    <input />
</ff-searchbox>
```

## Wrapping button element with ff-searchbutton
The `ff-searchbutton` wraps a regular HTML `<button>` element. Surrounded
with `<ff-searchbutton>` tag it becomes a special button which connects
to the search box and sends a search request to FACT-Finder.
```html
<ff-searchbutton>
    <button>>Search</button>
</ff-searchbutton>
```
