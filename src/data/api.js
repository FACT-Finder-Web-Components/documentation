// api are the pages under the "API" tab

const api = {
    pages: {
        "core-result-dispatcher": {
            path: "core-result-dispatcher",
            title: "ResultDispatcher",
        },
        "core-event-aggregator": {
            path: "core-event-aggregator",
            title: "EventAggregator",
        },

        "ff-searchbox": {
            path: "ff-searchbox",
            title: "Searchbox",
        },
        "ff-record-list": {
            path: "ff-record-list",
            title: "Record List",
        },
        "ff-suggest": {
            path: "ff-suggest",
            title: "Suggest",
        },

        "ff-breadcrumb-trail": {
            path: "ff-breadcrumb-trail",
            title: "Breadcrumb",
        },
        "ff-asn": {
            path: "ff-asn",
            title: "Facets (ASN)",
        },
        "ff-navigation": {
            path: "ff-navigation",
            title: "Navigation",
        },
        "ff-header-navigation": {
            path: "ff-header-navigation",
            title: "Header Navigation",
        },
        "ff-paging": {
            path: "ff-paging",
            title: "Paging",
        },
        "ff-paging-dropdown": {
            path: "ff-paging-dropdown",
            title: "Paging Dropdown",
        },
        "ff-products-per-page": {
            path: "ff-products-per-page",
            title: "Products Per Page",
        },
        "ff-sortbox": {
            path: "ff-sortbox",
            title: "Sortbox",
        },

        "ff-campaign": {
            path: "ff-campaign",
            title: "Campaign",
        },
        "ff-campaign-pushed-products": {
            path: "ff-campaign-pushed-products",
            title: "Pushed Products",
        },
        "ff-campaign-landing-page": {
            path: "ff-campaign-landing-page",
            title: "Landing Page Campaign",
        },
        "ff-campaign-shopping-cart": {
            path: "ff-campaign-shopping-cart",
            title: "Shopping Cart Campaign",
        },
        "ff-product-campaign": {
            path: "ff-product-campaign",
            title: "Product Campaign",
        },
        "ff-search-feedback": {
            path: "ff-search-feedback",
            title: "Search Feedback",
        },
        "ff-recommendation": {
            path: "ff-recommendation",
            title: "Recommendation",
        },
        "ff-compare": {
            path: "ff-compare",
            title: "Compare",
        },
        "ff-similar-products": {
            path: "ff-similar-products",
            title: "Similar Products",
        },
        "ff-single-word-search": {
            path: "ff-single-word-search",
            title: "Single Word Search",
        },
        "ff-carousel": {
            path: "ff-carousel",
            title: "Carousel",
        },
        "ff-tag-cloud": {
            path: "ff-tag-cloud",
            title: "Tag Cloud",
        },
        "ff-template": {
            path: "ff-template",
            noApi: true
            title: "Template",
        },
        "ff-checkout-tracking": {
            path: "ff-checkout-tracking",
            title: "Checkout Tracking",
        },


        // --- obsolete pages ---

        "overview-get-started": {
            path: "overview-get-started",
            title: "Get started",
        },
        "overview-styling-elements": {
            path: "overview-styling-elements",
            title: "Styling Elements",
        },
        "overview-communication": {
            path: "overview-communication",
            title: "Communication",
        },
        "overview-template-engine": {
            path: "overview-template-engine",
            title: "Template Engine",
        },
        "overview-utils": {
            path: "overview-utils",
            title: "Utils",
        },
    }
};

api.core = [
    api.pages["core-result-dispatcher"],
    api.pages["core-event-aggregator"],
];

api.basics = [
    api.pages["ff-searchbox"],
    api.pages["ff-record-list"],
    api.pages["ff-suggest"],
];

api.navigation = [
    api.pages["ff-breadcrumb-trail"],
    api.pages["ff-asn"],
    api.pages["ff-navigation"],
    api.pages["ff-header-navigation"],
    api.pages["ff-paging"],
    api.pages["ff-paging-dropdown"],
    api.pages["ff-products-per-page"],
    api.pages["ff-sortbox"],
];

api.moreFeatures = [
    api.pages["ff-campaign"],
    api.pages["ff-campaign-pushed-products"],
    api.pages["ff-campaign-landing-page"],
    api.pages["ff-campaign-shopping-cart"],
    api.pages["ff-checkout-tracking"],
    api.pages["ff-product-campaign"],
    api.pages["ff-search-feedback"],
    api.pages["ff-recommendation"],
    api.pages["ff-compare"],
    api.pages["ff-similar-products"],
    api.pages["ff-single-word-search"],
    api.pages["ff-carousel"],
    api.pages["ff-tag-cloud"],
    api.pages["ff-template"],
];

export default api;
