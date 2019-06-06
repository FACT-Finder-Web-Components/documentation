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


<h2>Oops! You hit a [[errorCode]]!</h2>
<div class="imgContainer">
    <img src="/images/[[errorCode]]-cat.jpg">
</div>


<template is="dom-if" if="[[hasAlternative]]">
<div class="suggestionContainer">
    <div>
        <template is="dom-if" if="[[hasMoved]]"><p>The requested page has moved</p></template>
        <template is="dom-if" if="[[isSuggestion]]"><p>There is a possible alternative page</p></template>
        <h3>[[title]]</h3>
        <p><a href="[[url]]">[[url]]</a></p>
    </div>
</div>
</template>
    `;
    }

    ready() {
        super.ready();

        this.hasAlternative = false;
        this.hasMoved = false;
        this.isSuggestion = false;
        this.errorCode = 404;

        const { page, version, subpage } = urlPathToPages(window.decodeURIComponent(location.pathname));

        tryGetSubpage(page, version, subpage).map(pageData => {
            this.hasAlternative = true;

            this.isSuggestion = pageData.isSuggestion === true;
            this.hasMoved = !this.isSuggestion && pageData.hasMoved === true;
            if (this.hasMoved) this.errorCode = 301;

            this.title = pageData.title;
            this.url = `${location.protocol}//${location.host}/${pageData.page}/${version}/${pageData.path}`;
        });
    }
}

window.customElements.define(`view-404`, View404);
