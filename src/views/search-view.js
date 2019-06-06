import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

import '../search/sd-record-list.js';
import '../styles/bootstrap-wrapper';

class SearchView extends PolymerElement {
    static get template() {
        return html`
        <style include="bootstrap-wrapper"></style>
        
        <div class="container theme-showcase" role="main" style="padding-top: 40px;">
            <sd-record-list id="sd-record-list" records-text="[[recordsText]]" records-api="[[recordsApi]]" query="[[query]]"></sd-record-list>
        </div>
`;
    }

    static get is() {
        return `search-view`;
    }

    static get properties() {
        return {
            recordsText: {
                type: Array
            },
            recordsApi: {
                type: Array,
                observer: `_logApiChange`
            },
            query: {
                type: String
            }
        }
    }
}

window.customElements.define(`search-view`, SearchView);
