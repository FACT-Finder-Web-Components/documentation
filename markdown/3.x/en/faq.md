## General
---

#### Question:
I want to use FACT-Finder Web Components with Angular, but data binding used in the components conflicts with Angular's `{{ }}` binding. Can you fix it?
#### Answer:
Default binding delimiters can be changed via `ff-communication`'s `mustache-delimiters` attribute. For more information please check the `Underlying Engine (Mustache)` section of the [Template Engine documentation](/documentation/3.x/template-engine).

## Errors
---

#### Error: 

`could not invoke subscriber function [undefined] for topic [records]. error: TypeError: Cannot read property 'insertAll' of undefined Line 2 Bundle.js`

#### Solution:

Add missing `defer` attribute on bundle.js like described [here](/documentation/3.x/include-scripts): `<script defer src="../dist/bundle.js"></script>`
