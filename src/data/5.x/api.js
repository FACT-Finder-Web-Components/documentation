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
            noDemo: true,  // Temporary until demos are migrated.
        },
        "ff-record-list": {
            path: `ff-record-list`,
            title: `Record List`,
            noDemo: true,  // Temporary until demos are migrated.
        },
        "ff-suggest": {
            path: `ff-suggest`,
            title: `Suggest`,
            noDemo: true,  // Temporary until demos are migrated.
        },


        // --- Navigation ---

        "ff-breadcrumb-trail": {
            path: `ff-breadcrumb-trail`,
            title: `Breadcrumb`,
            noDemo: true,  // Temporary until demos are migrated.
        },
        "ff-asn": {
            path: `ff-asn`,
            title: `Facets (ASN)`,
            noDemo: true,  // Temporary until demos are migrated.
        },
        "ff-filter-cloud": {
            path: `ff-filter-cloud`,
            title: `Filter Cloud`,
            noDemo: true,  // Temporary until demos are migrated.
        },
        "ff-paging": {
            path: `ff-paging`,
            title: `Paging`,
            noDemo: true,  // Temporary until demos are migrated.
        },
        "ff-paging-dropdown": {
            path: `ff-paging-dropdown`,
            title: `Paging Dropdown`,
            noDemo: true,  // Temporary until demos are migrated.
        },
        "ff-products-per-page": {
            path: `ff-products-per-page`,
            title: `Products Per Page`,
            noDemo: true,  // Temporary until demos are migrated.
        },
        "ff-sortbox": {
            path: `ff-sortbox`,
            title: `Sortbox`,
            noDemo: true,  // Temporary until demos are migrated.
        },


        // --- More Features ---

        "ff-campaign": {
            path: `ff-campaign`,
            title: `Campaign`,
            noDemo: true,  // Temporary until demos are migrated.
        },
        "ff-campaign-pushed-products": {
            path: `ff-campaign-pushed-products`,
            title: `Pushed Products`,
            noDemo: true,  // Temporary until demos are migrated.
        },
        "ff-campaign-landing-page": {
            path: `ff-campaign-landing-page`,
            title: `Landing Page Campaign`,
            noDemo: true,  // Temporary until demos are migrated.
        },
        "ff-campaign-product": {
            path: `ff-campaign-product`,
            title: `Product Campaign`,
            noDemo: true,  // Temporary until demos are migrated.
        },
        "ff-campaign-shopping-cart": {
            path: `ff-campaign-shopping-cart`,
            title: `Shopping Cart Campaign`,
            noDemo: true,  // Temporary until demos are migrated.
        },
        "ff-recommendation": {
            path: `ff-recommendation`,
            title: `Recommendation`,
            noDemo: true,  // Temporary until demos are migrated.
        },
        "ff-similar-products": {
            path: `ff-similar-products`,
            title: `Similar Products`,
            noDemo: true,  // Temporary until demos are migrated.
        },
        "ff-single-word-search": {
            path: `ff-single-word-search`,
            title: `Single Word Search`,
            noDemo: true,  // Temporary until demos are migrated.
        },
        "ff-template": {
            path: `ff-template`,
            title: `Template`,
            noDemo: true,  // Temporary until demos are migrated.
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
    api.pages[`ff-paging`],
    api.pages[`ff-paging-dropdown`],
    api.pages[`ff-products-per-page`],
    api.pages[`ff-sortbox`],
];

api.moreFeatures = [
    api.pages[`ff-campaign`],
    api.pages[`ff-campaign-pushed-products`],
    api.pages[`ff-campaign-landing-page`],
    api.pages[`ff-campaign-product`],
    api.pages[`ff-campaign-shopping-cart`],
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
