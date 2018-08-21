import api from "./api";
import documentation from "./guides";


export const pageInfoCollection = Object.freeze({
    home: createPageInfo(`../views/home-view.js`),
    api: createPageInfo(`../views/api-view.js`, api.pages),
    documentation: createPageInfo(`../views/documentation-view.js`, documentation.pages),
    download: createPageInfo(`../views/download-view.js`),
    contacts: createPageInfo(`../views/contacts-view.js`),
    search: createPageInfo(`../views/search-view.js`),
});


function createPageInfo(importTarget, subpages = undefined) {
    return Object.freeze({
        importTarget,
        subpages,
        requiresSubpage: !!subpages
    });
}
