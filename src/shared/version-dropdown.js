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
        padding-left: 20px;
    }

    .version-selector paper-dropdown-menu {
        width: 110px;
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
        font-weight: bold;
        position: relative;   
        top: 5px;
    }
</style>
<div class="version-selector">
    <span class="version-label">Version</span>
    <paper-dropdown-menu>
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
                statePath: `app.version`
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
    }

    _versionUrl(page, version, subpage, tab) {
        const tabParam = page === `api` ? `#tab=${tab}` : ``;
        return `${this.rootPath}${page}/${version}/${subpage}${tabParam}`;
    }
}

window.customElements.define(`version-dropdown`, VersionDropdown);