## Boilerplate

---

The FACT-Finder Web Components build contains 3 files:
1. `elements.build_with_dependencies.html` 
    * This file contains all HTML peaces needed to provide DOM peaces (if needed) and a reference to `elements.build.js`
2. `elements.build.js`
    * Contains all the Javascript code to have everything working like expected
3. `webcomponents-lite.min.js`
    * Contains the required polyfill to have web components technology working in older browser which aren't supporting web components natively. This is __always__ required for all versions <= 1.3 


__Boilerplate Code__
````html
<head>
    <meta charset="UTF-8">
    <title>Page Title</title>

    <!-- Never change the order of the boilerplate -->
    <script>
        var Polymer = Polymer || {};
        Polymer.dom = 'shady';
    </script>
    <script src="../bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    <link rel="import" href="../bower_components/ff-web-components/dist/elements.build_with_dependencies.html">
    <style>
        [unresolved] {
            opacity: 0;
        }        
    </style>
    <!-- boilerplate end -->
</head>
````
**NOTE**

The `elements.build.js` file doens't need to be referenced directly from withing your `"index.html"` cause it's loaded by the `elements.build_with_dependencies.html`. However it has to be placed in the same directory as `elements.build_with_dependencies.html` is placed!

## Loading Order

---

You __NEVER__ want to change the loading or script order. Even the `Polymer.dom` script has to be inlined before loading the `webcomponents-lite.min.js` file. 

## Prevent Flash Of Unstyled Content (FOUC)

---

In browsers where web components are not natively supported you might encounter ugly flash of unstyled content on page load. To prevent this we added a remove unresolved attribute behavior to all elements with an visual component (e.g. ff-record-list, ff-asn and so on). Just annotate all elements which are shown immediately on page load with the [unresolved] attribute. In Addition add the following CSS rule on top of the page before the appearance of your custom elements:

```html
<head>
    <style>
        [unresolved] {
            opacity: 0;
        }
    </style>
</head>
```

**NOTE**

The `<style>` tag has to be inlined in the main document. If you'll add it to css file it might happen that FOUC appears until your CSS file is loaded properly.