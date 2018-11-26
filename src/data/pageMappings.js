import api from "./api";
import documentation from "./guides";

import { createPageInfo } from "./pageHelper";
import { IsDefinedFunctor } from "../util/functors";


// import() doesn't accept dynamic values/variables
// to emulate the behaviour of dynamic importing wrap the import statement with its string literal in a callback
export const pageImportInfoCollection = Object.freeze({
    home: createPageImportInfo(() => import("../views/home-view.js")),
    api: createPageImportInfo(() => import("../views/api-view.js"), api),
    documentation: createPageImportInfo(() => import("../views/documentation-view.js"), documentation),
    download: createPageImportInfo(() => import("../views/download-view.js")),
    contacts: createPageImportInfo(() => import("../views/contacts-view.js")),
    search: createPageImportInfo(() => import("../views/search-view.js")),
});

export function tryGetSubpage(page, version, subpage) {
    const ftor = IsDefinedFunctor(pageImportInfoCollection[version])
        .map(version => version.pages[page])
        .map(pageInfo => pageInfo.subpages && pageInfo.subpages[subpage]);

    return ftor.valueOf()
        ? ftor
        : IsDefinedFunctor(getSubpageSuggestion(version, subpage));
}

function createPageImportInfo(importTargetCall, versionedSubpages = undefined) {
    return Object.freeze({
        importTarget: importTargetCall,
        versionedSubpages,
        requiresSubpage: !!versionedSubpages
    });
}

function getSubpageSuggestion(version, subpage) {
    if (api[version] && api[version].pages[subpage]) {
        return createSubpageSuggestion(`api`, api[version].pages[subpage]);
    }

    if (documentation[version].pages[subpage]) {
        return createSubpageSuggestion(`documentation`, documentation[version].pages[subpage]);
    }
}

function createSubpageSuggestion(page, subpageData) {
    return createPageInfo(page, subpageData, { isSuggestion: true });
}