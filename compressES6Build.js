/**
 * This script creates a .zip file from the es6-bundled build directory.
 * The .zip file is required for deployment.
 *
 * The script is intended to be run automatically AFTER the bundling process as a post-script.
 * E.g.: "scripts": { "postbuild-es6": "node compressES6Build.js" }
 */

const { version } = require(`./package.json`);
const path = require(`path`);

const zip = new (require(`adm-zip`));

const dirBuild = `build`;
const buildFolder = `es6-bundled`;

const src = path.join(dirBuild, buildFolder);
const targetZip = path.join(dirBuild, `${buildFolder}-${version}.zip`);

zip.addLocalFolder(src);
zip.writeZip(targetZip);

console.log(`Done zipping`, targetZip);
