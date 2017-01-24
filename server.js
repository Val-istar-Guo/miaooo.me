var http = require('http');
var url = require('url');
var path = require("path");


function start(route) {

    function onRequest(req, res) {


        route(url.parse(req.url), function (contentType, data) {

            if (contentType) {
                res.writeHead(200, {
                    "Content-Type": contentType
                });
            } else {
                res.writeHead(200);
            }


            res.write(data);
            res.end();
        }, function () {
            res.writeHead(200, {
                "Content-Type": "text/plain"
            });

            res.write("Cannot find page");
            res.end();
        });

    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;
