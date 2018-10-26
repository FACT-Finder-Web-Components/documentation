// guides are the pages under the "Documentation" tab

const guides = {
    pages: {
        "30": {
            "install-dist": {
                path: "install-dist",
                title: "1. Installation",
            },
            "include-scripts": {
                path: "include-scripts",
                title: "2. Including Scripts",
            },
            "configuration": {
                path: "configuration",
                title: "3. Configuration",
            },
            "your-first-search": {
                path: "your-first-search",
                title: "4. Your First Search",
            },

            "attribute-basics": {
                path: "attribute-basics",
                title: "Attributes",
            },
            "styling-elements": {
                path: "styling-elements",
                title: "Styling",
            },
            "template-engine": {
                path: "template-engine",
                title: "Template Engine",
            },
            "communication": {
                path: "communication",
                title: "Communication",
            },
            "field-roles": {
                path: "field-roles",
                title: "Field Roles",
            },
            "ready-events": {
                path: "ready-events",
                title: "Ready Events",
            },
            "utils": {
                path: "utils",
                title: "Utils",
            },

            "tracking-guide": {
                path: "tracking-guide",
                title: "Tracking",
            },
            "tracking-with-js": {
                path: "tracking-with-js",
                title: "Tracking with JS",
            },
            "tracking-edge-cases": {
                path: "tracking-edge-cases",
                title: "Tracking Edge Cases",
            },
            "currency-guide": {
                path: "currency-guide",
                title: "Currency Guide",
            },
        },
        "12": {
            "install-dist": {
                path: "install-dist",
                title: "1. Installation",
            },
            "include-scripts": {
                path: "include-scripts",
                title: "2. Including Scripts",
            },
            "configuration": {
                path: "configuration",
                title: "3. Configuration",
            },
            "your-first-search": {
                path: "your-first-search",
                title: "4. Your First Search",
            },

            "attribute-basics": {
                path: "attribute-basics",
                title: "Attributes",
            },
            "styling-elements": {
                path: "styling-elements",
                title: "Styling",
            },
            "template-engine": {
                path: "template-engine",
                title: "Template Engine",
            },
            "communication": {
                path: "communication",
                title: "Communication",
            },
            "field-roles": {
                path: "field-roles",
                title: "Field Roles",
            },
            "ready-events": {
                path: "ready-events",
                title: "Ready Events",
            },
            "utils": {
                path: "utils",
                title: "Utils",
            },

            "tracking-guide": {
                path: "tracking-guide",
                title: "Tracking",
            },
            "tracking-with-js": {
                path: "tracking-with-js",
                title: "Tracking with JS",
            },
            "tracking-edge-cases": {
                path: "tracking-edge-cases",
                title: "Tracking Edge Cases",
            },
            "currency-guide": {
                path: "currency-guide",
                title: "Currency Guide",
            },
        }
    }
};

guides.firstSteps = {
    "30": [
        guides.pages["30"]["install-dist"],
        guides.pages["30"]["include-scripts"],
        guides.pages["30"]["configuration"],
        guides.pages["30"]["your-first-search"],
    ],
    "12": [
        guides.pages["12"]["install-dist"],
        guides.pages["12"]["include-scripts"],
        guides.pages["12"]["configuration"],
        guides.pages["12"]["your-first-search"],
    ]
};

guides.basics = {
    "30": [
        guides.pages["30"]["attribute-basics"],
        guides.pages["30"]["styling-elements"],
        guides.pages["30"]["template-engine"],
        guides.pages["30"]["communication"],
        guides.pages["30"]["field-roles"],
        guides.pages["30"]["ready-events"],
        guides.pages["30"]["utils"],
    ],
    "12": [
        guides.pages["12"]["attribute-basics"],
        guides.pages["12"]["styling-elements"],
        guides.pages["12"]["template-engine"],
        guides.pages["12"]["communication"],
        guides.pages["12"]["field-roles"],
        guides.pages["12"]["ready-events"],
        guides.pages["12"]["utils"],
    ],
};

guides.additionalFeatures = {
    "30": [
        guides.pages["30"]["tracking-guide"],
        guides.pages["30"]["tracking-with-js"],
        guides.pages["30"]["tracking-edge-cases"],
        guides.pages["30"]["currency-guide"],
    ],
    "12": [
        guides.pages["12"]["tracking-guide"],
        guides.pages["12"]["tracking-with-js"],
        guides.pages["12"]["tracking-edge-cases"],
        guides.pages["12"]["currency-guide"],
    ],

};

export default guides;
