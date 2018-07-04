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
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import './my-icons.js';
import ReduxMixin from "./util/polymer-redux-mixin";
import {navigate, updateDrawerState} from "./actions/app";

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class DocumenationApp extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
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
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }
      </style>
      <!-- Main content -->
      <app-header-layout has-scrolling-region="">

        <app-header slot="header" fixed="" effects="waterfall">
          <app-toolbar>
            <div main-title="">
              <img src="https://web-components.fact-finder.de/bower_components/fff-elements/fff-header/logo_fact-finder.png" alt="FF Logo">
            </div>
            <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
            <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
              <paper-tabs selected="[[page]]" noink="" scrollable="" fit-container="" no-slide="" no-bar="" attr-for-selected="name">
                <paper-tab name="home">
                  <a name="home" href="[[rootPath]]home">Home</a>
                </paper-tab>
                <paper-tab name="documentation">
                  <a name="documentation" href="[[rootPath]]documentation">Documentation</a>
                </paper-tab>
                <paper-tab name="guides">
                  <a name="guides" href="[[rootPath]]guides">Guides</a>
                </paper-tab>
                <paper-tab name="download">
                  <a name="download" href="[[rootPath]]download">Download</a>
                </paper-tab>
                <paper-tab name="contacts">
                  <a name="contacts" href="[[rootPath]]contacts">Contacts</a>
                </paper-tab>
                <paper-tab>
                  <a href="https://github.com/FACT-Finder-Web-Components" target="_blank">Github</a>
                </paper-tab>
              </paper-tabs>
            </iron-selector>
          </app-toolbar>
        </app-header>

        <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
          <home-view name="home"></home-view>
          <documentation-view name="documentation"></documentation-view>
          <guides-view name="guides"></guides-view>
          <download-view name="download"></download-view>
          <contacts-view name="contacts"></contacts-view>
          <view-404 name="view404"></view-404>
        </iron-pages>
      </app-header-layout>
    `;
  }

  static get is() {
    return "documentation-app";
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        statePath: 'app.page'
      },
      drawerOpened: {
        type: Boolean,
        statePath: 'app.drawerOpened',
        observer: '_toggleDrawer'
      }
    };
  }

  ready() {
    installRouter((location) => this.dispatch(navigate(window.decodeURIComponent(location.pathname))));
    super.ready();
  }

  _toggleDrawer(newValue) {
    this.dispatch(updateDrawerState(newValue));
  }

}

window.customElements.define(DocumenationApp.is, DocumenationApp);
