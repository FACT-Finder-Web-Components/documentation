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
        "category-urls": {
            path: `category-urls`,
            title: `Category URLs`,
        },
        "routing": {
            path: `routing`,
            title: `Routing`,
        },
        "communication": {
            path: `communication`,
            title: `Communication`,
        },
        "utils": {
            path: `utils`,
            title: `Utils`,
        },
        "upgrade-guide": {
            path: `upgrade-guide`,
            title: `Upgrade Guide 1.x to 3.x`,
        },
        "single-hit-redirect": {
            path: `single-hit-redirect`,
            title: `Single Hit Redirect`,
        },
        "server-side-rendering": {
            path: `server-side-rendering`,
            title: `Server Side Rendering`,
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
    guides.pages[`template-engine`],
    guides.pages[`ready-events`],
    guides.pages[`tracking-guide`],
    guides.pages[`currency-guide`],
];

guides.advanced = [
    guides.pages[`tracking-with-js`],
    guides.pages[`tracking-edge-cases`],
    guides.pages[`category-urls`],
    guides.pages[`routing`],
    guides.pages[`communication`],
    guides.pages[`utils`],
    guides.pages[`single-hit-redirect`],
    guides.pages[`server-side-rendering`]
];

guides.migration = [
    guides.pages[`upgrade-guide`],
];

export default guides;
