import {
    UPDATE_PAGE,
    UPDATE_DRAWER_STATE
} from '../actions/app.js';
import config from "../../config";

const initialState = {
    drawerOpened: false,
    version: config.versions[0].name,
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PAGE:
            return {
                ...state,
                page: action.page,
                version: isValidVersion(action.version) ? action.version : state.version,
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

const versionNames = config.versions.map(v => v.name);
function isValidVersion(version) {
    return versionNames.some(n => n === version);
}