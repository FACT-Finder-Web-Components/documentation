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
            showTabs: true,
        },
        "ff-record-list": {
            path: `ff-record-list`,
            title: `Record List`,
            showTabs: true,
        },
        "ff-suggest": {
            path: `ff-suggest`,
            title: `Suggest`,
            showTabs: true,
        },


        // --- Navigation ---

        "ff-breadcrumb-trail": {
            path: `ff-breadcrumb-trail`,
            title: `Breadcrumb`,
            showTabs: true,
        },
        "ff-asn": {
            path: `ff-asn`,
            title: `Facets (ASN)`,
            showTabs: true,
        },
        "ff-filter-cloud": {
            path: `ff-filter-cloud`,
            title: `Filter Cloud`,
            showTabs: true,
        },
        "ff-paging": {
            path: `ff-paging`,
            title: `Paging`,
            showTabs: true,
        },
        "ff-paging-dropdown": {
            path: `ff-paging-dropdown`,
            title: `Paging Dropdown`,
            showTabs: true,
        },
        "ff-products-per-page": {
            path: `ff-products-per-page`,
            title: `Products Per Page`,
            showTabs: true,
        },
        "ff-sortbox": {
            path: `ff-sortbox`,
            title: `Sortbox`,
            showTabs: true,
        },


        // --- More Features ---

        "popular-searches": {
            path: `popular-searches`,
            title: `Popular Searches`,
            showTabs: true,
            noApi: true,
        },
        "ff-campaign": {
            path: `ff-campaign`,
            title: `Campaign`,
            showTabs: true,
        },
        "ff-campaign-pushed-products": {
            path: `ff-campaign-pushed-products`,
            title: `Pushed Products`,
            showTabs: true,
        },
        "ff-campaign-landing-page": {
            path: `ff-campaign-landing-page`,
            title: `Landing Page Campaign`,
            showTabs: true,
        },
        "ff-campaign-product": {
            path: `ff-campaign-product`,
            title: `Product Campaign`,
            showTabs: true,
        },
        "ff-campaign-shopping-cart": {
            path: `ff-campaign-shopping-cart`,
            title: `Shopping Cart Campaign`,
            showTabs: true,
        },
        "ff-recommendation": {
            path: `ff-recommendation`,
            title: `Recommendation`,
            showTabs: true,
        },
        "ff-similar-products": {
            path: `ff-similar-products`,
            title: `Similar Products`,
            showTabs: true,
        },
        "ff-single-word-search": {
            path: `ff-single-word-search`,
            title: `Single Word Search`,
            showTabs: true,
        },
        "ff-template": {
            path: `ff-template`,
            title: `Template`,
            showTabs: true,
            noApi: true,
        },
        "ff-checkout-tracking": {
            path: `ff-checkout-tracking`,
            title: `Checkout Tracking`,
            showTabs: true,
            noDemo: true,
        },
        "ImageBindingBehavior": {
            path: `ImageBindingBehavior`,
            title: `Image Binding`,
            showTabs: true,
            noDemo: true,
        },
        "DeferredAttributeResolving": {
            path: `DeferredAttributeResolving`,
            title: `Deferred attribute resolving`,
            noDemo: true,
            noApi: true,
        },
        "url-manipulation": {
            path: `url-manipulation`,
            title: `URL Manipulation`,
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
    api.pages[`popular-searches`],
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
    api.pages[`DeferredAttributeResolving`],
    api.pages[`url-manipulation`],
];

// set to undefined if section shall not be shown
api.subjectToChange = undefined;


export default api;
