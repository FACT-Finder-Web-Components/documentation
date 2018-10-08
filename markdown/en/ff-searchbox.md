## Setup the communication
First, add the `ff-communication` tag to every page that uses
**FACT-Finder Webcomponents**. This element is, in part, used to define
the location of your FACT-Finder Server using the `url` attribute and
the `channel` you want to use using the `channel` attribute.

The `ff-communication` Tag has more attributes for example the `default-query` attribute to define a Searchterm whis is always used on pageload. When using the `search-immediate` attribute, which requires no parameter, the first search query is fired once the page has finished loading.

For more information, see the [API reference](/api/ff-searchbox#tab=api) on the bottom of this page.

```html
<ff-communication url="http://web-components.fact-finder.de/FACT-Finder7.1-Demoshop"
                  version="7.1"
                  default-query="bagpack"
                  channel="bergfreunde-co-uk"
                  search-immediate>
</ff-communication>
```

## Extending the input
The `ff-searchbox` extends a normal `<input>`. Simply add the attribute `is="ff-searchbox"` to a standard `<input>` element.
On ENTER a search event is fired with the current value.
```html
<input is="ff-searchbox" />
```

### Placeholder
Because the `ff-searchbox` is an extension to a normal `<input>` you can use all the normal attributes on the `<input>` such as `placeholder`
```html
<input is="ff-searchbox" placeholder="Search..."/>
```

### On Click
With the `select-onclick` attribute you can define if the value should be selected when the searchbox gets the focus. *(default is false)*
```html
<input is="ff-searchbox" select-onclick="true"/>
```

## Adding Suggest
If you want a Suggest function on your page you can set the `use-suggest` attribute to **true** *(default is true)*. 
You also need to implement the ``ff-suggest`` Tag on your page. For more information take a look at the 
[Suggest Example](/api/ff-suggest).
The Suggest will only trigger when at least 2 characters are in the input field.
```html
<input is="ff-searchbox" use-sugest="true"/>
```

### On Focus
With the property `suggest-onfocus` set to **true** the Suggest will open when the user clicks into the input or the input gets focus from somewhere.
```html
<input is="ff-searchbox" suggest-onfocus="true" />
```

### Hiding Suggest
Usually, you want the Suggest to disappear once the user clicks somewhere else. With the attribute `hidesuggest-onblur` set to **true** the Suggest will only disappear when less than 2 characters are in the input or when the ESC Key is pressed.
```html
<input is="ff-searchbox" hidesuggest-onblur="false" />
```

## Button extension
The `ff-searchbutton` is an extention of a normal `button`. With the attribute `is="ff-searchbutton"` it becomes a special button which connects to the searchbox and sends a search request to FACT-Finder.
```html
<button is="ff-searchbutton" >Search</button>
```
