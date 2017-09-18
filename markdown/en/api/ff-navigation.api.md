## API Reference
## `ff-navigation`
### Properties
| Name | Description |
| ---- | ----------- |
|**layout**&nbsp;(String) **Options**:&nbsp;vertical,&nbsp;horizontal (default: horizontal)| Defines the layout of the Navigation.|
|**flyout**&nbsp;(Boolean) **Options**:&nbsp;true,&nbsp;false (default: true)| Defines if the sub-elements should flyout or should extend inside the parent.|
|**mobile**&nbsp;(Boolean) **Options**:&nbsp;true,&nbsp;false (default: false)| When true, the navigation element will be visible.|
|**fetch-initial**&nbsp;(String) **Options**:&nbsp;true,&nbsp;false (default: true)|If true (default), the navigation data will be requested on the first attachment to the DOM.|
|**first-fetch**&nbsp;(Number)| Defines up to which start level the navigation data for the initial loading should be requested. **Note**: Navigation data may be up to 1MB and can take his time to load. The first impression for the user when he needs to wait for the initial page load may be not so pleasant.
|**fetch-size**&nbsp;(Number)| Defines how many level of the following navigation data should be loaded in subsequent requests. Fewer level -> more requests and inversely more level -> more data per request.|
|**max-fetch**&nbsp;(Number)| Defines up to which level of the navigation hirachy the data should be loaded.|
|**fetch-time**&nbsp;(Number)| Defines the time between navigation requests. (Default: 100ms)|

### Methods
| Name | Description |
| ---- | ----------- |
|**fetch()**| Triggers a new fetching of the navigation data.|
|**updateLayout()**| Rearranges the `layout` according to the layout propertie. This will recalculate the `direction` properties of all child elements.|

### Events
| Name | Description |
| ---- | ----------- |
|**dom-updated**|This event is triggered when the element has received new data and the template for the element and all sub elements was punched out.|

## `ff-navigation-item`
### Properties
| Name | Description |
| ---- | ----------- |
|**element**&nbsp;(Object)| The data Element which defines a category in the Navigation Tree.|
|**direction**&nbsp;(String) **Options**:&nbsp;left,&nbsp;right,&nbsp;down (default: right)| Defines in which direction the sub-elements should be extended.|
|**cluster-level**&nbsp;(Number)| This is set internally and reflects as an attribute to give the user a possibility to style this element based on it's cluster level. Also this is used to select the elemets into the right shadow-DOM container. Do not modifiy this yourself.|
|**type**&nbsp;(String) **Options**:&nbsp;default,&nbsp;header,&nbsp;parent,&nbsp;level (default: 'default')| This defines which template is used for the element.|
|**has-subelements**&nbsp;(Boolean)| This is set internally and reflects out. It indicates that this element has at least one sub-element.|
|**flyout**&nbsp;(Boolean)| When true the sub-elements will extended outside of the parent element according to the direction. When false, the sub-elements will be extended inside of the parent element. This is used in mobile mode.|
|**selected**&nbsp;(Boolean)| This attribute is set in the mobile mode when a element is selected. This can be used to style the selected element.|
