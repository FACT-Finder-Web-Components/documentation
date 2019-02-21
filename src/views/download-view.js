import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-toolbar/paper-toolbar.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/marked-element/marked-element.js';
import '../shared-styles.js';
import '../my-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import ReduxMixin from "../util/polymer-redux-mixin";

class DownloadView extends ReduxMixin(PolymerElement) {
    static get template() {
        return html`
        <style include="shared-styles">
            :host {
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                background-color: #fff;
                font-family: "Open Sans", sans-serif !important;
                font-size: 16px;
            }

            paper-toggle-button {
                user-select: none;
                transition: font-weight 300ms;
                transition: color 300ms;
            }

            paper-toggle-button[active] {
                --paper-toggle-button-label-color: #0b97c4;
                text-decoration: underline;
            }

            iron-icon {
                color: black;
                cursor: pointer;
                transition: 300ms;
                border-radius: 12px;
            }

            .buttonContainer > iron-icon {
                margin-right: 20px;
            }

            iron-icon:hover {
                background-color: #0b97c4;
                color: white;
            }

            section.downloadContainer {
                padding: 15px;
                display: flex;
                justify-content: space-around;
                align-items: flex-start;
                flex-wrap: wrap;
            }

            section.downloadContainer section {
                margin: 25px 25px;
            }

            .buttonContainer {
                display: flex;
                justify-content: flex-start;
                font-size: 16px;
                margin: 5px 0;
            }

            .toggle-button-all {
                border-bottom: 1px solid lightgray;
                padding-left: 44px;
                margin-bottom: 10px;
                padding-bottom: 5px;
            }

            #downloadButton {
                width: 150px;
                height: 60px;
            }

            paper-toolbar {
                --paper-toolbar-background: #3c3c3b;
                --button-active-background-color: #1b4385;
                padding: 0px;
                margin-top: 0px;
            }

            marked-element {
                margin-top: 20px;
                margin-bottom: 20px;
            }

            img {
                -webkit-box-shadow: 1px 1px 10px 2px rgba(194, 194, 194, 1);
                -moz-box-shadow: 1px 1px 10px 2px rgba(194, 194, 194, 1);
                box-shadow: 1px 1px 10px 2px rgba(194, 194, 194, 1);
                max-width: 100%;
            }
        </style>

        <!--dialog for information about modules-->
        <paper-dialog id="dialog" style="max-width: 1000px;margin-top: 90px" always-on-top="">
            <paper-toolbar>
                <span slot="top" class="title">{{model.label}}</span>
                <paper-icon-button slot="top" icon="my-icons:close" dialog-dismiss=""></paper-icon-button>
            </paper-toolbar>

            <paper-dialog-scrollable style="margin: 0px">
                <marked-element id="api_markdown" name="/api" on-syntax-highlight="_addHiglightJs">
                    <div slot="markdown-html"></div>
                    <script type="text/markdown" src$="[[markdownFilePath]]"></script>
                </marked-element>
            </paper-dialog-scrollable>
        </paper-dialog>

        <section style="width: 100%;background-color: #eeeeee;min-height: 200px">
            <div class="container">
                <div class="row" style="text-align: left">
                    <h1>Download</h1>
                    <p style="line-height: 24px">
                        Please select your desired version and modules from below. You can read more about each module by clicking the info icon
                        <iron-icon icon="my-icons:info-outline"></iron-icon> next to it. You can read about the changes and new features of a version in the 
                        <a href="https://github.com/FACT-Finder-Web-Components/ff-web-components/blob/master/CHANGELOG.md">official changelog</a>.
                    </p>
                    <p style="line-height: 24px">
                        Regardless of your chosen modules you'll get the core module with the minimum amount of functionality to get started.
                    </p>
                </div>
            </div>
        </section>

        <div class="container row" style="background-color: white;">
            <div class="row" style="margin-top: 0">
                <span style="margin-right: 10px;vertical-align: middle"><b>Version:</b></span>
                <paper-dropdown-menu>
                    <paper-listbox slot="dropdown-content" selected="0" on-selected-item-changed="_selectedVersionChanged">
                        <template is="dom-repeat" items="{{versions}}" sort="compareVersions" >
                            <paper-item data-api-name\$="{{item}}">v.{{item}}</paper-item>
                        </template>
                    </paper-listbox>
                </paper-dropdown-menu>
            </div>
            <div class="row">
                <p>
                    <b>The basic elements are always included in every download:</b><br>
                    <code>ff-communication</code>,
                    <code>ff-record</code>,
                    <code>ff-record-list</code>,
                    <code>ff-searchbox</code>,
                    <code>ff-searchbutton</code>,
                    <code>ff-breadcumb-trail</code>,
                    <code>ff-template</code>.
                    <!--<code>ff-use-class</code>, -->
                </p>
            </div>
            
            <template is="dom-if" if="[[isSelectedVersion3XX]]">
                <div class="row">
                    <p style="padding: 22px; border: 4px solid grey; background-color: lightsteelblue">
                        At the moment, only a full download is supported for <b>v.{{selectedVersion}}</b>. Please contact us if you must use a reduced bundle.
                    </p>
                </div>
            </template>
            
            <div class="row">
                <div class="col-md-6">
                    <h2>Navigation</h2>
                    <p style="padding-bottom: 22px">
                        This are the common features a shop mostly needs.
                    </p>
                    <paper-toggle-button disabled="{{isSelectedVersion3XX}}" checked="{{downloadAllNavigation}}" on-active-changed="_toggleAll" class="toggle-button-all">
                        All
                    </paper-toggle-button>
                    <div>
                        <template is="dom-repeat" items="{{navigationFeatures}}" mutable-data="">
                            <div class="buttonContainer">
                                <iron-icon icon="my-icons:info-outline" on-tap="_openDialog"></iron-icon>
                                <paper-toggle-button disabled="{{isSelectedVersion3XX}}" checked="{{item.active}}" active="{{item.active}}">{{item.label}}</paper-toggle-button>
                            </div>
                        </template>
                    </div>
                </div>

                <div class="col-md-6">
                    <h2>More Features</h2>
                    <p>
                        These are some more advanced features which you may only need in special cases.
                    </p>
                    <paper-toggle-button disabled="{{isSelectedVersion3XX}}" checked="{{downloadAllMoreFeatures}}" on-active-changed="_toggleAll" class="toggle-button-all">
                        All
                    </paper-toggle-button>
                    <div>
                        <template is="dom-repeat" items="{{moreFeatures}}" mutable-data="">
                            <div class="buttonContainer">
                                <iron-icon icon="my-icons:info-outline" on-tap="_openDialog"></iron-icon>
                                <paper-toggle-button disabled="{{isSelectedVersion3XX}}" checked="{{item.active}}" active="{{item.active}}">{{item.label}}</paper-toggle-button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>


            <div class="row" style="display: flex;justify-content: center;margin-top: 35px">
                <div id="buildingInfo" style="display: none">
                    <paper-spinner id="spinner" active="" style="width: 50px;height: 50px;"></paper-spinner>
                    <p>Configured version is currently building.</p>
                    <p>Approximated build time: ~30sec</p>
                    <p>(Download will start automatically when ready)</p>
                </div>
                <div id="downloadFinished">
                    <p>Download is ready :)</p>
                    <p>
                        If the download didn't start automatically, download it <a href="[[lastDownload]]">here</a>.
                    </p>

                </div>
                <p id="buildError" style="display: none;color:red">
                    Failed to build Version with this setting!
                </p>
            </div>

            <div class="row" style="display: flex;justify-content: center;margin-top: 35px;padding-bottom: 35px">
                <style>
                    paper-button {
                        background-color: #0b97c4;
                        color: white;
                        cursor: pointer;
                        margin-bottom: 15px;
                    }
                </style>
                <paper-button id="downloadButton" on-tap="_download">Download</paper-button>
            </div>

        </div>
`;
    }

