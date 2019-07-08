const faq = {
    pages: {
        "general": {
            path: `general`,
            title: `General`,
        },
        "errors": {
            path: `errors`,
            title: `Errors`,
        }
    }
};

faq.categories = [
    faq.pages[`general`],
    faq.pages[`errors`]
];

export default faq;
