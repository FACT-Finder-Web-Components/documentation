// guides are the pages under the "Documentation" tab

const guides = {
    pages: {
        "install-dist": {
            path: `install-dist`,
            title: `1. Installation`,
        },
        "include-scripts": {
            path: `include-scripts`,
            title: `2. Including Scripts`,
        },
        "configuration": {
            path: `configuration`,
            title: `3. Configuration`,
        },
        "your-first-search": {
            path: `your-first-search`,
            title: `4. Your First Search`,
        },

        "attribute-basics": {
            path: `attribute-basics`,
            title: `Attributes`,
        },
        "styling-elements": {
            path: `styling-elements`,
            title: `Styling`,
        },
        "template-engine": {
            path: `template-engine`,
            title: `Template Engine`,
        },
        "communication": {
            path: `communication`,
            title: `Communication`,
        },
        "field-roles": {
            path: `field-roles`,
            title: `Field Roles`,
        },
        "ready-events": {
            path: `ready-events`,
            title: `Ready Events`,
        },
        "utils": {
            path: `utils`,
            title: `Utils`,
        },

        "tracking-guide": {
            path: `tracking-guide`,
            title: `Tracking`,
        },
        "tracking-with-js": {
            path: `tracking-with-js`,
            title: `Tracking with JS`,
        },
        "tracking-edge-cases": {
            path: `tracking-edge-cases`,
            title: `Tracking Edge Cases`,
        },
        "currency-guide": {
            path: `currency-guide`,
            title: `Currency Guide`,
        },
    }
};

guides.firstSteps = [
    guides.pages[`install-dist`],
    guides.pages[`include-scripts`],
    guides.pages[`configuration`],
    guides.pages[`your-first-search`],
];

guides.basics = [
    guides.pages[`attribute-basics`],
    guides.pages[`styling-elements`],
    guides.pages[`template-engine`],
    guides.pages[`communication`],
    guides.pages[`field-roles`],
    guides.pages[`ready-events`],
    guides.pages[`utils`],
];

guides.additionalFeatures = [
    guides.pages[`tracking-guide`],
    guides.pages[`tracking-with-js`],
    guides.pages[`tracking-edge-cases`],
    guides.pages[`currency-guide`],
];

export default guides;
