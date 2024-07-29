// api are the pages under the "API" tab
const api = {
    pages: {
        // --- core ---


        // --- basics ---

        "ff-searchbox": {
            path: `ff-searchbox`,
            title: `Searchbox`,
        },
        "ff-record-list": {
            path: `ff-record-list`,
            title: `Record List`,
        },
        "ff-suggest": {
            path: `ff-suggest`,
            title: `Suggest`,
        },


        // --- navigation ---


        // --- more features ---

    },
};

api.core = [
];

api.basics = [
    api.pages[`ff-searchbox`],
    api.pages[`ff-record-list`],
    api.pages[`ff-suggest`],
];

api.navigation = [
];

api.moreFeatures = [
];

// set to undefined if section shall not be shown
api.subjectToChange = undefined;


export default api;
