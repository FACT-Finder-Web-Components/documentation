/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import '@polymer/polymer/polymer-element.js';

import './styles/sidebar-styles.js';
import './styles/markdown-styles.js';
import './styles/bootstrap-wrapper.js';

const $_documentContainer = document.createElement(`template`);
$_documentContainer.innerHTML = 
`<dom-module id="shared-styles">
    <template>
        <style include="sidebar-styles"></style>
        <style include="markdown-styles"></style>
        <style include="bootstrap-wrapper">
            [unresolved] {
                opacity: 0;
            }

            h1 {
                font-size: 4.5rem;
                font-weight: 300;
                line-height: 1.1;
            }

            h1, h2, h3 {
                color: #222;
                font-family: Open Sans, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;
            }

            paper-button {
                background-color: var(--button-active-background-color);
                color: white;
                cursor: pointer;
                margin-bottom: 15px;
                transition: background-color 200ms;
            }

            paper-button[disabled] {
                background-color: darkgray;
                color: white;
            }

            paper-button:hover {
                background-color: var(--button-hover-background-color);
            }

            paper-item {
                cursor: pointer;
            }

            .row {
                text-align: center;
                margin: 30px auto;
            }
        </style>
    </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
