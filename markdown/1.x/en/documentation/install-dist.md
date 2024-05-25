## Installation

---
Depending on whether you are using [Node.js](https://nodejs.org/), you have the following two ways of installing FactFinder Web Components.

### Using Node.js/Bower

---
1. Install **Node.js** [(Download)](https://nodejs.org/en/download/)
2. Install **Bower** -> `npm install bower -g`
3. Create a **bower.json** file -> `bower init`
4. Add FactFinder Web Components as a dependency to the **bower.json** so it looks somewhat like this:
    ```json
    {
      "name": "your-project",
      "description": "",
      "main": "index.js",
      "dependencies": {
        "ff-web-components": "https://github.com/FACT-Finder-Web-Components/ff-web-components.git#1.2.11"
      },
      "license": "ISC",
      "homepage": ""
    }
    ```
5. From within the directory the **bower.json** file is located run `bower install`.

**Note:** We have added a `package.json` file as well so you can use `npm` or `yarn` instead of Bower.


### Manual Installation

---
1. Download (or clone) the demo project from the [Github Release Page](https://github.com/FACT-Finder-Web-Components/ff-web-components/releases)
2. Unzip the file
3. We have included a zip file called `bower_components.zip`. This file is actually a zipped directory of the **Using Node.js/Bower** approach. Unzip the `bower_components.zip` file
4. Copy the bower_components directory or its contents to your project
