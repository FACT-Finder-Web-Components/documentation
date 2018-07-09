export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';

export const navigate = (path, params) => (dispatch) => {
    // Extract the page name from path.
    const paths = path.split('/');
    const page = paths[1] === '' ? 'home' : paths[1];
    const subpage = paths[2];

    const tab = params.indexOf('tab=') !== -1 ? params.split('tab=')[1].split('&')[0] : '';
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
    switch (page) {
        case 'home':
            import('../views/home-view.js');
            break;
        case 'api':
            import('../views/api-view.js');
            break;
        case 'documentation':
            import('../views/documentation-view.js');
            break;
        case 'download':
            import('../views/download-view.js');
            break;
        case 'contacts':
            import('../views/contacts-view.js');
            break;
        case 'search':
            import('../views/search-view.js');
            break;
        default:
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