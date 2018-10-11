## `ff-middleware`
___


## `ff-multi-attribute-parsing`
___
### Properties
| Name | Description |
| ---- | ----------- |
| **src-property**&nbsp;(String) (_required_)| The name of the multi-attribute field as returned by FACT-Finder |
| **store-in-property**&nbsp;(String) (_required_)| The name of the property you want to store the parsed object in. This can be a new property or the same as `src-property` which would overwrite the old value. If it is another existing property, a warning will be emitted. Be aware that modules later in the middleware chain might rely on a certain data format. |
| **keep-original-in-property**&nbsp;(String) (_optional_)| The name of the property you want to store the unparsed value in. This may be particularly useful when you overwrite the original property but still require the original value. |
| **entry-separator**&nbsp;(String) (_optional_, default: "&#0448;")| The character configured in FACT-Finder delimiting key-value pairs.  |
| **key-value-separator**&nbsp;(String) (_optional_, default: "=")| The character configured in FACT-Finder to separate keys from values. |
