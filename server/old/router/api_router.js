var path = require("path");
var fs = require("fs");


function api_route(url, success, fail) {

    var relativePaht =  path.join("../", url.pathname) + ".js";
    var modulePath =path.join(__dirname, relativePaht);

    fs.exists(modulePath, function(exist) {

        console.log("API exist", exist);

        if (exist) {
            var handle = require(modulePath);
            console.log(modulePath);
            if (handle) {
                handle(url, success, fail);
                return;
            }
        }

        fail();
    });

}

exports.route = api_route;
