## Upgrade from version 1.2.x to 3.0.0
We strongly recommend upgrading your system to use the latest version of FACT-Finder Web Components. While we will do critical bug fixes for older versions, new features will likely only be implemented in newer versions. In addition, the newer versions utilize newer technology, decreasing your loading time and improving internal speed. We promise to make each upgrade go as smoothly as possible.

In general you can keep track of our progress, changes and new features in the [release notes](https://github.com/FACT-Finder-Web-Components/ff-web-components/blob/master/CHANGELOG.md).

The main difference of _1.2.x_ and _3.0.0_ is, that we have internal moved from [Polymer 1](https://polymer-library.polymer-project.org/1.0/docs/devguide/feature-overview) to [Polymer 3](https://polymer-library.polymer-project.org/3.0/docs/about_30) and are half way through to migrating to [LitElement](https://lit-element.polymer-project.org/).

There are only two major changes and some minor API changes to take care of when upgrading from version 1.2.x to version 3.0.0. In addition, CSS mixins have been removed. You can use normal CSS selector instead. Further more `ffw-` is introduced as the prefix for FACT-Finder Web Components custom class names.

### 2 major changes
- Aligning with the current trend FACT-Finder Web Components are now shipped as plain JavaScript instead of HTML Imports. Which is why you have to load `bundle.js` instead of the previous HTML import.
   
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
    
    <!-- You are free to customize those styles to your needs -->
    <link rel="stylesheet" type="text/css" href="../dist/default-styles.css" />

    <!-- Do not change the order of the scripts, to ensure all required polyfills are loaded before our script -->
    <script src="../dist/vendor/custom-elements-es5-adapter.js"></script>
    <script src="../dist/vendor/webcomponents-loader.js"></script>
    <script defer src="../dist/bundle.js"></script>
    <style>
        [unresolved] {
            opacity: 0;
        }        
    </style>
```

- `ff-searchbox` and `ff-searchbutton` don't extend native built-in HTML `input` and `button` anymore. Hence you have to put an `input` into `ff-searchbox` and a `button` into `ff-searchbutton`
as followed:

```html
    <!-- Before -->
    <ff-searchbox ...></ff-searchbox>
    <ff-searchbutton ...></ff-searchbutton>
           
    <!-- In version 3 -->
    <ff-searchbox ...>
        <input .../>
    </ff-searchbox>
    <ff-searchbutton>
        <button ...></button>
    </ff-searchbutton>
```
Note that native `input` properties like `placeholder` stay within the `input` tag, while enhancements like 
`suggest-onfocus` move into `ff-searchbox`. If you're using CSS to style your search input and button don't forget to adjust your selectors accordingly.


### Minor API changes to take care of
The following list contains all remaining breaking changes.
If we have missed something, we would be happy if you [contacted](contacts) us.

- `ff-asn-group`
    - attribute `laszy-load` is replaced by `lazy-load`
    - use `<div slot="groupCaption" ...>` instead of `<div data-container="groupCaption" ...>`
- `ff-asn-group-element`
    - use `<div slot="selected" ...>` instead of `<div data-selected ...>`
    - use `<div slot="unselected" ...>` instead of `<div data-unselected ...>`
- `ff-asn-group-slider`
    - use `<div slot="groupCaption" ...>` instead of `<div data-container="groupCaption" ...>`
- `ff-carousel` is removed from this library
- `ff-navigation`
    - use `data-content="menu"` instead of `slot="menu"`
- `ff-navigation-item`
    - use `data-content="item"` instead of `slot="content"`
- `ff-paging-item`
    - `productsPerPageItem` property was renamed to `pagingItem`
- `ff-paging-set`
    - removed `hide()` and `show()` functions, use `hideSelf()` and `showSelf()` instead
- `ff-slider`
    - use `<div slot="slider1" id="slider1" ...></div>` instead of `<div data-slider="1" ...></div>`
    - use `<div slot="slider2" id="slider2" ...></div>` instead of `<div data-slider="2" ...></div>`
- `ff-sortbox`
    - `key` for _Relevance_ changed from `key="null.desc"` to `key="ff.relevance"`
    - introduced new container `<div class="ffw-selected-container">`. This container is always visible and contains the selected `ff-sortbox-item` 
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

#### ff-navigation-item
```
--container-mixin
ff-navigation-item .ffw-item-container
```

#### ff-paging-item
```
--paging-item-cursor-mixin
ff-paging-item .ffw-cursor
```

#### ff-products-per-page-dropdown
```
`--dropdown-item-container`
.ffw-ppp-dropdown-container
```

#### ff-sortbox
```
`--sort-item-container`
.ffw-dropdown-container
```

### Rename of class names

#### ff-products-per-page-dropdown
```
ff-ppp-drowdown-closed // old class name
ffw-ppp-dropdown-closed // new classname

ff-ppp-dropdown-container
ffw-ppp-dropdown-container
```

#### ff-products-per-page-item
```
selected
ffw-selected
```

### ff-sortbox-item
```
selected
ffw-selected

showSelected
ffw-showSelected
```

### Worth mentioning
We have replaced all Polymer `tap` events through regular `click` events as [Polymer recommended](https://polymer-library.polymer-project.org/3.0/docs/devguide/gesture-events). Affected components are:

`ff-asn-group`, `ff-asn-group-element`, `ff-asn-remove-all-filter`, `ff-breadcrumb-trail-item`, `ff-campaign-advisor-answer`, `ff-nav-element`, `ff-navigation-item`, `ff-paging-dropdown`, `ff-paging-item`, `ff-products-per-page-dropdown`, `ff-products-per-page-item`, `ff-search-feedback`, `ff-single-word-search-record`, `ff-sortbox-item`, `ff-tag-cloud`
