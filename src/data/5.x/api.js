// api are the pages under the "API" tab
const api = {
    pages: {
        // --- Core API ---

        "core-overview": {
            path: `core-overview`,
            title: `API Overview`,
        },
        "request-pipelines": {
            path: `request-pipelines`,
            title: `Request Pipelines`,
        },
        "core-configuration": {
            path: `core-configuration`,
            title: `Configuration`,
        },
        "type-definitions": {
            path: `type-definitions`,
            title: `Type Definitions`,
        },


        // --- Basic Elements ---

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


        // --- Navigation ---

        "ff-breadcrumb-trail": {
            path: `ff-breadcrumb-trail`,
            title: `Breadcrumb`,
        },
        "ff-asn": {
            path: `ff-asn`,
            title: `Facets (ASN)`,
        },
        "ff-filter-cloud": {
            path: `ff-filter-cloud`,
            title: `Filter Cloud`
        },


        // --- More Features ---

        "ff-recommendation": {
            path: `ff-recommendation`,
            title: `Recommendation`,
        },
        "ff-similar-products": {
            path: `ff-similar-products`,
            title: `Similar Products`,
        },
        "ff-single-word-search": {
            path: `ff-single-word-search`,
            title: `Single Word Search`,
        },
        "ff-template": {
            path: `ff-template`,
            title: `Template`,
            noApi: true
        },
        "ff-checkout-tracking": {
            path: `ff-checkout-tracking`,
            title: `Checkout Tracking`,
            noDemo: true
        },
        "ImageBindingBehavior": {
            path: `ImageBindingBehavior`,
            title: `Image Binding`,
            noDemo: true,
        },
        "url-manipulation": {
            path: `url-manipulation`,
            title: `URL Manipulation`,
            noDemo: true,
            noApi: true,
        },
    },
};

api.core = [
    api.pages[`core-overview`],
    api.pages[`request-pipelines`],
    api.pages[`core-configuration`],
    api.pages[`type-definitions`],
];

api.basics = [
    api.pages[`ff-searchbox`],
    api.pages[`ff-record-list`],
    api.pages[`ff-suggest`],
];

api.navigation = [
    api.pages[`ff-breadcrumb-trail`],
    api.pages[`ff-asn`],
    api.pages[`ff-filter-cloud`],
];

api.moreFeatures = [
    api.pages[`ff-recommendation`],
    api.pages[`ff-similar-products`],
    api.pages[`ff-checkout-tracking`],
    api.pages[`ff-single-word-search`],
    api.pages[`ff-template`],
    api.pages[`ImageBindingBehavior`],
    api.pages[`url-manipulation`],
];

// set to undefined if section shall not be shown
api.subjectToChange = undefined;


export default api;
