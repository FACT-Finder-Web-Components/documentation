## Boilerplate

---

The following section shows a boilerplate for including FactFinder Web Components in your website. `custom-elements-es5-adapter.js` and `webcomponents-loader.js` will load the required Polyfills minimized to the needs of the calling browser. 

Note that the [default-styles.css](https://github.com/FACT-Finder-Web-Components/ff-web-components/blob/release/4.x/dist/default-styles.css) within our dist folder is already bundled into `bundle.js` and hence is not required to be referenced on your page. It is only for reference.

**Boilerplate Code**
```html
<head>
    <!-- Do not change the order of the scripts to ensure all required polyfills are loaded before our script -->
    <script src="../dist/vendor/custom-elements-es5-adapter.js"></script>
    <script src="../dist/vendor/webcomponents-loader.js"></script>
    <script defer src="../dist/bundle.js"></script>
</head>
```

## Prevent Flash Of Unstyled Content (FOUC)

---

Depending on the browser's page loading time you might encounter ugly flashes of unstyled content and incomplete HTML template pieces. To prevent this simply annotate all elements that have a visual component and are shown immediately after page load with the `unresolved` attribute. This attribute is removed when the component is fully initialized and connected to the document.
```html
<ff-record-list unresolved></ff-record-list>
```
Also add suitable CSS rules to the top of the page before FactFinder Web Components are referenced.

The following CSS snippet hides elements marked as unresolved (as well as their descendants) in the document:

```html
<head>
    <style>
        [unresolved] {
            display: none;
        }
    </style>
</head>
```

> Note
>
> There are several ways to hide an HTML element, like setting its `opacity` or `visibility` CSS property.
> Unlike `display: none`, elements with `opacity: 0` or `visibility: hidden` will occupy their place in the document, but will not be visible.
> You can apply any style you need to `unresolved` elements.
> Please see the official CSS specification for details.
> The `<style>` tag must be inlined in the main document.
> If you add it to a CSS file, it might not be loaded fast enough and FOUC might still occur.
