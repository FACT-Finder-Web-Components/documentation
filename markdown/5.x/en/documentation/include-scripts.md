## Including Scripts

---

This page shows how to include FactFinder Web Components in your website.
There is one essential and two optional script files to reference in your page's `head` section.


### Regular setup

Typically, you will only need the `bundle.js` file which comprises the FactFinder Web Components library.

```html
<head>
    <script defer src="../dist/bundle.js"></script>
</head>
```

It is recommended to use the `defer` attribute to avoid blocking the page buildup process while `bundle.js` is being downloaded.


### Setup with polyfill

If you must support old browsers that do not implement the [_Web Components **Web API**_](https://developer.mozilla.org/en-US/docs/Web/API/Web_components), you can additionally include polyfills that provide a replacement implementation.

```html
<head>
    <!-- Do not change the order of the scripts to ensure all required polyfills are loaded before the Web Components script -->
    <script src="../dist/vendor/custom-elements-es5-adapter.js"></script>
    <script src="../dist/vendor/webcomponents-loader.js"></script>
    <script defer src="../dist/bundle.js"></script>
</head>
```

`custom-elements-es5-adapter.js` and `webcomponents-loader.js` will load the required polyfills minimized to the needs of the calling browser.


### A note on default styles

If you inspect the zip-file in which FactFinder Web Components is provided, you might find the [default-styles.css](https://github.com/FACT-Finder-Web-Components/ff-web-components/blob/release/5.x/dist/default-styles.css) file within the `dist` folder.
Note that this file is already bundled into `bundle.js` and is not required to be referenced separately on your page.
It is only provided for your reference when you need to look up the Web Components' default styling.


## Prevent Flash Of Unstyled Content (FOUC)

---

Depending on the browser's page loading time you might encounter unpleasant flashes of unstyled content and incomplete HTML template pieces.
To prevent this, simply annotate all elements that have a visual component and are shown immediately after page load with the `unresolved` attribute.
This attribute is removed automatically when the component is fully initialized and connected to the document.

```html
<ff-record-list unresolved></ff-record-list>
```

The `unresolved` attribute, however, does not come with a default styling.
You have to add an appropriate CSS rule to the top of your page before FactFinder Web Components are referenced.

The following CSS snippet hides elements marked as `unresolved` (as well as their descendants) in the document:

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
>
> The `<style>` tag should be inlined in the main document.
> If you add it to a CSS file, it might not be loaded quickly enough and FOUC might still occur.
