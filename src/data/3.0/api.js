import documentation from './guides';
import { hasMovedModifier } from '../pageHelper';

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
        "ff-product-teaser-campaign-processor": {
            path: "ff-product-teaser-campaign-processor",
            title: "Product Teaser Campaign",
            noApi: true,
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
        // TODO removed for 3.0 release -- might get reintroduced afterwards
        // "ff-carousel": {
        //     path: "ff-carousel",
        //     title: "Carousel",
        // },
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
        "ImageBindingBehavior": {
            path: "ImageBindingBehavior",
            title: "Image binding",
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
    api.pages["ff-product-teaser-campaign-processor"],
    api.pages["ff-campaign-landing-page"],
    api.pages["ff-campaign-shopping-cart"],
    api.pages["ff-checkout-tracking"],
    api.pages["ff-campaign-product"],
    api.pages["ff-search-feedback"],
    api.pages["ff-recommendation"],
    api.pages["ff-compare"],
    api.pages["ff-similar-products"],
    api.pages["ff-single-word-search"],
    // TODO removed for 3.0 release -- might get reintroduced afterwards
    // api.pages["ff-carousel"],
    api.pages["ff-tag-cloud"],
    api.pages["ff-template"],
    api.pages["ff-middleware"],
    api.pages["ImageBindingBehavior"],
];

export default api;
