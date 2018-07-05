export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';

export const navigate = (path) => (dispatch) => {
    // Extract the page name from path.
    const paths = path.split('/');
    const page = paths[1] === '' ? 'home' : paths[1];
    const subpage = paths[2];

    // Any other info you might want to extract from the path (like page type),
    // you can do here
    dispatch(loadPage(page, subpage));

    // Close the drawer - in case the *path* change came from a link in the drawer.
    dispatch(updateDrawerState(false));
};

const loadPage = (page, subpage) => (dispatch) => {
    switch (page) {
        case 'home':
            import('../views/home-view.js');
            break;
        case 'documentation':
            import('../views/documentation-view.js');
            break;
        case 'guides':
            import('../views/guides-view.js');
            break;
        case 'download':
            import('../views/download-view.js');
            break;
        case 'contacts':
            import('../views/contacts-view.js');
            break;
        default:
            page = 'view404';
            import('../views/view-404.js');
    }

    dispatch(updatePage(page, subpage));
};

const updatePage = (page, subpage) => {
    return {
        type: UPDATE_PAGE,
        page,
        subpage
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