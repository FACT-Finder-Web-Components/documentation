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

export function tryGetSubpage(page, subpage) {
    const ftor = IsDefinedFunctor(pageImportInfoCollection[page])
        .map(pageInfo => pageInfo.subpages && pageInfo.subpages[subpage]);

    return ftor.valueOf()
        ? ftor
        : IsDefinedFunctor(getSubpageSuggestion(subpage));
}

export function hasMovedModifier(page, newSubpageData) {
    return createPageInfo(page, newSubpageData, { hasMoved: true });
}


function createPageImportInfo(importTargetCall, subpages = undefined) {
    return Object.freeze({
        importTarget: importTargetCall,
        subpages,
        requiresSubpage: !!subpages
    });
}

function getSubpageSuggestion(subpage) {
    if (api.pages[subpage]) {
        return createSubpageSuggestion(`api`, api.pages[subpage]);
    }

    if (documentation.pages[subpage]) {
        return createSubpageSuggestion(`documentation`, documentation.pages[subpage]);
    }
}

function createSubpageSuggestion(page, subpageData) {
    return createPageInfo(page, subpageData, { isSuggestion: true });
}


function createPageInfo(page, subpageData, meta) {
    return Object.freeze({
        page,
        // page might get overwritten here. this is ok, because subpageData is likely to come from a config file which shall have priority
        ...subpageData,
        ...meta
    });
}
