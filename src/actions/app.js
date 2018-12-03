import { pageImportInfoCollection } from '../data/pageMappings';
import { getTabFromParams, urlPathToPages } from '../util/url';
import config from '../../config';


export const UPDATE_PAGE = `UPDATE_PAGE`;
export const UPDATE_DRAWER_STATE = `UPDATE_DRAWER_STATE`;


export const navigate = (path, params) => (dispatch) => {
    const { page, version, subpage } = urlPathToPages(path);
    const tab = getTabFromParams(params);

    const subpageRequired = page === `api` || page === `documentation`;
    if (subpageRequired && !subpage) { // URL without version part
        const latestVersion = config.versions[0].name;
        window.history.replaceState({}, ``, [page, latestVersion, version].join(`/`));
        dispatch(loadPage(page, latestVersion, version, tab));
    } else {
        dispatch(loadPage(page, version, subpage, tab));
    }

    // Close the drawer - in case the *path* change came from a link in the drawer.
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (width <= 640) {
        dispatch(updateDrawerState(false));
    }
};

export const updateDrawerState = (opened) => (dispatch, getState) => {
    if (getState().app.drawerOpened !== opened) {
        dispatch({
            type: UPDATE_DRAWER_STATE,
            opened
        });
    }
};


const loadPage = (page, version, subpage, tab) => (dispatch) => {
    const importInfo = pageImportInfoCollection[page];

    if (isValidPage(importInfo, version, subpage)) {
        importInfo.importTarget();
    }
    else {
        page = `view404`;
        import(`../views/view-404.js`);
    }

    dispatch(updatePage(page, version, subpage, tab));
};

const updatePage = (page, version, subpage, tab) => {
    return {
        type: UPDATE_PAGE,
        page,
        version,
        subpage,
        tab
    };
};


function isValidPage(pageImportInfo, version, subpage) {
    if (!pageImportInfo) return false;
    if (!pageImportInfo.requiresSubpage) return true;
    if (!pageImportInfo.versionedSubpages[version] || !pageImportInfo.versionedSubpages[version].pages[subpage]) return false;

    return !pageImportInfo.versionedSubpages[version].pages[subpage].hasMoved;
}
