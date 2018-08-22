/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

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
    }
    img {
        width: 100%;
        max-width: 800px;
        border-radius: 50%;
    }
</style>

<h2>Oops! You hit a 404!</h2>
<div class="imgContainer">
    <img src="http://search-web-components.fact-finder.de/crap/img/stupidCat.jpg">
</div>
    `;
    }
}

window.customElements.define('view-404', View404);
