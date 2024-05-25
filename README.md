# Documentation

This repository contains the source code for the FactFinder-Web-Components
Documentation. You can find the live version
[here](https://web-components.fact-finder.de/documentation/install-dist)

### Setup

##### Prerequisites

Install [Polymer CLI](https://github.com/Polymer/polymer-cli) using
[npm](https://www.npmjs.com) (we assume you have pre-installed [node.js](https://nodejs.org)).

    npm i -g polymer-cli

### Start the development server

This command serves the app at `http://127.0.0.1:8081` and provides basic URL
routing for the app:

    http:  polymer serve (--open)
    https: polymer serve (--open) --protocol h2 

### Build
`polymer build` is configured to create three builds. These builds will be output to a subdirectory under the `build/` directory as follows:

```
build/
  es5-bundled/
  es6-bundled/
  esm-bundled/
```

Currently we are building just for es6 browsers. `polymer build --preset es6-bundled` 

### Preview the build

This command serves your app. Replace `build-folder-name` with the folder name of the build you want to serve.

    polymer serve build/build-folder-name/

### Notes

To run the application as in the production environment you have to start the actual node server.
This way you can test server-emitted errors etc. which is not possible running `polymer serve`.

* build the project
* navigate to the build directory
* run `node app`
