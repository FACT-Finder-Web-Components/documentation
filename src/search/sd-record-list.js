import '@polymer/polymer/polymer-legacy.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import {PolymerElement} from '@polymer/polymer/polymer-element.js';

import '../styles/bootstrap-wrapper';

class SdRecordList extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
        <style include="bootstrap-wrapper">
            .panel:hover {
                cursor: pointer;
            }

            .deeplink {
                font-size: 10px;
                color: green;
            }
        </style>
        <template is="dom-if" if="{{query}}">
            <div class="row" id="query-info">
                <h4>Search result for: <b>[[query]]</b></h4>
            </div>
        </template>
        <template id="sd-record-text" is="dom-repeat" items="{{recordsText}}">
            <div class="row">
                <div class="panel panel-default" on-tap="goToDeeplink">
                    <div class="panel-heading">
                        <h3 class="panel-title">{{item.record.title}}</h3>
                    </div>
                    <div class="panel-body">
                        <p class="deeplink">{{item.record.deeplink}}</p>
                        <b>Description:</b>
                        <soso-truncated-text style="height: 40px" text="{{item.record.description}}"></soso-truncated-text>
                    </div>
                </div>
            </div>
        </template>
        <hr>
        <template is="dom-repeat" items="{{labelApiRecords}}" on-dom-change="labelize">
            <div class="row">
                <div class="panel panel-default" on-tap="goToDeeplink">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            API-Reference: {{item.record.title}}
                        </h3>
                    </div>
                    <div class="panel-body">
                        <p class="deeplink">{{item.record.deeplink}}</p>
                        <b>Methods</b>
                        <template is="dom-repeat" items="{{item.record.methods}}">
                            <span class="label label-primary">{{item}}</span>
                        </template>
                        <br>
                        <b>Mixins</b>
                        <template is="dom-repeat" items="{{item.record.mixins}}">
                            <span class="label label-primary">{{item}}</span>
                        </template>
                        <br>
                        <b>Properties</b>
                        <template is="dom-repeat" items="{{item.record.property}}">
                            <span class="label label-primary">{{item}}</span>
                        </template>
                    </div>
                </div>
            </div>
        </template>
`;
    }

    static get properties() {
        return {
            recordsText: {
                type: Array
            },
            recordsApi: {
                type: Array
            },
            labelApiRecords: {
                type: Array,
                computed: "_mapRecordPropertiesToLists(recordsApi)"
            },
            query: {
                type: String
            }
        }
    }

    goToDeeplink(e) {
        console.log(e);
        if (e.model.__data.item.record.deeplink !== "") {
            window.open(e.model.__data.item.record.deeplink, "_blank")
        }
    }

    _mapRecordPropertiesToLists(records) {
        if (records) {
            records.forEach(item => {
                let properties = [];
                let mixins = [];
                let methods = [];

                item.record.property.split(" ").forEach(p => {
                    properties.push(p);
                });
                item.record.mixins.split(" ").forEach(m => {
                    mixins.push(m);
                });
                item.record.methods.split(" ").forEach(m => {
                    methods.push(m);
                });

                item.record.property = properties;
                item.record.mixins = mixins;
                item.record.methods = methods;
            });
            return records;
        }
    }
}

window.customElements.define('sd-record-list', SdRecordList);
