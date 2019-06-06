import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import '../my-icons.js';
import factfinder from '../../lib/ff-core.js';
import '../styles/bootstrap-wrapper';
import config from "../../config";

class SdSearchBox extends PolymerElement {
    constructor() {
        super();
        factfinder.communication.globalSearchParameter.url = config.factFinder.url;
        factfinder.communication.globalSearchParameter.channel = config.factFinder.channel;
        factfinder.communication.globalSearchParameter.version = config.factFinder.version;
    }

    static get template() {
        return html`
        <style include="bootstrap-wrapper">
            iron-collapse {
                position: absolute;
                top: 64px;
                width: 100%;
                left: 0;
                --iron-collapse-transition-duration: 100ms;
                box-shadow: 0 3px 3px #888888;
            }

            iron-input, #search-input {
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                width: 100%;
                height: 45px;
                color: #393939;
                text-align: center;
            }
        </style>

        <iron-collapse id="collapse" opened="{{expanded}}" transitioning="{{transitioning}}">
            <div class="collapse-content">
                <input type="text" placeholder="Search" on-keyup="_handleKeyUp" on-blur="_handleBlur" id="search-input">
            </div>
        </iron-collapse>
        <paper-icon-button id="button" icon="my-icons:search" on-tap="_handleButtonClick">Search</paper-icon-button>
`;
    }

    _handleButtonClick() {
        if (this.expanded) {
            this.hideBox();
        } else {
            this.showBox();
        }
    }

    _handleBlur(e) {
        if (e.relatedTarget !== this.$.button) {
            this.hideBox();
        }
        e.preventDefault();
        e.stopPropagation();
    }

    _handleKeyUp(event) {
        if (event.code === `Enter`) {
            this.query = this.shadowRoot.querySelector(`#search-input`).value;
            this.fireSearchEvent();
            this.hideBox();
        } else if (event.code === `Escape`) {
            this.hideBox();
        }
    }

    hideBox() {
        if (!this.transitioning) {
            this.$.collapse.hide();
        }
    }


    showBox() {
        if (!this.transitioning) {
            this.$.collapse.show();
            this.shadowRoot.querySelector(`#search-input`).focus();
        }
    }

    fireSearchEvent() {
        console.log(`search`);
        factfinder.communication.FFCommunicationEventAggregator.addFFEvent({
            type: `search`,
            query: this.query
        });
        factfinder.communication.FFCommunicationEventAggregator.addFFEvent({
            type: `search`,
            channel: `webc-doku-api`,
            query: this.query,
            topics: function () {
                return [`customSearch`, `specialElement`];
            }
        });
    }

    _pageChange(newValue) {
        if (newValue && newValue !== `search`) {
            this.shadowRoot.querySelector(`#search-input`).value = ``;
            this.recordsApi = undefined;
            this.recordsText = undefined;
            this.query = undefined;
        }
    }

    static get properties() {
        return {
            recordsText: {
                type: Array,
                notify: true
            },
            recordsApi: {
                type: Array,
                notify: true
            },
            query: {
                type: String,
                notify: true
            },
            page: {
                type: String,
                observer: `_pageChange`
            }
        }
    }

    static get is() {
        return `sd-search-box`;
    }

    connectedCallback() {
        super.connectedCallback();
        this.key = factfinder.communication.ResultDispatcher.subscribe(`result`, (resultData) => {
            this.recordsText = resultData.records;
        });
        this.key2 = factfinder.communication.ResultDispatcher.subscribe(`customSearch`, (resultData) => {
            this.recordsApi = resultData.searchResult.records;
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        factfinder.communication.ResultDispatcher.unsubscribe(`result`, this.key);
        factfinder.communication.ResultDispatcher.unsubscribe(`customSearch`, this.key2);
        delete this.key;
        delete this.key2;
    }
}

window.customElements.define(`sd-search-box`, SdSearchBox);
