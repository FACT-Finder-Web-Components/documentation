import { pageImportInfoCollection } from "../data/pageMappings";
import { getTabFromParams, urlPathToPages } from "../util/url";


export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';


export const navigate = (path, params) => (dispatch) => {
    const { page, version, subpage } = urlPathToPages(path);
    const tab = getTabFromParams(params);

    // Any other info you might want to extract from the path (like page type),
    // you can do here
    dispatch(loadPage(page, version, subpage, tab));

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
        page = 'view404';
        import('../views/view-404.js');
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
    if (!pageImportInfo.subpages[version] || !pageImportInfo.subpages[version][subpage]) return false;

    return !pageImportInfo.subpages[version][subpage].hasMoved;
}
