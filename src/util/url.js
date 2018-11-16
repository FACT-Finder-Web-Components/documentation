export function urlPathToPages(path) {
    const [, page, version, subpage] = path.split(`/`);
    return {
        page: page || `home`,
        version,
        subpage
    };
}

export function getTabFromParams(params) {
    return /tab=/.test(params) ? params.split(`tab=`)[1].split(`&`)[0] : ``;
}
