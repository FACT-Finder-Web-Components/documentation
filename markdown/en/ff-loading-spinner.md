## Overview

`ff-loading-spinner` is a leightweight spinning loading indicator that is 
triggered by common events fired by FACT-Finder Web Components. It uses 
inexpensive CSS-Animations and does not trigger `layout` or `paint` 
operations in Blink and Gecko-based browsers.

## Usage 

Assuming you have integrated `ff-communication` and `ff-searchbox` you simply
need to place the `ff-loading-spinner` element in your HTML.

```html
<ff-loading-spinner></ff-loading-spinner>
```
As soon as a request is sent to FACT-Finder, `ff-loading-spinner` will
be displayed. When the response is received the element will be hidden again.

#### Changing color

You can also change the element's  color by passing a CSS color value.

```html
<!-- using HEX -->
<ff-loading-spinner stroke-color="#0000ff"></ff-loading-spinner>
<!-- using RGB -->
<ff-loading-spinner stroke-color="rgb(65, 180, 170)"></ff-loading-spinner>
<!-- using HSL -->
<ff-loading-spinner stroke-color="hsl(120, 100%, 75%)"></ff-loading-spinner>
```

#### Controlling element manually

You can de-/activate the element using the `is-active` attribute.
This attribute is a boolean and doesn't require a value. Its presence 
activates or shows the element. Likewise, removing this attribute 
deactivates or hides the element.

```html
<!-- Active/Shown element -->
<ff-loading-spinner is-active></ff-loading-spinner>

<script>
/* Deactivating/Hiding the element*/
document.querySelector('ff-loading-spinner').isActive = false;
</script>
```
The element also provides a JavaScript wrapper for this attribute
in form of the methods `hide()` and `show()`, which allow you to de-/activate
the element manually. This could be used as a callback for a custom 
event-listener.

```html
<!-- Active/Shown element -->
<ff-loading-spinner></ff-loading-spinner>

<script>
const spinner = document.querySelector('ff-loading-spinner');
document.addEventListener('your-event', () => spinner.show());
</script>
```
