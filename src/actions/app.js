export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';

export const navigate = (path) => (dispatch) => {
    // Extract the page name from path.
    const page = path === '/' ? 'view1' : path.slice(1);

    // Any other info you might want to extract from the path (like page type),
    // you can do here
    dispatch(loadPage(page));

    // Close the drawer - in case the *path* change came from a link in the drawer.
    dispatch(updateDrawerState(false));
};

const loadPage = (page) => (dispatch) => {
    switch (page) {
        case 'view1':
            import('../views/my-view1.js').then((module) => {
                // Put code in here that you want to run every time when
                // navigating to view1 after my-view1.js is loaded.
            });
            break;
        case 'view2':
            import('../views/my-view2.js');
            break;
        case 'view3':
            import('../views/my-view3.js');
            break;
        default:
            page = 'view404';
            import('../views/my-view404.js');
    }

    dispatch(updatePage(page));
};

const updatePage = (page) => {
    return {
        type: UPDATE_PAGE,
        page
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