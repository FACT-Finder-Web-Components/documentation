export function hasMovedModifier(page, newSubpageData) {
    return createPageInfo(page, newSubpageData, { hasMoved: true });
}

export function createPageInfo(page, subpageData, meta) {
    return Object.freeze({
        page,
        // page might get overwritten here. this is ok, because subpageData is likely to come from a config file which shall have priority
        ...subpageData,
        ...meta
    });
}