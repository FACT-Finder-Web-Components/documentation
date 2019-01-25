## Upgrade from version 1.2.x to 3.0.0
We strongly recommend to upgrade your system to use the latest version of FACT-Finder Web Components. While we will do critical bug fixes for older versions, new features are likely to be implemented only in newer versions. In addition the newer versions stick to newer technology decreasing your loading time and improving internal speed. We promise to make each upgrade progress as ease as possible.

In general you can keep track of our progress, changes and new features in the [release notes](https://github.com/FACT-Finder-Web-Components/ff-web-components/blob/master/CHANGELOG.md).

There are only two major changes and some minor API changes to take care of when upgrading from version 1.2.x to version 3.0.0,
which can be taken care of quickly and easily:

### 2 major changes
- Aligning with the current trend FACT-Finder Web Components are now shipped as ES6 Module instead of HTML Imports.
Hence you have to load `bundle.js` instead of the HTML import as follows:
   
```html
   <!-- Before -->
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
     
   <!-- In version 3 -->
   <script src="../node_modules/ff-web-components/dist/vendor/custom-elements-es5-adapter.js"></script>
   <script src="../node_modules/ff-web-components/dist/vendor/webcomponents-loader.js"></script>
   <script defer src="../node_modules/ff-web-components/dist/bundle.js"></script>
 <style>
     [unresolved] {
         opacity: 0;
     }        
 </style>
```

- With [Polymer 3](https://www.polymer-project.org/3.0/docs/devguide/feature-overview) extending built-in HTML elements
is not possible anymore. Hence you have to nest an `input` into `ff-searchbox` and a `button` into `ff-searchbutton`
as followed:

```html
    <!-- Before -->
    <ff-searchbox ...></ff-searchbox>
    <ff-searchbutton ...></ff-searchbutton>
           
    <!-- In version 3. -->
    <ff-searchbox ...>
        <input .../>
    </ff-searchbox>
    <ff-searchbutton>
        <button ...></button>
    </ff-searchbutton>
```
Note that native `input` properties like `placeholder` stay within the `input` tag, while enhancements like 
`suggest-onfocus` move into `ff-searchbox`. If you had used css to style your search input and button don't forget to adjust your selectors accordingly.


### Minor API changes to take care of
Beside the two major changes the following list contains all breaking changes.
If we have missed something, we would be happy if you [contact](contacts) us.

- `ff-asn-group`
    - use `<div slot="groupCaption" ...>` instead of `<div data-container="groupCaption" ...>`
- `ff-asn-group-element`
    - use `<div slot="selected" ...>` instead of `<div data-selected ...>`
    - use `<div slot="unselected" ...>` instead of `<div data-unselected ...>`
- `ff-asn-group-slider`
    - use `<div slot="groupCaption" ...>` instead of `<div data-container="groupCaption" ...>`
- `ff-slider`
    - use `<div slot="slider1" id="slider1" ...></div>` instead of `<div data-slider="1" ...></div>`
    - use `<div slot="slider2" id="slider2" ...></div>` instead of `<div data-slider="2" ...></div>`
- `ff-carousel`
    - removed `getCurrentSlide` method, use `currentSlide` property directly instead
    - removed `getMaxSlides` method, use `maxSlides` property directly instead
- [Polymer 3](https://www.polymer-project.org/3.0/docs/devguide/feature-overview) related breaking changes:
    - Polymer shady DOM was removed, because it is not necessary anymore. In case you used something like
    `Polymer.dom(HTMLElement).innerHTML = ...` you now have to use the native DOM API directly like
    `HTMLElement.innerHTML = ...`
    - Polymer 1 did remove `unresolved` attribute of `body`-tag automatically. Polymer 3 does not.
    If you depend on the old behaviour, you can retain it with the following code:
        ```js
        function resolve() {
          document.body.removeAttribute('unresolved');
        }
        
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('DOMContentLoaded', resolve);
        }
        ```

### Removal of CSS mixins

CSS mixins have been removed. You can now directly apply CSS rules.

#### ff-header-navigation
```
--wrapper  // previous CSS-mixin
ff-header-navigation .ffw-header-nav  // now recommended CSS-selector

--header
ff-header-navigation .ffw-header

--header-hover
ff-header-navigation .ffw-header:hover

--nav-item-seperator
ff-header-navigation .ffw-nav-item-separator

--container
ff-header-navigation .ffw-body

--container-top
ff-header-navigation .ffw-body-top

--container-middle
ff-header-navigation .ffw-body-middle

--container-left
ff-header-navigation .ffw-body-left

--container-center
ff-header-navigation .ffw-body-center

--container-right
ff-header-navigation .ffw-body-right

--container-bottom
ff-header-navigation .ffw-body-bottom

--nav-group
ff-header-navigation .ffw-nav-group

--nav-group-hover
ff-header-navigation .ffw-nav-group:hover

--nav-group-caption
ff-nav-element.ffw-nav-group-caption

--nav-group-caption-hover
ff-nav-element.ffw-nav-group-caption:hover

--nav-link
ff-nav-element.ffw-nav-link

--nav-link-hover
ff-nav-element.ffw-nav-link:hover

--nav-item
ff-nav-element.ffw-nav-item

--nav-item-hover
ff-nav-element.ffw-nav-item:hover
```

#### ff-nav-element
```
--nav-element-a
ff-nav-element a
```
