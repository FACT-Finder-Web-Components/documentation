## `ff-loading-spinner`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **is-active**&nbsp;(Boolean) (Default: `false`) | If set, the element is displayed and animated. Otherwise the element is hidden. |
| **stroke-color**&nbsp;(String) | Takes a CSS color value and applies it to the spinning stroke. |
| **manual**&nbsp;(Boolean) (Default: `false`) | If set, the element won't subscribe to any default events and subsequently has to be de-/activated manually | 

### Methods
| Name | Description |
| ---- | ----------- |
| **show** | Activates/Shows the element. Calling this is equal to setting the `is-active` attribute. |
| **hide** | Deactivates/Hides the element. Calling this is equal to removing the `is-active` attribute. |