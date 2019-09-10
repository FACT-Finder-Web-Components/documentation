## Using the Header Navigation

The `ff-header-navigation` uses a different approach than other elements. You only
need to add the following to your page:

```html
<ff-header-navigation></ff-header-navigation>
```

This will setup a 3 Layer Navigation

* The first layer of Categories is in the Navigation bar.
* The second and third Layers are shown, when someone hovers over a first layer element.
* Layer 2 are 'groups'
* Layer 3 are the 'links' inside a 'group'

## Configuration

The `ff-header-navigation` has some configuration options to control how the data is loaded and what data is displayed.

### group-count

With the `group-count` attribute you can decide how many 'groups' from layer 2 are shown inside the hover container. Default is 10.
```html
<ff-header-navigation group-count="6"></ff-header-navigation>
```

### group-size

The `group-size` attribute limits how many 'links' inside a 'group' are rendered. Default is 4
```html
<ff-header-navigation group-size="5"></ff-header-navigation>
```

### hide-empty-groups

The `hide-empty-groups` hides all 'group' (layer 2) elements which has no 'links'
(layer 3). Default is true
```html
<ff-header-navigation hide-epmty-groups="false"></ff-header-navigation>
```

### fetch-initial

With the `fetch-initial` you can decide when the navigation data should be
loaded. Usually, the data is loaded as soon as the element is attached to the DOM. But maybe you want to manually
trigger the loading or you want to reload. In that case, set the `fetch-initial` to
'false' and use the `fetch()` method.

```html
<ff-header-navigation fetch-initial="false"></ff-header-navigation>
<script>
    var nav = document.querySelector('ff-header-navigation');
    Polymer.dom(nav).fetch();
</script>
```

## Styling

For this element, the structure of the elements inside the navigation is fixed. You define the appearance of the
navigation only based on CSS. For this purpose, you can use some predefined 'mixins'. They are
'hooks' into the standard CSS of the elements, which are located in the shadow-dom.
The innermost `<a>` tag can be styled via regular CSS.

```html
<!-- mix-ins only work when the style tag has an is="custom-style" attribute-->
<style is="custom-style">
    body {
        font-size: 14px;
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        line-height: 18px;
        color: #333;
        margin: 0px;
    }

    /**
    * Here a list of all available hooks into the 'ff-header-navigation'
    */
    ff-header-navigation {

        /**
        *   The 'nav-item-seperator' is a <div> which is rendered before the first, after
        *   the last and between each 'layer 1' element.
        *   You can use this to implement a separator or space out the layer 1 elements.
        */
        --nav-item-seperator: {
            border-left: 1px solid #cbcbcb;
            height: 40px;
        };

        /**
        *   The 'header' is the container in which all layer 1 elements are inside.
        *   Note: We use internally a 'felx-box' layout and the position and
        *   display properties are crucial for the behavior  of the whole navigation.
        *   Change them only if you exactly know what you are doing!
        */
        --header: {
            font-weight: bold;
            height: 40px;
        };

        /**
        *   A 'nav-item' is a layer 1 item.
        */
        --nav-item: {
            text-align: center;
            vertical-align: middle;
        };
        /**
        *   This is a hook for the pseudo selector ':hover' on a 'nav-item'.
        */
        --nav-item-hover: {
            background-color: white;
        };

        /**
        *   The Group Caption is the name of the layer 2 Category.
        */
        --nav-group-caption: {
            font-weight: bold;
            margin-bottom: 5px;
        };
        /**
        *   This is a hook for the pseudoselctor ':hover' on a 'nav-group-caption'.
        */
        --nav-group-caption-hover: {
            color: cornflowerblue;
        };
        /**
        *   The 'nav-group' is the container of one layer 2 element. Here you can decide how the elements
        *   are distributed inside the hover-container.
        */
        --nav-group: {
            flex: 1;
            margin-left: 10px;
            margin-right: 10px;

            flex-basis: 250px;
            padding: 10px;

            text-align: start;
        };
        /**
        *   The 'wrapper' is a <div> around the whole navigation.
        */
        --wrapper: {
            width: 1000px;
            margin-left: auto;
            margin-right: auto;
        };

        /**
        *   The 'container' is the <div> which is only visible when a layer 1 (nav-item) is hovered.
        *   Inside this element all layer 2 'groups' are rendered.
        */
        --container: {
            box-shadow: rgba(0, 0, 0, 0.55) 0 2px 4px;
        };

        /**
        *   A 'nav-link' is a layer 3 element and allows you to style the links inside a 'group'
        */
        --nav-link: {
            cursor: pointer;
        };

        /**
        *   This is a hook for the pseudo selector ':hover'
        */
        --nav-link-hover: {
            color: cornflowerblue;
        };

    }

    /**
    *   This is a example how ou can use the navigation and integrate it into your current page layout.
    */
    #navigation-container {
        width: 1000px;
        box-shadow: rgba(0, 0, 0, 0.55) 0 1px 4px;
        margin-bottom: 10px;
    }
</style>
<style>
    ff-nav-element div.ff-nav-element {
        height: 100%;
    }
    ff-nav-element a {
        color: #000;
        font-weight: bold;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
</style>
<div id="navigation-container">
    <ff-header-navigation></ff-header-navigation>
</div>
```

## Dynamic content

In some cases you may want custom content, like an Ad Banner or group specific header image, to be displayed inside a
container of a specific group. That's why we have added the ability to define custom content around the groups and a
dynamic slot after each group.

### Container slots

We have a basic "top-bottom-left-right" layout around the container for the actual groups.
![navigation-slots.png](/images/doku/navigation-slots.png "slots")

You can now define HTML elements, which should be only visible when a first level is hovered over. Add an element
with the `slot` attribute and set the value of the attribute with the following pattern:

`container-[direction]-[group name]`

As shown in the example below, we define 4 `div`s. One for each slot in the "Bike" Group.

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

You can also set custom content after each group. Just add an element with the group name as
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
![navigation-group-slot.png](/images/doku/navigation-group-slot.png "navigation group slot")

### mixins

They will be inserted into the layout and you can style them with basic css classes. The layout is `flex`
based and if you really want to, you can also modify that behavior with mixins:

* `--container-top`
* `--container-middle`
* `--container-bottom`


* `--container-left`
* `--container-right`
* `--container-center`

container-top,container-middle and container-bottom are in ` flex-direction: row` inside the --container.
container-left,container-center and container-right are in ` flex-direction: column` inside the --container-middle.

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
