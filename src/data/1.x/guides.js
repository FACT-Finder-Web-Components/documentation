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

        "field-roles": {
            path: `field-roles`,
            title: `Field Roles`,
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
        "ready-events": {
            path: `ready-events`,
            title: `Ready Events`,
        },
        "tracking-guide": {
            path: `tracking-guide`,
            title: `Tracking`,
        },
        "currency-guide": {
            path: `currency-guide`,
            title: `Currency Guide`,
        },

        "tracking-with-js": {
            path: `tracking-with-js`,
            title: `Tracking with JS`,
        },
        "tracking-edge-cases": {
            path: `tracking-edge-cases`,
            title: `Tracking Edge Cases`,
        },
        "communication": {
            path: `communication`,
            title: `Communication`,
        },
        "utils": {
            path: `utils`,
            title: `Utils`,
        },
    }
};

guides.firstSteps = [
    guides.pages[`install-dist`],
    guides.pages[`include-scripts`],
    guides.pages[`configuration`],
    guides.pages[`your-first-search`],
];

guides.essentials = [
    guides.pages[`field-roles`],
    guides.pages[`attribute-basics`],
    guides.pages[`styling-elements`],
    guides.pages[`template-engine`],
    guides.pages[`ready-events`],
    guides.pages[`tracking-guide`],
    guides.pages[`currency-guide`],
];

guides.advanced = [
    guides.pages[`tracking-with-js`],
    guides.pages[`tracking-edge-cases`],
    guides.pages[`communication`],
    guides.pages[`utils`],
];

guides.migration = [
];

export default guides;
