import { pageImportInfoCollection } from "../data/pageMappings";
import { getTabFromParams, urlPathToPages } from "../util/url";


export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';


export const navigate = (path, params) => (dispatch) => {
    const { page, subpage } = urlPathToPages(path);
    const tab = getTabFromParams(params);

    // Any other info you might want to extract from the path (like page type),
    // you can do here
    dispatch(loadPage(page, subpage, tab));

    // Close the drawer - in case the *path* change came from a link in the drawer.
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (width <= 640) {
        dispatch(updateDrawerState(false));
    }
};

const loadPage = (page, subpage, tab) => (dispatch) => {
    const importInfo = pageImportInfoCollection[page];

    if (importInfo && (!importInfo.requiresSubpage || importInfo.subpages[subpage])) {
        importInfo.importTarget();
    }
    else {
        page = 'view404';
        import('../views/view-404.js');
    }

    dispatch(updatePage(page, subpage, tab));
};

const updatePage = (page, subpage, tab) => {
    return {
        type: UPDATE_PAGE,
        page,
        subpage,
        tab
    };
};

export const updateDrawerState = (opened) => (dispatch, getState) => {
    if (getState().app.drawerOpened !== opened) {
        dispatch({
            type: UPDATE_DRAWER_STATE,
            opened
        });
    }
};
