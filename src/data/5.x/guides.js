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
    },
};

guides.firstSteps = [
    guides.pages[`install-dist`],
    guides.pages[`include-scripts`],
    guides.pages[`quick-configuration`],
    guides.pages[`your-first-search`],
];

guides.essentials = [
];

guides.advanced = [
];

guides.migration = [
];


export default guides;
