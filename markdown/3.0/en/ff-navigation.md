## Using the Navigation

To get a simple `ff-navigation` started, you only need to use the following code snippet.

```html
<ff-navigation >
    <ff-navigation-item>
        <div slot="name">{{name}}</div>
    </ff-navigation-item>
</ff-navigation>
```

You need to have at least one `ff-navigation-item` defined. The `ff-navigation-item` is used as a template for all the elements of the Navigation. We use the term 'elements' to describe a single navigation category in a tree-like structure.

In this `ff-navigation-item` you have access to the element's values. Such as `'name'` and `'recordCount'`. We define a `div` for the slot 'content' in which you define how each element of the navigation should be displayed. You can add a css class on this element:

```html
<style>
    .my-item {
        background-color: white;
        padding: 5px;
        min-width: 150px;
    }
</style>
<ff-navigation>
    <ff-navigation-item>
        <div slot="name" class="my-item">{{name}}</div>
    </ff-navigation-item>
</ff-navigation>
```

## Templates

You can also define 3 possible templates, which are used in different situations. To define these set the `'type'` property on the `ff-navigation-item`. A `ff-navigation-item` with no type is used as the **default** fallback template and has to be defined.

### 'header'

The **header** template is used in your first level of the navigation. This allows you to style the Header differently than all following elements. You can define different Layouts inside the navigation element. For example, if you want to display the `'recordCounts'` inside a normal element, but not in the header:

```html
<style>
    .my-item {
        background-color: white;
        padding: 5px;
        min-width: 150px;
    }

    .my-header {
        background-color: lightgray;
        font-weight: bold;
        padding: 5px;
    }
</style>
<ff-navigation>
    <ff-navigation-item>
        <div slot="name" class="my-item">{{name}} ({{recordCount}})</div>
    </ff-navigation-item>

    <ff-navigation-item type="header">
        <div slot="name" class="my-header">{{name}}</div>
    </ff-navigation-item>
</ff-navigation>
```

Each `ff-navigation-item` has a `'cluster-level'` attribute, which indicates in which level of the navigation-hierachy the element is. If you don't need to have a different layout for sub-elements, than you can also style the header based on its `'cluster-level'` attribute:

```html
<style>
    .my-item {
        background-color: white;
        padding: 5px;
        min-width: 150px;
    }

    [cluster-level="0"]{
        background-color: lightgray;
        font-weight: bold;
        padding: 5px;
    }
</style>
<ff-navigation>
    <ff-navigation-item>
        <div slot="name" class="my-item">{{name}}</div>
    </ff-navigation-item>
</ff-navigation>
```

### 'parent'

The **parent** template is used for each element, which has one or more sub-elements. The exception is the first level, where a 'header' template is used. For example, if you want an arrow to indicate that this element has more elements:

```html
<style>
    .my-item {
        background-color: white;
        padding: 5px;
        min-width: 150px;
    }

    .my-parent-item {
        font-weight: bold;
    }
</style>
<ff-navigation>
    <ff-navigation-item>
        <div slot="name" class="my-item">{{name}}</div>
    </ff-navigation-item>

    <ff-navigation-item type="parent">
        <div slot="name" class="my-item my-parent-item">
            {{name}}
            <img src="arrow-right.png">
        </div>
    </ff-navigation-item>
</ff-navigation>
```

A second indicator that an element has sub-elements is the `'has-subelements'` attribute flag, which is set for each element with sub-elements. This allows for another approach of the design from the last example:

```html
<style>
    .my-item {
        background-color: white;
        padding: 5px;
        min-width: 150px;
    }

    [has-subelements] > .my-item {
        font-weight: bold;
    }

    [has-subelements] > .my-item::after {
        content: url('../images/arrow-right.png');
    }
</style>
<ff-navigation>
    <ff-navigation-item>
        <div slot="name" class="my-item">{{name}}</div>
    </ff-navigation-item>
</ff-navigation>
```

### 'layer'

The **layer** template is used for a specific layer. More than one **layer** template can be defined. If a **parent** template is defined and matches, then that one has a higher priority than a **layer** template and is used instead. You can use a **layer** templates like this:

```html
<style>
    .my-item {
        background-color: white;
        padding: 5px;
        min-width: 150px;
    }

    .my-layer1 {
        background-color: red;
        padding: 5px;
    }

    .my-layer2 {
        background-color: blue;
        padding: 5px;
    }
</style>
<ff-navigation>
    <ff-navigation-item>
        <div slot="name" class="my-item">{{name}} ({{recordCount}})</div>
    </ff-navigation-item>

    <ff-navigation-item type="layer1">
        <div slot="name" class="my-layer1"> {{name}}</div>
    </ff-navigation-item>

    <ff-navigation-item type="layer2">
        <div slot="name" class="my-layer2">{{name}}</div>
    </ff-navigation-item>
</ff-navigation>
```

## Layouts

The `ff-navigation` can be used in two different layouts, **horizontal** and **vertical** (default). When using the navigation with the **vertical** layout, you should define a width for it.

In the **vertical** layout, all elements extend to the right.

In the **horizontal** layout, the 'level 0' or 'header' elements extend down. All further elements extend to the right or left side, based on their position on the screen.

```html
<style>
    ff-navigation{
        width: 250px;
    }
</style>
<ff-navigation layout="vertical">
    <ff-navigation-item>
        <div slot="name">{{name}}</div>
    </ff-navigation-item>
</ff-navigation>
```

## Responsiveness

To make the `ff-navigation` responsive, you need to add more slots.

First you need to add a **menu** element to the `ff-navigation`. Only this element will be shown when the attribute 'mobile' of the `ff-navigation` is set to true. This element will internally get a click handler to display the first level of the navigation.

You also need a logic outside of the element, to define when it will switch to the 'mobile' mode. This can be achieved with a little JavaScript and an window resize handler.

```html
<style>

    .my-item {
        background-color: white;
        padding: 5px;
        width: 200px;
    }

    .search-icon {
        width: 24px;
        height: 24px;
        float: left;
        margin-top: 10px;
        margin-right: 5px;
    }
</style>

<script>
    window.addEventListener("resize", function (evt) {
        var navigation = document.querySelector("ff-flyout-navigation");
        if (window.innerWidth < 600) {
            navigation.setAttribute("mobile", "true");
        } else {
            navigation.setAttribute("mobile", "false");
        }
    });
</script>

<ff-navigation layout="horizontal">
    <div slot="menu"> Navigation</div>


    <ff-navigation-item>
        <div slot="content" class="my-item">
            <img data-search class="search-icon" src="search-icon.png">
            {{name}}
        </div>
    </ff-navigation-item>

</ff-navigation>
```

### Touch vs hover

There is no hover on mobile devices, so we need to adjust the behavior of the navigation.

Usually, on desktop devices you can click on an element which you hover, that has sub-elements (parent) and you will navigate to that location. Now, a click on a 'parent' element opens the list of sub-elements. Another click closes the list again.

To have be able to navigate to that 'parent' element, we need to add a seperate click handler. This is done with the 'data-search' property.

The Element with the 'data-search' property will only be visible on elements which has sub-elements, and when the `ff-navigation` has the attribute 'mobile' set to true. A 'click' on that elements navigates the user to that category.
