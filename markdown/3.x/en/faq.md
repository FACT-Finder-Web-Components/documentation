## General
---

#### Question:
I want to use FACT-Finder Web Components with Angular, but data binding used in the components conflicts with Angular's `{{ }}` binding. Can you fix it?
#### Answer:
Default binding delimiters can be changed via `ff-communication`'s `mustache-delimiters` attribute. For more information please check the `Underlying Engine (Mustache)` section of the [Template Engine documentation](/documentation/3.x/template-engine).

#### Question:
Hit highlighting in `ff-suggest` or `ff-asn-group` displays as raw HTML.
How do I make it render correctly?
#### Answer:
The most common reason for this behaviour is that double curly braces `{{ }}` are used in the custom template.
This causes text to be rendered as-is.
To make the highlighting markup be interpreted as HTML use triple curly braces `{{{ }}}`.  
See [Adding a suggest container](/api/3.x/ff-suggest) in the `ff-suggest` documentation or the [Template Engine documentation](/documentation/3.x/template-engine).

#### Question:
Our polyfills seem to be clashing with the WebComponents polyfills.
#### Answer:
One option is to use a polyfill that is compatible with the WebComponents polyfill.
For detailed information on which features the WebComponents polyfill implements, refer to the official [GitHub repository](https://github.com/webcomponents/polyfills).  
If this doesn't seem to solve the issue, please [contact us](/contacts) for a custom solution.


## Errors
---

#### Error: 

`could not invoke subscriber function [undefined] for topic [records]. error: TypeError: Cannot read property 'insertAll' of undefined Line 2 Bundle.js`

#### Solution:

Add missing `defer` attribute on bundle.js like described [here](/documentation/3.x/include-scripts): `<script defer src="../dist/bundle.js"></script>`
