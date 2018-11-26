## Overview

`ff-loading-spinner` is a lightweight spinning loading indicator that is 
triggered by common events fired by FACT-Finder Web Components. It uses 
inexpensive CSS animations and does not trigger `layout` or `paint` 
operations in Blink and Gecko-based browsers.

_By default_ element gets activated by the following events:
- search
- filter
- clearFilter
- sort
- advisor

It is deactivated when the action is completed.

**Example:** When a search request is sent via the `ff-searchbox`, the spinner
is activated. As soon as FACT-Finder's response is received, the spinner is 
deactivated.

## Usage 

#### Default mode

Assuming you have integrated `ff-communication` and `ff-searchbox` you simply
need to place the `ff-loading-spinner` element in your HTML.

```html
<ff-loading-spinner></ff-loading-spinner>
```
As soon as a request is sent to FACT-Finder, `ff-loading-spinner` will
be displayed. When the response is received, the element will be hidden again.

#### Manual mode

In addition to the default 'subscription' mode, the element also has a _manual mode_
in which the element will _not_ be subscribed to any events. 
It is activated if the `manual` HTML attribute is present. 
Adding the attribute will unsubscribe the element form all events. Likewise, re-adding
the attribute will subscribe the element again.

**Why manual mode?**  
The intention of manual mode is to provide a way for you to customize exactly _when_ 
you want the element to be displayed.

**Keep in mind:** You _don't_ have to be in manual mode to manipulate the visibility of the
element via its API, however, the default subscription callbacks might interfere with your 
intended animation flow.

You can de-/activate the element using either the `is-active` attribute, or the corresponding
wrappers `hide()` and `show()`.

```html
<!-- Active/Shown element -->
<ff-loading-spinner is-active></ff-loading-spinner>

<script>
/* Deactivating/Hiding the element*/
document.querySelector('ff-loading-spinner').isActive = false;
</script>
```

One obvious scenario for using the wrappers would be as a callback in a custom
event handler, as seen below:
```html
<!-- Active/Shown element -->
<ff-loading-spinner></ff-loading-spinner>

<script>
const spinner = document.querySelector('ff-loading-spinner');
/*using show() wrapper as callback*/
document.addEventListener('your-event', () => spinner.show());
</script>
```

#### Changing color

You can also change the element's stroke-color to fit into your design
by passing a CSS color value.

```html
<!-- using HEX -->
<ff-loading-spinner stroke-color="#0000ff"></ff-loading-spinner>
<!-- using RGB -->
<ff-loading-spinner stroke-color="rgb(65, 180, 170)"></ff-loading-spinner>
<!-- using HSL -->
<ff-loading-spinner stroke-color="hsl(120, 100%, 75%)"></ff-loading-spinner>
```