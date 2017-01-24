var mysql = require("mysql");
var config = require("./config");

try {

    module.exports = mysql.createPool({
        host: config.mysql.host,
        user: config.mysql.user,
        password: config.mysql.pwd,
        database: config.mysql.db,
        port: config.mysql.port
    });

} catch (e) {
    console.log("创建mysql pool失败 Error:", e.message);
    process.exit(1);
}
