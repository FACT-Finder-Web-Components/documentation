/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/marked-element/marked-element.js'

import '../shared-styles.js';
import ViewMixin from "../util/view-mixin";
import ReduxMixin from "../util/polymer-redux-mixin";
import guides from "../data/guides";
import config from "../../config";

class DocumentationView extends ViewMixin(ReduxMixin(PolymerElement)) {
    constructor() {
        super();
        this.data = guides;
        this.allVersions = config.versions;
    }

    static get template() {
        return html`
<link rel="stylesheet" href="../../node_modules/highlightjs/styles/googlecode.css">
<style include="shared-styles">
    :host {
        display: block;
        padding: 0 0 0 10px;
        font-family: "Open Sans", sans-serif !important;
        font-size: 14px;
    }

    img {
        width: auto;
        max-width: 100%;
    }
        
    .version-selector {
        padding-left: 20px;    
    }
        
    .version-selector paper-dropdown-menu {
        width: 60px;
        margin-left: 20px;
    }
</style>

<app-drawer-layout narrow="{{narrow}}">
    <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]" opened="{{drawerOpened}}">
        <div class="panel-menus">
            <div class="version-selector">
                <span><b>Version</b></span>
                <paper-dropdown-menu>
                    <paper-listbox selected="{{version}}" slot="dropdown-content" attr-for-selected="version">
                        <template is="dom-repeat" items="[[allVersions]]">
                            <paper-item version="[[item.version]]">
                                <a style="text-decoration: none; color: black;" href="[[rootPath]]documentation/[[item.version]]/[[subpage]]">{{item.displayName}}</a>
                            </paper-item>
                        </template>
                    </paper-listbox>
                </paper-dropdown-menu>
            </div>
            <iron-selector selected="[[subpage]]"
                           attr-for-selected="name"
                           class="drawer-list"
                           role="navigation">
                <h3>First Steps</h3>
                <template is="dom-repeat" items="{{firstSteps}}">
                    <a name="{{item.path}}" href="[[rootPath]]documentation/[[version]]/{{item.path}}">{{item.title}}</a>
                </template>

                <h3>Basics</h3>
                <template is="dom-repeat" items="{{basics}}">
                    <a name="{{item.path}}" href="[[rootPath]]documentation/[[version]]/{{item.path}}">{{item.title}}</a>
                </template>

                <h3>Additional Features</h3>
                <template is="dom-repeat" items="{{additionalFeatures}}">
                    <a name="{{item.path}}" href="[[rootPath]]documentation/[[version]]/{{item.path}}">{{item.title}}</a>
                </template>
            </iron-selector>
        </div>
    </app-drawer>
    <paper-icon-button icon="my-icons:menu" drawer-toggle></paper-icon-button>

    <div id="markdown-wrapper">
        <br>
        <marked-element on-syntax-highlight="_addHiglightJs">
            <div slot="markdown-html"></div>
            <script type="text/markdown" src$="[[filePath]]"></script>
        </marked-element>
    </div>
</app-drawer-layout>
    `;
    }

    static get properties() {
        return {
            subpage: {
                type: String,
                statePath: 'app.subpage',
                observer: '_pathChanged'
            },
            version: {
                type: String,
                statePath: 'app.version',
                observer: '_pathChanged'
            },
            language: {
                type: String,
                value: "en"
            },
            drawerOpened: {
                type: Boolean,
                statePath: 'app.drawerOpened',
                observer: '_toggleDrawer'
            }
        };
    }

    _pathChanged(newSubpage) {
        if (!this.isActiveView()) {
            return;
        }

        this.firstSteps = this.data.firstSteps[this.version];
        this.basics = this.data.basics[this.version];
        this.additionalFeatures = this.data.additionalFeatures[this.version];

        this.filePath = `markdown/${this.language}/${this.version}/documentation/${this.subpage}.md`;
    }
}

window.customElements.define('documentation-view', DocumentationView);
