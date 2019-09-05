## Using the Filter Cloud
You can use the Filter Cloud by adding one line to your HTML code.
```html
<ff-filter-cloud></ff-filter-cloud>
```
Doing so will cause the Filter Cloud to use default HTML template, that is `<span data-template="filter">{{element.name}}</span>`, for all filters. Filter Cloud is meant to be used together with ASN, so it will work only when `ff-asn` is present on the page.


### Rendered HTML
When setup like in the example above, the rendered HTML could look like this:
```html
<ff-filter-cloud>
    <span data-template="filter">Element 1</span>
    <span data-template="filter">Element 2</span>
    <span data-template="filter">Element 3</span>
    <span data-template="filter">Element 4</span>
</ff-filter-cloud>
```

## Adding a filter template
To customize filter element appearance, you can add an HTML element annotated with `[data-template-filter]`. You can access the filter group's name through `{{group.name}}`:
```html
<ff-filter-cloud>
    <span data-template="filter">{{group.name}}: {{element.name}}</span>
</ff-filter-cloud>
```

### Rendered HTML
When setup like in the example above, the rendered HTML could look like this:
```html
<ff-filter-cloud>
    <span data-template="filter">Group 1: Element 1</span>
    <span data-template="filter">Group 2: Element 2</span>
    <span data-template="filter">Group 3: Element 3</span>
    <span data-template="filter">Group 4: Element 4</span>
</ff-filter-cloud>
```

Custom filter template can be used with some additional custom HTML:
```html
<ff-filter-cloud>
    <h4>The Filter Cloud</h4>

    <div>
        <div>Custom above</div>
        
        <div data-template="filter" class="filter-element">
            <span>{{group.name}}: {{element.name}}</span><span> ×</span>
        </div>
        
        <div>Custom below</div>
  </div>
</ff-filter-cloud>
```

### Rendered HTML
When setup like in the example above, the rendered HTML could look like this:
```html
<ff-filter-cloud>
    <h4>The Filter Cloud</h4>

    <div>
        <div>Custom above</div>
        
        <div data-template="filter" class="filter-element">
            <span>Group 1: Element 1</span><span> ×</span>
        </div>
        <div data-template="filter" class="filter-element">
            <span>Group 2: Element</span><span> ×</span>
        </div>
        <div data-template="filter" class="filter-element">
            <span>Group 3: Element 3</span><span> ×</span>
        </div>

        <div>Custom below</div>
    </div>
</ff-filter-cloud>
```

**NOTE** If no element annotated with `[data-template-filter]` is specified, a console warning will be displayed and any existing HTML will be replaced with default template. This also applies to default `ff-filter-could` setup.

## Filter click
There is only one delegated `click` listener for the filter elements and if is attached to the `ff-filter-cloud` itself. Click events on filter items bubble up to `ff-filter-cloud` 
and are processed there. By default, clicking on the filter removes it. Users can attach their own `click` and set `e.stopPropagation()` to prevent default behavior. 
See the example below that shows how to create a filter element with clickable 'x' button:
```html
<script>
    function userOnClick(event, context) {
        if (event.target === context) {
            event.stopPropagation();
        }
    }
</script>
<ff-filter-cloud unresolved>
    <div data-template="filter" style="cursor: default" onclick="userOnClick(e, this)">
        <span style="cursor: default" onclick="userOnClick(e, this)">{{element.name}}</span> <span style="cursor: pointer">×</span>
    </div>
</ff-filter-cloud>
```