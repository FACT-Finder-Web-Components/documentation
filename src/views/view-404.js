/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { urlPathToPages } from "../util/url";
import { tryGetSubpage } from "../data/pageMappings";

class View404 extends PolymerElement {
    static get template() {
        return html`
<style>
    :host {
        display: block;

        padding: 10px 20px;
    }
    h2 {
        text-align: center;
    }
    .imgContainer {
        text-align: center;
        margin-top: 24px;
        margin-bottom: 24px;
    }
    img {
        width: 100%;
        max-width: 800px;
        border-radius: 50%;
    }
    .suggestionContainer {
        display: flex;
        justify-content: center;
    }
</style>

<h2>Oops! You hit a 404!</h2>
<div class="imgContainer">
    <img src="/images/404-cat.jpg">
</div>


<template is="dom-if" if="[[suggestionFound]]">
<div class="suggestionContainer">
    <div>
        <p>There is a possible alternative page</p>
        <h3>[[title]]</h3>
        <p><a href="[[url]]">[[url]]</a></p>
    </div>
</div>
</template>
    `;
    }

    ready() {
        super.ready();

        this.suggestionFound = false;

        const { subpage } = urlPathToPages(window.decodeURIComponent(location.pathname));

        tryGetSubpage(subpage).map(({ page, subpageData }) => {
            this.title = subpageData.title;
            this.url = `${location.protocol}//${location.host}/${page}/${subpageData.path}`;
            this.suggestionFound = true;
        });
    }
}

window.customElements.define('view-404', View404);
