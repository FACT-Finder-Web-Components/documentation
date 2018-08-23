import api from "./api";
import documentation from "./guides";

import { IsDefinedFunctor } from "../util/functors";


// import() doesn't accept dynamic values/variables
// to emulate the behaviour of dynamic importing wrap the import statement with its string literal in a callback
export const pageInfoCollection = Object.freeze({
    home: createPageInfo(() => import("../views/home-view.js")),
    api: createPageInfo(() => import("../views/api-view.js"), api.pages),
    documentation: createPageInfo(() => import("../views/documentation-view.js"), documentation.pages),
    download: createPageInfo(() => import("../views/download-view.js")),
    contacts: createPageInfo(() => import("../views/contacts-view.js")),
    search: createPageInfo(() => import("../views/search-view.js")),
});

export function tryGetSubpage(subpage) {
    return IsDefinedFunctor(getSubpageSuggestion(subpage));
}


function createPageInfo(importTargetCall, subpages = undefined) {
    return Object.freeze({
        importTarget: importTargetCall,
        subpages,
        requiresSubpage: !!subpages
    });
}

function getSubpageSuggestion(subpage) {
    if (api.pages[subpage])
        return createSubpageSuggestion(`api`, api.pages[subpage]);

    if (documentation.pages[subpage])
        return createSubpageSuggestion(`documentation`, documentation.pages[subpage]);

    return undefined;
}

function createSubpageSuggestion(page, subpageData) {
    return Object.freeze({
        page,
        subpageData
    });
}
