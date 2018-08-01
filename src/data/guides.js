const guides = {};

guides.allGuides = {
    "install-dist": {
        path: "install-dist",
        title: "1. Install dist",
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
    "utils": {
        path: "utils",
        title: "Utils",
    },
    "ready-events": {
        path: "ready-events",
        title: "Ready Events",
    },
    "tracking-guide": {
        path: "tracking-guide",
        title: "Tracking",
    },
    "tracking-edge-cases": {
        path: "tracking-edge-cases",
        title: "Tracking Edge Cases",
    },
    "currency-guide": {
        path: "currency-guide",
        title: "Currency Guide",
    }
};

guides.firstSteps = [];
guides.firstSteps.push(guides.allGuides["install-dist"]);
guides.firstSteps.push(guides.allGuides["include-scripts"]);
guides.firstSteps.push(guides.allGuides["configuration"]);
guides.firstSteps.push(guides.allGuides["your-first-search"]);

guides.basics = [];
guides.basics.push(guides.allGuides["attribute-basics"]);
guides.basics.push(guides.allGuides["styling-elements"]);
guides.basics.push(guides.allGuides["template-engine"]);
guides.basics.push(guides.allGuides["communication"]);
guides.basics.push(guides.allGuides["field-roles"]);
guides.basics.push(guides.allGuides["ready-events"]);
guides.basics.push(guides.allGuides["utils"]);

guides.additionalFeatures = [];
guides.additionalFeatures.push(guides.allGuides["tracking-guide"]);
guides.additionalFeatures.push(guides.allGuides["tracking-edge-cases"]);
guides.additionalFeatures.push(guides.allGuides["currency-guide"]);

export default guides;