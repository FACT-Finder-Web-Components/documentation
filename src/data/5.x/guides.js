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

        "template-engine": {
            path: `template-engine`,
            title: `Template Engine`,
        },


        // --- Advanced ---

        "server-side-rendering": {
            path: `server-side-rendering`,
            title: `Server Side Rendering`,
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
    guides.pages[`template-engine`],
];

guides.advanced = [
    guides.pages[`server-side-rendering`],
];

guides.migration = [
    guides.pages[`upgrade-guide`],
];


export default guides;
