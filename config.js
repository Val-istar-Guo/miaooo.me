var fs = require("fs");

var config = fs.readFileSync("server.cfg");

module.exports = JSON.parse(config.toString());
