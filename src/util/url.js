export function urlPathToPages(path) {
    const paths = path.split('/');
    return {
        page: paths[1] || `home`,
        subpage: paths[2]
    };
}

export function getTabFromParams(params) {
    return /tab=/.test(params) ? params.split(`tab=`)[1].split(`&`)[0] : ``;
}
