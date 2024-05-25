## Boilerplate

---

The FactFinder Web Components build contains three files:
1. `elements.build_with_dependencies.html` 
    * This file contains all HTML pieces needed to provide DOM pieces (if needed) and a reference to `elements.build.js`
2. `elements.build.js`
    * Contains all the JavaScript code to make FactFinder Web Components work
3. `webcomponents-lite.min.js`
    * Contains the required polyfill to have FactFinder Web Components technology working in older browsers which don't support the Web Components spec natively. This is **always** required for all versions <= 1.3 


**Boilerplate Code**
```html
<head>
    <meta charset="UTF-8">
    <title>Page Title</title>

    <!-- Never change the order of the boilerplate -->
    <script>
        window.Polymer = window.Polymer || {};
        window.Polymer.dom = 'shady';
    </script>
    <script src="../bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    <link rel="import" href="../bower_components/ff-web-components/dist/elements.build_with_dependencies.html">
    <style>
        [unresolved] {
            visibility: hidden;
        }        
    </style>
    <!-- boilerplate end -->
</head>
```
**NOTE**

The `elements.build.js` file does not need to be referenced directly from within your `index.html` because it is loaded by the `elements.build_with_dependencies.html`. However, it has to be placed in the same directory as `elements.build_with_dependencies.html`!

## Loading Order

---

You **NEVER** want to change the loading or script order. Even the `Polymer.dom` script has to be executed before loading the `webcomponents-lite.min.js` file.

## Prevent Flash Of Unstyled Content (FOUC)

---

In browsers where Web Components are not natively supported you might encounter ugly flashing of unstyled content while the page is loading. To prevent this just annotate all elements that have a visual component and are shown immediately on page load with the `unresolved` attribute.
```html
<ff-record-list unresolved></ff-record-list>
```
Also add the following CSS rule on top of the page before the appearance of FactFinder Web Components:

```html
<head>
    <style>
        [unresolved] {
            visibility: hidden;
        }
    </style>
</head>
```

**Note:** The `<style>` tag must be inlined in the main document. If you add it to a CSS file, it might not be loaded fast enough and FOUC might still occur.
