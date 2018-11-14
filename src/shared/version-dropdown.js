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
        width: 100px;
        margin-left: 20px;
    }
</style>
<div class="version-selector">
    <span><b>Version</b></span>
    <paper-dropdown-menu>
        <paper-listbox selected="{{version}}" slot="dropdown-content" attr-for-selected="version">
            <template is="dom-repeat" items="[[allVersions]]">
                <paper-item version="[[item.name]]">
                    <a style="text-decoration: none; color: black; width: 100%; height: 100%"
                       href="[[rootPath]][[page]]/[[item.name]]/[[subpage]]">
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
            }
        };
    }

    constructor() {
        super();
        this.allVersions = config.versions;
    }
}

window.customElements.define(`version-dropdown`, VersionDropdown);