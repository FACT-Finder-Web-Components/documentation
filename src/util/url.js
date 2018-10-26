export function urlPathToPages(path) {
    const paths = path.split('/');
    return {
        page: paths[1] || `home`,
        version: paths[2],
        subpage: paths[3]
    };
}

export function getTabFromParams(params) {
    return /tab=/.test(params) ? params.split(`tab=`)[1].split(`&`)[0] : ``;
}
