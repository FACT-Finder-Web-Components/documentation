const api = {};
api.doku = {
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
    },
    "ff-checkout-tracking": {
        title: "Checkout Tracking",
        path: "ff-checkout-tracking",
    }
};

api.core = [];
api.core.push(api.doku["core-result-dispatcher"]);
api.core.push(api.doku["core-event-aggregator"]);

api.basics = [];
api.basics.push(api.doku["ff-searchbox"]);
api.basics.push(api.doku["ff-record-list"]);
api.basics.push(api.doku["ff-suggest"]);

api.navigation = [];
api.navigation.push(api.doku["ff-breadcrumb-trail"]);
api.navigation.push(api.doku["ff-asn"]);
api.navigation.push(api.doku["ff-navigation"]);
api.navigation.push(api.doku["ff-header-navigation"]);
api.navigation.push(api.doku["ff-paging"]);
api.navigation.push(api.doku["ff-paging-dropdown"]);
api.navigation.push(api.doku["ff-products-per-page"]);
api.navigation.push(api.doku["ff-sortbox"]);

api.moreFeatures = [];
api.moreFeatures.push(api.doku["ff-campaign"]);
api.moreFeatures.push(api.doku["ff-campaign-pushed-products"]);
api.moreFeatures.push(api.doku["ff-campaign-landing-page"]);
api.moreFeatures.push(api.doku["ff-campaign-shopping-cart"]);
api.moreFeatures.push(api.doku["ff-checkout-tracking"]);
api.moreFeatures.push(api.doku["ff-product-campaign"]);
api.moreFeatures.push(api.doku["ff-search-feedback"]);
api.moreFeatures.push(api.doku["ff-recommendation"]);
api.moreFeatures.push(api.doku["ff-compare"]);
api.moreFeatures.push(api.doku["ff-similar-products"]);
api.moreFeatures.push(api.doku["ff-single-word-search"]);
api.moreFeatures.push(api.doku["ff-carousel"]);
api.moreFeatures.push(api.doku["ff-tag-cloud"]);
api.moreFeatures.push(api.doku["ff-template"]);

export default api;