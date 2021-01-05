## Overview

`ff-loading-spinner` is a lightweight visual indicator of pending action. It is triggered by common events fired by 
FACT-Finder Web Components. The spinner uses inexpensive CSS animations and does not trigger `layout` or `paint` 
operations in Blink and Gecko-based browsers.

_By default_ the element is activated by the following events:
- search
- filter
- clearFilter
- sort
- advisor

It is automatically deactivated when the action has completed.

**Example:** When a search request is sent via the `ff-searchbox`, the spinner is activated. As soon as the response from 
FACT-Finder is received, the spinner is deactivated.

## Usage

#### Default mode

Assuming that `ff-communication` and `ff-searchbox` have been integrated, `ff-loading-spinner` needs to be placed in HTML.

```html
<ff-loading-spinner></ff-loading-spinner>
```
As soon as a search request is sent to FACT-Finder, `ff-loading-spinner` will be displayed. When the response is received, 
the element will be hidden again.

#### Manual mode

In addition to the default subscription mode, the element also has a _manual mode_ in which the element will _not_ be 
subscribed to any events. Manual mode is activated when the `manual` HTML attribute is present. Adding the attribute will 
unsubscribe the element from all events. Likewise, removing the attribute will subscribe the element again. Manual mode 
can also be set by changing `ff-loading-spinner`'s `manual` property value to `true` (activation) or `false` (deactivation) 
directly in JavaScript code. The visibility of the element can be changed either with the `is-active` attribute or by calling
its `show()` and `hide()` methods.

> Note
>
> It is not necessary to be in manual mode in order to manipulate the visibility of the element using its API.
> However, the default subscription callbacks might interfere with the intended animation flow.
> Therefore it is recommended to use 'manual' when implementing visibility customizations.

```html
<!-- Active (visible) element -->
<ff-loading-spinner manual is-active></ff-loading-spinner>

<script>
/* Hiding the element */
document.querySelector('ff-loading-spinner').isActive = false;
</script>
```

An example of a scenario where the manual mode with visibility customizations can be applied is a custom event handler.

```html
<!-- Hidden element -->
<ff-loading-spinner manual></ff-loading-spinner>

<script>
/* using show wrapper in  callback */
document.addEventListener('custom-event', function () {
    const spinner = document.querySelector('ff-loading-spinner');
    spinner.show();
});
</script>
```

#### Changing color

It is possible to change the element's stroke-color to fit into your website design. A CSS color value needs to be passed to the `stroke-color` attribute.

```html
<!-- using HEX -->
<ff-loading-spinner stroke-color="#0000ff"></ff-loading-spinner>

<!-- using RGB -->
<ff-loading-spinner stroke-color="rgb(65, 180, 170)"></ff-loading-spinner>

<!-- using HSL -->
<ff-loading-spinner stroke-color="hsl(120, 100%, 75%)"></ff-loading-spinner>
```
