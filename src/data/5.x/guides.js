// guides are the pages under the "Documentation" tab

const guides = {
    pages: {
        // --- First Steps ---

        "install-dist": {
            path: `install-dist`,
            title: `1. Installation`,
        },
        "include-scripts": {
            path: `include-scripts`,
            title: `2. Including Scripts`,
        },
        "quick-configuration": {
            path: `quick-configuration`,
            title: `3. Configuration`,
        },
        "your-first-search": {
            path: `your-first-search`,
            title: `4. Your First Search`,
        },


        // --- Essentials ---

        "for-developers": {
            path: `for-developers`,
            title: `For Developers`,
        },
        "category-pages": {
            path: `category-pages`,
            title: `Category Pages`,
        },
        "template-engine": {
            path: `template-engine`,
            title: `Template Engine`,
        },
        "formatting": {
            path: `formatting`,
            title: `Formatting and Localization`,
        },


        // --- Advanced ---

        "server-side-rendering": {
            path: `server-side-rendering`,
            title: `Server Side Rendering`,
        },
        "sandbox-mode": {
            path: `sandbox-mode`,
            title: `Sandbox Mode`,
        },


        // --- Migration ---


        "upgrade-guide": {
            path: `upgrade-guide`,
            title: `Upgrade Guide 4.x to 5.0.0`,
        },
    },
};

guides.firstSteps = [
    guides.pages[`install-dist`],
    guides.pages[`include-scripts`],
    guides.pages[`quick-configuration`],
    guides.pages[`your-first-search`],
];

guides.essentials = [
    guides.pages[`for-developers`],
    guides.pages[`category-pages`],
    guides.pages[`template-engine`],
    guides.pages[`formatting`],
];

guides.advanced = [
    guides.pages[`server-side-rendering`],
    guides.pages[`sandbox-mode`],
];

guides.migration = [
    guides.pages[`upgrade-guide`],
];


export default guides;
