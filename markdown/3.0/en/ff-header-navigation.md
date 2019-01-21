## Using the Header Navigation

The `ff-header-navigation` uses a different approach than other elements. You only
need to add the following to your page:

```html
<ff-header-navigation></ff-header-navigation>
```

This will setup a three-layer navigation.

* The first layer is always visible and consists of the categories in the FACT-Finder navigation data
* The second and third layers are shown when you hover over a first layer element
* Layer 2 are 'groups'
* Layer 3 are the 'links' inside a 'group'

## Configuration

The `ff-header-navigation` has some configuration options to control how the data is loaded and what data is displayed.

### group-count

With the `group-count` attribute you can decide how many 'groups' from layer 2 are shown inside the hover container. Default is `10`.
```html
<ff-header-navigation group-count="6"></ff-header-navigation>
```

### group-size

The `group-size` attribute limits how many 'links' inside a 'group' are rendered. Default is `4`.
```html
<ff-header-navigation group-size="5"></ff-header-navigation>
```

### hide-empty-groups

Setting `hide-empty-groups` to `true` hides all 'group' (layer 2) elements which have no 'links'
(layer 3). Default is `true`.
```html
<ff-header-navigation hide-empty-groups="false"></ff-header-navigation>
```

### fetch-initial

With `fetch-initial` you can decide when the navigation data should be loaded. Usually, the data is loaded as soon as the element is attached to the DOM. If you want to manually trigger the loading, set `fetch-initial` to `false` and call the `fetch()` method.

```html
<ff-header-navigation fetch-initial="false"></ff-header-navigation>
<script>
    const nav = document.querySelector(`ff-header-navigation`);
    nav.fetch();
</script>
```
You can also call `fetch()` if you want to reload the navigation data regardless of the `fetch-initial` settings.

## Dynamic content

In some cases you may want custom content, like an Ad Banner or a group specific header image, to be displayed inside a container of a specific group. For this purpose you have the option to define custom content surrounding the groups as well as a dynamic slot after each group.

### Container slots

There are four container slots: `top`, `bottom`, `left` and `right`. These surround the actual groups.
![navigation-slots.png](../../images/doku/navigation-slots.png "slots")

You can now define HTML elements which shall only be visible when a specific first level item is hovered over. Add an element with the `slot` attribute and set the value of the attribute with the following pattern:

`container-[direction]-[group name]`

As shown in the example below, we define four `div`s. One for each slot in the "Bike" group.

```html
<style>
    .bike-top {
        height: 50px;
        background-color: #0b97c4;
        text-align: center;
        vertical-align: middle;
    }
</style>
<ff-header-navigation>
    <div slot="container-top-Bike" class="bike-top">bike - top</div>
    <div slot="container-bottom-Bike" class="bike-bottom">bike - bottom</div>
    <div slot="container-left-Bike" class="bike-left">bike - left</div>
    <div slot="container-right-Bike" class="bike-right">bike - right</div>
</ff-header-navigation>
```

### Group slots

You can also insert custom content after each group. Just add an element with the group name as
`slot` attribute, e.g.:

```html
<ff-header-navigation>
    <div slot="Outdoor jackets">
        <a href="http://www.myshop.de">
            More Outdoor jackets...
        </a>
    </div>
</ff-header-navigation>
```

This will add the content under the group items of the 'Outdoor jackets' group.
![navigation-group-slot.png](../../images/doku/navigation-group-slot.png "navigation group slot")


## Rendered HTML

For this element, the structure of the elements inside the navigation is fixed. You define the appearance of the navigation only based on CSS. The following is an example of what `ff-header-navigation` could render.

