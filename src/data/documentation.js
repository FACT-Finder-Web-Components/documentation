const documentation = {};
documentation.doku = {
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
};

documentation.core = [];
documentation.core.push(documentation.doku["core-result-dispatcher"]);
documentation.core.push(documentation.doku["core-event-aggregator"]);

documentation.basics = [];
documentation.basics.push(documentation.doku["ff-searchbox"]);
documentation.basics.push(documentation.doku["ff-record-list"]);
documentation.basics.push(documentation.doku["ff-suggest"]);

documentation.navigation = [];
documentation.navigation.push(documentation.doku["ff-breadcrumb-trail"]);
documentation.navigation.push(documentation.doku["ff-asn"]);
documentation.navigation.push(documentation.doku["ff-navigation"]);
documentation.navigation.push(documentation.doku["ff-header-navigation"]);
documentation.navigation.push(documentation.doku["ff-paging"]);
documentation.navigation.push(documentation.doku["ff-paging-dropdown"]);
documentation.navigation.push(documentation.doku["ff-products-per-page"]);
documentation.navigation.push(documentation.doku["ff-sortbox"]);

documentation.moreFeatures = [];
documentation.moreFeatures.push(documentation.doku["ff-campaign"]);
documentation.moreFeatures.push(documentation.doku["ff-campaign-pushed-products"]);
documentation.moreFeatures.push(documentation.doku["ff-campaign-landing-page"]);
documentation.moreFeatures.push(documentation.doku["ff-campaign-shopping-cart"]);
documentation.moreFeatures.push(documentation.doku["ff-product-campaign"]);
documentation.moreFeatures.push(documentation.doku["ff-search-feedback"]);
documentation.moreFeatures.push(documentation.doku["ff-recommendation"]);
documentation.moreFeatures.push(documentation.doku["ff-compare"]);
documentation.moreFeatures.push(documentation.doku["ff-similar-products"]);
documentation.moreFeatures.push(documentation.doku["ff-single-word-search"]);
documentation.moreFeatures.push(documentation.doku["ff-carousel"]);
documentation.moreFeatures.push(documentation.doku["ff-tag-cloud"]);
documentation.moreFeatures.push(documentation.doku["ff-template"]);

export default documentation;