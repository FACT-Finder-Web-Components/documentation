## General
---

#### Question:
I want to use FACT-Finder Web Components with Angular, but data binding used in the components conflicts with Angular's `{{ }}` binding. Can you fix it?
#### Answer:
This issue is being worked on and the fix will be released soon - see relevant [discussion on Github](https://github.com/FACT-Finder-Web-Components/ff-web-components/issues/19). Please, observe [changelog](https://github.com/FACT-Finder-Web-Components/ff-web-components/releases) of future releases.

## Errors
---

#### Error: 

`could not invoke subscriber function [undefined] for topic [records]. error: TypeError: Cannot read property 'insertAll' of undefined Line 2 Bundle.js`

#### Solution:

Add missing `defer` attribute on bundle.js like described [here](/documentation/3.x/include-scripts): `<script defer src="../dist/bundle.js"></script>`
