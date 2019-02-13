'use-strict';

const express = require('express');
const app = express();
const exportDir = 'export';

app.use(express.static(__dirname));
app.use(express.static(exportDir));

// this is the old landing page (still showing up in google results)
// for a smoother UX it gets redirected immediately without an error page
app.get('/documentation/get-started', (req, res) => {
    res.redirect(301, '/documentation/install-dist');
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
