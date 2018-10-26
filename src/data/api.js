import { hasMovedModifier } from "./pageMappings";
import documentation from "./guides";

// api are the pages under the "API" tab

const api = {
    pages: {
        "30": {
            "core-result-dispatcher": {
                path: "core-result-dispatcher",
                title: "ResultDispatcher",
            },
            "core-event-aggregator": {
                path: "core-event-aggregator",
                title: "EventAggregator",
            },
            "legacy-event-aggregator": {
                path: "legacy-event-aggregator",
                title: "Legacy EventAggregator",
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
            "ff-campaign-product": {
                path: "ff-campaign-product",
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
                title: "Template",
                noApi: true
            },
            "ff-checkout-tracking": {
                path: "ff-checkout-tracking",
                title: "Checkout Tracking",
                noDemo: true
            },
            "ff-middleware": {
                path: "ff-middleware",
                title: "Middleware",
                noDemo: true
            },


            // --- obsolete pages ---

            "overview-get-started": hasMovedModifier(
                `documentation`,
                documentation.pages[`install-dist`]
            ),
            "overview-styling-elements": hasMovedModifier(
                `documentation`,
                documentation.pages[`styling-elements`]
            ),
            "overview-communication": hasMovedModifier(
                `documentation`,
                documentation.pages[`communication`]
            ),
            "overview-template-engine": hasMovedModifier(
                `documentation`,
                documentation.pages[`template-engine`]
            ),
            "overview-utils": hasMovedModifier(
                `documentation`,
                documentation.pages[`utils`]
            ),
        },
        "12": {
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
            "ff-campaign-product": {
                path: "ff-campaign-product",
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
                title: "Template",
                noApi: true
            },
            "ff-checkout-tracking": {
                path: "ff-checkout-tracking",
                title: "Checkout Tracking",
                noDemo: true
            },
            "ff-middleware": {
                path: "ff-middleware",
                title: "Middleware",
                noDemo: true
            },


            // --- obsolete pages ---

            "overview-get-started": hasMovedModifier(
                `documentation`,
                documentation.pages[`install-dist`]
            ),
            "overview-styling-elements": hasMovedModifier(
                `documentation`,
                documentation.pages[`styling-elements`]
            ),
            "overview-communication": hasMovedModifier(
                `documentation`,
                documentation.pages[`communication`]
            ),
            "overview-template-engine": hasMovedModifier(
                `documentation`,
                documentation.pages[`template-engine`]
            ),
            "overview-utils": hasMovedModifier(
                `documentation`,
                documentation.pages[`utils`]
            ),
        },
    }
};

api.core = {
    "30": [
        api.pages["30"]["core-result-dispatcher"],
        api.pages["30"]["core-event-aggregator"],
        api.pages["30"]["legacy-event-aggregator"],
    ],
    "12": [
        api.pages["12"]["core-result-dispatcher"],
        api.pages["12"]["core-event-aggregator"],
    ],

};

api.basics = {
    "30": [
        api.pages["30"]["ff-searchbox"],
        api.pages["30"]["ff-record-list"],
        api.pages["30"]["ff-suggest"],
    ],
    "12": [
        api.pages["12"]["ff-searchbox"],
        api.pages["12"]["ff-record-list"],
        api.pages["12"]["ff-suggest"],
    ],

};

api.navigation = {
    "30": [
        api.pages["30"]["ff-breadcrumb-trail"],
        api.pages["30"]["ff-asn"],
        api.pages["30"]["ff-navigation"],
        api.pages["30"]["ff-header-navigation"],
        api.pages["30"]["ff-paging"],
        api.pages["30"]["ff-paging-dropdown"],
        api.pages["30"]["ff-products-per-page"],
        api.pages["30"]["ff-sortbox"],
    ],
    "12": [
        api.pages["12"]["ff-breadcrumb-trail"],
        api.pages["12"]["ff-asn"],
        api.pages["12"]["ff-navigation"],
        api.pages["12"]["ff-header-navigation"],
        api.pages["12"]["ff-paging"],
        api.pages["12"]["ff-paging-dropdown"],
        api.pages["12"]["ff-products-per-page"],
        api.pages["12"]["ff-sortbox"],
    ]
};

api.moreFeatures = {
    "30": [
        api.pages["30"]["ff-campaign"],
        api.pages["30"]["ff-campaign-pushed-products"],
        api.pages["30"]["ff-campaign-landing-page"],
        api.pages["30"]["ff-campaign-shopping-cart"],
        api.pages["30"]["ff-checkout-tracking"],
        api.pages["30"]["ff-campaign-product"],
        api.pages["30"]["ff-search-feedback"],
        api.pages["30"]["ff-recommendation"],
        api.pages["30"]["ff-compare"],
        api.pages["30"]["ff-similar-products"],
        api.pages["30"]["ff-single-word-search"],
        api.pages["30"]["ff-carousel"],
        api.pages["30"]["ff-tag-cloud"],
        api.pages["30"]["ff-template"],
        api.pages["30"]["ff-middleware"],
    ],
    "12": [
        api.pages["12"]["ff-campaign"],
        api.pages["12"]["ff-campaign-pushed-products"],
        api.pages["12"]["ff-campaign-landing-page"],
        api.pages["12"]["ff-campaign-shopping-cart"],
        api.pages["12"]["ff-checkout-tracking"],
        api.pages["12"]["ff-campaign-product"],
        api.pages["12"]["ff-search-feedback"],
        api.pages["12"]["ff-recommendation"],
        api.pages["12"]["ff-compare"],
        api.pages["12"]["ff-similar-products"],
        api.pages["12"]["ff-single-word-search"],
        api.pages["12"]["ff-carousel"],
        api.pages["12"]["ff-tag-cloud"],
        api.pages["12"]["ff-template"],
        api.pages["12"]["ff-middleware"],
    ],
};

export default api;
