## Upgrade from version 1.2.x to 3.0.0
We strongly recommend upgrading your system to use the latest version of FACT-Finder Web Components. While we will do critical bug fixes for older versions, new features will likely only be implemented in newer versions. In addition, the newer versions utilize newer technology, decreasing your loading time and improving internal speed. We promise to make each upgrade go as smoothly as possible.

In general you can keep track of our progress, changes and new features in the [changelog](https://github.com/FACT-Finder-Web-Components/ff-web-components/blob/release/3.x/CHANGELOG.md) of the _3.x_ branch or on the [release page](https://github.com/FACT-Finder-Web-Components/ff-web-components/releases).

The main difference between _1.2.x_ and _3.0.0_ is that we internally moved from [Polymer 1](https://polymer-library.polymer-project.org/1.0/docs/devguide/feature-overview) to [Polymer 3](https://polymer-library.polymer-project.org/3.0/docs/about_30) and are half way done migrating to [LitElement](https://lit-element.polymer-project.org/).

There are only two major changes and some minor API changes to take care of when upgrading from version _1.2.x_ to version _3.0.0_. In addition, CSS mixins have been removed. You can use regular CSS selectors instead. Furthermore, `ffw-` is introduced as the prefix for FACT-Finder Web Components custom class names.

### 2 major changes
- As [HTML-Imports](https://w3c.github.io/webcomponents/spec/imports/) didn't become part of the HTML and DOM specs, unlike the rest of the Web Components spec, FACT-Finder Web Components now ship as plain JavaScript instead of HTML. Which is why you have to load `bundle.js` instead of the previous HTML-Imports.
   
```html
    <!-- Before -->
    
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
      
    <!-- In version 3 -->

    <!-- Do not change the order of the scripts, to ensure all required polyfills are loaded before our script -->
    <script src="../dist/vendor/custom-elements-es5-adapter.js"></script>
    <script src="../dist/vendor/webcomponents-loader.js"></script>
    <script defer src="../dist/bundle.js"></script>
    <style>
        [unresolved] {
            visibility: hidden;
        }        
    </style>
```

- `ff-searchbox` and `ff-searchbutton` don't extend native built-in HTML `input` and `button` anymore. Hence you have to put an `input` into `ff-searchbox` and a `button` into `ff-searchbutton` as follows:

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
Note that native `input` properties like `placeholder` stay within the `input` tag, while enhancements like for instance the `suggest-onfocus` attribute are placed onto `ff-searchbox`. If you are using CSS to style your search input and button, don't forget to adjust your selectors accordingly.


### Minor API changes to take care of
The following list contains all remaining breaking changes. In cases of HTML changes don't forget to update your CSS selectors.
If we missed anything, please get it touch with us.

- `ff-asn-group`
    - deprecated attribute `laszy-load` was removed
    - use `<div slot="groupCaption" ...>` instead of `<div data-container="groupCaption" ...>`
    - `ff-asn-group-element`s no longer replace `<div data-content="detailedLinks">`, but instead get nested inside now
    - `ff-asn-group-element`s no longer replace `<div data-content="hiddenLinks">`, but instead get nested inside now
- `ff-asn-group-element`
    - use `<div slot="selected" ...>` instead of `<div data-selected ...>`
    - use `<div slot="unselected" ...>` instead of `<div data-unselected ...>`
- `ff-asn-group-slider`
    - use `<div slot="groupCaption" ...>` instead of `<div data-container="groupCaption" ...>`
- `ff-slider`
    - use `<div slot="slider1" ...></div>` instead of `<div data-slider="1" ...></div>`
    - use `<div slot="slider2" ...></div>` instead of `<div data-slider="2" ...></div>`
- `ff-products-per-page-item`
    - removed `clone` method
- `ff-sortbox`
    - `key` for _Relevance_ changed from `key="null.desc"` to `key="ff.relevance"`
    - introduced new container `<div class="ffw-selected-container">`. This container is always visible and contains the selected `ff-sortbox-item`
- `ff-paging-item`
    - `productsPerPageItem` property was renamed to `pagingItem`
- `ff-paging-set`
    - removed `hide()` and `show()` functions, use `hideSelf()` and `showSelf()` instead
- `ff-carousel` was removed from this library
- [Polymer 3](https://www.polymer-project.org/3.0/docs/devguide/feature-overview) related breaking changes:
    - Polymer shady DOM was removed because it is not necessary anymore. In case you used something like
    `Polymer.dom(HTMLElement).innerHTML = ...` you now have to use the native DOM API directly like
    `HTMLElement.innerHTML = ...`
    - Polymer 1 did remove `unresolved` attribute of `body`-tag automatically. Polymer 3 does not.
    If you depend on the old behavior, you can implement it with the following code:
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

CSS mixins have been removed. You can now directly apply CSS rules. Make sure your style rules take precedence over the bundled [default-styles.css](https://github.com/FACT-Finder-Web-Components/ff-web-components/blob/release/3.x/dist/default-styles.css) which uses the selectors below.

#### ff-asn-group
```html
--ff-asn-group-container // previous CSS-mixin
ff-asn-group .ffw-asn-group-container // now equivalent CSS-selector

--all-links-container
ff-asn-group .ffw-wrapper
```

#### ff-asn-group-element
```
--unselected-container
ff-asn-group-element .ffw-asn-selected

--selected-container
ff-asn-group-element .ffw-asn-unselected
```

#### ff-asn-group-slider
```
--ff-asn-group-container
ff-asn-group-slider .ffw-container

--all-links-container
ff-asn-group-slider .ffw-wrapper
```

#### ff-slider
```
--slider-wrapper
ff-slider .ffw-sliderWrapper

--slidebar-mixin
ff-slider .ffw-sliderBar
```

#### ff-slider-control
```
--ff-slider-section
ff-slider-control .ffw-sliderSection
```

#### ff-header-navigation
```
--wrapper 
ff-header-navigation .ffw-header-nav

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

#### ff-onfocus-suggest
```
--suggest-container
ff-onfocus-suggest .ffw-suggestContainer

--suggest-container-wrapper
ff-onfocus-suggest .ffw-suggestContainerWrapper
```

#### ff-paging-dropdown
```
--dropdown-item-container
ff-paging-dropdown .ffw-paging-dropdown-container
```

#### ff-paging-item
```
--paging-item-cursor-mixin
ff-paging-item .ffw-cursor
```

#### ff-products-per-page-dropdown
```
--dropdown-item-container
ff-products-per-page-dropdown .ffw-ppp-dropdown-container
```

#### ff-search-feedback
```
--caption-mixin
ff-search-feedback .ffw-caption

--content-mixin
ff-search-feedback .ffw-content
```

#### ff-sortbox
```
--sort-item-container
ff-sortbox .ffw-dropdown-container
```

#### ff-suggest
```
--suggest-container
ff-suggest .ffw-suggestContainer

--suggest-container-wrapper
ff-suggest .ffw-suggestContainerWrapper
```

#### ff-tag-cloud
```
--tag-cloud-container
ff-tag-cloud .ffw-tagCloudContainer

--tag-cloud-link
ff-tag-cloud .ffw-tagCloudLink
```


### Renaming of class names

#### ff-asn-group
```
ff-asn-group-container // old class name
ffw-asn-group-container // new classname
```

#### ff-asn-group-slider
```
container
ffw-container

ff-asn-group-container // targeted the same element as .container
ffw-container
```

#### ff-compare
```
ff-compare-equal
ffw-compare-equal

ff-compare-diff
ffw-compare-diff
```

#### ff-header-navigation
```
nav-item-seperator
ffw-nav-item-seperator

nav-group
ffw-nav-group

nav-group-caption
ffw-nav-group-caption

nav-link
ffw-nav-link
```

#### ff-nav-element
```
nav-item
ffw-nav-item
```

#### ff-navigation
```
navigation-label
ffw-navigation-label
```

#### ff-navigation-item
```
item-caption
ffw-item-caption

item-container
ffw-item-container

container-hidden
ffw-container-hidden

ff-navigation-link
ffw-navigation-link
```

#### ff-onfocus-suggest
```
hideffSuggestContainerWrapper
ffw-suggestContainerWrapperHidden

blockLayout
ffw-blockLayout
```

#### ff-paging-dropdown
```
ff-paging-dropdown-container
ffw-paging-dropdown-container

ff-paging-dropdown-closed
ffw-paging-dropdown-closed
```

#### ff-paging-item
```
cursor
ffw-cursor

selected
ffw-selected

disabled
ffw-disabled
```

#### ff-products-per-page-dropdown
```
ff-ppp-drowdown-closed 
ffw-ppp-dropdown-closed

ff-ppp-dropdown-container
ffw-ppp-dropdown-container
```

#### ff-products-per-page-item
```
selected
ffw-selected
```

#### ff-search-feedback
```
transformZero
ffw-transformZero

transformX
ffw-transformX

noTransition
ffw-noTransition
```

### ff-sortbox-item
```
selected
ffw-selected

showSelected
ffw-showSelected
```

#### ff-slider
```
ff_slidebar
ffw-sliderBar

sliderWrapper
ffw-sliderWrapper
```

#### ff-sortbox
```
ff-sort-dropdown-container
ffw-dropdown-container

ff-sort-closed
ffw-closed
```

#### ff-sortbox-item
```
selected
ffw-selected

showSelected
ffw-showSelected
```

#### ff-suggest
```
hideffSuggestContainerWrapper
ffw-hideSuggestContainerWrapper

listLayout
ffw-listLayout

blockLayout
ffw-blockLayout
```

#### ff-suggest-item
```
ff-highlight-suggest-item
ffw-highlight-suggest-item

query
ffw-query
```

#### ff-tag-cloud
```
tagCloudLink
ffw-tagCloudLink
```



### Worth mentioning
We have replaced all Polymer `tap` events with regular `click` events as [Polymer recommended](https://polymer-library.polymer-project.org/3.0/docs/devguide/gesture-events). Affected components are:

`ff-asn-group`, `ff-asn-group-element`, `ff-asn-remove-all-filter`, `ff-breadcrumb-trail-item`, `ff-campaign-advisor-answer`, `ff-nav-element`, `ff-navigation-item`, `ff-paging-dropdown`, `ff-paging-item`, `ff-products-per-page-dropdown`, `ff-products-per-page-item`, `ff-search-feedback`, `ff-single-word-search-record`, `ff-sortbox-item`, `ff-tag-cloud`