    static get properties() {
        return {
            versions: {
                type: Array
            },
            selectedVersion: {
                type: String
            },
            navigationFeatures: {
                type: Array,
                value: [{
                    label: "After Search Navigation (Facets)",
                    apiName: "asn",
                    active: false
                }, {
                    label: "Navigation",
                    apiName: "navigation",
                    active: false
                }, {
                    label: "Header Navigation",
                    apiName: "headerNavigation",
                    active: false
                }, {
                    label: "Pagination",
                    apiName: "paging",
                    active: false
                }, {
                    label: "Sorting",
                    apiName: "sort",
                    active: false
                }, {
                    label: "Products Per Page Dropdown",
                    apiName: "productsPerPageDropdown",
                    active: false
                }, {
                    label: "Products Per Page List",
                    apiName: "productsPerPageList",
                    active: false
                }]
            },
            moreFeatures: {
                type: Array,
                value: [{
                    label: "Suggest",
                    apiName: "suggest",
                    active: false
                }, {
                    label: "Onfocus Suggest",
                    apiName: "focusSuggest",
                    active: false
                }, {
                    label: "Campaigns",
                    apiName: "campaigns",
                    active: false
                }, {
                // TODO removed for 3.0 release -- might get reintroduced afterwards
                //     label: "Carousel",
                //     apiName: "carousel",
                //     active: false
                // }, {
                    label: "Compare",
                    apiName: "compare",
                    active: false
                }, {
                    label: "Recommendations",
                    apiName: "recommendation",
                    active: false
                }, {
                    label: "Similar Products",
                    apiName: "similarProducts",
                    active: false
                }, {
                    label: "Single Word Search",
                    apiName: "singleWordSearch",
                    active: false
                }, {
                    label: "Tag Cloud",
                    apiName: "tagCloud",
                    active: false
                }, {
                    label: "Search Feedback",
                    apiName: "searchFeedback",
                    active: false
                }]
            },
            apiOptions: {
                type: Object,
                computed: "_computeApiOptions(selectedVersion, navigationFeatures.*, moreFeatures.*)"
            },
            server: {
                type: String,
            },
            isDownloading: {
                type: Boolean,
                value: false,
                observer: "_isDownloadingChanged"
            },
            hasError: {
                type: Boolean,
                value: false,
                observer: "_hasErrorChanged"
            },
            lastDownload: {
                type: String
            },
            model: {
                type: Object
            },
            markdownFilePath: {
                type: String,
                computed: "_computeMarkdownFilePath(model)"
            },
            isSelectedVersion3XX: {
                type: Boolean,
                observer: `_isSelectedVersion3XXChanged`
            },
            versionOfDocumentation: {
                type: String,
                statePath: `app.version`,
            }
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.isSelectedVersion3XX = true;
        this.downloadAllNavigation = true;
        this.downloadAllMoreFeatures = true;
        this.$.downloadFinished.style.display = "none";
        setTimeout(() => {
            this._fetchVersions();
        }, 100);
    }

    compareVersions(a, b) {
        return this.parseVersion(a) < this.parseVersion(b) ? 1 : -1;
    }

    parseVersion(version) {
        return version.replace(/\D+/gm, '.').match(/[^.]+/g).map(e => e.padStart(3, '0')).join('');
    }

    _computeMarkdownFilePath(model) {
        if (model && model.apiName) {
            return `/markdown/${this.versionOfDocumentation}/en/info/${model.apiName}.md`;
        } else {
            return "";
        }
    }

    _handleHttpErrorResponse(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    /**
     * Initially load the Versions from the build service.
     *
     * @private
     */
    _fetchVersions() {
        fetch(this.server + "/versions", {
            mode: "cors"
        }).then(this._handleHttpErrorResponse)
            .then(r => r.json())
            .then(json => {
                this.versions = json;
            }).catch(error => {
            console.warn("Can not fetch versions!", error);
        });
    }

    _download() {
        if (this.selectedVersion[0] === `3`) {
            const downloadUrl = `https://github.com/FACT-Finder-Web-Components/ff-web-components/archive/${this.selectedVersion}.zip`;
            window.open(downloadUrl, `Download`);
            return;
        }

        const data = JSON.stringify(this.apiOptions);
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Content-Length", data.length.toString());
        this.hasError = false;//reset error label

        fetch(this.server + "/build", {
            method: "POST",
            headers: headers,
            body: data
        }).then(this._handleHttpErrorResponse)
            .then(r => r.json())
            .then(json => {
                if (json.finished) {//open download dialog
                    this.isDownloading = false;
                    this.$.downloadFinished.style.display = "inline-block";
                    this.lastDownload = this.server + json.url;
                    window.open(this.server + json.url, `Download`);
                } else {
                    this.isDownloading = true;
                    setTimeout(() => {
                        this._download();
                    }, 1000);
                }
            }).catch(error => {
            this.isDownloading = false;
//                        this.$.downloadFinished.style.display = "inline-block";
            this.hasError = true;//show error warning
            console.error("download.error", error);
        });
    }

    _toggleAll(event) {
        var buttons = event.currentTarget.nextElementSibling.querySelectorAll("div paper-toggle-button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].active = event.detail.value;
        }
    }

    _openDialog(event) {
        this.model = event.model.item;
        setTimeout(() => {// a little delayed to fix position after markdown is loaded
            this.$.dialog.center();
            this.$.dialog.refit();
            this.$.dialog.open();
        }, 200);
    }

    _selectedVersionChanged(event) {
        if (event.detail.value) {
            this.selectedVersion = event.detail.value.getAttribute("data-api-name");
            this.isSelectedVersion3XX = this.selectedVersion[0] === `3`;
        }
    }

    _hasDifference(arr) {
        var result = arr.filter(function (item) {
            return item.active;
        });
        return !(result.length === arr.length || result.length === 0);
    }

    _computeApiOptions(selectedVersion, navigationFeatures, moreFeatures) {
        return {
            version: selectedVersion,
            features: (function () {
                let result = ["core"];//always add core features
                navigationFeatures.base.concat(moreFeatures.base).forEach(function (feature) {
                    if (feature.active === true) {
                        result.push("" + feature.apiName);
                    }
                });
                return result;
            })()
        };
    }

    _isDownloadingChanged(newValue) {
        if (newValue) {
            this.$.downloadButton.style.opacity = 0;            //disable download button
            this.$.buildingInfo.style.display = "inline-block"; //add info for 'building...'
            this.$.downloadFinished.style.display = "none";
        } else {
            this.$.downloadButton.style.opacity = 1000;
            this.$.buildingInfo.style.display = "none";
        }
    }

    _isSelectedVersion3XXChanged(newValue) {
        if (newValue) {
            this.downloadAllNavigation = true;
            this.downloadAllMoreFeatures = true;
            this.moreFeatures = activateItems(this.moreFeatures);
            this.navigationFeatures = activateItems(this.navigationFeatures);
        }
    }

    _hasErrorChanged(newValue) {
        if (newValue) {
            this.$.buildError.style.display = "inline-block"; //add info for 'building...'
        } else {
            this.$.buildError.style.display = "none"; //add info for 'building...'
        }
    }
}

window.customElements.define('download-view', DownloadView);


function activateItems(items) {
    return items.map(item => {
        item.active = true;
        return item;
    });
}
