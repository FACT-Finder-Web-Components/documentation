## Installation

---
Depending on whether you are using the `NodeJs` or not you have the following to 2 ways of installing web components.

### Using NodeJs/Bower

---
1. Install **NodeJs** [(Download)](https://nodejs.org/en/download/)
2. Install **Bower** -> `npm install bower -g`
3. Create a **bower.json** file -> `bower init`
4. Add Web Components as dependency:
````json
  "dependencies": {
    "ff-web-components": "https://github.com/FACT-Finder-Web-Components/ff-web-components.git#1.2.7-pre-release-21"
  },
````
5. Run `bower install` from within the same directory the **bower.json** file is included.

**NOTE**

We've added added a `package.json` file as well so you could use `npm` or `yarn` instead of bower.


### Manuel Installation

---
1. Download or clone the demo project on on [Github Release Page](https://github.com/FACT-Finder-Web-Components/ff-web-components/releases)
2. Unzip the file
3. We've included a zip file called `bower_components.zip`. This file is actually a zipped directory of the **Using NodeJs/Bower** approach. Unzip the `bower_components.zip` file.
4. Copy the bower_components directory or its contents to your project. 
