import documentation from './guides';
import { hasMovedModifier } from '../pageHelper';

// api are the pages under the "API" tab
const api = {
    pages: {
        "core-result-dispatcher": {
            path: `core-result-dispatcher`,
            title: `ResultDispatcher`,
        },
        "core-event-aggregator": {
            path: `core-event-aggregator`,
            title: `EventAggregator`,
        },

        "ff-communication": {
            path: `ff-communication`,
            title: `Communication`,
            showTabs: true,
            noDemo: true
        },

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
        "ff-navigation": {
            path: `ff-navigation`,
            title: `Navigation`,
            showTabs: true,
        },
        "ff-header-navigation": {
            path: `ff-header-navigation`,
            title: `Header Navigation`,
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
        "ff-campaign-shopping-cart": {
            path: `ff-campaign-shopping-cart`,
            title: `Shopping Cart Campaign`,
            showTabs: true,
        },
        "ff-product-teaser-campaign-processor": {
            path: `ff-product-teaser-campaign-processor`,
            title: `Product Teaser Campaign`,
            showTabs: true,
            noApi: true,
        },
        "ff-campaign-product": {
            path: `ff-campaign-product`,
            title: `Product Campaign`,
            showTabs: true,
        },
        "ff-search-feedback": {
            path: `ff-search-feedback`,
            title: `Search Feedback`,
            showTabs: true,
        },
        "ff-recommendation": {
            path: `ff-recommendation`,
            title: `Recommendation`,
            showTabs: true,
        },
        "ff-compare": {
            path: `ff-compare`,
            title: `Compare`,
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
        "ff-carousel": {
            path: `ff-carousel`,
            title: `Carousel`,
            showTabs: true,
        },
        "ff-tag-cloud": {
            path: `ff-tag-cloud`,
            title: `Tag Cloud`,
            showTabs: true,
        },
        "ff-template": {
            path: `ff-template`,
            title: `Template`,
            showTabs: true,
            noApi: true
        },
        "ff-checkout-tracking": {
            path: `ff-checkout-tracking`,
            title: `Checkout Tracking`,
            showTabs: true,
            noDemo: true
        },
        "ff-middleware": {
            path: `ff-middleware`,
            title: `Middleware`,
            showTabs: true,
            noDemo: true
        },
        "ImageBindingBehavior": {
            path: `ImageBindingBehavior`,
            title: `Image binding`,
            showTabs: true,
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
    api.pages[`core-result-dispatcher`],
    api.pages[`core-event-aggregator`],
];

api.basics = [
    api.pages[`ff-communication`],
    api.pages[`ff-searchbox`],
    api.pages[`ff-record-list`],
    api.pages[`ff-suggest`],
];

api.navigation = [
    api.pages[`ff-breadcrumb-trail`],
    api.pages[`ff-asn`],
    api.pages[`ff-navigation`],
    api.pages[`ff-header-navigation`],
    api.pages[`ff-paging`],
    api.pages[`ff-paging-dropdown`],
    api.pages[`ff-products-per-page`],
    api.pages[`ff-sortbox`],
];

api.moreFeatures = [
    api.pages[`ff-campaign`],
    api.pages[`ff-campaign-pushed-products`],
    api.pages[`ff-campaign-product`],
    api.pages[`ff-campaign-shopping-cart`],
    api.pages[`ff-campaign-landing-page`],
    api.pages[`ff-product-teaser-campaign-processor`],
    api.pages[`ff-checkout-tracking`],
    api.pages[`ff-search-feedback`],
    api.pages[`ff-recommendation`],
    api.pages[`ff-compare`],
    api.pages[`ff-similar-products`],
    api.pages[`ff-single-word-search`],
    api.pages[`ff-carousel`],
    api.pages[`ff-tag-cloud`],
    api.pages[`ff-template`],
    api.pages[`ff-middleware`],
    api.pages[`ImageBindingBehavior`],
];

export default api;
