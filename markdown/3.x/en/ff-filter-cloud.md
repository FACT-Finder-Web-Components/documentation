## Overview
Filter Cloud displays all filters that are currently selected through `ff-asn`. As the component is meant to be used together with ASN, it will work only when `ff-asn` is present on the page.

## Specifying templates

### Setup
You can use `ff-filter-cloud` by adding one line to your HTML code:
```html
<ff-filter-cloud></ff-filter-cloud>
```
A default template will be applied to all filters:
```html
<span data-template="filter">{{element.name}}</span>
```
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

### Setup
To customize filter element appearance, you can add an HTML element annotated with `[data-template=filter]`. You can access the filter group's name through `{{group.name}}`:
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

### Setup
A custom filter template can be used with some additional custom HTML.
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

**NOTE** If no element annotated with `[data-template=filter]` is specified, a console error will be displayed and the component will not render itself.
The only exception where `[data-template=filter]` may be omitted is when `ff-filter-cloud` is left completely empty.

### Setup
The following is an error - `ff-filter-cloud` has no way of determining where to render its filter-item elements.
```html
<ff-filter-cloud>
    <span>Custom HTML</span>
</ff-filter-cloud>
```

## Blacklist
If you want to exclude specific filter groups from the filter cloud, you can use the `blacklist` attribute. You may specify 
as many groups as you need, separated by commas. The values must correspond to the group name or associatedFieldName property returned by FactFinder.

### Setup
This example will blacklist all filters applied by the `Price` and `Size` groups.
```html
<ff-filter-cloud blacklist="Price,Size">
    <div>
         <span data-template="filter">{{group.name}}: {{element.name}}</span>
    </div>
</ff-filter-cloud>
```

## Whitelist
If you want to exclusively specify each filter group, you can use the `whitelist` attribute. Like in blacklist, you may specify 
as many groups as you need, separated by commas. The values must correspond to the group name or associatedFieldName property returned by FactFinder.

### Setup
This example will whitelist only filters applied by the `Gender` and `Category` groups.
```html
<ff-filter-cloud whitelist="Gender,Category">
    <div>
         <span data-template="filter">{{group.name}}: {{element.name}}</span>
    </div>
</ff-filter-cloud>
```

## Filter click
There is only one delegated `click` listener for the filter elements and it is attached to `ff-filter-cloud` itself. Click events on filter items bubble up to `ff-filter-cloud` 
and are processed there. By default, clicking on a filter item removes it. You can attach your own `click` listener and call `event.stopPropagation()` to prevent default behavior. 
See the example below that shows how to create a filter element with clickable 'x' button:
```html
<style>
    .btn-deselect {
        cursor: pointer;
    }
    .filter {
        cursor: default;
    }
</style>
<script>
    function userOnClick(event) {
        if (!event.target.classList.contains('btn-deselect')) {
            event.stopPropagation();
        }
    }
</script>
<ff-filter-cloud unresolved>
    <div data-template="filter" class="filter" onclick="userOnClick(event)">
        <span>{{element.name}}</span> <span class="btn-deselect">×</span>
    </div>
</ff-filter-cloud>
```
