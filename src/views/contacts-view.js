import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

class ContactsView extends PolymerElement {
    static get template() {
        return html`
        <style include="shared-styles">
            :host {
                display: block;
                padding: 10px;
                font-family: "Open Sans", sans-serif !important;
                font-size: 14px;
            }

            p {
                font-weight: 400;
                color: #3c3c3b;
                font-size: 1.5vmax;
            }

            button {
                color: #fff;
                background-color: #3498db;

                border: none;
                font-size: 40px;
                font-family: Open Sans, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;

                font-weight: 700;
                line-height: normal;
                padding: 18px 36px 19px;
                transition: background-color 0.8s;
            }

            button:hover {
                background-color: #007bbf;
            }

            img {
                max-width: 100%;
                height: auto;
            }
        </style>

        <div id="de" style="display: none;" class="container theme-showcase" role="main">
            <div class="row">
                <h1>Learn more about FACT-Finder</h1>
                <p>
                    Get in Touch with us:
                </p>
            </div>

            <div class="row">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Dominik Brauch</h3>
                    </div>
                    <div class="panel-body">
                        <p>Account Manager FACT-Finder</p>
                        <p>
                            Email:<a href="mailto:dominik.brauch@omikron.net"> dominik.brauch@omikron.net</a>
                        </p>
                        <p>
                            Phone: +49 7231/12597-561
                        </p>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Tobias Armbruster</h3>
                    </div>
                    <div class="panel-body">
                        <p>Developer FACT-Finder Web Components</p>
                        <p>
                            Email:<a href="mailto:tobias.armbruster@omikron.net"> tobias.armbruster@omikron.net</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div id="uk" style="display: none" class="container theme-showcase" role="main">
            <div class="row">
                <h1><b>Learn more about FACT-Finder</b></h1>
                <p>
                    Get in Touch with us:
                </p>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Kevin Sparks</h3>
                    </div>
                    <div class="panel-body">
                        <p>Commercial Director FF (UK) Ltd.</p>
                        <p>
                            Email:<a href="mailto:kevin.sparks@fact-finder.com">kevin.sparks@fact-finder.com</a>
                        </p>
                        <p>
                            Phone: +44 (0) 7739 174463
                        </p>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Stuart Patterson</h3>
                    </div>
                    <div class="panel-body">
                        <p>Business Development Manager</p>
                        <p>
                            Email:<a href="mailto:stuart.patterson@fact-finder.com">stuart.patterson@fact-finder.com</a>
                        </p>
                        <p>
                            Phone: +44 (0) 7933 129543
                        </p>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Tobias Armbruster</h3>
                    </div>
                    <div class="panel-body">
                        <p>Developer FACT-Finder Web Components</p>
                        <p>
                            Email:<a href="mailto:tobias.armbruster@omikron.net"> tobias.armbruster@omikron.net</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
`;
    }

    ready() {
        super.ready();
        try {
            var matchCOM = location.hostname.match(/\.com$/);
            var matchUK = location.hostname.match(/\.co.uk/);

            if (matchCOM || matchUK) {
                var uk = this.shadowRoot.querySelector(`#uk`);
                uk.style = ``;
            } else {
                var de = this.shadowRoot.querySelector(`#de`);
                de.style = ``;
            }
        } catch (e) {
            var de = this.shadowRoot.querySelector(`#de`);
            de.style = ``;
        }
    }
}

window.customElements.define('contacts-view', ContactsView);