## Boilerplate

---

The following section shows a boilerplate for including FACT-Finder Web Components in your website. `custom-elements-es5-adapter.js` and `webcomponents-loader.js` will load the required Polyfills minimized to the needs of the calling browser. 

Note that the [default-styles.css](https://github.com/FACT-Finder-Web-Components/ff-web-components/blob/release/3.0/dist/default-styles.css) within our dist folder is already bundled into `bundle.js` and hence is not required to be referenced on your page. It is only for reference.

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

In browsers where Web Components are not natively supported you might encounter ugly flashing of unstyled content while the page is loading. To prevent this just annotate all elements that have a visual component and are shown immediately on page-load with the `unresolved` attribute.
```html
<ff-record-list unresolved></ff-record-list>
```
Also add the following CSS rule to the top of the page before the appearance of FACT-Finder Web Components:

```html
<head>
    <style>
        [unresolved] {
            opacity: 0;
        }
    </style>
</head>
```

**Note:** The `<style>` tag must be inlined in the main document. If you add it to a CSS file, it might not be loaded fast enough and FOUC might still occur.
