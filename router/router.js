var path = require("path");
var fs = require("fs");

var mine = require("../mine").types;
var apiRouter = require("./api_router");

function route(url, success, fail) {

    console.log("Router:" + url.pathname);

    if (url.pathname.indexOf("/api") !== -1) {
        apiRouter.route(url, success, fail);
    } else {
        viewConductor(url, success, fail);
    }

}

function viewConductor(url, success, fail) {

    var pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    var filePath = path.join("view", pathname);
    var ext = path.extname(filePath);

    ext = ext ? ext.slice(1) : 'unknown';

    fs.exists(filePath, function(exists) {

        if (exists) {

            fs.readFile(filePath, function(err, data) {

                if (err) {
                    fail();
                }

                var contentType = mine[ext] || "text/plain";
                success(contentType, data);
            });

        } else {
            console.log("Cannot find:" + filePath);
            fail();
        }

    });
}


exports.route = route;
