// api are the pages under the "API" tab
const api = {
    pages: {
        // --- core ---

        "core-configuration": {
            path: `core-configuration`,
            title: `Configuration`,
        },


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

        "ff-breadcrumb-trail": {
            path: `ff-breadcrumb-trail`,
            title: `Breadcrumb`,
        },


        // --- more features ---

        "ff-recommendation": {
            path: `ff-recommendation`,
            title: `Recommendation`,
        },
        "ff-similar-products": {
            path: `ff-similar-products`,
            title: `Similar Products`,
        },
        "ImageBindingBehavior": {
            path: `ImageBindingBehavior`,
            title: `Image Binding`,
            noDemo: true,
        },
    },
};

api.core = [
    api.pages[`core-configuration`],
];

api.basics = [
    api.pages[`ff-searchbox`],
    api.pages[`ff-record-list`],
    api.pages[`ff-suggest`],
];

api.navigation = [
    api.pages[`ff-breadcrumb-trail`],
];

api.moreFeatures = [
    api.pages[`ff-recommendation`],
    api.pages[`ff-similar-products`],
    api.pages[`ImageBindingBehavior`],
];

// set to undefined if section shall not be shown
api.subjectToChange = undefined;


export default api;
