import api from "./api";
import documentation from "./guides";

import { IsDefinedFunctor } from "../util/functors";


// import() doesn't accept dynamic values/variables
// to emulate the behaviour of dynamic importing wrap the import statement with its string literal in a callback
export const pageImportInfoCollection = Object.freeze({
    home: createPageImportInfo(() => import("../views/home-view.js")),
    api: createPageImportInfo(() => import("../views/api-view.js"), api.pages),
    documentation: createPageImportInfo(() => import("../views/documentation-view.js"), documentation.pages),
    download: createPageImportInfo(() => import("../views/download-view.js")),
    contacts: createPageImportInfo(() => import("../views/contacts-view.js")),
    search: createPageImportInfo(() => import("../views/search-view.js")),
});

export function tryGetSubpage(subpage) {
    return IsDefinedFunctor(getSubpageSuggestion(subpage));
}


function createPageImportInfo(importTargetCall, subpages = undefined) {
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
