import {
    UPDATE_PAGE,
    UPDATE_DRAWER_STATE
} from '../actions/app.js';

const app = (state = {drawerOpened: false}, action) => {
    switch (action.type) {
        case UPDATE_PAGE:
            return {
                ...state,
                page: action.page,
                version: action.version,
                subpage: action.subpage,
                tab: action.tab || "docs"
            };
        case UPDATE_DRAWER_STATE:
            return {
                ...state,
                drawerOpened: action.opened
            };
        default:
            return state;
    }
};

export default app;