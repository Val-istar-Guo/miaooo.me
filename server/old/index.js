var server = require("./server");
var router = require("./router/router");

server.start(router.route);
