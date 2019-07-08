## FAQ - Errors

---
#### Error: 

`could not invoke subscriber function [undefined] for topic [records]. error: TypeError: Cannot read property 'insertAll' of undefined Line 2 Bundle.js`

#### Solution:

Add missing `defer` attribute on bundle.js like described [here](/documentation/3.x/include-scripts): `<script defer src="../dist/bundle.js"></script>`
