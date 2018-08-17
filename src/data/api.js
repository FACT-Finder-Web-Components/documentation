const api = {
    doku: {
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
            title: "Facets (ASN)",
            path: "ff-asn"
        },
        "ff-navigation": {
            title: "Navigation",
            path: "ff-navigation"
        },
        "ff-header-navigation": {
            title: "Header Navigation",
            path: "ff-header-navigation"
        },
        "ff-paging": {
            title: "Paging",
            path: "ff-paging"
        },
        "ff-paging-dropdown": {
            title: "Paging Dropdown",
            path: "ff-paging-dropdown"
        },
        "ff-products-per-page": {
            title: "Products Per Page",
            path: "ff-products-per-page"
        },
        "ff-sortbox": {
            title: "Sortbox",
            path: "ff-sortbox"
        },
        "ff-campaign": {
            title: "Campaign",
            path: "ff-campaign"
        },
        "ff-campaign-pushed-products": {
            title: "Pushed Products",
            path: "ff-campaign-pushed-products"
        },
        "ff-campaign-landing-page": {
            title: "Landing Page Campaign",
            path: "ff-campaign-landing-page"
        },
        "ff-campaign-shopping-cart": {
            title: "Shopping Cart Campaign",
            path: "ff-campaign-shopping-cart"
        },
        "ff-product-campaign": {
            title: "Product Campaign",
            path: "ff-product-campaign"
        },
        "ff-search-feedback": {
            title: "Search Feedback",
            path: "ff-search-feedback"
        },
        "ff-recommendation": {
            title: "Recommendation",
            path: "ff-recommendation"
        },
        "ff-compare": {
            title: "Compare",
            path: "ff-compare"
        },
        "ff-similar-products": {
            title: "Similar Products",
            path: "ff-similar-products"
        },
        "ff-single-word-search": {
            title: "Single Word Search",
            path: "ff-single-word-search"
        },
        "ff-carousel": {
            title: "Carousel",
            path: "ff-carousel"
        },
        "ff-tag-cloud": {
            title: "Tag Cloud",
            path: "ff-tag-cloud"
        },
        "ff-template": {
            title: "Template",
            path: "ff-template",
            noApi: true
        }
    }
};

api.core = [
    api.doku["core-result-dispatcher"],
    api.doku["core-event-aggregator"]
];

api.basics = [
    api.doku["ff-searchbox"],
    api.doku["ff-record-list"],
    api.doku["ff-suggest"]
];

api.navigation = [
    api.doku["ff-breadcrumb-trail"],
    api.doku["ff-asn"],
    api.doku["ff-navigation"],
    api.doku["ff-header-navigation"],
    api.doku["ff-paging"],
    api.doku["ff-paging-dropdown"],
    api.doku["ff-products-per-page"],
    api.doku["ff-sortbox"]
];

api.moreFeatures = [
    api.doku["ff-campaign"],
    api.doku["ff-campaign-pushed-products"],
    api.doku["ff-campaign-landing-page"],
    api.doku["ff-campaign-shopping-cart"],
    api.doku["ff-product-campaign"],
    api.doku["ff-search-feedback"],
    api.doku["ff-recommendation"],
    api.doku["ff-compare"],
    api.doku["ff-similar-products"],
    api.doku["ff-single-word-search"],
    api.doku["ff-carousel"],
    api.doku["ff-tag-cloud"],
    api.doku["ff-template"]
];

export default api;
