'use-strict';

const express = require('express');
const app = express();
const exportPath = '/export/';
const apiExportFile = 'api-export.csv';
const docExportFile = 'doc-export.csv';

app.use(express.static(__dirname));


// this is the old landing page (still showing up in google results)
// for a smoother UX it gets redirected immediately without an error page
app.get('/documentation/get-started', (req, res) => {
    res.redirect(301, '/documentation/install-dist');
});

app.get(exportPath + apiExportFile, (req, res) => {
    res.sendFile(apiExportFile, {root: "."});
});

app.get(exportPath + docExportFile, (req, res) => {
    res.sendFile(docExportFile, {root: "."});
});

app.get('*', function (req, res) {
    const protocol = req.get("X-Forwarded-Proto");
    if (protocol !== "https") {
        res.redirect(301, 'https://' + req.headers.host + req.url);
        return;
    }
    res.sendFile("index.html", {root: "."});
});

app.listen(8081, function () {
    console.log('Listening on port 8081');
});
