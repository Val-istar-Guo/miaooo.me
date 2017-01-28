var fs = require("fs");

var config = fs.readFileSync("server.cfg");

if (config) {
    module.exports = JSON.parse(config.toString());
} else {
    throw new Error("Cannot find server.cfg file");
}
