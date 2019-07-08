import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {setPassiveTouchGestures, setRootPath} from '@polymer/polymer/lib/utils/settings.js';
import {installRouter} from "pwa-helpers";
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import './my-icons.js';
import ReduxMixin from "./util/polymer-redux-mixin";
import {navigate, updateDrawerState} from "./actions/app";
import './shared-styles.js';
import './search/sd-search-box.js';
import config from "../config";

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class DocumentationApp extends ReduxMixin(PolymerElement) {
    static get template() {
        return html`<style include="shared-styles">
    :host {
        --app-primary-color: #3c3c3b;;
        --app-secondary-color: white;
      
        --button-active-background-color: #1b4385;
        --button-hover-background-color: var(--paper-blue-900);
        display: block;
        font-family: "Open Sans", sans-serif !important;
        font-size: 14px;
    }

    app-toolbar {
        padding-left: 0px;
    }

    app-drawer-layout:not([narrow]) [drawer-toggle] {
        display: none;
    }

    app-header {
        color: #fff;
        background-color: var(--app-primary-color);
    }

    app-header paper-icon-button {
        --paper-icon-button-ink-color: white;
    }

    .drawer-list {
        margin: 0 20px;
        display: flex;
    }

    .drawer-list a, #impressumLink {
        display: block;
        padding: 0 16px;
        text-decoration: none;
        color: var(--app-secondary-color);
        font-family: Open Sans, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;
        /*font-size: .8125rem;*/
        /*font-size: 0.9125rem;*/
        line-height: 64px;
    }

    .drawer-list paper-tab.iron-selected {
        color: white;
        background-color: var(--button-active-background-color);
    }

    div[main-title] {
        background: url(/images/logo_background.webp) no-repeat;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 40px;
    }

    paper-dialog {
        max-width: 800px;
    }

    paper-tabs {
        display: flex;
        width: 100%;
        padding-top: 0;
        padding-bottom: 0;
        height: 64px;
        text-align: center;
    }

    paper-tab {
        user-select: none;
        font-weight: normal !important;
    }

    paper-tab a {
        font-weight: normal !important;
    }

    iron-selector {
        width: 70%;
        margin: 0 !important;
    }

    @media screen and (max-width: 1180px) {
        div[main-title] {
            display: none;
        }

        iron-selector {
            width: 100%;
        }
    }

    paper-dialog {
        max-height: none !important;
    }
</style>

<!-- Main content -->
<app-header-layout>

    <app-header slot="header" fixed="" effects="waterfall">
        <app-toolbar>
            <div main-title="">
                <img src="/images/logo_fact-finder.png"
                     alt="FF Logo">
            </div>
            <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
                <paper-tabs selected="[[page]]" noink="" scrollable="" fit-container="" no-slide="" no-bar=""
                            attr-for-selected="name">
                    <paper-tab name="home">
                        <a name="home" href="[[rootPath]]home">Home</a>
                    </paper-tab>
                    <paper-tab name="api">
                        <a name="api" href="[[rootPath]]api/[[version]]/ff-searchbox">API</a>
                    </paper-tab>
                    <paper-tab name="documentation">
                        <a name="documentation" href="[[rootPath]]documentation/[[version]]/install-dist">Documentation</a>
                    </paper-tab>
                    <paper-tab name="download">
                        <a name="download" href="[[rootPath]]download">Download</a>
                    </paper-tab>
                    <paper-tab name="faq">
                        <a name="faq" href="[[rootPath]]faq/[[version]]/general">FAQ</a>
                    </paper-tab>
                    <paper-tab name="contacts">
                        <a name="contacts" href="[[rootPath]]contacts">Contacts</a>
                    </paper-tab>
                    <paper-tab>
                        <a href="https://github.com/FACT-Finder-Web-Components" target="_blank">Github</a>
                    </paper-tab>
                </paper-tabs>
            </iron-selector>
            
            <a id="impressumLink" style="font-size: 12px" href="https://www.fact-finder.de/impressum.html">Impressum</a>
            <sd-search-box records-text="{{recordsText}}" records-api="{{recordsApi}}" query="{{query}}" page="[[page]]"></sd-search-box>
        </app-toolbar>
    </app-header>

    <iron-pages selected="[[page]]" attr-for-selected="name" fallback-selection="view404" role="main">
        <home-view name="home"></home-view>
        <api-view name="api"></api-view>
        <documentation-view name="documentation"></documentation-view>
        <download-view name="download" server="[[downloadToolUrl]]"></download-view>
        <faq-view name="faq"></faq-view>
        <contacts-view name="contacts"></contacts-view>
        <search-view name="search" records-text="[[recordsText]]" records-api="[[recordsApi]]" query="[[query]]"></search-view>
        <view-404 name="view404"></view-404>
    </iron-pages>
</app-header-layout>
    `;
    }

    static get is() {
        return `documentation-app`;
    }

    static get properties() {
        return {
            recordsText: {
                type: Array
            },
            recordsApi: {
                type: Array
            },
            query: {
                type: String,
                observer: `_selectSearchView`,
                notify: true
            },
            page: {
                type: String,
                reflectToAttribute: true,
                statePath: `app.page`
            },
            version: {
                type: String,
                statePath: `app.version`,
            },
        };
    }

    _selectSearchView(newValue) {
        if (newValue) {
            window.history.pushState({}, null, `/search`);
            this.dispatch(navigate(window.decodeURIComponent(location.pathname), location.hash));
        }
    }

    ready() {
        super.ready();
        installRouter((location) => this.dispatch(navigate(window.decodeURIComponent(location.pathname), location.hash)));
        this.downloadToolUrl = config.downloadToolUrl;
    }

}

window.customElements.define(DocumentationApp.is, DocumentationApp);
