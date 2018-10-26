/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/marked-element/marked-element.js'
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';

import '../shared-styles.js';
import api from "../data/api";
import ReduxMixin from "../util/polymer-redux-mixin";
import ViewMixin from "../util/view-mixin";
import config from "../../config"

class ApiView extends ViewMixin(ReduxMixin(PolymerElement)) {
    constructor() {
        super();
        this.data = api;
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

    /*
    *   Dokumentation
    */


    app-toolbar {
        display: inline;
        padding: 0;
    }

    paper-tabs {
        background-color: #eeeeee;
        --paper-tabs-selection-bar-color: #23527c;
    }

    #github-logo-container {
        text-align: end;
        padding-right: 20px;
        padding-bottom: 20px;
    }

    #github-logo-container > a > img {
        width: 32px;
        height: 32px;
    }
    
    paper-tabs paper-tab[disabled]{
        color: #5d5d5d;
    }

    img {
        width: 100%;
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
                                <a style="text-decoration: none; color: black;" href="[[rootPath]]api/[[item.version]]/[[subpage]]#tab=[[activeTab]]">
                                    {{item.displayName}}
                                </a>
                            </paper-item>
                        </template>
                    </paper-listbox>
                </paper-dropdown-menu>
            </div>
            <iron-selector id="pageSelector"
                           selected="[[subpage]]"
                           attr-for-selected="name"
                           class="drawer-list"
                           role="navigation">

                <h3>Core API</h3>
                <template is="dom-repeat" items="{{core}}">
                    <a name="{{item.path}}" href="[[rootPath]]api/[[version]]/{{item.path}}">{{item.title}}</a>
                </template>

                <h3>Basic Elements</h3>
                <template is="dom-repeat" items="{{basics}}">
                    <a name="{{item.path}}" href="[[rootPath]]api/[[version]]/{{item.path}}">{{item.title}}</a>
                </template>

                <h3>Navigation</h3>
                <template is="dom-repeat" items="{{navigation}}">
                    <a name="{{item.path}}" href="[[rootPath]]api/[[version]]/{{item.path}}">{{item.title}}</a>
                </template>

                <h3>More Features</h3>
                <template is="dom-repeat" items="{{moreFeatures}}">
                    <a name="{{item.path}}" href="[[rootPath]]api/[[version]]/{{item.path}}">{{item.title}}</a>
                </template>
            </iron-selector>
        </div>
    </app-drawer>
    <paper-icon-button icon="my-icons:menu" drawer-toggle></paper-icon-button>

    <div id="markdown-wrapper">
        <h2>[[dokuTitle]]</h2>
        
        <template is="dom-if" if="[[showTabs]]">
            <app-toolbar class="medium-tall">
                <paper-tabs selected="{{activeTab}}" attr-for-selected="name">
                    <paper-tab name="docs">Documentation</paper-tab>
                    <paper-tab name="demo" disabled="[[hasNoDemoTab]]">Demo</paper-tab>
                    <paper-tab name="api" disabled="[[hasNoApiTab]]">Api</paper-tab>
                </paper-tabs>
            </app-toolbar>
        </template>
        <iron-pages selected="[[activeTab]]" attr-for-selected="name">

            <!--Documentation-->
            <marked-element id="docs_markdown" on-syntax-highlight="_addHiglightJs" name="docs">
                <div slot="markdown-html"></div>
                <script type="text/markdown" src$="[[filePath]]"></script>
            </marked-element>

            <!--Demo-->
            <div id="demo" name="demo">
                <div id="github-logo-container">
                    <a href="[[githubPath]]" target="_blank">Source code on Github</a>
                    <a href="[[githubPath]]" target="_blank">
                        <img src="../../images/GitHub-Logos/GitHub-Mark-32px.png">
                    </a>
                </div>
                <div id="iframeSlot"></div>
            </div>

            <!--API-->
            <marked-element id="api_markdown" name="api" on-syntax-highlight="_addHiglightJs">
                <div slot="markdown-html"></div>
                <script type="text/markdown" src$="[[apiPath]]"></script>
            </marked-element>
        </iron-pages>
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
            activeTab: {
                type: String,
                statePath: 'app.tab',
                observer: '_tabChange'
            },
            language: {
                type: String,
                value: "en"
            },
            drawerOpened: {
                type: Boolean,
                statePath: 'app.drawerOpened',
                observer: '_toggleDrawer'
            },
            hasNoApiTab: {
                type: Boolean,
                computed: 'hasNoApi(version, subpage, data)'
            },
            hasNoDemoTab: {
                type: Boolean,
                computed: 'hasNoDemo(version, subpage, data)'
            }
        }
    }

    hasNoApi(version, pageName, data) {
        return pageName && data && data.pages && data.pages[version] && data.pages[version][pageName] && data.pages[version][pageName].noApi;
    }

    hasNoDemo(version, pageName, data) {
        return pageName && data && data.pages && data.pages[version] && data.pages[version][pageName] && data.pages[version][pageName].noDemo;
    }

    connectedCallback() {
        super.connectedCallback();
        this.$.api_markdown.addEventListener("marked-request-error", e => {
            e.preventDefault();
            this.$.api_markdown.markdown = "## API documentation for this component is not yet available."
        });
        if (this.subpage === "core-event-aggregator") {
            this._addScrollNavigation();
        }
    }

    /*
    * the #tabs=docs url fragment makes it impossible to use #anchors in url for linking within a page
    * we use element.scrollIntoView() instead, but that requires the link in markdown to match the id the rendered
    * target element is given.
    *
    * spaces become dashes (-) and uppercase is converted to lowercase in markdown rendering.
    * ### breadcrumb trail -> <h3 id="breadcrumb-trail"> | ### productCampaign -> <h3 id="productcampaign">
    *
    * */
    _addScrollNavigation() {
        const markdown = this.$.docs_markdown;
        markdown.addEventListener("marked-render-complete", () => {
            const anchors = Array.from(markdown.getElementsByTagName('a'));
            anchors.forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    const elementId = anchor.href.split('/').pop();
                    const element = markdown.querySelector(`#${elementId}`);
                    if (element && element.scrollIntoView) {
                        element.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
                    }
                });
            });
        });
    }

    _pathChanged() {
        if (!this.isActiveView()) {
            return;
        }

        const fileName = this.subpage;

        this.filePath = `markdown/${this.language}/${this.version}/${fileName}.md`;
        this.dokuTitle = this.data.pages[this.version][fileName].title;

        if (fileName.startsWith("ff")) {//most ff-* pages have a demo
            this.showTabs = true;
            this.apiPath = `markdown/${this.language}/${this.version}/api/${fileName}.api.md`;
            this.githubPath = config.githubDemosBasePath + fileName + "/index.html";
            //this.githubPath = `${config.githubDemosBasePath}${version}/${fileName}/index.html;
        } else {
            // do not trigger a new load request for api and github path when not an ff element,
            // instead, simply hide tabs
            this.showTabs = false;
        }

        this.core = this.data.core[this.version];
        this.basics = this.data.basics[this.version];
        this.navigation = this.data.navigation[this.version];
        this.moreFeatures = this.data.moreFeatures[this.version];

        window.scrollTo(0, 0);
    }

    _tabChange(newTab, oldTab) {
        if (!this.isActiveView()) {
            return;
        }

        //clear iframeSlot
        while (this.$.iframeSlot.childElementCount > 0) {
            this.$.iframeSlot.removeChild(this.$.iframeSlot.lastChild);
        }

        if (newTab === "demo") {
            const frame = document.createElement("iframe");
            frame.src = config.demosBasePath + this.subpage;
            this.$.iframeSlot.appendChild(frame);
        }

        if (newTab) {
            const url = window.location.href.split('#')[0];
            window.location.replace(`${url}#tab=${newTab}`);
        } else { //default tab
            this.activeTab = "docs";
        }
    }
}

window.customElements.define('api-view', ApiView);