```html
<ff-header-navigation>
    <div class="ffw-header-nav">

        <div class="ffw-header">
            <div class="ffw-nav-item-separator"></div>

            <ff-nav-element class="ffw-nav-item">
                <a href="...">Outdoor clothing</a></ff-nav-element>

            <div class="ffw-nav-item-separator"></div>

            <ff-nav-element class="ffw-nav-item">
                <a href="...">Climbing</a></ff-nav-element>

            <div class="ffw-nav-item-separator"></div>

            <ff-nav-element class="ffw-nav-item">
                <a href="...">Bike</a></ff-nav-element>

            <div class="ffw-nav-item-separator"></div>

            <ff-nav-element class="ffw-nav-item">
                <a href="...">Winter equipment</a></ff-nav-element>

            <div class="ffw-nav-item-separator"></div>
        </div>

        <div class="ffw-body">

            <div class="ffw-body-top">
                <div slot="container-top-Bike" class="bike-top">bike - top</div>  <!-- custom element in container slot -->
            </div>

            <div class="ffw-body-middle">

                <div class="ffw-body-left">
                    <div slot="container-left-Bike" class="bike-left">bike - left</div>  <!-- custom element in container slot -->
                </div>

                <div class="ffw-body-center">

                    <div class="ffw-nav-group">
                        <ff-nav-element class="ffw-nav-group-caption">
                            <a href="...">Bike parts</a></ff-nav-element>

                        <ff-nav-element class="ffw-nav-link">
                            <a href="...">Tires &amp; tubes</a></ff-nav-element>
                        <ff-nav-element class="ffw-nav-link">
                            <a href="...">Bike pedals</a></ff-nav-element>
                        <ff-nav-element class="ffw-nav-link">
                            <a href="...">Bike brakes</a></ff-nav-element>
                        <ff-nav-element class="ffw-nav-link">
                            <a href="...">Bike frames</a></ff-nav-element>

                        <div slot="Bike parts">  <!-- custom element in group slot -->
                            <a href="http://www.myshop.de">More bike parts...</a>
                        </div>
                    </div>

                    <div class="ffw-nav-group">
                        <ff-nav-element class="ffw-nav-group-caption">
                            <a href="...">Bike accessories</a></ff-nav-element>

                        <ff-nav-element class="ffw-nav-link">
                            <a href="...">Bike lights</a></ff-nav-element>
                        <ff-nav-element class="ffw-nav-link">
                            <a href="...">Computers &amp; navigation</a></ff-nav-element>
                        <ff-nav-element class="ffw-nav-link">
                            <a href="...">Bottles &amp; holders</a></ff-nav-element>
                        <ff-nav-element class="ffw-nav-link">
                            <a href="...">Bike locks</a></ff-nav-element>
                    </div>

                    <!-- more ffw-nav-groups -->
                </div>

                <div class="ffw-body-right">
                    <div slot="container-right-Bike" class="bike-right">bike - right</div>  <!-- custom element in container slot -->
                </div>
            </div>

            <div class="ffw-body-bottom">
                <div slot="container-bottom-Bike" class="bike-bottom">bike - bottom</div>  <!-- custom element in container slot -->
            </div>
        </div>

    </div>
</ff-header-navigation>
```

## Manipulating href of navigation elements

The URL a navigation element points to is configured in FACT-Finder. You have, however, the opportunity to change these URLs client-side. This could be useful if you want to open a new page with a full page reload. By default `ff-header-navigation` changes pages in-place like a single page application.

To access navigation data you have to subscribe to the `ResultDispatcher`'s `navigation` event.
```javascript
document.addEventListener(`ffReady`, () => {
    factfinder.communication.ResultDispatcher.subscribe(`navigation`, (navData, e) => {
        // set href's of all elements on clusterLevel 0
        navData[0].forEach(navEl => navEl.__TARGET_URL__.setUrl(`/targetUrl`));
    });
});
```
The event handler receives an `Array` of all navigation elements as its first parameter (here: `navData`). These elements are grouped by their `clusterLevel`. That means `navData` is an array with the length of the amount of `clusterLevel`s defined in FACT-Finder. Each element contains another `Array` with all navigation elements on the `clusterLevel` equal to the index in the array.
```javascript
navData === [
    [{ clusterLevel: 0, ... }, ...],
    [{ clusterLevel: 1, ... }, ...],
    [{ clusterLevel: 2, ... }, ...],
    ...
]
```
You can set the desired URL via `navEl.__TARGET_URL__.setUrl()` as shown in the snippet above.

To allow traversal between `clusterLevel`s, each navigation element contains a `__SUB_ELEMENTS__` property which is an array of all direct children within the navigation tree.
