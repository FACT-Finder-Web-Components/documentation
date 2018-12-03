import "highlightjs"
import {updateDrawerState} from "../actions/app";

let Mixin = (superclass) => class extends superclass {
    isActiveView() {
        return this.classList.contains(`iron-selected`);
    }

    /**
     * Used in the markdown for syntax highlighting.
     */
    _addHiglightJs(event) {
        let code = event.detail.code;
        let language = event.detail.lang;
        // Check whether the given language is valid for highlight.js.
        const validLang = !!(language && hljs.getLanguage(language));
        // Highlight only if the language is valid.
        const highlighted = validLang ? hljs.highlight(language, code).value : code;
        // Render the highlighted code with `hljs` class.
        event.detail.code = `${highlighted}`;
    }

    _toggleDrawer(newValue) {
        this.dispatch(updateDrawerState(newValue));
    }
};

export default function ViewMixin(prototype) {
    return Mixin(prototype);
};