var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('*', function (req, res) {
    res.sendFile("index.html", {root: "."});
});

app.listen(8081, function () {
    console.log('Listening on port 8081');
});