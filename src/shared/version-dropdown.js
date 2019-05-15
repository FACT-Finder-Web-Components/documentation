import {html, PolymerElement} from '@polymer/polymer';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';

import config from '../../config';
import ReduxMixin from '../util/polymer-redux-mixin';

class VersionDropdown extends ReduxMixin(PolymerElement) {

    static get template() {
        return html`
<style>
    .version-selector {
        padding: 0 1em 1em 1em;
    }
    
    .version-selector .isNotLatestVersion {
        border: 4px solid red;
        padding: 0 0.5em;   
        background-color: palevioletred;
    }
    
    .version-selector .isNotLatestVersion a {
        color: darkred;
        border-bottom: 2px solid darkred;
        text-decoration: none; 
    }

    .version-selector paper-dropdown-menu {
        width: 130px;
        margin-left: 20px;
    }
    
    .version-link {
        text-decoration: none; 
        color: black;
        margin: -15px;
        padding: 15px;
        width: 100%; 
        height: 100%
    }
    
    .version-label {
        display: inline-block;
        padding-left: 20px;
        top: 5px;
        font-weight: bold;
        position: relative;   
    }
</style>
<div class="version-selector">
    <span class="version-label">Version</span>
    <paper-dropdown-menu no-animations>
        <paper-listbox selected="{{version}}" slot="dropdown-content" attr-for-selected="version">
            <template is="dom-repeat" items="[[allVersions]]">
                <paper-item version="[[item.name]]">
                    <a class="version-link" href="[[_versionUrl(page, item.name, subpage, tab)]]">
                        {{item.displayName}}
                    </a>
                </paper-item>
            </template>
        </paper-listbox>
    </paper-dropdown-menu>
    
    <template is="dom-if" if="[[isNotLatestVersion]]">
        <div class="isNotLatestVersion">
            <h4>You are viewing an old version. We recommend to always use the latest version, which is currently
                <a href="[[_versionUrl(page, latestVersion, subpage, tab)]]">[[latestVersion]]</a>.
            </h4>    
        </div>
    </template>
</div>
        `;
    }

    static get properties() {
        return {
            page: {
                type: String,
                statePath: `app.page`
            },
            version: {
                type: String,
                statePath: `app.version`,
                observer: `_versionChanged`
            },
            subpage: {
                type: String,
                statePath: `app.subpage`
            },
            tab: {
                type: String,
                statePath: `app.tab`
            }
        };
    }

    constructor() {
        super();
        this.allVersions = config.versions;
        this.latestVersion = config.versions[0].name;
    }

    _versionUrl(page, version, subpage, tab) {
        const tabParam = page === `api` ? `#tab=${tab}` : ``;
        return `${this.rootPath}${page}/${version}/${subpage}${tabParam}`;
    }

    _versionChanged() {
        this.isNotLatestVersion = this.version !== this.latestVersion;
    }
}

window.customElements.define(`version-dropdown`, VersionDropdown);